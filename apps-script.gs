// ─────────────────────────────────────────────────────────────────────────────
// Delight Beauty Empire — Google Apps Script (Beautiful HTML Email)
//
// HOW TO SET UP:
// 1. Go to https://script.google.com → New project
// 2. Delete everything and paste this entire file
// 3. Click Deploy → New deployment → Web app
// 4. Execute as: Me | Who has access: Anyone → Deploy → Copy URL
// 5. In index.html replace YOUR_APPS_SCRIPT_URL_HERE with the copied URL
// ─────────────────────────────────────────────────────────────────────────────

const OWNER_EMAIL    = 'delightbeautyempire4@gmail.com';
const BUSINESS_NAME  = 'Delight Beauty Empire';
const WHATSAPP       = '+234 903 366 0736';
const INSTAGRAM      = '@delightbeautyempire';
const WEBSITE        = 'https://Peaceable0909.github.io/delight-beauty-empire';

function doPost(e) {
  try {
    const data    = JSON.parse(e.postData.contents);
    const name    = sanitize(data.name    || '');
    const phone   = sanitize(data.phone   || '');
    const email   = sanitize(data.email   || '');
    const service = sanitize(data.service || '');
    const date    = sanitize(data.date    || 'Flexible');
    const message = sanitize(data.message || 'No additional message');

    // ── Beautiful email to the business owner ──
    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: '💄 New Booking Request — ' + service + ' from ' + name,
      htmlBody: ownerEmailHtml(name, phone, email, service, date, message),
      replyTo: email
    });

    // ── Beautiful confirmation email to the client ──
    MailApp.sendEmail({
      to: email,
      subject: 'We received your booking! ✨ — ' + BUSINESS_NAME,
      htmlBody: clientEmailHtml(name, service, date)
    });

    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

function doGet() {
  return jsonResponse({ status: 'Delight Beauty Empire form endpoint is live.' });
}

// ─── Owner notification email ───────────────────────────────────────────────
function ownerEmailHtml(name, phone, email, service, date, message) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0f7;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#3B1040 0%,#2D0A30 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#C9A96E;">New Booking Request</p>
          <h1 style="margin:0;font-size:26px;color:#ffffff;font-weight:400;letter-spacing:1px;">${BUSINESS_NAME}</h1>
          <p style="margin:10px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">Someone wants to book a session 💄</p>
        </td></tr>

        <!-- Notification badge -->
        <tr><td style="background:#B5547F;padding:14px 40px;text-align:center;">
          <p style="margin:0;font-size:13px;color:white;font-weight:500;">✨ ${service}</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:36px 40px;">

          <p style="margin:0 0 24px;font-size:15px;color:#4A2040;font-weight:500;">Hello! You have a new booking request:</p>

          <!-- Client details table -->
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #f0e8f0;">
            <tr style="background:#fdf5fb;">
              <td style="padding:14px 20px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B5547F;font-weight:600;width:35%;">Name</td>
              <td style="padding:14px 20px;font-size:14px;color:#2D1B2E;font-weight:500;">${name}</td>
            </tr>
            <tr style="background:#ffffff;">
              <td style="padding:14px 20px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B5547F;font-weight:600;">Phone</td>
              <td style="padding:14px 20px;font-size:14px;color:#2D1B2E;">${phone}</td>
            </tr>
            <tr style="background:#fdf5fb;">
              <td style="padding:14px 20px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B5547F;font-weight:600;">Email</td>
              <td style="padding:14px 20px;font-size:14px;color:#2D1B2E;">${email}</td>
            </tr>
            <tr style="background:#ffffff;">
              <td style="padding:14px 20px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B5547F;font-weight:600;">Service</td>
              <td style="padding:14px 20px;font-size:14px;color:#2D1B2E;font-weight:500;">${service}</td>
            </tr>
            <tr style="background:#fdf5fb;">
              <td style="padding:14px 20px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B5547F;font-weight:600;">Date</td>
              <td style="padding:14px 20px;font-size:14px;color:#2D1B2E;">${date}</td>
            </tr>
            <tr style="background:#ffffff;">
              <td style="padding:14px 20px;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#B5547F;font-weight:600;vertical-align:top;">Message</td>
              <td style="padding:14px 20px;font-size:14px;color:#6B6B6B;line-height:1.7;">${message}</td>
            </tr>
          </table>

          <!-- Action buttons -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr>
              <td align="center" style="padding:0 6px;">
                <a href="mailto:${email}" style="display:inline-block;background:#B5547F;color:white;text-decoration:none;padding:13px 28px;border-radius:25px;font-size:13px;font-weight:500;">Reply to Client</a>
              </td>
              <td align="center" style="padding:0 6px;">
                <a href="https://wa.me/${phone.replace(/[^0-9]/g,'')}" style="display:inline-block;background:#25D366;color:white;text-decoration:none;padding:13px 28px;border-radius:25px;font-size:13px;font-weight:500;">WhatsApp Client</a>
              </td>
            </tr>
          </table>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#2D1B2E;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 6px;font-size:13px;color:#C9A96E;letter-spacing:2px;">${BUSINESS_NAME.toUpperCase()}</p>
          <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.3);">This email was sent automatically from your website booking form.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

// ─── Client confirmation email ───────────────────────────────────────────────
function clientEmailHtml(name, service, date) {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f0f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0f7;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#3B1040 0%,#2D0A30 100%);border-radius:16px 16px 0 0;padding:48px 40px;text-align:center;">
          <p style="margin:0 0 10px;font-size:36px;">💄</p>
          <h1 style="margin:0 0 8px;font-size:28px;color:#ffffff;font-weight:400;letter-spacing:1px;">${BUSINESS_NAME}</h1>
          <p style="margin:0;font-size:13px;color:#C9A96E;letter-spacing:3px;text-transform:uppercase;">Where Beauty Meets Elegance</p>
        </td></tr>

        <!-- Gold bar -->
        <tr><td style="background:linear-gradient(90deg,#B5547F,#C9A96E);padding:3px;"></td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:44px 40px;text-align:center;">

          <p style="margin:0 0 8px;font-size:22px;color:#2D1B2E;font-weight:400;">Thank you, <strong style="color:#B5547F;">${name}</strong>! 🌸</p>
          <p style="margin:0 0 32px;font-size:15px;color:#6B6B6B;line-height:1.8;">
            We have received your booking request and we are so excited to work with you!
            Our team will get back to you very soon.
          </p>

          <!-- Booking summary box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf5fb;border-radius:14px;border:1px solid #f0d8ea;margin-bottom:32px;">
            <tr><td style="padding:20px 28px;border-bottom:1px solid #f0d8ea;text-align:left;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B5547F;">Service requested</p>
              <p style="margin:0;font-size:16px;color:#2D1B2E;font-weight:500;">${service}</p>
            </td></tr>
            <tr><td style="padding:20px 28px;text-align:left;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#B5547F;">Preferred date</p>
              <p style="margin:0;font-size:16px;color:#2D1B2E;font-weight:500;">${date}</p>
            </td></tr>
          </table>

          <!-- Response time badge -->
          <p style="margin:0 0 28px;font-size:13px;color:#6B6B6B;background:#f9f4fb;border-radius:10px;padding:14px 20px;display:inline-block;">
            ⏰ We typically respond within <strong style="color:#B5547F;">a few hours</strong>
          </p>

          <!-- WhatsApp CTA -->
          <p style="margin:0 0 16px;font-size:13px;color:#6B6B6B;">Need to reach us urgently?</p>
          <a href="https://wa.me/${WHATSAPP.replace(/[^0-9]/g,'')}" style="display:inline-block;background:#25D366;color:white;text-decoration:none;padding:14px 36px;border-radius:25px;font-size:14px;font-weight:500;margin-bottom:32px;">
            💬 Chat on WhatsApp
          </a>

          <hr style="border:none;border-top:1px solid #f0e8f0;margin:0 0 28px;">

          <p style="margin:0;font-size:13px;color:#6B6B6B;line-height:1.8;">
            Follow us for daily beauty inspiration 📸<br>
            <a href="https://www.instagram.com/delightbeautyempire" style="color:#B5547F;text-decoration:none;font-weight:500;">Instagram ${INSTAGRAM}</a>
          </p>

        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#2D1B2E;border-radius:0 0 16px 16px;padding:28px 40px;text-align:center;">
          <p style="margin:0 0 8px;font-size:14px;color:#C9A96E;letter-spacing:2px;text-transform:uppercase;">${BUSINESS_NAME}</p>
          <p style="margin:0 0 12px;font-size:12px;color:rgba(255,255,255,0.4);">Where Beauty Meets Elegance &amp; Grace</p>
          <a href="${WEBSITE}" style="font-size:11px;color:rgba(255,255,255,0.3);text-decoration:none;">${WEBSITE}</a>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

function sanitize(str) {
  return String(str).replace(/</g,'&lt;').replace(/>/g,'&gt;').trim().substring(0,500);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
