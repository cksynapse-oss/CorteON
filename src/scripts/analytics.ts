/**
 * Cookieless, privacy-friendly analytics client for Synapse.
 * Adheres strictly to AGENTS.md rule 11:
 * - No third-party trackers, no ad pixels, no tracking cookies.
 * - Minimal collection, zero PII transmitted.
 *
 * Supported Events (BUILD_PLAN.md T14):
 * - enquire_start: user starts filling an enquiry/interest form
 * - enquire_submit: user submits an enquiry/interest form
 * - whatsapp_click: user clicks any WhatsApp CTA or click-to-chat link
 * - call_click: user clicks any telephone link
 * - door_select: user selects an entry door (parent, graduate, reader, founder, partner)
 */

declare global {
  interface Window {
    synapseTrack?: (event: string, props?: Record<string, unknown>) => void;
    plausible?: (
      event: string,
      options?: { props?: Record<string, unknown> }
    ) => void;
    umami?: {
      track: (event: string, props?: Record<string, unknown>) => void;
    };
  }
}

export function trackEvent(
  name: string,
  props: Record<string, unknown> = {}
): void {
  try {
    // 1. Dispatch custom DOM event for local subscribers / decoupled verification
    const customEvent = new CustomEvent('synapse:event', {
      detail: { name, ...props },
      bubbles: true,
    });
    document.dispatchEvent(customEvent);

    // 2. Forward to Plausible (if installed)
    if (typeof window.plausible === 'function') {
      window.plausible(name, { props });
    }

    // 3. Forward to Umami (if installed)
    if (typeof window.umami?.track === 'function') {
      window.umami.track(name, props);
    }

    // 4. Development / debug logging
    if (
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.sessionStorage?.getItem('synapse_debug'))
    ) {
      // eslint-disable-next-line no-console
      console.log(`[Synapse Analytics] ${name}`, props);
    }
  } catch {
    // Fail silently without impacting user experience
  }
}

// Client-side initialization
if (typeof window !== 'undefined') {
  window.synapseTrack = trackEvent;

  // Global delegated listener for WhatsApp, Phone calls, and Door selections
  document.addEventListener('click', (evt) => {
    const target = (evt.target as HTMLElement)?.closest('a');
    if (!target) return;

    const href = target.getAttribute('href') || '';

    // WhatsApp click tracking
    if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
      trackEvent('whatsapp_click', {
        href,
        location: window.location.pathname,
      });
    }

    // Call / Phone click tracking
    if (href.startsWith('tel:')) {
      trackEvent('call_click', {
        phone: href.replace(/^tel:/, ''),
        location: window.location.pathname,
      });
    }

    // Door link tracking from DoorCard or explicit links
    const doorAttr = target.getAttribute('data-door');
    if (doorAttr) {
      trackEvent('door_select', {
        door: doorAttr,
        source: 'card',
      });
    } else if (href.includes('/enquire?door=')) {
      try {
        const urlObj = new URL(href, window.location.origin);
        const doorVal = urlObj.searchParams.get('door');
        if (doorVal) {
          trackEvent('door_select', {
            door: doorVal,
            source: 'link',
          });
        }
      } catch {
        // ignore url parse failure
      }
    }
  });
}
