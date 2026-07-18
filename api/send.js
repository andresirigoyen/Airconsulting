const { Resend } = require('resend');
const {
  buildLeadEmailHtml,
  serviceLabel,
  budgetLabel,
  parseUserAgent,
} = require('./lead-email');

/**
 * Domain irigoyendev.com must be verified in Resend.
 * Public inbox: andres@irigoyendev.com (Private Email).
 * From: noreply@ on the verified sending domain.
 */
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'andres@irigoyendev.com';
const FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL || 'IrigoyenDev <noreply@irigoyendev.com>';

function sanitize(value, maxLen) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen).replace(/[\0-\x08\x0B\x0C\x0E-\x1F<>]/g, '');
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function readBody(req) {
  if (req.body == null) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body || '{}');
    } catch {
      return {};
    }
  }
  return req.body;
}

function clientIp(req) {
  const xf = req.headers['x-forwarded-for'];
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim().slice(0, 64);
  if (Array.isArray(xf) && xf[0]) return String(xf[0]).slice(0, 64);
  return sanitize(req.headers['x-real-ip'] || '', 64);
}

function submissionId() {
  return `ld_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not configured');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  const body = readBody(req);

  if (sanitize(body.website || '', 200)) {
    return res.status(200).json({ ok: true });
  }

  const name = sanitize(body.name, 120);
  const email = sanitize(body.email, 254);
  const message = sanitize(body.message, 2000);
  const budget = sanitize(body.budget || '', 32);
  const service = sanitize(body.service || '', 64);
  const phone = sanitize(body.phone || '', 40);
  const company = sanitize(body.company || '', 120);
  const country = sanitize(body.country || '', 80);
  const clientWebsite = sanitize(body.clientWebsite || body.site || '', 200);
  const timeline = sanitize(body.timeline || '', 80);

  if (!name || !email || !message || !service || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const id = submissionId();
  const timestamp = new Date().toISOString();
  const referrer = sanitize(body.referrer || req.headers.referer || '', 300);
  const landingPage = sanitize(
    body.landingPage || req.headers.referer || 'https://www.irigoyendev.com/#contact',
    300
  );
  const source = sanitize(body.utm_source || body.source || '', 80);
  const medium = sanitize(body.utm_medium || body.medium || '', 80);
  const campaign = sanitize(body.utm_campaign || body.campaign || '', 80);
  const { device, browser } = parseUserAgent(req.headers['user-agent']);
  const ipAddress = clientIp(req);

  const lead = {
    name,
    email,
    phone,
    company,
    country,
    website: clientWebsite,
    service,
    budget,
    timeline,
    currentWebsite: clientWebsite,
    message,
    landingPage,
    source,
    medium,
    campaign,
    referrer,
    device,
    browser,
    submissionId: id,
    timestamp,
    ipAddress,
    utm: {
      source,
      medium,
      campaign,
      term: sanitize(body.utm_term || '', 80),
      content: sanitize(body.utm_content || '', 80),
    },
  };

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = `🚀 New Lead · ${serviceLabel(service)} · ${name}`;
  const text = [
    'NEW LEAD — IrigoyenDev',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Service: ${serviceLabel(service)}`,
    `Budget: ${budgetLabel(budget)}`,
    `Submission ID: ${id}`,
    `Timestamp: ${timestamp}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const html = buildLeadEmailHtml(lead);

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(502).json({
        error: 'Failed to send email',
        code: error.name || 'resend_error',
      });
    }

    return res.status(200).json({ ok: true, id: data?.id || null, submissionId: id });
  } catch (err) {
    console.error('Send failed:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
