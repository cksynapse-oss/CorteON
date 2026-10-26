import site from '../content/site.json' with { type: 'json' };

export interface Env {
  APPS_SCRIPT_URL?: string;
  APPS_SCRIPT_TOKEN?: string;
  TURNSTILE_SECRET_KEY?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;
  ENVIRONMENT?: string;
  CF_PAGES_BRANCH?: string;
  [key: string]: unknown;
}

export interface EnquiryPayload {
  door: 'parent' | 'fellow' | 'reader' | 'founder' | 'partner';
  doorTitle?: string;
  name: string;
  phone: string;
  email?: string;
  stageOrSubject?: string;
  interestOrExam?: string;
  fellow_subject?: string;
  fellow_exam?: string;
  parent_stage?: string;
  parent_interest?: string;
  message?: string;
  consent: boolean;
  honeypot?: string;
  turnstileToken?: string;
  source?: string;
  token?: string;
  [key: string]: unknown;
}

export const DOOR_TITLES: Record<string, string> = {
  parent: 'A parent or student',
  fellow: 'A graduate who wants to teach',
  reader: 'A reader',
  founder: 'A founder or builder',
  partner: 'A district partner',
};

/**
 * Clean phone number to 10 digits
 */
export function cleanPhoneNumber(raw: string): string {
  if (!raw) return '';
  // Remove all non-digits
  let digits = raw.replace(/\D/g, '');
  // If preceded by 91 (India country code) and 12 digits total
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  }
  // If preceded by 0 and 11 digits total
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits;
}

/**
 * Validate enquiry payload
 */
export function validateEnquiry(
  data: Partial<Omit<EnquiryPayload, 'consent'>> & {
    consent?: boolean | string | number | null;
  }
): {
  valid: boolean;
  error?: string;
  cleaned?: EnquiryPayload;
} {
  const door = (data.door || 'parent') as EnquiryPayload['door'];
  if (!['parent', 'fellow', 'reader', 'founder', 'partner'].includes(door)) {
    return { valid: false, error: 'Invalid door selected.' };
  }

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  if (!name || name.length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  if (name.length > 100) {
    return {
      valid: false,
      error: 'Name is too long (maximum 100 characters).',
    };
  }

  const rawPhone = typeof data.phone === 'string' ? data.phone : '';
  const phone = cleanPhoneNumber(rawPhone);
  if (!/^\d{10}$/.test(phone)) {
    return {
      valid: false,
      error: 'Please enter a valid 10-digit mobile number.',
    };
  }

  const consent = Boolean(
    data.consent === true ||
    data.consent === 'true' ||
    data.consent === 'on' ||
    data.consent === 1
  );
  if (!consent) {
    return {
      valid: false,
      error: 'You must agree to be contacted about Synapse.',
    };
  }

  const email = typeof data.email === 'string' ? data.email.trim() : undefined;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }

  const message =
    typeof data.message === 'string'
      ? data.message.trim().slice(0, 1000)
      : undefined;

  const source =
    typeof data.source === 'string'
      ? data.source.trim().slice(0, 50)
      : undefined;

  const rawObj = data as Record<string, unknown>;
  const resolvedStage =
    typeof data.stageOrSubject === 'string' && data.stageOrSubject.trim() !== ''
      ? data.stageOrSubject.trim()
      : typeof rawObj.fellow_subject === 'string' &&
          (rawObj.fellow_subject as string).trim() !== ''
        ? (rawObj.fellow_subject as string).trim()
        : typeof rawObj.parent_stage === 'string' &&
            (rawObj.parent_stage as string).trim() !== ''
          ? (rawObj.parent_stage as string).trim()
          : undefined;

  const resolvedInterest =
    typeof data.interestOrExam === 'string' && data.interestOrExam.trim() !== ''
      ? data.interestOrExam.trim()
      : typeof rawObj.fellow_exam === 'string' &&
          (rawObj.fellow_exam as string).trim() !== ''
        ? (rawObj.fellow_exam as string).trim()
        : typeof rawObj.parent_interest === 'string' &&
            (rawObj.parent_interest as string).trim() !== ''
          ? (rawObj.parent_interest as string).trim()
          : undefined;

  return {
    valid: true,
    cleaned: {
      door,
      doorTitle: DOOR_TITLES[door] || door,
      name,
      phone,
      email: email || undefined,
      stageOrSubject: resolvedStage,
      interestOrExam: resolvedInterest,
      message: message || undefined,
      consent: true,
      turnstileToken:
        typeof data.turnstileToken === 'string'
          ? data.turnstileToken
          : undefined,
      source: source || 'web',
    },
  };
}

/**
 * Generate prefilled WhatsApp click-to-chat URL fallback
 */
export function buildWhatsAppUrl(
  door: string,
  name?: string,
  track?: string
): string {
  const phone = '918287248119';
  const doorTitle = DOOR_TITLES[door] || 'Admissions';
  let message = `Hello Synapse, I am enquiring about ${doorTitle}.`;
  if (name) {
    message += ` My name is ${name}.`;
  }
  if (track) {
    message += ` Area of interest: ${track}.`;
  }
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Verify Cloudflare Turnstile token
 */
export async function verifyTurnstile(
  token: string,
  secretKey: string,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const res = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      }
    );

    const result = (await res.json()) as {
      success: boolean;
      'error-codes'?: string[];
    };
    return {
      success: Boolean(result.success),
      error: result.success
        ? undefined
        : result['error-codes']?.join(', ') || 'Verification failed',
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Turnstile network error',
    };
  }
}

/**
 * Shared enquiry handler for both Cloudflare Workers and Cloudflare Pages
 */
export async function handleEnquiry(
  request: Request,
  env: Env
): Promise<Response> {
  const url = new URL(request.url);

  // Parse request body (JSON or Form URL-Encoded / Multipart)
  const contentType = request.headers.get('content-type') || '';
  const acceptHeader = request.headers.get('accept') || '';
  const isJsonRequest =
    contentType.includes('application/json') ||
    acceptHeader.includes('application/json');

  let rawData: Record<string, unknown> = {};

  try {
    if (contentType.includes('application/json')) {
      rawData = (await request.json()) as Record<string, unknown>;
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        rawData[key] = value;
      });
    } else {
      // Fallback: try parsing text as URL-encoded or JSON
      const text = await request.text();
      try {
        rawData = JSON.parse(text) as Record<string, unknown>;
      } catch {
        const params = new URLSearchParams(text);
        params.forEach((value, key) => {
          rawData[key] = value;
        });
      }
    }
  } catch {
    const errMsg = 'Failed to parse request payload.';
    if (isJsonRequest) {
      return new Response(JSON.stringify({ ok: false, error: errMsg }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return Response.redirect(
      `${url.origin}/enquire?error=${encodeURIComponent(errMsg)}`,
      303
    );
  }

  const rawRedirect = (rawData.redirect_to || '') as string;
  const safeRedirect =
    rawRedirect.startsWith('/') && !rawRedirect.startsWith('//')
      ? rawRedirect
      : '';

  // 1. Honeypot anti-spam check
  // Hidden field _hp_company or website; if filled, silently return success
  const honeypot = (rawData._hp_company || rawData.website || '') as string;
  if (honeypot && String(honeypot).trim() !== '') {
    // Pretend success to bot
    if (isJsonRequest) {
      return new Response(
        JSON.stringify({
          ok: true,
          message: 'Enquiry received.',
          callbackWindow: site.callbackWindow,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const targetBase = safeRedirect || '/enquire';
    return Response.redirect(
      `${url.origin}${targetBase}?submitted=success`,
      303
    );
  }

  // 2. Map door-specific fields to unified stage/interest properties
  const door = (rawData.door || 'parent') as string;
  let stageOrSubject = (rawData.stageOrSubject || '') as string;
  let interestOrExam = (rawData.interestOrExam || '') as string;

  if (door === 'parent') {
    stageOrSubject = (rawData.parent_stage ||
      rawData.stageOrSubject ||
      stageOrSubject) as string;
    interestOrExam = (rawData.parent_interest ||
      rawData.interestOrExam ||
      interestOrExam) as string;
  } else if (door === 'fellow') {
    stageOrSubject = (rawData.fellow_subject ||
      rawData.stageOrSubject ||
      stageOrSubject) as string;
    interestOrExam = (rawData.fellow_exam ||
      rawData.interestOrExam ||
      interestOrExam) as string;
  } else if (door === 'reader') {
    stageOrSubject = (rawData.reader_interests ||
      rawData.stageOrSubject ||
      stageOrSubject) as string;
    interestOrExam = rawData.reader_card_interest
      ? 'Requested reader card notification'
      : (rawData.interestOrExam as string) || '';
  } else if (door === 'founder') {
    stageOrSubject = (rawData.founder_project ||
      rawData.stageOrSubject ||
      stageOrSubject) as string;
    interestOrExam = (rawData.founder_skills ||
      rawData.interestOrExam ||
      interestOrExam) as string;
  } else if (door === 'partner') {
    stageOrSubject = (rawData.partner_district ||
      rawData.stageOrSubject ||
      stageOrSubject) as string;
    interestOrExam = (rawData.partner_space ||
      rawData.interestOrExam ||
      interestOrExam) as string;
  }

  const payloadToValidate: Partial<EnquiryPayload> = {
    door: door as EnquiryPayload['door'],
    name: rawData.name as string,
    phone: rawData.phone as string,
    email: rawData.email as string,
    message: rawData.message as string,
    consent: Boolean(rawData.consent),
    stageOrSubject,
    interestOrExam,
    turnstileToken: (rawData['cf-turnstile-response'] ||
      rawData.turnstileToken ||
      '') as string,
    source: (rawData.source || '') as string,
  };

  // 3. Validation
  const validation = validateEnquiry(payloadToValidate);
  if (!validation.valid || !validation.cleaned) {
    const errorMsg = validation.error || 'Please fill in all required fields.';
    if (isJsonRequest) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: errorMsg,
          whatsappFallbackUrl: buildWhatsAppUrl(door, rawData.name as string),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const targetBase = safeRedirect || '/enquire';
    return Response.redirect(
      `${url.origin}${targetBase}?door=${door}&error=${encodeURIComponent(
        errorMsg
      )}#apply`,
      303
    );
  }

  const cleaned = validation.cleaned;

  // 4. Cloudflare Turnstile & Production Environment Checks
  const isProduction =
    (env &&
      (env.ENVIRONMENT === 'production' || env.CF_PAGES_BRANCH === 'main')) ||
    url.hostname === 'corteon.in';

  // In production, both TURNSTILE_SECRET_KEY and PUBLIC_TURNSTILE_SITE_KEY must be configured
  if (
    isProduction &&
    (!env || !env.TURNSTILE_SECRET_KEY || !env.PUBLIC_TURNSTILE_SITE_KEY)
  ) {
    console.error(
      `[Synapse /api/enquire] Production config error: missing Turnstile key(s) (hasSecret=${Boolean(
        env?.TURNSTILE_SECRET_KEY
      )}, hasSiteKey=${Boolean(env?.PUBLIC_TURNSTILE_SITE_KEY)})`
    );
    const errorMsg =
      'Enquiry service is temporarily unavailable. Please message us on WhatsApp.';
    if (isJsonRequest) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: errorMsg,
          whatsappFallbackUrl: buildWhatsAppUrl(cleaned.door, cleaned.name),
        }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const targetBase = safeRedirect || '/enquire';
    return Response.redirect(
      `${url.origin}${targetBase}?door=${cleaned.door}&error=${encodeURIComponent(
        errorMsg
      )}#apply`,
      303
    );
  }

  // Determine Turnstile secret key: in dev/preview, allow Cloudflare test key if not set
  // Cloudflare Always Passes secret key: 1x0000000000000000000000000000000AA
  const turnstileSecret =
    (env && env.TURNSTILE_SECRET_KEY) ||
    (!isProduction ? '1x0000000000000000000000000000000AA' : '');

  // In production, Turnstile token is mandatory
  if (isProduction && !cleaned.turnstileToken) {
    console.warn(
      `[Synapse /api/enquire] Production rejection: missing Turnstile token (door=${cleaned.door})`
    );
    const errorMsg = 'Anti-spam check failed. Please refresh and try again.';
    if (isJsonRequest) {
      return new Response(
        JSON.stringify({
          ok: false,
          error: errorMsg,
          whatsappFallbackUrl: buildWhatsAppUrl(cleaned.door, cleaned.name),
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    const targetBase = safeRedirect || '/enquire';
    return Response.redirect(
      `${url.origin}${targetBase}?door=${cleaned.door}&error=${encodeURIComponent(
        errorMsg
      )}#apply`,
      303
    );
  }

  // Verify Turnstile token if present and secret key available
  if (turnstileSecret && cleaned.turnstileToken) {
    const clientIp = request.headers.get('CF-Connecting-IP') || undefined;
    const turnstileResult = await verifyTurnstile(
      cleaned.turnstileToken,
      turnstileSecret,
      clientIp
    );
    if (!turnstileResult.success) {
      console.warn(
        `[Synapse /api/enquire] Rejection: Turnstile verification failed (door=${cleaned.door}, code=${
          turnstileResult.error || 'unknown'
        })`
      );
      const errorMsg = 'Anti-spam check failed. Please refresh and try again.';
      if (isJsonRequest) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: errorMsg,
            whatsappFallbackUrl: buildWhatsAppUrl(cleaned.door, cleaned.name),
          }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      const targetBase = safeRedirect || '/enquire';
      return Response.redirect(
        `${url.origin}${targetBase}?door=${cleaned.door}&error=${encodeURIComponent(
          errorMsg
        )}#apply`,
        303
      );
    }
  }

  // 5. Forward to Google Apps Script Webhook
  let sheetSaved = false;
  if (env && env.APPS_SCRIPT_URL) {
    try {
      const payloadToSend = {
        ...cleaned,
        token: env.APPS_SCRIPT_TOKEN || '',
      };
      const appsScriptRes = await fetch(env.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloadToSend),
      });
      if (appsScriptRes.ok) {
        sheetSaved = true;
      } else {
        console.warn(
          'Apps Script returned non-200 status:',
          appsScriptRes.status
        );
      }
    } catch (err) {
      console.error('Failed to forward to Google Apps Script:', err);
    }
  } else {
    // Development / preview environment without APPS_SCRIPT_URL
    console.info(
      '[Synapse /api/enquire] Environment APPS_SCRIPT_URL not configured. Enquiry logged:',
      cleaned
    );
    sheetSaved = true;
  }

  // 6. Response
  if (isJsonRequest) {
    return new Response(
      JSON.stringify({
        ok: true,
        saved: sheetSaved,
        door: cleaned.door,
        callbackWindow: site.callbackWindow,
        message: `Thank you. We will call you ${site.callbackWindow}.`,
        whatsappFallbackUrl: buildWhatsAppUrl(cleaned.door, cleaned.name),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Native HTML Form POST redirect (JS-disabled mode)
  if (safeRedirect) {
    return Response.redirect(
      `${url.origin}${safeRedirect}?submitted=success#apply`,
      303
    );
  }
  return Response.redirect(
    `${url.origin}/enquire?submitted=success&door=${cleaned.door}#confirmation`,
    303
  );
}
