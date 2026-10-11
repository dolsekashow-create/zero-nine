// /api/pay?device=XXXXXXXX — opens Kashier's payment page for one month of
// «الملقن» on the device with that code.
import { PRICE, SUPPORT, kashier, makeOrder, normalize, page } from './_lib.js';

export default async function handler(req, res) {
  const device = normalize(new URL(req.url, 'http://x').searchParams.get('device') || '');
  if (device.length !== 8) {
    return page(res, 400, 'كود الجهاز غير صحيح', `<h1>كود الجهاز غير صحيح</h1>
<p>افتح صفحة الاشتراك داخل تطبيق «الملقن» واضغط «ادفع أونلاين» من هناك.</p>
<a class="btn ghost" href="${SUPPORT}">تواصل معنا واتساب</a>`);
  }
  const site = 'https://www.zero--nine.online';
  let created;
  try {
    created = await kashier('/v3/payment/sessions', {
      merchantId: process.env.KASHIER_MERCHANT_ID,
      order: makeOrder(device),
      amount: PRICE.toFixed(2),
      currency: 'EGP',
      paymentType: 'credit',
      type: 'one-time',
      merchantRedirect: `${site}/api/paid`,
      failureRedirect: true,
      display: 'ar',
      allowedMethods: 'card,wallet',
      description: 'Prompter subscription (30 days)',
      metaData: { device },
      customer: { reference: device },
    });
  } catch (e) {
    created = { ok: false, status: 0, json: {} };
  }
  const session = created.json;
  if (!created.ok || !session.sessionUrl || !session._id) {
    console.error('kashier create failed', created.status, session.message);
    return page(res, 502, 'تعذّر فتح صفحة الدفع', `<h1>تعذّر فتح صفحة الدفع</h1>
<p>حاول مرة أخرى بعد قليل، أو اشترك عن طريق واتساب.</p>
<a class="btn" href="/api/pay?device=${device}">حاول مرة أخرى</a>
<a class="btn ghost" href="${SUPPORT}">تواصل معنا واتساب</a>`);
  }
  // Remembered so /api/paid can ask Kashier itself whether this was paid.
  res.setHeader('Set-Cookie',
    `ks=${session._id}; Path=/api; Max-Age=86400; HttpOnly; Secure; SameSite=Lax`);
  res.setHeader('Cache-Control', 'no-store');
  res.statusCode = 302;
  res.setHeader('Location', session.sessionUrl);
  res.end();
}
