import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Link } from "react-router";
import { Nav, Footer } from "../App";
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
  CheckCircle2, Lightbulb, Briefcase, Megaphone, Tv, Camera, Calendar
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// ─── Design Tokens (matching App.tsx exactly) ─────────────────────────────────
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
      <span className="text-xs font-bold uppercase tracking-widest text-black/70">{label}</span>
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

// ─── Visual Helpers for Cards ─────────────────────────────────────────────────
function WhyGOCVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[220px] rounded-3xl border bg-white p-3 shadow-sm" style={{ borderColor: BORDER }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-black uppercase text-black/40">Performance ROI</span>
            <span className="text-[9px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">✓ Active</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-black/50">Traditional Ads Cost</span>
              <span className="font-semibold text-black/80 line-through">$1,200</span>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-black/50">GOC Prizes Paid</span>
              <span className="font-bold text-black">$350</span>
            </div>
            <div className="h-1.5 bg-black/5 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-black rounded-full" style={{ width: "85%" }} />
            </div>
            <div className="flex justify-between items-center text-[9px] text-black/40 mt-1">
              <span>Wasted: $0</span>
              <span className="font-bold text-black/70">3.4× ROI</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="grid grid-cols-2 gap-2 w-full max-w-[240px]">
          {[
            { handle: "@skincare_mia", views: "140K", rating: "4.9", img: "https://picsum.photos/seed/mia/100/100" },
            { handle: "@fitness_dan", views: "85K", rating: "4.8", img: "https://picsum.photos/seed/dan/100/100" }
          ].map((c) => (
            <div key={c.handle} className="rounded-full border bg-white overflow-hidden shadow-xs relative flex flex-col" style={{ borderColor: BORDER }}>
              <div className="h-14 relative overflow-hidden bg-black/5">
                <img src={c.img} alt="" className="w-full h-full object-cover opacity-90" />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
                    <Play size={8} className="fill-black text-black translate-x-px" />
                  </div>
                </div>
              </div>
              <div className="p-1.5 flex flex-col justify-between flex-1">
                <p className="text-[8px] font-bold text-black truncate">{c.handle}</p>
                <div className="flex items-center justify-between text-[8px] text-black/50 mt-0.5">
                  <span className="font-medium">{c.views}</span>
                  <span className="text-black/60 font-semibold">★ {c.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full max-w-[220px] rounded-3xl border bg-white p-3 shadow-sm relative overflow-hidden" style={{ borderColor: BORDER }}>
        <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full opacity-10 flex items-center justify-center" style={{ background: BLK }}>
          <Shield size={24} />
        </div>
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="w-5 h-5 rounded bg-black flex items-center justify-center text-white">
            <Shield size={10} />
          </div>
          <span className="text-[10px] font-extrabold text-black uppercase tracking-wide">IP LICENSE AGREEMENT</span>
        </div>
        <div className="space-y-1.5 text-[8px] text-black/60">
          <div className="flex items-center gap-1.5">
            <Check size={10} className="text-black" strokeWidth={3} />
            <span>Full Perpetual Usage Rights</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check size={10} className="text-black" strokeWidth={3} />
            <span>Ad Account Whitelisting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check size={10} className="text-black" strokeWidth={3} />
            <span>No Ongoing Royalty Fees</span>
          </div>
        </div>
        <div className="mt-2.5 pt-2 border-t flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
          <span className="text-[8px] uppercase tracking-wider text-black/40 font-bold">Transfer Status:</span>
          <span className="text-[8px] font-black text-black bg-[#d1f8ff] px-1.5 py-0.5 rounded">✓ COMPLETED</span>
        </div>
      </div>
    </div>
  );
}

function HowItWorksVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[220px] rounded-3xl border bg-white p-3 shadow-sm" style={{ borderColor: BORDER }}>
          <span className="text-[8px] font-black uppercase text-black/40 tracking-wider mb-1.5 block">1. Briefing Portal</span>
          <p className="text-[9px] font-bold text-black mb-2 line-clamp-1">"Create a 30s TikTok reviewing glow..."</p>
          <div className="flex gap-1.5 mb-3 flex-wrap">
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-black text-white">TikTok</span>
            <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-black/5 text-black/60 border border-black/10">Wellness</span>
          </div>
          <div className="flex items-center justify-between border-t pt-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <div>
              <p className="text-[7px] font-bold text-black/40 uppercase">Prize Pool</p>
              <p className="text-xs font-black text-black">$5,000</p>
            </div>
            <button className="bg-black text-white text-[8px] font-black px-2.5 py-1 rounded-full shadow-xs">
              Launch 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className="w-full max-w-[200px] rounded-3xl border bg-white p-3 shadow-sm relative overflow-hidden" style={{ borderColor: BORDER }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8px] font-black uppercase text-black/40">Contest Live</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[8px] font-bold text-red-500">Live</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <img src="https://i.pravatar.cc/40?img=33" className="w-6 h-6 rounded-full object-cover border" style={{ borderColor: BORDER }} />
            <div className="flex-1 min-w-0">
              <p className="text-[8px] font-bold text-black truncate">@glow_by_kate</p>
              <p className="text-[7px] text-black/40">Uploaded 2m ago</p>
            </div>
          </div>
          <div className="h-1.5 bg-black/5 rounded-full overflow-hidden mb-1.5">
            <div className="h-full bg-black rounded-full animate-pulse" style={{ width: "65%" }} />
          </div>
          <div className="flex items-center justify-between text-[8px] text-black/50">
            <span>Submissions: 34</span>
            <span className="font-semibold text-black">Avg Score: 87</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" fill="none" opacity="0.15">
        <circle cx="120" cy="90" r="70" stroke={BLK} strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="120" cy="90" r="45" stroke={BLK} strokeWidth="0.8" strokeDasharray="2 4" />
      </svg>
      <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shadow-md z-10">
        <Trophy size={20} className="text-[#d1f8ff]" />
      </div>
      <div className="absolute top-4 left-6 bg-white border rounded-full px-2 py-1 shadow-sm flex items-center gap-1.5" style={{ borderColor: BORDER }}>
        <span className="text-[8px] font-bold text-black">🥇 1st: $1,750</span>
      </div>
      <div className="absolute bottom-6 right-6 bg-white border rounded-full px-2 py-1 shadow-sm flex items-center gap-1.5" style={{ borderColor: BORDER }}>
        <span className="text-[8px] font-bold text-black">✓ Payout Released</span>
      </div>
    </div>
  );
}

function BentoVisual({ step }: { step: number }) {
  if (step === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="flex flex-col gap-1.5 w-full max-w-[180px]">
          <div className="flex gap-1.5 flex-wrap justify-center">
            {["#Beauty", "#Skincare", "#Lifestyle"].map((tag, idx) => (
              <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-full border shadow-xs"
                style={{
                  background: idx === 0 ? "#000000" : "#ffffff",
                  color: idx === 0 ? "#ffffff" : "rgba(0,0,0,0.6)",
                  borderColor: idx === 0 ? "#000000" : BORDER
                }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap justify-center mt-0.5">
            {["#Fitness", "#UGC"].map((tag) => (
              <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-full border bg-white shadow-xs"
                style={{ color: "rgba(0,0,0,0.6)", borderColor: BORDER }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-2.5 flex items-center justify-center gap-1.5 bg-white border rounded-3xl p-1.5 shadow-sm" style={{ borderColor: BORDER }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-[8px] font-black text-black">Matched: 142 Creators</span>
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
            <p className="text-[8px] font-bold text-black/40 uppercase">Performance Live</p>
            <p className="text-sm font-black text-black">1,240,890 <span className="text-[9px] font-medium text-black/50">views</span></p>
          </div>
          <span className="text-[8px] font-black text-black bg-[#d1f8ff] px-2 py-0.5 rounded border border-black/10">Live API Feed</span>
        </div>
        <div className="flex-1 flex items-end">
          <svg viewBox="0 0 160 40" className="w-full overflow-visible" style={{ height: 40 }}>
            <defs>
              <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#000" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,35 C20,30 40,10 60,18 C80,26 100,5 120,8 C140,10 160,2 L160,40 L0,40 Z" fill="url(#chart-fill)" />
            <path d="M0,35 C20,30 40,10 60,18 C80,26 100,5 120,8 C140,10 160,2" fill="none" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="160" cy="2" r="2.5" fill="#000" />
          </svg>
        </div>
      </div>
    );
  }
  if (step === 2) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[150px] rounded-3xl border bg-white p-2.5 shadow-sm relative overflow-hidden" style={{ borderColor: BORDER }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Lock size={12} className="text-black" />
            <span className="text-[8px] font-bold text-black uppercase tracking-wider">SECURE ESCROW</span>
          </div>
          <p className="text-[12px] font-black text-black mb-1">$5,000.00</p>
          <div className="flex items-center justify-between text-[7px] text-black/50 border-t pt-1.5" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
            <span>Status: Held</span>
            <span className="text-green-600 font-semibold bg-green-50 px-1 rounded">Protected</span>
          </div>
        </div>
      </div>
    );
  }
  if (step === 3) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[180px] space-y-2">
          {[
            { handle: "@skincare_mia (5K followers)", er: "9.2% ER", val: 92 },
            { handle: "@mega_celeb (1.2M followers)", er: "1.1% ER", val: 11 }
          ].map((item, idx) => (
            <div key={item.handle} className="space-y-0.5">
              <div className="flex justify-between text-[7px] font-bold text-black/60">
                <span>{item.handle}</span>
                <span className={idx === 0 ? "text-black font-extrabold" : "text-black/40"}>{item.er}</span>
              </div>
              <div className="h-1.5 bg-black/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${item.val}%`, background: idx === 0 ? "#000" : "rgba(0,0,0,0.2)" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (step === 4) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white shadow-md z-10 border border-[#d1f8ff]/30">
            <Zap size={12} className="text-[#d1f8ff]" />
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
        <span className="text-[8px] font-black uppercase text-black/40">Prize Leaderboard</span>
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
              <span className="text-black/40 text-[7px]">Score: {item.score}</span>
              <span className="font-extrabold text-black">{item.prize}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Nav is imported from ../App

// ─── Hero ─────────────────────────────────────────────────────────────────────
function BrandHero() {
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

      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
          </pattern>
          <radialGradient id="hero-grid-mask" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="hero-grid-fade">
            <rect width="100%" height="100%" fill="url(#hero-grid-mask)" />
          </mask>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#hero-grid-fade)" />
      </svg>

      {/* Ice-blue glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: `radial-gradient(ellipse, ${ICE} 0%, rgba(255,255,255,0) 70%)`, opacity: 0.35, filter: "blur(40px)" }} />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-8"
          style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.08)` }}>
          <span className="flex items-center justify-center w-5 h-5 rounded-full text-black"
            style={{ background: ICE, boxShadow: "0 0 8px rgba(209,248,255,0.8)" }}>
            <Crown size={11} />
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-black/70">
            Performance-Based Creator Marketing
          </span>
        </div>

        {/* Headline */}
        <h1 ref={headRef} className="hero-h1 text-5xl md:text-7xl font-extrabold leading-[1.05] mb-6 tracking-tight"
          style={{ color: BLK }}>
          Make Your Product<br />
          <span className="relative">
            Go{" "}
            <span className="relative inline-block">
              Viral
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" style={{ height: 8 }}>
                <path d="M0,6 C50,0 150,12 200,6" stroke={ICE} strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "rgba(0,0,0,0.55)" }}>
          Set a prize pool, brief thousands of creators, and only pay for the content that actually performs.
          Authentic UGC at scale — without the agency markup.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button className="btn-primary-gradient flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base">
            Launch a Campaign <ArrowRight size={18} />
          </button>
          <button className="btn-secondary-dark flex items-center gap-2.5 px-7 py-4 rounded-full font-bold text-base">
            <Play size={16} className="fill-current" />
            See How It Works
          </button>
        </div>

        {/* Stats bar */}
        <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { val: "8,000+", label: "Active Creators" },
            { val: "100%", label: "Performance-Based" },
            { val: "0", label: "Upfront Risk" },
            { val: "3 Steps", label: "To Go Live" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-full px-4 py-5 text-center"
              style={{ background: "#ffffff", border: `1px solid ${BORDER}`, boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <p className="font-heading text-2xl font-extrabold text-black mb-1">{stat.val}</p>
              <p className="text-xs text-black/50 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Brand Trust Marquee ──────────────────────────────────────────────────────
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
        style={{ color: "rgba(0,0,0,0.35)" }}>
        Trusted by leading brands
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
              <span className="font-heading font-bold tracking-[0.15em] uppercase text-sm text-black/35 whitespace-nowrap">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Why GOC ──────────────────────────────────────────────────────────────────
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
      icon: <DollarSign size={22} />,
      title: "Pay Only for Results",
      desc: "No flat retainers, no wasted spend. Your prize pool only goes to creators whose content actually performs — ranked by real engagement.",
      highlight: "Zero upfront waste",
    },
    {
      icon: <Camera size={22} />,
      title: "Authentic UGC at Scale",
      desc: "Get dozens of unique videos from real creators who genuinely love your niche. Audiences trust creator-made content 3× more than brand ads.",
      highlight: "8,000+ active creators",
    },
    {
      icon: <Shield size={22} />,
      title: "You Own Everything",
      desc: "All submitted content comes with full usage rights. Repurpose top-performing videos in paid ads, social, email — forever.",
      highlight: "Full IP ownership",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Trophy size={13} />} label="Why Game of Creators" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            Why Brands Choose GOC
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55">
            The smartest brands don't pay for followers. They pay for results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div key={i} className="why-card rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 flex flex-col"
              style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)";
              }}>
              {/* Visual Zone */}
              <div className="relative h-40 w-full flex-shrink-0" style={{ background: ICE_DIM }}>
                <GridBg opacity={0.06} />
                <WhyGOCVisual step={i} />
                <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
              </div>
              {/* Content Zone */}
              <div className="p-6 pt-2.5 flex-1 flex flex-col">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                  <span className="text-black">{r.icon}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full self-start"
                  style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/60">{r.highlight}</span>
                </div>
                <h3 className="text-xl font-extrabold text-black mb-2">
                  {r.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/55 flex-1">
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

// ─── How It Works ─────────────────────────────────────────────────────────────
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
      icon: <Crown size={24} />,
      title: "Set Your Prize & Brief",
      desc: "Define what you want creators to make. Set a prize pool (you decide the budget). Our platform broadcasts it to thousands of relevant creators instantly.",
      detail: "You control the brief, the platforms, the content style — and the budget.",
    },
    {
      num: "02",
      icon: <Camera size={24} />,
      title: "Creators Compete for Your Brand",
      desc: "Creators from Instagram, TikTok, and YouTube create authentic content about your product — motivated by performance-based prizes, not flat fees.",
      detail: "More creative motivation = better content = better results for you.",
    },
    {
      num: "03",
      icon: <Trophy size={24} />,
      title: "Pay for What Performs",
      desc: "Content is ranked by real engagement. You pick the winners, pay only the prize pool, and keep full rights to every video you choose to license.",
      detail: "No agency fees. No wasted spend. Just results.",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: ICE_DIM, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Zap size={13} />} label="How It Works" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            Three Steps to Go Viral
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55">
            From brief to live campaign in minutes. No contracts, no minimums.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="step-card rounded-3xl overflow-hidden relative flex flex-col group transition-all duration-300 hover:-translate-y-1"
              style={{ background: "#ffffff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)", minHeight: 400 }}>
              
              {/* Visual zone */}
              <div className="relative h-44 w-full flex-shrink-0" style={{ background: ICE_DIM }}>
                <GridBg opacity={0.06} />
                <HowItWorksVisual step={i} />
                <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
              </div>

              {/* Text content */}
              <div className="p-6 pt-2.5 flex-1 flex flex-col z-10 relative">
                {/* Step number watermark */}
                <div className="font-heading absolute top-2 right-4 text-6xl font-extrabold pointer-events-none select-none"
                  style={{ color: "rgba(0,0,0,0.03)", lineHeight: 1 }}>
                  {step.num}
                </div>

                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                  style={{ background: ICE, border: `1px solid rgba(0,0,0,0.1)` }}>
                  <span className="text-black">{step.icon}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full self-start"
                  style={{ background: "rgba(0,0,0,0.05)", border: `1px solid rgba(0,0,0,0.06)` }}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black/50">Step {i + 1}</span>
                </div>

                <h3 className="text-xl font-extrabold text-black mb-2">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/55 mb-4 flex-1">
                  {step.desc}
                </p>
                <div className="pt-4 border-t mt-auto" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
                  <p className="text-xs text-black/40 italic">
                    {step.detail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-primary-gradient flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base mx-auto">
            Start Your First Campaign <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── ROI Calculator ────────────────────────────────────────────────────────────
function ROICalculator() {
  const ref = useRef<HTMLDivElement>(null);
  const [budget, setBudget] = useState(5000);
  const [creators, setCreators] = useState(50);

  const videosGenerated = Math.round(creators * 1.4);
  const estimatedViews = Math.round(budget * 280);
  const cpm = ((budget / (estimatedViews / 1000))).toFixed(2);
  const roiMultiplier = ((estimatedViews * 0.015) / budget * 10).toFixed(1);

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
          <Badge icon={<BarChart3 size={13} />} label="ROI Estimator" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            See Your Estimated Returns
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55">
            Adjust the sliders to model your campaign performance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="rounded-3xl p-8 flex flex-col h-full" style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            <h3 className="text-lg font-extrabold text-black mb-8">
              Configure Your Campaign
            </h3>

            <div className="space-y-8">
              {/* Prize Pool Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-black/60 uppercase tracking-wide text-xs">Prize Pool Budget</label>
                  <span className="font-heading text-2xl font-extrabold text-black">
                    ${budget.toLocaleString()}
                  </span>
                </div>
                <input type="range" min="1000" max="25000" step="500" value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, ${BLK} 0%, ${BLK} ${((budget - 1000) / 24000) * 100}%, rgba(0,0,0,0.12) ${((budget - 1000) / 24000) * 100}%, rgba(0,0,0,0.12) 100%)` }} />
                <div className="flex justify-between text-xs text-black/30 mt-2">
                  <span>$1,000</span><span>$25,000</span>
                </div>
              </div>

              {/* Creators Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-black/60 uppercase tracking-wide text-xs">Creator Participants (est.)</label>
                  <span className="font-heading text-2xl font-extrabold text-black">
                    {creators}
                  </span>
                </div>
                <input type="range" min="10" max="200" step="5" value={creators}
                  onChange={(e) => setCreators(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{ background: `linear-gradient(to right, ${BLK} 0%, ${BLK} ${((creators - 10) / 190) * 100}%, rgba(0,0,0,0.12) ${((creators - 10) / 190) * 100}%, rgba(0,0,0,0.12) 100%)` }} />
                <div className="flex justify-between text-xs text-black/30 mt-2">
                  <span>10</span><span>200+</span>
                </div>
              </div>

              {/* Reward Structure */}
              <div className="rounded-3xl p-4 mt-auto" style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-3">Prize Distribution</p>
                <div className="space-y-2">
                  {[
                    { tier: "🥇 1st Place", pct: 0.35, label: "35%" },
                    { tier: "🥈 Top 5 Pool", pct: 0.40, label: "40% split" },
                    { tier: "🥉 Top 15 Pool", pct: 0.25, label: "25% split" },
                  ].map((t) => (
                    <div key={t.tier} className="flex items-center justify-between">
                      <span className="text-xs text-black/60">{t.tier}</span>
                      <span className="font-heading text-sm font-extrabold text-black">
                        ${(budget * t.pct).toLocaleString()}
                        <span className="text-[10px] font-normal text-black/40 ml-1">({t.label})</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col justify-between h-full gap-4">
            {[
              { label: "Unique Videos Generated", val: `~${videosGenerated}`, icon: <Camera size={18} />, sub: "Based on creator participation rate" },
              { label: "Estimated Total Views", val: `${(estimatedViews / 1000000).toFixed(1)}M`, icon: <Eye size={18} />, sub: "Across all creator audiences" },
              { label: "Estimated CPM", val: `$${cpm}`, icon: <DollarSign size={18} />, sub: "vs. $12–25 for traditional ads" },
              { label: "Projected ROI Multiple", val: `${roiMultiplier}×`, icon: <TrendingUp size={18} />, sub: "Based on avg. engagement value" },
            ].map((metric, i) => (
              <div key={i} className="rounded-3xl p-6 flex items-center gap-5"
                style={{ background: i === 3 ? BLK : "#fff", border: `1px solid ${i === 3 ? BLK : BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: i === 3 ? ICE : ICE_DIM }}>
                  <span style={{ color: BLK }}>{metric.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide mb-1"
                    style={{ color: i === 3 ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)" }}>
                    {metric.label}
                  </p>
                  <p className="font-heading text-3xl font-extrabold"
                    style={{ color: i === 3 ? "#fff" : BLK }}>
                    {metric.val}
                  </p>
                </div>
                <p className="text-[10px] text-right max-w-[110px] flex-shrink-0"
                  style={{ color: i === 3 ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.35)" }}>
                  {metric.sub}
                </p>
              </div>
            ))}

            <div className="rounded-3xl p-5 text-center"
              style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.07)` }}>
              <p className="text-xs text-black/50 mb-1">
                Disclaimer: Estimates based on platform averages. Actual results vary.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
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
      icon: <Target size={20} />,
      title: "Niche-Matched Creators",
      desc: "Your brief reaches only creators whose audience matches your target demographic — no spray and pray.",
      wide: false,
    },
    {
      icon: <BarChart3 size={20} />,
      title: "Real-Time Performance Dashboard",
      desc: "Track every video's views, engagement, and ranking live. Make licensing decisions with data, not guesswork.",
      wide: true,
    },
    {
      icon: <Shield size={20} />,
      title: "Full Content Ownership",
      desc: "License any winning video for paid ads, website, or social — with permanent usage rights included.",
      wide: false,
    },
    {
      icon: <Zap size={20} />,
      title: "Zero Follower Minimum",
      desc: "Micro and nano creators often outperform mega-influencers. Our model rewards results, not vanity metrics.",
      wide: false,
    },
    {
      icon: <Share2 size={20} />,
      title: "Multi-Platform Reach",
      desc: "Run campaigns across TikTok, Instagram Reels, and YouTube Shorts simultaneously from one brief.",
      wide: false,
    },
    {
      icon: <Award size={20} />,
      title: "Merit-Based Payouts",
      desc: "Creators are incentivised to make their best work. Higher quality content = higher rankings = bigger prizes.",
      full: true,
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: ICE_DIM, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Sparkles size={13} />} label="Platform Features" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            Built for Brand Results
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55">
            Every feature is designed around one goal: giving your brand the best content, at the lowest cost per result.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {features.map((f: any, i) => (
            <div key={i}
              className={`bento-card rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 flex flex-col ${f.full ? "md:col-span-3 md:flex-row items-stretch" : f.wide ? "md:col-span-2 md:flex-row items-stretch" : "md:col-span-1"}`}
              style={{ background: "#ffffff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = BORDER;
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.05)";
              }}>
              {f.wide || f.full ? (
                <>
                  <div className="p-7 flex-1 flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                      <span className="text-black">{f.icon}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-black mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-black/55">
                      {f.desc}
                    </p>
                  </div>
                  <div className="relative w-full md:w-1/2 min-h-[140px] flex-shrink-0" style={{ background: ICE_DIM }}>
                    <GridBg opacity={0.06} />
                    <BentoVisual step={i} />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative h-36 w-full flex-shrink-0" style={{ background: ICE_DIM }}>
                    <GridBg opacity={0.06} />
                    <BentoVisual step={i} />
                    <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
                      style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
                  </div>
                  <div className="p-6 pt-2.5 flex-1">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center mb-4 flex-shrink-0"
                      style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                      <span className="text-black">{f.icon}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-black mb-2">
                      {f.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-black/55">
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

// ─── Brand Portal Simulator ────────────────────────────────────────────────────
const CREATOR_POOL = [
  { id: 1, name: "@fitbyfiona", views: "2.3M", er: "7.8%", score: 98, briefMatch: "Perfect match for activewear + wellness niche. High engagement.", avatar: "https://i.pravatar.cc/40?img=1", thumbnail: "https://picsum.photos/seed/c1/200/320", licensed: false },
  { id: 2, name: "@zenmove", views: "890K", er: "9.1%", score: 94, briefMatch: "Specialises in lifestyle content — tone aligns with brand voice.", avatar: "https://i.pravatar.cc/40?img=2", thumbnail: "https://picsum.photos/seed/c2/200/320", licensed: false },
  { id: 3, name: "@the.daily.glow", views: "1.1M", er: "6.5%", score: 89, briefMatch: "Skincare & beauty focus. Audience 80% female 18–34.", avatar: "https://i.pravatar.cc/40?img=3", thumbnail: "https://picsum.photos/seed/c3/200/320", licensed: false },
  { id: 4, name: "@runnerspark", views: "440K", er: "11.2%", score: 86, briefMatch: "Micro-creator with exceptional trust. Top comments very positive.", avatar: "https://i.pravatar.cc/40?img=4", thumbnail: "https://picsum.photos/seed/c4/200/320", licensed: false },
];

function BrandPortalSimulator() {
  const containerRef = useRef<HTMLElement>(null);
  const [simStep, setSimStep] = useState<"brief" | "budget" | "launching" | "portal">("brief");
  const [platform, setPlatform] = useState<"tiktok" | "instagram" | "youtube">("tiktok");
  const [niche, setNiche] = useState("Skincare & Beauty");
  const [budget, setBudget] = useState(5000);
  const [creators, setCreators] = useState(CREATOR_POOL);
  const [activeTab, setActiveTab] = useState<"submissions" | "library">("submissions");
  const [selectedCreator, setSelectedCreator] = useState<typeof CREATOR_POOL[0] | null>(null);
  const [syncingAds, setSyncingAds] = useState<Record<number, boolean>>({});

  const briefTexts: Record<string, string> = {
    "Skincare & Beauty": "Create a 30–60 sec video using our Glow Serum. Show your real morning routine. No scripts — just authentic results. Must tag @brand and use #GlowChallenge.",
    "Fitness & Activewear": "Film a workout session wearing our FlexCore leggings. Show range of motion, comfort, and style. Tag us and use #FlexCoreMove.",
    "Craft Food & Beverage": "Make a recipe video featuring our artisan hot sauce. Creative use encouraged. Must show the product label clearly. Use #HeatCreators.",
    "Home & Lifestyle": "Create a 'morning routine' or 'my setup' video naturally incorporating our Ember Candle. Cosy vibes only. Use #EmberHome.",
  };

  const briefText = briefTexts[niche] || briefTexts["Skincare & Beauty"];

  const handleLicenseCreator = (id: number) => {
    setCreators(prev => prev.map(c => c.id === id ? { ...c, licensed: true } : c));
  };

  const simulateLaunch = () => {
    setSimStep("launching");
    setTimeout(() => setSimStep("portal"), 2000);
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            The Brand Portal in Action
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55">
            Try briefing, budgeting, and licensing creator content — all in one place.
          </p>
        </div>

        {/* Simulator Shell */}
        <div className="rounded-3xl overflow-hidden" style={{ background: "#ffffff", border: `1px solid ${BORDER}`, boxShadow: "0 20px 60px rgba(0,0,0,0.06)" }}>
          {/* Mac Chrome */}
          <div className="flex items-center justify-between px-6 py-4"
            style={{ borderBottom: `1px solid ${BORDER}`, background: "#fafafa" }}>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs"
              style={{ background: "#fff", border: `1px solid ${BORDER}`, width: 260 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f] animate-pulse" />
              <span className="text-black/45 select-none font-mono">brand.gameofcreators.com</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Step 1: Brief */}
          {simStep === "brief" && (
            <div className="p-8 grid md:grid-cols-2 gap-8 items-center min-h-[480px]">
              <div>
                <span className="font-heading text-xs font-bold text-black/40 uppercase tracking-wider mb-2 block">Step 1 of 3</span>
                <h3 className="text-2xl font-extrabold text-black mb-4">Draft Your Campaign Brief</h3>
                <p className="text-sm leading-relaxed mb-6 text-black/55">
                  Define the creative requirements, choose your brand niche, and select target social platforms.
                </p>

                <div className="space-y-3 mb-5">
                  <label className="block text-xs font-bold text-black/45 uppercase tracking-wide">Target Platform</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "tiktok", label: "TikTok", icon: <Play size={13} /> },
                      { id: "instagram", label: "Instagram", icon: <Instagram size={13} /> },
                      { id: "youtube", label: "YouTube", icon: <Youtube size={13} /> },
                    ].map((p) => (
                      <button key={p.id} onClick={() => setPlatform(p.id as any)}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer"
                        style={{
                          background: platform === p.id ? "#f5f5f5" : "transparent",
                          borderColor: platform === p.id ? "rgba(0,0,0,0.15)" : BORDER,
                          color: platform === p.id ? BLK : "rgba(0,0,0,0.5)"
                        }}>
                        {p.icon} {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-black/45 uppercase tracking-wide">Niche Focus</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Skincare & Beauty", "Fitness & Activewear", "Craft Food & Beverage", "Home & Lifestyle"].map((n) => (
                      <button key={n} onClick={() => setNiche(n)}
                        className="py-2.5 px-4 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer text-left"
                        style={{
                          background: niche === n ? "#f5f5f5" : "transparent",
                          borderColor: niche === n ? "rgba(0,0,0,0.15)" : BORDER,
                          color: niche === n ? BLK : "rgba(0,0,0,0.5)"
                        }}>
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-3xl p-6 border" style={{ background: ICE_DIM, borderColor: "rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] text-black/40 uppercase font-black tracking-widest mb-3">Live Brief Preview</p>
                <div className="bg-white border rounded-3xl p-4 min-h-[140px] text-sm leading-relaxed text-black"
                  style={{ borderColor: BORDER }}>
                  {briefText}
                  <span className="inline-block w-1.5 h-4 bg-black ml-0.5 animate-pulse" />
                </div>
                <div className="flex gap-2 mt-3">
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-black/5 text-black/50 border"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    {platform.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded bg-black/5 text-black/50 border"
                    style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                    {niche}
                  </span>
                </div>
                <button onClick={() => setSimStep("budget")}
                  className="btn-primary-gradient w-full py-4 rounded-full text-sm flex items-center justify-center gap-2 mt-4">
                  Continue to Budgeting <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Budget */}
          {simStep === "budget" && (
            <div className="p-8 grid md:grid-cols-2 gap-8 items-center min-h-[480px]">
              <div>
                <span className="text-xs font-bold text-black/40 uppercase tracking-wider mb-2 block">Step 2 of 3</span>
                <h3 className="text-2xl font-extrabold text-black mb-4">
                  Set Your Prize Pool
                </h3>
                <p className="text-sm leading-relaxed mb-6 text-black/55">
                  Creators compete for rewards based on content performance. Adjust to set reward distributions.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-black/40 uppercase tracking-wide">Total Prize Pool</span>
                    <span className="font-heading text-3xl font-extrabold text-black">
                      ${budget.toLocaleString()}
                    </span>
                  </div>
                  <input type="range" min="1500" max="15000" step="500" value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, ${BLK} 0%, ${BLK} ${((budget - 1500) / 13500) * 100}%, rgba(0,0,0,0.12) ${((budget - 1500) / 13500) * 100}%, rgba(0,0,0,0.12) 100%)` }} />
                  <div className="flex justify-between text-xs text-black/30">
                    <span>$1,500</span><span>$15,000</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setSimStep("brief")}
                    className="flex-1 border border-black/10 hover:border-black/20 text-black/60 py-3.5 rounded-full text-sm font-bold cursor-pointer transition-all duration-300">
                    ← Back
                  </button>
                  <button onClick={simulateLaunch}
                    className="btn-primary-gradient flex-1 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2">
                    Launch Campaign! <Rocket size={15} />
                  </button>
                </div>
              </div>

              <div className="rounded-3xl p-6 border" style={{ background: ICE_DIM, borderColor: "rgba(0,0,0,0.06)" }}>
                <p className="text-[10px] text-black/40 uppercase font-black tracking-widest mb-4">Reward Structure</p>
                <div className="space-y-3">
                  {[
                    { label: "🥇 1st Place", val: `$${(budget * 0.35).toFixed(0)}`, share: "35% of pool" },
                    { label: "🥈 Top 5 Pool", val: `$${(budget * 0.4 / 5).toFixed(0)} ea`, share: "40% of pool" },
                    { label: "🥉 Top 15 Pool", val: `$${(budget * 0.25 / 15).toFixed(0)} ea`, share: "25% of pool" },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between items-center p-3 rounded-3xl bg-white border"
                      style={{ borderColor: BORDER }}>
                      <div>
                        <p className="text-xs font-bold text-black">{r.label}</p>
                        <p className="text-[9px] text-black/40">{r.share}</p>
                      </div>
                      <span className="font-heading text-base font-extrabold text-black">
                        {r.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Launching */}
          {simStep === "launching" && (
            <div className="p-8 flex flex-col items-center justify-center min-h-[480px] text-center">
              <div className="w-16 h-16 rounded-full border-4 animate-spin mb-6"
                style={{ borderColor: `rgba(0,0,0,0.08) rgba(0,0,0,0.08) rgba(0,0,0,0.08) ${BLK}` }} />
              <h3 className="text-2xl font-extrabold text-black mb-2">
                Matching Creators to Your Brief...
              </h3>
              <p className="text-sm text-black/45 max-w-sm">
                GOC is distributing your campaign to matching creators across TikTok, Instagram and YouTube.
              </p>
            </div>
          )}

          {/* Step 4: Portal */}
          {simStep === "portal" && (
            <div className="flex flex-col min-h-[500px]">
              {/* Dashboard Header */}
              <div className="px-8 py-4 flex items-center justify-between border-b"
                style={{ borderColor: BORDER, background: "#fafafa" }}>
                <div>
                  <h4 className="text-sm font-extrabold text-black">
                    Campaign Manager
                  </h4>
                  <p className="text-[10px] text-black/40 mt-0.5">Active: {niche} Challenge · Prize pool: ${budget.toLocaleString()}</p>
                </div>
                <div className="flex gap-1 p-1 rounded-3xl border" style={{ background: ICE_DIM, borderColor: BORDER }}>
                  {[
                    { key: "submissions", label: `Submissions (${creators.filter(c => !c.licensed).length})` },
                    { key: "library", label: `Licensed (${creators.filter(c => c.licensed).length})` },
                  ].map((tab) => (
                    <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
                      className="px-3.5 py-1 text-[10px] font-black rounded cursor-pointer transition-all duration-200"
                      style={{
                        background: activeTab === tab.key ? "#fff" : "transparent",
                        color: activeTab === tab.key ? BLK : "rgba(0,0,0,0.4)",
                        boxShadow: activeTab === tab.key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                      }}>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-8 flex-1">
                {activeTab === "submissions" && (
                  <div className="space-y-4">
                    {creators.filter(c => !c.licensed).length === 0 ? (
                      <div className="text-center py-16">
                        <CheckCircle2 size={36} className="mx-auto mb-3 text-green-500" />
                        <h5 className="text-base font-extrabold text-black mb-1">All Submissions Processed</h5>
                        <p className="text-xs text-black/45">Check the Licensed tab to push content to ads.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {creators.filter(c => !c.licensed).map((c) => (
                          <div key={c.id} className="rounded-3xl p-4 border flex gap-4 hover:border-black/14 transition-all duration-300"
                            style={{ background: "#fff", borderColor: BORDER, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <div onClick={() => setSelectedCreator(c)}
                              className="w-20 h-28 rounded-full overflow-hidden relative cursor-pointer group flex-shrink-0">
                              <img src={c.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-white/85 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  <Play size={12} className="fill-black text-black translate-x-0.5" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-center gap-1.5 mb-2">
                                  <img src={c.avatar} className="w-5 h-5 rounded-full object-cover border" style={{ borderColor: BORDER }} />
                                  <span className="text-xs font-bold text-black">{c.name}</span>
                                </div>
                                <div className="flex gap-2 mb-2">
                                  <span className="text-[8px] font-black uppercase text-black/50 bg-black/5 px-1.5 py-0.5 rounded">Views: {c.views}</span>
                                  <span className="text-[8px] font-black uppercase text-black/50 bg-black/5 px-1.5 py-0.5 rounded">ER: {c.er}</span>
                                </div>
                                <p className="text-[10px] text-black/50 leading-relaxed line-clamp-2">{c.briefMatch}</p>
                              </div>
                              <div className="flex gap-2 items-center pt-2 border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                                <span className="text-[10px] font-black text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">
                                  Score {c.score}
                                </span>
                                <button onClick={() => handleLicenseCreator(c.id)}
                                  className="ml-auto bg-black hover:bg-neutral-800 text-white font-extrabold text-[10px] px-3.5 py-1.5 rounded-full cursor-pointer transition-colors">
                                  License & Pay
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "library" && (
                  <div className="space-y-4">
                    {creators.filter(c => c.licensed).length === 0 ? (
                      <div className="text-center py-16">
                        <Lock size={36} className="mx-auto mb-3 text-black/20" />
                        <h5 className="text-base font-extrabold text-black mb-1">No Licensed Assets Yet</h5>
                        <p className="text-xs text-black/45">License creator content to push it to your ad platforms.</p>
                      </div>
                    ) : (
                      <div className="grid sm:grid-cols-2 gap-4">
                        {creators.filter(c => c.licensed).map((c) => {
                          const isSyncMeta = syncingAds[c.id + 100];
                          const isSyncTT = syncingAds[c.id + 200];
                          return (
                            <div key={c.id} className="rounded-3xl p-4 border flex gap-4"
                              style={{ background: "#fff", borderColor: BORDER, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                              <div className="w-16 h-24 rounded-full overflow-hidden relative flex-shrink-0">
                                <img src={c.thumbnail} className="w-full h-full object-cover" />
                                <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-white text-[8px]">✓</div>
                              </div>
                              <div className="flex-1 flex flex-col justify-between">
                                <div>
                                  <p className="text-xs font-bold text-black">{c.name} <span className="text-green-600">(Licensed)</span></p>
                                  <p className="text-[9px] text-black/40 mt-0.5">Asset: GOC-USG-{c.id}09</p>
                                  <p className="text-[10px] text-black/55 mt-1.5">Full perpetuity usage rights included.</p>
                                </div>
                                <div className="flex gap-2 pt-2 border-t mt-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                                  <button onClick={() => {
                                    setSyncingAds(prev => ({ ...prev, [c.id + 100]: true }));
                                    setTimeout(() => setSyncingAds(prev => ({ ...prev, [c.id + 100]: false })), 1500);
                                  }} disabled={isSyncMeta}
                                    className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] py-1.5 px-2 rounded-full cursor-pointer disabled:opacity-50">
                                    {isSyncMeta ? "Syncing..." : "Sync Meta Ads"}
                                  </button>
                                  <button onClick={() => {
                                    setSyncingAds(prev => ({ ...prev, [c.id + 200]: true }));
                                    setTimeout(() => setSyncingAds(prev => ({ ...prev, [c.id + 200]: false })), 1500);
                                  }} disabled={isSyncTT}
                                    className="flex-1 flex items-center justify-center gap-1 bg-black border text-white font-bold text-[9px] py-1.5 px-2 rounded-full cursor-pointer disabled:opacity-50"
                                    style={{ borderColor: "rgba(0,0,0,0.2)" }}>
                                    {isSyncTT ? "Syncing..." : "Sync TikTok"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="p-4 border-t flex justify-end" style={{ borderColor: BORDER, background: "#fafafa" }}>
                <button onClick={() => { setSimStep("brief"); setCreators(CREATOR_POOL); }}
                  className="text-xs text-black/35 hover:text-black transition-colors cursor-pointer">
                  Reset Demo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Video Lightbox */}
      {selectedCreator && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCreator(null)}>
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-black border"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
            onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedCreator(null)}
              className="absolute top-3 right-3 z-50 w-8 h-8 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center cursor-pointer">
              <X size={16} />
            </button>
            <img src={selectedCreator.thumbnail} className="w-full aspect-[9/16] object-cover" />
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Integrations ─────────────────────────────────────────────────────────────
function Integrations() {
  const ref = useRef<HTMLDivElement>(null);

  const platforms = [
    { name: "Instagram", icon: <Instagram size={20} />, color: "#E1306C" },
    { name: "TikTok", icon: <Play size={20} />, color: "#000000" },
    { name: "YouTube", icon: <Youtube size={20} />, color: "#FF0000" },
    { name: "Facebook", icon: <Facebook size={20} />, color: "#1877F2" },
    { name: "Twitter / X", icon: <Twitter size={20} />, color: "#1DA1F2" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, color: "#0A66C2" },
  ];

  const tools = [
    "Shopify", "WooCommerce", "Stripe", "PayPal", "Mailchimp", "HubSpot",
    "Google Analytics", "Zapier", "Slack", "Discord", "Notion", "Airtable"
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            Connect Your Stack
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55">
            GOC plugs into your existing workflow — from campaign launch to ads delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-3xl p-8" style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            <h3 className="text-lg font-extrabold text-black mb-6 flex items-center gap-2">
              <Share2 size={18} className="text-black/60" /> Social Platforms
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((p) => (
                <div key={p.name}
                  className="flex items-center gap-3 p-3.5 rounded-3xl transition-all duration-300 cursor-pointer"
                  style={{ background: "#f9fafb", border: `1px solid ${BORDER}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${p.color}10`;
                    e.currentTarget.style.borderColor = `${p.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9fafb";
                    e.currentTarget.style.borderColor = BORDER;
                  }}>
                  <div style={{ color: p.color }}>{p.icon}</div>
                  <span className="text-sm font-semibold text-black/80">{p.name}</span>
                  <CheckCircle2 size={14} className="ml-auto text-green-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl p-8" style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            <h3 className="text-lg font-extrabold text-black mb-6 flex items-center gap-2">
              <Briefcase size={18} className="text-black/60" /> Business Tools
            </h3>
            <div className="flex flex-wrap gap-2">
              {tools.map((tool) => (
                <div key={tool}
                  className="px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer"
                  style={{ background: "#f1f5f9", border: `1px solid ${BORDER}`, color: "#555" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = ICE;
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.12)";
                    e.currentTarget.style.color = BLK;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f1f5f9";
                    e.currentTarget.style.borderColor = BORDER;
                    e.currentTarget.style.color = "#555";
                  }}>
                  {tool}
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t" style={{ borderColor: BORDER }}>
              <p className="text-sm text-black/45">
                + Custom API integrations for enterprise campaigns
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const ref = useRef<HTMLDivElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is GOC different from influencer marketing?",
      answer: "GOC is fully performance-based and merit-driven. You don't pay for followers — you set a prize pool and creators compete based on actual content quality and engagement. Only the best content gets rewarded, making it far more efficient than paying influencers upfront.",
    },
    {
      question: "Do I need a big budget to run a campaign?",
      answer: "No. You can start a campaign with as little as $1,000 as your prize pool. There are no platform subscription fees — you pay only what you set as the prize. This makes GOC accessible to brands of all sizes.",
    },
    {
      question: "Do I own the content creators submit?",
      answer: "Yes. When you license a creator's content, you get full perpetual usage rights. You can repurpose the video in paid ads, on your website, in email campaigns, and across all social platforms — forever.",
    },
    {
      question: "How do creators get matched to my campaign?",
      answer: "When you submit a brief, GOC broadcasts it to relevant creators based on niche, audience demographics, platform specialisation, and past performance. Only creators who fit your criteria can participate.",
    },
    {
      question: "What platforms do creators post on?",
      answer: "Instagram Reels, TikTok, and YouTube Shorts are the primary platforms. You choose which platforms you want content for in your brief. Analytics are unified across all channels.",
    },
    {
      question: "How do payouts work for creators?",
      answer: "Creators earn from your prize pool based on content ranking — determined by real engagement metrics. The top creator earns the largest share, followed by top 5, top 15, and so on. Payouts are processed through the GOC platform automatically.",
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            Common Questions
          </h2>
          <p className="text-lg text-black/55">
            Everything you need to know before launching your first campaign.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-3xl overflow-hidden transition-all duration-300"
              style={{
                background: openIdx === idx ? ICE_DIM : "#fafafa",
                border: `1px solid ${openIdx === idx ? "rgba(0,0,0,0.1)" : BORDER}`,
              }}>
              <button onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left">
                <span className="font-heading text-base font-bold text-black pr-4">
                  {faq.question}
                </span>
                <ChevronRight size={18} className="flex-shrink-0 transition-all duration-300"
                  style={{ color: openIdx === idx ? BLK : "rgba(0,0,0,0.3)", transform: openIdx === idx ? "rotate(90deg)" : "none" }} />
              </button>
              <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: openIdx === idx ? "200px" : "0" }}>
                <p className="px-6 pb-5 text-base leading-relaxed text-black/60">
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

          {/* Ice blue glow top */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 rounded-full pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${ICE} 0%, transparent 70%)`, opacity: 0.12, filter: "blur(30px)" }} />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
              style={{ background: ICE, boxShadow: `0 8px 24px rgba(209,248,255,0.25)` }}>
              <Rocket size={28} className="text-black" />
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              Ready to Launch Your<br />First Campaign?
            </h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10"
              style={{ color: "rgba(255,255,255,0.6)" }}>
              Join 500+ brands using Game of Creators to get authentic UGC at scale — and pay only for results.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base transition-all duration-300"
                style={{ background: "#ffffff", color: BLK, boxShadow: "0 8px 24px rgba(255,255,255,0.15)" }}>
                <span>Launch Your Campaign</span>
                <ArrowRight size={18} />
              </button>
              <button className="flex items-center gap-2.5 px-8 py-5 rounded-full font-bold text-base transition-all duration-300"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
                <Calendar size={18} /> Book a Demo
              </button>
            </div>

            <p className="mt-8 text-sm" style={{ color: "rgba(255,255,255,0.35)" }}>
              No subscription fees · No minimums · Only pay the prize pool you set
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer is imported from ../App

// ─── Social Proof ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote: "We ran a 2-week campaign with a $4,000 prize pool and got 31 videos. The top 3 alone generated over 8 million combined views. We licensed all three for under $150 each in prize money.",
    name: "Priya Mehta",
    role: "Head of Growth · Lumina Skincare",
    avatar: "https://i.pravatar.cc/80?img=47",
    stats: [{ val: "8M+", label: "Views" }, { val: "31", label: "Videos" }, { val: "$4K", label: "Budget" }],
  },
  {
    quote: "GOC gave us something no influencer campaign ever could — variety. 40+ different creators, 40+ angles. We A/B tested them in Meta Ads and found our winning creative in 48 hours.",
    name: "Jordan Ellis",
    role: "Brand Director · DriftCo Athletics",
    avatar: "https://i.pravatar.cc/80?img=12",
    stats: [{ val: "40+", label: "Creatives" }, { val: "48h", label: "To winning ad" }, { val: "3.2×", label: "ROAS lift" }],
  },
  {
    quote: "The content quality blew us away. Micro-creators with 5,000 followers outperformed our paid influencer — because they actually care. That's the GOC difference.",
    name: "Ananya Rao",
    role: "Founder · Brewlabs Cold Brew",
    avatar: "https://i.pravatar.cc/80?img=32",
    stats: [{ val: "5K", label: "Follower creator" }, { val: "#1", label: "Ranked submission" }, { val: "2.4M", label: "Views earned" }],
  },
];

const METRICS = [
  { val: "8,000+", label: "Active Creators", icon: <Users size={20} /> },
  { val: "$2.1M", label: "Creator Prizes Paid", icon: <DollarSign size={20} /> },
  { val: "500+", label: "Brand Campaigns Run", icon: <Trophy size={20} /> },
  { val: "98%", label: "Brand Satisfaction", icon: <Star size={20} /> },
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
          <Badge icon={<Star size={13} />} label="Social Proof" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            What Brands Say About GOC
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55">
            Real results from real campaigns. No agencies, no guesswork.
          </p>
        </div>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {METRICS.map((m, i) => (
            <div key={i} className="metric-card rounded-3xl p-6 text-center"
              style={{ background: i % 2 === 0 ? ICE_DIM : "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3"
                style={{ background: i % 2 === 0 ? ICE : ICE_DIM }}>
                <span className="text-black">{m.icon}</span>
              </div>
              <p className="font-heading text-3xl font-extrabold text-black mb-1">{m.val}</p>
              <p className="text-xs text-black/45 font-medium">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonial Carousel */}
        <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background: ICE_DIM, border: `1px solid ${BORDER}`, boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}>

          {/* Quote content */}
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6 leading-none" style={{ color: ICE, fontFamily: "Georgia, serif" }}>"</div>
            <p className="font-heading text-xl md:text-2xl font-medium leading-relaxed text-black mb-8">
              {t.quote}
            </p>

            {/* Stats chips */}
            <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
              {t.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 px-4 py-2 rounded-full"
                  style={{ background: "#fff", border: `1px solid ${BORDER}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                  <span className="font-heading text-lg font-extrabold text-black">{s.val}</span>
                  <span className="text-xs text-black/45 font-medium">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Author */}
            <div className="flex items-center justify-center gap-3">
              <img src={t.avatar} className="w-12 h-12 rounded-full border-2" style={{ borderColor: ICE }} />
              <div className="text-left">
                <p className="font-heading text-sm font-extrabold text-black">{t.name}</p>
                <p className="text-xs text-black/45">{t.role}</p>
              </div>
            </div>
          </div>

          {/* Dot navigation */}
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

// ─── Brand Protection & Security ──────────────────────────────────────────────
function BrandProtection() {
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
      icon: <Shield size={22} />,
      title: "Full IP Ownership",
      desc: "Every video you license transfers full intellectual property rights to your brand. Use it in any channel, any time, forever — with no additional licensing fees.",
      badge: "Perpetual License",
    },
    {
      icon: <CheckCircle2 size={22} />,
      title: "Brief Compliance Moderation",
      desc: "All submitted content is reviewed against your brief before ranking. Off-brief, inappropriate, or low-quality content is flagged and withheld from your dashboard.",
      badge: "Human + AI Review",
    },
    {
      icon: <Lock size={22} />,
      title: "Brand-Safe Content Only",
      desc: "Creators agree to GOC's content standards before participating. No competitor mentions, no prohibited claims, no copyright violations — enforced contractually.",
      badge: "Legal Safeguards",
    },
    {
      icon: <Eye size={22} />,
      title: "Transparent Performance Data",
      desc: "All view counts, engagement rates, and ranking scores are pulled directly from platform APIs — not self-reported by creators. 100% verifiable.",
      badge: "API-Verified Metrics",
    },
    {
      icon: <DollarSign size={22} />,
      title: "Secure Escrow Payouts",
      desc: "Prize money is held in secure escrow and only released to creators after you approve and license their content. Zero financial risk before you decide.",
      badge: "Escrow Protected",
    },
    {
      icon: <Users size={22} />,
      title: "Creator Identity Verification",
      desc: "All creators on GOC are verified with real identity and payment information. No bots, no fake accounts, no purchased followers — ever.",
      badge: "ID Verified",
    },
  ];

  return (
    <section ref={ref} className="py-24 px-6 relative overflow-hidden" style={{ background: ICE_DIM, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge icon={<Shield size={13} />} label="Brand Protection" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-5">
            Your Brand Is Protected
          </h2>
          <p className="text-lg max-w-xl mx-auto text-black/55">
            We built GOC to be the safest way for a brand to run creator campaigns — legally, financially, and reputationally.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {protections.map((p, i) => (
            <div key={i} className="protect-card rounded-3xl p-7 group transition-all duration-300 hover:-translate-y-1"
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
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: ICE_DIM, border: `1px solid rgba(0,0,0,0.06)` }}>
                  <span className="text-black">{p.icon}</span>
                </div>
                <div className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  style={{ background: "#f5f5f5", border: `1px solid rgba(0,0,0,0.08)`, color: BLK }}>
                  {p.badge}
                </div>
              </div>
              <h3 className="text-lg font-extrabold text-black mb-2">
                {p.title}
              </h3>
              <p className="text-sm leading-relaxed text-black/55">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Trust strip */}
        <div className="mt-10 rounded-full px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ background: BLK, border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: ICE }}>
              <Shield size={22} className="text-black" />
            </div>
            <div>
              <p className="font-heading font-extrabold text-white text-sm">
                Enterprise-grade compliance, startup-friendly pricing.
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                GOC content agreements are reviewed and enforced under Indian and international IP law.
              </p>
            </div>
          </div>
          <button className="flex-shrink-0 flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm transition-all duration-300 whitespace-nowrap"
            style={{ background: "#ffffff", color: BLK }}>
            View Legal Framework <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function BrandPage() {
  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Nav />
      <BrandHero />
      <TrustBar />
      <WhyGOC />
      <HowItWorks />
      <ROICalculator />
      <FeaturesBento />
      <BrandPortalSimulator />
      <Integrations />
      <SocialProof />
      <BrandProtection />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}
