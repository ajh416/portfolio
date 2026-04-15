import { promises as fs } from 'node:fs';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function POST(request) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    return new Response('Server misconfigured', { status: 500 });
  }

  let token;
  try {
    const body = await request.json();
    token = body?.token;
  } catch {
    return new Response('Bad request', { status: 400 });
  }
  if (typeof token !== 'string' || !token) {
    return new Response('Missing token', { status: 400 });
  }

  const xff = request.headers.get('x-forwarded-for') || '';
  const remoteip = xff.split(',')[0].trim();

  const form = new URLSearchParams();
  form.append('secret', secret);
  form.append('response', token);
  if (remoteip) form.append('remoteip', remoteip);

  let verify;
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      body: form,
    });
    verify = await res.json();
  } catch {
    return new Response('Verification failed', { status: 502 });
  }

  if (!verify?.success) {
    return new Response('Forbidden', { status: 403 });
  }

  const pdfPath = path.join(process.cwd(), 'private', 'AdamHenryResume.pdf');
  let buffer;
  try {
    buffer = await fs.readFile(pdfPath);
  } catch {
    return new Response('Resume unavailable', { status: 500 });
  }

  return new Response(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="AdamHenryResume.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET() {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST' },
  });
}
