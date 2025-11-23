import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

/**
 * Get Stripe client instance (lazy initialization)
 * Returns null if STRIPE_SECRET_KEY is not set (e.g., during build)
 */
export function getStripeClient(): Stripe | null {
  if (!process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }

  return stripeInstance;
}

/**
 * Stripe client getter
 * Throws error if STRIPE_SECRET_KEY is not set (for runtime use)
 */
export function getStripe(): Stripe {
  const client = getStripeClient();
  if (!client) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return client;
}

