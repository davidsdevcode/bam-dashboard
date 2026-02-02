import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// BRAND TOKENS (Gold palette from site UI)
// ═══════════════════════════════════════════════════════════
const B = {
  pink: "#b8964e", pinkDark: "#9a7b3c", pinkLight: "#f3ead4", petal: "#faf5eb",
  cream: "#f7f3ec", black: "#1a1a1a", white: "#ffffff", charcoal: "#2d2d2d",
  slate: "#6b6b6b", silver: "#a3a3a3", mist: "#e5e0d8", snow: "#f5f2ef",
};
const font = { display: "'Playfair Display', Georgia, serif", body: "'Nunito Sans', system-ui, sans-serif" };
const goldGrad = { background: "linear-gradient(135deg, #c9a84c, #f0d78c, #b8964e, #dfc06a, #a8843a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

const tabs = [
  { id: "overview", label: "Strategy", icon: "◆" },
  { id: "intel", label: "Market Intel", icon: "◆" },
  { id: "growth", label: "Growth", icon: "◆" },
  { id: "page", label: "Homepage", icon: "◆" },
  { id: "popup", label: "Popups", icon: "◆" },
  { id: "form", label: "Booking", icon: "◆" },
  { id: "signup", label: "Signup", icon: "◆" },
  { id: "onboarding", label: "Onboarding", icon: "◆" },
  { id: "paywall", label: "Upsell", icon: "◆" },
];

// ═══════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════
const Badge = ({ children, variant = "primary" }) => (
  <span style={{
    display: "inline-block", padding: "5px 14px", borderRadius: 20, fontSize: 10, letterSpacing: 2,
    textTransform: "uppercase", fontFamily: font.body, fontWeight: 700,
    background: variant === "primary" ? B.pinkLight : B.snow,
    color: variant === "primary" ? B.pinkDark : B.silver,
  }}>{children}</span>
);

const MetricCard = ({ label, value, sub, delay = 0 }) => (
  <div style={{
    flex: "1 1 200px", background: B.petal, borderRadius: 16, padding: "28px 24px",
    animation: `fadeUp 0.6s ${delay}ms both cubic-bezier(0.16, 1, 0.3, 1)`,
  }}>
    <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginBottom: 8, ...goldGrad }}>{label}</div>
    <div style={{ fontSize: 44, fontFamily: font.display, color: B.black, fontWeight: 700, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginTop: 8, lineHeight: 1.55 }}>{sub}</div>
  </div>
);

const SectionTitle = ({ badge, title, subtitle }) => (
  <div style={{ marginBottom: 36 }}>
    <Badge>{badge}</Badge>
    <h2 style={{ fontSize: 28, fontFamily: font.display, color: B.black, fontWeight: 700, marginTop: 14, lineHeight: 1.2 }}>{title}</h2>
    <p style={{ fontSize: 14, color: B.slate, fontFamily: font.body, marginTop: 10, lineHeight: 1.75, maxWidth: 650 }}>{subtitle}</p>
  </div>
);

const Divider = () => <div style={{ height: 1, background: B.mist, margin: "40px 0" }} />;

const IssueRow = ({ issue, fix, impact }) => (
  <div style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: `1px solid ${B.mist}`, alignItems: "flex-start" }}>
    <div style={{ flex: "0 0 140px" }}>
      <div style={{ fontSize: 11, fontFamily: font.body, fontWeight: 700, color: B.charcoal }}>{issue}</div>
    </div>
    <div style={{ flex: 1, fontSize: 13, color: B.slate, fontFamily: font.body, lineHeight: 1.65 }}>{fix}</div>
    <Badge variant={impact === "High" ? "primary" : "neutral"}>{impact}</Badge>
  </div>
);

const DeviceLabel = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20, marginTop: 8 }}>
    <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, #dfc06a40, transparent)" }} />
    <span style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, ...goldGrad }}>{children}</span>
    <div style={{ height: 1, flex: 1, background: "linear-gradient(90deg, transparent, #dfc06a40, transparent)" }} />
  </div>
);

// ─── Phone Mockup (thin bezel) ─────────────────
const PhoneMockup = ({ children, label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
    <div style={{ position: "relative" }}>
      <div style={{
        width: 280, background: "linear-gradient(145deg, #222 0%, #111 50%, #222 100%)",
        borderRadius: 36, padding: "6px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
        position: "relative",
      }}>
        <div style={{ position: "absolute", left: -2, top: 80, width: 2.5, height: 24, background: "linear-gradient(180deg, #333, #1a1a1a)", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", left: -2, top: 112, width: 2.5, height: 24, background: "linear-gradient(180deg, #333, #1a1a1a)", borderRadius: "2px 0 0 2px" }} />
        <div style={{ position: "absolute", right: -2, top: 100, width: 2.5, height: 32, background: "linear-gradient(180deg, #333, #1a1a1a)", borderRadius: "0 2px 2px 0" }} />
        <div style={{
          background: "#000", borderRadius: 31, overflow: "hidden", position: "relative",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
        }}>
          <div style={{ background: B.white, padding: "8px 18px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontFamily: font.body, fontWeight: 700, color: B.black }}>9:41</span>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="16" height="11" viewBox="0 0 16 11" fill="none"><rect x="0" y="7" width="3" height="4" rx="0.5" fill={B.black} /><rect x="4.5" y="5" width="3" height="6" rx="0.5" fill={B.black} /><rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill={B.black} /><rect x="13.5" y="0" width="2.5" height="11" rx="0.5" fill={B.black} /></svg>
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M7 9.5a1 1 0 100-2 1 1 0 000 2z" fill={B.black} /><path d="M4.2 6.8a4 4 0 015.6 0" stroke={B.black} strokeWidth="1.3" strokeLinecap="round" fill="none" /><path d="M1.8 4.4a7 7 0 0110.4 0" stroke={B.black} strokeWidth="1.3" strokeLinecap="round" fill="none" /></svg>
              <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2" stroke={B.black} strokeWidth="1" fill="none" /><rect x="2" y="2" width="14" height="7" rx="1" fill={B.black} /><rect x="21.5" y="3.5" width="2" height="4" rx="1" fill={B.silver} /></svg>
            </div>
          </div>
          <div style={{ background: B.white }}>{children}</div>
          <div style={{ background: B.white, padding: "6px 0 8px", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 110, height: 4, background: B.black, borderRadius: 2, opacity: 0.16 }} />
          </div>
        </div>
      </div>
    </div>
    {label && <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: B.silver, fontFamily: font.body, fontWeight: 600 }}>{label}</div>}
  </div>
);

// ─── Browser Mockup ────────────────────────────
const BrowserMockup = ({ children, url = "bambeautybar.com", label }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
    <div style={{
      width: "100%", border: `1px solid ${B.mist}`, borderRadius: 14, overflow: "hidden",
      boxShadow: "0 24px 64px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.04)",
    }}>
      <div style={{ background: B.snow, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${B.mist}` }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: 5, background: c }} />)}
        </div>
        <div style={{ flex: 1, background: B.white, borderRadius: 6, padding: "6px 14px", fontSize: 11, fontFamily: font.body, color: B.silver, border: `1px solid ${B.mist}` }}>
          🔒 {url}
        </div>
      </div>
      <div>{children}</div>
    </div>
    {label && <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: B.silver, fontFamily: font.body, fontWeight: 600 }}>{label}</div>}
  </div>
);

// ═══════════════════════════════════════════════════════════
// TAB: OVERVIEW
// ═══════════════════════════════════════════════════════════
const OverviewTab = () => (
  <div>
    <SectionTitle badge="Executive Summary" title="BAM Beauty Bar — Strategic Roadmap" subtitle="A comprehensive conversion rate optimization and competitive intelligence plan — combining on-site CRO across 7 touchpoints with market data, channel analysis, and growth strategy." />
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
      <MetricCard label="2025 Site Visits" value="13.9K" sub="1,156 avg monthly · Peak: 2,184 (Dec)" delay={100} />
      <MetricCard label="#1 Channel" value="Social" sub="34% of all traffic · Instagram-driven mobile" delay={250} />
      <MetricCard label="Mobile Audience" value="60.7%" sub="Mobile-first · 14.8% cross-device" delay={400} />
    </div>

    {/* Critical Finding Callout */}
    <div style={{ background: `linear-gradient(135deg, ${B.black}, #2a2218)`, borderRadius: 16, padding: "32px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: B.pink, opacity: 0.08 }} />
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginBottom: 10, ...goldGrad }}>Critical Finding</div>
        <div style={{ fontSize: 20, fontFamily: font.display, color: B.white, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>BAM is a mobile-first, social-media-powered business. <span style={{ color: B.pink, fontStyle: "italic" }}>Social drives 34% of all traffic — the #1 channel.</span></div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: font.body, lineHeight: 1.7 }}>60.7% of the audience is on mobile. Social media (34.0%), Direct (29.4%), and Organic Search (23.6%) form the core engine. Competitors Drybar and Blo Blow Dry Bar fall below SimilarWeb's DFW measurement threshold — BAM commands the local digital landscape. The opportunity: amplify what's already working while closing gaps in referrals (5.8%) and email.</div>
      </div>
    </div>

    {/* Desktop Opportunity Callout */}
    <div style={{ background: `linear-gradient(135deg, #1a1a2e, #16213e)`, borderRadius: 16, padding: "32px", marginBottom: 40, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: -20, left: -20, width: 120, height: 120, borderRadius: "50%", background: B.pink, opacity: 0.06 }} />
      <div style={{ position: "relative" }}>
        <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginBottom: 10, ...goldGrad }}>Desktop Opportunity</div>
        <div style={{ fontSize: 20, fontFamily: font.display, color: B.white, fontWeight: 700, lineHeight: 1.3, marginBottom: 12 }}>39.3% of users are desktop-only — plus 14.8% cross-device. The Wix site has <span style={{ color: B.pink, fontStyle: "italic" }}>8+ nav items</span>, no sticky CTA, and an external Booker redirect.</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: font.body, lineHeight: 1.7 }}>Cross-device users likely discover BAM on mobile via social, then return on desktop to research and book. Awards are buried, membership pricing is in text walls, and the Look Book has zero booking links. These are the highest-leverage on-site fixes.</div>
      </div>
    </div>

    <Divider />

    <h3 style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 24 }}>Customer Journey Funnel</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {[
        { stage: "Discovery", desc: "First visit to bambeautybar.com (desktop & mobile)", pct: "100%", w: "100%", tab: "Homepage CRO" },
        { stage: "Engagement", desc: "Smart popup captures interest", pct: "72%", w: "72%", tab: "Popup CRO" },
        { stage: "Booking", desc: "Embedded booking flow (no redirect)", pct: "48%", w: "48%", tab: "Form CRO" },
        { stage: "Signup", desc: "Guided membership enrollment", pct: "30%", w: "30%", tab: "Signup Flow CRO" },
        { stage: "Activation", desc: "First visit & onboarding", pct: "22%", w: "22%", tab: "Onboarding CRO" },
        { stage: "Expansion", desc: "Tier upgrade & retention", pct: "15%", w: "15%", tab: "Paywall CRO" },
      ].map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: "0 0 100px", fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", textAlign: "right", ...goldGrad }}>{s.stage}</div>
          <div style={{ flex: 1 }}>
            <div style={{
              width: s.w, background: `linear-gradient(90deg, ${B.pinkLight}, ${B.petal})`,
              borderLeft: `3px solid ${B.pink}`, padding: "14px 18px", borderRadius: "0 8px 8px 0",
            }}>
              <div style={{ fontSize: 13, color: B.charcoal, fontFamily: font.body, fontWeight: 600 }}>{s.desc}</div>
              <div style={{ fontSize: 10, color: B.silver, fontFamily: font.body, marginTop: 2 }}>{s.tab} · Target: {s.pct}</div>
            </div>
          </div>
        </div>
      ))}
    </div>

    <Divider />

    <h3 style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 24 }}>Top 5 Quick Wins</h3>
    {[
      { n: "01", t: "Add social proof above the fold (desktop & mobile)", d: "D Magazine award badge + Google rating prominently on hero section — currently buried at the bottom of the page" },
      { n: "02", t: "Sticky navigation with booking CTA on desktop", d: "Current nav has 8+ items and no persistent BOOK button. Add fixed header with single gold 'Book Now' CTA" },
      { n: "03", t: "Replace external Booker redirect with embedded booking", d: "Desktop users leave bambeautybar.com entirely when clicking BOOK. Embed the booking flow to keep them on-brand" },
      { n: "04", t: "Desktop membership comparison table", d: "Replace text-wall pricing on /membership with a scannable 3-column comparison (Bestie vs Bae vs Boundless)" },
      { n: "05", t: "Exit-intent popup on desktop booking pages", d: "Show $90/mo Bestie membership to desktop users leaving the booking page — exit intent is reliable on desktop" },
    ].map((w, i) => (
      <div key={i} style={{ display: "flex", gap: 16, padding: "18px 0", borderBottom: `1px solid ${B.mist}`, alignItems: "flex-start" }}>
        <div style={{ fontSize: 32, fontFamily: font.display, fontWeight: 700, flex: "0 0 48px", fontStyle: "italic", ...goldGrad }}>{w.n}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, color: B.black, fontFamily: font.body, fontWeight: 700, marginBottom: 4 }}>{w.t}</div>
          <div style={{ fontSize: 13, color: B.slate, fontFamily: font.body, lineHeight: 1.65 }}>{w.d}</div>
        </div>
        <Badge>High</Badge>
      </div>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════
// TAB: PAGE CRO
// ═══════════════════════════════════════════════════════════
const PageTab = () => (
  <div>
    <SectionTitle badge="Page CRO" title="Homepage Redesign" subtitle={<>The current bambeautybar.com homepage has 8+ nav items competing for attention, no social proof above the fold, and the D Magazine awards are buried at the very bottom. Here's the optimized desktop and mobile experience.</>} />

    <DeviceLabel>✦ Desktop Experience ✦</DeviceLabel>

    <BrowserMockup url="bambeautybar.com" label="optimized desktop homepage — above the fold">
      <div style={{ background: B.white }}>
        {/* Sticky Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 28px", borderBottom: `1px solid ${B.mist}` }}>
          <div style={{ fontFamily: font.display, fontSize: 22, color: B.black, fontWeight: 700, letterSpacing: 2 }}>BAM</div>
          <div style={{ display: "flex", gap: 24 }}>
            {["Services", "Membership", "Locations", "Events"].map(l => (
              <span key={l} style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: B.slate, fontFamily: font.body, fontWeight: 600 }}>{l}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: B.slate, fontFamily: font.body, fontWeight: 600 }}>214-501-5643</span>
            <div style={{ background: B.pink, color: B.white, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "10px 22px", borderRadius: 6 }}>Book Now</div>
          </div>
        </div>

        {/* Trust Bar */}
        <div style={{ display: "flex", justifyContent: "center", gap: 32, padding: "10px 0", background: B.petal, borderBottom: `1px solid ${B.pink}15` }}>
          {["★ 4.9 — 2,400+ Reviews", "D Magazine: Best Blowout", "3 DFW Locations · Open 7 Days", "BALMAIN Hair Couture"].map((t, i) => (
            <span key={i} style={{ fontSize: 10, color: B.pinkDark, fontFamily: font.body, fontWeight: 600, letterSpacing: 0.5 }}>{t}</span>
          ))}
        </div>

        {/* Hero */}
        <div style={{ padding: "44px 40px 36px", textAlign: "center", background: `linear-gradient(180deg, ${B.white}, ${B.petal})` }}>
          <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginBottom: 14 }}>Award-Winning Blowouts & Makeup</div>
          <div style={{ fontSize: 36, fontFamily: font.display, color: B.black, fontWeight: 700, lineHeight: 1.15, marginBottom: 14 }}>Look Good. Feel Good.<br /><span style={{ color: B.pink, fontStyle: "italic" }}>Do Good.</span></div>
          <div style={{ fontSize: 13, color: B.slate, fontFamily: font.body, marginBottom: 28, lineHeight: 1.7 }}>Expert blowouts from $59 · Professional makeup from $49 · Dallas · Plano · Fort Worth</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 14 }}>
            <div style={{ background: B.black, color: B.white, fontSize: 11, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "16px 40px", borderRadius: 8 }}>Book Your Blowout</div>
            <div style={{ border: `2px solid ${B.black}`, color: B.black, fontSize: 11, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "14px 32px", borderRadius: 8 }}>View Memberships</div>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ padding: "28px 28px 32px", display: "flex", gap: 14 }}>
          {[
            { name: "Blowouts", price: "$59+", desc: "10 signature styles" },
            { name: "Makeup", price: "$49+", desc: "Bespoke application" },
            { name: "Lashes", price: "$35+", desc: "Strip & extensions" },
            { name: "Events", price: "$59+", desc: "Bridal & on-site" },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: B.snow, borderRadius: 12, padding: "20px", textAlign: "center", border: `1px solid ${B.mist}` }}>
              <div style={{ fontSize: 14, fontFamily: font.display, fontWeight: 700, color: B.black }}>{s.name}</div>
              <div style={{ fontSize: 11, color: B.slate, fontFamily: font.body, marginTop: 4 }}>{s.desc}</div>
              <div style={{ fontSize: 16, fontFamily: font.display, color: B.pink, fontWeight: 700, marginTop: 8 }}>{s.price}</div>
              <div style={{ marginTop: 10, fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: B.pinkDark, fontFamily: font.body, fontWeight: 700, cursor: "pointer" }}>Book →</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserMockup>

    <div style={{ height: 28 }} />

    <DeviceLabel>✦ Mobile Experience ✦</DeviceLabel>

    <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
      <PhoneMockup label="optimized mobile homepage">
        <div style={{ background: B.white, height: 480 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 18px", borderBottom: `1px solid ${B.mist}` }}>
            <div style={{ fontFamily: font.display, fontSize: 18, color: B.black, fontWeight: 700, letterSpacing: 2 }}>BAM</div>
            <div style={{ background: B.pink, color: B.white, fontSize: 9, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "8px 16px", borderRadius: 6 }}>Book</div>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, padding: "8px 0", background: B.petal, fontSize: 9, color: B.pinkDark, fontFamily: font.body, fontWeight: 600 }}>
            <span>★ 4.9 Rating</span><span>·</span><span>D Magazine Best</span><span>·</span><span>3 Locations</span>
          </div>
          <div style={{ padding: "28px 20px", textAlign: "center", background: `linear-gradient(180deg, ${B.white}, ${B.petal})` }}>
            <div style={{ fontSize: 26, fontFamily: font.display, color: B.black, fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>Blowouts & Makeup<br /><span style={{ color: B.pink, fontStyle: "italic" }}>That Wow</span></div>
            <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginBottom: 20 }}>From $59 · Open 7 days</div>
            <div style={{ background: B.black, color: B.white, fontSize: 11, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "14px", borderRadius: 8 }}>Book Your Blowout →</div>
            <div style={{ marginTop: 10, fontSize: 11, color: B.silver, fontFamily: font.body }}>Or explore <span style={{ color: B.pinkDark, fontWeight: 600 }}>memberships from $90/mo</span></div>
          </div>
        </div>
      </PhoneMockup>
    </div>

    <Divider />
    <h3 style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 20 }}>Issues Identified & Fixes</h3>
    <IssueRow issue="Navigation bloat (desktop)" fix="Current nav has 8+ top-level items (Book, Services, Events, Membership, Gallery, FAQ, Shop, Blog, More). Consolidate to 4-5: Services, Membership, Locations, Events — with persistent 'Book Now' CTA button" impact="High" />
    <IssueRow issue="No sticky header" fix="Desktop: As user scrolls, the nav should remain fixed with the gold 'Book Now' CTA always visible. Mobile: persistent bottom booking bar" impact="High" />
    <IssueRow issue="Awards buried at bottom" fix="D Magazine 'Best Blowout' and Modern Luxury 'Best Bridal' awards are currently at the very bottom of the homepage. Move to a trust bar directly below the nav — visible without scrolling" impact="High" />
    <IssueRow issue="No social proof above fold" fix="Add Google rating (4.9★), review count (2,400+), and D Magazine badge as a horizontal trust strip on both desktop and mobile" impact="High" />
    <IssueRow issue="3 competing CTAs" fix="Homepage currently shows separate BOOK buttons for Blowouts and Makeup in the hero. Unify to single primary CTA: 'Book Your Blowout' — secondary link for memberships" impact="High" />
    <IssueRow issue="Services layout (desktop)" fix="Current services section is a vertical text list. Replace with a 4-column grid showing service name, starting price, and direct booking link — scannable at a glance" impact="Med" />
    <IssueRow issue="Look Book is passive" fix="The gallery shows 10 blowout styles (Bombshell, Babe, Beauty, etc.) but none link to booking. Add 'Book This Style' CTA to each — turn gallery into conversion tool" impact="Med" />
    <IssueRow issue="Pricing transparency" fix="Add 'from $59' and 'from $49' directly in hero — currently requires clicking into Services to find pricing" impact="Med" />
  </div>
);

// ═══════════════════════════════════════════════════════════
// TAB: POPUP CRO
// ═══════════════════════════════════════════════════════════
const PopupTab = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [popupType, setPopupType] = useState("exit");

  return (
    <div>
      <SectionTitle badge="Popup CRO" title="Strategic Popup System" subtitle="Three behavior-triggered popups, each contextually matched to the visitor's intent. Desktop gets the full exit-intent modal experience; mobile gets non-intrusive bottom slide-ins." />

      <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
        {[
          { id: "exit", label: "Exit Intent", desc: "Desktop — leaving booking page" },
          { id: "scroll", label: "Scroll-Triggered", desc: "Both — 50% of services page" },
          { id: "first", label: "First Visit", desc: "Both — 30s delay, new visitors" },
        ].map(p => (
          <button key={p.id} onClick={() => { setPopupType(p.id); setShowPopup(true); }} style={{
            background: popupType === p.id && showPopup ? B.black : B.white,
            color: popupType === p.id && showPopup ? B.white : B.charcoal,
            border: `1px solid ${popupType === p.id && showPopup ? B.black : B.mist}`, padding: "16px 20px", borderRadius: 10,
            cursor: "pointer", fontFamily: font.body, fontSize: 13,
            flex: "1 1 160px", textAlign: "left", transition: "all 0.3s",
          }}>
            <div style={{ fontWeight: 700, marginBottom: 2 }}>{p.label}</div>
            <div style={{ fontSize: 11, opacity: 0.55 }}>{p.desc}</div>
          </button>
        ))}
      </div>

      {showPopup && popupType === "exit" && (
        <>
          <DeviceLabel>✦ Desktop Exit-Intent ✦</DeviceLabel>
          <BrowserMockup url="bambeautybar.com/book" label="desktop exit-intent modal — booking page">
            <div style={{ background: B.cream, minHeight: 300, position: "relative" }}>
              {/* Dimmed page behind */}
              <div style={{ opacity: 0.15, padding: "20px 28px" }}>
                <div style={{ width: "40%", height: 10, background: B.mist, borderRadius: 4, marginBottom: 10 }} />
                <div style={{ display: "flex", gap: 14 }}>
                  {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: 80, background: B.mist, borderRadius: 8 }} />)}
                </div>
              </div>
              {/* Modal overlay */}
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                <div style={{ background: B.white, borderRadius: 20, maxWidth: 520, width: "100%", display: "flex", overflow: "hidden", boxShadow: "0 32px 64px rgba(0,0,0,0.2)", position: "relative" }}>
                  <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 18, color: B.silver, cursor: "pointer", zIndex: 2 }}>✕</button>
                  {/* Left: visual */}
                  <div style={{ flex: "0 0 180px", background: `linear-gradient(135deg, ${B.petal}, ${B.pinkLight})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
                    <div style={{ fontSize: 48, marginBottom: 12 }}>💎</div>
                    <div style={{ fontSize: 36, fontFamily: font.display, color: B.black, fontWeight: 700, lineHeight: 1 }}>20%</div>
                    <div style={{ fontSize: 12, fontFamily: font.body, color: B.pinkDark, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>Off</div>
                  </div>
                  {/* Right: content */}
                  <div style={{ flex: 1, padding: "32px 28px" }}>
                    <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginBottom: 10 }}>Before you go</div>
                    <div style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, lineHeight: 1.25, marginBottom: 6 }}>Your First Blowout,</div>
                    <div style={{ fontSize: 22, fontFamily: font.display, color: B.pink, fontWeight: 700, fontStyle: "italic", lineHeight: 1.25, marginBottom: 14 }}>On Us (Almost)</div>
                    <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, lineHeight: 1.65, marginBottom: 18 }}>Join 2,400+ women who trust BAM for award-winning blowouts across DFW.</div>
                    <input placeholder="Enter your email" style={{ width: "100%", boxSizing: "border-box", padding: "12px", border: `1px solid ${B.mist}`, borderRadius: 8, fontSize: 12, fontFamily: font.body, marginBottom: 10, outline: "none" }} />
                    <div style={{ background: B.black, color: B.white, textAlign: "center", padding: "13px", borderRadius: 8, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Claim My 20% Off</div>
                    <div style={{ fontSize: 10, color: B.silver, marginTop: 8, fontFamily: font.body, textAlign: "center" }}>No spam · Unsubscribe anytime</div>
                  </div>
                </div>
              </div>
            </div>
          </BrowserMockup>
        </>
      )}

      {showPopup && popupType !== "exit" && (
        <>
          <DeviceLabel>✦ Mobile Experience ✦</DeviceLabel>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <PhoneMockup label={popupType === "scroll" ? "scroll-triggered slide-in" : "first-visit welcome"}>
              <div style={{ minHeight: 420 }}>
                <div style={{ background: B.cream, padding: "20px 16px", opacity: 0.3, minHeight: 110 }}>
                  <div style={{ width: "60%", height: 8, background: B.mist, borderRadius: 4, marginBottom: 8 }} />
                  <div style={{ width: "80%", height: 6, background: B.mist, borderRadius: 4, marginBottom: 6 }} />
                  <div style={{ width: "45%", height: 6, background: B.mist, borderRadius: 4 }} />
                </div>
                <div style={{
                  background: B.white, margin: "0 10px", borderRadius: 18,
                  boxShadow: "0 -8px 40px rgba(0,0,0,0.12)", padding: "24px 20px",
                  position: "relative", border: `1px solid ${B.pinkLight}`,
                }}>
                  <button onClick={() => setShowPopup(false)} style={{ position: "absolute", top: 12, right: 14, background: "none", border: "none", fontSize: 16, color: B.silver, cursor: "pointer" }}>✕</button>
                  {popupType === "scroll" && (
                    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                      <div style={{ flex: "0 0 48px", height: 48, background: B.pinkLight, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>✨</div>
                      <div>
                        <div style={{ fontSize: 15, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 4 }}>Love what you see?</div>
                        <div style={{ fontSize: 11, color: B.slate, fontFamily: font.body, lineHeight: 1.55, marginBottom: 14 }}>BAM members save up to 40% on every visit. Starting at just $90/mo.</div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <div style={{ background: B.black, color: B.white, padding: "10px 16px", borderRadius: 6, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>See Plans</div>
                          <div style={{ border: `1px solid ${B.mist}`, color: B.slate, padding: "10px 16px", borderRadius: 6, fontSize: 10, fontFamily: font.body, fontWeight: 600 }}>Not Now</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {popupType === "first" && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ width: 48, height: 48, borderRadius: 24, background: B.pinkLight, margin: "0 auto 12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>✦</div>
                      <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.pinkDark, fontFamily: font.body, fontWeight: 700, marginBottom: 8 }}>Welcome to BAM</div>
                      <div style={{ fontSize: 20, fontFamily: font.display, color: B.black, lineHeight: 1.25, fontWeight: 700 }}>Your First Visit</div>
                      <div style={{ fontSize: 20, fontFamily: font.display, color: B.black, lineHeight: 1.25, fontWeight: 700 }}>Deserves Something</div>
                      <div style={{ fontSize: 20, fontFamily: font.display, color: B.pink, lineHeight: 1.25, fontWeight: 700, fontStyle: "italic", marginBottom: 10 }}>Special</div>
                      <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, lineHeight: 1.6, marginBottom: 18 }}>Get a complimentary deep conditioning with your first blowout.</div>
                      <div style={{ background: B.black, color: B.white, padding: "14px", borderRadius: 8, fontSize: 11, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Book First Visit</div>
                      <div style={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        {[1,2,3,4,5].map(s => <span key={s} style={{ color: B.pink, fontSize: 13 }}>★</span>)}
                      </div>
                      <div style={{ fontSize: 10, color: B.silver, fontFamily: font.body, marginTop: 4 }}>Rated 4.9 by 2,400+ clients</div>
                    </div>
                  )}
                </div>
              </div>
            </PhoneMockup>
          </div>
        </>
      )}

      <Divider />
      <h3 style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 20 }}>Popup Strategy Rules</h3>
      <IssueRow issue="No popup strategy exists" fix="Current bambeautybar.com has zero popups. Implement 3 contextual triggers: exit-intent (desktop), scroll-triggered (both), and first-visit welcome (both)" impact="High" />
      <IssueRow issue="Desktop exit-intent" fix="Split-layout modal with visual left panel and email capture right. Fires on /book and /services after 10s. Suppressed 14 days after close" impact="High" />
      <IssueRow issue="Scroll-triggered (desktop)" fix="Elegant slide-in from bottom-right corner on services page at 50% scroll. Membership offer for non-members browsing services" impact="High" />
      <IssueRow issue="Mobile behavior" fix="Bottom slide-in only — under 30% screen height. No full-screen modals (Google penalty risk). Large close target. No exit-intent on mobile (unreliable)" impact="Med" />
      <IssueRow issue="Frequency cap" fix="Maximum 1 popup per session. Same popup shows once. Converted users never see popup again. Reset after 30 days" impact="High" />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// TAB: FORM CRO
// ═══════════════════════════════════════════════════════════
const FormTab = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      <SectionTitle badge="Form CRO" title="Streamlined Booking Flow" subtitle={<>Currently, clicking "BOOK" on bambeautybar.com redirects to an external Booker page — losing the brand experience and increasing abandonment. This embedded flow keeps users on-site for both desktop and mobile.</>} />

      <DeviceLabel>✦ Desktop Embedded Booking ✦</DeviceLabel>

      <BrowserMockup url="bambeautybar.com/book" label="desktop — embedded booking replaces external redirect">
        <div style={{ background: B.white }}>
          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 28px", borderBottom: `1px solid ${B.mist}` }}>
            <div style={{ fontFamily: font.display, fontSize: 20, color: B.black, fontWeight: 700, letterSpacing: 2 }}>BAM</div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Services", "Membership", "Locations"].map(l => (
                <span key={l} style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: B.slate, fontFamily: font.body, fontWeight: 600 }}>{l}</span>
              ))}
            </div>
            <div style={{ background: B.pink, color: B.white, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "10px 22px", borderRadius: 6 }}>Book Now</div>
          </div>

          {/* Booking content */}
          <div style={{ display: "flex", minHeight: 320 }}>
            {/* Left: service selection */}
            <div style={{ flex: "0 0 55%", padding: "28px 28px", borderRight: `1px solid ${B.mist}` }}>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginBottom: 8 }}>Step 1 of 3</div>
              <div style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 18 }}>Choose your service</div>
              {[
                { name: "Blowout", price: "$59+", desc: "Shampoo, conditioning & expert styling" },
                { name: "Makeup Application", price: "$49+", desc: "Customized bespoke makeup" },
                { name: "Blowout + Makeup", price: "$99+", desc: "The full BAM experience" },
                { name: "Lash Extensions", price: "$35+", desc: "Strip or individual lashes" },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
                  marginBottom: 8, borderRadius: 10, background: i === 0 ? B.pinkLight : B.white,
                  border: `1px solid ${i === 0 ? B.pink + "40" : B.mist}`, cursor: "pointer",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontFamily: font.body, fontWeight: 700, color: B.black }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: B.silver, fontFamily: font.body, marginTop: 2 }}>{s.desc}</div>
                  </div>
                  <div style={{ fontSize: 15, color: B.pinkDark, fontFamily: font.display, fontWeight: 700 }}>{s.price}</div>
                  <span style={{ color: B.mist, fontSize: 16 }}>›</span>
                </div>
              ))}
            </div>
            {/* Right: location + availability preview */}
            <div style={{ flex: 1, padding: "28px 24px", background: B.snow }}>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.silver, fontFamily: font.body, fontWeight: 700, marginBottom: 12 }}>Your nearest location</div>
              <div style={{ background: B.white, borderRadius: 12, padding: "18px", border: `1px solid ${B.mist}`, marginBottom: 16 }}>
                <div style={{ fontSize: 14, fontFamily: font.body, fontWeight: 700, color: B.black }}>Dallas</div>
                <div style={{ fontSize: 11, color: B.silver, fontFamily: font.body, marginTop: 2 }}>3700 McKinney Ave #152</div>
                <div style={{ fontSize: 10, color: B.pink, fontFamily: font.body, fontWeight: 700, marginTop: 6 }}>● Open now · Next slot 10:00 AM</div>
              </div>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.silver, fontFamily: font.body, fontWeight: 700, marginBottom: 10 }}>Today's availability</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["10:00 AM", "10:30", "11:00", "11:30", "1:00 PM", "2:30", "3:00", "4:00"].map((t, i) => (
                  <div key={i} style={{ padding: "8px 12px", borderRadius: 6, border: `1px solid ${B.mist}`, fontSize: 11, fontFamily: font.body, color: B.charcoal, background: B.white }}>{t}</div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 11, color: B.silver, fontFamily: font.body }}>Select a service to see full availability →</div>
            </div>
          </div>
        </div>
      </BrowserMockup>

      <div style={{ height: 28 }} />
      <DeviceLabel>✦ Mobile Experience ✦</DeviceLabel>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <PhoneMockup label="mobile — 3-step progressive flow">
          <div style={{ minHeight: 440, background: B.white }}>
            <div style={{ background: B.black, padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontFamily: font.display, fontSize: 18, color: B.white, fontWeight: 700, letterSpacing: 2 }}>BAM</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: font.body, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>Book Now</div>
            </div>
            <div style={{ display: "flex", padding: "14px 20px 8px", gap: 6 }}>
              {[1,2,3].map(s => <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? B.pink : B.mist, transition: "all 0.4s" }} />)}
            </div>
            <div style={{ padding: "0 20px 4px", fontSize: 10, color: B.silver, fontFamily: font.body, letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>
              Step {step} of 3 — {step === 1 ? "Service" : step === 2 ? "Location" : "Date & Time"}
            </div>
            <div style={{ padding: "0 20px 20px" }}>
              {step === 1 && (
                <div>
                  <div style={{ fontSize: 18, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 14 }}>What would you like?</div>
                  {[
                    { name: "Blowout", price: "$59+" },
                    { name: "Makeup", price: "$49+" },
                    { name: "Blowout + Makeup", price: "$99+" },
                    { name: "Lashes", price: "$35+" },
                  ].map((s, i) => (
                    <div key={i} onClick={() => setStep(2)} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "14px", marginBottom: 8,
                      borderRadius: 12, background: B.white, border: `1px solid ${B.mist}`, cursor: "pointer",
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: B.pink, flexShrink: 0 }} />
                      <div style={{ flex: 1, fontSize: 14, fontFamily: font.body, fontWeight: 700, color: B.black }}>{s.name}</div>
                      <div style={{ fontSize: 13, color: B.pinkDark, fontFamily: font.body, fontWeight: 700 }}>{s.price}</div>
                      <span style={{ color: B.mist, fontSize: 14 }}>›</span>
                    </div>
                  ))}
                </div>
              )}
              {step === 2 && (
                <div>
                  <div style={{ fontSize: 18, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 14 }}>Choose your location</div>
                  {[
                    { name: "Dallas", addr: "3700 McKinney Ave", badge: "Closest" },
                    { name: "Plano", addr: "7400 Windrose Ave" },
                    { name: "Fort Worth", addr: "5234 Marathon Ave" },
                  ].map((l, i) => (
                    <div key={i} onClick={() => setStep(3)} style={{ padding: "16px", marginBottom: 8, borderRadius: 12, background: B.white, border: `1px solid ${B.mist}`, cursor: "pointer" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 14, fontFamily: font.body, fontWeight: 700, color: B.black }}>{l.name}</div>
                          <div style={{ fontSize: 11, color: B.silver, fontFamily: font.body, marginTop: 3 }}>{l.addr}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {l.badge && <span style={{ fontSize: 9, background: B.pinkLight, color: B.pinkDark, padding: "4px 10px", borderRadius: 20, fontFamily: font.body, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>{l.badge}</span>}
                          <span style={{ color: B.mist, fontSize: 14 }}>›</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setStep(1)} style={{ background: "none", border: "none", fontSize: 12, color: B.pink, fontFamily: font.body, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>← Back</button>
                </div>
              )}
              {step === 3 && (
                <div>
                  <div style={{ fontSize: 18, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 14 }}>Pick your time</div>
                  <div style={{ fontSize: 12, fontFamily: font.body, color: B.slate, marginBottom: 14 }}>Tomorrow, Feb 2</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
                    {["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "1:00 PM", "2:30 PM"].map((t, i) => (
                      <div key={i} style={{ padding: "11px 14px", borderRadius: 8, border: i === 2 ? `2px solid ${B.pink}` : `1px solid ${B.mist}`, background: i === 2 ? B.pinkLight : B.white, fontSize: 12, fontFamily: font.body, color: i === 2 ? B.pinkDark : B.charcoal, fontWeight: i === 2 ? 700 : 400, cursor: "pointer" }}>{t}</div>
                    ))}
                  </div>
                  <div style={{ background: B.black, color: B.white, textAlign: "center", padding: "14px", borderRadius: 8, fontSize: 12, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Confirm Booking</div>
                  <div style={{ textAlign: "center", fontSize: 11, color: B.silver, fontFamily: font.body, marginTop: 8 }}>No payment required to reserve</div>
                  <button onClick={() => setStep(2)} style={{ background: "none", border: "none", fontSize: 12, color: B.pink, fontFamily: font.body, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>← Back</button>
                </div>
              )}
            </div>
          </div>
        </PhoneMockup>
      </div>

      <Divider />
      <h3 style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 20 }}>Booking Optimization Details</h3>
      <IssueRow issue="External redirect (critical)" fix="Clicking 'BOOK DALLAS NOW' on /book currently sends users to go.booker.com — off-brand, off-site, and high-friction. Embed booking widget directly on bambeautybar.com" impact="High" />
      <IssueRow issue="Desktop layout opportunity" fix="Desktop booking page should show service picker on the left and location/availability preview on the right — leverages the wider viewport for a scannable 2-panel layout" impact="High" />
      <IssueRow issue="3 separate location buttons" fix="Current /book page shows 3 location images with separate BOOK buttons requiring a choice before seeing services. Lead with services first — location second (most users care about what, then where)" impact="High" />
      <IssueRow issue="No real-time availability" fix="Show next available slot per location ('Next: 10:00 AM') to create urgency and help users pick the fastest option" impact="Med" />
      <IssueRow issue="No geolocation" fix="Auto-detect nearest location using browser geolocation, pre-select and mark as 'Closest'" impact="Med" />
      <IssueRow issue="Generic button text" fix="'BOOK DALLAS NOW' → 'Confirm Booking' with reassurance 'No payment required to reserve'" impact="Med" />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// TAB: SIGNUP FLOW CRO
// ═══════════════════════════════════════════════════════════
const SignupTab = () => {
  const [signupStep, setSignupStep] = useState(0);
  return (
    <div>
      <SectionTitle badge="Signup Flow CRO" title="Membership Enrollment" subtitle={<>The current /membership page lists all 9 plan variations in dense text paragraphs. Desktop visitors need a comparison table; mobile visitors need a guided quiz. Both are shown below.</>} />

      <DeviceLabel>✦ Desktop Comparison Table ✦</DeviceLabel>

      <BrowserMockup url="bambeautybar.com/membership" label="desktop — scannable comparison replaces text walls">
        <div style={{ background: B.white }}>
          <div style={{ textAlign: "center", padding: "32px 28px 8px" }}>
            <div style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginBottom: 10 }}>Memberships</div>
            <div style={{ fontSize: 28, fontFamily: font.display, color: B.black, fontWeight: 700, lineHeight: 1.2 }}>Find Your <span style={{ color: B.pink, fontStyle: "italic" }}>Perfect Plan</span></div>
            <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginTop: 8 }}>Save up to 40% vs walk-in pricing · Cancel anytime · All 3 locations</div>
          </div>

          {/* Comparison Table */}
          <div style={{ display: "flex", gap: 12, padding: "24px 20px 28px" }}>
            {[
              { tier: "Bestie", price: "$90", per: "/mo", visits: "2 blowouts", save: "$28/mo", features: ["Priority booking", "10% off add-ons", "Cancel anytime"], pop: false },
              { tier: "Bae", price: "$175", per: "/mo", visits: "4 blowouts", save: "$65/mo", features: ["Priority booking", "10% off add-ons", "Guest passes", "Cancel anytime"], pop: true },
              { tier: "Boundless", price: "$425", per: "/mo", visits: "Unlimited", save: "$200+/mo", features: ["Priority booking", "15% off add-ons", "Guest passes", "VIP events", "Cancel anytime"], pop: false },
            ].map((p, i) => (
              <div key={i} style={{
                flex: 1, borderRadius: 14, padding: p.pop ? "3px" : 0,
                background: p.pop ? `linear-gradient(135deg, ${B.pink}, ${B.pinkDark})` : "transparent",
              }}>
                <div style={{
                  background: B.white, borderRadius: p.pop ? 12 : 14,
                  padding: "24px 18px", textAlign: "center",
                  border: p.pop ? "none" : `1px solid ${B.mist}`,
                  height: "100%", boxSizing: "border-box",
                  display: "flex", flexDirection: "column",
                }}>
                  {p.pop && <div style={{ fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: B.white, background: B.pink, padding: "4px 12px", borderRadius: 10, fontFamily: font.body, fontWeight: 700, alignSelf: "center", marginBottom: 10, marginTop: -14 }}>Most Popular</div>}
                  <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: B.pinkDark, fontFamily: font.body, fontWeight: 800, marginBottom: 4 }}>{p.tier}</div>
                  <div style={{ fontSize: 32, fontFamily: font.display, color: B.black, fontWeight: 700 }}>{p.price}<span style={{ fontSize: 13, color: B.silver, fontWeight: 400 }}>{p.per}</span></div>
                  <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginTop: 2 }}>{p.visits}</div>
                  <div style={{ background: B.pinkLight, borderRadius: 8, padding: "8px", marginTop: 12, marginBottom: 14 }}>
                    <div style={{ fontSize: 11, color: B.pinkDark, fontFamily: font.body, fontWeight: 700 }}>Save {p.save} vs walk-in</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    {p.features.map((f, fi) => (
                      <div key={fi} style={{ fontSize: 11, color: B.slate, fontFamily: font.body, lineHeight: 2.2, textAlign: "left", paddingLeft: 8 }}>
                        <span style={{ color: B.pink, marginRight: 6 }}>✓</span>{f}
                      </div>
                    ))}
                  </div>
                  <div style={{ background: p.pop ? B.black : B.snow, color: p.pop ? B.white : B.charcoal, textAlign: "center", padding: "13px", borderRadius: 8, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginTop: 16 }}>
                    {p.pop ? "Join Now" : "Select Plan"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BrowserMockup>

      <div style={{ height: 28 }} />
      <DeviceLabel>✦ Mobile Quiz Flow ✦</DeviceLabel>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <PhoneMockup label="mobile — guided quiz matcher">
          <div style={{ minHeight: 440, background: B.white }}>
            <div style={{ padding: "20px 20px 0", textAlign: "center", background: B.petal }}>
              <div style={{ fontFamily: font.display, fontSize: 18, color: B.black, letterSpacing: 2, fontWeight: 700 }}>BAM</div>
              <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginTop: 2 }}>Membership</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "16px 0 20px", background: `linear-gradient(180deg, ${B.petal}, ${B.white})` }}>
              {[0,1,2].map(s => (
                <div key={s} style={{ width: s === signupStep ? 24 : 8, height: 8, borderRadius: 4, background: s <= signupStep ? B.pink : B.mist, transition: "all 0.4s" }} />
              ))}
            </div>
            <div style={{ padding: "0 20px 20px" }}>
              {signupStep === 0 && (
                <div>
                  <div style={{ fontSize: 22, fontFamily: font.display, color: B.black, textAlign: "center", lineHeight: 1.3, fontWeight: 700, marginBottom: 4 }}>How often do you</div>
                  <div style={{ fontSize: 22, fontFamily: font.display, color: B.pink, textAlign: "center", lineHeight: 1.3, fontWeight: 700, fontStyle: "italic", marginBottom: 20 }}>glam up?</div>
                  {[
                    { label: "A couple times a month", sub: "Perfect for the Bestie plan", plan: "$90/mo" },
                    { label: "Every week", sub: "You'll love the Bae plan", plan: "$175/mo" },
                    { label: "As often as possible", sub: "Boundless is calling!", plan: "$425/mo" },
                  ].map((o, i) => (
                    <div key={i} onClick={() => setSignupStep(1)} style={{
                      padding: "16px", marginBottom: 8, borderRadius: 12, background: B.white,
                      border: `1px solid ${B.mist}`, cursor: "pointer", display: "flex",
                      justifyContent: "space-between", alignItems: "center",
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontFamily: font.body, fontWeight: 700, color: B.black }}>{o.label}</div>
                        <div style={{ fontSize: 11, color: B.silver, fontFamily: font.body, marginTop: 2 }}>{o.sub}</div>
                      </div>
                      <div style={{ fontSize: 13, color: B.pinkDark, fontFamily: font.body, fontWeight: 700 }}>{o.plan}</div>
                    </div>
                  ))}
                </div>
              )}
              {signupStep === 1 && (
                <div>
                  <div style={{ fontSize: 22, fontFamily: font.display, color: B.black, textAlign: "center", lineHeight: 1.3, fontWeight: 700, marginBottom: 4 }}>What services</div>
                  <div style={{ fontSize: 22, fontFamily: font.display, color: B.pink, textAlign: "center", lineHeight: 1.3, fontWeight: 700, fontStyle: "italic", marginBottom: 20 }}>do you love?</div>
                  {[
                    { label: "Blowouts" },
                    { label: "Makeup" },
                    { label: "Both!" },
                  ].map((o, i) => (
                    <div key={i} onClick={() => setSignupStep(2)} style={{
                      padding: "16px", marginBottom: 8, borderRadius: 12, background: B.white,
                      border: `1px solid ${B.mist}`, cursor: "pointer", display: "flex", alignItems: "center", gap: 12,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: B.pink, flexShrink: 0 }} />
                      <div style={{ fontSize: 14, fontFamily: font.body, fontWeight: 700, color: B.black }}>{o.label}</div>
                    </div>
                  ))}
                  <button onClick={() => setSignupStep(0)} style={{ background: "none", border: "none", fontSize: 12, color: B.pink, fontFamily: font.body, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>← Back</button>
                </div>
              )}
              {signupStep === 2 && (
                <div>
                  <div style={{ fontSize: 18, fontFamily: font.display, color: B.black, textAlign: "center", fontWeight: 700, marginBottom: 4 }}>Your perfect plan</div>
                  <div style={{ textAlign: "center", marginBottom: 16 }}><Badge>Recommended</Badge></div>
                  <div style={{ background: B.petal, border: `1px solid ${B.pink}40`, borderRadius: 16, padding: "24px", textAlign: "center" }}>
                    <div style={{ fontSize: 10, letterSpacing: 3, textTransform: "uppercase", color: B.pinkDark, fontFamily: font.body, fontWeight: 700, marginBottom: 6 }}>Bestie</div>
                    <div style={{ fontSize: 36, fontFamily: font.display, color: B.black, fontWeight: 700 }}>$90<span style={{ fontSize: 14, color: B.silver, fontWeight: 400 }}>/mo</span></div>
                    <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginTop: 4, marginBottom: 18 }}>2 blowouts per month</div>
                    <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, lineHeight: 2, textAlign: "left", paddingLeft: 16 }}>
                      <span style={{ color: B.pink }}>✓</span> Save $28 vs walk-in<br />
                      <span style={{ color: B.pink }}>✓</span> Priority booking<br />
                      <span style={{ color: B.pink }}>✓</span> 10% off add-ons<br />
                      <span style={{ color: B.pink }}>✓</span> Cancel anytime
                    </div>
                  </div>
                  <div style={{ background: B.black, color: B.white, textAlign: "center", padding: "16px", borderRadius: 10, fontSize: 12, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginTop: 18 }}>Join the BAM Family</div>
                  <button onClick={() => setSignupStep(1)} style={{ background: "none", border: "none", fontSize: 12, color: B.pink, fontFamily: font.body, fontWeight: 600, cursor: "pointer", marginTop: 12 }}>← See other plans</button>
                </div>
              )}
            </div>
          </div>
        </PhoneMockup>
      </div>

      <Divider />
      <h3 style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 20 }}>Signup Flow Optimizations</h3>
      <IssueRow issue="Membership page is text walls" fix="Current /membership page opens with a long paragraph before any pricing. Desktop users need a scannable 3-column comparison table with feature checkmarks and savings callouts" impact="High" />
      <IssueRow issue="9 plans cause paralysis" fix="BAM offers Bestie/Bae/Boundless for blowouts, Blossom/Beguiled/Beloved for makeup, and Bedazzled/Brilliant/Boujie for both. Lead with blowout plans (core service) — let users filter by category" impact="High" />
      <IssueRow issue="No savings math" fix="Show explicit savings vs walk-in pricing on each plan card: 'Save $28/mo vs walk-in' — currently users must calculate this themselves" impact="High" />
      <IssueRow issue="Mobile: all plans at once" fix="Quiz-style flow matches frequency + services to a recommended plan, eliminating decision paralysis on smaller screens" impact="High" />
      <IssueRow issue="No social proof on plans" fix="Add member count or testimonial: 'Join 400+ BAM members' near the CTA" impact="Med" />
      <IssueRow issue="Cancellation anxiety" fix="'Cancel anytime · No contracts' shown prominently at decision point — current page mentions cancellation only in a nav sub-link" impact="Med" />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════
// TAB: ONBOARDING CRO
// ═══════════════════════════════════════════════════════════
const OnboardingTab = () => (
  <div>
    <SectionTitle badge="Onboarding CRO" title="New Client Activation" subtitle="Turning a first-time visitor into a repeat client requires a deliberate post-visit sequence. This targets the 48-hour window after their first appointment — mobile via SMS, desktop via email." />

    <DeviceLabel>✦ Desktop — Welcome Email ✦</DeviceLabel>

    <BrowserMockup url="mail.google.com" label="desktop — day-1 welcome email (2 hours post-visit)">
      <div style={{ background: "#f5f5f5", padding: "20px" }}>
        <div style={{ background: B.white, borderRadius: 12, maxWidth: 480, margin: "0 auto", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          {/* Email header */}
          <div style={{ background: B.black, padding: "24px", textAlign: "center" }}>
            <div style={{ fontFamily: font.display, fontSize: 24, color: B.white, fontWeight: 700, letterSpacing: 3 }}>BAM</div>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginTop: 4 }}>Blowouts & Makeup</div>
          </div>
          {/* Email body */}
          <div style={{ padding: "28px 24px" }}>
            <div style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>Hey gorgeous! 💛</div>
            <div style={{ fontSize: 13, color: B.slate, fontFamily: font.body, lineHeight: 1.8, marginBottom: 18 }}>
              Your BOMBSHELL blowout looked incredible today. We loved having you at BAM Dallas!
            </div>
            <div style={{ background: B.petal, borderRadius: 12, padding: "20px", textAlign: "center", marginBottom: 18 }}>
              <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginBottom: 6 }}>Your Next Visit</div>
              <div style={{ fontSize: 28, fontFamily: font.display, color: B.black, fontWeight: 700 }}>10% Off</div>
              <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginTop: 4 }}>As our thank-you for joining the BAM fam</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, background: B.black, color: B.white, textAlign: "center", padding: "14px", borderRadius: 8, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Rebook + Save 10%</div>
              <div style={{ flex: 1, border: `1px solid ${B.mist}`, color: B.charcoal, textAlign: "center", padding: "14px", borderRadius: 8, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Download App</div>
            </div>
            <div style={{ textAlign: "center", fontSize: 11, color: B.silver, fontFamily: font.body, marginTop: 14 }}>See you soon gorgeous! ✨</div>
          </div>
        </div>
      </div>
    </BrowserMockup>

    <div style={{ height: 28 }} />
    <DeviceLabel>✦ Mobile — SMS + App ✦</DeviceLabel>

    <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", marginBottom: 32 }}>
      <PhoneMockup label="welcome sms · 2hrs post-visit">
        <div style={{ background: B.white, height: 460, padding: "20px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: B.black, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: font.display, fontSize: 14, color: B.white, fontWeight: 700 }}>B</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontFamily: font.body, fontWeight: 700, color: B.black }}>BAM Beauty Bar</div>
              <div style={{ fontSize: 10, color: B.silver, fontFamily: font.body }}>2 hours ago</div>
            </div>
          </div>
          {[
            "Hey gorgeous! 💛 Your BOMBSHELL blowout looked incredible today.",
            <>Want to keep the look fresh? Book your next visit and get <span style={{ color: B.pinkDark, fontWeight: 700 }}>10% off</span> as our thank-you for being new to the BAM fam! ✨</>,
          ].map((msg, i) => (
            <div key={i} style={{ background: B.petal, borderRadius: 16, borderTopLeftRadius: 4, padding: "14px 16px", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontFamily: font.body, color: B.charcoal, lineHeight: 1.7 }}>{msg}</div>
            </div>
          ))}
          <div style={{ background: B.black, borderRadius: 12, padding: "14px", textAlign: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 11, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: B.white }}>Rebook + Save 10%</div>
          </div>
          <div style={{ background: B.petal, borderRadius: 16, borderTopLeftRadius: 4, padding: "14px 16px" }}>
            <div style={{ fontSize: 13, fontFamily: font.body, color: B.charcoal, lineHeight: 1.7 }}>P.S. Download the BAM app for express booking & exclusive rewards! 📲</div>
          </div>
        </div>
      </PhoneMockup>

      <PhoneMockup label="app onboarding · day 1">
        <div style={{ background: B.white, height: 460, padding: "20px", display: "flex", flexDirection: "column" }}>
          <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${B.mist}` }}>
            <div style={{ fontFamily: font.display, fontSize: 18, color: B.black, fontWeight: 700, letterSpacing: 2 }}>BAM</div>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginTop: 4 }}>Welcome</div>
          </div>
          <div style={{ fontSize: 20, fontFamily: font.display, color: B.black, textAlign: "center", lineHeight: 1.3, fontWeight: 700, marginBottom: 4 }}>Let's set up</div>
          <div style={{ fontSize: 20, fontFamily: font.display, color: B.pink, textAlign: "center", lineHeight: 1.3, fontWeight: 700, fontStyle: "italic", marginBottom: 20 }}>your BAM profile</div>
          {[
            { label: "Choose your home location", done: true },
            { label: "Pick your fave blowout style", done: true },
            { label: "Set a booking reminder", done: false },
            { label: "Explore membership perks", done: false },
          ].map((item, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "13px 14px",
              marginBottom: 6, borderRadius: 10,
              background: item.done ? B.pinkLight : B.white,
              border: `1px solid ${item.done ? B.pink + "40" : B.mist}`,
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 12,
                background: item.done ? B.pink : B.snow,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, color: item.done ? B.white : B.silver, fontWeight: 700,
              }}>{item.done ? "✓" : (i + 1)}</div>
              <div style={{
                fontSize: 13, fontFamily: font.body,
                color: item.done ? B.silver : B.black,
                textDecoration: item.done ? "line-through" : "none",
                fontWeight: item.done ? 400 : 600,
              }}>{item.label}</div>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 18 }}>
            <div style={{ fontSize: 11, color: B.silver, fontFamily: font.body, marginBottom: 6 }}>2 of 4 complete</div>
            <div style={{ width: "100%", height: 6, background: B.mist, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: "50%", height: "100%", background: B.pink, borderRadius: 3 }} />
            </div>
          </div>
        </div>
      </PhoneMockup>
    </div>

    <Divider />
    <h3 style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 20 }}>Activation Sequence</h3>
    <IssueRow issue="No post-visit follow-up" fix="Automated SMS (mobile) + email (desktop) 2hrs after first visit: personalized message, rebook incentive (10% off), and app download CTA" impact="High" />
    <IssueRow issue="Desktop: no email sequence" fix="Day 1: welcome email with rebook offer. Day 3: style tips email. Day 7: 'we miss you' with trending styles. Day 14: time-limited offer. Day 30: final winback" impact="High" />
    <IssueRow issue="App has no onboarding" fix="4-step guided setup: home location → blowout style preference → booking reminder → membership preview" impact="High" />
    <IssueRow issue="Desktop: no account dashboard" fix="After first visit, returning desktop users should see a personalized dashboard: rebook button, loyalty progress, membership upsell, and visit history" impact="Med" />
    <IssueRow issue="Aha moment undefined" fix="Activation = 'Booked second appointment within 30 days.' Users who rebook within a month have 4x higher LTV" impact="High" />
  </div>
);

// ═══════════════════════════════════════════════════════════
// TAB: PAYWALL CRO
// ═══════════════════════════════════════════════════════════
const PaywallTab = () => (
  <div>
    <SectionTitle badge="Paywall CRO" title="Membership Upsell Strategy" subtitle="Walk-in clients who visit 2+ times in a month are prime candidates for membership. Desktop users see the upsell on their account dashboard; mobile users see it in-app after their visit." />

    <DeviceLabel>✦ Desktop — Account Dashboard Upsell ✦</DeviceLabel>

    <BrowserMockup url="bambeautybar.com/account" label="desktop — contextual upsell in account dashboard">
      <div style={{ background: B.white }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 28px", borderBottom: `1px solid ${B.mist}` }}>
          <div style={{ fontFamily: font.display, fontSize: 20, color: B.black, fontWeight: 700, letterSpacing: 2 }}>BAM</div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ fontSize: 11, color: B.slate, fontFamily: font.body }}>Welcome back, Sarah</span>
            <div style={{ background: B.pink, color: B.white, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", padding: "10px 22px", borderRadius: 6 }}>Book Now</div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          {/* Left: visit history */}
          <div style={{ flex: "0 0 55%", padding: "24px 28px", borderRight: `1px solid ${B.mist}` }}>
            <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: B.pink, fontFamily: font.body, fontWeight: 700, marginBottom: 12 }}>Your Visit History</div>
            {[
              { date: "Jan 28", service: "Bombshell Blowout", loc: "Dallas", price: "$59" },
              { date: "Jan 14", service: "Bombshell Blowout", loc: "Dallas", price: "$59" },
            ].map((v, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: `1px solid ${B.mist}`, fontSize: 12, fontFamily: font.body }}>
                <span style={{ color: B.silver }}>{v.date}</span>
                <span style={{ color: B.black, fontWeight: 600 }}>{v.service}</span>
                <span style={{ color: B.silver }}>{v.loc}</span>
                <span style={{ color: B.charcoal, fontWeight: 700 }}>{v.price}</span>
              </div>
            ))}
            <div style={{ fontSize: 12, fontFamily: font.body, color: B.charcoal, fontWeight: 700, marginTop: 12 }}>Total this month: $118</div>
          </div>
          {/* Right: upsell card */}
          <div style={{ flex: 1, padding: "24px", background: B.petal }}>
            <div style={{ background: B.white, borderRadius: 14, padding: "24px", border: `2px solid ${B.pink}40`, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>🎉</div>
              <div style={{ fontSize: 16, fontFamily: font.display, color: B.black, fontWeight: 700, lineHeight: 1.3 }}>You've visited <span style={{ color: B.pink, fontStyle: "italic" }}>2 times</span> this month!</div>
              <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginTop: 8, lineHeight: 1.6 }}>You spent $118. With a Bestie membership, you'd pay just $90.</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16, marginBottom: 16 }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: B.pinkDark, fontFamily: font.body, fontWeight: 700 }}>Monthly</div>
                  <div style={{ fontSize: 24, fontFamily: font.display, color: B.black, fontWeight: 700 }}>$28</div>
                  <div style={{ fontSize: 10, color: B.silver, fontFamily: font.body }}>saved</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 9, letterSpacing: 1.5, textTransform: "uppercase", color: B.pinkDark, fontFamily: font.body, fontWeight: 700 }}>Yearly</div>
                  <div style={{ fontSize: 24, fontFamily: font.display, color: B.pinkDark, fontWeight: 700 }}>$336</div>
                  <div style={{ fontSize: 10, color: B.silver, fontFamily: font.body }}>saved</div>
                </div>
              </div>
              <div style={{ background: B.black, color: B.white, padding: "14px", borderRadius: 8, fontSize: 10, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Start Saving Today</div>
              <div style={{ fontSize: 11, color: B.silver, fontFamily: font.body, marginTop: 8 }}>Cancel anytime · No contracts</div>
            </div>
          </div>
        </div>
      </div>
    </BrowserMockup>

    <div style={{ height: 28 }} />
    <DeviceLabel>✦ Mobile — In-App Upsell ✦</DeviceLabel>

    <div style={{ display: "flex", gap: 48, flexWrap: "wrap", justifyContent: "center", alignItems: "flex-start", marginBottom: 32 }}>
      <PhoneMockup label="in-app upsell · after 2nd visit">
        <div style={{ background: B.white, height: 480, display: "flex", flexDirection: "column" }}>
          <div style={{ background: B.petal, padding: "28px 20px 20px", textAlign: "center", borderBottom: `1px solid ${B.pink}20` }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
            <div style={{ fontSize: 20, fontFamily: font.display, color: B.black, lineHeight: 1.3, fontWeight: 700 }}>
              You've visited <span style={{ color: B.pink, fontStyle: "italic" }}>2 times</span> this month!
            </div>
            <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginTop: 10, lineHeight: 1.65 }}>
              You've spent $118 this month. With a Bestie membership, you'd pay just $90.
            </div>
          </div>
          <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: B.pinkLight, border: `1px solid ${B.pink}30`,
              borderRadius: 12, padding: "16px 18px", marginBottom: 16,
            }}>
              <div>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: B.pinkDark, fontFamily: font.body, fontWeight: 700 }}>You'd save</div>
                <div style={{ fontSize: 28, fontFamily: font.display, color: B.black, fontWeight: 700 }}>$28<span style={{ fontSize: 12, color: B.silver, fontWeight: 400 }}>/mo</span></div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: B.silver, fontFamily: font.body, fontWeight: 600 }}>Per year</div>
                <div style={{ fontSize: 28, fontFamily: font.display, color: B.pinkDark, fontWeight: 700 }}>$336</div>
              </div>
            </div>
            <div style={{ border: `1px solid ${B.mist}`, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 12, fontFamily: font.body, fontWeight: 800, color: B.black, letterSpacing: 1.5 }}>BESTIE</div>
                <div style={{ fontSize: 16, fontFamily: font.display, color: B.pinkDark, fontWeight: 700 }}>$90/mo</div>
              </div>
              <div style={{ fontSize: 11, color: B.slate, fontFamily: font.body, lineHeight: 1.9 }}>
                2 blowouts/month · Priority booking<br />10% off add-ons · Cancel anytime
              </div>
            </div>
            <div style={{ marginTop: "auto" }}>
              <div style={{ background: B.black, color: B.white, textAlign: "center", padding: "16px", borderRadius: 10, fontSize: 12, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Start Saving Today</div>
              <div style={{ textAlign: "center", marginTop: 10 }}><span style={{ fontSize: 12, color: B.silver, fontFamily: font.body }}>Maybe later</span></div>
            </div>
          </div>
        </div>
      </PhoneMockup>

      <PhoneMockup label="tier upgrade · after 3rd visit">
        <div style={{ background: B.white, height: 480, padding: "24px 20px", display: "flex", flexDirection: "column" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <Badge>Upgrade</Badge>
            <div style={{ fontSize: 22, fontFamily: font.display, color: B.black, lineHeight: 1.3, fontWeight: 700, marginTop: 12 }}>Ready for</div>
            <div style={{ fontSize: 22, fontFamily: font.display, color: B.pink, lineHeight: 1.3, fontWeight: 700, fontStyle: "italic" }}>unlimited?</div>
            <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, marginTop: 10, lineHeight: 1.6 }}>You used both blowouts by the 15th. Boundless means never waiting again.</div>
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <div style={{ flex: 1, background: B.snow, border: `1px solid ${B.mist}`, borderRadius: 12, padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: B.silver, fontFamily: font.body, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Current</div>
              <div style={{ fontSize: 12, fontFamily: font.body, fontWeight: 800, color: B.charcoal }}>BESTIE</div>
              <div style={{ fontSize: 20, fontFamily: font.display, color: B.silver, fontWeight: 700, marginTop: 4 }}>$90</div>
              <div style={{ fontSize: 10, color: B.silver, fontFamily: font.body, marginTop: 4 }}>2 blowouts</div>
            </div>
            <div style={{ flex: 1, background: B.pinkLight, border: `1px solid ${B.pink}40`, borderRadius: 12, padding: "16px", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: B.pinkDark, fontFamily: font.body, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Upgrade</div>
              <div style={{ fontSize: 12, fontFamily: font.body, fontWeight: 800, color: B.black }}>BOUNDLESS</div>
              <div style={{ fontSize: 20, fontFamily: font.display, color: B.pinkDark, fontWeight: 700, marginTop: 4 }}>$425</div>
              <div style={{ fontSize: 10, color: B.pinkDark, fontFamily: font.body, marginTop: 4 }}>Unlimited ✨</div>
            </div>
          </div>
          <div style={{ background: B.petal, borderRadius: 12, padding: "14px", marginBottom: 20 }}>
            <div style={{ fontSize: 12, color: B.slate, fontFamily: font.body, lineHeight: 1.7, textAlign: "center" }}>
              At 4+ visits/month, Boundless saves you <span style={{ color: B.pinkDark, fontWeight: 700 }}>$200+</span> every month
            </div>
          </div>
          <div style={{ marginTop: "auto" }}>
            <div style={{ background: B.black, color: B.white, textAlign: "center", padding: "16px", borderRadius: 10, fontSize: 12, fontFamily: font.body, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Upgrade to Boundless</div>
            <div style={{ textAlign: "center", fontSize: 11, color: B.silver, marginTop: 10, fontFamily: font.body }}>Same billing cycle · Prorated difference</div>
          </div>
        </div>
      </PhoneMockup>
    </div>

    <Divider />
    <h3 style={{ fontSize: 22, fontFamily: font.display, color: B.black, fontWeight: 700, marginBottom: 20 }}>Upsell Strategy Details</h3>
    <IssueRow issue="No usage-based triggers" fix="Track visit count per billing cycle. Trigger membership upsell when walk-in clients visit 2+ times/month — on both desktop account page and mobile app" impact="High" />
    <IssueRow issue="Desktop: no account dashboard" fix="Build a post-login dashboard at /account showing visit history, spending, and contextual membership upsell card with savings math" impact="High" />
    <IssueRow issue="Value not quantified" fix="Show exact dollar savings: 'You spent $118. With Bestie, $90.' Concrete numbers convert on both desktop and mobile" impact="High" />
    <IssueRow issue="No tier upgrade path" fix="When members exhaust allotment before mid-month, show contextual upgrade with prorated pricing — desktop via dashboard banner, mobile via in-app modal" impact="High" />
    <IssueRow issue="Celebratory framing" fix="Upsell celebrates ('You've visited 2 times!') rather than punishes. Upgrade = solving their problem, not a sales pitch" impact="Med" />
  </div>
);

// ═══════════════════════════════════════════════════════════
// TAB: MARKET INTEL
// ═══════════════════════════════════════════════════════════
const IntelTab = () => {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const visits = [770, 1098, 868, 912, 1731, 668, 936, 1275, 1053, 893, 1185, 2184];
  const maxV = Math.max(...visits);
  return (
  <div>
    <SectionTitle badge="Digital Performance" title="2025 Traffic Baseline" subtitle="SimilarWeb data for bambeautybar.com across the full 2025 calendar year — 13,873 total visits with clear seasonality tied to events, holidays, and wedding season." />

    {/* Key Metrics Row */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
      <MetricCard label="Total 2025 Visits" value="13,873" sub="Monthly avg: 1,156 · 99.3% U.S. traffic" delay={100} />
      <MetricCard label="Peak Month" value="Dec" sub="2,184 visits · +89% vs. average" delay={250} />
      <MetricCard label="#1 Channel" value="Social" sub="34.0% of all traffic · Instagram-driven" delay={400} />
    </div>

    {/* Traffic Chart */}
    <div style={{ background: B.petal, borderRadius: 16, padding: "32px 28px", marginBottom: 40 }}>
      <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginBottom: 24, ...goldGrad }}>Monthly Website Visits (2025)</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 180 }}>
        {months.map((m, i) => (
          <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 10, fontFamily: font.body, fontWeight: 700, color: visits[i] === maxV ? B.pinkDark : B.slate }}>{visits[i] >= 1500 ? `${(visits[i]/1000).toFixed(1)}K` : visits[i]}</div>
            <div style={{
              width: "100%", borderRadius: "6px 6px 0 0",
              height: `${(visits[i] / maxV) * 140}px`,
              background: visits[i] === maxV ? `linear-gradient(180deg, ${B.pink}, ${B.pinkDark})` : visits[i] >= 1500 ? `linear-gradient(180deg, ${B.pinkLight}, ${B.pink}80)` : `linear-gradient(180deg, ${B.pinkLight}, ${B.mist})`,
              transition: "height 0.5s ease",
            }} />
            <div style={{ fontSize: 9, fontFamily: font.body, color: B.silver, fontWeight: 600 }}>{m}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 11, color: B.slate, fontFamily: font.body }}><span style={{ fontWeight: 700 }}>Holiday Surge:</span> Dec 2,184 (+89% vs avg)</div>
        <div style={{ fontSize: 11, color: B.slate, fontFamily: font.body }}><span style={{ fontWeight: 700 }}>Spring Peak:</span> May 1,731 (weddings + prom)</div>
        <div style={{ fontSize: 11, color: B.slate, fontFamily: font.body }}><span style={{ fontWeight: 700 }}>Summer Low:</span> Jun 668 (−42% vs avg)</div>
      </div>
    </div>

    {/* Seasonal Reco */}
    <div style={{ borderLeft: `3px solid ${B.pink}`, paddingLeft: 20, marginBottom: 40 }}>
      <div style={{ fontSize: 13, fontFamily: font.body, fontWeight: 700, color: B.pinkDark, marginBottom: 4 }}>Timing Recommendation</div>
      <div style={{ fontSize: 13, fontFamily: font.body, color: B.slate, lineHeight: 1.7 }}>Concentrate paid media and promotional budgets in the Oct–Dec window to capitalize on proven demand. Q4 builds steadily through the holiday season. Use the Jun–Aug quieter period for brand-building content and loyalty program engagement.</div>
    </div>

    <Divider />

    {/* Device Profile */}
    <SectionTitle badge="Audience Profile" title="Mobile-First Business" subtitle="60.7% of BAM's audience accesses the website on mobile — consistent with beauty industry benchmarks (60–75%). Cross-device users discover on mobile, then return on desktop to book." />

    <div style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
      {[
        { label: "Mobile-Only", pct: "45.9%", w: 45.9, note: "Largest segment — mobile UX is critical", color: B.pink },
        { label: "Desktop-Only", pct: "39.3%", w: 39.3, note: "Research & booking on larger screens", color: B.pinkDark },
        { label: "Cross-Device", pct: "14.8%", w: 14.8, note: "Discover on mobile → book on desktop", color: B.pinkLight },
      ].map((d, i) => (
        <div key={i} style={{ flex: "1 1 180px", background: B.petal, borderRadius: 16, padding: "24px 20px" }}>
          <div style={{ fontSize: 28, fontFamily: font.display, fontWeight: 700, color: B.black }}>{d.pct}</div>
          <div style={{ fontSize: 12, fontFamily: font.body, fontWeight: 700, color: B.charcoal, marginTop: 4, marginBottom: 8 }}>{d.label}</div>
          <div style={{ height: 6, borderRadius: 3, background: B.mist, overflow: "hidden", marginBottom: 10 }}>
            <div style={{ width: `${d.w}%`, height: "100%", background: d.color, borderRadius: 3 }} />
          </div>
          <div style={{ fontSize: 11, fontFamily: font.body, color: B.slate, lineHeight: 1.5 }}>{d.note}</div>
        </div>
      ))}
    </div>

    <div style={{ borderLeft: `3px solid ${B.pink}`, paddingLeft: 20, marginBottom: 40 }}>
      <div style={{ fontSize: 13, fontFamily: font.body, fontWeight: 700, color: B.pinkDark, marginBottom: 4 }}>Key Insight</div>
      <div style={{ fontSize: 13, fontFamily: font.body, color: B.slate, lineHeight: 1.7 }}>Every digital touchpoint — website, booking flow, email, landing pages — must be designed mobile-first. Desktop should be treated as a secondary experience optimized for detailed research, group bookings, and membership comparison.</div>
    </div>

    <Divider />

    {/* Channel Mix */}
    <SectionTitle badge="Channel Analysis" title="Social Media Is the #1 Engine" subtitle="Blended channel analysis (desktop + mobile) reveals social media at 34.0% — nearly double what desktop-only data shows (17.0%). This is overwhelmingly Instagram-driven mobile traffic." />

    <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 32 }}>
      {[
        { ch: "Social Media", desk: "17.0%", blend: "34.0%", w: "34%", note: "#1 channel — Instagram Reels, Stories, link-in-bio", status: "star" },
        { ch: "Direct", desk: "43.6%", blend: "29.4%", w: "29.4%", note: "Strong brand recognition + word-of-mouth + dark social", status: "strength" },
        { ch: "Organic Search", desk: "25.9%", blend: "23.6%", w: "23.6%", note: "Solid SEO for local beauty queries", status: "strength" },
        { ch: "Paid Search", desk: "6.8%", blend: "6.0%", w: "6%", note: "Modest investment — room to scale in peak seasons", status: "neutral" },
        { ch: "Referrals", desk: "5.5%", blend: "5.8%", w: "5.8%", note: "Underperforming vs. partnership potential — biggest gap", status: "warning" },
        { ch: "Email", desk: "~1%", blend: "~1%", w: "2%", note: "Near-zero — no email marketing program exists", status: "warning" },
      ].map((c, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 0", borderBottom: `1px solid ${B.mist}` }}>
          <div style={{ flex: "0 0 110px", fontSize: 12, fontFamily: font.body, fontWeight: 700, color: B.charcoal }}>{c.ch}</div>
          <div style={{ flex: 1 }}>
            <div style={{ height: 8, borderRadius: 4, background: B.mist, overflow: "hidden" }}>
              <div style={{ width: c.w, height: "100%", borderRadius: 4, background: c.status === "star" ? `linear-gradient(90deg, ${B.pink}, ${B.pinkDark})` : c.status === "strength" ? B.pink : c.status === "warning" ? "#d4a" : B.pinkLight }} />
            </div>
          </div>
          <div style={{ flex: "0 0 90px", display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <div style={{ fontSize: 10, fontFamily: font.body, color: B.silver }}>{c.desk}</div>
            <div style={{ fontSize: 10, fontFamily: font.body, color: B.charcoal, fontWeight: 800 }}>→ {c.blend}</div>
          </div>
          <div style={{ flex: "0 0 220px", fontSize: 11, fontFamily: font.body, color: B.slate }}>{c.note}</div>
        </div>
      ))}
    </div>

    <div style={{ fontSize: 10, fontFamily: font.body, color: B.silver, textAlign: "right", marginBottom: 32 }}>Left: Desktop-only % → Right: Blended (Desktop + Mobile) %</div>

    {/* Channel Deep-Dives */}
    <div style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
      <div style={{ flex: "1 1 280px", background: `linear-gradient(135deg, ${B.black}, #2a2218)`, borderRadius: 16, padding: "24px" }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginBottom: 10, ...goldGrad }}>Social Media · 34.0%</div>
        <div style={{ fontSize: 13, fontFamily: font.body, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>The dominant acquisition channel. Gap between desktop (17%) and blended (34%) confirms traffic is overwhelmingly mobile Instagram — Stories, Reels, and link-in-bio taps. 11K+ followers represent a substantial owned audience.</div>
      </div>
      <div style={{ flex: "1 1 280px", background: `linear-gradient(135deg, ${B.black}, #2a2218)`, borderRadius: 16, padding: "24px" }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginBottom: 10, ...goldGrad }}>Direct · 29.4%</div>
        <div style={{ fontSize: 13, fontFamily: font.body, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>Healthy brand recognition — users type bambeautybar.com directly. Includes "dark social" from private messages, texts, and social shares where referral source is stripped. Reflects loyalty of existing customer base.</div>
      </div>
      <div style={{ flex: "1 1 280px", background: `linear-gradient(135deg, ${B.black}, #2a2218)`, borderRadius: 16, padding: "24px" }}>
        <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginBottom: 10, ...goldGrad }}>Referrals · 5.8%</div>
        <div style={{ fontSize: 13, fontFamily: font.body, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>The largest untapped growth opportunity. DFW has a rich ecosystem of wedding directories, local publications, venue partners, and beauty aggregators that BAM is not fully leveraging. Priority area for expansion.</div>
      </div>
    </div>

    <Divider />

    {/* Competitive Landscape */}
    <SectionTitle badge="Competitive Landscape" title="BAM Commands DFW Digitally" subtitle="Both Drybar and Blo Blow Dry Bar fell below SimilarWeb's measurement threshold for DFW-specific digital traffic — confirming BAM's commanding local advantage." />

    <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
      {[
        { name: "BAM Beauty Bar", status: "DFW Leader", visits: "~1,156/mo", color: B.pink, note: "3 DFW locations · Local authenticity · 34% social engine" },
        { name: "Drybar DFW", status: "Below Threshold", visits: "<5K total", color: B.mist, note: "5-6 locations · National brand recall · No local digital edge" },
        { name: "Blo Blow Dry Bar", status: "Below Threshold", visits: "<5K total", color: B.mist, note: "Franchise model · Relies on aggregators & foot traffic" },
      ].map((comp, i) => (
        <div key={i} style={{ flex: "1 1 200px", borderRadius: 16, padding: "28px 24px", background: i === 0 ? `linear-gradient(135deg, ${B.black}, #2a2218)` : B.snow, border: i === 0 ? "none" : `1px solid ${B.mist}` }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginBottom: 8, color: i === 0 ? B.pink : B.silver }}>{comp.status}</div>
          <div style={{ fontSize: 18, fontFamily: font.display, fontWeight: 700, color: i === 0 ? B.white : B.charcoal, marginBottom: 6 }}>{comp.name}</div>
          <div style={{ fontSize: 22, fontFamily: font.display, fontWeight: 700, color: i === 0 ? B.pink : B.silver, marginBottom: 8 }}>{comp.visits}</div>
          <div style={{ fontSize: 11, fontFamily: font.body, color: i === 0 ? "rgba(255,255,255,0.5)" : B.silver, lineHeight: 1.5 }}>{comp.note}</div>
        </div>
      ))}
    </div>

    <div style={{ borderLeft: `3px solid ${B.pink}`, paddingLeft: 20 }}>
      <div style={{ fontSize: 13, fontFamily: font.body, fontWeight: 700, color: B.pinkDark, marginBottom: 4 }}>Competitive Advantage</div>
      <div style={{ fontSize: 13, fontFamily: font.body, color: B.slate, lineHeight: 1.7 }}>BAM's edge comes from local authenticity, a 34% social media channel share competitors haven't matched, and multi-location geographic coverage across Dallas and Fort Worth. The position is strong but must be defended aggressively — as national chains increase digital investment, the window to establish a durable lead is now.</div>
    </div>
  </div>
  );
};

// ═══════════════════════════════════════════════════════════
// TAB: GROWTH STRATEGY
// ═══════════════════════════════════════════════════════════
const GrowthTab = () => (
  <div>
    <SectionTitle badge="Strategic Priorities" title="Amplify, Dominate, Expand" subtitle="Five growth priorities ranked by expected impact and alignment with BAM's proven strengths — from amplifying the social media engine to building an email marketing program." />

    {/* Top 3 Opportunities */}
    <div style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
      {[
        { n: "01", title: "Amplify Social Media", roi: "Very High", desc: "Social is already the #1 channel at 34%. The imperative: maximize ROI from what's already working. Identify which platform (Instagram, TikTok, Facebook) drives the majority and double down.", actions: ["Platform deep-dive: isolate top performer", "Content format analysis (Reels vs Stories vs UGC)", "Increase paid social for peak seasons (Oct–Dec, Apr–May)", "Optimize link-in-bio → mobile booking page"] },
        { n: "02", title: "Dominate Mobile Local Search", roi: "High", desc: "60.7% of the audience is mobile. Capturing 'near me' searches is critical — these are high-intent, geographically proximate users ready to book.", actions: ["Optimize Google Business Profiles for both locations", "'Near me' keyword strategy + location landing pages", "Fort Worth Clearfork dedicated SEO push", "Target: 'best blowout near me', 'blow dry bar Dallas'"] },
        { n: "03", title: "Expand Referral & Partnerships", roi: "High", desc: "Referrals at 5.8% are significantly below opportunity. The DFW market has a rich ecosystem of wedding directories, publications, and venue partners that BAM isn't fully leveraging.", actions: ["WeddingWire + The Knot profiles (immediate)", "D Weddings directory listing + editorial pitch", "Legacy West & Clearfork mall cross-promos", "Wedding planner referral program (90 days)"] },
      ].map((opp, i) => (
        <div key={i} style={{ flex: "1 1 250px", background: B.petal, borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ fontSize: 36, fontFamily: font.display, fontWeight: 700, fontStyle: "italic", ...goldGrad }}>{opp.n}</div>
            <Badge>{`ROI: ${opp.roi}`}</Badge>
          </div>
          <div style={{ fontSize: 18, fontFamily: font.display, fontWeight: 700, color: B.black, marginBottom: 10 }}>{opp.title}</div>
          <div style={{ fontSize: 12, fontFamily: font.body, color: B.slate, lineHeight: 1.7, marginBottom: 16 }}>{opp.desc}</div>
          <div style={{ marginTop: "auto" }}>
            {opp.actions.map((a, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: j === 0 ? `1px solid ${B.mist}` : "none", borderBottom: `1px solid ${B.mist}` }}>
                <div style={{ width: 5, height: 5, borderRadius: 3, background: B.pink, flexShrink: 0 }} />
                <div style={{ fontSize: 11, fontFamily: font.body, color: B.charcoal }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Priorities 4 & 5 */}
    <div style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
      {[
        { n: "04", title: "Build Email Marketing Engine", roi: "Med-High", desc: "Email is near-zero as a traffic driver. For a membership-based business, this is a significant missed opportunity — the existing member base is a warm audience for recurring engagement.", actions: ["Monthly newsletter: seasonal promos + loyalty rewards", "Automated booking reminders + re-engagement sequences", "Email → app downloads to close acquisition-retention loop"] },
        { n: "05", title: "Drive Mobile App Adoption", roi: "Med-High", desc: "Converting 60.7% mobile web users into app users is the key to long-term loyalty. An app provides a direct, owned communication channel and increases booking frequency.", actions: ["Smart banners on mobile website → app download", "App-exclusive incentives: first-booking discount, loyalty multiplier", "Strategic push notifications for lapsed customers"] },
      ].map((opp, i) => (
        <div key={i} style={{ flex: "1 1 300px", background: B.snow, borderRadius: 16, padding: "28px 24px", border: `1px solid ${B.mist}`, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div style={{ fontSize: 36, fontFamily: font.display, fontWeight: 700, fontStyle: "italic", ...goldGrad }}>{opp.n}</div>
            <Badge variant="neutral">{`ROI: ${opp.roi}`}</Badge>
          </div>
          <div style={{ fontSize: 18, fontFamily: font.display, fontWeight: 700, color: B.black, marginBottom: 10 }}>{opp.title}</div>
          <div style={{ fontSize: 12, fontFamily: font.body, color: B.slate, lineHeight: 1.7, marginBottom: 16 }}>{opp.desc}</div>
          <div style={{ marginTop: "auto" }}>
            {opp.actions.map((a, j) => (
              <div key={j} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: j === 0 ? `1px solid ${B.mist}` : "none", borderBottom: `1px solid ${B.mist}` }}>
                <div style={{ width: 5, height: 5, borderRadius: 3, background: B.silver, flexShrink: 0 }} />
                <div style={{ fontSize: 11, fontFamily: font.body, color: B.charcoal }}>{a}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <Divider />

    {/* Referral Tier Breakdown */}
    <SectionTitle badge="Deep Dive" title="Referral & Partnership Roadmap" subtitle="A tiered execution plan for expanding the 5.8% referral channel — from immediate directory listings to 90-day partnership programs." />

    <div style={{ display: "flex", gap: 16, marginBottom: 40, flexWrap: "wrap" }}>
      {[
        { tier: "Tier 1 · Immediate", color: "#2e7d32", bg: "#e8f5e9", items: [
          { name: "WeddingWire", note: "Competitor FW Blow Dry Bar is listed — BAM is absent" },
          { name: "The Knot", note: "High-intent brides actively searching for vendors" },
          { name: "D Weddings", note: "Premier DFW bridal publication — listing + editorial" },
        ]},
        { tier: "Tier 2 · 30 Days", color: "#f57f17", bg: "#fff8e1", items: [
          { name: "Fort Worth Magazine", note: "New-business feature on Clearfork location" },
          { name: "D Magazine / CultureMap", note: "Lifestyle editorial outreach" },
          { name: "Clearfork & Legacy West", note: "Tenant directories + cross-promo newsletters" },
        ]},
        { tier: "Tier 3 · 90 Days", color: "#c62828", bg: "#fce4ec", items: [
          { name: "Wedding Planner Program", note: "Commission or reciprocal referral with top DFW planners" },
          { name: "ClassPass & Aggregators", note: "Competitors listed — BAM is not" },
          { name: "TCU & SMU Partnerships", note: "Sorority formals, graduation, campus ambassadors" },
        ]},
      ].map((t, i) => (
        <div key={i} style={{ flex: "1 1 220px", background: t.bg, borderRadius: 16, padding: "24px" }}>
          <div style={{ fontSize: 10, letterSpacing: 2, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, color: t.color, marginBottom: 16 }}>{t.tier}</div>
          {t.items.map((item, j) => (
            <div key={j} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontFamily: font.body, fontWeight: 700, color: B.charcoal }}>{item.name}</div>
              <div style={{ fontSize: 11, fontFamily: font.body, color: B.slate, lineHeight: 1.5 }}>{item.note}</div>
            </div>
          ))}
        </div>
      ))}
    </div>

    <Divider />

    {/* Action Timeline */}
    <SectionTitle badge="Execution Plan" title="Priority Action Timeline" subtitle="Ranked by expected impact and timeline — from immediate quick wins to ongoing optimization." />

    <div style={{ display: "flex", flexDirection: "column", gap: 3, marginBottom: 32 }}>
      {[
        { n: "1", action: "Social media audit: identify top platform, content format, and conversion paths", time: "Immediate", impact: "Very High" },
        { n: "2", action: "Secure WeddingWire, The Knot, and D Weddings listings", time: "This month", impact: "High" },
        { n: "3", action: "Optimize Google Business Profiles for both locations", time: "This month", impact: "High" },
        { n: "4", action: "Launch Fort Worth local SEO campaign", time: "30 days", impact: "High" },
        { n: "5", action: "Develop email marketing program for membership base", time: "30 days", impact: "Med-High" },
        { n: "6", action: "Design and launch mobile app adoption campaign", time: "60 days", impact: "Med-High" },
        { n: "7", action: "Build wedding planner referral program + university partnerships", time: "90 days", impact: "Medium" },
        { n: "8", action: "Scale paid search around Oct–Dec and Apr–May peak windows", time: "Ongoing", impact: "Medium" },
      ].map((a, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: `1px solid ${B.mist}` }}>
          <div style={{ flex: "0 0 32px", fontSize: 18, fontFamily: font.display, fontWeight: 700, fontStyle: "italic", textAlign: "center", ...goldGrad }}>{a.n}</div>
          <div style={{ flex: 1, fontSize: 13, fontFamily: font.body, color: B.charcoal, lineHeight: 1.5 }}>{a.action}</div>
          <div style={{ flex: "0 0 90px", fontSize: 10, fontFamily: font.body, fontWeight: 700, color: B.pinkDark, letterSpacing: 0.5, textAlign: "right" }}>{a.time}</div>
          <Badge variant={a.impact.includes("High") || a.impact.includes("Very") ? "primary" : "neutral"}>{a.impact}</Badge>
        </div>
      ))}
    </div>

    {/* Closing */}
    <div style={{ borderLeft: `3px solid ${B.pink}`, paddingLeft: 20 }}>
      <div style={{ fontSize: 13, fontFamily: font.body, fontWeight: 700, color: B.pinkDark, marginBottom: 4 }}>The Opportunity</div>
      <div style={{ fontSize: 13, fontFamily: font.body, color: B.slate, lineHeight: 1.7 }}>BAM Beauty Bar has built something most local businesses never achieve: a digital presence that outperforms national competitors. The strategic path forward is to amplify proven strengths — social media and local search — while addressing clear gaps in referrals and email. The window to establish a durable lead is now.</div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════
export default function BAMCROStrategy() {
  const [activeTab, setActiveTab] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const check = () => {
      if (navRef.current) {
        setCollapsed(navRef.current.parentElement.offsetWidth < 680);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />;
      case "intel": return <IntelTab />;
      case "growth": return <GrowthTab />;
      case "page": return <PageTab />;
      case "popup": return <PopupTab />;
      case "form": return <FormTab />;
      case "signup": return <SignupTab />;
      case "onboarding": return <OnboardingTab />;
      case "paywall": return <PaywallTab />;
      default: return <OverviewTab />;
    }
  };

  const activeLabel = tabs.find(t => t.id === activeTab)?.label || "Strategy";

  return (
    <div style={{ fontFamily: font.body, background: B.white, minHeight: "100vh", color: B.black }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400;1,500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700&family=Nunito+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: "28px 32px", borderBottom: `1px solid ${B.mist}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: B.white,
      }}>
        <div>
          <div style={{ fontFamily: font.display, fontSize: 28, color: B.black, fontWeight: 700, letterSpacing: 3 }}>BAM</div>
          <div style={{ fontSize: 9, letterSpacing: 3, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, marginTop: 2, ...goldGrad }}>Market Intelligence + CRO</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: B.silver, fontFamily: font.body, fontWeight: 600 }}>February 2026</div>
          <div style={{ fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: B.silver, fontFamily: font.body, fontWeight: 600, marginTop: 3 }}>9 Modules</div>
        </div>
      </div>

      {/* Tab Nav */}
      <div ref={navRef} style={{ position: "relative", borderBottom: `1px solid ${B.mist}`, background: B.snow }}>
        {!collapsed ? (
          <div style={{ display: "flex", gap: 0, padding: "0 16px" }}>
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                flex: "1 1 0%", padding: "16px 6px", border: "none", cursor: "pointer",
                background: "transparent", fontFamily: font.body, fontSize: 10,
                letterSpacing: 1, textTransform: "uppercase", fontWeight: 700,
                color: activeTab === tab.id ? B.pink : B.silver,
                borderBottom: activeTab === tab.id ? `2px solid ${B.pink}` : "2px solid transparent",
                transition: "all 0.3s", whiteSpace: "nowrap", textAlign: "center",
                minWidth: 0,
              }}>
                <span style={{ marginRight: 4, fontSize: 7, opacity: 0.5 }}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px" }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontFamily: font.body, fontWeight: 700, color: B.pink }}>
                <span style={{ marginRight: 6, fontSize: 7, opacity: 0.5 }}>◆</span>{activeLabel}
              </div>
              <button onClick={() => setMenuOpen(!menuOpen)} style={{
                background: "none", border: "none", cursor: "pointer", padding: "6px",
                display: "flex", flexDirection: "column", gap: 4, alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ width: 20, height: 2, background: menuOpen ? B.pink : B.silver, borderRadius: 1, transition: "all 0.2s" }} />
                <div style={{ width: 20, height: 2, background: menuOpen ? B.pink : B.silver, borderRadius: 1, transition: "all 0.2s" }} />
                <div style={{ width: 20, height: 2, background: menuOpen ? B.pink : B.silver, borderRadius: 1, transition: "all 0.2s" }} />
              </button>
            </div>
            {menuOpen && (
              <div style={{ borderTop: `1px solid ${B.mist}`, padding: "8px 0" }}>
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }} style={{
                    display: "block", width: "100%", padding: "12px 24px", border: "none", cursor: "pointer",
                    background: activeTab === tab.id ? B.petal : "transparent",
                    fontFamily: font.body, fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase",
                    fontWeight: 700, color: activeTab === tab.id ? B.pink : B.silver,
                    textAlign: "left", transition: "all 0.2s",
                    borderLeft: activeTab === tab.id ? `3px solid ${B.pink}` : "3px solid transparent",
                  }}>
                    <span style={{ marginRight: 8, fontSize: 7, opacity: 0.5 }}>◆</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "44px 32px 80px" }}>
        {renderTab()}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: `1px solid ${B.mist}`, padding: "24px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: B.white, flexWrap: "wrap", gap: 8,
      }}>
        <div style={{ fontSize: 10, fontFamily: font.body, letterSpacing: 2, fontWeight: 700, ...goldGrad }}>
          BAM BEAUTY BAR · MARKET INTELLIGENCE + CRO · 9 MODULES
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, opacity: 0.5, ...goldGrad }}>—</span>
          <span style={{ fontSize: 17, color: B.silver, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 300, letterSpacing: 1 }}>
            Built with intention & care for
          </span>
          <span style={{ fontSize: 19, fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: "italic", fontWeight: 500, letterSpacing: 1.5, ...goldGrad }}>
            BAM Beauty Bar
          </span>
          <span style={{ fontSize: 14, opacity: 0.5, ...goldGrad }}>—</span>
        </div>
      </div>
    </div>
  );
}
