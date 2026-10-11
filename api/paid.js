// /api/paid — where Kashier sends the customer back. Confirms the payment
// and shows the subscription code for the device that paid.
import { PRICE, SUPPORT, formatCode, isTest, kashier, makeLicenseCode, page, parseOrder,
  redirectSigned } from './_lib.js';

const DAY = 86400000;

// The order that was really paid, or null.
async function paidOrder(req, query) {
  // Best proof: ask Kashier about the session this browser started.
  const cookie = /(?:^|;\s*)ks=([a-f0-9]{24})(?:;|$)/.exec(req.headers.cookie || '');
  if (cookie) {
    const got = await kashier(`/v3/payment/sessions/${cookie[1]}/payment`).catch(() => null);
    const data = got && got.ok && got.json.data;
    if (data) {
      const status = String(data.status || '').toUpperCase();
      const paid = ['PAID', 'CAPTURED', 'SUCCESS'].includes(status) ||
        Number(data.capturedAmount) >= PRICE;
      const whole = Number(data.amount) === PRICE && data.currency === 'EGP' &&
        !(Number(data.refundedAmount) > 0) &&
        data.merchantId === process.env.KASHIER_MERCHANT_ID;
      if (paid && whole) return parseOrder(data.merchantOrderId);
      console.log('session not paid', status, data.capturedAmount);
      if (status !== 'CREATED') return null;
    }
  }
  // Otherwise trust only what Kashier signed in the redirect.
  if (redirectSigned(query) && String(query.paymentStatus).toUpperCase() === 'SUCCESS' &&
      Number(query.amount) === PRICE && query.currency === 'EGP') {
    return parseOrder(query.merchantOrderId);
  }
  console.log('redirect not accepted', Object.keys(query).join(','), query.paymentStatus);
  return null;
}

export default async function handler(req, res) {
  const query = Object.fromEntries(new URL(req.url, 'http://x').searchParams);
  let order = null;
  try { order = await paidOrder(req, query); } catch (e) { console.error('paid check failed', e); }

  if (!order) {
    const again = parseOrder(query.merchantOrderId);
    return page(res, 200, 'لم يتم الدفع', `<h1>لم يكتمل الدفع</h1>
<p>لم نستلم تأكيد الدفع، ولم يُخصم منك شيء إن لم تكتمل العملية.</p>
${again ? `<a class="btn" href="/api/pay?device=${again.device}">حاول مرة أخرى</a>` : ''}
<a class="btn ghost" href="${SUPPORT}">دفعت ولم يظهر الكود؟ كلّمنا واتساب</a>`);
  }

  // Counted from when the order was made, so reopening this page never
  // extends the subscription. Test payments only unlock one hour.
  const length = isTest() ? 3600000 : 30 * DAY;
  let made;
  try { made = makeLicenseCode(order.device, order.at + length); } catch (e) {
    console.error(e);
    return page(res, 500, 'تم الدفع', `<h1>تم الدفع ✓</h1>
<p>استلمنا دفعتك لكن تعذّر إصدار الكود تلقائياً. أرسل لنا كود جهازك
<b dir="ltr">${order.device}</b> على واتساب وسنرسل الكود فوراً.</p>
<a class="btn" href="${SUPPORT}">واتساب</a>`);
  }
  const code = formatCode(made.code);
  const until = made.expiry.toLocaleString('ar-EG', { timeZone: 'Africa/Cairo',
    dateStyle: 'long', timeStyle: 'short' });
  page(res, 200, 'تم الدفع', `<h1>تم الدفع بنجاح ✓</h1>
<p>هذا كود اشتراكك لجهاز <b dir="ltr">${order.device}</b>. انسخه واكتبه في صفحة الاشتراك داخل التطبيق.</p>
<div class="code" id="code">${code}</div>
<button id="copy">نسخ الكود</button>
<small>صالح حتى ${until}${isTest() ? ' — وضع تجريبي (ساعة واحدة)' : ''}.<br>
احتفظ بلقطة شاشة لهذه الصفحة. الكود يعمل على هذا الجهاز فقط.</small>
<a class="btn ghost" href="${SUPPORT}">محتاج مساعدة؟ واتساب</a>
<script>document.getElementById('copy').onclick=function(){
navigator.clipboard.writeText('${code}');this.textContent='تم النسخ ✓';};</script>`);
}
