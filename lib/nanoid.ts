import { randomBytes } from "crypto";

export function nanoid(size = 21): string {
  const bytes = randomBytes(size);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from(bytes)
    .map((b) => alphabet[b % alphabet.length])
    .join("");
}
