export type PlanTrack = "pr" | "link-building";

export type Plan = {
  id: string;
  track: PlanTrack;
  name: string;
  price: number;
  priceLabel: string;
  priceFrom?: boolean;
  priceSuffix: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  // PR campaign track (used on the home page and /pricing)
  {
    id: "starter-audit",
    track: "pr",
    name: "Starter Audit",
    price: 0,
    priceLabel: "$0",
    priceSuffix: "Free monthly audit",
    tagline: "Get a personalized backlink growth plan.",
    features: [
      "Backlink profile audit",
      "Competitor link analysis",
      "Niche-relevant link opportunities",
      "Custom growth roadmap",
      "Delivered within 3 business days",
    ],
    cta: "Request Free Audit",
  },
  {
    id: "basic-link",
    track: "pr",
    name: "Basic Link",
    price: 249,
    priceLabel: "$249",
    priceSuffix: "Per month",
    tagline: "Start with one niche-relevant backlink.",
    features: [
      "1 niche-relevant backlink",
      "Manual outreach & placement",
      "Anchor text customization",
      "Domain Rating 20+",
      "Delivered within 1 month",
    ],
    cta: "Get Basic Link",
  },
  {
    id: "pr-authority",
    track: "pr",
    name: "PR Authority Link",
    price: 500,
    priceLabel: "$500",
    priceSuffix: "Per month",
    tagline: "Get one stronger editorial-style PR placement.",
    features: [
      "1 editorial-style PR placement",
      "Authority publication (DR 40+)",
      "Custom PR angle development",
      "Full outreach tracking dashboard",
      "Campaign report",
      "Delivered within 1 month",
    ],
    cta: "Get PR Authority Link",
    highlighted: true,
  },
  {
    id: "growth-campaign",
    track: "pr",
    name: "Growth Campaign",
    price: 999,
    priceLabel: "$999",
    priceSuffix: "Per month",
    tagline: "Get three stronger editorial-style PR placements.",
    features: [
      "3 editorial-style PR placements",
      "Authority publications (DR 50+)",
      "Multiple PR angles",
      "Full outreach tracking dashboard",
      "Monthly campaign reports",
      "Priority delivery",
      "Delivered within 1 month",
    ],
    cta: "Start Growth Campaign",
  },

  // Link Building track (used on /services and detail pages)
  {
    id: "link-audit",
    track: "link-building",
    name: "Free Link Audit",
    price: 0,
    priceLabel: "$0",
    priceSuffix: "Free audit",
    tagline: "Personalized backlink gap analysis with growth recommendations.",
    features: [
      "Current backlink profile review",
      "Competitor link gap analysis",
      "Niche-relevant opportunity list",
      "Anchor text distribution review",
      "Delivered within 3 business days",
    ],
    cta: "Request Free Audit",
  },
  {
    id: "starter-links",
    track: "link-building",
    name: "Starter Links",
    price: 149,
    priceLabel: "$149",
    priceSuffix: "Per month",
    tagline: "One niche-relevant backlink delivered every month.",
    features: [
      "1 niche-relevant backlink per month",
      "Domain Rating 20+ verified",
      "Manual outreach & placement",
      "Custom anchor text",
      "Full reporting dashboard",
      "Delivered within 1 month",
    ],
    cta: "Get Starter Links",
  },
  {
    id: "authority-links",
    track: "link-building",
    name: "Authority Links",
    price: 399,
    priceLabel: "$399",
    priceSuffix: "Per month",
    tagline: "Two high-DR editorial backlinks placed every month.",
    features: [
      "2 editorial backlinks per month",
      "Domain Rating 40+ publications",
      "Editorial-style placements",
      "Custom angle development",
      "Anchor text customization",
      "Monthly performance report",
      "Delivered within 1 month",
    ],
    cta: "Get Authority Links",
    highlighted: true,
  },
  {
    id: "scale-links",
    track: "link-building",
    name: "Scale Links",
    price: 899,
    priceLabel: "$899",
    priceSuffix: "Per month",
    tagline: "Five mixed-authority backlinks every month for scaling brands.",
    features: [
      "5 backlinks per month",
      "Mix of DR 20+, 40+, and 50+ sites",
      "Niche edits + new placements",
      "Multilingual options available",
      "Reserved capacity for agencies",
      "Dedicated outreach team",
      "White-label reporting available",
      "Delivered within 1 month",
    ],
    cta: "Start Scale Links",
  },
];

export function getPlan(id: string | null | undefined): Plan {
  return plans.find((p) => p.id === id) ?? plans[2];
}

export function plansByTrack(track: PlanTrack): Plan[] {
  return plans.filter((p) => p.track === track);
}
