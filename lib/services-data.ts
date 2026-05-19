export type IconName =
  | "Newspaper"
  | "PenLine"
  | "Link2"
  | "Languages"
  | "Image"
  | "Briefcase"
  | "MapPin"
  | "Zap";

export type Service = {
  slug: string;
  name: string;
  icon: IconName;
  category: string;
  shortDescription: string;
  heroSubheadline: string;
  fromPrice: string;
  priceNumeric: number;
  turnaround: string;
  popular?: boolean;
  recommendedPlan: "link-audit" | "starter-links" | "authority-links" | "scale-links";
  whatYouGet: string[];
  howItWorks: { title: string; description: string }[];
  whoFor: string[];
  benefits: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "editorial-pr-outreach",
    name: "Editorial PR Outreach",
    icon: "Newspaper",
    category: "Digital PR",
    shortDescription:
      "Journalist outreach for editorial-style mentions on authority publications.",
    heroSubheadline:
      "Land contextual, earned coverage on authority publications. Our team pitches journalists with original story angles built around your brand — every placement is editorially decided, never paid.",
    fromPrice: "$500",
    priceNumeric: 500,
    turnaround: "1 month",
    popular: true,
    recommendedPlan: "authority-links",
    whatYouGet: [
      "1 editorial-style placement on a relevant authority publication (DR 40+)",
      "Custom PR angle developed around your brand's story",
      "Manual outreach to vetted journalists in your industry",
      "Full reporting: live URL, anchor text, link type, and Domain Rating",
      "Campaign dashboard with real-time outreach stage tracking",
      "Editorial reviewed — no paid placements, no link insertions",
    ],
    howItWorks: [
      {
        title: "Brand intake",
        description:
          "We learn your brand's positioning, expertise, target audience, and the URL you'd like featured. This grounds every angle we pitch.",
      },
      {
        title: "Angle development",
        description:
          "Our PR team crafts a story angle journalists actually want — built around data, expert commentary, or a unique brand perspective.",
      },
      {
        title: "Manual outreach",
        description:
          "We pitch journalists in your niche through email and our existing relationships. No mass blasts. No template spam.",
      },
      {
        title: "Editorial placement",
        description:
          "Once a journalist runs the story, we verify the live URL, confirm link attributes, and log everything in your dashboard.",
      },
    ],
    whoFor: [
      "Brands building topical authority in competitive niches",
      "SaaS, e-commerce, and direct-to-consumer companies",
      "Founders who want earned coverage, not pay-to-play",
      "Marketing teams scaling SEO with quality signals",
    ],
    benefits: [
      {
        title: "Real editorial signals",
        description:
          "Editorial placements carry weight with both readers and search engines — they're earned, contextual, and unsponsored.",
      },
      {
        title: "Brand authority",
        description:
          "Coverage on respected publications builds long-term trust with prospects, investors, and partners.",
      },
      {
        title: "Full transparency",
        description:
          "Every placement is verified manually. You see what's live, when it went live, and what's still in outreach.",
      },
    ],
    faqs: [
      {
        q: "Can you guarantee a specific publication?",
        a: "No — editorial placements depend on a journalist choosing to cover your story. We commit to securing placements on publications matching the agreed Domain Rating tier, but specific named outlets cannot be guaranteed.",
      },
      {
        q: "What anchor text will be used?",
        a: "We work with you upfront to agree on natural anchor variations. Journalists may adjust phrasing slightly to match editorial tone, but we confirm the live anchor before logging the placement.",
      },
      {
        q: "How long does outreach take?",
        a: "Most placements land within 4 weeks of campaign start. Editorial decisions and publication schedules vary, but our dashboard always shows the live outreach stage.",
      },
    ],
  },
  {
    slug: "niche-blogger-outreach",
    name: "Niche Blogger Outreach",
    icon: "PenLine",
    category: "Link Building",
    shortDescription:
      "Manual outreach to niche-relevant blogs for contextual in-content placements.",
    heroSubheadline:
      "Reach independent niche blogs that align with your audience. We manually identify, vet, and pitch site owners for in-content placements that feel natural and pass real link equity.",
    fromPrice: "$249",
    priceNumeric: 249,
    turnaround: "1 month",
    recommendedPlan: "starter-links",
    whatYouGet: [
      "1 niche-relevant placement on a vetted independent blog",
      "Manual outreach — no automated mass emails",
      "Anchor text customization within editorial standards",
      "Domain Rating 20+ verified pre-placement",
      "Live URL, link type, and publication metadata in your dashboard",
      "Replacement guarantee if a link is removed within 30 days",
    ],
    howItWorks: [
      {
        title: "Niche mapping",
        description:
          "We identify the topical sub-niches your brand naturally fits and build a target list of relevant independent blogs.",
      },
      {
        title: "Site vetting",
        description:
          "Every prospect site is manually checked for traffic, link profile health, and editorial standards before outreach.",
      },
      {
        title: "Personalized pitch",
        description:
          "Outreach emails reference the blogger's recent work and propose a content angle that fits their existing coverage.",
      },
      {
        title: "Placement & verification",
        description:
          "Once published, we verify the live URL, anchor text, and link attributes, then log everything in your dashboard.",
      },
    ],
    whoFor: [
      "Brands targeting specific sub-niches or geographies",
      "Early-stage companies building initial domain authority",
      "Marketers needing contextual links over generic placements",
      "Anyone wanting transparency on where links come from",
    ],
    benefits: [
      {
        title: "True topical relevance",
        description:
          "Niche-aligned links signal contextual authority to search engines more strongly than off-topic placements.",
      },
      {
        title: "Independent sites",
        description:
          "We avoid networks and farms. Every placement is on a real, independently operated blog with its own audience.",
      },
      {
        title: "Manual quality control",
        description:
          "No automation in vetting or outreach. A human reviews every site before we pitch and every link before logging.",
      },
    ],
    faqs: [
      {
        q: "How do you find the blogs?",
        a: "Through a mix of niche-specific journalist databases, search operators, and outreach databases we've built over time. Every site is manually vetted before pitching.",
      },
      {
        q: "Will the link be dofollow?",
        a: "Most placements are dofollow, but we don't guarantee link type — that's an editorial decision by the site owner. The link attribute is always logged transparently.",
      },
      {
        q: "Can I see the site before placement?",
        a: "Yes. For higher tiers we share the prospect site with you before publishing for approval. For Basic Link we confirm only after placement.",
      },
    ],
  },
  {
    slug: "niche-edits",
    name: "Niche Edits",
    icon: "Link2",
    category: "Link Building",
    shortDescription:
      "Links inserted into existing, indexed articles on relevant authoritative sites.",
    heroSubheadline:
      "Add your link to existing, indexed articles that are already ranking. Niche edits give you immediate context and faster link equity than newly published placements.",
    fromPrice: "$199",
    priceNumeric: 199,
    turnaround: "2 weeks",
    recommendedPlan: "starter-links",
    whatYouGet: [
      "1 contextual link insertion into an existing indexed article",
      "Article must be topically relevant to your URL",
      "Publication aged, indexed, and traffic-verified",
      "Custom anchor text within editorial limits",
      "Dashboard logging with live URL and article context",
      "Faster turnaround — typically within 2 weeks",
    ],
    howItWorks: [
      {
        title: "Target article search",
        description:
          "We identify existing articles on relevant sites that contextually support adding a link to your URL.",
      },
      {
        title: "Editorial pitch",
        description:
          "We reach out to the publisher proposing the insertion as an editorial improvement to their existing content.",
      },
      {
        title: "Insertion & verification",
        description:
          "Once accepted, the link is added to the live article. We verify placement, capture context, and log in your dashboard.",
      },
    ],
    whoFor: [
      "Brands wanting faster results than fresh-content placements",
      "Sites with specific high-priority target URLs",
      "Marketers leveraging existing indexed authority",
      "Anyone testing topical relevance for ranking pages",
    ],
    benefits: [
      {
        title: "Speed to live",
        description:
          "Existing indexed articles mean your link is live and crawlable faster — often within 2 weeks of payment.",
      },
      {
        title: "Established context",
        description:
          "The host article already has aged authority, internal links, and search visibility your placement inherits.",
      },
      {
        title: "Lower cost entry",
        description:
          "Insertions cost less than securing fresh editorial placements while still delivering on real, ranking sites.",
      },
    ],
    faqs: [
      {
        q: "Are niche edits the same as guest posts?",
        a: "No. A guest post is a new article you contribute. A niche edit is a link added to a publisher's existing, already-indexed article — typically faster but with less editorial framing of your brand.",
      },
      {
        q: "How long until the link is live?",
        a: "Most insertions go live within 2 weeks. The article is already indexed, so search engines often discover the new link within days of placement.",
      },
      {
        q: "Will Google flag this as paid linking?",
        a: "Editorial insertions follow the publisher's normal content decisions and aren't tagged as sponsored. Quality and context drive both publisher acceptance and search engine treatment.",
      },
    ],
  },
  {
    slug: "multilingual-outreach",
    name: "Multilingual Outreach",
    icon: "Languages",
    category: "Multilingual",
    shortDescription:
      "Native-language placements on regional publications across EU, LATAM, and APAC.",
    heroSubheadline:
      "Reach audiences in their own language. Our multilingual outreach team secures placements on native-language publications across Europe, Latin America, and Asia-Pacific — verified by native speakers.",
    fromPrice: "$399",
    priceNumeric: 399,
    turnaround: "1 month",
    recommendedPlan: "authority-links",
    whatYouGet: [
      "1 native-language placement on a regional publication",
      "Native speaker pitch development and outreach",
      "Languages: Spanish, French, German, Italian, Portuguese, and more",
      "Local Domain Rating tier matched to region",
      "Translation of your target URL context where needed",
      "Dashboard logging with regional metadata",
    ],
    howItWorks: [
      {
        title: "Region & language selection",
        description:
          "Choose your target regions and languages. We confirm publication tiers and turnaround for each market.",
      },
      {
        title: "Native pitch crafting",
        description:
          "A native speaker on our team writes the outreach pitch in the target language — no machine translation.",
      },
      {
        title: "Regional outreach",
        description:
          "We pitch publications in-region using locally appropriate angles, formats, and editorial conventions.",
      },
      {
        title: "Verification",
        description:
          "Once live, a native speaker reviews the placement for accuracy and brand representation before logging.",
      },
    ],
    whoFor: [
      "Brands expanding into new regional markets",
      "E-commerce stores shipping internationally",
      "SaaS companies localizing for new geographies",
      "Travel, hospitality, and lifestyle brands going global",
    ],
    benefits: [
      {
        title: "Native authenticity",
        description:
          "Real native-speaker outreach reads naturally to regional editors — translated pitches don't.",
      },
      {
        title: "Regional ranking lift",
        description:
          "Local language links signal regional relevance to country-specific search engine results.",
      },
      {
        title: "Cultural fit",
        description:
          "We adapt PR angles to regional editorial conventions — what works in the US often doesn't in the EU or LATAM.",
      },
    ],
    faqs: [
      {
        q: "Which languages do you cover?",
        a: "Currently: English, Spanish, French, German, Italian, Portuguese, Dutch, Polish, Japanese, and Mandarin. Other languages can be quoted on request.",
      },
      {
        q: "Do you write the content in the target language?",
        a: "If a journalist accepts a pitch that requires supporting content, a native speaker on our team produces it. We never use machine translation for outreach.",
      },
      {
        q: "Will the link benefit my main domain?",
        a: "Yes. Links from regional publications pass authority to whatever URL you target, including non-localized pages. Many brands point regional links to country-specific landing pages for extra ranking benefit.",
      },
    ],
  },
  {
    slug: "infographic-outreach",
    name: "Infographic Outreach",
    icon: "Image",
    category: "Digital PR",
    shortDescription:
      "Pitch visual content (infographics, charts, data viz) to publications for visual mentions.",
    heroSubheadline:
      "Visual content travels further. We pitch your infographics, data visualizations, and original charts to publications hungry for shareable visual assets — securing visual mentions and embedded links.",
    fromPrice: "$349",
    priceNumeric: 349,
    turnaround: "1 month",
    recommendedPlan: "authority-links",
    whatYouGet: [
      "1 placement of your visual asset on a relevant publication",
      "Visual brief consultation if you don't have an asset yet",
      "Optional design service (quoted separately) for new infographics",
      "Embedded credit link back to your URL",
      "Publication DR 30+ and audience-aligned",
      "Dashboard logging with placement context",
    ],
    howItWorks: [
      {
        title: "Asset review",
        description:
          "We review your existing visual asset for editorial fit. If you need a new asset designed, we can quote separately.",
      },
      {
        title: "Publication targeting",
        description:
          "We identify publications that regularly feature data viz, infographics, or visual content in your niche.",
      },
      {
        title: "Visual pitch",
        description:
          "Outreach emphasizes the visual story — embed-ready preview, original data, and clear attribution requirements.",
      },
      {
        title: "Placement with embed",
        description:
          "Once published, we verify the visual is embedded correctly with a working credit link, then log the placement.",
      },
    ],
    whoFor: [
      "Data-driven brands with original research or stats",
      "Marketing teams with existing visual asset libraries",
      "Companies launching reports, studies, or surveys",
      "Brands in visually expressive verticals (design, finance, health)",
    ],
    benefits: [
      {
        title: "Higher engagement",
        description:
          "Visual content is more likely to be shared, re-embedded, and linked from secondary sites — compounding placement value.",
      },
      {
        title: "Long-tail link equity",
        description:
          "A well-embedded infographic can earn additional organic links over months as other sites discover and embed it.",
      },
      {
        title: "Memorable brand placement",
        description:
          "Branded visuals stick. Readers remember the source far longer than text-only mentions.",
      },
    ],
    faqs: [
      {
        q: "Do you design the infographic?",
        a: "Design is a separate service. If you already have a visual asset, we'll pitch it. If you need one created, we can quote design work separately.",
      },
      {
        q: "What if a publication strips the credit link?",
        a: "Pitches explicitly require attribution as a placement condition. If a publication removes the credit post-placement, we re-pitch a replacement at no extra cost.",
      },
      {
        q: "Are infographics still effective in 2026?",
        a: "Yes, when they tell a story. Data viz tied to original research or surveys still earns coverage. Generic stock-style infographics generally don't.",
      },
    ],
  },
  {
    slug: "saas-b2b-outreach",
    name: "SaaS & B2B Outreach",
    icon: "Briefcase",
    category: "B2B & SaaS",
    shortDescription:
      "Targeted outreach for SaaS and B2B brands — industry publications and tech media.",
    heroSubheadline:
      "Reach decision-makers where they read. Our SaaS and B2B outreach team specializes in pitches that resonate with industry analysts, technical reviewers, and trade publication editors.",
    fromPrice: "$499",
    priceNumeric: 499,
    turnaround: "1 month",
    recommendedPlan: "authority-links",
    whatYouGet: [
      "1 placement on a SaaS, tech, or B2B industry publication",
      "Pitch angles tailored to B2B buyer concerns",
      "Coverage on review sites, industry blogs, or trade media",
      "Publication targeted at your buyer persona vertical",
      "Full reporting with audience-fit notes",
      "Dashboard tracking through outreach to placement",
    ],
    howItWorks: [
      {
        title: "Buyer persona briefing",
        description:
          "We confirm your ICP, top pain points, and the decision-maker level you're targeting in coverage.",
      },
      {
        title: "Vertical media mapping",
        description:
          "We identify trade publications, industry analyst blogs, and review sites that your buyer persona actually reads.",
      },
      {
        title: "Technical pitch",
        description:
          "B2B pitches lead with substance — original product insight, comparison data, or a defensible technical perspective.",
      },
      {
        title: "Placement",
        description:
          "Once published, we verify the placement context fits your buyer journey and log the link in your dashboard.",
      },
    ],
    whoFor: [
      "SaaS companies in growth or scale phase",
      "B2B service providers and consultancies",
      "API and developer tool companies",
      "Enterprise software brands building category awareness",
    ],
    benefits: [
      {
        title: "Decision-maker reach",
        description:
          "Trade and industry publications reach buyers, not consumers — every placement supports both ranking and pipeline.",
      },
      {
        title: "Technical credibility",
        description:
          "Coverage on respected industry sites signals to prospects that your product holds up under expert scrutiny.",
      },
      {
        title: "Sales enablement",
        description:
          "Your sales team can cite earned coverage in proposals and on calls — link equity meets credibility content.",
      },
    ],
    faqs: [
      {
        q: "Can you get us on G2 or Capterra?",
        a: "Review aggregators have their own listing processes — we don't manipulate review platforms. We focus on editorial coverage from journalists and industry analysts.",
      },
      {
        q: "What if our category is very niche?",
        a: "Niche B2B categories are often easier, not harder. Fewer publications means clearer targeting and stronger editor relationships. We've covered verticals from devops tooling to enterprise compliance.",
      },
      {
        q: "Will placements help with paid acquisition too?",
        a: "Yes — earned coverage is reusable across retargeting ads, sales decks, and case studies. The link is just one part of the value.",
      },
    ],
  },
  {
    slug: "local-seo-links",
    name: "Local SEO Links",
    icon: "MapPin",
    category: "Local SEO",
    shortDescription:
      "Geo-targeted citations and local publication placements to lift regional rankings.",
    heroSubheadline:
      "Rank locally where it matters. Our local SEO link program combines structured citations with placements on regional publications — designed to lift your visibility in geo-targeted search results.",
    fromPrice: "$299",
    priceNumeric: 299,
    turnaround: "1 month",
    recommendedPlan: "starter-links",
    whatYouGet: [
      "1 placement on a regional or local publication",
      "Optional structured citation bundle (quoted separately)",
      "NAP (Name, Address, Phone) consistency review",
      "Geo-targeted anchor text aligned with local search intent",
      "Local DR-tier publication verified pre-placement",
      "Dashboard logging with geographic context",
    ],
    howItWorks: [
      {
        title: "Local market scoping",
        description:
          "We confirm your service area, primary target city, and any secondary regions you want to rank in.",
      },
      {
        title: "Publication shortlist",
        description:
          "We identify city-specific news sites, regional blogs, and local business publications that link out editorially.",
      },
      {
        title: "Geo-relevant pitch",
        description:
          "Outreach emphasizes the local angle — community impact, regional expertise, or city-specific data.",
      },
      {
        title: "Placement & citation sync",
        description:
          "Once live, we ensure the placement's NAP details match your other listings, then log everything.",
      },
    ],
    whoFor: [
      "Multi-location service businesses",
      "Local agencies, clinics, and professional practices",
      "Franchises rolling out new locations",
      "E-commerce stores with regional fulfillment hubs",
    ],
    benefits: [
      {
        title: "Map pack visibility",
        description:
          "Local links combined with consistent citations strengthen the signals that drive Google Map Pack rankings.",
      },
      {
        title: "Regional authority",
        description:
          "Coverage on city publications builds local brand recognition alongside SEO benefit.",
      },
      {
        title: "Defensible ranking",
        description:
          "Local links and citations are harder for competitors to replicate quickly than generic backlinks.",
      },
    ],
    faqs: [
      {
        q: "Will this help my Google Business Profile?",
        a: "Indirectly — local links and citation consistency strengthen the overall signals Google uses to rank business profiles, but we don't manage your profile directly.",
      },
      {
        q: "What if we serve multiple cities?",
        a: "We can rotate placements across your target cities, or focus on one priority market first. Monthly plans work well for multi-city rollouts.",
      },
      {
        q: "Do you build citations on directories like Yelp?",
        a: "Structured citations are a separate add-on we quote on request. The core service focuses on editorial local placements that pass real link equity.",
      },
    ],
  },
  {
    slug: "growth-bundle",
    name: "Growth Bundle",
    icon: "Zap",
    category: "Link Building",
    shortDescription:
      "Multiple editorial placements per month for scaling brands and agencies.",
    heroSubheadline:
      "Build compounding domain authority with consistent monthly editorial placements. The Growth Bundle delivers three high-DR editorial placements every month — for brands scaling SEO at velocity.",
    fromPrice: "$999",
    priceNumeric: 999,
    turnaround: "1 month",
    recommendedPlan: "scale-links",
    whatYouGet: [
      "3 editorial-style placements per month on DR 50+ publications",
      "Multiple PR angles developed across the month",
      "Priority outreach and journalist sequencing",
      "Monthly campaign reports with quantitative summaries",
      "Full outreach tracking dashboard with stage visibility",
      "Reserved capacity — agency-friendly white-label reporting available",
    ],
    howItWorks: [
      {
        title: "Quarterly angle planning",
        description:
          "We map three to four story angles per quarter, ensuring each month has fresh material and clear sequencing.",
      },
      {
        title: "Parallel outreach",
        description:
          "Multiple outreach threads run simultaneously to multiple publications, maximizing monthly hit rate.",
      },
      {
        title: "Velocity management",
        description:
          "We pace placements naturally across the month to avoid suspicious link velocity patterns.",
      },
      {
        title: "Monthly reporting",
        description:
          "End-of-month summary covers placements landed, pitches in flight, and angle performance.",
      },
    ],
    whoFor: [
      "Scaling brands competing in saturated SEO niches",
      "Agencies reselling under their own brand",
      "Enterprise marketing teams with monthly link KPIs",
      "Funded startups in acquisition-mode growth",
    ],
    benefits: [
      {
        title: "Compounding authority",
        description:
          "Consistent monthly placements build domain authority faster than one-off campaigns — the effect compounds across quarters.",
      },
      {
        title: "Natural link velocity",
        description:
          "Three placements per month reads like organic growth to search engines, not a sudden link spike.",
      },
      {
        title: "Agency-ready",
        description:
          "White-label reporting and reserved capacity make the Growth Bundle a fit for agencies layering link building into client retainers.",
      },
    ],
    faqs: [
      {
        q: "Can I pause or skip a month?",
        a: "Yes — month-to-month billing. Pause any time before the next cycle. Work in progress is delivered through the end of the current month.",
      },
      {
        q: "How does white-label work?",
        a: "Reports can be branded with your agency identity. Your end client sees only your name. Dashboards can be configured similarly on request.",
      },
      {
        q: "What if you don't hit 3 placements in a month?",
        a: "Any undelivered placement rolls forward to the next month. We commit to net delivery over the campaign duration, not strict month-by-month enforcement.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
