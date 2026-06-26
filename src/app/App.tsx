import { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { RouterProvider, Link, useNavigate } from "react-router";
import { router } from "./routes";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
export { Nav, Footer };
import GOCLogo from "../imports/GOC-Logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import {
  Trophy, Zap, Users, TrendingUp, Star, ChevronDown, ArrowRight,
  Play, Check, Globe, Sparkles, Target, Award, BarChart3, Camera,
  DollarSign, Shield, Menu, X, Instagram, Youtube, Twitter,
  ChevronRight, Flame, Crown, Rocket, ArrowUpRight, Facebook,
  Clock, Calendar,
} from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const AMBER = "#000000";
const AMBER_DARK = "#000000";

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, prefix = "", suffix = "", duration = 2 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { value: 0 };

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (startedRef.current) return;
        startedRef.current = true;
        gsap.to(obj, {
          value: target,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = prefix + (Number.isInteger(target)
              ? Math.round(obj.value).toLocaleString()
              : obj.value.toFixed(1)) + suffix;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [target, prefix, suffix, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

// ─── SVG Decorations ──────────────────────────────────────────────────────────
function HeroOrb({ size = 400, opacity = 0.18, blur = 60 }: { size?: number; opacity?: number; blur?: number }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" style={{ opacity: opacity * 0.8 }}>
      <defs>
        <radialGradient id="orb-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#d1f8ff" stopOpacity="1" />
          <stop offset="60%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="orb-blur">
          <feGaussianBlur stdDeviation={blur / 4} />
        </filter>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#orb-grad)" filter="url(#orb-blur)" />
    </svg>
  );
}

function GridSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
        </pattern>
        <radialGradient id="grid-mask" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="grid-fade">
          <rect width="100%" height="100%" fill="url(#grid-mask)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" mask="url(#grid-fade)" />
    </svg>
  );
}

function FloatingParticle({ x, y, size, delay, duration }: {
  x: string; y: string; size: number; delay: number; duration: number;
}) {
  const ref = useRef<SVGCircleElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      y: -30 - Math.random() * 40,
      x: (Math.random() - 0.5) * 20,
      opacity: 0,
      duration,
      delay,
      ease: "power1.out",
      repeat: -1,
      repeatDelay: Math.random() * 3,
      onRepeat: () => gsap.set(ref.current, { y: 0, opacity: Math.random() * 0.6 + 0.2 }),
    });
  }, [delay, duration]);

  return (
    <svg
      className="absolute pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
    >
      <circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={size / 2}
        fill="#ffffff"
        opacity={0.5}
      />
    </svg>
  );
}

function SparkleSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill={AMBER} />
    </svg>
  );
}

function TrophySVG({ size = 80 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <defs>
        <linearGradient id="trophy-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="50%" stopColor="#d1f8ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <filter id="trophy-glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d="M20 8 H60 V36 C60 52 50 60 40 64 C30 60 20 52 20 36 Z" fill="url(#trophy-grad)" filter="url(#trophy-glow)" opacity="0.9" />
      <path d="M8 8 H22 V28 C18 28 12 24 8 16 Z" fill="url(#trophy-grad)" opacity="0.6" />
      <path d="M72 8 H58 V28 C62 28 68 24 72 16 Z" fill="url(#trophy-grad)" opacity="0.6" />
      <rect x="32" y="64" width="16" height="6" fill="url(#trophy-grad)" opacity="0.8" />
      <rect x="26" y="70" width="28" height="4" rx="2" fill="url(#trophy-grad)" opacity="0.8" />
      <path d="M35 36 L38 30 L40 34 L43 28 L45 36" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function WaveDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`} style={{ height: 60 }}>
      <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z"
          fill="var(--background)" />
      </svg>
    </div>
  );
}

// Nav is imported from components/Nav

// ─── Hero ─────────────────────────────────────────────────────────────────────
// ─── Brand marquee ────────────────────────────────────────────────────────────
const BRANDS = [
  { name: "NovaSport",  icon: <Zap size={14} /> },
  { name: "Lumina",     icon: <Sparkles size={14} /> },
  { name: "Brewlabs",   icon: <Star size={14} /> },
  { name: "PixelApp",   icon: <Target size={14} /> },
  { name: "DriftCo",    icon: <TrendingUp size={14} /> },
  { name: "OakWear",    icon: <Globe size={14} /> },
  { name: "FlareMob",   icon: <Flame size={14} /> },
  { name: "StellarFX",  icon: <Award size={14} /> },
];

function BrandMarquee() {
  const trackRef  = useRef<HTMLDivElement>(null);
  const tweenRef  = useRef<gsap.core.Tween | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Duplicate items so the loop is seamless
    const totalW = track.scrollWidth / 2;

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(track, {
        x: `-=${totalW}`,
        duration: 22,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => parseFloat(x) % totalW),
        },
      });

      // Fade the whole section in on scroll
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%" } }
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const pause  = () => tweenRef.current?.pause();
  const resume = () => tweenRef.current?.resume();

  return (
    <div ref={sectionRef} className="mt-24 select-none" style={{ opacity: 0 }}>
      {/* Label */}
      <p className="text-center mb-10 text-xs font-semibold tracking-[0.22em] uppercase"
        style={{ color: "rgba(0,0,0,0.35)", fontFamily: "'DM Sans', sans-serif" }}>
        Trusted by leading brands
      </p>

      {/* Fade masks on edges */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, rgba(209,248,255,1) 0%, rgba(209,248,255,0) 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, rgba(209,248,255,1) 0%, rgba(209,248,255,0) 100%)" }} />

        {/* Scrolling track — doubled for seamless loop */}
        <div
          ref={trackRef}
          className="flex items-center"
          style={{ width: "max-content", willChange: "transform" }}
          onMouseEnter={pause}
          onMouseLeave={() => { setHoveredIdx(null); resume(); }}
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 cursor-pointer transition-all duration-300"
                style={{ padding: "10px 36px" }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Separator dot */}
                {i > 0 && (
                  <span className="w-1 h-1 rounded-full mr-6 flex-shrink-0"
                    style={{ background: "rgba(0,0,0,0.15)", marginLeft: -28 }} />
                )}

                {/* Icon */}
                <span className="transition-all duration-300 flex-shrink-0"
                  style={{ color: isHovered ? "#000000" : "rgba(0,0,0,0.3)" }}>
                  {brand.icon}
                </span>

                {/* Name */}
                <span
                  className="font-bold tracking-[0.15em] uppercase text-sm transition-all duration-300 whitespace-nowrap"
                  style={{
                    fontFamily: "'Bricolage Grotesque', sans-serif",
                    color: isHovered ? "#000000" : "rgba(0,0,0,0.35)",
                    textShadow: isHovered ? "0 0 20px rgba(0,0,0,0.1)" : "none",
                    letterSpacing: "0.15em",
                  }}
                >
                  {brand.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Animated line chart inside dashboard ────────────────────────────────��────
const CHART_LINE = "M0,50 C30,45 60,20 90,30 C120,40 150,10 180,15 C210,20 240,35 270,22 L300,18";
const CHART_AREA = `${CHART_LINE} L300,62 L0,62 Z`;
const CHART_DOTS = [{x:0,y:50},{x:90,y:30},{x:150,y:10},{x:210,y:20},{x:270,y:22},{x:300,y:18}];

function HeroDashboard() {
  // Animated stat counters
  const [campaigns, setCampaigns]   = useState(0);
  const [submissions, setSubmissions] = useState(0);
  const [creators, setCreators]     = useState(0);
  const [roi, setRoi]               = useState(0);
  const [liveCount, setLiveCount]   = useState(47);
  const [activeNav, setActiveNav]   = useState("Dashboard");
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  // Chart animation refs
  const lineRef     = useRef<SVGPathElement>(null);
  const areaRef     = useRef<SVGPathElement>(null);
  const dotsRef     = useRef<(SVGCircleElement | null)[]>([]);
  const dotPulseRef = useRef<(SVGCircleElement | null)[]>([]);
  const dashboardRef  = useRef<HTMLDivElement>(null);
  const tickerRef   = useRef<any>(null);

  useEffect(() => {
    let hasRun = false;
    let rafId: number;

    const trigger = ScrollTrigger.create({
      trigger: dashboardRef.current,
      start: "top 85%", // Trigger when the top of the dashboard hits 85% of the viewport height
      onEnter: () => {
        if (!hasRun) {
          hasRun = true;
          // Wait two frames so the SVG is fully painted before getTotalLength
          rafId = requestAnimationFrame(() =>
            requestAnimationFrame(() => runAnimations())
          );
        }
      }
    });

    return () => {
      trigger.kill();
      if (rafId) cancelAnimationFrame(rafId);
      if (tickerRef.current) clearInterval(tickerRef.current);
      if (lineRef.current) gsap.killTweensOf(lineRef.current);
      if (areaRef.current) gsap.killTweensOf(areaRef.current);
      dotsRef.current.forEach(d => d && gsap.killTweensOf(d));
      dotPulseRef.current.forEach(d => d && gsap.killTweensOf(d));
    };
  }, []);

  function runAnimations() {
    const DELAY = 0.2; // Start shortly after coming into view

    // ── Counters ──────────────────────────────────────────
    const obj = { c: 0, s: 0, cr: 0, r: 0 };
    gsap.to(obj, {
      c: 12, s: 1847, cr: 412, r: 3.8,
      duration: 2, delay: DELAY, ease: "power2.out",
      onUpdate() {
        setCampaigns(Math.round(obj.c));
        setSubmissions(Math.round(obj.s));
        setCreators(Math.round(obj.cr));
        setRoi(parseFloat(obj.r.toFixed(1)));
      },
    });

    // ── Chart line draw via stroke-dashoffset ─────────────
    const line = lineRef.current;
    const area = areaRef.current;
    if (line && area) {
      const len = line.getTotalLength() || 420;

      // Hide everything first
      gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      gsap.set(area, { opacity: 0 });
      CHART_DOTS.forEach(({ x, y }, i) => {
        const d = dotsRef.current[i];
        const p = dotPulseRef.current[i];
        if (d) gsap.set(d, { scale: 0, opacity: 0, svgOrigin: `${x} ${y}` });
        if (p) gsap.set(p, { scale: 0, opacity: 0, svgOrigin: `${x} ${y}` });
      });

      const tl = gsap.timeline({ delay: DELAY + 0.15 });

      // 1. Draw line left → right
      tl.to(line, { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" })

      // 2. Area fill fades in as line finishes
        .to(area, { opacity: 1, duration: 0.6, ease: "power1.out" }, "-=0.5")

      // 3. Dots spring in one by one
        .to(dotsRef.current.filter(Boolean), {
          scale: 1, opacity: 1,
          stagger: 0.14, duration: 0.3, ease: "back.out(2.5)",
        }, "-=0.5")

      // 4. Start pulse rings looping after dots appear
        .call(() => {
          CHART_DOTS.forEach(({ x, y }, i) => {
            const d = dotPulseRef.current[i];
            if (!d) return;
            gsap.fromTo(d,
              { scale: 1, opacity: 0.7, svgOrigin: `${x} ${y}` },
              {
                scale: 3.8, opacity: 0,
                duration: 1.4, ease: "power1.out",
                repeat: -1, delay: i * 0.25,
              }
            );
          });
        });
    }

    // ── Live submission ticker ─────────────────────────────
    let count = 47;
    tickerRef.current = setInterval(() => {
      count += Math.floor(Math.random() * 3) + 1;
      setLiveCount(count);
    }, 2500);
  }

  const stats = [
    { label: "Campaigns",   val: campaigns,    display: String(campaigns),      delta: "+3",    color: AMBER,     delayIdx: 0 },
    { label: "Submissions", val: submissions,   display: submissions.toLocaleString(), delta: "+234",  color: AMBER, delayIdx: 1 },
    { label: "Creators",    val: creators,      display: String(creators),       delta: "+58",   color: AMBER, delayIdx: 2 },
    { label: "ROI",         val: roi,           display: `${roi}×`,              delta: "+0.4",  color: AMBER, delayIdx: 3 },
  ];

  const navItems = ["Dashboard", "Campaigns", "Submissions", "Analytics", "Rewards"];

  return (
    <div ref={dashboardRef}>
      {/* Amber top border line */}
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)` }} />

      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)", background: "#ffffff" }}>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: "#ef4444" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#f59e0b" }} />
          <div className="w-3 h-3 rounded-full" style={{ background: "#22c55e" }} />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-6 rounded-md px-3 flex items-center" style={{ background: "#d1f8ff", border: "1px solid rgba(0,0,0,0.08)", maxWidth: 280 }}>
            <div className="w-1.5 h-1.5 rounded-full mr-2 animate-pulse" style={{ background: "#000000" }} />
            <span className="text-xs" style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>app.gameofcreators.com</span>
          </div>
        </div>
      </div>

      {/* App layout */}
      <div className="grid grid-cols-4" style={{ minHeight: 340 }}>

        {/* ── Sidebar ────────────────────────────────────── */}
        <div className="col-span-1 p-4 flex flex-col gap-0.5" style={{ borderRight: "1px solid rgba(0,0,0,0.08)", background: "#ffffff" }}>
          {/* Logo */}
          <div className="flex items-center px-2 mb-5">
            <img
              src={GOCLogo}
              alt="Game of Creators"
              style={{ height: 22, width: "auto", filter: "brightness(0)" }}
            />
          </div>

          {/* Nav items — clickable */}
          {navItems.map((label) => {
            const active = activeNav === label;
            return (
              <button key={label} onClick={() => setActiveNav(label)}
                className="px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-all duration-200 text-left w-full"
                style={{
                  background: active ? "#d1f8ff" : "transparent",
                  color: active ? "#000000" : "rgba(0,0,0,0.5)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: active ? 600 : 400,
                  border: "1px solid transparent",
                }}>
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-200"
                  style={{ background: active ? "#000000" : "rgba(0,0,0,0.15)", boxShadow: "none" }} />
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Main content ───────────────────────────────── */}
        <div className="col-span-3 p-5 flex flex-col gap-4">

          {/* Header row */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Good Morning, Alex 👋
              </p>
              <p className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
                3 active campaigns ·{" "}
                <span className="font-semibold tabular-nums" style={{ color: "#000000" }}>{liveCount}</span>
                {" "}new submissions today
                <span className="w-1 h-1 rounded-full animate-pulse" style={{ background: "#000000" }} />
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold text-black border border-black/10"
              style={{ background: "#d1f8ff", fontFamily: "'Bricolage Grotesque', sans-serif" }}>A</div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-2">
            {stats.map(({ label, display, delta, color }, i) => (
              <div key={label}
                className="rounded-xl p-3 cursor-pointer transition-all duration-200 relative overflow-hidden"
                style={{
                  background: hoveredStat === i ? "#d1f8ff" : "#ffffff",
                  border: "1px solid rgba(0,0,0,0.08)",
                  transform: hoveredStat === i ? "translateY(-2px) scale(1.03)" : "none",
                  boxShadow: hoveredStat === i ? "0 8px 24px rgba(0,0,0,0.05)" : "0 2px 8px rgba(0,0,0,0.02)",
                }}
                onMouseEnter={() => setHoveredStat(i)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <p className="text-xs mb-1.5" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                <p className="text-base font-extrabold tabular-nums text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{display}</p>
                <p className="text-xs mt-1 font-semibold tabular-nums" style={{ color, fontFamily: "'DM Sans', sans-serif" }}>{delta}</p>
              </div>
            ))}
          </div>

          {/* Animated chart */}
          <div className="rounded-xl p-3 relative" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-bold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Submission Volume</p>
              <span className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                style={{ background: "#d1f8ff", color: "#000000", border: "1px solid rgba(0,0,0,0.1)", fontFamily: "'DM Sans', sans-serif" }}>
                This Week
              </span>
            </div>

            <svg viewBox="0 0 300 65" fill="none" className="w-full overflow-visible" style={{ height: 65 }}>
              <defs>
                <linearGradient id="dash-area-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d1f8ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>
                <filter id="dot-glow">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Y-axis guide lines */}
              {[15, 35, 55].map(y => (
                <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
              ))}

              {/* Area fill */}
              <path ref={areaRef} d={CHART_AREA} fill="url(#dash-area-fill)" style={{ opacity: 0 }} />

              {/* Line — drawn via dashoffset */}
              <path ref={lineRef} d={CHART_LINE}
                stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                fill="none" style={{ opacity: 0 }} />

              {/* Dots with pulse rings */}
              {CHART_DOTS.map(({ x, y }, i) => (
                <g key={i}>
                  {/* Pulse ring */}
                  <circle
                    ref={el => { dotPulseRef.current[i] = el; }}
                    cx={x} cy={y} r="4"
                    fill="none" stroke="#000000" strokeWidth="1.5"
                    style={{ opacity: 0, transformOrigin: `${x}px ${y}px` }}
                  />
                  {/* Dot */}
                  <circle
                    ref={el => { dotsRef.current[i] = el; }}
                    cx={x} cy={y} r="3.5"
                    fill="#000000"
                    style={{ transformOrigin: `${x}px ${y}px`, opacity: 0 }}
                  />
                  {/* White centre */}
                  <circle cx={x} cy={y} r="1.2" fill="white" style={{ opacity: 0.9 }} />
                </g>
              ))}
            </svg>
          </div>

          {/* Active campaign row */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl cursor-pointer group transition-all duration-200"
            style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 16px rgba(0,0,0,0.02)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#000000"; e.currentTarget.style.background = "rgba(209,248,255,0.4)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.02)"; }}>
            <div className="flex items-center gap-3">
              {/* Campaign thumbnail placeholder */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#d1f8ff", border: "1px solid rgba(0,0,0,0.08)" }}>
                <Flame size={14} style={{ color: "#000000" }} />
              </div>
              <div>
                <p className="text-xs font-bold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>Summer Vibes Challenge</p>
                <p className="text-xs" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
                  <span className="tabular-nums">{submissions > 0 ? Math.min(submissions > 342 ? 342 : submissions, 342).toLocaleString() : "342"}</span> submissions · 8 days left
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold" style={{ color: "#000000", fontFamily: "'Bricolage Grotesque', sans-serif" }}>$2,500</span>
              <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#000000" }} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function Hero({ onBrowse }: { onBrowse?: () => void }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);

  const particles = Array.from({ length: 18 }, (_, i) => ({
    x: `${8 + Math.random() * 84}%`,
    y: `${20 + Math.random() * 65}%`,
    size: 3 + Math.random() * 5,
    delay: i * 0.35,
    duration: 3 + Math.random() * 4,
  }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badgeRef.current, { opacity: 0, y: 20, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.7 }, 0.3)
        .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, 0.55)
        .fromTo(subRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.7 }, 0.8)
        .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 1.0)
        .fromTo(dashRef.current, { opacity: 0, y: 60, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1 }, 1.1);

      // Orb slow float
      if (orbRef.current) {
        gsap.to(orbRef.current, {
          y: -30, duration: 6, ease: "sine.inOut", repeat: -1, yoyo: true,
        });
      }

      // Sparkle SVGs
      gsap.utils.toArray<Element>(".hero-sparkle").forEach((el, i) => {
        gsap.to(el, {
          rotate: 360, duration: 8 + i * 2, ease: "linear", repeat: -1,
        });
        gsap.to(el, {
          y: -10, duration: 3 + i, ease: "sine.inOut", repeat: -1, yoyo: true, delay: i * 0.5,
        });
      });

      // Dashboard stat counters pulse
      gsap.utils.toArray<Element>(".dash-stat").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 10 }, {
          opacity: 1, y: 0, duration: 0.5, delay: 1.4 + i * 0.12, ease: "power2.out",
        });
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cursorGlowRef.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    gsap.to(cursorGlowRef.current, {
      left: x - 150, top: y - 150,
      duration: 0.6, ease: "power2.out",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ background: "radial-gradient(circle at 50% 120%, rgba(209, 248, 255, 0.25) 0%, #ffffff 80%)" }}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor glow */}
      <div
        ref={cursorGlowRef}
        className="absolute pointer-events-none rounded-full"
        style={{ width: 300, height: 300, background: "radial-gradient(circle, rgba(209,248,255,0.15) 0%, transparent 70%)", filter: "blur(20px)" }}
      />

      {/* Background amber glow */}
      <div ref={orbRef} className="absolute pointer-events-none" style={{ bottom: "-15%", left: "50%", transform: "translateX(-50%)", width: 900, height: 600 }}>
        <HeroOrb size={900} opacity={0.22} blur={80} />
      </div>

      {/* Secondary glow top right */}
      <div className="absolute top-20 right-0 pointer-events-none opacity-10">
        <HeroOrb size={400} opacity={1} blur={60} />
      </div>

      <GridSVG />

      {/* Floating particles */}
      {particles.map((p, i) => <FloatingParticle key={i} {...p} />)}

      {/* Sparkle decorations */}
      <SparkleSVG className="hero-sparkle absolute top-32 left-16 opacity-60" />
      <SparkleSVG className="hero-sparkle absolute top-48 right-24 opacity-40" style={{ width: 14, height: 14 } as React.CSSProperties} />
      <SparkleSVG className="hero-sparkle absolute bottom-72 left-32 opacity-30" style={{ width: 12, height: 12 } as React.CSSProperties} />
      <SparkleSVG className="hero-sparkle absolute top-64 right-48 opacity-50" style={{ width: 16, height: 16 } as React.CSSProperties} />

      {/* Animated ring */}
      <div className="absolute pointer-events-none" style={{ bottom: "8%", left: "50%", transform: "translateX(-50%)" }}>
        <svg width="1000" height="200" viewBox="0 0 1000 200" fill="none" opacity="0.12">
          <ellipse cx="500" cy="180" rx="480" ry="60" stroke={AMBER} strokeWidth="1" strokeDasharray="8 4" />
          <ellipse cx="500" cy="180" rx="340" ry="40" stroke={AMBER} strokeWidth="0.5" strokeDasharray="5 8" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-16">
        {/* Badge */}
        <div ref={badgeRef} className="group inline-flex items-center gap-2.5 rounded-full p-1 pr-4 mb-8 text-xs font-medium transition-all duration-300 cursor-pointer"
          style={{ 
            background: "#ffffff", 
            border: "1px solid rgba(0, 0, 0, 0.08)", 
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255, 255, 255, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)";
            e.currentTarget.style.background = "rgba(209, 248, 255, 0.2)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255, 255, 255, 1)";
          }}
        >
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300"
            style={{ 
              background: "#000000",
              color: "#ffffff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)"
            }}>
            <Flame size={11} className="fill-white" />
            Contests
          </span>
          <span className="flex items-center gap-1 text-black/80 font-medium tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Contest-Driven Creator Marketing
            <ArrowUpRight size={13} className="text-black/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black" />
          </span>
        </div>

        {/* Headline */}
        <h1 ref={headlineRef}
          className="text-4xl md:text-6xl font-extrabold text-black leading-[1.05] mb-6"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif", textShadow: "none" }}>
          Reach new audiences
          <br />
          with contest-driven{" "}
          <span className="relative inline-block">
            <span style={{
              color: "#000000"
            }}>UGC</span>
            <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
              <path d="M0,5 Q50,0 100,5" stroke={AMBER} strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Sub */}
        <p ref={subRef} className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: "rgba(0,0,0,0.65)", fontFamily: "'DM Sans', sans-serif" }}>
          Brands discover winning content. Creators earn rewards, recognition,
          and real opportunities — regardless of follower count.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onBrowse}
            className="btn-primary-gradient flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
          >
            <Target size={15} />
            Launch a Campaign
          </button>

          <button
            onClick={onBrowse}
            className="btn-secondary-white flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm"
          >
            <Play size={13} />
            Start Creating
          </button>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mb-10">
          <div className="flex flex-col items-center gap-1.5 opacity-40">
            <span className="text-xs" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Scroll to explore</span>
            <div className="w-px h-8 relative overflow-hidden" style={{ background: "rgba(0,0,0,0.1)" }}>
              <div className="w-full h-3 absolute animate-bounce" style={{ background: `linear-gradient(to bottom, ${AMBER}, transparent)`, top: 0 }} />
            </div>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div ref={dashRef} className="relative mx-auto max-w-3xl rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 20px 50px rgba(0,0,0,0.06)", background: "#ffffff" }}>
          <HeroDashboard />
        </div>

        {/* Logos marquee */}
        <BrandMarquee />
      </div>
    </section>
  );
}

// ─── Stats Banner ─────────────────────────────────────────────────────────────
function StatsBanner() {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll(".stat-item");
    if (!items.length) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" } }
      );
    }, ref);
    
    return () => ctx.revert();
  }, []);

  const stats = [
    { value: 50000, suffix: "+", label: "Active Creators", icon: <Users size={18} /> },
    { value: 2400, suffix: "+", label: "Campaigns Launched", icon: <Rocket size={18} /> },
    { value: 8.2, prefix: "$", suffix: "M", label: "Creator Rewards Paid", icon: <DollarSign size={18} /> },
    { value: 3.8, suffix: "×", label: "Average Brand ROI", icon: <TrendingUp size={18} /> },
  ];

  return (
    <section ref={ref} className="py-28 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, rgba(209, 248, 255, 0.12) 0%, #ffffff 100%)" }}
    >
      {/* Background radial gradient to give it depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-20" style={{ width: 600, height: 400 }}>
        <div className="w-full h-full" style={{ background: `radial-gradient(circle, #ffffff 0%, transparent 70%)`, filter: "blur(50px)" }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, prefix, suffix, label, icon }) => (
            <div 
              key={label} 
              className="stat-item group relative rounded-2xl p-5 transition-all duration-500 cursor-pointer overflow-hidden"
              style={{ 
                background: "#ffffff", 
                border: "1px solid rgba(0, 0, 0, 0.08)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.15)";
                e.currentTarget.style.background = "rgba(209, 248, 255, 0.4)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.background = "#ffffff";
                e.currentTarget.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 1)";
              }}
            >
              {/* Card top-right glow light */}
              <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, rgba(209,248,255,0.8) 0%, transparent 70%)` }} />

              {/* Icon Container */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300"
                  style={{ 
                    background: "#d1f8ff", 
                    color: "#000000",
                    border: "1px solid rgba(0, 0, 0, 0.08)"
                  }}
                >
                  {icon}
                </div>
                {/* Accent spark dot */}
                <span className="w-1.5 h-1.5 rounded-full transition-all duration-500 opacity-40 group-hover:opacity-100 group-hover:scale-125" style={{ background: AMBER }} />
              </div>

              {/* Big Stat Value */}
              <p className="text-2xl md:text-3xl font-extrabold mb-1 tracking-tight text-black transition-all duration-300 group-hover:translate-x-1"
                style={{ 
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                }}>
                <AnimatedCounter target={value} prefix={prefix} suffix={suffix} />
              </p>

              {/* Label */}
              <p className="text-xs font-semibold tracking-wider uppercase transition-colors duration-300 text-black/50 group-hover:text-black/75" 
                style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




// ─── How It Works ─────────────────────────────────────────────────────────────
// ─── Step card visuals (the upper illustrated zone of each bento step card) ───
function StepVisual({ step, tab }: { step: number; tab: "brands" | "creators" }) {
  // Brand visuals
  if (tab === "brands") {
    if (step === 0) return (
      // Step 1 — Campaign brief builder floating UI
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Amber radial glow */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(209,248,255,0.4) 0%, transparent 80%)" }} />
        {/* Floating icons */}
        <div className="absolute top-5 left-6 w-11 h-11 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
          <Target size={22} style={{ color: "#000000" }} />
        </div>
        <div className="absolute top-4 right-8 w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
          style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
          <Users size={18} style={{ color: "#000000" }} />
        </div>
        <div className="absolute bottom-6 left-8 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
          <BarChart3 size={16} style={{ color: "#000000" }} />
        </div>
        {/* Centre mini card */}
        <div className="relative w-36 rounded-2xl p-3 shadow-md"
          style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
          <p className="text-xs font-bold text-black mb-2" style={{ fontFamily: "'DM Sans', sans-serif" }}>New Campaign</p>
          <div className="h-1.5 rounded-full mb-1.5 w-full" style={{ background: "rgba(0,0,0,0.06)" }}>
            <div className="h-full rounded-full w-3/4" style={{ background: "linear-gradient(90deg, #d1f8ff, #000000)" }} />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Budget</span>
            <span className="text-xs font-bold" style={{ color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>$5,000</span>
          </div>
          <div className="mt-2 py-1.5 rounded-lg text-center text-xs font-bold cursor-pointer"
            style={{ background: "#000000", color: "#ffffff", fontFamily: "'DM Sans', sans-serif" }}>
            Publish →
          </div>
        </div>
        {/* Floating avatar row */}
        <div className="absolute bottom-4 right-4 flex -space-x-2">
          {["#d1f8ff","#ffffff","#000000","#d1f8ff"].map((c, i) => (
            <div key={i} className="w-7 h-7 rounded-full border flex items-center justify-center text-black text-[9px] font-bold shadow-sm"
              style={{ background: c, borderColor: "rgba(0,0,0,0.08)" }} />
          ))}
          <div className="w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-bold shadow-sm"
            style={{ background: "#ffffff", borderColor: "rgba(0,0,0,0.08)", color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>+</div>
        </div>
      </div>
    );

    if (step === 1) return (
      // Step 2 — Submissions feed
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.02) 0%, transparent 70%)" }} />
        <div className="w-44 rounded-2xl overflow-hidden shadow-md"
          style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
          <div className="px-3 py-2.5 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#000000" }} />
            <span className="text-xs font-bold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>Submissions</span>
            <span className="ml-auto text-xs font-bold" style={{ color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>342</span>
          </div>
          {[
            { name: "Sofia R.", views: "24K", badge: "🥇", col: "#000000" },
            { name: "Marcus T.", views: "18K", badge: "🥈", col: "rgba(0,0,0,0.6)" },
            { name: "Jay P.", views: "9K", badge: "🥉", col: "rgba(0,0,0,0.3)" },
          ].map(({ name, views, badge, col }) => (
            <div key={name} className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
              <span className="text-sm">{badge}</span>
              <div className="flex-1">
                <p className="text-xs font-semibold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>{name}</p>
                <div className="h-0.5 rounded-full mt-1 w-full" style={{ background: "rgba(0,0,0,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: views === "24K" ? "100%" : views === "18K" ? "75%" : "40%", background: col }} />
                </div>
              </div>
              <span className="text-xs" style={{ color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>{views}</span>
            </div>
          ))}
        </div>
      </div>
    );

    // Step 3 — Trophy / scale
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(209,248,255,0.4) 0%, transparent 70%)" }} />
        {/* Dashed orbit rings */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 240 200" fill="none" opacity="0.3">
          <ellipse cx="120" cy="100" rx="90" ry="55" stroke={AMBER} strokeWidth="1" strokeDasharray="5 5" />
          <ellipse cx="120" cy="100" rx="55" ry="33" stroke={AMBER} strokeWidth="0.8" strokeDasharray="3 6" />
        </svg>
        <TrophySVG size={80} />
        {/* Floating reward pills */}
        <div className="absolute top-5 right-6 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: "#ffffff", color: "#000000", border: "1px solid rgba(0,0,0,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
          $5,000 paid
        </div>
        <div className="absolute bottom-7 left-5 px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "#ffffff", color: "#000000", border: "1px solid rgba(0,0,0,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
          ✓ Licensed
        </div>
      </div>
    );
  }

  // Creator visuals
  if (step === 0) return (
    // Step 1 — Browse campaigns
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(209,248,255,0.4) 0%, transparent 70%)" }} />
      <div className="w-44 rounded-2xl overflow-hidden shadow-md"
        style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="px-3 py-2.5" style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
          <p className="text-xs font-bold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>Open Campaigns</p>
          <p className="text-xs" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>200+ live now</p>
        </div>
        {[
          { brand: "NovaSport", reward: "$5,000", col: "#000000" },
          { brand: "Lumina", reward: "$3,800", col: "rgba(0,0,0,0.6)" },
          { brand: "Brewlabs", reward: "$2,500", col: "rgba(0,0,0,0.3)" },
        ].map(({ brand, reward, col }) => (
          <div key={brand} className="flex items-center gap-2 px-3 py-2" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
            <div className="w-5 h-5 rounded-md flex-shrink-0" style={{ background: col, opacity: 0.8 }} />
            <span className="text-xs text-black flex-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{brand}</span>
            <span className="text-xs font-bold" style={{ color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>{reward}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (step === 1) return (
    // Step 2 — Create & Submit
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.02) 0%, transparent 70%)" }} />
      <div className="relative w-36 rounded-2xl overflow-hidden shadow-md"
        style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
        <img src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=200&h=130&fit=crop&auto=format"
          alt="Creator" className="w-full h-24 object-cover opacity-90" />
        <div className="absolute inset-0 top-auto h-24" style={{ background: "linear-gradient(to bottom, transparent 40%, #ffffff 100%)" }} />
        <div className="px-3 pb-3">
          <div className="flex items-center gap-1.5 mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: AMBER }} />
            <span className="text-xs font-semibold" style={{ color: AMBER, fontFamily: "'DM Sans', sans-serif" }}>Recording...</span>
          </div>
          <div className="h-1 rounded-full w-full" style={{ background: "rgba(0,0,0,0.06)" }}>
            <div className="h-full rounded-full w-2/3" style={{ background: "linear-gradient(90deg, #d1f8ff, #000000)" }} />
          </div>
          <p className="text-xs mt-2 font-bold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>NovaSport Brief</p>
        </div>
      </div>
      {/* Platform badges */}
      <div className="absolute top-4 right-5 flex flex-col gap-1.5">
        {[{ icon: <Instagram size={11} />, name: "IG" }, { icon: <Youtube size={11} />, name: "YT" }].map(({ icon, name }) => (
          <div key={name} className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs"
            style={{ background: "#ffffff", color: "#000000", border: "1px solid rgba(0,0,0,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
            {icon} {name}
          </div>
        ))}
      </div>
    </div>
  );

  // Creator Step 3 — Get Rewarded
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(209,248,255,0.4) 0%, transparent 70%)" }} />
      <div className="w-40 rounded-2xl p-4 shadow-md"
        style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
        <p className="text-xs mb-1" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>Available balance</p>
        <p className="text-3xl font-extrabold mb-3 text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>$1,500</p>
        <button className="btn-primary-gradient w-full py-2 rounded-xl text-xs">
          Cash out
        </button>
        <p className="text-center text-xs mt-2" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Within 24 hrs</p>
      </div>
    </div>
  );
}

function HowItWorks() {
  const [tab, setTab] = useState<"brands" | "creators">("brands");
  const [activeCard, setActiveCard] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveCard(0);
  }, [tab]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const headers = sectionRef.current.querySelectorAll(".hiw-header");
    if (!headers.length) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(headers,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll(".step-card");
    if (!cards.length) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.13, duration: 0.65, ease: "power3.out" }
      );
    }, cardsRef);
    
    return () => ctx.revert();
  }, [tab]);

  const steps = {
    brands: [
      { title: "Launch a Campaign", desc: "Define your brief, set your budget, and publish your challenge. Live in minutes — not weeks." },
      { title: "Creators Compete", desc: "Hundreds of creators produce content around your brief. Real competition drives real quality." },
      { title: "Pick Winners & Scale", desc: "Review, reward, and license the content you love. Discover creators who become long-term partners." },
    ],
    creators: [
      { title: "Browse Open Campaigns", desc: "Explore challenges from top brands across every niche. No follower minimum — just sign up and go." },
      { title: "Create & Submit", desc: "Film, edit, and submit content that fits the brief. Tell your story authentically before the deadline." },
      { title: "Get Rewarded", desc: "Cash out earnings direct to your account. Performance — not follower count — determines your rank." },
    ],
  };

  return (
    <section ref={sectionRef} id="how-it-works" className="py-40 px-8" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0fafd 100%)" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="hiw-header text-xs font-semibold tracking-[0.2em] uppercase mb-4 block"
            style={{ color: AMBER, fontFamily: "'DM Sans', sans-serif" }}>How It Works</span>
        </div>
        <h2 className="hiw-header text-4xl md:text-5xl font-extrabold text-black text-center mb-6"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          Built for both sides of the equation
        </h2>
        <p className="hiw-header text-center text-lg max-w-xl mx-auto mb-14"
          style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
          Whether you're a brand chasing scale or a creator seeking opportunity, GOC is your arena.
        </p>

        {/* Tab toggle */}
        <div className="hiw-header flex justify-center mb-16">
          <div className="flex rounded-full p-1" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.08)" }}>
            {(["brands", "creators"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className="px-7 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 cursor-pointer"
                style={{
                  background: tab === t ? "#000000" : "transparent",
                  color: tab === t ? "#ffffff" : "rgba(0,0,0,0.5)",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: tab === t ? "0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)" : "none",
                }}>
                For {t === "brands" ? "Brands" : "Creators"}
              </button>
            ))}
          </div>
        </div>

        {/* Bento step cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
          {steps[tab].map(({ title, desc }, i) => (
            <div
              key={title}
              onClick={() => setActiveCard(i)}
              className="step-card group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col transition-all duration-300"
              style={{
                background: "#ffffff",
                border: activeCard === i ? `1px solid #000000` : "1px solid rgba(0,0,0,0.08)",
                boxShadow: activeCard === i ? "0 20px 48px rgba(0,0,0,0.06)" : "0 10px 30px rgba(0,0,0,0.03)",
                transform: activeCard === i ? "translateY(-6px)" : "none",
                minHeight: 360,
              }}
              onMouseEnter={() => {
                setActiveCard(i);
              }}
            >
              {/* Visual zone — upper */}
              <div className="relative flex-shrink-0" style={{ height: 190, background: "#d1f8ff" }}>
                {/* Subtle grid */}
                <div className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }} />
                <StepVisual step={i} tab={tab} />
                {/* Gradient fade into card body */}
                <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, #ffffff)" }} />
              </div>

              {/* Text zone */}
              <div className="flex flex-col flex-1 px-6 pt-2.5 pb-6">
                {/* Step badge — sits right on the boundary like in the reference */}
                <div className="mb-5">
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                    style={{
                      background: "#d1f8ff",
                      color: "#000000",
                      border: "1px solid rgba(0,0,0,0.08)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: AMBER }} />
                    Step {i + 1}
                  </span>
                </div>

                <h3
                  className="text-lg font-extrabold text-black mb-3 leading-snug"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-sm leading-relaxed flex-1"
                  style={{ color: "rgba(0,0,0,0.65)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {desc}
                </p>

                {/* Hover arrow */}
                <div
                  className={`mt-5 flex items-center gap-1.5 text-xs font-semibold transition-all duration-200 ${
                    activeCard === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ color: AMBER, fontFamily: "'DM Sans', sans-serif" }}
                >
                  Learn more <ArrowRight size={12} />
                </div>
              </div>

              {/* Amber left-edge accent on hover */}
              <div
                className={`absolute left-0 top-8 bottom-8 w-0.5 rounded-full transition-opacity duration-300 ${
                  activeCard === i ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{ background: `linear-gradient(to bottom, transparent, ${AMBER}, transparent)` }}
              />
            </div>
          ))}
        </div>

        {/* Connector dots below cards */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <button
                onClick={() => setActiveCard(i)}
                aria-label={`Go to step ${i + 1}`}
                className="w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-500"
                style={{ background: "transparent" }}
              >
                <div
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    background: activeCard === i ? AMBER : "rgba(0,0,0,0.15)",
                    transform: activeCard === i ? "scale(1.25)" : "scale(1)",
                  }}
                />
              </button>
              {i < 2 && <div className="w-20 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Comparison Table ─────────────────────────────────────────────────────────
function ComparisonTable() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current!.querySelectorAll(".cmp-row"),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.5, ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const rows: { label: string; goc: string; old: string; highlight?: boolean }[] = [
    { label: "Time to launch",          goc: "< 5 minutes",     old: "2–4 weeks",          highlight: true },
    { label: "Creator discovery",        goc: "50,000+ pool",    old: "Manual outreach",     highlight: false },
    { label: "Content licensing",        goc: "Auto-licensed",   old: "Negotiate per asset", highlight: true },
    { label: "Minimum budget",           goc: "Any size",        old: "$10k+ retainers",     highlight: false },
    { label: "Performance visibility",   goc: "Real-time data",  old: "End-of-campaign report", highlight: true },
    { label: "Follower requirement",     goc: "None",            old: "100k+ minimum",       highlight: false },
  ];

  return (
    <section ref={ref} className="py-24 px-8" style={{ background: "linear-gradient(180deg, #f0fafd 0%, #ffffff 100%)" }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.22em] uppercase mb-3 block"
            style={{ color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            Why switch
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight"
            style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            GOC vs. the old way
          </h2>
          <p className="mt-4 text-base max-w-xl mx-auto"
            style={{ color: "rgba(0,0,0,0.55)", fontFamily: "'DM Sans', sans-serif" }}>
            Traditional influencer marketing is slow, expensive, and opaque. GOC flips every one of those problems.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 8px 40px rgba(0,0,0,0.04)" }}>
          {/* Column headers */}
          <div className="grid grid-cols-3 text-xs font-extrabold uppercase tracking-widest"
            style={{ background: "#000000", color: "#ffffff", fontFamily: "'DM Sans', sans-serif" }}>
            <div className="px-6 py-4">Feature</div>
            <div className="px-6 py-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d1f8ff]" />
              Game of Creators
            </div>
            <div className="px-6 py-4" style={{ color: "rgba(255,255,255,0.45)" }}>Traditional</div>
          </div>

          {/* Rows */}
          {rows.map(({ label, goc, old, highlight }, i) => (
            <div key={label} className="cmp-row grid grid-cols-3 transition-all duration-200 group cursor-default"
              style={{
                background: highlight ? "rgba(209,248,255,0.18)" : "#ffffff",
                borderTop: i === 0 ? "none" : "1px solid rgba(0,0,0,0.06)",
                opacity: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(209,248,255,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = highlight ? "rgba(209,248,255,0.18)" : "#ffffff"; }}
            >
              <div className="px-6 py-4 text-sm font-semibold text-black/60 flex items-center"
                style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
              <div className="px-6 py-4 flex items-center gap-2">
                <Check size={14} style={{ color: "#000000", flexShrink: 0 }} />
                <span className="text-sm font-bold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>{goc}</span>
              </div>
              <div className="px-6 py-4 flex items-center gap-2">
                <X size={14} style={{ color: "rgba(0,0,0,0.25)", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif" }}>{old}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <div className="text-center mt-10">
          <p className="text-sm" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>
            Ready to leave the old playbook behind?
          </p>
          <button className="btn-primary-gradient mt-4 px-7 py-3 rounded-full text-sm font-bold flex items-center gap-2 mx-auto">
            <Rocket size={14} /> Start for free
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── For Brands ───────────────────────────────────────────────────────────────
function BrandFeatureCard({ title, desc, icon, children }: { title: string; desc: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bento-card-step p-6 rounded-2xl flex flex-col justify-between w-[320px] sm:w-[400px] md:w-[440px] h-[460px] flex-shrink-0"
      style={{
        background: "#ffffff",
        border: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.03)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#000000";
        e.currentTarget.style.background = "rgba(209, 248, 255, 0.15)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
        e.currentTarget.style.background = "#ffffff";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.03)";
      }}
    >
      <div>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "#d1f8ff", color: "#000000" }}>
          {icon}
        </div>
        <h4 className="text-lg font-extrabold text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          {title}
        </h4>
        <p className="text-xs leading-relaxed mb-6" style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
          {desc}
        </p>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function ForBrands() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [budget, setBudget] = useState<number>(5000);
  const [licensed, setLicensed] = useState<Record<string, boolean>>({
    "Elena R.": true,
    "Tyler V.": false,
    "Marcus T.": false,
  });
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [typedText, setTypedText] = useState("");

  const fullText = "Create a 15-second TikTok/Reels reviewing our hydration glow serum. Focus on lightweight texture, show packaging, and demonstrate organic glow...";

  // GSAP scroll trigger entry and horizontal scroll animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Entry animation for left side
      gsap.fromTo(".brands-left", { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });

      // Horizontal scroll on desktop
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        const track = sectionRef.current?.querySelector(".horizontal-track");
        if (track) {
          const trackWidth = track.scrollWidth;
          const containerWidth = track.parentElement?.clientWidth || 0;
          const scrollDistance = trackWidth - containerWidth;
          
          if (scrollDistance > 0) {
            gsap.to(track, {
              x: -scrollDistance,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 0.8,
                start: "top 12%",
                end: () => `+=${scrollDistance * 1.5}`,
                invalidateOnRefresh: true,
              }
            });
          }
        }
      } else {
        // Mobile cards animation
        gsap.fromTo(".bento-card-step", { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Auto-play steps rotation
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Typing effect for Step 0
  useEffect(() => {
    if (activeStep !== 0) {
      setTypedText("");
      return;
    }
    let i = 0;
    setTypedText("");
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [activeStep]);

  const triggerConfetti = async () => {
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 50,
        spread: 50,
        origin: { y: 0.75, x: 0.25 },
        colors: ["#d1f8ff", "#000000", "#ffffff"]
      });
    } catch (err) {
      console.error("Confetti failed", err);
    }
  };

  const handleLicense = (creatorName: string) => {
    setIsAutoPlaying(false);
    setLicensed((prev) => ({ ...prev, [creatorName]: true }));
    triggerConfetti();
  };

  return (
    <section ref={sectionRef} className="py-40 px-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0fafd 100%)" }}>
      {/* BG decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-15">
        <HeroOrb size={600} opacity={1} blur={40} />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
          
          {/* Left Column: Heading and Interactive Campaign Simulator */}
          <div className="w-full lg:w-[38%] brands-left lg:sticky lg:top-28">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-2 block" style={{ color: AMBER, fontFamily: "'DM Sans', sans-serif" }}>For Brands</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4 leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Creator-led content
              <br />
              at scale — finally
            </h2>
            <p className="text-base mb-6 leading-relaxed" style={{ color: "rgba(0,0,0,0.65)", fontFamily: "'DM Sans', sans-serif" }}>
              Launch content challenges and watch hundreds of creators compete to represent your brand. Only pay for the UGC that performs.
            </p>

            {/* Campaign Simulator Sandbox */}
            <div className="rounded-2xl p-5 relative overflow-hidden border border-black/8 shadow-md" 
              style={{ background: "#ffffff", backdropFilter: "blur(12px)" }}>
              
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-black/8">
                <span className="text-xs font-bold text-black uppercase tracking-wider" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Campaign Builder Live
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-black font-bold bg-[#d1f8ff] px-2 py-0.5 rounded-full border border-black/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" /> Sandbox
                </span>
              </div>

              {/* Progress Steps Toggle */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { id: 0, label: "1. Brief" },
                  { id: 1, label: "2. Reward" },
                  { id: 2, label: "3. License" }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActiveStep(s.id);
                      setIsAutoPlaying(false);
                    }}
                    className="py-1.5 px-1 rounded-lg text-[10px] font-black tracking-wide text-center transition-all duration-300 cursor-pointer"
                    style={{
                      background: activeStep === s.id ? "#000000" : "rgba(0,0,0,0.03)",
                      color: activeStep === s.id ? "#ffffff" : "rgba(0,0,0,0.5)",
                      border: activeStep === s.id ? "none" : "1px solid rgba(0,0,0,0.08)"
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Content box based on active step */}
              <div className="min-h-[160px] flex flex-col justify-between">
                {activeStep === 0 && (
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] text-black/50 uppercase font-bold mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>Creative Requirements</p>
                      <div className="bg-[#d1f8ff] rounded-xl p-3 border border-black/8 min-h-[64px] text-xs leading-relaxed text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        {typedText}<span className="inline-block w-1.5 h-3.5 bg-black ml-0.5 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        "Show packaging details (first 3s)",
                        "Mention lightweight feel & texture",
                        "Include 'Lumina Hydration' keyword"
                      ].map((req, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-[10px] text-black/75">
                          <Check size={10} className="text-black stroke-[3]" />
                          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <p className="text-[10px] text-black/50 uppercase font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Set Campaign Budget</p>
                        <span className="text-base font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                          ${budget.toLocaleString()}
                        </span>
                      </div>
                      <input 
                        type="range" 
                        min="1000" 
                        max="15000" 
                        step="1000" 
                        value={budget} 
                        onChange={(e) => {
                          setIsAutoPlaying(false);
                          setBudget(Number(e.target.value));
                        }}
                        className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer mt-2"
                        style={{
                          background: `linear-gradient(to right, #000000 0%, #000000 ${((budget - 1000) / 14000) * 100}%, rgba(0,0,0,0.1) ${((budget - 1000) / 14000) * 100}%, rgba(0,0,0,0.1) 100%)`
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "🥇 1st Place", val: `$${(budget * 0.35).toFixed(0)}` },
                        { label: "🥈 Top 5 Pool", val: `$${(budget * 0.4 / 5).toFixed(0)} ea` },
                        { label: "🥉 Top 15 Pool", val: `$${(budget * 0.25 / 15).toFixed(0)} ea` }
                      ].map((reward) => (
                        <div key={reward.label} className="bg-[#d1f8ff] border border-black/8 rounded-xl p-2.5 text-center">
                          <p className="text-[9px] text-black/60 mb-1" style={{ fontFamily: "'DM Sans', sans-serif" }}>{reward.label}</p>
                          <p className="text-xs font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{reward.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-3">
                    <p className="text-[10px] text-black/50 uppercase font-bold" style={{ fontFamily: "'DM Sans', sans-serif" }}>Review & License Submissions</p>
                    
                    {[
                      { name: "Elena R.", score: "9.4", desc: "Texture demonstration" },
                      { name: "Tyler V.", score: "9.1", desc: "Unboxing & routine video" },
                      { name: "Marcus T.", score: "8.8", desc: "Before & after comparison" }
                    ].map((creator) => {
                      const isL = licensed[creator.name];
                      return (
                        <div key={creator.name} className="flex items-center justify-between bg-[#d1f8ff] rounded-xl p-2 border border-black/8">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-white border border-black/10 flex items-center justify-center text-[10px] font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                              {creator.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-black leading-none">{creator.name}</p>
                              <p className="text-[9px] text-black/60 mt-0.5">{creator.desc}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-extrabold text-black bg-white border border-black/10 px-1.5 py-0.5 rounded">
                              ★ {creator.score}
                            </span>
                            {isL ? (
                              <span className="text-[9px] font-extrabold text-black bg-white border border-black/10 px-2 py-1 rounded-lg">
                                Licensed ✓
                              </span>
                            ) : (
                              <button
                                onClick={() => handleLicense(creator.name)}
                                className="text-[9px] font-bold text-white bg-black hover:bg-black/80 px-2 py-1 rounded-lg transition-all duration-300 cursor-pointer"
                                style={{ fontFamily: "'DM Sans', sans-serif" }}
                              >
                                License
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Simulated live counter */}
                <div className="mt-4 flex justify-between items-center text-[9px] text-black/40 border-t border-black/8 pt-3" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span>Estimated Reach: <strong className="text-black">{(budget * 15).toLocaleString()} views</strong></span>
                  <span>Licensed: <strong className="text-black">{Object.values(licensed).filter(Boolean).length} / 3</strong></span>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-start">
              <Link to="/brands" className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm group">
                Launch Your First Campaign <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Horizontal Scroll Showcase */}
          <div className="w-full lg:w-[58%] overflow-hidden relative desktop-scroll-container py-4 -my-4">
            
            {/* Desktop Horizontal Scroll Track */}
            <div className="hidden lg:flex gap-6 horizontal-track pb-4 pt-2" style={{ width: "max-content" }}>
              <BrandFeatureCard
                title="Scale & Speed"
                desc="Get dozens of content variations in hours, not weeks. A/B test creatives without high agency retainers."
                icon={<BarChart3 size={18} />}
              >
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/8">
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Output</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>30+ Variations</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>per campaign brief</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Efficiency</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>4x Faster</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>content turnaround</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="relative h-32 flex items-center justify-center overflow-hidden bg-[#d1f8ff] rounded-xl border border-black/8 p-3">
                    <div className="relative w-24 h-24 scale-95">
                      <div className="absolute bottom-2 right-4 w-12 h-18 rounded-lg overflow-hidden border border-black/10 transition-all duration-500 hover:rotate-[-12deg]"
                        style={{ background: "#ffffff", transform: "rotate(-5deg)", transformOrigin: "bottom center" }}>
                        <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=100&h=120&fit=crop&auto=format" className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div className="absolute bottom-1 right-1 w-12 h-18 rounded-lg overflow-hidden border border-black/10 transition-all duration-500 hover:rotate-[12deg]"
                        style={{ background: "#ffffff", transform: "rotate(5deg)", transformOrigin: "bottom center" }}>
                        <img src="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=100&h=120&fit=crop&auto=format" className="w-full h-full object-cover opacity-90" />
                      </div>
                      <div className="absolute bottom-0 right-2 w-12 h-18 rounded-lg overflow-hidden border border-black/10"
                        style={{ background: "#ffffff" }}>
                        <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=120&fit=crop&auto=format" className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 left-1 text-[5px] font-bold text-white bg-black px-0.5 py-0.2 rounded">@sophia</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex flex-col justify-center">
                    <div className="relative border-l border-black/10 pl-3 py-0.5 space-y-2">
                      {[
                        { time: "0h", title: "Live", desc: "Creators matched" },
                        { time: "2h", title: "UGC", desc: "First video ready" },
                        { time: "24h", title: "Done", desc: "40+ licensed files" }
                      ].map((item, idx) => (
                        <div key={idx} className="relative text-[8px] leading-snug">
                          <div className="absolute -left-[16.5px] top-[3px] w-1.5 h-1.5 rounded-full border border-white bg-black" />
                          <div className="flex items-center gap-1">
                            <span className="text-[7px] font-mono px-0.5 rounded bg-white text-black/50">{item.time}</span>
                            <h5 className="font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{item.title}</h5>
                          </div>
                          <p className="text-[7px] text-black/60 leading-none">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BrandFeatureCard>

              <BrandFeatureCard
                title="Niche Talent & Safety"
                desc="Reach creators across any demographic, country, and niche with automated AI brand-safety guardrails."
                icon={<Users size={18} />}
              >
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/8">
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Creator Pool</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>8,400+ Active</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>highly vetted profiles</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Moderation</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>AI Auto-Review</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>safety filter active</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex flex-col justify-between h-32">
                    <div className="flex items-center gap-1 justify-center -space-x-1 mt-2">
                      {[
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop"
                      ].map((img, i) => (
                        <img key={i} src={img} className="w-6.5 h-6.5 rounded-full border border-white object-cover shadow-sm" />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-1">
                      {["#Skincare", "#Fitness", "#Tech"].map((t) => (
                        <span key={t} className="text-[8px] px-1.5 py-0.2 rounded-full font-bold bg-[#ffffff] border border-black/5 text-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex items-center justify-center h-32">
                    <div className="w-full bg-white border border-black/8 rounded-lg p-2.5 flex flex-col justify-between h-[96px]">
                      <div>
                        <p className="text-[7px] text-black/45 uppercase font-bold tracking-wider">Safety Filters</p>
                        <p className="text-[9px] font-black text-black leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Strict Brand Fit</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[7px] text-black/60 font-semibold">Moderation Mode</span>
                        <div className="w-6.5 h-4 bg-black rounded-full p-0.5 relative">
                          <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BrandFeatureCard>

              <BrandFeatureCard
                title="Clear Rights & Max ROI"
                desc="Every winning submission comes with full advertising rights. Keep acquisition costs up to 85% lower."
                icon={<Shield size={18} />}
              >
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/8">
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Ad Rights</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Pre-Cleared</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>unlimited ads usage</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>ROI Spark</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>85% Savings</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>vs traditional agency</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex items-center justify-center h-32">
                    <div className="w-full bg-white border border-black/8 rounded-lg p-2.5 flex flex-col justify-between h-[96px] relative overflow-hidden">
                      <div className="absolute -right-3 -bottom-3 w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-[5px] text-black/15 font-black uppercase rotate-[-20deg]">
                        OK
                      </div>
                      <div className="flex justify-between items-center border-b border-black/8 pb-0.5">
                        <span className="text-[6px] text-black/40 font-bold uppercase">Rights</span>
                        <span className="text-[5px] text-black font-bold bg-[#d1f8ff] px-0.5 rounded">Unlimited</span>
                      </div>
                      <div className="space-y-0.5 my-1">
                        <div className="w-8 h-0.5 bg-black/10 rounded-full" />
                        <div className="w-12 h-0.5 bg-black/5 rounded-full" />
                      </div>
                      <p className="text-[7px] text-black/60 font-semibold leading-none">Organic & Paid Ads</p>
                    </div>
                  </div>

                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex items-center justify-center h-32">
                    <div className="w-full bg-white border border-black/8 rounded-lg p-2.5 flex flex-col justify-between h-[96px]">
                      <div className="flex items-end justify-around h-10 mt-1">
                        <div className="flex flex-col items-center w-5">
                          <div className="w-full bg-black/10 rounded-t-sm h-8" />
                          <span className="text-[5px] text-black/40 font-bold mt-0.5">Agency</span>
                        </div>
                        <div className="flex flex-col items-center w-5">
                          <div className="w-full bg-black rounded-t-sm h-2.5" />
                          <span className="text-[5px] text-black font-bold mt-0.5">GOC</span>
                        </div>
                      </div>
                      <div className="text-[7px] font-black text-center text-black bg-[#d1f8ff] rounded py-0.5">
                        85% SAVINGS
                      </div>
                    </div>
                  </div>
                </div>
              </BrandFeatureCard>
            </div>

            {/* Mobile/Tablet Vertical Stack */}
            <div className="lg:hidden flex flex-col gap-6 mt-8 w-full">
              <BrandFeatureCard
                title="Scale & Speed"
                desc="Get dozens of content variations in hours, not weeks. A/B test creatives without high agency retainers."
                icon={<BarChart3 size={18} />}
              >
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/8">
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Output</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>30+ Variations</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>per campaign brief</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Efficiency</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>4x Faster</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>content turnaround</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="relative h-32 flex items-center justify-center overflow-hidden bg-[#d1f8ff] rounded-xl border border-black/8 p-3">
                    <div className="relative w-24 h-24 scale-95">
                      <div className="absolute bottom-2 right-4 w-12 h-18 rounded-lg overflow-hidden border border-black/10 transition-all duration-500 hover:rotate-[-12deg]"
                        style={{ background: "#ffffff", transform: "rotate(-5deg)", transformOrigin: "bottom center" }}>
                        <img src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?w=100&h=120&fit=crop&auto=format" className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div className="absolute bottom-1 right-1 w-12 h-18 rounded-lg overflow-hidden border border-black/10 transition-all duration-500 hover:rotate-[12deg]"
                        style={{ background: "#ffffff", transform: "rotate(5deg)", transformOrigin: "bottom center" }}>
                        <img src="https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=100&h=120&fit=crop&auto=format" className="w-full h-full object-cover opacity-90" />
                      </div>
                      <div className="absolute bottom-0 right-2 w-12 h-18 rounded-lg overflow-hidden border border-black/10"
                        style={{ background: "#ffffff" }}>
                        <img src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=120&fit=crop&auto=format" className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 left-1 text-[5px] font-bold text-white bg-black px-0.5 py-0.2 rounded">@sophia</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex flex-col justify-center">
                    <div className="relative border-l border-black/10 pl-3 py-0.5 space-y-2">
                      {[
                        { time: "0h", title: "Live", desc: "Creators matched" },
                        { time: "2h", title: "UGC", desc: "First video ready" },
                        { time: "24h", title: "Done", desc: "40+ licensed files" }
                      ].map((item, idx) => (
                        <div key={idx} className="relative text-[8px] leading-snug">
                          <div className="absolute -left-[16.5px] top-[3px] w-1.5 h-1.5 rounded-full border border-white bg-black" />
                          <div className="flex items-center gap-1">
                            <span className="text-[7px] font-mono px-0.5 rounded bg-white text-black/50">{item.time}</span>
                            <h5 className="font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{item.title}</h5>
                          </div>
                          <p className="text-[7px] text-black/60 leading-none">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BrandFeatureCard>

              <BrandFeatureCard
                title="Niche Talent & Safety"
                desc="Reach creators across any demographic, country, and niche with automated AI brand-safety guardrails."
                icon={<Users size={18} />}
              >
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/8">
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Creator Pool</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>8,400+ Active</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>highly vetted profiles</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Moderation</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>AI Auto-Review</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>safety filter active</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex flex-col justify-between h-32">
                    <div className="flex items-center gap-1 justify-center -space-x-1 mt-2">
                      {[
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
                        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop"
                      ].map((img, i) => (
                        <img key={i} src={img} className="w-6.5 h-6.5 rounded-full border border-white object-cover shadow-sm" />
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center mb-1">
                      {["#Skincare", "#Fitness", "#Tech"].map((t) => (
                        <span key={t} className="text-[8px] px-1.5 py-0.2 rounded-full font-bold bg-[#ffffff] border border-black/5 text-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex items-center justify-center h-32">
                    <div className="w-full bg-white border border-black/8 rounded-lg p-2.5 flex flex-col justify-between h-[96px]">
                      <div>
                        <p className="text-[7px] text-black/45 uppercase font-bold tracking-wider">Safety Filters</p>
                        <p className="text-[9px] font-black text-black leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Strict Brand Fit</p>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[7px] text-black/60 font-semibold">Moderation Mode</span>
                        <div className="w-6.5 h-4 bg-black rounded-full p-0.5 relative">
                          <div className="w-3 h-3 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </BrandFeatureCard>

              <BrandFeatureCard
                title="Clear Rights & Max ROI"
                desc="Every winning submission comes with full advertising rights. Keep acquisition costs up to 85% lower."
                icon={<Shield size={18} />}
              >
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/8">
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>Ad Rights</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Pre-Cleared</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>unlimited ads usage</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-black/55 uppercase font-black tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>ROI Spark</p>
                    <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>85% Savings</p>
                    <p className="text-[9px] text-black/60" style={{ fontFamily: "'DM Sans', sans-serif" }}>vs traditional agency</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex items-center justify-center h-32">
                    <div className="w-full bg-white border border-black/8 rounded-lg p-2.5 flex flex-col justify-between h-[96px] relative overflow-hidden">
                      <div className="absolute -right-3 -bottom-3 w-8 h-8 rounded-full border border-black/15 flex items-center justify-center text-[5px] text-black/15 font-black uppercase rotate-[-20deg]">
                        OK
                      </div>
                      <div className="flex justify-between items-center border-b border-black/8 pb-0.5">
                        <span className="text-[6px] text-black/40 font-bold uppercase">Rights</span>
                        <span className="text-[5px] text-black font-bold bg-[#d1f8ff] px-0.5 rounded">Unlimited</span>
                      </div>
                      <div className="space-y-0.5 my-1">
                        <div className="w-8 h-0.5 bg-black/10 rounded-full" />
                        <div className="w-12 h-0.5 bg-black/5 rounded-full" />
                      </div>
                      <p className="text-[7px] text-black/60 font-semibold leading-none">Organic & Paid Ads</p>
                    </div>
                  </div>

                  <div className="bg-[#d1f8ff] border border-black/8 rounded-xl p-3 flex items-center justify-center h-32">
                    <div className="w-full bg-white border border-black/8 rounded-lg p-2.5 flex flex-col justify-between h-[96px]">
                      <div className="flex items-end justify-around h-10 mt-1">
                        <div className="flex flex-col items-center w-5">
                          <div className="w-full bg-black/10 rounded-t-sm h-8" />
                          <span className="text-[5px] text-black/40 font-bold mt-0.5">Agency</span>
                        </div>
                        <div className="flex flex-col items-center w-5">
                          <div className="w-full bg-black rounded-t-sm h-2.5" />
                          <span className="text-[5px] text-black font-bold mt-0.5">GOC</span>
                        </div>
                      </div>
                      <div className="text-[7px] font-black text-center text-black bg-[#d1f8ff] rounded py-0.5">
                        85% SAVINGS
                      </div>
                    </div>
                  </div>
                </div>
              </BrandFeatureCard>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// ─── For Creators ─────────────────────────────────────────────────────────────
function ForCreators() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".creators-card-wrap", { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
      gsap.fromTo(".creators-right", { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const perks = [
    { icon: <Globe size={17} />, title: "No Follower Minimum", desc: "Your creativity matters, not your following. Emerging creators win every day." },
    { icon: <DollarSign size={17} />, title: "Real Cash Rewards", desc: "Top submissions earn hundreds to thousands per challenge." },
    { icon: <Star size={17} />, title: "Build Your Portfolio", desc: "Top performers get featured and invited to exclusive campaigns." },
    { icon: <Sparkles size={17} />, title: "Brand Collaborations", desc: "Win a campaign and turn it into a long-term partnership." },
  ];

  return (
    <section ref={sectionRef} className="py-40 px-8 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #f0fafd 0%, #ffffff 100%)" }}>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none opacity-5">
        <HeroOrb size={500} opacity={1} blur={40} />
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Creator card */}
          <div className="creators-card-wrap relative">
            <div className="rounded-2xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 12px 36px rgba(0,0,0,0.05)" }}>
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=600&h=300&fit=crop&auto=format"
                  alt="Creator filming content" className="w-full h-46 object-cover" style={{ opacity: 0.9 }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, #ffffff 15%, transparent 55%)" }} />
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  {[{ icon: <Instagram size={13} />, name: "Instagram" }, { icon: <Youtube size={13} />, name: "YouTube" }, { icon: <Twitter size={13} />, name: "TikTok" }].map(({ icon, name }) => (
                    <div key={name} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold"
                      style={{ background: "rgba(255,255,255,0.9)", color: "#000000", backdropFilter: "blur(8px)", border: "1px solid rgba(0,0,0,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
                      {icon} {name}
                    </div>
                  ))}
                </div>
                {/* Trophy overlay */}
                <div className="absolute bottom-4 left-4">
                  <TrophySVG size={50} />
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: "#000000" }}>S</div>
                  <div>
                    <p className="text-sm font-bold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Sofia R.</p>
                    <p className="text-xs" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>UGC Creator · 2.1K followers</p>
                  </div>
                  <div className="ml-auto px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "#d1f8ff", color: "#000000", border: "1px solid rgba(0,0,0,0.05)", fontFamily: "'DM Sans', sans-serif" }}>
                    🏆 Campaign Winner
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ label: "Campaigns Won", val: "7" }, { label: "Total Earned", val: "$3,240" }, { label: "Content Score", val: "9.4/10" }].map(({ label, val }) => (
                    <div key={label} className="rounded-xl p-2.5 text-center group cursor-default transition-all duration-200 hover:scale-105"
                      style={{ background: "#d1f8ff", border: "1px solid rgba(0,0,0,0.05)", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
                      <p className="text-base font-bold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{val}</p>
                      <p className="text-xs mt-0.5" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-full flex items-center gap-2"
              style={{ background: "#ffffff", border: "1px solid #000000", backdropFilter: "blur(12px)", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
              <Zap size={13} style={{ color: "#000000" }} />
              <span className="text-xs font-bold" style={{ color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>Merit-Based, Not Follower-Based</span>
            </div>
            <div className="absolute -top-4 -right-4 px-3 py-2 rounded-full flex items-center gap-1.5"
              style={{ background: "#ffffff", border: "1px solid #000000", backdropFilter: "blur(12px)", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
              <span className="text-xs font-bold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>47 live campaigns</span>
            </div>
          </div>

          {/* Right copy */}
          <div className="creators-right">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>For Creators</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-black mb-4 leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Your talent wins,
              <br />
              not your follower count
            </h2>
            <p className="text-base mb-8 leading-relaxed" style={{ color: "rgba(0,0,0,0.7)", fontFamily: "'DM Sans', sans-serif" }}>
              GOC is the level playing field the creator economy never had. Submit your best work, compete on merit, and earn real money.
            </p>
            <div className="flex flex-col gap-4 mb-8">
              {perks.map(({ icon, title, desc }) => (
                <div key={title} className="flex items-start gap-5 group cursor-default">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-200 group-hover:scale-110"
                    style={{ background: "#ffffff", color: "#000000", border: "1px solid rgba(0,0,0,0.1)" }}>
                    {icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-black mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{title}</h4>
                    <p className="text-xs" style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary-gradient inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm group">
              Start Competing Free <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Campaign Showcase ────────────────────────────────────────────────────────
// ─── Campaign Inner Page Data ──────────────────────────────────────────────────

const ALL_CAMPAIGN_DATA = [
  {
    id: 1,
    brand: "Creator Casino",
    logo: "RC",
    logoColor: "#f59e0b",
    tags: ["Clipping", "Entertainment"],
    title: "Roobet Official Clipping",
    timeAgo: "11 days ago",
    spent: "$12,492",
    budget: "$250,000",
    spentVal: 12492,
    budgetVal: 250000,
    payRate: "$1.00",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$250,000",
    submissions: 894,
    views: "12.5M",
    daysLeft: 19,
    hot: true,
    featured: true,
    img: "https://images.unsplash.com/photo-1596838132731-3301c3fd4317?w=800&h=450&fit=crop&auto=format",
    approval: "89%",
    creators: 894,
    platforms: ["tiktok", "instagram"],
    description: "Create viral short-form clips highlighting slot wins, challenges, and casino drama. Keep content high energy and engaging."
  },
  {
    id: 2,
    brand: "Clipping Culture",
    logo: "CD",
    logoColor: "#ef4444",
    tags: ["Clipping", "Gaming"],
    title: "Call of Duty - Modern Warfare 4 Reveal Hype",
    timeAgo: "25 days ago",
    spent: "$120,000",
    budget: "$120,000",
    spentVal: 120000,
    budgetVal: 120000,
    payRate: "$1.50",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$120,000",
    submissions: 12000,
    views: "80.0M",
    daysLeft: 5,
    hot: true,
    featured: true,
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop&auto=format",
    approval: "94%",
    creators: 12000,
    platforms: ["tiktok", "youtube", "instagram"],
    description: "Generate hype around the new Modern Warfare 4 reveal. Focus on breakdown clips, easter eggs, and reaction clips from the trailer."
  },
  {
    id: 3,
    brand: "Clipping Culture",
    logo: "DH",
    logoColor: "#10b981",
    tags: ["Clipping", "Personal Brand"],
    title: "David Heacock Clipping | $20K Budget | $1.5 CPM",
    timeAgo: "5 days ago",
    spent: "$2,967",
    budget: "$20,000",
    spentVal: 2967,
    budgetVal: 20000,
    payRate: "$1.50",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$20,000",
    submissions: 798,
    views: "2.0M",
    daysLeft: 25,
    hot: false,
    featured: true,
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=450&fit=crop&auto=format",
    approval: "85%",
    creators: 798,
    platforms: ["tiktok", "instagram", "youtube"],
    description: "David Heacock (@davidfilterbuy) is the founder and CEO of Filterbuy, one of the largest direct-to-consumer HVAC filter brands in the US. Clip his podcast content."
  },
  {
    id: 4,
    brand: "TikCut",
    logo: "DO",
    logoColor: "#3b82f6",
    tags: ["Clipping", "Music"],
    title: "Don Omar - \"Danza Kuduro\" [7895]",
    timeAgo: "17 min ago",
    spent: "$0",
    budget: "$2,000",
    spentVal: 0,
    budgetVal: 2000,
    payRate: "$2.00",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$2,000",
    submissions: 20,
    views: "0",
    daysLeft: 12,
    hot: false,
    featured: false,
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=450&fit=crop&auto=format",
    approval: "90%",
    creators: 20,
    platforms: ["tiktok"],
    description: "Create vertical dance, remix, or lyric clips utilizing the classic track Danza Kuduro. Match transitions to the beat."
  },
  {
    id: 5,
    brand: "billbord",
    logo: "CB",
    logoColor: "#ec4899",
    tags: ["Clipping", "Sports"],
    title: "Official Cloudbet FIFA Logo Campaign",
    timeAgo: "12 days ago",
    spent: "$13,748",
    budget: "$26,625",
    spentVal: 13748,
    budgetVal: 26625,
    payRate: "$0.12",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$26,625",
    submissions: 315,
    views: "114.5M",
    daysLeft: 18,
    hot: false,
    featured: false,
    img: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop&auto=format",
    approval: "63%",
    creators: 315,
    platforms: ["tiktok", "instagram"],
    description: "Promote the Cloudbet FIFA tournament. Create clips from gameplay or tournament highlights featuring the logo."
  },
  {
    id: 6,
    brand: "Adaptive AI",
    logo: "AA",
    logoColor: "#8b5cf6",
    tags: ["Product", "AI"],
    title: "Adaptive AI (LONG FORM YOUTUBE)",
    timeAgo: "2 months ago",
    spent: "$2,989",
    budget: "$18,000",
    spentVal: 2989,
    budgetVal: 18000,
    payRate: "$25.00",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$18,000",
    submissions: 73,
    views: "120K",
    daysLeft: 45,
    hot: false,
    featured: false,
    img: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&h=450&fit=crop&auto=format",
    approval: "95%",
    creators: 73,
    platforms: ["youtube"],
    description: "Produce long-form YouTube reviews, workflow tutorials, or integration guides demonstrating the power of Adaptive AI."
  },
  {
    id: 7,
    brand: "Clip Farm",
    logo: "CF",
    logoColor: "#f43f5e",
    tags: ["Product"],
    title: "Carpe x Clipfarm Collaboration",
    timeAgo: "9 days ago",
    spent: "$1,499",
    budget: "$10,000",
    spentVal: 1499,
    budgetVal: 10000,
    payRate: "$1.00",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$10,000",
    submissions: 324,
    views: "1.5M",
    daysLeft: 9,
    hot: false,
    featured: false,
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=450&fit=crop&auto=format",
    approval: "88%",
    creators: 324,
    platforms: ["tiktok", "youtube", "instagram"],
    description: "Review Carpe anti-perspirant products. Detail the product's effectiveness, smell, and routine integration."
  },
  {
    id: 8,
    brand: "ClipHaus",
    logo: "CH",
    logoColor: "#3b82f6",
    tags: ["Clipping", "Politics"],
    title: "MR. BLACK FOR FLORIDA GOVERNOR",
    timeAgo: "1 month ago",
    spent: "$9,342",
    budget: "$15,000",
    spentVal: 9342,
    budgetVal: 15000,
    payRate: "$2.00",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$15,000",
    submissions: 1000,
    views: "4.7M",
    daysLeft: 22,
    hot: false,
    featured: false,
    img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&h=450&fit=crop&auto=format",
    approval: "92%",
    creators: 1000,
    platforms: ["youtube", "tiktok", "instagram"],
    description: "Clip political commentary, campaign trail highlights, or interview segments focusing on Mr. Black's policies."
  },
  {
    id: 9,
    brand: "Content Rewards",
    logo: "CR",
    logoColor: "#a855f7",
    tags: ["UGC", "Entertainment"],
    title: "Talking-Head UGC [Non-English]",
    timeAgo: "15 days ago",
    spent: "$4,513",
    budget: "$10,000",
    spentVal: 4513,
    budgetVal: 10000,
    payRate: "$1.00",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$10,000",
    submissions: 81,
    views: "4.5M",
    daysLeft: 15,
    hot: false,
    featured: false,
    img: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&h=450&fit=crop&auto=format",
    approval: "85%",
    creators: 81,
    platforms: ["youtube", "tiktok", "instagram"],
    description: "Submit high-converting UGC style talking head reviews in Spanish, German, French, or Italian."
  },
  {
    id: 10,
    brand: "Clip Farm",
    logo: "CF",
    logoColor: "#10b981",
    tags: ["Clipping"],
    title: "Jacks Dining Room [Live Stream Clipping]",
    timeAgo: "9 days ago",
    spent: "$2,146",
    budget: "$6,000",
    spentVal: 2146,
    budgetVal: 6000,
    payRate: "$0.75",
    payUnit: "1K views",
    payType: "Per View",
    prize: "$6,000",
    submissions: 517,
    views: "2.8M",
    daysLeft: 20,
    hot: false,
    featured: false,
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop&auto=format",
    approval: "80%",
    creators: 517,
    platforms: ["youtube", "tiktok", "instagram"],
    description: "Clip the funniest, wildest, or most mouthwatering food moments from Jack's Dining Room livestreams."
  }
];

const CATS = ["All", "Clipping", "Logo", "Product", "Personal Brand", "Entertainment", "Gaming", "Sports", "Music", "AI", "Politics", "UGC"];

// ─── Tag pill colours (cycling) ───────────────────────────────────────────────
const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Clipping:         { bg: "#d1f8ff", text: "#000000" },
  Logo:             { bg: "#d1f8ff", text: "#000000" },
  Product:          { bg: "#d1f8ff", text: "#000000" },
  "Personal Brand": { bg: "#d1f8ff", text: "#000000" },
  Entertainment:    { bg: "#d1f8ff", text: "#000000" },
  Gaming:           { bg: "#d1f8ff", text: "#000000" },
  Sports:           { bg: "#d1f8ff", text: "#000000" },
  Music:            { bg: "#d1f8ff", text: "#000000" },
  AI:               { bg: "#d1f8ff", text: "#000000" },
  Politics:         { bg: "#d1f8ff", text: "#000000" },
  UGC:              { bg: "#d1f8ff", text: "#000000" },
};
function TagPill({ label }: { label: string }) {
  const c = TAG_COLORS[label] ?? { bg: "#d1f8ff", text: "#000000" };
  return (
    <span className="px-2 py-0.5 rounded text-xs font-semibold whitespace-nowrap"
      style={{ background: c.bg, color: c.text, fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}>
      {label}
    </span>
  );
}

function CampaignShowcase({ onBrowse }: { onBrowse?: () => void }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter]       = useState("All");
  const [hovered, setHovered]     = useState<string | null>(null);

  const FILTERS = CATS;
  const visible = filter === "All"
    ? ALL_CAMPAIGN_DATA
    : ALL_CAMPAIGN_DATA.filter(c => c.tags.some(t => t.toLowerCase() === filter.toLowerCase()));

  // Scroll-triggered stagger on first paint
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".sc-card");
    if (!cards.length) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 36, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" } }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  // Re-animate on filter change
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".sc-card",
        { opacity: 0, y: 20, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.07, duration: 0.45, ease: "power2.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section ref={sectionRef} className="py-40 px-8" style={{ background: "#ffffff" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-3 block"
              style={{ color: "#000000", fontFamily: "'DM Sans',sans-serif" }}>
              Live Campaigns
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque',sans-serif" }}>
              Open challenges,<br />real rewards
            </h2>
          </div>
          <button onClick={onBrowse}
            className="btn-secondary-dark inline-flex items-center gap-2 px-5 py-2.5 text-sm rounded-full group"
          >
            Browse All <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
          </button>
        </div>

        {/* ── Filter pills ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
              style={{
                background: filter===f ? "#000000" : "#ffffff",
                color:      filter===f ? "#ffffff" : "#000000",
                border:     filter===f ? "1px solid #000000" : "1px solid rgba(0,0,0,0.1)",
                fontFamily: "'DM Sans',sans-serif",
                boxShadow:  filter===f ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 6px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={e => { if(filter!==f){ e.currentTarget.style.background="#d1f8ff"; e.currentTarget.style.color="#000000"; } }}
              onMouseLeave={e => { if(filter!==f){ e.currentTarget.style.background="#ffffff"; e.currentTarget.style.color="#000000"; } }}>
              {f}
            </button>
          ))}
        </div>

        {/* ── Uniform 3-col grid — premium cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {visible.map(c => {
            const isH     = hovered === c.title;
            const percent = c.budgetVal ? Math.min(100, Math.round((c.spentVal / c.budgetVal) * 100)) : 0;
            const isAlmostFull = percent >= 90;
            const urgencyColor = c.daysLeft <= 3 ? "#ef4444" : c.daysLeft <= 7 ? "#f59e0b" : "#22c55e";
            const matchRate = 90 + (c.id * 3) % 10;

            return (
              <div
                key={c.title}
                className="sc-card group relative rounded-2xl cursor-pointer flex flex-col overflow-hidden"
                style={{
                  background: "#ffffff",
                  border: isH ? "1px solid rgba(0,0,0,0.18)" : "1px solid rgba(0,0,0,0.07)",
                  boxShadow: isH
                    ? "0 24px 60px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.03)"
                    : "0 4px 20px rgba(0,0,0,0.04)",
                  transform: isH ? "translateY(-6px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.34,1.2,0.64,1)",
                  zIndex: isH ? 10 : 1,
                }}
                onClick={onBrowse}
                onMouseEnter={() => setHovered(c.title)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* ─── Image Zone ─── */}
                <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover"
                    style={{
                      transform: isH ? "scale(1.08)" : "scale(1.01)",
                      transition: "transform 0.7s ease",
                    }}
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(to bottom, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.5) 100%)"
                  }} />

                  {/* Shimmer on hover */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                      className="absolute top-0 -left-full h-full w-1/3"
                      style={{
                        background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                        transform: isH ? "translateX(400%)" : "translateX(0%)",
                        transition: "transform 0.7s ease-in-out",
                      }}
                    />
                  </div>

                  {/* Brand badge — top left */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}>
                    <div className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] font-extrabold text-white"
                      style={{ background: c.logoColor, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {c.logo}
                    </div>
                    <span className="text-[10px] font-bold text-white/90 truncate max-w-[80px]"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.brand}</span>
                  </div>

                  {/* HOT / Match — top right */}
                  <div className="absolute top-3 right-3">
                    {c.hot ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase text-white"
                        style={{
                          background: "linear-gradient(135deg, #ff4e00, #ec9f05)",
                          boxShadow: "0 0 12px rgba(255,78,0,0.45)",
                        }}>
                        <Flame size={9} className="fill-white" /> HOT
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[9px] font-bold text-black"
                        style={{
                          background: "rgba(209,248,255,0.92)",
                          border: "1px solid rgba(0,0,0,0.1)",
                          backdropFilter: "blur(6px)",
                          fontFamily: "'DM Sans', sans-serif",
                        }}>
                        {matchRate}% Match
                      </span>
                    )}
                  </div>

                  {/* Days left — bottom left */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
                    style={{
                      background: "rgba(0,0,0,0.6)",
                      backdropFilter: "blur(6px)",
                      color: urgencyColor,
                      border: `1px solid ${urgencyColor}40`,
                    }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: urgencyColor, display: "inline-block", boxShadow: `0 0 5px ${urgencyColor}` }} />
                    {c.daysLeft}d left
                  </div>

                  {/* Pay rate — bottom right */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-extrabold text-white"
                    style={{
                      background: "rgba(0,0,0,0.7)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                    }}>
                    <DollarSign size={9} />
                    {c.payRate}/{c.payUnit.includes("1K") ? "1K" : "view"}
                  </div>
                </div>

                {/* ─── Details Zone ─── */}
                <div className="p-4 flex flex-col gap-2 flex-grow">

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.tags.slice(0, 2).map(t => (
                      <span key={t}
                        className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          background: "rgba(209,248,255,0.55)",
                          color: "rgba(0,0,0,0.55)",
                          border: "1px solid rgba(0,0,0,0.06)",
                          fontFamily: "'DM Sans', sans-serif",
                        }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-black leading-snug line-clamp-2"
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      opacity: isH ? 0.85 : 1,
                      transition: "opacity 0.2s",
                    }}>
                    {c.title}
                  </h3>

                  {/* Budget progress */}
                  <div className="mt-auto">
                    <div className="flex justify-between items-center text-[10px] mb-1.5"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <span className="font-semibold text-black/50">Budget</span>
                      <span className="font-extrabold" style={{ color: isAlmostFull ? "#ef4444" : "#000" }}>
                        {c.spent} <span className="text-black/35 font-medium">/ {c.budget}</span>
                      </span>
                    </div>
                    <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: "rgba(0,0,0,0.06)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percent}%`,
                          background: isAlmostFull
                            ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                            : "linear-gradient(90deg, #d1f8ff, #000000)",
                          transition: "width 0.7s ease",
                        }}
                      />
                    </div>
                  </div>

                  {/* Stats footer */}
                  <div className="grid grid-cols-3 gap-1 pt-3 mt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                    {[
                      { label: "Approval", val: c.approval },
                      { label: "Views", val: c.views },
                      { label: "Creators", val: c.creators.toLocaleString() },
                    ].map(({ label, val }) => (
                      <div key={label} className="text-center">
                        <p className="text-[8px] text-black/35 uppercase tracking-widest font-semibold"
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                        <p className="text-xs font-extrabold text-black mt-0.5"
                          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-10 text-center">
          <button onClick={onBrowse}
            className="btn-secondary-dark inline-flex items-center gap-2.5 px-8 py-3.5 text-sm rounded-full group"
          >
            See All Live Campaigns
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>

      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<"all" | "brand" | "creator">("all");
  const isFirstRender = useRef(true);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".testimonial-card-wrapper");
    if (!cards.length) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  // Re-animate on filter change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(".testimonial-card-wrapper",
        { opacity: 0, y: 25, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.45, ease: "power2.out" }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [filter]);

  const quotes = [
    {
      text: "We ran a 2-week GOC campaign and got 340 UGC submissions. Three of them outperformed our entire paid ad library. Unreal.",
      name: "Priya Mehta",
      role: "Head of Growth, Lumina Skincare",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format",
      type: "brand",
      metric: "+340 UGC Submissions",
      platform: "instagram"
    },
    {
      text: "I had 800 followers when I won my first GOC campaign. Now I have 3 ongoing brand deals from brands I discovered here.",
      name: "Marcus T.",
      role: "UGC Creator, Austin TX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
      type: "creator",
      metric: "3 Brand Deals",
      platform: "tiktok"
    },
    {
      text: "GOC replaced our influencer agency. We get 10× the content volume at a fraction of the cost, and it actually converts.",
      name: "David Park",
      role: "CMO, NovaSport",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format",
      type: "brand",
      metric: "10x Content Vol.",
      platform: "youtube"
    },
    {
      text: "The merit-based system is a game-changer. My content quality speaks for itself — I don't need to play the algorithm game.",
      name: "Anaya Williams",
      role: "Videographer & Creator",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format",
      type: "creator",
      metric: "Merit Payouts",
      platform: "tiktok"
    },
    {
      text: "As a D2C startup, finding creators who genuinely match our aesthetic was a nightmare. On GOC, we got 50+ beautiful video assets in a week.",
      name: "Elena Rostova",
      role: "Founder, Bloom Cosmetics",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&auto=format",
      type: "brand",
      metric: "50+ Video Assets",
      platform: "instagram"
    },
    {
      text: "I earned $4,200 in my first month submitting to tech and gaming campaigns. The platform pays out immediately after campaign approval.",
      name: "Tyler Vance",
      role: "Tech Reviewer & Gamer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
      type: "creator",
      metric: "$4,200 Earned",
      platform: "youtube"
    },
    {
      text: "We outsourced our product launch UGC to GOC. The click-through rate on GOC-sourced ads is 3.4x higher than standard studio ads.",
      name: "Jordan K.",
      role: "Creative Director, HypeWater",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
      type: "brand",
      metric: "3.4x Higher CTR",
      platform: "tiktok"
    },
    {
      text: "The brief builder is incredibly clear. I know exactly what the brand wants, making it easy to create winning content on the first try.",
      name: "Siddharth Nair",
      role: "Motion Designer",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&auto=format",
      type: "creator",
      metric: "Clear Briefs",
      platform: "youtube"
    },
    {
      text: "We ran a co-marketing challenge with 3 other brands. The cross-pollination of creator talent was incredible, resulting in 4.5M organic views.",
      name: "Liam O'Connor",
      role: "VP Marketing, FitGlow",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&h=80&fit=crop&auto=format",
      type: "brand",
      metric: "4.5M Views",
      platform: "instagram"
    },
    {
      text: "I went from treating UGC as a side hustle to a full-time career in six months. The consistency of brand briefs on GOC is unmatched.",
      name: "Sophia Martinez",
      role: "Lifestyle Creator",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format",
      type: "creator",
      metric: "Full-Time UGC",
      platform: "tiktok"
    }
  ];

  const filteredQuotes = filter === "all" ? quotes : quotes.filter(q => q.type === filter);

  return (
    <section ref={sectionRef} className="py-40 px-8 relative overflow-hidden" style={{ background: "#ffffff" }}>
      {/* Dynamic background glow based on filter */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-[0.05] transition-all duration-700 filter blur-3xl rounded-full"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 70%)"
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-4"
            style={{ 
              background: "#ffffff",
              color: "#000000",
              border: "1px solid rgba(0, 0, 0, 0.1)"
            }}>
            <Sparkles size={11} className="fill-current" />
            Social Proof
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Brands and creators,<br />both winning
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
            Hear from D2C founders scaling their content library and creators building independent careers.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-12">
          {(["all", "brand", "creator"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="px-5 py-2 rounded-full text-xs font-bold transition-all duration-300"
              style={{
                background: filter===f ? "#000000" : "#ffffff",
                color:      filter===f ? "#ffffff" : "#000000",
                border:     filter===f ? "1px solid #000000" : "1px solid rgba(0,0,0,0.1)",
                fontFamily: "'DM Sans',sans-serif",
                boxShadow:  filter===f ? "0 4px 12px rgba(0,0,0,0.15)" : "0 2px 6px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={e => { if(filter!==f){ e.currentTarget.style.background="#d1f8ff"; e.currentTarget.style.color="#000000"; } }}
              onMouseLeave={e => { if(filter!==f){ e.currentTarget.style.background="#ffffff"; e.currentTarget.style.color="#000000"; } }}>
              {f === "all" ? "All Stories" : f === "brand" ? "Brand Partners" : "UGC Creators"}
            </button>
          ))}
        </div>

        {/* Masonry Bento Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]">
          {filteredQuotes.map(({ text, name, role, avatar, type, metric, platform }) => (
            <div key={name} className="testimonial-card-wrapper break-inside-avoid">
              <div className="testimonial-card p-6 rounded-2xl transition-all duration-500 cursor-default relative overflow-hidden flex flex-col justify-between"
                style={{ 
                  background: "#ffffff", 
                  border: "1px solid rgba(0,0,0,0.08)", 
                  boxShadow: "0 8px 32px rgba(0,0,0,0.02)",
                  backdropFilter: "blur(12px)"
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)"; 
                  e.currentTarget.style.background = "#ffffff"; 
                  e.currentTarget.style.transform = "translateY(-4px)"; 
                  e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.06)"; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; 
                  e.currentTarget.style.background = "#ffffff"; 
                  e.currentTarget.style.transform = "none"; 
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.02)"; 
                }}>
                {/* Subtle top right background glow */}
                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full pointer-events-none opacity-20 filter blur-xl"
                  style={{
                    background: "radial-gradient(circle, #d1f8ff 0%, transparent 70%)"
                  }}
                />

                <div>
                  {/* Rating Stars & Type Badge & Metric */}
                  <div className="flex justify-between items-start gap-4 mb-5 relative z-10">
                    <div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#000000" style={{ color: "#000000" }} />)}
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider"
                        style={{ 
                          background: "#d1f8ff", 
                          color: "#000000",
                          border: "1px solid rgba(0,0,0,0.05)"
                        }}>
                        {type === "brand" ? "Brand Partner" : "UGC Creator"}
                      </span>
                    </div>
                    
                    {metric && (
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-black border tracking-wide tabular-nums"
                        style={{ 
                          background: "#000000",
                          borderColor: "#000000",
                          color: "#ffffff"
                        }}>
                        {metric}
                      </span>
                    )}
                  </div>

                  {/* Testimonial Quote text */}
                  <p className="text-[13px] md:text-[14px] leading-relaxed mb-6 relative z-10" style={{ color: "rgba(0,0,0,0.85)", fontFamily: "'DM Sans', sans-serif" }}>
                    "{text}"
                  </p>
                </div>

                {/* Profile row */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t relative z-10" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img src={avatar} alt={name} className="w-9 h-9 rounded-full object-cover border" style={{ borderColor: "rgba(0,0,0,0.1)" }} />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-black border-2 border-[#ffffff] flex items-center justify-center">
                        <Check size={8} className="text-white stroke-[4]" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{name}</p>
                      <p className="text-[10px]" style={{ color: "rgba(0,0,0,0.5)", fontFamily: "'DM Sans', sans-serif" }}>{role}</p>
                    </div>
                  </div>

                  {/* Social Platform Icon */}
                  <div className="text-black/40">
                    {platform === "instagram" && <Instagram size={13} />}
                    {platform === "youtube" && <Youtube size={13} />}
                    {platform === "tiktok" && (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.14-1.18-.75-.44-1.39-1.02-1.92-1.7v7.86c.02 2.36-1.17 4.67-3.28 5.75-2.11 1.09-4.8 1.02-6.84-.21-2.05-1.22-3.19-3.63-2.97-5.99.23-2.39 2.05-4.48 4.41-4.82.9-.13 1.83-.02 2.7.27v4.25c-.75-.24-1.58-.28-2.35-.08-1.02.26-1.84 1.18-1.98 2.22-.17 1.25.64 2.47 1.84 2.77 1.2.3 2.54-.34 2.94-1.52.12-.35.15-.73.15-1.1V.02z"/></svg>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Who It's For ─────────────────────────────────────────────────────────────
function WhoItsFor() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll(".who-card");
    if (!cards.length) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.7, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } }
      );
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  const brandTypes = ["Startups & D2C Brands", "Consumer & Lifestyle Brands", "Mobile Apps & SaaS", "Marketing Agencies", "Enterprise Teams"];
  const creatorTypes = ["Content Creators & Influencers", "UGC Specialists", "Students & Emerging Creators", "Videographers & Storytellers", "Anyone with a Camera & a Story"];

  return (
    <section ref={sectionRef} className="py-40 px-8" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f0fafd 100%)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>Who GOC Is For</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Built for the entire<br />creator economy</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="who-card rounded-2xl p-6 transition-all duration-300"
            style={{ background: "#d1f8ff", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 28px rgba(0,0,0,0.02)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#000000"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.02)"; }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#ffffff", color: "#000000", border: "1px solid rgba(0,0,0,0.1)" }}><Target size={20} /></div>
              <h3 className="text-xl font-bold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Brands</h3>
            </div>
            {brandTypes.map((item) => (
              <div key={item} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <Check size={14} style={{ color: "#000000", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "rgba(0,0,0,0.7)", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
              </div>
            ))}
            <button className="btn-primary-gradient mt-7 w-full py-3 rounded-xl text-sm">
              Launch a Campaign
            </button>
          </div>

          <div className="who-card rounded-2xl p-6 transition-all duration-300"
            style={{ background: "#ffffff", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 28px rgba(0,0,0,0.02)" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#000000"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.05)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.02)"; }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#d1f8ff", color: "#000000", border: "1px solid rgba(0,0,0,0.05)" }}><Camera size={20} /></div>
              <h3 className="text-xl font-bold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Creators</h3>
            </div>
            {creatorTypes.map((item) => (
              <div key={item} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
                <Check size={14} style={{ color: "#000000", flexShrink: 0 }} />
                <span className="text-sm" style={{ color: "rgba(0,0,0,0.7)", fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
              </div>
            ))}
            <button className="btn-secondary-dark mt-7 w-full py-3 rounded-xl text-sm">
              Start Creating Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const items = sectionRef.current.querySelectorAll(".faq-item");
    if (!items.length) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const faqs = [
    { q: "Do I need a large following to participate as a creator?", a: "No. Game of Creators is built around content quality and performance, not audience size. Creators with 500 followers win campaigns alongside creators with 500,000 followers every week." },
    { q: "How do brands set campaign budgets?", a: "Brands set a total prize pool and define reward tiers (1st place, top 10, top 25, etc.). You only distribute rewards to creators whose content you choose to accept and license." },
    { q: "What types of content can campaigns accept?", a: "Campaigns can specify any format: short-form video (TikTok/Reels), YouTube reviews, photography, written testimonials, podcast mentions, and more." },
    { q: "Who owns the content submitted to a campaign?", a: "Creators retain ownership of their work until a brand licenses it. Winning submissions come with clear licensing terms defined upfront in the campaign brief." },
    { q: "How quickly can I launch a campaign?", a: "Most brands launch their first campaign within 24 hours of signing up. Our brief builder guides you in under 30 minutes." },
    { q: "Is GOC free for creators?", a: "Yes. Creators join, browse campaigns, and submit content for free. GOC takes a small platform commission only when prize payouts are processed." },
  ];

  return (
    <section ref={sectionRef} className="py-40 px-8" style={{ background: "linear-gradient(180deg, #f0fafd 0%, #ffffff 100%)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 block" style={{ color: "#000000", fontFamily: "'DM Sans', sans-serif" }}>FAQ</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Questions, answered</h2>
        </div>
        <div className="flex flex-col gap-3">
          {faqs.map(({ q, a }, i) => (
            <div key={i} className="faq-item rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
              style={{
                background: "#ffffff",
                border: open === i ? "1px solid rgba(0,0,0,0.15)" : "1px solid rgba(0,0,0,0.08)",
                boxShadow: open === i ? "0 8px 24px rgba(0,0,0,0.04)" : "0 4px 16px rgba(0,0,0,0.02)"
              }}
              onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <p className="text-sm font-semibold text-black" style={{ fontFamily: "'DM Sans', sans-serif" }}>{q}</p>
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{ background: open === i ? "#d1f8ff" : "rgba(0,0,0,0.05)" }}>
                  <ChevronDown size={14} style={{ color: open === i ? "#000000" : "rgba(0,0,0,0.4)", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
                </div>
              </div>
              <div style={{
                maxHeight: open === i ? 200 : 0,
                overflow: "hidden",
                transition: "max-height 0.35s ease",
              }}>
                <div className="px-5 pb-4">
                  <p className="text-[13px] leading-relaxed" style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>{a}</p>
                </div>
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
      gsap.fromTo(ref.current!, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" } }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-24 px-8" style={{ background: "#ffffff" }}>
      <div ref={ref} className="max-w-6xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden px-6 md:px-12 py-20 text-center"
          style={{ background: "linear-gradient(135deg, #d1f8ff 0%, #ffffff 100%)", border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 8px 32px rgba(0,0,0,0.02)" }}>

          {/* Animated light glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(255,255,255,0.8) 0%, transparent 65%)" }} />

          {/* Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.6) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

          {/* SVG trophy decoration */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 opacity-10 hidden md:block">
            <TrophySVG size={120} />
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10 hidden md:block rotate-12">
            <TrophySVG size={100} />
          </div>

          {/* Sparkles */}
          <SparkleSVG className="absolute top-8 left-1/4 opacity-40" />
          <SparkleSVG className="absolute bottom-8 right-1/4 opacity-30" style={{ width: 14, height: 14 } as React.CSSProperties} />
          <SparkleSVG className="absolute top-12 right-1/3 opacity-50" style={{ width: 12, height: 12 } as React.CSSProperties} />

          <div className="relative z-10">
            <div className="group inline-flex items-center gap-2.5 rounded-full p-1 pr-4 mb-6 text-xs font-medium transition-all duration-300 cursor-pointer"
              style={{ 
                background: "rgba(0, 0, 0, 0.03)", 
                border: "1px solid rgba(0, 0, 0, 0.08)", 
                backdropFilter: "blur(12px)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.02)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.25)";
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.05)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.04)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)";
                e.currentTarget.style.background = "rgba(0, 0, 0, 0.03)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.02)";
              }}
            >
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider"
                style={{ 
                  background: "#000000",
                  color: "#ffffff",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
                }}>
                <Trophy size={11} className="fill-white" />
                Live Now
              </span>
              <span className="flex items-center gap-1 text-black/80 font-medium tracking-wide" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The Arena is Open
                <ArrowUpRight size={13} className="text-black/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black" />
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-4 leading-tight"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              The future of marketing
              <br />
              <span style={{ color: "#000000" }}>
                belongs to creators
              </span>
            </h2>
            <p className="text-base max-w-xl mx-auto mb-8" style={{ color: "rgba(0,0,0,0.6)", fontFamily: "'DM Sans', sans-serif" }}>
              Join thousands of brands and creators building the world's largest creator-powered ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="btn-primary-gradient px-6 py-3 rounded-full font-bold text-sm">
                Launch a Campaign — Free
              </button>
              <button className="btn-secondary-white px-6 py-3 rounded-full font-bold text-sm">
                Start Creating Free
              </button>
            </div>
            <p className="mt-6 text-xs" style={{ color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
              No credit card required · Free for creators · Launch in under 30 minutes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer is imported from components/Footer

// ─── Campaign Inner Page Data & Platforms ───────────────────────────────────
const PLATFORMS = [
  { key:"yt", label:"YouTube",  icon:<Youtube  size={14}/> },
  { key:"tt", label:"TikTok",   icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.14-1.18-.75-.44-1.39-1.02-1.92-1.7v7.86c.02 2.36-1.17 4.67-3.28 5.75-2.11 1.09-4.8 1.02-6.84-.21-2.05-1.22-3.19-3.63-2.97-5.99.23-2.39 2.05-4.48 4.41-4.82.9-.13 1.83-.02 2.7.27v4.25c-.75-.24-1.58-.28-2.35-.08-1.02.26-1.84 1.18-1.98 2.22-.17 1.25.64 2.47 1.84 2.77 1.2.3 2.54-.34 2.94-1.52.12-.35.15-.73.15-1.1V.02z"/></svg> },
  { key:"ig", label:"Instagram",icon:<Instagram size={14}/> },
  { key:"x",  label:"X",        icon:<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style={{ display: 'inline-block' }}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { key:"fb", label:"Facebook", icon:<Facebook  size={14}/> },
];

function PlatformIcon({ p }: { p: string }) {
  if (p === "youtube" || p === "yt") {
    return <Youtube size={11} className="text-black" />;
  }
  if (p === "tiktok" || p === "tt") {
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-black" style={{ display: 'inline-block' }}>
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.44-4.14-1.18-.75-.44-1.39-1.02-1.92-1.7v7.86c.02 2.36-1.17 4.67-3.28 5.75-2.11 1.09-4.8 1.02-6.84-.21-2.05-1.22-3.19-3.63-2.97-5.99.23-2.39 2.05-4.48 4.41-4.82.9-.13 1.83-.02 2.7.27v4.25c-.75-.24-1.58-.28-2.35-.08-1.02.26-1.84 1.18-1.98 2.22-.17 1.25.64 2.47 1.84 2.77 1.2.3 2.54-.34 2.94-1.52.12-.35.15-.73.15-1.1V.02z"/>
      </svg>
    );
  }
  if (p === "instagram" || p === "ig") {
    return <Instagram size={11} className="text-black" />;
  }
  if (p === "twitter" || p === "x") {
    return (
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" className="text-black" style={{ display: 'inline-block' }}>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }
  if (p === "facebook" || p === "fb") {
    return <Facebook size={11} className="text-black" />;
  }
  return null;
}

function CardContent({ c, hovered = false }: { c: typeof ALL_CAMPAIGN_DATA[0]; hovered?: boolean }) {
  const percent = c.budgetVal ? Math.min(100, Math.round((c.spentVal / c.budgetVal) * 100)) : 0;
  const matchRate = 90 + (c.id * 3) % 10;
  const isAlmostFull = percent >= 90;
  const urgencyColor = c.daysLeft <= 3 ? "#ef4444" : c.daysLeft <= 7 ? "#f59e0b" : "#22c55e";

  return (
    <div className="flex flex-col h-full rounded-2xl overflow-hidden bg-white">

      {/* ─── Image Zone ─── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <img
          src={c.img}
          alt={c.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1.01)" }}
        />

        {/* Gradient overlay — strong bottom fade */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.45) 100%)"
        }} />

        {/* Shimmer streak on hover */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 -left-full h-full w-1/3 transition-all duration-700"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
              transform: hovered ? "translateX(400%)" : "translateX(0%)",
              transitionTimingFunction: "ease-in-out",
            }}
          />
        </div>

        {/* Brand badge — top left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg"
          style={{
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}>
          <div className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] font-extrabold text-white"
            style={{ background: c.logoColor, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {c.logo}
          </div>
          <span className="text-[10px] font-bold text-white/90 truncate max-w-[90px]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>{c.brand}</span>
        </div>

        {/* HOT / Match pill — top right */}
        <div className="absolute top-3 right-3">
          {c.hot ? (
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-extrabold tracking-widest uppercase text-white"
              style={{
                background: "linear-gradient(135deg, #ff4e00, #ec9f05)",
                boxShadow: "0 0 12px rgba(255,78,0,0.5)",
              }}>
              <Flame size={9} className="fill-white" /> HOT
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-[9px] font-bold text-black"
              style={{
                background: "rgba(209,248,255,0.95)",
                border: "1px solid rgba(0,0,0,0.12)",
                backdropFilter: "blur(6px)",
                fontFamily: "'DM Sans', sans-serif",
              }}>
              {matchRate}% Match
            </span>
          )}
        </div>

        {/* Days left pill — bottom left inside image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold"
          style={{
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(6px)",
            color: urgencyColor,
            border: `1px solid ${urgencyColor}40`,
          }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: urgencyColor, display: "inline-block", boxShadow: `0 0 5px ${urgencyColor}` }} />
          {c.daysLeft}d left
        </div>

        {/* Platform icons — bottom right inside image */}
        <div className="absolute bottom-3 right-3 flex gap-1">
          {c.platforms?.map(p => (
            <div key={p} className="w-5 h-5 rounded flex items-center justify-center"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <PlatformIcon p={p} />
            </div>
          ))}
        </div>

        {/* Hover play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.25s ease" }}>
          <div className="w-11 h-11 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255,255,255,0.95)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              transform: hovered ? "scale(1)" : "scale(0.7)",
              transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            }}>
            <Play size={16} className="fill-black ml-0.5" />
          </div>
        </div>
      </div>

      {/* ─── Details Zone ─── */}
      <div className="p-4 flex flex-col gap-2.5 flex-grow">

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {c.tags.slice(0, 2).map(tag => (
            <span key={tag}
              className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider"
              style={{
                background: "rgba(209,248,255,0.6)",
                color: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(0,0,0,0.07)",
                fontFamily: "'DM Sans', sans-serif",
              }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          className="text-sm font-bold text-black leading-snug line-clamp-2"
          style={{
            fontFamily: "'Bricolage Grotesque', sans-serif",
            transition: "opacity 0.2s",
            opacity: hovered ? 0.85 : 1,
          }}>
          {c.title}
        </h3>

        {/* Budget progress */}
        <div>
          <div className="flex justify-between items-center text-[10px] mb-1.5"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>
            <span className="font-semibold text-black/50">Budget filled</span>
            <span className="font-extrabold" style={{ color: isAlmostFull ? "#ef4444" : "#000000" }}>
              {percent}%
            </span>
          </div>
          <div className="w-full rounded-full overflow-hidden" style={{ height: 5, background: "rgba(0,0,0,0.07)" }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${percent}%`,
                background: isAlmostFull
                  ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                  : "linear-gradient(90deg, #d1f8ff, #000000)",
              }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] mt-1"
            style={{ color: "rgba(0,0,0,0.4)", fontFamily: "'DM Sans', sans-serif" }}>
            <span>{c.spent} spent</span>
            <span>{c.budget}</span>
          </div>
        </div>

        {/* Footer metrics */}
        <div className="flex items-center justify-between pt-2 mt-auto"
          style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          {/* Creators */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{
              background: "rgba(0,0,0,0.04)",
              color: "rgba(0,0,0,0.55)",
              fontFamily: "'DM Sans', sans-serif",
            }}>
            <Users size={10} style={{ color: "rgba(0,0,0,0.4)" }} />
            <span>{c.creators.toLocaleString()} creators</span>
          </div>

          {/* Pay rate */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-extrabold text-white"
            style={{
              background: "#000000",
              fontFamily: "'Bricolage Grotesque', sans-serif",
              letterSpacing: "0.02em",
            }}>
            <DollarSign size={9} />
            {c.payRate}/{c.payUnit.includes("1K") ? "1K" : "view"}
          </div>
        </div>
      </div>
    </div>
  );
}

function CampaignCard({ c, onClick, delay = 0 }: { c: typeof ALL_CAMPAIGN_DATA[0]; onClick: () => void; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay }
    );
  }, [delay]);

  return (
    <div
      ref={ref}
      className="group relative w-full opacity-0 rounded-2xl cursor-pointer flex flex-col"
      style={{
        background: "#ffffff",
        border: hovered ? "1px solid rgba(0,0,0,0.18)" : "1px solid rgba(0,0,0,0.07)",
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)"
          : "0 2px 12px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34,1.2,0.64,1), box-shadow 0.3s ease, border-color 0.2s ease",
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Subtle top accent line on hover */}
      <div
        className="absolute top-0 left-4 right-4 h-px rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.15), transparent)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />
      <CardContent c={c} hovered={hovered} />
    </div>
  );
}

function CampaignDetailModal({ campaign, onClose }: { campaign: typeof ALL_CAMPAIGN_DATA[0]; onClose:()=>void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity:0 }, { opacity:1, duration:0.3, ease:"power2.out" });
      gsap.fromTo(panelRef.current,   { y:60, opacity:0, scale:0.97 }, { y:0, opacity:1, scale:1, duration:0.5, ease:"power3.out", delay:0.05 });
    });
    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);

  const close = () => {
    gsap.to(panelRef.current,   { y:40, opacity:0, scale:0.97, duration:0.3, ease:"power2.in" });
    gsap.to(overlayRef.current, { opacity:0, duration:0.35, delay:0.1, onComplete: onClose });
  };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background:"rgba(0,0,0,0.5)", backdropFilter:"blur(8px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}>
      <div ref={panelRef} className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl"
        style={{ background:"#ffffff", border:"1px solid rgba(0,0,0,0.08)", boxShadow:"0 40px 120px rgba(0,0,0,0.15)" }}>

        {/* Cover */}
        <div className="relative h-56 flex-shrink-0 overflow-hidden rounded-t-3xl">
          <img src={campaign.img} alt={campaign.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0" style={{ background:"linear-gradient(to bottom, transparent 40%, #ffffff 100%)" }} />

          {/* Close btn */}
          <button onClick={close} className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-10"
            style={{ background:"rgba(255,255,255,0.9)", backdropFilter:"blur(8px)", border:"1px solid rgba(0,0,0,0.1)", color:"rgba(0,0,0,0.7)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#000000")} onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,0,0,0.7)")}>
            <X size={16}/>
          </button>

          {/* Brand badge */}
          <div className="absolute bottom-4 left-5 flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-xs"
              style={{ background:campaign.logoColor, fontFamily:"'Bricolage Grotesque',sans-serif" }}>{campaign.logo}</div>
            <div>
              <p className="text-sm font-bold text-black" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{campaign.brand}</p>
              <div className="flex gap-1 mt-0.5">
                {campaign.tags.map(t => {
                  return <span key={t} className="px-1.5 py-0.5 rounded text-xs font-semibold" style={{ background:"rgba(0,0,0,0.05)", color:"#000000", border:"1px solid rgba(0,0,0,0.08)", fontFamily:"'DM Sans',sans-serif", fontSize:10 }}>{t}</span>; })}
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-6 custom-modal-scrollbar">
          <h2 className="text-2xl font-extrabold text-black mb-2" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>{campaign.title}</h2>

          {/* Key metrics */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              { 
                label: "Prize Pool", 
                val: campaign.prize, 
                icon: <Trophy size={16} />, 
                iconBg: "rgba(245, 166, 35, 0.08)", 
                iconColor: "#c4820f" 
              },
              { 
                label: "Pay Rate",   
                val: `${campaign.payRate}/${campaign.payUnit}`, 
                icon: <DollarSign size={16} />, 
                iconBg: "rgba(34, 197, 94, 0.08)", 
                iconColor: "#16a34a" 
              },
              { 
                label: "Submissions",
                val: campaign.submissions.toLocaleString(), 
                icon: <Users size={16} />, 
                iconBg: "rgba(59, 130, 246, 0.08)", 
                iconColor: "#2563eb" 
              },
              { 
                label: "Days Left",  
                val: `${campaign.daysLeft}d`, 
                icon: <Clock size={16} />, 
                iconBg: "rgba(239, 68, 68, 0.08)", 
                iconColor: "#dc2626" 
              },
            ].map(({ label, val, icon, iconBg, iconColor }) => (
              <div key={label} className="rounded-2xl p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.03] cursor-pointer"
                style={{ 
                  background: "rgba(255, 255, 255, 0.85)", 
                  border: `1px solid ${iconBg.replace("0.08", "0.2")}`, 
                  boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
                  height: "108px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = iconColor;
                  e.currentTarget.style.boxShadow = `0 6px 18px ${iconBg.replace("0.08", "0.12")}`;
                  e.currentTarget.style.background = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = iconBg.replace("0.08", "0.2");
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.01)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.85)";
                }}
              >
                <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0"
                  style={{ background: iconBg, color: iconColor }}>
                  {icon}
                </div>
                <div className="mt-2.5 w-full flex-1 flex flex-col justify-center">
                  <p className="text-xs md:text-sm font-extrabold text-black leading-tight tracking-tight whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }} title={val}>{val}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider mt-0.5 text-black/40" style={{ fontFamily: "'DM Sans', sans-serif" }}>{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Brief */}
          <div className="rounded-2xl p-5 mb-5" style={{ background:"rgba(0,0,0,0.02)", border:"1px solid rgba(0,0,0,0.04)", boxShadow:"0 4px 16px rgba(0,0,0,0.01)" }}>
            <p className="text-sm font-bold text-black mb-2" style={{ fontFamily:"'Bricolage Grotesque',sans-serif" }}>Campaign Brief</p>
            <p className="text-sm leading-relaxed" style={{ color:"rgba(0,0,0,0.6)", fontFamily:"'DM Sans',sans-serif" }}>
              Create authentic, engaging content featuring {campaign.brand}'s products or services. Content should feel native to the platform — no hard sells. Show how {campaign.brand} fits into your real life. High-energy edits, storytelling formats, and before/after content performs best on this campaign.
            </p>
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-2">
            {[
              `Minimum ${campaign.views} combined views to qualify for top tier`,
              `Content must feature ${campaign.brand} branding visibly`,
              "No competitor brand mentions",
              "Must be original content — no reposts",
              "All platforms accepted: TikTok, Instagram Reels, YouTube Shorts",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Check size={14} className="flex-shrink-0 mt-0.5 text-black"/>
                <span className="text-sm" style={{ color:"rgba(0,0,0,0.7)", fontFamily:"'DM Sans',sans-serif" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Footer */}
        <div className="p-5 border-t border-black/5 bg-white rounded-b-3xl flex-shrink-0"
          style={{ boxShadow: "0 -8px 24px rgba(0,0,0,0.02)" }}>
          <button className="btn-primary-gradient w-full py-4 rounded-2xl text-base font-bold shadow-sm">
            Join Campaign — Start Earning
          </button>
        </div>

      </div>
    </div>
  );
}

function CustomDropdown({ 
  label, 
  value, 
  options, 
  onSelect 
}: { 
  label: string; 
  value: string; 
  options: string[]; 
  onSelect: (val: string) => void; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white border border-black/12 text-black/80 hover:text-black hover:bg-black/5 hover:border-black/20 transition-all duration-200 flex items-center gap-1.5 focus:outline-none"
      >
        <span>{value === "All" || value === "All Categories" ? label : `${label}: ${value}`}</span>
        <ChevronDown size={12} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-1.5 w-44 rounded-xl bg-white border border-black/12 shadow-2xl z-[150] overflow-y-auto max-h-60" style={{ scrollbarWidth: "none" }}>
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onSelect(opt);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs transition-colors duration-150 block ${
                value === opt 
                  ? "bg-[#d1f8ff] text-black font-bold" 
                  : "text-black/70 hover:text-black hover:bg-black/5"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function CampaignInnerPage({ onClose, onHome }: { onClose:()=>void; onHome:()=>void }) {
  const [search, setSearch]       = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [activePlat, setActivePlat] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [contentFilter, setContentFilter] = useState("All");
  const [selectedCamp, setSelectedCamp] = useState<typeof ALL_CAMPAIGN_DATA[0] | null>(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);

  const pageRef  = useRef<HTMLDivElement>(null);
  const heroRef  = useRef<HTMLDivElement>(null);
  const gridRef  = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const featuredCamp = ALL_CAMPAIGN_DATA.filter(c => c.featured);

  // Auto-playing billboard slider
  useEffect(() => {
    if (isSliderHovered) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % featuredCamp.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredCamp.length, isSliderHovered, activeSlide]);

  // Global keydown event listener for search bar focus (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Row categorization for Netflix layout when showing "All" campaigns and no filters are active
  const trendingCampaigns = ALL_CAMPAIGN_DATA.filter(c => c.featured || c.hot || c.daysLeft < 10);
  const clippingCampaigns = ALL_CAMPAIGN_DATA.filter(c => c.tags.includes("Clipping"));
  const productCampaigns = ALL_CAMPAIGN_DATA.filter(c => c.tags.includes("Product") || c.tags.includes("Logo"));
  const entertainmentCampaigns = ALL_CAMPAIGN_DATA.filter(c => c.tags.includes("Entertainment") || c.tags.includes("Personal Brand"));

  // Check if any filter is active
  const isFilterActive = search !== "" || activePlat.length > 0 || activeCat !== "All" || statusFilter !== "All" || contentFilter !== "All";

  const filtered = ALL_CAMPAIGN_DATA.filter(c => {
    const matchSearch = search === "" || 
      c.title.toLowerCase().includes(search.toLowerCase()) || 
      c.brand.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    
    const matchCat = activeCat === "All" || 
      c.tags.some(t => t.toLowerCase() === activeCat.toLowerCase());
    
    const matchPlat = activePlat.length === 0 || c.platforms?.some(p => {
      const normP = p === "youtube" ? "yt" : p === "tiktok" ? "tt" : p === "instagram" ? "ig" : p === "twitter" ? "x" : p === "facebook" ? "fb" : p;
      return activePlat.includes(normP);
    });

    const matchStatus = statusFilter === "All" || 
      (statusFilter === "Active" && c.daysLeft > 3) || 
      (statusFilter === "Ending Soon" && c.daysLeft <= 3);

    const matchContent = contentFilter === "All" || 
      c.tags.some(t => t.toLowerCase() === contentFilter.toLowerCase());

    return matchSearch && matchCat && matchPlat && matchStatus && matchContent;
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      // Page slides up
      gsap.fromTo(pageRef.current,  { y:"100%", opacity:0 }, { y:0, opacity:1, duration:0.6, ease:"power4.out" });
      // Hero content staggers in
      gsap.fromTo(".camp-hero-item", { opacity:0, y:30 }, { opacity:1, y:0, stagger:0.1, duration:0.7, ease:"power2.out", delay:0.4 });
    });
    return () => { ctx.revert(); document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    gsap.to(pageRef.current, { y:"100%", opacity:0, duration:0.5, ease:"power4.in", onComplete: onClose });
  };

  const togglePlat = (k: string) =>
    setActivePlat(p => p.includes(k) ? p.filter(x => x !== k) : [...p, k]);

  return (
    <>
      <div ref={pageRef} className="fixed inset-0 z-[100] overflow-y-auto bg-white text-black"
        style={{ fontFamily:"'DM Sans',sans-serif" }}>

        {/* ── Global navigation bar (solid white) ── */}
        <Nav solid={true} />

        {/* ── Cinematic Hero Billboard Slider ── */}
        <div 
          ref={heroRef} 
          className="relative overflow-hidden w-full flex items-center bg-[#d1f8ff] select-none" 
          style={{ minHeight: 520 }}
          onMouseEnter={() => setIsSliderHovered(true)}
          onMouseLeave={() => setIsSliderHovered(false)}
        >
          {/* Cross-fading slides */}
          {featuredCamp.map((camp, idx) => {
            const isActive = idx === activeSlide;
            return (
              <div
                key={camp.id}
                className="absolute inset-0 w-full h-full"
                style={{
                  opacity: isActive ? 1 : 0,
                  visibility: isActive ? "visible" : "hidden",
                  pointerEvents: isActive ? "auto" : "none",
                  transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                  transform: isActive ? "scale(1)" : "scale(1.05)",
                }}
              >
                {/* Background Image */}
                <img 
                  src={camp.img} 
                  alt={camp.title}
                  className="absolute inset-0 w-full h-full object-cover" 
                  style={{ opacity: 0.35 }}
                />

                {/* Immersive cinematic fading overlays with ice blue gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#d1f8ff] via-[#d1f8ff]/70 to-transparent w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#d1f8ff] via-[#d1f8ff]/30 to-transparent w-full h-full" />

                {/* Content panel */}
                <div className="relative z-10 px-6 md:px-16 pt-24 pb-16 max-w-2xl flex flex-col justify-center h-full">
                  {/* Brand badge */}
                  <div className="camp-hero-item flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-md flex items-center justify-center text-white font-extrabold text-[9px]"
                      style={{ background: camp.logoColor, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {camp.logo}
                    </div>
                    <span className="text-xs font-bold text-black/80">{camp.brand}</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-black text-white flex items-center justify-center text-[8px] font-bold">✓</span>
                  </div>

                  {/* Giant movie style title */}
                  <h1 className="camp-hero-item text-4xl md:text-5xl lg:text-6xl font-extrabold text-black mb-3 leading-tight tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {camp.title}
                  </h1>

                  {/* Netflix styled metadata */}
                  <div className="camp-hero-item flex items-center gap-3 text-xs font-semibold mb-4 text-black/60 flex-wrap">
                    <span className="text-black font-extrabold">98% Match</span>
                    <span>2026</span>
                    <span className="px-1.5 py-0.2 border border-black/35 rounded text-[9px] font-bold tracking-wide text-black">UGC-18</span>
                    <span>{camp.submissions.toLocaleString()} submissions</span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-black text-white">4K Ultra HD</span>
                  </div>

                  {/* Cinematic short brief description */}
                  <p className="camp-hero-item text-sm text-black/70 mb-8 leading-relaxed max-w-lg">
                    Earn <strong className="text-black">{camp.payRate} per {camp.payUnit}</strong> on GOC's premium campaign. Showcase your content creation abilities and compete for a slice of the <strong className="text-black">{camp.prize}</strong> budget pool. Vertical edits and native hooks perform best.
                  </p>

                  {/* Large styled rect buttons */}
                  <div className="camp-hero-item flex items-center gap-3">
                    <button onClick={() => setSelectedCamp(camp)}
                      className="bg-black text-white hover:bg-black/90 transition-all duration-200 font-bold px-6 py-3 rounded-lg text-sm flex items-center gap-2 shadow-lg cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <Flame size={16} className="fill-white text-white" /> Join Campaign
                    </button>
                    <button onClick={() => setSelectedCamp(camp)}
                      className="bg-white text-black hover:bg-black/5 transition-all duration-200 font-bold px-6 py-3 rounded-lg text-sm flex items-center gap-2 border border-black/25 backdrop-blur-md cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      <Play size={14} className="fill-black text-black" /> View Brief
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Previous/Next Navigation Arrows */}
          <div className="absolute right-8 bottom-12 flex gap-3 z-20">
            <button 
              onClick={() => setActiveSlide(prev => (prev - 1 + featuredCamp.length) % featuredCamp.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-black/15 bg-white/90 text-black hover:bg-black hover:text-white transition-all duration-200 focus:outline-none cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              onClick={() => setActiveSlide(prev => (prev + 1) % featuredCamp.length)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-black/15 bg-white/90 text-black hover:bg-black hover:text-white transition-all duration-200 focus:outline-none cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          {/* Indicator dashes */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {featuredCamp.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? "w-8 bg-black" : "w-3 bg-black/30 hover:bg-black/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── Interactive Search & Social Platform Filter Bar ── */}
        <div className="sticky top-[64px] z-40 bg-white/90 backdrop-blur-md border-b border-black/8 px-6 md:px-12 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left controls: Search & Platform Filters */}
          <div className="flex items-center gap-3 flex-wrap flex-1 max-w-3xl">
            {/* Search Input Container */}
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </div>
              <input 
                ref={searchInputRef}
                value={search} 
                onChange={e => setSearch(e.target.value)}
                placeholder="Campaigns and creators"
                className="w-full pl-9 pr-14 py-2 rounded-lg text-xs outline-none transition-all duration-200 placeholder:text-black/40 text-black"
                style={{ 
                  background: "rgba(0, 0, 0, 0.03)", 
                  border: "1px solid rgba(0, 0, 0, 0.08)", 
                  caretColor: "#000000" 
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "#000000")}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(0, 0, 0, 0.08)")} 
              />
              {/* Keyboard shortcut hint badge */}
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-black/40 bg-black/5 border border-black/10 px-1.5 py-0.5 rounded pointer-events-none select-none">
                ⌘K
              </span>
            </div>

            {/* Reset / Sliders Icon Button */}
            <button 
              onClick={() => {
                setSearch("");
                setActivePlat([]);
                setStatusFilter("All");
                setActiveCat("All");
                setContentFilter("All");
              }}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-black/5 border border-black/8 text-black/60 hover:text-black hover:bg-black/10 hover:border-black/20 transition-all duration-200 focus:outline-none cursor-pointer"
              title="Reset all filters"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x1-2="4" y1="21" y2="14"/><line x1="4" x1-2="4" y1="10" y2="3"/><line x1="12" x1-2="12" y1="21" y2="12"/><line x1="12" x1-2="12" y1="8" y2="3"/><line x1="20" x1-2="20" y1="21" y2="16"/><line x1="20" x1-2="20" y1="12" y2="3"/><line x1="2" x1-2="6" y1="14" y2="14"/><line x1="10" x1-2="14" y1="8" y2="8"/><line x1="18" x1-2="22" y1="16" y2="16"/></svg>
            </button>

            {/* Platform circular filter buttons */}
            <div className="flex items-center gap-2">
              {PLATFORMS.map(({ key, icon, label }) => {
                const isActive = activePlat.includes(key);
                return (
                  <button 
                    key={key} 
                    onClick={() => togglePlat(key)}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none cursor-pointer"
                    style={{
                      background: isActive ? "#000000" : "rgba(0, 0, 0, 0.03)",
                      color:      isActive ? "#ffffff" : "rgba(0, 0, 0, 0.6)",
                      border:     `1px solid ${isActive ? "#000000" : "rgba(0, 0, 0, 0.08)"}`,
                    }}
                    title={`Filter by ${label}`}
                  >
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right controls: Dropdowns */}
          <div className="flex items-center gap-2.5">
            <CustomDropdown 
              label="Status" 
              value={statusFilter} 
              options={["All", "Active", "Ending Soon"]} 
              onSelect={setStatusFilter} 
            />
            <CustomDropdown 
              label="Category" 
              value={activeCat} 
              options={CATS} 
              onSelect={setActiveCat} 
            />
            <CustomDropdown 
              label="Content" 
              value={contentFilter} 
              options={["All", "Clipping", "Product", "UGC"]} 
              onSelect={setContentFilter} 
            />
          </div>
        </div>

        {/* ── Category pills selector ── */}
        <div className="px-6 md:px-12 py-6 flex items-center gap-2 overflow-x-auto" style={{ scrollbarWidth:"none" }}>
          {CATS.map(cat => (
            <button key={cat} onClick={() => setActiveCat(cat)}
              className="px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 flex-shrink-0 cursor-pointer"
              style={{
                background: activeCat===cat ? "#000000" : "#ffffff",
                color:      activeCat===cat ? "#ffffff" : "rgba(0,0,0,0.6)",
                border:     `1px solid ${activeCat===cat ? "#000000" : "rgba(0,0,0,0.12)"}`,
                fontFamily: "'DM Sans',sans-serif",
              }}>
              {cat}
            </button>
          ))}
        </div>

        <div className="pb-24">
          {/* If no search, no platform filters, and browse categories: show Netflix-Style Horizontal Rows */}
          {!isFilterActive ? (
            <div className="space-y-12">
              {/* Row 1: Featured (Trending Now) */}
              {trendingCampaigns.length > 0 && (
                <div className="select-none">
                  <h2 className="text-lg md:text-xl font-bold text-black mb-4 px-6 md:px-12 tracking-wide" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Trending Now
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 px-6 md:px-12 py-3">
                    {trendingCampaigns.map((c, i) => (
                      <CampaignCard key={c.id} c={c} delay={i * 0.05} onClick={() => setSelectedCamp(c)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Row 2: Clipping Arenas */}
              {clippingCampaigns.length > 0 && (
                <div className="select-none">
                  <h2 className="text-lg md:text-xl font-bold text-black mb-4 px-6 md:px-12 tracking-wide" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Clipping & Content Edits
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 px-6 md:px-12 py-3">
                    {clippingCampaigns.map((c, i) => (
                      <CampaignCard key={c.id} c={c} delay={i * 0.05} onClick={() => setSelectedCamp(c)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Row 3: Product Challenges */}
              {productCampaigns.length > 0 && (
                <div className="select-none">
                  <h2 className="text-lg md:text-xl font-bold text-black mb-4 px-6 md:px-12 tracking-wide" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Product Integration & Branding
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 px-6 md:px-12 py-3">
                    {productCampaigns.map((c, i) => (
                      <CampaignCard key={c.id} c={c} delay={i * 0.05} onClick={() => setSelectedCamp(c)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Row 4: Personal Brand & Entertainment */}
              {entertainmentCampaigns.length > 0 && (
                <div className="select-none">
                  <h2 className="text-lg md:text-xl font-bold text-black mb-4 px-6 md:px-12 tracking-wide" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Creators & Entertainment
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 px-6 md:px-12 py-3">
                    {entertainmentCampaigns.map((c, i) => (
                      <CampaignCard key={c.id} c={c} delay={i * 0.05} onClick={() => setSelectedCamp(c)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Otherwise, show standard category grid of results */
            <div className="px-6 md:px-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-extrabold text-black flex items-center gap-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {search === "" ? `${activeCat} Campaigns` : `Search Results`}
                  <span className="text-sm font-normal text-black/40" style={{ fontFamily: "'DM Sans',sans-serif" }}>{filtered.length} found</span>
                </h2>
              </div>

              {filtered.length === 0 ? (
                <div className="text-center py-24 select-none">
                  <p className="text-lg font-bold text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>No matches in this category</p>
                  <p className="text-sm text-black/50" style={{ fontFamily: "'DM Sans', sans-serif" }}>Try checking your search filters or browse other genres</p>
                </div>
              ) : (
                <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
                  {filtered.map((c, i) => (
                    <CampaignCard key={c.id} c={c} delay={i * 0.04} onClick={() => setSelectedCamp(c)} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Detail modal */}
      {selectedCamp && (
        <CampaignDetailModal campaign={selectedCamp} onClose={() => setSelectedCamp(null)} />
      )}
    </>
  );
}

// Sizing-optimized and interactive video card component with hover preview play
function VideoShowcaseCard({ 
  vid, 
  onClick 
}: { 
  vid: {
    id: number;
    creator: string;
    avatar: string;
    brand: string;
    views: string;
    likes: string;
    thumbnail: string;
    videoUrl: string;
  }; 
  onClick: () => void; 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isHovered) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isHovered]);

  return (
    <div 
      className="vs-card group relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer w-full max-w-[210px] md:max-w-[225px] mx-auto transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] hover:border-black/30"
      style={{ border: "1px solid rgba(0,0,0,0.1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Video component */}
      <video
        ref={videoRef}
        src={vid.videoUrl}
        loop
        muted
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-0 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Image Thumbnail */}
      <img 
        src={vid.thumbnail} 
        alt={`${vid.creator} video`} 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 z-10 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      />
      
      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-20 pointer-events-none" />

      {/* Center Play Icon on Hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 pointer-events-none">
        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transform scale-90 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-4 h-4 text-white ml-0.5" />
        </div>
      </div>

      {/* Header Info badges */}
      <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-30 pointer-events-none">
        <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-black/50 backdrop-blur-sm text-white border border-white/10 uppercase tracking-wider">
          {vid.brand}
        </span>
        <div className="flex gap-2">
          <span className="flex items-center gap-1 text-[9px] font-medium text-white/90 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10">
            <Play className="w-2.5 h-2.5" /> {vid.views}
          </span>
        </div>
      </div>

      {/* Bottom Info details */}
      <div className="absolute bottom-3 left-3 right-3 z-30 pointer-events-none">
        <div className="flex items-center gap-2">
          <img src={vid.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-white/20 object-cover" />
          <div className="min-w-0">
            <p className="text-white text-[11px] font-semibold truncate">{vid.creator}</p>
            <p className="text-white/60 text-[9px] flex items-center gap-1 truncate mt-0.5">
              <TrendingUp className="w-2.5 h-2.5 text-white" /> {vid.likes} likes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Fullscreen portrait style custom video player modal
function VideoLightboxModal({ 
  video, 
  onClose 
}: { 
  video: {
    id: number;
    creator: string;
    avatar: string;
    brand: string;
    views: string;
    likes: string;
    thumbnail: string;
    videoUrl: string;
  }; 
  onClose: () => void; 
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    });
    return () => {
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  const close = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: onClose });
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <div 
      ref={overlayRef} 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
    >
      <div 
        className="relative w-full max-w-sm aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl flex flex-col justify-between border border-white/10 animate-fade-in"
        style={{ maxHeight: "85vh" }}
      >
        {/* Actual Video */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          autoPlay
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85 pointer-events-none" />

        {/* Close button */}
        <button 
          onClick={close} 
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 z-50 bg-black/40 hover:bg-black/60 border border-white/10 text-white/70 hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Campaign Tag (Top Left) */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#d1f8ff] text-black shadow-md border border-black/10 uppercase tracking-wider">
            {video.brand} UGC
          </span>
        </div>

        {/* Big play/pause overlay trigger button */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button 
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-md opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity duration-300 pointer-events-auto shadow-xl"
          >
            {isPlaying ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            ) : (
              <Play size={20} className="ml-1 fill-white text-white" />
            )}
          </button>
        </div>

        {/* Bottom Panel (Glassmorphic) */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col gap-3 pointer-events-auto">
          {/* Creator and Stats */}
          <div className="flex items-center gap-3">
            <img src={video.avatar} alt="Avatar" className="w-10 h-10 rounded-full border border-white/20 object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-bold tracking-wide">{video.creator}</p>
              <p className="text-white/60 text-xs flex items-center gap-1.5 mt-0.5 truncate">
                <Play className="w-3 h-3" /> {video.views} views • <TrendingUp className="w-3 h-3 text-white" /> {video.likes} likes
              </p>
            </div>
            
            {/* Audio Toggle */}
            <button 
              onClick={toggleMute}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 text-white transition-all duration-200"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v6a3 3 0 0 0 3 3h1.586l4.707 4.707A1 1 0 0 0 20 22V4a1 1 0 0 0-1.707-.707L13.586 8H12a3 3 0 0 0-3 3z"/></svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Landing page component  
function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<{
    id: number;
    creator: string;
    avatar: string;
    brand: string;
    views: string;
    likes: string;
    thumbnail: string;
    videoUrl: string;
  } | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".vs-header", 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
      gsap.fromTo(".vs-card",
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.1, ease: "power2.out", scrollTrigger: { trigger: sectionRef.current, start: "top 65%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const videos = [
    {
      id: 1,
      creator: "@sarah.creates",
      avatar: "https://i.pravatar.cc/100?img=1",
      brand: "Lumin Skin",
      views: "1.2M",
      likes: "124K",
      thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    },
    {
      id: 2,
      creator: "@tech.reviewer",
      avatar: "https://i.pravatar.cc/100?img=11",
      brand: "Sony",
      views: "890K",
      likes: "65K",
      thumbnail: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    },
    {
      id: 3,
      creator: "@lifestyle.emma",
      avatar: "https://i.pravatar.cc/100?img=5",
      brand: "Nordstrom",
      views: "2.4M",
      likes: "340K",
      thumbnail: "https://images.unsplash.com/photo-1512413913426-30b12bc12eb2?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    },
    {
      id: 4,
      creator: "@fitness.jay",
      avatar: "https://i.pravatar.cc/100?img=8",
      brand: "Gymshark",
      views: "500K",
      likes: "45K",
      thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 px-6 md:px-8 relative overflow-hidden bg-white">
      {/* Soft background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-25">
        <HeroOrb size={700} opacity={0.4} blur={60} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-14 vs-header">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ background: "#d1f8ff", color: "#000000", border: "1px solid rgba(0,0,0,0.08)", fontFamily: "'DM Sans', sans-serif" }}>
            Creator Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight">
            See the <span className="italic font-light" style={{ color: "#000000" }}>Content</span> In Action
          </h2>
          <p className="text-black/60 text-base max-w-xl mx-auto">
            Browse through some of the top-performing UGC and influencer campaigns created by our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((vid) => (
            <VideoShowcaseCard 
              key={vid.id} 
              vid={vid} 
              onClick={() => setActiveVideo(vid)}
            />
          ))}
        </div>
      </div>

      {/* Video Lightbox Modal */}
      {activeVideo && (
        <VideoLightboxModal 
          video={activeVideo} 
          onClose={() => setActiveVideo(null)} 
        />
      )}
    </section>
  );
}

export function LandingPageContent() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Nav onBrowse={() => navigate("/campaigns")} onHome={goHome} />
      <Hero onBrowse={() => navigate("/campaigns")} />
      <StatsBanner />
      <HowItWorks />
      <ComparisonTable />
      <ForBrands />
      <ForCreators />
      <CampaignShowcase onBrowse={() => navigate("/campaigns")} />
      <VideoShowcase />
      <Testimonials />
      <WhoItsFor />
      <FAQ />
      <CTABanner />
      <Footer />
    </div>
  );
}

// Main App with Router
export default function App() {
  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
  }, []);

  return <RouterProvider router={router} />;
}
