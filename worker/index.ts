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
