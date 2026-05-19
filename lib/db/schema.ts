import {
  pgTable,
  text,
  timestamp,
  integer,
  decimal,
  boolean,
  index,
} from "drizzle-orm/pg-core";

// ─── Better Auth tables ─────────────────────────────────────────────────────

export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sessions = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verifications = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── App tables ─────────────────────────────────────────────────────────────

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  fullName: text("full_name"),
  email: text("email").notNull(),
  role: text("role", { enum: ["admin", "client"] }).notNull().default("client"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const leads = pgTable(
  "leads",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    companyName: text("company_name"),
    websiteUrl: text("website_url").notNull(),
    industry: text("industry"),
    targetCountry: text("target_country"),
    targetPages: text("target_pages"),
    competitors: text("competitors"),
    campaignGoal: text("campaign_goal"),
    notes: text("notes"),
    planId: text("plan_id"),
    status: text("status", {
      enum: ["new", "pending_payment", "paid", "contacted", "qualified", "rejected", "audit_requested"],
    })
      .notNull()
      .default("new"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("leads_email_idx").on(t.email), index("leads_status_idx").on(t.status)]
);

export const clients = pgTable(
  "clients",
  {
    id: text("id").primaryKey(),
    profileId: text("profile_id").references(() => profiles.id),
    leadId: text("lead_id").references(() => leads.id),
    companyName: text("company_name"),
    websiteUrl: text("website_url"),
    industry: text("industry"),
    targetCountry: text("target_country"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("clients_profile_id_idx").on(t.profileId)]
);

export const campaigns = pgTable(
  "campaigns",
  {
    id: text("id").primaryKey(),
    clientId: text("client_id").references(() => clients.id),
    leadId: text("lead_id").references(() => leads.id),
    productName: text("product_name").notNull().default("Digital PR Starter Campaign"),
    price: decimal("price", { precision: 10, scale: 2 }).notNull().default("500.00"),
    currency: text("currency").notNull().default("USD"),
    status: text("status", {
      enum: [
        "onboarding",
        "payment_confirmed",
        "research",
        "pr_angles",
        "outreach",
        "links_review",
        "reporting",
        "completed",
        "paused",
        "cancelled",
      ],
    })
      .notNull()
      .default("payment_confirmed"),
    progressStage: text("progress_stage", {
      enum: [
        "onboarding_received",
        "payment_confirmed",
        "campaign_research",
        "pr_angles_prepared",
        "outreach_in_progress",
        "mentions_review",
        "report_delivered",
        "campaign_completed",
      ],
    })
      .notNull()
      .default("payment_confirmed"),
    linksDelivered: integer("links_delivered").notNull().default(0),
    startDate: timestamp("start_date"),
    dueDate: timestamp("due_date"),
    internalNotes: text("internal_notes"),
    clientNotes: text("client_notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("campaigns_client_id_idx").on(t.clientId),
    index("campaigns_status_idx").on(t.status),
  ]
);

export const backlinks = pgTable(
  "backlinks",
  {
    id: text("id").primaryKey(),
    campaignId: text("campaign_id")
      .notNull()
      .references(() => campaigns.id),
    publicationName: text("publication_name").notNull(),
    publicationUrl: text("publication_url"),
    liveUrl: text("live_url"),
    targetUrl: text("target_url"),
    anchorText: text("anchor_text"),
    domainRating: integer("domain_rating"),
    domainAuthority: integer("domain_authority"),
    linkType: text("link_type", {
      enum: ["dofollow", "nofollow", "sponsored", "mention_only", "unknown"],
    })
      .notNull()
      .default("unknown"),
    status: text("status", {
      enum: ["pending_review", "live", "changed", "removed"],
    })
      .notNull()
      .default("pending_review"),
    dateLive: timestamp("date_live"),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("backlinks_campaign_id_idx").on(t.campaignId)]
);

export const reports = pgTable(
  "reports",
  {
    id: text("id").primaryKey(),
    campaignId: text("campaign_id")
      .notNull()
      .references(() => campaigns.id),
    title: text("title").notNull(),
    reportMonth: text("report_month"),
    summary: text("summary"),
    reportUrl: text("report_url"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("reports_campaign_id_idx").on(t.campaignId)]
);

export const payments = pgTable(
  "payments",
  {
    id: text("id").primaryKey(),
    leadId: text("lead_id").references(() => leads.id),
    clientId: text("client_id").references(() => clients.id),
    campaignId: text("campaign_id").references(() => campaigns.id),
    stripeSessionId: text("stripe_session_id"),
    stripePaymentIntentId: text("stripe_payment_intent_id"),
    amount: integer("amount").notNull(),
    currency: text("currency").notNull().default("USD"),
    status: text("status", {
      enum: ["pending", "paid", "failed", "refunded"],
    })
      .notNull()
      .default("pending"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("payments_lead_id_idx").on(t.leadId),
    index("payments_client_id_idx").on(t.clientId),
  ]
);

// ─── Types ───────────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type Profile = typeof profiles.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Client = typeof clients.$inferSelect;
export type Campaign = typeof campaigns.$inferSelect;
export type Backlink = typeof backlinks.$inferSelect;
export type Report = typeof reports.$inferSelect;
export type Payment = typeof payments.$inferSelect;

export type InsertLead = typeof leads.$inferInsert;
export type InsertClient = typeof clients.$inferInsert;
export type InsertCampaign = typeof campaigns.$inferInsert;
export type InsertBacklink = typeof backlinks.$inferInsert;
export type InsertReport = typeof reports.$inferInsert;
export type InsertPayment = typeof payments.$inferInsert;
