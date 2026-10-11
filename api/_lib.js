// Shared by the payment functions. Files starting with "_" are not routes.
import { createHmac } from 'node:crypto';

export const PRICE = 300;
export const SUPPORT = 'https://wa.me/201025256462';

// Must match lib/license_codes.dart in the app.
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

function encode(bytes) {
  let out = '', buffer = 0, bits = 0;
  for (const byte of bytes) {
    buffer = (buffer << 8) | byte;
    bits += 8;
    while (bits >= 5) { bits -= 5; out += ALPHABET[(buffer >> bits) & 31]; }
    buffer &= (1 << bits) - 1;
  }
  if (bits > 0) out += ALPHABET[(buffer << (5 - bits)) & 31];
  return out;
}

export function normalize(input) {
  let out = '';
  for (let char of String(input).toUpperCase()) {
    const digit = '٠١٢٣٤٥٦٧٨٩'.indexOf(char);
    if (digit >= 0) char = String(digit);
    const fixed = char === 'O' ? '0' : (char === 'I' || char === 'L') ? '1' : char;
    if (ALPHABET.includes(fixed)) out += fixed;
  }
  return out;
}

export const formatCode = code => code.match(/.{1,4}/g).join('-');

// The code that unlocks `deviceCode` until `expiryMs` (rounded up to the hour).
export function makeLicenseCode(deviceCode, expiryMs) {
  const secret = Buffer.from(process.env.LICENSE_SECRET || '', 'hex');
  if (secret.length !== 32) throw new Error('LICENSE_SECRET is not set');
  const hours = Math.ceil(expiryMs / 3600000);
  const mac = createHmac('sha256', secret)
    .update('v1|' + normalize(deviceCode) + '|' + hours).digest().subarray(0, 7);
  return { code: encode([(hours >> 16) & 255, (hours >> 8) & 255, hours & 255, ...mac]),
           expiry: new Date(hours * 3600000) };
}

export const isTest = () => process.env.KASHIER_MODE !== 'live';

export function kashier(path, body) {
  const base = isTest() ? 'https://test-api.kashier.io' : 'https://api.kashier.io';
  return fetch(base + path, {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: process.env.KASHIER_SECRET_KEY,
      'api-key': process.env.KASHIER_API_KEY,
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  }).then(async r => ({ ok: r.ok, status: r.status, json: await r.json().catch(() => ({})) }));
}

// Orders are named PRM-<device code>-<unix seconds>, so the order itself says
// which device paid and when; nothing has to be stored.
export const makeOrder = device => `PRM-${device}-${Math.floor(Date.now() / 1000)}`;

export function parseOrder(order) {
  const m = /^PRM-([0-9A-HJKMNP-TV-Z]{8})-(\d{9,11})$/.exec(String(order || ''));
  return m && { device: m[1], at: Number(m[2]) * 1000 };
}

// Kashier signs the query string of its redirect with the payment API key.
export function redirectSigned(query) {
  if (!query.signature) return false;
  const text = Object.keys(query)
    .filter(k => k !== 'signature' && k !== 'mode')
    .map(k => `${k}=${query[k]}`).join('&');
  const expected = createHmac('sha256', process.env.KASHIER_API_KEY).update(text).digest('hex');
  return expected === String(query.signature).toLowerCase();
}

export function page(res, status, title, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex');
  res.end(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} — الملقن</title>
<style>
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0d1a;color:#f4f1e6;
font-family:system-ui,"Segoe UI",Tahoma,sans-serif;padding:16px;box-sizing:border-box}
main{max-width:440px;width:100%;background:#14172b;border:1px solid #2b2f4d;border-radius:20px;padding:28px 22px;text-align:center}
h1{font-size:22px;margin:0 0 10px;color:#e9c46a}p{line-height:1.8;color:#c9c6d6;margin:8px 0}
.code{direction:ltr;font:700 24px ui-monospace,Consolas,monospace;letter-spacing:1px;background:#0b0d1a;
border:1px dashed #e9c46a;border-radius:14px;padding:16px 8px;margin:18px 0;color:#fff;user-select:all}
a.btn,button{display:block;width:100%;box-sizing:border-box;border:0;border-radius:14px;padding:14px;font:700 16px inherit;
background:#e9c46a;color:#0b0d1a;text-decoration:none;cursor:pointer;margin-top:10px}
a.ghost{background:transparent;color:#e9c46a;border:1px solid #e9c46a}small{color:#8d8aa3;display:block;margin-top:14px;line-height:1.7}
</style></head><body><main>${body}</main></body></html>`);
}
