import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import GOCLogo from "../../imports/GOC-Logo.png";
import {
  Trophy, Zap, Users, TrendingUp, Star, Target, Award, BarChart3,
  DollarSign, Shield, Menu, X, Check, ArrowRight, Sparkles,
  Crown, Rocket, Globe, Play, ChevronRight, Lock,
  Instagram, Youtube, Twitter, Facebook, Linkedin,
  ArrowUpRight, Flame, Eye, Share2,
  CheckCircle2, Lightbulb, Briefcase, Megaphone, Tv, Camera,
  Smartphone, Building, CreditCard,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const ICE = "#d1f8ff";          // accent ice blue
const ICE_DIM = "rgba(209,248,255,0.2)";  // section tint
const BLK = "#000000";          // primary black
const BORDER = "rgba(0,0,0,0.08)";

// ─── Shared: Badge pill ────────────────────────────────────────────────────────
function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6"
      style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.1)` }}>
      <span className="text-black/60">{icon}</span>
      <span className="text-xs font-bold uppercase tracking-widest text-black/70"
        style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</span>
    </div>
  );
}

// ─── Shared: Section grid ─────────────────────────────────────────────────────
function GridBg({ opacity = 0.06 }: { opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`grid-${Math.random()}`} width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke={`rgba(0,0,0,${opacity})`} strokeWidth="1" />
        </pattern>
        <radialGradient id="grid-mask" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-fade">
          <rect width="100%" height="100%" fill="url(#grid-mask)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${Math.random()})`} mask="url(#grid-fade)" />
    </svg>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${BORDER}` : "none",
      }}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group focus:outline-none">
          <img src={GOCLogo} alt="Game of Creators"
            className="transition-all duration-200 group-hover:opacity-90"
            style={{ height: 36, width: "auto", filter: "brightness(0)", cursor: "pointer" }} />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "How It Works", href: "/" },
            { label: "Creators", href: "/creators" },
            { label: "Brands", href: "/brands" },
            { label: "Campaigns", href: "/campaigns" },
            { label: "Blog", href: "/" }
          ].map((item) => (
            <Link key={item.label} to={item.href}
              className="text-sm font-medium relative group"
              style={{ color: item.label === "Creators" ? BLK : "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = BLK)}
              onMouseLeave={(e) => (e.currentTarget.style.color = item.label === "Creators" ? BLK : "rgba(0,0,0,0.6)")}>
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                style={{ background: BLK }} />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="btn-secondary-dark px-5 py-2 text-sm rounded-full">Login</button>
          <button className="btn-primary-gradient px-5 py-2 text-sm rounded-full">Start Creating</button>
        </div>

        <button className="md:hidden text-black" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(209,248,255,0.98)", borderTop: `1px solid ${BORDER}` }}>
          {[
            { label: "How It Works", href: "/" },
            { label: "Creators", href: "/creators" },
            { label: "Brands", href: "/brands" },
            { label: "Campaigns", href: "/campaigns" },
            { label: "Blog", href: "/" }
          ].map((item) => (
            <Link key={item.label} to={item.href} onClick={() => setMobileOpen(false)}
              className="text-sm text-black/70 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              {item.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2">
            <button className="btn-secondary-dark flex-1 py-2.5 text-sm rounded-full">Login</button>
            <button className="btn-primary-gradient flex-1 py-2.5 text-sm rounded-full">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
}

// ─── Visual Helpers for Cards ─────────────────────────────────────────────────
function WhyCreatorVisual({ step }: { step: number }) {
  if (step === 0) {
    // Follower-Free Entry
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[220px] rounded-xl border bg-white p-3 shadow-sm" style={{ borderColor: BORDER }}>
          <span className="text-[8px] font-black uppercase text-black/40 block mb-2">Creator Engagement Yield</span>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[7px] font-bold text-black/60 mb-0.5">
                <span>@micro_creator (2.1K followers)</span>
                <span className="text-black font-extrabold">9.4% ER</span>
              </div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-black rounded-full" style={{ width: "94%" }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[7px] font-semibold text-black/45 mb-0.5">
                <span>@mega_celeb (1.4M followers)</span>
                <span className="text-black/50">1.2% ER</span>
              </div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                <div className="h-full bg-black/30 rounded-full" style={{ width: "12%" }} />
              </div>
            </div>
          </div>
          <p className="text-[7px] text-center text-black/40 italic mt-2.5">Followers do not define payouts. Performance does.</p>
        </div>
      </div>
    );
  }
  if (step === 1) {
    // Fair Performance-Based Rankings
    return (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="w-full max-w-[200px] bg-white rounded-xl border p-3 shadow-sm" style={{ borderColor: BORDER }}>
          <div className="flex items-center justify-between mb-2 pb-1 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <span className="text-[8px] font-black uppercase text-black/40">Verified Payout Audit</span>
            <span className="text-[8px] font-bold text-green-600">✓ API Verified</span>
          </div>
          <div className="space-y-1.5 text-[9px]">
            <div className="flex justify-between font-bold">
              <span className="text-black">Rank #1: @fitbyfiona</span>
              <span className="text-black font-black">$1,750</span>
            </div>
            <div className="flex justify-between text-black/55">
              <span>views: 184K · score: 98</span>
              <span className="font-semibold text-black/70">🥇 winner</span>
            </div>
            <div className="h-1 bg-black/5 rounded-full overflow-hidden">
              <div className="h-full bg-black rounded-full" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  // Escrow Secured Payouts
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-[200px] rounded-xl border bg-white p-3 shadow-sm relative overflow-hidden" style={{ borderColor: BORDER }}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center text-white">
            <Lock size={10} className="text-[#d1f8ff]" />
          </div>
          <span className="text-[9px] font-black text-black uppercase tracking-wide">Escrow Protected</span>
        </div>
        <div className="space-y-1 text-[8px] text-black/60">
          <div className="flex items-center gap-1">
            <Check size={8} className="text-black" strokeWidth={3} />
            <span>Prizes deposited upfront by brands</span>
          </div>
          <div className="flex items-center gap-1">
            <Check size={8} className="text-black" strokeWidth={3} />
            <span>Automated release upon ranking audit</span>
          </div>
          <div className="flex items-center gap-1">
            <Check size={8} className="text-black" strokeWidth={3} />
            <span>Fast direct bank/PayPal transfer</span>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t flex justify-between items-center" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <span className="text-[7px] text-black/40 font-bold uppercase">Status</span>
          <span className="text-[8px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded">✓ Vault Secured</span>
        </div>
      </div>
    </div>
  );
}

function HowCreatorWorksVisual({ step }: { step: number }) {
  if (step === 0) {
    // Browse Active Challenges
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[220px] rounded-xl border bg-white p-3 shadow-sm" style={{ borderColor: BORDER }}>
          <span className="text-[8px] font-black uppercase text-black/40 block mb-2">Open Creator Challenges</span>
          <div className="space-y-1.5">
            {[
              { brand: "NovaSport Flex", prize: "$5,000", type: "Activewear" },
              { brand: "Lumina Glow serum", prize: "$3,800", type: "Skincare" }
            ].map((c) => (
              <div key={c.brand} className="flex items-center justify-between text-[9px] p-1.5 rounded border" style={{ background: "#fafafa", borderColor: BORDER }}>
                <div>
                  <p className="font-bold text-black">{c.brand}</p>
                  <p className="text-[7px] text-black/40">{c.type}</p>
                </div>
                <div className="text-right">
                  <p className="font-black text-black">{c.prize}</p>
                  <p className="text-[6px] text-green-600 font-bold">Participate →</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (step === 1) {
    // Create & Submit
    return (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="w-full max-w-[200px] rounded-xl border bg-white p-3 shadow-sm relative overflow-hidden" style={{ borderColor: BORDER }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8px] font-black uppercase text-black/40">Upload Wizard</span>
            <span className="text-[8px] font-bold text-black/50 animate-pulse">Processing...</span>
          </div>
          <div className="flex gap-2 items-center bg-black/5 p-2 rounded-lg mb-2">
            <div className="w-7 h-9 bg-black/10 rounded flex items-center justify-center relative overflow-hidden">
              <Camera size={12} className="text-black/30" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-bold text-black truncate">GOC_UGC_SKINCARE.mp4</p>
              <p className="text-[6px] text-black/45">Filesize: 24.2 MB</p>
            </div>
          </div>
          <div className="h-1 bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full" style={{ width: "84%" }} />
          </div>
          <div className="flex justify-between items-center text-[7px] text-black/40 mt-1.5">
            <span>Uploading content: 84%</span>
            <span>Est. 4s left</span>
          </div>
        </div>
      </div>
    );
  }
  // Cash Out Payout
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-[180px] bg-white border rounded-xl p-3 shadow-sm text-center" style={{ borderColor: BORDER }}>
        <p className="text-[8px] text-black/40 uppercase font-black mb-1">Creator Wallet Balance</p>
        <p className="text-2xl font-black text-black mb-2.5">$1,500.00</p>
        <button className="w-full bg-black hover:bg-neutral-800 text-white text-[9px] font-black py-2 rounded-lg cursor-pointer transition-colors shadow-xs">
          Cash Out to Bank
        </button>
        <div className="flex items-center justify-center gap-1 mt-2 text-[7px] text-black/40 font-semibold">
          <CheckCircle2 size={8} className="text-green-500" />
          <span>Payout completed within 2 hours</span>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function CreatorHero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(".hero-badge", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .fromTo(".hero-h1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.3")
        .fromTo(".hero-sub", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(".hero-ctas", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(".hero-stats", { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "power3.out" }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      style={{ background: "#ffffff" }}>

      <GridBg opacity={0.04} />

      {/* Glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ICE} 0%, rgba(255,255,255,0) 70%)`, opacity: 0.35, filter: "blur(40px)" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-8"
          style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.08)` }}>
          <span className="flex items-center justify-center w-5 h-5 rounded-full text-black"
            style={{ background: ICE, boxShadow: "0 0 8px rgba(209,248,255,0.8)" }}>
            <Flame size={11} className="fill-current" />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-black/70"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Democratizing Creator Earnings
          </span>
        </div>

        {/* Headline */}
        <h1 ref={headRef} className="hero-h1 text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight"
          style={{ color: BLK, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Earn Based on Your Creativity,<br />
          <span className="relative">
            Not Your{" "}
            <span className="relative inline-block">
              Followers
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" style={{ height: 8 }}>
                <path d="M0,6 C50,0 150,12 200,6" stroke={ICE} strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(0,0,0,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
          Zero follower requirements. Choose from open campaigns, submit your video according to the brief,
          and earn direct, escrow-protected rewards based on real content performance.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="btn-primary-gradient flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base">
            Browse Active Briefs <ArrowRight size={18} />
          </button>
          <button className="btn-secondary-dark flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-base">
            <Play size={16} className="fill-current" />
            Watch Creator Guide
          </button>
        </div>

        {/* Stats bar */}
        <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { val: "0", label: "Follower Minimums" },
            { val: "$2.1M+", label: "Total Prizes Disbursed" },
            { val: "200+", label: "Open Daily Campaigns" },
            { val: "24 Hours", label: "Average Cash Out Time" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl px-4 py-5 text-center"
              style={{ background: "#ffffff", border: `1px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <p className="text-2xl font-extrabold text-black mb-1"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{stat.val}</p>
              <p className="text-xs text-black/50 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust Bar Marquee ────────────────────────────────────────────────────────
const BRANDS = [
  { name: "NovaSport", icon: <Zap size={14} /> },
  { name: "Lumina", icon: <Sparkles size={14} /> },
  { name: "Brewlabs", icon: <Star size={14} /> },
  { name: "PixelApp", icon: <Target size={14} /> },
  { name: "DriftCo", icon: <TrendingUp size={14} /> },
  { name: "OakWear", icon: <Globe size={14} /> },
  { name: "FlareMob", icon: <Flame size={14} /> },
  { name: "StellarFX", icon: <Award size={14} /> },
];

function TrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalW = track.scrollWidth / 2;
    const tween = gsap.to(track, {
      x: `-=${totalW}`, duration: 22, ease: "none", repeat: -1,
      modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % totalW) },
    });
    return () => tween.kill();
  }, []);

  return (
    <div className="py-10 border-y overflow-hidden" style={{ background: ICE_DIM, borderColor: BORDER }}>
      <p className="text-center mb-6 text-xs font-semibold tracking-[0.22em] uppercase"
        style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
        Earn by creating for top brands
      </p>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${ICE_DIM.replace("0.2", "1")} 0%, ${ICE_DIM.replace("0.2", "0")} 100%)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${ICE_DIM.replace("0.2", "1")} 0%, ${ICE_DIM.replace("0.2", "0")} 100%)` }} />
        <div ref={trackRef} className="flex items-center" style={{ width: "max-content" }}>
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} className="flex items-center gap-2.5 cursor-pointer transition-all duration-300 select-none"
              style={{ padding: "6px 32px" }}>
              {i > 0 && <span className="w-1 h-1 rounded-full mr-6 flex-shrink-0" style={{ background: "rgba(0,0,0,0.15)", marginLeft: -24 }} />}
              <span className="text-black/30">{brand.icon}</span>
              <span className="font-bold tracking-[0.15em] uppercase text-sm text-black/35 whitespace-nowrap"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Why GOC (Creators) ────────────────────────────────────────────────────────
function WhyGOC() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".why-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const reasons = [
    {
      icon: <Users size={20} />,
      title: "Follower-Free Arena",
      desc: "No follower checklists, no brand audits of your follower counts. Only the sheer quality and performance of your content matters on GOC.",
      highlight: "0 Follower Minimum",
    },
    {
      icon: <TrendingUp size={20} />,
      title: "Fair Merit Payouts",
      desc: "Our API auditing ranks submissions directly by true social engagement metrics. Produce content that gets reactions and get rewarded fairly.",
      highlight: "Engagement Ranked Rewards",
    },
    {
      icon: <Shield size={20} />,
      title: "Upfront Escrow Protection",
      desc: "Brands deposit campaign prize pools in GOC escrow before brief publishing. Payouts release automatically, safe from negotiation delays.",
      highlight: "Escrow Secured Funds",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Trophy size={13} />} label="Creator Benefits" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Built for Content Creators
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            The old way required follower audits and negotiation. The GOC way pays you for your craft.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="why-card rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)";
              }}>
              <div className="relative h-40 w-full flex-shrink-0" style={{ background: ICE_DIM }}>
                <GridBg opacity={0.06} />
                <WhyCreatorVisual step={i} />
                <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
              </div>
              <div className="p-6 pt-2.5 flex-1 flex flex-col">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                  <span className="text-black">{r.icon}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full self-start"
                  style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/60">{r.highlight}</span>
                </div>
                <h3 className="text-xl font-extrabold text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/55 flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works (Creators) ──────────────────────────────────────────────────
function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".step-card", { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: "01",
      icon: <Target size={24} />,
      title: "Browse Challenge Briefs",
      desc: "Explore daily contests from top brands across skincare, fitness, lifestyle, food, and tech. Review platforms and creative checklist requirements.",
      detail: "Select contests matching your style and target the prize pools.",
    },
    {
      num: "02",
      icon: <Camera size={24} />,
      title: "Create & Submit Content",
      desc: "Film your vertical video following the brief criteria. Submit it through the GOC portal. We track view and engagement metrics automatically.",
      detail: "Your rank is determined by the reaction from real audiences.",
    },
    {
      num: "03",
      icon: <DollarSign size={24} />,
      title: "Rank & Cash Out Instantly",
      desc: "Payout is distributed instantly based on where your video ranks in the final leaderboard pool. Push funds directly to your local bank account.",
      detail: "Secure payment released within 24 hours of campaign completion.",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: ICE_DIM, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Zap size={13} />} label="Step-by-step Guide" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Three Steps to Get Paid
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Join contests, upload your content, and watch your earnings grow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="step-card rounded-2xl overflow-hidden relative flex flex-col group transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#ffffff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)", minHeight: 400 }}>
              
              <div className="relative h-44 w-full flex-shrink-0" style={{ background: ICE_DIM }}>
                <GridBg opacity={0.06} />
                <HowCreatorWorksVisual step={i} />
                <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
              </div>

              <div className="p-6 pt-2.5 flex-1 flex flex-col z-10 relative">
                <div className="absolute top-2 right-4 text-6xl font-extrabold pointer-events-none select-none"
                  style={{ color: "rgba(0,0,0,0.03)", fontFamily: "'Bricolage Grotesque', sans-serif", lineHeight: 1 }}>
                  {step.num}
                </div>

                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: ICE, border: `1px solid rgba(0,0,0,0.1)` }}>
                  <span className="text-black">{step.icon}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full self-start"
                  style={{ background: "rgba(0,0,0,0.05)", border: `1px solid rgba(0,0,0,0.06)` }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">Step {i + 1}</span>
                </div>

                <h3 className="text-xl font-extrabold text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/55 mb-4 flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {step.desc}
                </p>
                <div className="pt-4 border-t mt-auto" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <p className="text-xs text-black/40 italic" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-primary-gradient flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base mx-auto">
            Browse Live Campaigns <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Creator Earnings Estimator ───────────────────────────────────────────────
function CreatorEarningsEstimator() {
  const ref = useRef<HTMLDivElement>(null);
  const [budget, setBudget] = useState(5000);
  const [rank, setRank] = useState<"1st" | "top5" | "top15">("1st");

  // Payout distributions:
  // 1st Place = 35%
  // Top 5 split 40% = 8% each
  // Top 15 split 25% = 1.67% each
  let multiplier = 0.35;
  let rankLabel = "🥇 1st Place Winner";
  if (rank === "top5") {
    multiplier = 0.08;
    rankLabel = "🥈 Top 5 Pool (split 40%)";
  } else if (rank === "top15") {
    multiplier = 0.0167;
    rankLabel = "🥉 Top 15 Pool (split 25%)";
  }

  const estimatedPayout = Math.round(budget * multiplier);
  const viewsTarget = Math.round(budget * 280 * (multiplier / 0.35));

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<BarChart3 size={13} />} label="Reward Calculator" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Estimate Your Rewards
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Adjust the campaign size and rank triggers to see how much you could earn.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Controls */}
          <div className="rounded-2xl p-8" style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            <h3 className="text-lg font-extrabold text-black mb-8" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Configure Estimation Parameters
            </h3>

            <div className="space-y-8">
              {/* Prize Pool Budget */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs font-bold text-black/60 uppercase tracking-wide"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>Campaign Prize Pool</label>
                  <span className="text-2xl font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    ${budget.toLocaleString()}
                  </span>
                </div>
                <input type="range" min="1000" max="25000" step="500" value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, ${BLK} 0%, ${BLK} ${((budget - 1000) / 24000) * 100}%, rgba(0,0,0,0.12) ${((budget - 1000) / 24000) * 100}%, rgba(0,0,0,0.12) 100%)` }} />
                <div className="flex justify-between text-xs text-black/30 mt-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span>$1,000</span><span>$25,000</span>
                </div>
              </div>

              {/* Target Rank Selection */}
              <div>
                <label className="block text-xs font-bold text-black/60 uppercase tracking-wide mb-3"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>Target Campaign Ranking</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "1st", label: "🥇 1st Place" },
                    { id: "top5", label: "🥈 Top 5 Pool" },
                    { id: "top15", label: "🥉 Top 15 Pool" },
                  ].map((r) => (
                    <button key={r.id} onClick={() => setRank(r.id as any)}
                      className="py-2.5 px-2 rounded-xl text-xs font-bold border transition-all duration-300 cursor-pointer text-center"
                      style={{
                        background: rank === r.id ? ICE : "transparent",
                        borderColor: rank === r.id ? "rgba(0,0,0,0.15)" : BORDER,
                        color: rank === r.id ? BLK : "rgba(0,0,0,0.5)"
                      }}>
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payout note */}
              <div className="rounded-xl p-4" style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Rank Payout Ratio</p>
                <p className="text-xs text-black/60 leading-relaxed font-semibold">
                  Under GOC models, campaign pools are guaranteed and distributed entirely among ranking participants. {rank === "1st" ? "1st Place earns 35%." : rank === "top5" ? "Top 5 creators split 40% (8% each)." : "Top 15 creators split 25% (1.67% each)."}
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {[
              { label: "Estimated Payout", val: `$${estimatedPayout.toLocaleString()}`, icon: <DollarSign size={18} />, sub: `Based on your chosen outcome: ${rankLabel}` },
              { label: "Est. Views Target", val: viewsTarget.toLocaleString(), icon: <Eye size={18} />, sub: "Target view range to compete in this tier" },
              { label: "Total Competitors (avg.)", val: "42 participants", icon: <Users size={18} />, sub: "Average submission rate per campaign" },
              { label: "Earn rate", val: "100%", icon: <Check size={18} />, sub: "Escrow-protected prizes, zero payout default risk" },
            ].map((metric, i) => (
              <div key={i} className="rounded-2xl p-6 flex items-center gap-5"
                style={{ background: i === 0 ? BLK : "#fff", border: `1px solid ${i === 0 ? BLK : BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: i === 0 ? ICE : ICE_DIM }}>
                  <span style={{ color: BLK }}>{metric.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide mb-1"
                    style={{ color: i === 0 ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                    {metric.label}
                  </p>
                  <p className="text-3xl font-extrabold"
                    style={{ color: i === 0 ? "#fff" : BLK, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {metric.val}
                  </p>
                </div>
                <p className="text-[10px] text-right max-w-[110px] flex-shrink-0"
                  style={{ color: i === 0 ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
                  {metric.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Creator Bento Visuals ──────────────────────────────────────────────────
function CreatorBentoVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[180px] rounded-xl border bg-white p-3 shadow-sm" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center text-[10px] font-bold text-black/60">👤</div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-black text-black truncate">@micro_creator</p>
              <p className="text-[7px] text-black/45">142 followers</p>
            </div>
          </div>
          <div className="bg-[#d1f8ff]/30 border border-[#d1f8ff]/60 rounded-lg p-2 text-center">
            <span className="text-[8px] font-bold text-black/60 uppercase tracking-wider block mb-0.5">Campaign Rank #1</span>
            <span className="text-xs font-black text-black">$1,750 Payout</span>
          </div>
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="absolute inset-0 flex flex-col justify-between p-3.5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[8px] font-bold text-black/40 uppercase">Your Content Performance</p>
            <p className="text-sm font-black text-black">284,500 <span className="text-[9px] font-medium text-black/50">views</span></p>
          </div>
          <span className="text-[8px] font-black text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-150 animate-pulse">Live API Sync</span>
        </div>
        <div className="flex-1 flex items-end">
          <svg viewBox="0 0 160 40" className="w-full overflow-visible" style={{ height: 40 }}>
            <defs>
              <linearGradient id="creator-chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,35 C20,38 40,8 60,15 C80,24 100,2 120,5 C140,8 160,1 L160,40 L0,40 Z" fill="url(#creator-chart-fill)" />
            <path d="M0,35 C20,38 40,8 60,15 C80,24 100,2 120,5 C140,8 160,1" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="160" cy="1" r="2.5" fill="#000" />
          </svg>
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[150px] rounded-xl border bg-white p-2.5 shadow-sm relative overflow-hidden" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Lock size={12} className="text-black" />
            <span className="text-[8px] font-bold text-black uppercase tracking-wider">ESCROW VAULT</span>
          </div>
          <p className="text-xs font-black text-black mb-1">$5,000.00</p>
          <div className="flex items-center justify-between text-[7px] text-black/50 border-t pt-1.5" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <span>Campaign Pool</span>
            <span className="text-green-600 font-semibold bg-green-50 px-1.5 rounded">Locked</span>
          </div>
        </div>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="flex flex-col gap-1.5 w-full max-w-[180px]">
          <div className="flex gap-1.5 flex-wrap justify-center">
            {["No Scripts", "Show Your Vibe", "Authentic Recipe"].map((tag, idx) => (
              <span key={tag} className="text-[8px] font-bold px-2 py-0.5 rounded-full border shadow-xs"
                style={{
                  background: idx === 1 ? "#000000" : "#ffffff",
                  color: idx === 1 ? "#ffffff" : "rgba(0,0,0,0.6)",
                  borderColor: idx === 1 ? "#000000" : BORDER
                }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap justify-center mt-0.5">
            {["Natural Light", "No Competitors"].map((tag) => (
              <span key={tag} className="text-[8px] font-bold px-2 py-0.5 rounded-full border bg-white shadow-xs"
                style={{ color: "rgba(0,0,0,0.6)", borderColor: BORDER }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (step === 4) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shadow-md z-10 border border-[#d1f8ff]/30">
            <Globe size={12} className="text-[#d1f8ff]" />
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border shadow-sm flex items-center justify-center" style={{ borderColor: BORDER }}>
            <Play size={8} className="text-black" />
          </div>
          <div className="absolute bottom-1 left-1 w-5 h-5 rounded-full bg-white border shadow-sm flex items-center justify-center" style={{ borderColor: BORDER }}>
            <Instagram size={8} className="text-black" />
          </div>
          <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-white border shadow-sm flex items-center justify-center" style={{ borderColor: BORDER }}>
            <Youtube size={8} className="text-red-600" />
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 96 96">
            <line x1="48" y1="48" x2="48" y2="10" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="48" y1="48" x2="14" y2="82" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="48" y1="48" x2="82" y2="82" stroke="rgba(0,0,0,0.1)" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-3.5">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[8px] font-black uppercase text-black/40">Leaderboard Rankings</span>
        <span className="text-[8px] font-bold text-green-600">✓ Audited</span>
      </div>
      <div className="space-y-1">
        {[
          { rank: "🥇", handle: "@fitbyfiona", score: "98", prize: "$1,750" },
          { rank: "🥈", handle: "@zenmove", score: "94", prize: "$1,000" },
          { rank: "🥉", handle: "@runnerspark", score: "89", prize: "$750" }
        ].map((item) => (
          <div key={item.handle} className="flex items-center justify-between bg-white border rounded px-2 py-1 shadow-xs text-[8px]" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-1">
              <span>{item.rank}</span>
              <span className="font-bold text-black">{item.handle}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-black/40 text-[7px]">Views Score</span>
              <span className="font-extrabold text-black">{item.prize}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Features Bento ───────────────────────────────────────────────────────────
function FeaturesBento() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".bento-card", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Users size={20} />,
      title: "Zero Follower Barriers",
      desc: "Start immediately, regardless of your profile metrics. Let your creative craft do the talking, not follower checks.",
      wide: false,
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Real-Time Leaderboard Dashboard",
      desc: "Track your submission's views, likes, and rank live. View transparent platform API data dynamically as it grows.",
      wide: true,
    },
    {
      icon: <Lock size={20} />,
      title: "Upfront Escrow Protection",
      desc: "All prize money is secured in GOC escrow before campaign launch. Zero payment negotiation or default risk.",
      wide: false,
    },
    {
      icon: <Zap size={20} />,
      title: "Instant Wallet Payouts",
      desc: "Rankings are finalized within 2 hours of campaign close. Push funds directly to bank accounts or digital wallets.",
      wide: false,
    },
    {
      icon: <Globe size={20} />,
      title: "Multi-Platform Support",
      desc: "Publish your content once on TikTok, Instagram, or YouTube and link them all seamlessly from your profile.",
      wide: false,
    },
    {
      icon: <Award size={20} />,
      title: "Merit-Based Rewards",
      desc: "Scale your earnings. The better your content performs in front of real audiences, the higher your payouts.",
      wide: true,
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: ICE_DIM, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Sparkles size={13} />} label="Platform Features" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Built for Content Creators
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Every feature is designed around one goal: paying you transparently for your creative craft.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {features.map((f, i) => (
            <div key={i}
              className={`bento-card rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 flex flex-col ${f.wide ? "md:col-span-2 md:flex-row items-stretch" : "md:col-span-1"}`}
              style={{ background: "#ffffff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)";
              }}>
              {f.wide ? (
                <>
                  <div className="p-7 flex-1 flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                      <span className="text-black">{f.icon}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {f.desc}
                    </p>
                  </div>
                  <div className="relative w-full md:w-1/2 min-h-[140px] flex-shrink-0" style={{ background: ICE_DIM }}>
                    <GridBg opacity={0.06} />
                    <CreatorBentoVisual step={i} />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative h-36 w-full flex-shrink-0" style={{ background: ICE_DIM }}>
                    <GridBg opacity={0.06} />
                    <CreatorBentoVisual step={i} />
                    <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                      style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
                  </div>
                  <div className="p-6 pt-2.5 flex-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                      <span className="text-black">{f.icon}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {f.desc}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Integrations (Creators) ─────────────────────────────────────────────────
function Integrations() {
  const ref = useRef<HTMLDivElement>(null);
  const [connected, setConnected] = useState<Record<string, boolean>>({
    tiktok: true,
    instagram: false,
    youtube: false,
    twitter: false,
    upi: false,
    bank: false,
    paypal: false,
    stripe: false,
  });
  const [connecting, setConnecting] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    if (connected[key]) {
      setConnected(prev => ({ ...prev, [key]: false }));
    } else {
      setConnecting(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setConnecting(prev => ({ ...prev, [key]: false }));
        setConnected(prev => ({ ...prev, [key]: true }));
      }, 1000);
    }
  };

  const platforms = [
    { key: "tiktok", name: "TikTok API Link", icon: <Play size={18} />, color: "#000000" },
    { key: "instagram", name: "Instagram Business Sync", icon: <Instagram size={18} />, color: "#E1306C" },
    { key: "youtube", name: "YouTube Creator Sync", icon: <Youtube size={18} />, color: "#FF0000" },
    { key: "twitter", name: "X API Sync", icon: <Twitter size={18} />, color: "#1DA1F2" },
  ];

  const cashouts = [
    { key: "upi", name: "UPI Payout (Instant)", icon: <Smartphone size={18} />, color: "#0984e3" },
    { key: "bank", name: "Direct Bank (NEFT/IMPS)", icon: <Building size={18} />, color: "#2d3436" },
    { key: "paypal", name: "PayPal (Global)", icon: <DollarSign size={18} />, color: "#003087" },
    { key: "stripe", name: "Stripe Connect", icon: <CreditCard size={18} />, color: "#6772e5" },
  ];

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: ICE_DIM, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Globe size={13} />} label="Integrations" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Connect Your Accounts & Payout Channels
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Link your social networks to sync submissions and configure where you cash out your earnings.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Social Platforms Panel */}
          <div className="rounded-2xl p-8 bg-white border" style={{ borderColor: BORDER, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            <h3 className="text-lg font-extrabold text-black mb-6 flex items-center gap-2"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              <Share2 size={18} className="text-black/60" /> Social Channels
            </h3>
            <div className="space-y-4">
              {platforms.map((p) => {
                const isConnected = connected[p.key];
                const isConnecting = connecting[p.key];
                return (
                  <div key={p.key} className="flex items-center justify-between p-4 rounded-xl border bg-[#f9fafb]" style={{ borderColor: BORDER }}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border shadow-xs" style={{ color: p.color, borderColor: BORDER }}>
                        {p.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black">{p.name}</p>
                        <p className="text-xs text-black/40">Status: {isConnected ? "Connected & Active" : "Not Connected"}</p>
                      </div>
                    </div>
                    <button onClick={() => handleToggle(p.key)} disabled={isConnecting}
                      className="px-4 py-2 text-xs font-black rounded-full cursor-pointer transition-all duration-300 min-w-[90px] text-center"
                      style={{
                        background: isConnected ? "rgba(0,0,0,0.05)" : "#000000",
                        color: isConnected ? "rgba(0,0,0,0.6)" : "#ffffff",
                        border: isConnected ? `1px solid ${BORDER}` : "none"
                      }}>
                      {isConnecting ? "Linking..." : isConnected ? "Disconnect" : "Connect"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cashout Platforms Panel */}
          <div className="rounded-2xl p-8 bg-white border" style={{ borderColor: BORDER, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            <h3 className="text-lg font-extrabold text-black mb-6 flex items-center gap-2"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              <DollarSign size={18} className="text-black/60" /> Payout Methods
            </h3>
            <div className="space-y-4">
              {cashouts.map((p) => {
                const isConnected = connected[p.key];
                const isConnecting = connecting[p.key];
                return (
                  <div key={p.key} className="flex items-center justify-between p-4 rounded-xl border bg-[#f9fafb]" style={{ borderColor: BORDER }}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white border shadow-xs" style={{ color: p.color, borderColor: BORDER }}>
                        {p.icon}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-black">{p.name}</p>
                        <p className="text-xs text-black/40">Status: {isConnected ? "Active Payout Endpoint" : "Unconfigured"}</p>
                      </div>
                    </div>
                    <button onClick={() => handleToggle(p.key)} disabled={isConnecting}
                      className="px-4 py-2 text-xs font-black rounded-full cursor-pointer transition-all duration-300 min-w-[90px] text-center"
                      style={{
                        background: isConnected ? "rgba(0,0,0,0.05)" : "#000000",
                        color: isConnected ? "rgba(0,0,0,0.6)" : "#ffffff",
                        border: isConnected ? `1px solid ${BORDER}` : "none"
                      }}>
                      {isConnecting ? "Linking..." : isConnected ? "Remove" : "Connect"}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Creator Protection & Guarantees ──────────────────────────────────────────
function CreatorProtection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".protect-card", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const protections = [
    {
      icon: <Lock size={22} />,
      title: "Upfront Escrow Deposits",
      desc: "You never have to chase brands for payment. GOC holds 100% of the campaign prize pool in secure escrow before a brief is published. Your earnings are guaranteed.",
      badge: "Escrow Secured",
    },
    {
      icon: <Shield size={22} />,
      title: "100% IP Ownership Retention",
      desc: "If your content doesn't rank or a brand decides not to license it, you retain full rights. Deconstruct it, upload it elsewhere, or sell it to other platforms.",
      badge: "Creator First IP",
    },
    {
      icon: <Eye size={22} />,
      title: "Verified API Leaderboards",
      desc: "Leaderboard rankings are calculated automatically using public platform engagement APIs. No subjective brand biases or hidden preferences can dictate payouts.",
      badge: "API-Verified Rankings",
    },
    {
      icon: <Zap size={22} />,
      title: "Anti-Bot Fair Play Checks",
      desc: "Our automated systems monitor and filter out fake engagements, bot views, or purchase-based metrics. Only organic, real creator craft wins on GOC.",
      badge: "Fair Play Audits",
    },
    {
      icon: <DollarSign size={22} />,
      title: "Direct Bank Cashouts in 24h",
      desc: "Ranks are finalized within 2 hours of a campaign closing, and your payout is instantly loaded to your wallet. Cash out to bank accounts within 24 hours.",
      badge: "Fast Liquid Cashout",
    },
    {
      icon: <Users size={22} />,
      title: "Transparent Briefs & Caps",
      desc: "Brief guidelines and rules are locked at campaign launch. Brands cannot add new criteria post-submission. Campaigns have clear creator participation limits.",
      badge: "Locked Brief Rules",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: "#ffffff", borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Shield size={13} />} label="Creator Safeguards" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Creator Bill of Rights
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            We designed GOC to be the fairest, most legally and financially transparent arena for content creators globally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {protections.map((p, i) => (
            <div key={i} className="protect-card rounded-2xl p-7 group transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)";
              }}>
              <div className="flex items-start justify-between mb-5">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                  <span className="text-black">{p.icon}</span>
                </div>
                <div className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: ICE, border: `1px solid rgba(0,0,0,0.08)`, color: BLK }}>
                  {p.badge}
                </div>
              </div>
              <h3 className="text-lg font-extrabold text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Legal Frame Ribbon */}
        <div className="mt-10 rounded-2xl px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: BLK, border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: ICE }}>
              <Shield size={22} className="text-black" />
            </div>
            <div>
              <p className="font-extrabold text-white text-sm" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Fair-deal templates by default. No tricky legal print.
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
                GOC agreements protect content creators under standard legal frameworks. You work on your terms.
              </p>
            </div>
          </div>
          <button className="flex-shrink-0 flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap cursor-pointer"
            style={{ background: "#ffffff", color: BLK, fontFamily: "'DM Sans', sans-serif" }}>
            Read Creator Agreement Docs <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Creator Arena Simulator ──────────────────────────────────────────────────
const CAMPAIGN_POOL = [
  { id: "novasport", title: "NovaSport Flex Challenge", niche: "Fitness & Activewear", budget: 5000, platform: "TikTok", checklist: ["Wear brand colors (Black/Cyan)", "Show 15s workout routing", "Incorporate hashtag #FlexChallenge", "No competitor brand mentions"], thumbnail: "https://picsum.photos/seed/n1/200/320" },
  { id: "lumina", title: "Lumina Skin Glowroutine", niche: "Skincare & Beauty", budget: 3500, platform: "Instagram", checklist: ["Show serum bottle labels clearly", "Apply 3-4 drops on clean skin", "Shoot in bright natural daylight", "Include link in bio overlay"], thumbnail: "https://picsum.photos/seed/l1/200/320" },
  { id: "brewlabs", title: "Brewlabs Cold Brew Recipe", niche: "Craft Food & Beverage", budget: 2500, platform: "YouTube", checklist: ["Pour cold brew over ice cubes", "Incorporate cream splash visual", "Show product bottle within first 3s", "Recommend discount code glowrecipe"], thumbnail: "https://picsum.photos/seed/b1/200/320" }
];

function CreatorArenaSimulator() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedCamp, setSelectedCamp] = useState(CAMPAIGN_POOL[0]);
  const [arenaStep, setArenaStep] = useState<"brief" | "upload" | "scoring" | "wallet">("brief");
  const [fileName, setFileName] = useState("");
  const [payoutAmount, setPayoutAmount] = useState(0);
  const [wallet, setWallet] = useState(120);

  const simulateUpload = () => {
    if (!fileName) {
      setFileName("GOC-UGC-CREATIVE-" + Math.floor(1000 + Math.random() * 9000) + ".mp4");
    }
    setArenaStep("scoring");
    setTimeout(() => {
      // Determine simulated rank and earnings
      // 🥇 1st = $1,750 (for $5k), 🥈 top 5 = $400, 🥉 top 15 = $83
      let amount = 400;
      if (selectedCamp.id === "lumina") amount = 280; // $3500 top 5
      if (selectedCamp.id === "brewlabs") amount = 200; // $2500 top 5
      setPayoutAmount(amount);
      setArenaStep("wallet");
    }, 3000);
  };

  const handleCashout = () => {
    setWallet(prev => prev + payoutAmount);
    setPayoutAmount(0);
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current!, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 70%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 relative overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <Badge icon={<Tv size={13} />} label="Interactive Demo" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            The Creator Arena in Action
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Try choosing a brief, reading compliance checklists, and simulating content submissions.
          </p>
        </div>

        {/* Simulator Shell */}
        <div className="rounded-3xl overflow-hidden" style={{ background: "#ffffff", border: `1px solid ${BORDER}`, boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
          {/* Chrome Header */}
          <div className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: `1px solid ${BORDER}`, background: "#fafafa" }}>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-1.5 px-5 py-1.5 rounded-lg text-xs"
              style={{ background: "#fff", border: `1px solid ${BORDER}`, width: 260 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" />
              <span className="text-black/45 select-none font-mono">arena.gameofcreators.com</span>
            </div>
            {/* Wallet display */}
            <div className="flex items-center gap-1 bg-[#d1f8ff] px-3 py-1 rounded-full text-xs font-black text-black">
              <span>Wallet:</span>
              <span>${wallet.toLocaleString()}</span>
            </div>
          </div>

          {/* Simulator Content */}
          <div className="grid md:grid-cols-3 min-h-[480px]">
            {/* Left Sidebar: Campaigns List */}
            <div className="col-span-1 border-r p-5 space-y-3" style={{ borderColor: BORDER, background: "#fafafa" }}>
              <h4 className="text-[10px] font-black uppercase text-black/40 tracking-wider mb-2">Live Briefs</h4>
              {CAMPAIGN_POOL.map((c) => {
                const isActive = selectedCamp.id === c.id;
                return (
                  <button key={c.id} onClick={() => { setSelectedCamp(c); setArenaStep("brief"); }}
                    className="w-full text-left p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-3 items-center"
                    style={{
                      background: isActive ? "#ffffff" : "transparent",
                      borderColor: isActive ? "rgba(0,0,0,0.12)" : "transparent",
                      boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.03)" : "none"
                    }}>
                    <div className="w-8 h-8 rounded-xl bg-[#d1f8ff] flex items-center justify-center flex-shrink-0 text-black">
                      <Zap size={14} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-black text-black truncate">{c.title}</p>
                      <p className="text-[9px] text-black/40 font-bold mt-0.5">{c.platform} · {c.niche}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Middle/Right: Arena Workflow */}
            <div className="col-span-2 p-8 flex flex-col justify-between">
              
              {/* Step 1: Brief review */}
              {arenaStep === "brief" && (
                <div className="space-y-5">
                  <div>
                    <span className="text-[10px] font-bold text-[#000000] uppercase tracking-wide bg-[#d1f8ff] px-2 py-0.5 rounded">Campaign Details</span>
                    <h3 className="text-xl font-extrabold text-black mt-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {selectedCamp.title}
                    </h3>
                    <p className="text-xs text-black/55 mt-1">Brief Category: {selectedCamp.niche} Challenge</p>
                  </div>

                  <div className="rounded-2xl border p-5 space-y-3" style={{ background: "#ffffff" }}>
                    <p className="text-[9px] font-black uppercase text-black/40 tracking-wider">Campaign Checklist</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {selectedCamp.checklist.map((rule, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-black/75">
                          <Check size={14} className="text-green-500 flex-shrink-0 mt-0.5" strokeWidth={3} />
                          <span>{rule}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 items-center pt-4 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    <div>
                      <p className="text-[8px] font-black uppercase text-black/45">Prize Pool</p>
                      <p className="text-xl font-black text-black">${selectedCamp.budget.toLocaleString()}</p>
                    </div>
                    <button onClick={() => setArenaStep("upload")}
                      className="btn-primary-gradient ml-auto px-6 py-3 rounded-full text-xs font-black flex items-center gap-2">
                      Start Challenge <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Upload File */}
              {arenaStep === "upload" && (
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#d1f8ff] flex items-center justify-center text-black mb-4">
                    <Camera size={26} />
                  </div>
                  <h3 className="text-lg font-black text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Submit Your UGC Video
                  </h3>
                  <p className="text-xs text-black/50 max-w-sm mb-5 leading-relaxed">
                    Upload your completed video file. GOC will run automated audits to check brief compliance before mapping engagement rankings.
                  </p>

                  <div className="flex gap-3">
                    <button onClick={() => setArenaStep("brief")}
                      className="border text-xs text-black/55 px-5 py-3 rounded-full cursor-pointer hover:bg-neutral-50 transition-colors font-bold"
                      style={{ borderColor: BORDER }}>
                      ← Back to Brief
                    </button>
                    <button onClick={simulateUpload}
                      className="btn-primary-gradient px-6 py-3 rounded-full text-xs font-black flex items-center gap-2">
                      Simulate Video Upload <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Auditing & Scoring */}
              {arenaStep === "scoring" && (
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-t-black animate-spin mb-4"
                    style={{ borderColor: `rgba(0,0,0,0.06) rgba(0,0,0,0.06) rgba(0,0,0,0.06) ${BLK}` }} />
                  <h3 className="text-lg font-black text-black mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Auditing Brief Compliance...
                  </h3>
                  <p className="text-xs text-black/45 max-w-xs leading-relaxed">
                    Checking guidelines, trademark safety, and visual checklist matches. views ranking will map in real time.
                  </p>
                </div>
              )}

              {/* Step 4: Wallet updates */}
              {arenaStep === "wallet" && (
                <div className="space-y-5">
                  <div className="text-center p-6 bg-green-50/50 border border-green-200 rounded-2xl relative overflow-hidden">
                    <div className="text-4xl mb-3">🎉</div>
                    <h3 className="text-lg font-black text-green-900" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      Submission Audited & Ranked!
                    </h3>
                    <p className="text-xs text-green-800/70 mt-1 max-w-xs mx-auto">
                      Your video matched compliance guidelines with a 96% score and ranked in the Top 5 tier.
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 bg-white border border-green-300 px-4 py-2 rounded-full text-xs font-black text-black">
                      <span>Simulated Prize:</span>
                      <span>+${payoutAmount} USD</span>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button onClick={() => { setArenaStep("brief"); setFileName(""); }}
                      className="border text-xs text-black/55 px-5 py-3 rounded-full cursor-pointer hover:bg-neutral-50 transition-colors font-bold"
                      style={{ borderColor: BORDER }}>
                      Challenge Again
                    </button>
                    {payoutAmount > 0 && (
                      <button onClick={handleCashout}
                        className="btn-primary-gradient px-6 py-3 rounded-full text-xs font-black flex items-center gap-2">
                        Add to Wallet <Check size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQAccordion ─────────────────────────────────────────────────────────────
function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "Do I really need zero followers to join?",
      answer: "Yes, GOC is fully democratized. Because brands on GOC pay for content performance (engagement and views) rather than your profile's vanity follower counts, anyone is welcome to download brief files, shoot content, and rank. Your craft determines your rewards.",
    },
    {
      question: "How is my content's score and rank tracked?",
      answer: "When you upload your content and publish it on social platforms, our system maps and audits views and reaction metrics directly via platform APIs (TikTok, YouTube, Instagram Reels). These verified metrics establish the leaderboard in real time.",
    },
    {
      question: "How much can I earn per campaign?",
      answer: "Earnings are determined by the campaign's total budget and where your content ranks. For example, in a $5,000 challenge, the 1st place creator earns $1,750, top 5 split $2,000 ($400 each), and top 15 split $1,250 ($83 each). Smaller and larger budgets scale accordingly.",
    },
    {
      question: "How do payouts work, and when do I get paid?",
      answer: "Once a campaign closes and the final ranks are audited, your earnings are automatically deposited to your secure GOC wallet. You can request direct bank or PayPal cash outs. Payouts are typically processed in under 24 hours.",
    },
    {
      question: "What are the rules for licensing and usage?",
      answer: "Only licensed submissions (creatives that rank or are explicitly licensed by brands) transfer Intellectual Property (IP) usage rights. You retain full ownership of non-licensed videos, though you agree to keep them uploaded during the campaign run.",
    },
  ];

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 px-6" style={{ background: "#ffffff", borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Lightbulb size={13} />} label="FAQ" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Common Questions
          </h2>
          <p className="text-lg text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Everything you need to know to kickstart your creator journey on GOC.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: openIdx === idx ? ICE_DIM : "#fafafa",
                border: `1px solid ${openIdx === idx ? "rgba(0,0,0,0.1)" : BORDER}`,
              }}>
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left">
                <span className="text-base font-bold text-black pr-4"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {faq.question}
                </span>
                <ChevronRight size={18} className="flex-shrink-0 transition-all duration-300"
                  style={{ color: openIdx === idx ? BLK : "rgba(0,0,0,0.3)", transform: openIdx === idx ? "rotate(90deg)" : "none" }} />
              </button>
              <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openIdx === idx ? "200px" : "0" }}>
                <p className="px-6 pb-5 text-base leading-relaxed text-black/60"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────
function CTABanner() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!, { opacity: 0, scale: 0.97 }, {
        opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: ICE_DIM, borderTop: `1px solid ${BORDER}` }}>
      <div ref={ref} className="max-w-5xl mx-auto">
        <div className="rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{ background: BLK, border: "1px solid rgba(255,255,255,0.05)", boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}>

          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cta-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cta-grid)" />
          </svg>

          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${ICE} 0%, transparent 70%)`, opacity: 0.12, filter: "blur(30px)" }} />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
              style={{ background: ICE, boxShadow: `0 8px 24px rgba(209,248,255,0.25)` }}>
              <Rocket size={28} className="text-black" />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Monetize Your UGC Craft<br />Without the Audits
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
              Join thousands of micro-creators on Game of Creators. Review active brand briefs and cash out rank prizes directly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base transition-all duration-300"
                style={{ background: "#ffffff", color: BLK, boxShadow: "0 8px 24px rgba(255,255,255,0.15)", fontFamily: "'DM Sans', sans-serif" }}>
                <span>Start Creating Now</span>
                <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2.5 px-8 py-5 rounded-full font-bold text-base transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", fontFamily: "'DM Sans', sans-serif" }}>
                <Megaphone size={18} /> Read Guide Docs
              </button>
            </div>

            <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
              No subscriptions · No contracts · 100% Escrow protected payouts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-16 px-6" style={{ background: "#ffffff", borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <img src={GOCLogo} alt="Game of Creators"
              style={{ height: 32, width: "auto", marginBottom: 16, filter: "brightness(0)" }} />
            <p className="text-sm mb-6 text-black/45 leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
              Democratized creator payments. Join open contests, upload complying UGC, and rank to win escrow-protected prizes.
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Youtube, Linkedin].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ background: ICE_DIM, border: `1px solid ${BORDER}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = ICE;
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = ICE_DIM;
                    e.currentTarget.style.borderColor = BORDER;
                  }}>
                  <Icon size={15} className="text-black/60" />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Platform", links: ["How It Works", "For Brands", "For Creators", "Campaigns", "Analytics"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
            { title: "Resources", links: ["Help Center", "Creator Guide", "Brand Guide", "Partners", "Terms"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest mb-4 text-black/40"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-black/55 transition-all duration-200 hover:text-black"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: BORDER }}>
          <p className="text-sm text-black/35" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            © 2026 Game of Creators. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#"
                className="text-sm text-black/40 transition-all duration-200 hover:text-black"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Social Proof / Testimonials ──────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "I started on GOC with 120 followers. I submitted a simple recipe video for Brewlabs challenge and won 2nd place. Earned $1,000 in my first week! Best platform for aspiring UGC creators.",
    name: "Sophie Clark",
    role: "Lifestyle & Food Creator · @ugc_sophie",
    avatar: "https://i.pravatar.cc/80?img=43",
    stats: [{ val: "120", label: "Followers start" }, { val: "$1,000", label: "Earnings" }, { val: "2", label: "Ranks won" }],
  },
  {
    quote: "No contracts, no negotiation, no managers taking a cut. I just record, upload compliance files, and let the real statistics do the talking. I've cashed out $4,200 so far this year.",
    name: "Marcus Jordan",
    role: "Fitness & Wellness Creator · @fitbymarcus",
    avatar: "https://i.pravatar.cc/80?img=11",
    stats: [{ val: "4.2K", label: "Total earned" }, { val: "98/100", label: "Brief accuracy" }, { val: "6", label: "Total challenges" }],
  },
  {
    quote: "The payout speed is insane. Ranks audited on Monday, cash in my bank on Tuesday. GOC took all the legal and payment stress out of freelance creation.",
    name: "Elena Rostova",
    role: "Beauty & Skincare Creator · @glowbyelena",
    avatar: "https://i.pravatar.cc/80?img=49",
    stats: [{ val: "12h", label: "Payout time" }, { val: "$2,800", label: "Prizes won" }, { val: "4", label: "Brands partnered" }],
  },
];

const METRICS = [
  { val: "50,000+", label: "Creators Joined", icon: <Users size={20} /> },
  { val: "$2.1M", label: "Earnings Paid Out", icon: <DollarSign size={20} /> },
  { val: "2.80%", label: "Average Engagement", icon: <TrendingUp size={20} /> },
  { val: "4.9★", label: "Creator App Score", icon: <Star size={20} /> },
];

function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".metric-card", { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: "#ffffff", borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Star size={13} />} label="Creator Reviews" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Real Creator Success Stories
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Real reviews, real payouts, direct ranking metrics.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {METRICS.map((m, i) => (
            <div key={i} className="metric-card rounded-2xl p-6 text-center"
              style={{ background: i % 2 === 0 ? ICE_DIM : "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-3"
                style={{ background: i % 2 === 0 ? ICE : ICE_DIM }}>
                <span className="text-black">{m.icon}</span>
              </div>
              <p className="text-3xl font-extrabold text-black mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{m.val}</p>
              <p className="text-xs text-black/45 font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Box */}
        <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background: ICE_DIM, border: `1px solid ${BORDER}`, boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}>

          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6 leading-none" style={{ color: ICE, fontFamily: "Georgia, serif" }}>"</div>
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-black mb-8"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {t.quote}
            </p>

            {/* Testimonial stats */}
            <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
              {t.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 px-4 py-2 rounded-full"
                  style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <span className="text-lg font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{s.val}</span>
                  <span className="text-xs text-black/45 font-medium">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <img src={t.avatar} className="w-12 h-12 rounded-full border-2" style={{ borderColor: ICE }} />
              <div className="text-left">
                <p className="text-sm font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{t.name}</p>
                <p className="text-xs text-black/45" style={{ fontFamily: "'DM Sans', sans-serif" }}>{t.role}</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: active === i ? 24 : 8, height: 8,
                  background: active === i ? BLK : "rgba(0,0,0,0.15)",
                }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function CreatorPage() {
  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Nav />
      <CreatorHero />
      <TrustBar />
      <WhyGOC />
      <HowItWorks />
      <CreatorEarningsEstimator />
      <FeaturesBento />
      <CreatorArenaSimulator />
      <Integrations />
      <SocialProof />
      <CreatorProtection />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}
