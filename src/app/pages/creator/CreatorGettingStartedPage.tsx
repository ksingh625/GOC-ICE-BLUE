import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Play, Award, BookOpen, Users, ChevronDown, Rocket,
  ArrowRight, DollarSign, Trophy, Zap, Eye, Target,
  CheckCircle, XCircle, Shield, TrendingUp, Sparkles
} from "lucide-react";

export default function CreatorGettingStartedPage() {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeCampType, setActiveCampType] = useState(0);

  const steps = [
    {
      num: "01",
      icon: <Target size={20} />,
      title: "Browse Campaigns",
      desc: "Explore live brand contests that match your niche — gaming, lifestyle, beauty, or tech.",
      color: "#d1f8ff",
    },
    {
      num: "02",
      icon: <Play size={20} />,
      title: "Create & Submit",
      desc: "Film an authentic review or clip, post it on TikTok/Instagram/YouTube, and paste the link.",
      color: "#e0fce4",
    },
    {
      num: "03",
      icon: <Eye size={20} />,
      title: "Views Get Tracked",
      desc: "Our system auto-pulls your view count every 24 hours. Rankings update daily in real-time.",
      color: "#fef9c3",
    },
    {
      num: "04",
      icon: <DollarSign size={20} />,
      title: "Get Paid",
      desc: "Once verified, funds release from escrow straight to your GOC wallet. Withdraw anytime.",
      color: "#fce7f3",
    },
  ];

  const campaignTypes = [
    {
      badge: "Rank-based Split",
      title: "Leaderboard",
      tagline: "Compete for the top spot",
      desc: "Top creators by views split the prize pool. Win $1,000+ against fellow creators. The better your content, the higher your rank.",
      example: "Prize pool: $2,000 → 1st: $1,000 · 2nd: $600 · 3rd: $400",
      color: "from-amber-50 to-white",
      border: "border-amber-200",
      icon: <Trophy size={18} className="text-amber-600" />,
    },
    {
      badge: "Paid Per View",
      title: "CPM Campaigns",
      tagline: "Every view = real money",
      desc: "Earn a fixed rate per 1,000 views organically generated. No minimum followers needed — pure algorithmic reach wins.",
      example: "Rate: $1.00 / 1K views → 50K views = $50.00 earned",
      color: "from-[#d1f8ff]/40 to-white",
      border: "border-[#d1f8ff]",
      icon: <TrendingUp size={18} className="text-blue-600" />,
    },
    {
      badge: "Checkpoint Rewards",
      title: "Milestone",
      tagline: "Unlock rewards in tiers",
      desc: "Hit view milestones (10K, 50K, 100K+) to unlock fixed cash bonuses at each checkpoint. Stack rewards as you grow.",
      example: "10K views: $5 · 50K views: $30 · 100K views: $75",
      color: "from-emerald-50 to-white",
      border: "border-emerald-200",
      icon: <Zap size={18} className="text-emerald-600" />,
    },
    {
      badge: "CPM + Leaderboard",
      title: "Dual Rewards",
      tagline: "Double the earning potential",
      desc: "The ultimate combo — earn CPM for every view AND compete for top leaderboard prizes simultaneously.",
      example: "CPM rate + top 3 leaderboard prize pool",
      color: "from-purple-50 to-white",
      border: "border-purple-200",
      icon: <Sparkles size={18} className="text-purple-600" />,
    },
  ];

  const perks = [
    { icon: <Award size={22} />, title: "Guaranteed Payouts", desc: "Brands escrow the full prize before launch. Your earnings are locked and protected.", bg: "bg-[#d1f8ff]/30" },
    { icon: <BookOpen size={22} />, title: "Build Your Portfolio", desc: "Work with real brands and build a content portfolio that opens doors to bigger deals.", bg: "bg-amber-50" },
    { icon: <Users size={22} />, title: "No Follower Minimum", desc: "Raw organic reach wins on GOC — not your subscriber count. Algorithms decide.", bg: "bg-emerald-50" },
  ];

  const faqData = [
    {
      q: "Do I need thousands of followers to join?",
      a: "No! GOC rewards organic reach. If your video hooks viewers and gets shares, it climbs the rankings — regardless of follower count. Quality content beats big accounts here.",
    },
    {
      q: "How are payouts guaranteed?",
      a: "Brands deposit the full prize pool into the GOC Vault before a campaign launches. Once your video passes compliance audit, funds auto-release to your creator wallet.",
    },
    {
      q: "What makes a good submission?",
      a: "Hook viewers in the first 2–3 seconds, clearly show the brand/product, keep the review authentic, and avoid mentioning competitor brands. The GOC team reviews every submission.",
    },
    {
      q: "How fast do I get paid?",
      a: "Once verified (usually 24–72 hours), earnings show in your GOC wallet instantly. Withdrawals via PayPal are processed within 2–5 business days.",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto">

      {/* ── HERO BANNER ── */}
      <div
        className="relative rounded-3xl overflow-hidden p-8 md:p-12"
        style={{ background: "linear-gradient(135deg, #000 0%, #1a1a1a 100%)" }}
      >
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle, #d1f8ff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#d1f8ff] mb-4">
              <Rocket size={11} />
              Onboarding Guide
            </span>
            <h1
              className="text-3xl md:text-4xl font-black text-white leading-tight mb-3"
            >
              Turn your content into<br />
              <span className="text-[#d1f8ff]">real income</span>
            </h1>
            <p className="text-sm text-white/60 leading-relaxed font-medium">
              GOC connects creators with brands through contest-driven campaigns.
              Zero follower requirements. Escrow-guaranteed payouts. Start earning today.
            </p>
          </div>

          <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate("/creator/campaigns")}
              className="flex items-center justify-center gap-2 bg-[#d1f8ff] text-black hover:bg-white transition-all font-black px-6 py-3.5 rounded-full text-sm shadow-lg"
            >
              <Rocket size={15} />
              Browse Live Campaigns
            </button>
            <button
              onClick={() => navigate("/creator/submissions")}
              className="flex items-center justify-center gap-2 bg-white/10 text-white hover:bg-white/20 transition-all font-bold px-6 py-3 rounded-full text-sm border border-white/10"
            >
              Submit Your First Clip
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Floating stats */}
        <div className="relative z-10 mt-8 grid grid-cols-3 gap-4">
          {[
            { val: "$500K+", label: "Paid out to creators" },
            { val: "2,000+", label: "Active creators" },
            { val: "100%", label: "Escrow secured" },
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-full px-4 py-3 text-center">
              <p className="font-heading text-xl font-black text-white">{s.val}</p>
              <p className="text-[10px] text-white/50 font-semibold mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3 PERKS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {perks.map((p, i) => (
          <div key={i} className={`${p.bg} border border-neutral-200/60 rounded-3xl p-6 flex gap-4 items-start`}>
            <div className="w-10 h-10 rounded-full bg-white border border-neutral-200/60 flex items-center justify-center flex-shrink-0 shadow-sm text-black">
              {p.icon}
            </div>
            <div>
              <h3 className="text-sm font-black text-black">{p.title}</h3>
              <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── HOW IT WORKS — 4 STEPS ── */}
      <div className="bg-white border border-neutral-200/60 rounded-3xl p-8 shadow-sm">
        <div className="mb-8">
          <h2 className="text-xl font-black text-black">
            How it works
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Four simple steps from browse to bank.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-neutral-100 z-0" />

          {steps.map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-start gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-black shadow-sm border border-neutral-200/60 relative"
                style={{ background: s.color }}
              >
                {s.icon}
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-black text-white text-[9px] font-black flex items-center justify-center"
                >
                  {i + 1}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-black text-black">{s.title}</h4>
                <p className="text-[11px] text-neutral-500 mt-1.5 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CAMPAIGN TYPES — INTERACTIVE TABS ── */}
      <div className="bg-white border border-neutral-200/60 rounded-3xl p-8 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-black text-black">
            Campaign Types
          </h2>
          <p className="text-xs text-neutral-500 mt-1">Pick what works for your content style and audience.</p>
        </div>

        {/* Type selector pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {campaignTypes.map((c, i) => (
            <button
              key={i}
              onClick={() => setActiveCampType(i)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                activeCampType === i
                  ? "bg-black text-white border-black shadow-md"
                  : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-black"
              }`}
            >
              {c.icon}
              {c.title}
            </button>
          ))}
        </div>

        {/* Active card */}
        {(() => {
          const t = campaignTypes[activeCampType];
          return (
            <div className={`bg-gradient-to-br ${t.color} border ${t.border} rounded-3xl p-6 transition-all`}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="inline-block text-[10px] font-black bg-black/5 border border-black/10 rounded-full px-2.5 py-1 mb-2">
                    {t.badge}
                  </span>
                  <h3 className="text-lg font-black text-black">
                    {t.title} Campaigns
                  </h3>
                  <p className="text-xs text-neutral-500 font-semibold mt-0.5">{t.tagline}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center shadow-sm flex-shrink-0">
                  {t.icon}
                </div>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed mb-4">{t.desc}</p>
              <div className="bg-white/80 border border-neutral-200/60 rounded-full px-4 py-3">
                <p className="text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1">Example</p>
                <p className="text-xs font-semibold text-black">{t.example}</p>
              </div>
            </div>
          );
        })()}
      </div>

      {/* ── AUDIT RULES — APPROVED / REJECTED ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border border-emerald-200/60 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
              <CheckCircle size={16} className="text-emerald-600" />
            </div>
            <h3 className="text-sm font-black text-black">
              If Approved ✓
            </h3>
          </div>
          <ul className="space-y-2.5">
            {[
              "Views pulled daily via platform APIs",
              "Wallet unlocks for instant payout",
              "Winnings released from Escrow vault",
              "GOC coins credited to your account",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-red-200/60 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
              <XCircle size={16} className="text-red-500" />
            </div>
            <h3 className="text-sm font-black text-black">
              If Rejected ✗
            </h3>
          </div>
          <ul className="space-y-2.5">
            {[
              "Re-upload request sent via email",
              "Violation detail shown in Submissions",
              "Content must feature brand clearly",
              "No artificial views or bots allowed",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── COMPLIANCE BADGE STRIP ── */}
      <div className="bg-[#d1f8ff]/20 border border-[#d1f8ff] rounded-full px-6 py-4 flex flex-wrap items-center gap-3">
        <Shield size={18} className="text-black flex-shrink-0" />
        <span className="text-xs font-black text-black">Content Compliance Rules:</span>
        {["Authentic review", "Hook in 1–3s", "Show the product", "No competitors", "No bots/fakes"].map((rule, i) => (
          <span key={i} className="text-[10px] font-bold bg-white border border-black/10 px-2.5 py-1 rounded-full text-black">
            {rule}
          </span>
        ))}
      </div>

      {/* ── FAQ ── */}
      <div className="bg-white border border-neutral-200/60 rounded-3xl p-8 shadow-sm">
        <h2 className="text-xl font-black text-black mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {faqData.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className={`border rounded-3xl overflow-hidden transition-all duration-200 ${
                  isOpen ? "border-black" : "border-neutral-200"
                }`}
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer focus:outline-none"
                >
                  <span className="text-sm font-bold text-black pr-4">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`text-neutral-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 bg-neutral-50/40">
                    <p className="text-xs text-neutral-600 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="rounded-3xl border border-neutral-200/60 bg-white p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div>
          <h3 className="text-lg font-black text-black">
            Ready to start earning?
          </h3>
          <p className="text-xs text-neutral-500 mt-1">Browse active campaigns and make your first submission today.</p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={() => navigate("/creator/campaigns")}
            className="btn-primary-gradient flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black shadow-sm"
          >
            <Rocket size={14} />
            Explore Campaigns
          </button>
        </div>
      </div>

    </div>
  );
}
