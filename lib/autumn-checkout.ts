/**
 * Starter begins with a 14-day trial that costs a one-off $9 "trial fee". In
 * Autumn the fee is a prepaid one-off feature on the plan, so checkout must ask
 * for quantity 1 — with no quantity the fee is $0 and the trial would be free.
 */
export const TRIAL_FEE_FEATURE_ID = 'trial_fee';

const TRIAL_FEE_PRODUCT_IDS = new Set(['starter-monthly']);

/** Extra body fields for POST /api/autumn/attach (snake_case REST shape). */
export function attachBodyOptions(productId: string) {
  return TRIAL_FEE_PRODUCT_IDS.has(productId)
    ? { options: [{ feature_id: TRIAL_FEE_FEATURE_ID, quantity: 1 }] }
    : {};
}

/** Extra params for the autumn-js React `attach()` (camelCase shape). */
export function attachHookOptions(productId: string) {
  return TRIAL_FEE_PRODUCT_IDS.has(productId)
    ? { options: [{ featureId: TRIAL_FEE_FEATURE_ID, quantity: 1 }] }
    : {};
}
