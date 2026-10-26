/**
 * Cloudflare Worker entry point for corteon (Worker with Static Assets)
 */

import { handleEnquiry, type Env } from '../src/lib/enquiry';

export interface WorkerEnv extends Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
}

export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);

    // Health probe endpoint
    if (url.pathname === '/api/health') {
      if (request.method === 'GET') {
        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
        });
      }
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'GET' },
      });
    }

    // Enquiry submission endpoint
    if (url.pathname === '/api/enquire') {
      if (request.method === 'POST') {
        return handleEnquiry(request, env);
      }
      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'POST' },
      });
    }

    // Corteon form submissions endpoint (waitlist & contributors)
    if (url.pathname === '/api/submit') {
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      if (request.method === 'POST') {
        try {
          const data = (await request.json()) as Record<string, unknown>;

          if (!data || !data.email) {
            return new Response(
              JSON.stringify({ ok: false, error: 'Email is required' }),
              {
                status: 400,
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                },
              }
            );
          }

          console.info('[Submission]', JSON.stringify(data));

          // Forward to Google Apps Script webhook if configured
          if (env.APPS_SCRIPT_URL) {
            try {
              const gasRes = await fetch(env.APPS_SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  ...data,
                  token: env.APPS_SCRIPT_TOKEN || '',
                  timestamp: new Date().toISOString(),
                }),
              });
              console.info(
                '[Submission] Forwarded to Apps Script status:',
                gasRes.status
              );
            } catch (forwardErr) {
              console.error(
                '[Submission] Failed forwarding to Apps Script:',
                forwardErr
              );
            }
          }

          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error ? err.message : 'Invalid request body';
          return new Response(
            JSON.stringify({ ok: false, error: errorMessage }),
            {
              status: 400,
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              },
            }
          );
        }
      }

      return new Response('Method Not Allowed', {
        status: 405,
        headers: { Allow: 'POST, OPTIONS' },
      });
    }

    // Unknown /api/* routes return 404
    if (url.pathname.startsWith('/api/')) {
      return new Response(JSON.stringify({ ok: false, error: 'Not Found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    }

    // Static assets fallback
    return env.ASSETS.fetch(request);
  },
};
