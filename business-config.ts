/**
 * Business Configuration — Porsche 911 Performance Parts Affiliate Site
 *
 * This file centralizes all affiliate program details, network accounts,
 * and revenue configuration for the MVP launch.
 *
 * SETUP INSTRUCTIONS:
 * 1. Apply to affiliate programs listed below (see affiliate-programs-research.md)
 * 2. Replace placeholder values with your real affiliate IDs/tracking codes
 * 3. Update affiliateUrl in src/data/products.json with real tracked links
 */

// ─────────────────────────────────────────────────────────────────────────────
// AFFILIATE NETWORK ACCOUNTS
// ─────────────────────────────────────────────────────────────────────────────

export const AFFILIATE_NETWORKS = {
  /**
   * ShareASale — Primary network (covers most brands)
   * Apply at: https://www.shareasale.com
   * Covers: COBB, Fabspeed, Borla, H&R, StopTech, Hawk, K&N, AEM,
   *         Mishimoto, OBDLink, ECS Tuning, Turner Motorsport
   */
  shareasale: {
    affiliateId: "YOUR_SHAREASALE_AFFILIATE_ID", // e.g. "1234567"
    trackingUrl: "https://www.shareasale.com/r.cfm",
    signupUrl: "https://www.shareasale.com/shareasale.cfm",
  },

  /**
   * CJ Affiliate (Commission Junction) — Secondary network
   * Apply at: https://www.cj.com
   * Covers: Bilstein, Summit Racing, Tire Rack
   */
  cjAffiliate: {
    affiliateId: "YOUR_CJ_AFFILIATE_ID",
    trackingUrl: "https://www.anrdoezrs.net/click",
    signupUrl: "https://signup.cj.com/member/signup/publisher/",
  },

  /**
   * Impact Radius — Premium brands network
   * Apply at: https://impact.com
   * Covers: Brembo, Akrapovič
   */
  impactRadius: {
    affiliateId: "YOUR_IMPACT_AFFILIATE_ID",
    trackingUrl: "https://impact.go2cloud.org",
    signupUrl: "https://app.impact.com/signup/publisher",
  },

  /**
   * Amazon Associates — Fallback for all products
   * Apply at: https://affiliate-program.amazon.com
   * Commission: 3% automotive, 4.5% books
   */
  amazonAssociates: {
    trackingId: "YOUR-AMAZON-TRACKING-ID-20", // e.g. "porsche911mod-20"
    baseUrl: "https://www.amazon.com",
    signupUrl: "https://affiliate-program.amazon.com",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// BRAND AFFILIATE PROGRAMS
// Priority: Direct brand programs pay highest commissions (5–15%)
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND_AFFILIATE_PROGRAMS = {
  /**
   * COBB Tuning — Accessport V3
   * Products: cobb-v3
   * Commission: ~5–8% | Cookie: 30 days | AOV: $699–$1,200
   * Apply: https://www.cobbtuning.com/pages/affiliate-program (via ShareASale)
   */
  cobb: {
    name: "COBB Tuning",
    network: "shareasale",
    merchantId: "YOUR_COBB_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.08,
    cookieDays: 30,
    applyUrl: "https://www.cobbtuning.com/pages/affiliate-program",
    baseStoreUrl: "https://www.cobbtuning.com",
    status: "pending_application", // Change to "active" once approved
  },

  /**
   * Fabspeed Motorsport — Maxflo Exhaust
   * Products: fabspeed-maxflo
   * Commission: 5–10% | Cookie: 30 days | AOV: $1,500–$3,000
   * Apply: https://www.fabspeed.com/pages/affiliate-program (via ShareASale)
   */
  fabspeed: {
    name: "Fabspeed Motorsport",
    network: "shareasale",
    merchantId: "YOUR_FABSPEED_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.08,
    cookieDays: 30,
    applyUrl: "https://www.fabspeed.com/pages/affiliate-program",
    baseStoreUrl: "https://www.fabspeed.com",
    status: "pending_application",
  },

  /**
   * Akrapovič — Slip-On Line Exhaust
   * Products: akrapovic-exhaust
   * Commission: 5–8% | Cookie: 30 days | AOV: $2,000–$4,000
   * Apply: https://impact.com → search "Akrapovic"
   */
  akrapovic: {
    name: "Akrapovič",
    network: "impactRadius",
    merchantId: "YOUR_AKRAPOVIC_IMPACT_MERCHANT_ID",
    commissionRate: 0.06,
    cookieDays: 30,
    applyUrl: "https://app.impact.com/signup/publisher",
    baseStoreUrl: "https://www.akrapovic.com",
    status: "pending_application",
  },

  /**
   * Borla Performance — S-Type Cat-Back Exhaust
   * Products: borla-exhaust
   * Commission: 5% | Cookie: 30 days | AOV: $900–$1,600
   * Apply: https://www.borla.com/affiliate (via ShareASale)
   */
  borla: {
    name: "Borla Performance",
    network: "shareasale",
    merchantId: "YOUR_BORLA_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.05,
    cookieDays: 30,
    applyUrl: "https://www.borla.com/affiliate",
    baseStoreUrl: "https://www.borla.com",
    status: "pending_application",
  },

  /**
   * Bilstein — B16 PSS10 Coilovers
   * Products: bilstein-b16
   * Commission: 5–8% | Cookie: 30 days | AOV: $1,400–$2,200
   * Apply: https://www.cj.com → search "Bilstein"
   */
  bilstein: {
    name: "Bilstein",
    network: "cjAffiliate",
    merchantId: "YOUR_BILSTEIN_CJ_MERCHANT_ID",
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.bilstein.com/us/en/affiliate/",
    baseStoreUrl: "https://www.bilstein.com",
    status: "pending_application",
  },

  /**
   * KW Suspension — V3 Coilover Kit
   * Products: kw-v3
   * Commission: 5–8% | Cookie: 30 days | AOV: $2,500–$4,000
   * Apply: https://www.kwsuspensions.net (via ShareASale or direct)
   */
  kwSuspension: {
    name: "KW Suspension",
    network: "shareasale",
    merchantId: "YOUR_KW_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.kwsuspensions.net/affiliate",
    baseStoreUrl: "https://www.kwsuspensions.net",
    status: "pending_application",
  },

  /**
   * H&R Springs — Sport Springs
   * Products: hr-springs
   * Commission: 5–8% | Cookie: 30 days | AOV: $300–$500
   * Apply: https://www.hrsprings.com/affiliate (via ShareASale)
   */
  hrSprings: {
    name: "H&R Springs",
    network: "shareasale",
    merchantId: "YOUR_HR_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.hrsprings.com/affiliate",
    baseStoreUrl: "https://www.hrsprings.com",
    status: "pending_application",
  },

  /**
   * Brembo — GT Big Brake Kit
   * Products: brembo-brake-kit
   * Commission: 4–6% | Cookie: 30 days | AOV: $3,000–$5,500
   * Apply: https://impact.com → search "Brembo"
   */
  brembo: {
    name: "Brembo",
    network: "impactRadius",
    merchantId: "YOUR_BREMBO_IMPACT_MERCHANT_ID",
    commissionRate: 0.05,
    cookieDays: 30,
    applyUrl: "https://shop.brembo.com/affiliate",
    baseStoreUrl: "https://shop.brembo.com",
    status: "pending_application",
  },

  /**
   * StopTech — Sport Drilled & Slotted Rotors
   * Products: stoptech-rotors
   * Commission: 5–8% | Cookie: 30 days | AOV: $350–$700
   * Apply: https://www.stoptech.com/affiliate-program (via ShareASale)
   */
  stoptech: {
    name: "StopTech",
    network: "shareasale",
    merchantId: "YOUR_STOPTECH_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.stoptech.com/affiliate-program",
    baseStoreUrl: "https://www.stoptech.com",
    status: "pending_application",
  },

  /**
   * Hawk Performance — HPS Brake Pads
   * Products: hawk-brake-pads
   * Commission: 5–8% | Cookie: 30 days | AOV: $100–$200
   * Apply: https://www.hawkperformance.com/affiliate (via ShareASale)
   */
  hawk: {
    name: "Hawk Performance",
    network: "shareasale",
    merchantId: "YOUR_HAWK_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.hawkperformance.com/affiliate",
    baseStoreUrl: "https://www.hawkperformance.com",
    status: "pending_application",
  },

  /**
   * K&N Engineering — Cold Air Intake System
   * Products: k-n-cold-air-intake
   * Commission: 5–8% | Cookie: 30 days | AOV: $350–$550
   * Apply: https://www.knfilters.com/affiliate-program (ShareASale #38082)
   */
  kn: {
    name: "K&N Engineering",
    network: "shareasale",
    merchantId: "38082", // K&N's known ShareASale merchant ID
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.knfilters.com/affiliate-program",
    baseStoreUrl: "https://www.knfilters.com",
    status: "pending_application",
  },

  /**
   * AEM Performance Electronics — Brute Force Intake
   * Products: aem-intake
   * Commission: 5–8% | Cookie: 30 days | AOV: $300–$500
   * Apply: https://www.aemelectronics.com/affiliate (via ShareASale)
   */
  aem: {
    name: "AEM Performance Electronics",
    network: "shareasale",
    merchantId: "YOUR_AEM_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.aemelectronics.com/affiliate",
    baseStoreUrl: "https://www.aemelectronics.com",
    status: "pending_application",
  },

  /**
   * Mishimoto — Performance Intercooler
   * Products: mishimoto-intercooler
   * Commission: 5–10% | Cookie: 30 days | AOV: $500–$900
   * Apply: https://www.mishimoto.com/affiliate-program (ShareASale #76879)
   */
  mishimoto: {
    name: "Mishimoto",
    network: "shareasale",
    merchantId: "76879", // Mishimoto's known ShareASale merchant ID
    commissionRate: 0.08,
    cookieDays: 30,
    applyUrl: "https://www.mishimoto.com/affiliate-program",
    baseStoreUrl: "https://www.mishimoto.com",
    status: "pending_application",
  },

  /**
   * OBDLink — MX+ OBD2 Scanner
   * Products: obdlink-mx
   * Commission: 10–15% | Cookie: 45 days | AOV: $100–$130
   * Apply: https://www.obdlink.com/affiliate/ (via ShareASale)
   */
  obdlink: {
    name: "OBDLink",
    network: "shareasale",
    merchantId: "YOUR_OBDLINK_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.12,
    cookieDays: 45,
    applyUrl: "https://www.obdlink.com/affiliate/",
    baseStoreUrl: "https://www.obdlink.com",
    status: "pending_application",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-BRAND RETAILER PROGRAMS (Recommended for MVP)
// One account covers multiple products — fastest path to launch
// ─────────────────────────────────────────────────────────────────────────────

export const RETAILER_AFFILIATE_PROGRAMS = {
  /**
   * ECS Tuning — BEST SINGLE AFFILIATE FOR MVP
   * Covers: ALL brands in our catalog (Porsche specialist)
   * Commission: 6–8% | Cookie: 30 days
   * Apply: https://www.ecstuning.com/affiliate/ (via ShareASale)
   *
   * ⭐ RECOMMENDED: Apply here FIRST — one account covers everything
   */
  ecstuning: {
    name: "ECS Tuning",
    network: "shareasale",
    merchantId: "YOUR_ECS_SHAREASALE_MERCHANT_ID",
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.ecstuning.com/affiliate/",
    baseStoreUrl: "https://www.ecstuning.com",
    specialty: "European performance cars — Porsche, BMW, Audi, VW",
    status: "pending_application",
    priority: 1, // Apply first
  },

  /**
   * Pelican Parts — Porsche-Only Specialist
   * Covers: Bilstein, KW, H&R, Brembo, StopTech, Hawk, K&N, Mishimoto, Bentley Manuals
   * Commission: 5–8% | Cookie: 30 days
   * Apply: https://www.pelicanparts.com/affiliate.htm (Direct — no network)
   *
   * ⭐ RECOMMENDED: Porsche-only retailer = highest conversion rate
   */
  pelicanParts: {
    name: "Pelican Parts",
    network: "direct",
    affiliateId: "YOUR_PELICAN_AFFILIATE_ID",
    commissionRate: 0.07,
    cookieDays: 30,
    applyUrl: "https://www.pelicanparts.com/affiliate.htm",
    baseStoreUrl: "https://www.pelicanparts.com",
    specialty: "Porsche-only parts retailer since 1997",
    status: "pending_application",
    priority: 2, // Apply second
  },

  /**
   * Summit Racing Equipment
   * Covers: Borla, Hawk, K&N, AEM, StopTech, Brembo, Mishimoto, Bilstein
   * Commission: 3–5% | Cookie: 30 days
   * Apply: https://www.summitracing.com/affiliate (via CJ Affiliate)
   */
  summitRacing: {
    name: "Summit Racing Equipment",
    network: "cjAffiliate",
    merchantId: "YOUR_SUMMIT_CJ_MERCHANT_ID",
    commissionRate: 0.04,
    cookieDays: 30,
    applyUrl: "https://www.summitracing.com/affiliate",
    baseStoreUrl: "https://www.summitracing.com",
    status: "pending_application",
    priority: 3,
  },

  /**
   * Tire Rack — Wheels, Tires & Suspension
   * Covers: Bilstein, KW, H&R, Brembo, StopTech, Hawk
   * Commission: 3–6% | Cookie: 30 days
   * Apply: https://www.tirerack.com/affiliate/ (via CJ Affiliate)
   */
  tireRack: {
    name: "Tire Rack",
    network: "cjAffiliate",
    merchantId: "YOUR_TIRERACK_CJ_MERCHANT_ID",
    commissionRate: 0.05,
    cookieDays: 30,
    applyUrl: "https://www.tirerack.com/affiliate/",
    baseStoreUrl: "https://www.tirerack.com",
    status: "pending_application",
    priority: 4,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PRODUCT → AFFILIATE MAPPING
// Maps each product ID to its best affiliate program
// Update affiliateUrl in products.json once you have real tracking links
// ─────────────────────────────────────────────────────────────────────────────

export const PRODUCT_AFFILIATE_MAP: Record<
  string,
  {
    primaryProgram: string;
    fallbackProgram: string;
    notes: string;
  }
> = {
  "cobb-v3": {
    primaryProgram: "cobb",
    fallbackProgram: "ecstuning",
    notes: "COBB direct pays highest commission. ECS Tuning as fallback.",
  },
  "jb4-tuner": {
    primaryProgram: "amazonAssociates",
    fallbackProgram: "ecstuning",
    notes: "JB4 by Burger Motorsports — check Amazon or ECS Tuning for availability.",
  },
  "apr-stage1": {
    primaryProgram: "amazonAssociates",
    fallbackProgram: "ecstuning",
    notes: "APR sells direct at APRtune.com — check if they have affiliate program.",
  },
  "fabspeed-maxflo": {
    primaryProgram: "fabspeed",
    fallbackProgram: "ecstuning",
    notes: "Fabspeed direct has highest AOV. High-value product.",
  },
  "akrapovic-exhaust": {
    primaryProgram: "akrapovic",
    fallbackProgram: "ecstuning",
    notes: "Akrapovič via Impact Radius. ECS Tuning also carries Akrapovič.",
  },
  "borla-exhaust": {
    primaryProgram: "borla",
    fallbackProgram: "ecstuning",
    notes: "Borla direct via ShareASale.",
  },
  "bilstein-b16": {
    primaryProgram: "bilstein",
    fallbackProgram: "ecstuning",
    notes: "Bilstein via CJ Affiliate. ECS Tuning also carries full Bilstein lineup.",
  },
  "kw-v3": {
    primaryProgram: "kwSuspension",
    fallbackProgram: "ecstuning",
    notes: "KW V3 is high AOV — prioritize direct program.",
  },
  "hr-springs": {
    primaryProgram: "hrSprings",
    fallbackProgram: "ecstuning",
    notes: "H&R via ShareASale.",
  },
  "brembo-brake-kit": {
    primaryProgram: "brembo",
    fallbackProgram: "ecstuning",
    notes: "Brembo GT BBK is highest AOV product. Prioritize direct program.",
  },
  "stoptech-rotors": {
    primaryProgram: "stoptech",
    fallbackProgram: "ecstuning",
    notes: "StopTech via ShareASale.",
  },
  "hawk-brake-pads": {
    primaryProgram: "hawk",
    fallbackProgram: "ecstuning",
    notes: "Hawk via ShareASale.",
  },
  "k-n-cold-air-intake": {
    primaryProgram: "kn",
    fallbackProgram: "ecstuning",
    notes: "K&N has established ShareASale program (Merchant #38082).",
  },
  "aem-intake": {
    primaryProgram: "aem",
    fallbackProgram: "ecstuning",
    notes: "AEM via ShareASale.",
  },
  "mishimoto-intercooler": {
    primaryProgram: "mishimoto",
    fallbackProgram: "ecstuning",
    notes: "Mishimoto has excellent affiliate support (ShareASale #76879).",
  },
  "obdlink-mx": {
    primaryProgram: "obdlink",
    fallbackProgram: "amazonAssociates",
    notes: "OBDLink pays 10–15% — highest rate in catalog.",
  },
  "pittsburgh-jack": {
    primaryProgram: "amazonAssociates",
    fallbackProgram: "summitRacing",
    notes: "Harbor Freight / Pittsburgh brand — Amazon is best option.",
  },
  "torque-wrench": {
    primaryProgram: "amazonAssociates",
    fallbackProgram: "summitRacing",
    notes: "Tekton brand — Amazon Associates is primary.",
  },
  "911-manual": {
    primaryProgram: "pelicanParts",
    fallbackProgram: "amazonAssociates",
    notes: "Bentley Publishers manual — Pelican Parts carries it and pays more than Amazon.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// SITE CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

export const SITE_CONFIG = {
  name: "Porsche 911 Mods",
  tagline: "The #1 Resource for Porsche 911 Performance Upgrades",
  url: "https://YOUR-SITE-URL.com", // Update with your domain
  niche: "Porsche 911 performance parts & modifications",
  targetAudience: "Porsche 911 owners (996, 997, 991, 992 generations)",

  // FTC-required affiliate disclosure
  affiliateDisclosure:
    "This site contains affiliate links. We may earn a commission when you purchase through our links at no extra cost to you. As an Amazon Associate, we earn from qualifying purchases.",

  // Amazon Associates required disclosure
  amazonDisclosure:
    "Porsche 911 Mods is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// MVP LAUNCH CHECKLIST
// ─────────────────────────────────────────────────────────────────────────────

/**
 * MVP AFFILIATE SETUP CHECKLIST:
 *
 * WEEK 1 — Fastest path to revenue:
 * [ ] 1. Apply to Amazon Associates → replace all "amzn.to/your-*" placeholders
 * [ ] 2. Apply to ECS Tuning (ShareASale) → covers 90% of products
 * [ ] 3. Apply to Pelican Parts (Direct) → Porsche-specific, high conversion
 * [ ] 4. Apply to K&N (ShareASale #38082) → fast approval
 * [ ] 5. Apply to Mishimoto (ShareASale #76879) → affiliate-friendly
 *
 * WEEK 2 — Brand-direct programs:
 * [ ] 6. Apply to COBB Tuning (ShareASale)
 * [ ] 7. Apply to Fabspeed (ShareASale)
 * [ ] 8. Apply to Borla (ShareASale)
 * [ ] 9. Apply to StopTech (ShareASale)
 * [ ] 10. Apply to Hawk Performance (ShareASale)
 *
 * WEEK 3 — Premium brand programs:
 * [ ] 11. Apply to Bilstein (CJ Affiliate)
 * [ ] 12. Apply to Brembo (Impact Radius)
 * [ ] 13. Apply to Akrapovič (Impact Radius)
 * [ ] 14. Apply to KW Suspension (ShareASale/Direct)
 *
 * BEFORE LAUNCH:
 * [ ] Add FTC affiliate disclosure to site footer
 * [ ] Add Amazon Associates disclosure to footer
 * [ ] Update Privacy Policy to mention affiliate tracking cookies
 * [ ] Replace ALL placeholder affiliateUrl values in products.json
 */
