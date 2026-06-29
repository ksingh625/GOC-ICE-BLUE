import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Nav, Footer } from "../App";
import GOCLogo from "../../imports/GOC-Logo.png";
import { gsap } from "gsap";
import {
  Trophy, Check, Instagram, Youtube, Sparkles, Rocket,
  ArrowRight, Shield, Award, Users, CreditCard, ChevronDown, CheckCircle2,
  Calendar, Laptop, ChevronRight, MessageSquare
} from "lucide-react";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const ICE = "#d1f8ff";          // accent ice blue
const ICE_DIM = "rgba(209,248,255,0.2)";  // section tint
const BLK = "#000000";          // primary black
const BORDER = "rgba(0,0,0,0.08)";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  const plans = [
    {
      name: "Explorer Plan",
      monthlyPrice: 0,
      yearlyPrice: 0,
      desc: "Entry-level brands, startups, or small businesses wanting to test the platform.",
      features: [
        "1 active contests",
        "Min. budget $100.00",
        "Up to 3 winners",
        "30% commission",
        "Leaderboard-based contests only",
        "Advanced",
      ],
      buttonText: "Start Free",
      popular: false,
      color: "#22c55e",
    },
    {
      name: "Starter Plan",
      monthlyPrice: 100,
      yearlyPrice: 80,
      desc: "Small to medium-sized businesses that want to run more contests and grow their presence.",
      features: [
        "3 active contests",
        "Min. budget $100.00",
        "Up to 10 winners",
        "20% commission",
        "Leaderboard & CPM-based contests (2 Free contests per month)",
        "Advanced",
      ],
      buttonText: "Subscribe",
      popular: false,
      color: "#f97316",
    },
    {
      name: "Builder Plan",
      monthlyPrice: 250,
      yearlyPrice: 200,
      desc: "Medium to large brands looking to scale their presence and want more contests and flexibility.",
      features: [
        "15 active contests",
        "Min. budget $75.00",
        "Up to 25 winners",
        "12% commission",
        "Leaderboard & CPM-based contests (3 Free contests per month)",
        "Advanced",
        "Prioritized customer support",
      ],
      buttonText: "Subscribe",
      popular: true,
      color: "#a855f7",
    },
    {
      name: "Champion Plan",
      monthlyPrice: 500,
      yearlyPrice: 400,
      desc: "Large businesses, agencies, and enterprises looking to run high-volume campaigns with premium support.",
      features: [
        "50 active contests",
        "Min. budget $50.00",
        "Up to 50 winners",
        "10% commission",
        "Leaderboard & CPM-based contests (5 Free contests per month)",
        "Advanced",
        "Premium 24/7 dedicated support",
      ],
      buttonText: "Subscribe",
      popular: false,
      color: "#eab308",
    },
  ];

  return (
    <div className="min-h-screen text-black bg-white relative overflow-hidden" style={{ background: "#ffffff" }}>
      
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] rounded-full opacity-[0.35] pointer-events-none filter blur-[100px]" style={{ background: `radial-gradient(circle, ${ICE} 0%, transparent 75%)` }} />
      <div className="absolute top-[15%] right-[-10%] w-[45%] h-[35%] rounded-full opacity-[0.3] pointer-events-none filter blur-[100px]" style={{ background: `radial-gradient(circle, ${ICE} 0%, transparent 75%)` }} />
      <div className="absolute bottom-[25%] left-[15%] w-[55%] h-[35%] rounded-full opacity-[0.25] pointer-events-none filter blur-[120px]" style={{ background: `radial-gradient(circle, ${ICE} 0%, transparent 75%)` }} />

      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "45px 45px" }} />

      <Nav theme="light" showProfile={true} solid={true} />

      {/* HERO SECTION */}
      <header className="relative pt-16 pb-6 text-center px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d1f8ff]/20 border border-black/10 shadow-sm text-xs font-extrabold uppercase tracking-wider text-black/75 mb-8">
          <Trophy size={13} className="text-black/60 fill-black/10 animate-pulse" />
          #1 Gamified Creator Marketing Platform
        </div>

        {/* Social Media Pill */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white border border-black/10 shadow-sm">
            <Instagram size={20} className="text-pink-500 fill-pink-500/10" />
            <Youtube size={20} className="text-red-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
          </div>
        </div>

        {/* Headlines */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-black">
          Game Of Creators{" "}
          <span className="relative inline-block">
            Pricing
            <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" style={{ height: 8 }}>
              <path d="M0,6 C50,0 150,12 200,6" stroke={ICE} strokeWidth="5" fill="none" strokeLinecap="round" />
            </svg>
          </span>
        </h1>
        <p className="text-base md:text-lg text-black/60 max-w-xl mx-auto font-medium">
          The World's First Platform to Democratise Brand Deals
        </p>
      </header>

      {/* CHOOSE PLAN SECTION */}
      <section className="py-12 px-6 max-w-7xl mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-black/5 border border-black/10 text-black/70 mb-3">
            Select the ideal payment plan
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 text-black">
            Choose Your{" "}
            <span className="relative inline-block">
              Game Plan
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" style={{ height: 6 }}>
                <path d="M0,6 C50,0 150,12 200,6" stroke={ICE} strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-xs text-black/50 max-w-md mx-auto">
            Select the perfect plan to start winning with creator contests
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className={`text-xs font-bold transition-colors ${billingCycle === "monthly" ? "text-black" : "text-black/40"}`}>Monthly Subscription</span>
            <button 
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="w-12 h-6 rounded-full bg-black p-0.5 relative transition-colors duration-300 focus:outline-none border border-black/10"
            >
              <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 shadow-sm ${billingCycle === "yearly" ? "translate-x-6" : ""}`} />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold transition-colors ${billingCycle === "yearly" ? "text-black" : "text-black/40"}`}>Yearly Subscription</span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider bg-[#d1f8ff] text-black border border-black/10 px-2 py-0.5 rounded-full">Save 20%</span>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => {
            const price = billingCycle === "monthly" ? p.monthlyPrice : p.yearlyPrice;
            return (
              <div 
                key={p.name}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 border ${
                  p.popular 
                    ? "bg-white border-2 border-black shadow-xl scale-[1.03] z-10" 
                    : "bg-white/70 border border-black/10 hover:border-black/25 hover:scale-[1.01] shadow-sm hover:shadow-md"
                }`}
              >
                {/* Popular Badge */}
                {p.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white font-black text-[9px] uppercase tracking-widest py-1 px-3.5 rounded-full border border-black shadow-sm">
                    Most Popular
                  </span>
                )}

                <div>
                  {/* Plan Icon Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 rounded-3xl bg-black/5 border border-black/10 inline-block" style={{ color: p.color }}>
                      {p.name.includes("Explorer") && <Users size={20} />}
                      {p.name.includes("Starter") && <Rocket size={20} />}
                      {p.name.includes("Builder") && <Award size={20} />}
                      {p.name.includes("Champion") && <Trophy size={20} />}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold tracking-tight mb-2 text-black">{p.name}</h3>
                  <p className="text-xs text-black/50 leading-relaxed mb-6 font-medium">{p.desc}</p>

                  {/* Price */}
                  <div className="mb-6 flex items-baseline gap-1 text-black">
                    <span className="text-3xl font-black">${price.toFixed(2)}</span>
                    <span className="text-xs text-black/40">/month</span>
                  </div>

                  {/* Divider */}
                  <hr className="border-black/5 my-4" />

                  {/* Feature checklist */}
                  <div className="space-y-3.5 mb-8">
                    {p.features.map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check size={13} className="text-black mt-0.5 flex-shrink-0" />
                        <span className="text-[11px] leading-snug text-black/70 font-medium">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscribe button */}
                <button 
                  onClick={() => navigate("/get-started")}
                  className={`w-full py-3 rounded-full text-xs font-extrabold cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 ${
                    p.popular 
                      ? "btn-primary-gradient shadow-sm" 
                      : "btn-secondary-white"
                  }`}
                >
                  {p.buttonText}
                  <ChevronRight size={13} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHAT'S INCLUDED SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3 text-black">
            What's Included in{" "}
            <span className="relative inline-block">
              Every Plan
              <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 200 12" preserveAspectRatio="none" style={{ height: 6 }}>
                <path d="M0,6 C50,0 150,12 200,6" stroke={ICE} strokeWidth="5" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-sm text-black/50 max-w-lg mx-auto">
            Essential Elements for Your Influencer Marketing Strategy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              title: "Lifetime Access to Winning Content",
              desc: "Keep all the winning content from contest to use in your campaigns forever.",
              icon: <Award size={20} className="text-black" />
            },
            {
              title: "Organic Content Validation",
              desc: "Test and validate your content with real, engaged audiences to find what works best.",
              icon: <CheckCircle2 size={20} className="text-black" />
            },
            {
              title: "Authentic Creator Network",
              desc: "Access to our growing community of verified creators across all platforms.",
              icon: <Users size={20} className="text-black" />
            },
            {
              title: "Secure Payment Processing",
              desc: "Safe and secure payment handling for all contest prizes and platform fees.",
              icon: <CreditCard size={20} className="text-black" />
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="p-6 rounded-3xl bg-white border border-black/5 hover:border-black/15 shadow-sm flex items-start gap-4 transition-all duration-300"
            >
              <div className="p-3.5 rounded-3xl bg-[#d1f8ff] border border-black/5 text-black">
                {item.icon}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-black mb-1.5">{item.title}</h3>
                <p className="text-xs text-black/50 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DEMO BOOKING CALLOUT */}
      <section className="py-12 px-6 max-w-6xl mx-auto mb-20">
        <div className="relative rounded-3xl border border-black/10 overflow-hidden px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-12 bg-black text-white shadow-lg">
          
          {/* Subtle background glow */}
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-[#d1f8ff]/10 filter blur-[80px] pointer-events-none" />

          <div className="flex-1 text-left relative z-10">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
              Not sure which <span className="text-[#d1f8ff]">plan</span> is right for you?
            </h3>
            <p className="text-xs text-white/60 mb-6 max-w-lg leading-relaxed font-medium">
              Book a demo with <strong>Vishesh</strong>, Founder of Game Of Creators. Join hundreds of businesses driving success with Game Of Creators! Book your free consultation today to get all your questions answered and start launching impactful campaigns.
            </p>
            <button 
              onClick={() => navigate("/book-demo")}
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-[#d1f8ff] transition-all duration-300 px-6 py-3 rounded-full text-xs font-black cursor-pointer shadow-md"
            >
              Book a Demo
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="flex-shrink-0 relative z-10 w-full max-w-[280px]">
            <div className="p-4 rounded-3xl bg-white/10 border border-white/25 backdrop-blur-md shadow-2xl relative">
              {/* Laptop illustration */}
              <div className="aspect-[4/3] rounded-3xl bg-slate-950 flex flex-col items-center justify-center p-3 relative overflow-hidden border border-white/5">
                <Laptop size={44} className="text-[#d1f8ff] mb-2" />
                <div className="text-center text-white">
                  <p className="text-[10px] font-bold">1:1 Strategic Call</p>
                  <p className="text-[8px] text-white/40 mt-0.5">Vishesh & Ashish</p>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#d1f8ff]/10 border border-[#d1f8ff]/30 px-1.5 py-0.5 rounded text-[7px] text-[#d1f8ff] font-extrabold uppercase">
                  Live
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer theme="light" />

    </div>
  );
}
