import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is required");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia",
});

export const PRODUCT = {
  name: "Digital PR Starter Campaign",
  price: 500,
  currency: "usd",
  priceInCents: 50000,
} as const;
