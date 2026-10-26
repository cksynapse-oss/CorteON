/**
 * Cloudflare Pages Function: /api/enquire
 *
 * Re-exports and delegates to the shared enquiry handler.
 */

import {
  handleEnquiry,
  type Env,
  type EnquiryPayload,
  DOOR_TITLES,
  cleanPhoneNumber,
  validateEnquiry,
  buildWhatsAppUrl,
  verifyTurnstile,
} from '../../src/lib/enquiry';

export type { Env, EnquiryPayload };
export {
  DOOR_TITLES,
  cleanPhoneNumber,
  validateEnquiry,
  buildWhatsAppUrl,
  verifyTurnstile,
  handleEnquiry,
};

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  return handleEnquiry(context.request, context.env);
}
