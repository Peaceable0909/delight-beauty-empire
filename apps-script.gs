// ─────────────────────────────────────────────────────────────────────────────
// Delight Beauty Empire — Google Apps Script (Contact Form Backend)
//
// HOW TO SET UP (5 minutes):
// 1. Go to https://script.google.com and click "New project"
// 2. Delete everything and paste this entire file
// 3. Click the floppy disk icon to save (name it "Delight Beauty Empire")
// 4. Click "Deploy" → "New deployment"
// 5. Choose "Web app" as type
// 6. Set "Execute as" → Me
// 7. Set "Who has access" → Anyone
// 8. Click Deploy, then COPY the Web App URL
// 9. Open index.html, find the line that says:
//       const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
//    and replace YOUR_APPS_SCRIPT_URL_HERE with the URL you copied
// ─────────────────────────────────────────────────────────────────────────────

const OWNER_EMAIL = 'femiolaniyi36@gmail.com';
const BUSINESS_NAME = 'Delight Beauty Empire';
const WHATSAPP = '+234 903 366 0736';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const name    = sanitize(data.name    || '');
    const phone   = sanitize(data.phone   || '');
    const email   = sanitize(data.email   || '');
    const service = sanitize(data.service || '');
    const date    = sanitize(data.date    || 'Not specified');
    const message = sanitize(data.message || 'No message provided');

    // ── Email to you (the business owner) ──
    const ownerSubject = `💄 New Booking Request — ${service} from ${name}`;
    const ownerBody = `
You have a new booking request from your website!

─────────────────────────────
  CLIENT DETAILS
─────────────────────────────
  Name:       ${name}
  Phone:      ${phone}
  Email:      ${email}
  Service:    ${service}
  Date:       ${date}
  Message:    ${message}
─────────────────────────────

Reply to: ${email}
WhatsApp client: https://wa.me/${phone.replace(/[^0-9]/g, '')}

Sent automatically from your ${BUSINESS_NAME} website.
`.trim();

    MailApp.sendEmail({
      to: OWNER_EMAIL,
      subject: ownerSubject,
      body: ownerBody,
      replyTo: email
    });

    // ── Confirmation email to the client ──
    const clientSubject = `Thank you, ${name}! We received your booking request 💄`;
    const clientBody = `
Hi ${name},

Thank you for reaching out to ${BUSINESS_NAME}! 🌸

We have received your booking request for: ${service}
Preferred date: ${date}

We will get back to you within a few hours to confirm your appointment.

For urgent enquiries, please WhatsApp us directly:
📱 ${WHATSAPP}

Or follow us on Instagram for daily beauty inspiration:
📸 @delightbeautyempire

With love & beauty,
The ${BUSINESS_NAME} Team ✨
`.trim();

    MailApp.sendEmail({
      to: email,
      subject: clientSubject,
      body: clientBody
    });

    return jsonResponse({ success: true });

  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

// Allow preflight CORS check from browsers
function doGet(e) {
  return jsonResponse({ status: 'Delight Beauty Empire form endpoint is live.' });
}

function sanitize(str) {
  return String(str).replace(/<[^>]*>/g, '').trim().substring(0, 500);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
