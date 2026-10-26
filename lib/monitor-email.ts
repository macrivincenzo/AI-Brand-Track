import { sendEmail } from '@/lib/email';
import type { SnapshotMetrics } from '@/lib/historical-tracking';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://www.aibrandtrack.com';

/** AI answers vary run to run; smaller moves than this are reported as "about the same". */
const NOISE_THRESHOLD = 3;

interface Contact {
  email: string;
  name: string | null;
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

function layout(body: string) {
  return `<div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #111; font-size: 18px; line-height: 1.6;">
${body}
<p style="color: #888; font-size: 14px; margin-top: 32px;">AI Brand Track · You get this email because weekly monitoring is on. Manage it in your <a href="${APP_URL}/dashboard" style="color: #888;">dashboard</a>.</p>
</div>`;
}

function button(href: string, label: string) {
  return `<p style="margin: 28px 0;"><a href="${href}" style="background: #111; color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-size: 18px;">${label}</a></p>`;
}

export function describeChange(current: number, previous: number | null | undefined) {
  if (previous == null) return { text: 'first weekly check', arrow: '' };
  const delta = current - previous;
  if (Math.abs(delta) < NOISE_THRESHOLD) return { text: 'about the same as last week', arrow: '→' };
  return delta > 0
    ? { text: `up ${delta} from last week`, arrow: '↑' }
    : { text: `down ${Math.abs(delta)} from last week`, arrow: '↓' };
}

export async function sendWeeklyReportEmail(
  contact: Contact,
  data: { companyName: string; current: SnapshotMetrics; previous: SnapshotMetrics | null; analysis: { competitors?: { name: string; visibilityScore?: number }[] } },
) {
  const { companyName, current, previous } = data;
  const change = describeChange(current.visibilityScore, previous?.visibilityScore);
  const name = escapeHtml(companyName);
  const top = [...(data.analysis.competitors ?? [])]
    .sort((a, b) => (b.visibilityScore ?? 0) - (a.visibilityScore ?? 0))
    .slice(0, 5)
    .map((c, i) => `<li style="margin: 4px 0;">${i + 1}. ${escapeHtml(c.name)}${c.name.toLowerCase() === companyName.toLowerCase() ? ' <strong>(you)</strong>' : ''}</li>`)
    .join('');

  const html = layout(`
<h1 style="font-size: 26px; margin-bottom: 4px;">${name}: your AI visibility this week</h1>
<p style="font-size: 56px; font-weight: bold; margin: 16px 0 0;">${current.visibilityScore}<span style="font-size: 24px; color: #666;">/100</span></p>
<p style="font-size: 20px; margin-top: 4px;">${change.arrow} ${change.text}</p>
${current.rank ? `<p>You rank <strong>#${current.rank}</strong> among the brands AI assistants mention in your category.</p>` : ''}
${top ? `<p style="margin-bottom: 4px;">Who ChatGPT, Claude, Perplexity and Gemini mention most:</p><ol style="list-style: none; padding: 0; margin-top: 4px;">${top}</ol>` : ''}
${button(`${APP_URL}/brand-monitor`, 'See your full report')}`);

  const subjectChange = previous == null ? '' : ` (${change.arrow} ${change.text.replace(' from last week', '').replace(' as last week', '')})`;
  return sendEmail({
    to: contact.email,
    subject: `${companyName}: AI visibility ${current.visibilityScore}/100${subjectChange}`,
    html,
  });
}

export async function sendMonitorPausedEmail(contact: Contact, companyName: string) {
  const html = layout(`
<h1 style="font-size: 26px;">Weekly monitoring for ${escapeHtml(companyName)} is paused</h1>
<p>Your account doesn't have enough credits for this week's check (one weekly check uses 10 credits).</p>
<p>Add credits or choose a plan, and monitoring continues automatically.</p>
${button(`${APP_URL}/plans`, 'Add credits')}`);
  return sendEmail({ to: contact.email, subject: `Weekly AI visibility monitoring for ${companyName} is paused`, html });
}
