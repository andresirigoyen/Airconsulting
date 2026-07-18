/**
 * Premium transactional email for internal lead notifications.
 * Table + inline CSS for Gmail / Outlook / Apple Mail.
 */

const SERVICE_LABELS = {
  fullstack: 'Full stack / Platform',
  ecommerce: 'E-commerce / Online store',
  landing: 'Landing page',
  'seo-basic': 'Basic SEO',
  'seo-geo': 'SEO & GEO',
  marketing: 'Digital marketing',
  care: 'Care plan',
  'care-growth': 'Care + Growth',
  other: 'Other / Unsure',
};

const BUDGET_LABELS = {
  'seo-199': 'SEO / setup ~USD 199',
  'landing-600': 'Landing ~USD 600',
  '2000-10000': 'USD 2,000 – 10,000',
  '10000+': 'USD 10,000+',
  'care-monthly': 'Care ~USD 200–350 / mo',
  'care-growth-monthly': 'Care + Growth ~USD 450–800 / mo',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function dash(value) {
  const v = String(value ?? '').trim();
  return v ? escapeHtml(v) : '—';
}

function serviceLabel(code) {
  return SERVICE_LABELS[code] || code || '—';
}

function budgetLabel(code) {
  if (!code) return 'Not specified';
  return BUDGET_LABELS[code] || code;
}

function computePriority(service, budget) {
  if (budget === '10000+' || service === 'care-growth' || service === 'fullstack') {
    return { key: 'high', label: 'High', emoji: '🟢' };
  }
  if (
    budget === '2000-10000' ||
    budget === 'care-growth-monthly' ||
    service === 'ecommerce' ||
    service === 'landing' ||
    service === 'care'
  ) {
    return { key: 'medium', label: 'Medium', emoji: '🟡' };
  }
  return { key: 'low', label: 'Low', emoji: '🔴' };
}

function computeLeadScore(service, budget, message) {
  let score = 40;
  if (service === 'fullstack' || service === 'ecommerce') score += 25;
  else if (service === 'landing' || service === 'care-growth') score += 15;
  else if (service === 'care' || service === 'seo-geo') score += 10;
  if (budget === '10000+') score += 25;
  else if (budget === '2000-10000' || budget === 'care-growth-monthly') score += 18;
  else if (budget === 'landing-600' || budget === 'care-monthly') score += 10;
  else if (budget) score += 5;
  if (message && message.length > 180) score += 10;
  else if (message && message.length > 80) score += 5;
  return Math.min(98, score);
}

function buildAiSummary({ service, budget, message, website, currentWebsite }) {
  const lines = [];
  lines.push(`Interested in ${serviceLabel(service)}.`);
  lines.push(budget ? `Budget: ${budgetLabel(budget)}.` : 'No budget specified.');
  const hasSite =
    Boolean(website || currentWebsite) ||
    /https?:\/\//i.test(message || '') ||
    /\bwww\./i.test(message || '');
  lines.push(hasSite ? 'Existing website.' : 'No existing website mentioned.');
  lines.push('Needs follow-up.');
  return lines;
}

function row(label, valueHtml) {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #E5E7EB;font-family:Inter,Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4;color:#64748B;width:38%;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #E5E7EB;font-family:Inter,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.45;color:#0F172A;font-weight:600;vertical-align:top;">${valueHtml}</td>
    </tr>`;
}

function sectionTitle(emoji, title) {
  return `
    <tr>
      <td style="padding:0 0 14px 0;font-family:Inter,Arial,Helvetica,sans-serif;font-size:15px;line-height:1.3;font-weight:700;color:#0F172A;">
        ${emoji}&nbsp;&nbsp;${escapeHtml(title)}
      </td>
    </tr>`;
}

/**
 * @param {object} lead
 */
function buildLeadEmailHtml(lead) {
  const {
    name = '',
    email = '',
    phone = '',
    company = '',
    country = '',
    website = '',
    service = '',
    budget = '',
    timeline = '',
    currentWebsite = '',
    message = '',
    landingPage = 'https://www.irigoyendev.com/#contact',
    source = '',
    medium = '',
    campaign = '',
    referrer = '',
    device = '',
    browser = '',
    submissionId = '',
    timestamp = new Date().toISOString(),
    ipAddress = '',
    utm = {},
  } = lead;

  const priority = computePriority(service, budget);
  const score = lead.leadScore != null ? lead.leadScore : computeLeadScore(service, budget, message);
  const svc = serviceLabel(service);
  const bud = budgetLabel(budget);
  const aiLines = Array.isArray(lead.aiSummary)
    ? lead.aiSummary
    : buildAiSummary({ service, budget, message, website, currentWebsite });
  const msgHtml = escapeHtml(message).replace(/\n/g, '<br>');
  const dateStr = (() => {
    try {
      return new Date(timestamp).toLocaleString('en-GB', {
        timeZone: 'Europe/Copenhagen',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    } catch {
      return escapeHtml(String(timestamp));
    }
  })();

  const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: Your project with IrigoyenDev`)}`;
  const utmStr = [
    utm.source && `utm_source=${utm.source}`,
    utm.medium && `utm_medium=${utm.medium}`,
    utm.campaign && `utm_campaign=${utm.campaign}`,
    utm.term && `utm_term=${utm.term}`,
    utm.content && `utm_content=${utm.content}`,
  ]
    .filter(Boolean)
    .join('&') || '—';

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>New Lead — IrigoyenDev</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    #outlook a { padding: 0; }
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; }
    a { color: #2563EB; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
      .px-mobile { padding-left: 20px !important; padding-right: 20px !important; }
      .badge-wrap { display: block !important; margin-bottom: 8px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:Inter,Arial,Helvetica,sans-serif;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">
    New lead: ${escapeHtml(svc)} · ${escapeHtml(name)} · ${escapeHtml(bud)}
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#F8FAFC;">
    <tr>
      <td align="center" style="padding:32px 16px;">

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" class="email-container" style="width:600px;max-width:600px;">

          <!-- HEADER -->
          <tr>
            <td class="px-mobile" style="padding:8px 8px 28px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="font-family:Inter,Arial,Helvetica,sans-serif;font-size:18px;font-weight:700;letter-spacing:-0.02em;color:#0F172A;">
                    Irigoyen<span style="color:#2563EB;">Dev</span><span style="color:#2563EB;">.</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:26px;line-height:1.25;font-weight:700;letter-spacing:-0.03em;color:#0F172A;">
                    🚀 New Lead
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:8px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#64748B;">
                    A new prospect has submitted your contact form.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MAIN SUMMARY CARD -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;">
                <tr>
                  <td class="px-mobile" style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom:16px;">
                          <span class="badge-wrap" style="display:inline-block;margin:0 8px 8px 0;padding:6px 12px;background-color:#EFF6FF;border:1px solid #BFDBFE;border-radius:999px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;line-height:1;color:#2563EB;letter-spacing:0.02em;">
                            ${escapeHtml(svc)}
                          </span>
                          <span class="badge-wrap" style="display:inline-block;margin:0 8px 8px 0;padding:6px 12px;background-color:#F8FAFC;border:1px solid #E5E7EB;border-radius:999px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;line-height:1;color:#0F172A;">
                            ${priority.emoji} ${priority.label}
                          </span>
                          <span class="badge-wrap" style="display:inline-block;margin:0 0 8px 0;padding:6px 12px;background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:999px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;font-weight:600;line-height:1;color:#475569;">
                            ${escapeHtml(bud)}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            ${row('Date &amp; Time', escapeHtml(dateStr))}
                            ${row('Lead Score', `<span style="display:inline-block;padding:4px 10px;background-color:#ECFDF5;border:1px solid #A7F3D0;border-radius:8px;font-size:13px;font-weight:700;color:#059669;">${escapeHtml(String(score))}/100</span>`)}
                            ${row('Prospect', escapeHtml(name))}
                            ${row('Email', `<a href="${mailto}" style="color:#2563EB;text-decoration:none;font-weight:600;">${escapeHtml(email)}</a>`)}
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top:20px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td align="center" style="border-radius:10px;background-color:#2563EB;">
                                <a href="${mailto}" style="display:inline-block;padding:12px 22px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:14px;font-weight:700;line-height:1;color:#FFFFFF;text-decoration:none;border-radius:10px;">
                                  Reply to lead →
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CLIENT -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;">
                <tr>
                  <td class="px-mobile" style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${sectionTitle('👤', 'Client')}
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            ${row('Name', escapeHtml(name))}
                            ${row('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(email)}</a>`)}
                            ${row('Phone', dash(phone))}
                            ${row('Company', dash(company))}
                            ${row('Country', dash(country))}
                            ${row('Website', website ? `<a href="${escapeHtml(website)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(website)}</a>` : '—')}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PROJECT -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;">
                <tr>
                  <td class="px-mobile" style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${sectionTitle('💼', 'Project')}
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            ${row('Requested Service', `<span style="display:inline-block;padding:4px 10px;background-color:#EFF6FF;border:1px solid #BFDBFE;border-radius:999px;font-size:12px;font-weight:700;color:#2563EB;">${escapeHtml(svc)}</span>`)}
                            ${row('Budget', `<span style="display:inline-block;padding:4px 10px;background-color:#F1F5F9;border:1px solid #E2E8F0;border-radius:999px;font-size:12px;font-weight:600;color:#475569;">${escapeHtml(bud)}</span>`)}
                            ${row('Timeline', dash(timeline))}
                            ${row('Current Website', currentWebsite ? `<a href="${escapeHtml(currentWebsite)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(currentWebsite)}</a>` : '—')}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MESSAGE -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;">
                <tr>
                  <td class="px-mobile" style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${sectionTitle('📝', 'Project Description')}
                      <tr>
                        <td style="padding:16px 18px;background-color:#F8FAFC;border:1px solid #E5E7EB;border-radius:12px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:#0F172A;">
                          ${msgHtml}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- AI SUMMARY -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;">
                <tr>
                  <td class="px-mobile" style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${sectionTitle('✨', 'AI Summary')}
                      <tr>
                        <td style="padding:16px 18px;background-color:#FFFBEB;border:1px solid #FDE68A;border-radius:12px;">
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            ${aiLines
                              .map(
                                (line) => `
                              <tr>
                                <td style="padding:4px 0;font-family:Inter,Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#92400E;">
                                  • ${escapeHtml(line)}
                                </td>
                              </tr>`
                              )
                              .join('')}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- MARKETING -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;">
                <tr>
                  <td class="px-mobile" style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${sectionTitle('📈', 'Acquisition')}
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            ${row('Landing Page', landingPage ? `<a href="${escapeHtml(landingPage)}" style="color:#2563EB;text-decoration:none;">${escapeHtml(landingPage)}</a>` : '—')}
                            ${row('Source', dash(source))}
                            ${row('Medium', dash(medium))}
                            ${row('Campaign', dash(campaign))}
                            ${row('Referrer', dash(referrer))}
                            ${row('Device', dash(device))}
                            ${row('Browser', dash(browser))}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TECHNICAL -->
          <tr>
            <td style="padding:0 0 16px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFFFF;border:1px solid #E5E7EB;border-radius:12px;">
                <tr>
                  <td class="px-mobile" style="padding:24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                      ${sectionTitle('🛠', 'Technical Details')}
                      <tr>
                        <td>
                          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                            ${row('Submission ID', `<span style="font-family:ui-monospace,Consolas,monospace;font-size:12px;font-weight:600;color:#334155;">${dash(submissionId)}</span>`)}
                            ${row('Timestamp', escapeHtml(String(timestamp)))}
                            ${row('IP Address', dash(ipAddress))}
                            ${row('UTM Parameters', `<span style="font-family:ui-monospace,Consolas,monospace;font-size:12px;font-weight:500;color:#334155;word-break:break-all;">${escapeHtml(utmStr === '—' ? '—' : utmStr)}</span>`)}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td class="px-mobile" style="padding:28px 8px 8px 8px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="border-top:1px solid #E5E7EB;padding-top:20px;font-family:Inter,Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#94A3B8;text-align:center;">
                    Powered by IrigoyenDev<br>
                    <a href="https://www.irigoyendev.com" style="color:#2563EB;text-decoration:none;font-weight:600;">www.irigoyendev.com</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function parseUserAgent(ua) {
  const raw = String(ua || '');
  if (!raw) return { device: '', browser: '' };
  const device = /Mobile|Android|iPhone|iPad/i.test(raw) ? 'Mobile' : 'Desktop';
  let browser = 'Unknown';
  if (/Edg\//i.test(raw)) browser = 'Edge';
  else if (/Chrome\//i.test(raw) && !/Chromium/i.test(raw)) browser = 'Chrome';
  else if (/Safari\//i.test(raw) && !/Chrome/i.test(raw)) browser = 'Safari';
  else if (/Firefox\//i.test(raw)) browser = 'Firefox';
  return { device, browser };
}

module.exports = {
  buildLeadEmailHtml,
  serviceLabel,
  budgetLabel,
  computePriority,
  computeLeadScore,
  parseUserAgent,
  SERVICE_LABELS,
  BUDGET_LABELS,
};
