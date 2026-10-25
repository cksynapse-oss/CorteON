declare global {
  interface Window {
    turnstile?: unknown;
  }
}

let turnstileScriptLoading = false;

export function loadTurnstileScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (
    window.turnstile ||
    document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]')
  ) {
    return Promise.resolve();
  }
  if (turnstileScriptLoading) {
    return new Promise((resolve) => {
      const check = setInterval(() => {
        if (
          window.turnstile ||
          document.querySelector(
            'script[src*="challenges.cloudflare.com/turnstile"]'
          )
        ) {
          clearInterval(check);
          resolve();
        }
      }, 50);
    });
  }

  turnstileScriptLoading = true;
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => {
      turnstileScriptLoading = false;
      reject(err);
    };
    document.head.appendChild(script);
  });
}

export function setupTurnstileLoader(form: HTMLFormElement | null): void {
  if (!form) return;
  const widget = form.querySelector('.cf-turnstile');
  if (!widget) return; // Degraded state: no key configured

  let loaded = false;
  const triggerLoad = () => {
    if (loaded) return;
    loaded = true;
    loadTurnstileScript().catch(() => {});
  };

  // 1. Load on first form interaction
  form.addEventListener('focusin', triggerLoad, { once: true, passive: true });
  form.addEventListener('pointerdown', triggerLoad, {
    once: true,
    passive: true,
  });

  // 2. Load when form nears viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerLoad();
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px 0px' }
    );
    observer.observe(form);
  }
}

export async function waitForTurnstileToken(
  form: HTMLFormElement | null,
  timeoutMs = 4000
): Promise<boolean> {
  if (!form) return true;
  const widget = form.querySelector('.cf-turnstile');
  if (!widget) return true; // Degraded state: no token needed

  // Ensure script has been initiated
  loadTurnstileScript().catch(() => {});

  const startTime = Date.now();
  while (Date.now() - startTime < timeoutMs) {
    const tokenInput = form.querySelector<HTMLInputElement>(
      '[name="cf-turnstile-response"]'
    );
    if (tokenInput && tokenInput.value && tokenInput.value.trim().length > 0) {
      return true;
    }
    await new Promise((r) => setTimeout(r, 100));
  }

  return false;
}
