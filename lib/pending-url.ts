/**
 * The website a visitor typed on the homepage. Kept in localStorage so it survives
 * login, register and Stripe checkout, then prefilled once on /brand-monitor.
 */
const PENDING_URL_KEY = 'abt:pending-url';

export function savePendingUrl(url: string) {
  try {
    localStorage.setItem(PENDING_URL_KEY, url);
  } catch {}
}

export function readPendingUrl(): string | null {
  try {
    return localStorage.getItem(PENDING_URL_KEY);
  } catch {
    return null;
  }
}

export function clearPendingUrl() {
  try {
    localStorage.removeItem(PENDING_URL_KEY);
  } catch {}
}
