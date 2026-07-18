const { Resend } = require('resend');

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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
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

  if (!name || !email || !message || !service || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = `Nuevo lead · ${service} · ${name}`;
  const text = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Servicio: ${service}`,
    `Presupuesto: ${budget || '—'}`,
    '',
    'Mensaje:',
    message,
  ].join('\n');

  const html = `
    <h2>Nuevo lead desde irigoyendev.com</h2>
    <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Servicio:</strong> ${escapeHtml(service)}</p>
    <p><strong>Presupuesto:</strong> ${escapeHtml(budget || '—')}</p>
    <p><strong>Mensaje:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

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

    return res.status(200).json({ ok: true, id: data?.id || null });
  } catch (err) {
    console.error('Send failed:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
