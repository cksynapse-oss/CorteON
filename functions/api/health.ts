/**
 * Cloudflare Pages Function: /api/health
 */

export async function onRequestGet(): Promise<Response> {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
