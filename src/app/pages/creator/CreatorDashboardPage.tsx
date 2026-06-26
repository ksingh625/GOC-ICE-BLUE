import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Trophy, DollarSign, Eye, Share2, ArrowRight,
  TrendingUp, CheckCircle, Inbox, Flame,
  ArrowUpRight, ChevronRight, Target, Coins,
  Music2, Youtube, Instagram,
} from "lucide-react";
import confetti from "canvas-confetti";

interface Submission {
  id: number;
  campaignId: number;
  campaignTitle: string;
  url: string;
  views: number;
  status: "PENDING" | "VERIFIED" | "REJECTED" | "PAID";
  date: string;
  platform: string;
  earned: number;
}

const WEEK_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6"];
const BASE_EARNINGS = [0, 25.5, 85, 145.2, 320, 512.45];
const BASE_VIEWS    = [0, 2400, 9800, 18500, 34000, 52450];

export default function CreatorDashboardPage() {
  const navigate = useNavigate();
  const [chartTab, setChartTab] = useState<"earnings" | "views">("earnings");
  const [copied, setCopied] = useState(false);
  const [hovIdx, setHovIdx] = useState<number | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [availableCoins, setAvailableCoins] = useState(1250);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    try {
      const s = localStorage.getItem("goc_submissions");
      if (s) setSubmissions(JSON.parse(s));
      else {
        const def: Submission[] = [{
          id: 1, campaignId: 1, campaignTitle: "Roobet Official Clipping",
          url: "https://tiktok.com/@gamer_ash/video/98765432101",
          views: 12450, status: "VERIFIED", date: "June 25, 2026", platform: "TikTok", earned: 12.45
        }];
        localStorage.setItem("goc_submissions", JSON.stringify(def));
        setSubmissions(def);
      }
    } catch (e) { console.error(e); }

    try {
      const c = localStorage.getItem("goc_coins");
      if (c) setAvailableCoins(parseInt(c));
      else { localStorage.setItem("goc_coins", "1250"); }
    } catch (e) { console.error(e); }
  }, []);

  const totalEarnings = submissions
    .filter(s => s.status === "VERIFIED" || s.status === "PAID")
    .reduce((a, c) => a + c.earned, 0);
  const totalViews = submissions.reduce((a, c) => a + c.views, 0);
  const campaignCount = new Set(submissions.map(s => s.campaignId)).size;
  const pendingCount = submissions.filter(s => s.status === "PENDING").length;

  // Chart data — patch last point with real data
  const earnings = [...BASE_EARNINGS];
  const views = [...BASE_VIEWS];
  if (submissions.length > 0) {
    earnings[5] = totalEarnings > 0 ? totalEarnings : 12.45;
    views[5]    = totalViews   > 0 ? totalViews   : 12450;
  }
  const chartValues = chartTab === "earnings" ? earnings : views;
  const maxVal = Math.max(...chartValues) || 1;

  // Convert to SVG points (viewBox 0 0 600 140)
  const W = 600, H = 130, PAD = 10;
  const pts = chartValues.map((v, i) => ({
    x: PAD + (i / (chartValues.length - 1)) * (W - PAD * 2),
    y: H - PAD - ((v / maxVal) * (H - PAD * 2)),
  }));

  const toPath = (arr: { x: number; y: number }[]) =>
    arr.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  const linePath = toPath(pts);
  const areaPath = `${linePath} L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`;

  const handleMouseMoveSvg = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const rx = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let minD = Infinity;
    pts.forEach((p, i) => {
      const d = Math.abs(p.x - rx);
      if (d < minD) { minD = d; nearest = i; }
    });
    setHovIdx(nearest);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://gameofcreators.com/join-creator?ref=gamer_ash");
    setCopied(true);
    confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      label: "Total Earnings",
      value: `$${totalEarnings.toFixed(2)}`,
      sub: "Verified & paid out",
      icon: <DollarSign size={16} />,
      trend: "+12.4%",
      dark: true,
    },
    {
      label: "Campaigns Joined",
      value: String(campaignCount),
      sub: `${pendingCount} pending`,
      icon: <Trophy size={16} />,
      trend: pendingCount > 0 ? `${pendingCount} in review` : "All clear",
      dark: false,
    },
    {
      label: "Total Views",
      value: totalViews >= 1000 ? `${(totalViews / 1000).toFixed(1)}K` : totalViews.toLocaleString(),
      sub: "Organic reach tracked",
      icon: <Eye size={16} />,
      trend: "+8.2%",
      dark: false,
    },
    {
      label: "GOC Coins",
      value: availableCoins.toLocaleString(),
      sub: "Redeem for vouchers",
      icon: <Coins size={16} />,
      trend: "+200 this week",
      dark: false,
    },
  ];

  const checklistItems = [
    { label: "Submit first clipping URL", done: submissions.length > 0, href: "/creator/submissions" },
    { label: "Earn 100 GOC coins", done: availableCoins >= 100, href: "/creator/wallet" },
    { label: "Connect a social account", done: true, href: "/creator/settings" },
    { label: "Reach 10K approved views", done: totalViews >= 10000, href: "/creator/leaderboard" },
  ];

  const completedTasks = checklistItems.filter(t => t.done).length;
  const progressPct = Math.round((completedTasks / checklistItems.length) * 100);

  const recentActivity = [
    {
      icon: <span className="w-8 h-8 rounded-xl bg-[#d1f8ff]/50 border border-[#d1f8ff] flex items-center justify-center flex-shrink-0"><Target size={14} className="text-black" /></span>,
      text: "New Roobet campaign launched — $2,000 pool",
      time: "2h ago",
    },
    {
      icon: <span className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0"><CheckCircle size={14} className="text-emerald-600" /></span>,
      text: "Your TikTok clip was verified successfully",
      time: "5h ago",
    },
    {
      icon: <span className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0"><DollarSign size={14} className="text-amber-600" /></span>,
      text: "Received $12.45 — Roobet Official Clipping",
      time: "1 day ago",
    },
    {
      icon: <span className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200 flex items-center justify-center flex-shrink-0"><Trophy size={14} className="text-black" /></span>,
      text: "You moved to #8 on the leaderboard",
      time: "2 days ago",
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">

      {/* ── GREETING BANNER ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">Creator Dashboard</p>
          <h1 className="text-2xl font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Good morning, Ashish 👋
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            {submissions.length > 0
              ? `${submissions.length} submission${submissions.length > 1 ? "s" : ""} tracked · ${pendingCount} awaiting review`
              : "No submissions yet — browse campaigns to start earning."}
          </p>
        </div>
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-2 bg-black text-white hover:bg-neutral-800 transition-all font-black px-4 py-2.5 rounded-xl text-xs border border-black/10 flex-shrink-0 cursor-pointer"
        >
          <Share2 size={13} />
          {copied ? "Copied! 🎉" : "Refer & Earn 200 Coins"}
        </button>
      </div>

      {/* ── STAT CARDS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`rounded-2xl p-5 border transition-all hover:scale-[1.02] cursor-pointer ${
              s.dark
                ? "bg-black text-white border-black"
                : "bg-white border-neutral-200/60 text-black"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${s.dark ? "bg-white/10" : "bg-neutral-100"}`}>
                <span className={s.dark ? "text-[#d1f8ff]" : "text-black"}>{s.icon}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.dark ? "bg-white/10 text-white/70" : "bg-neutral-100 text-neutral-500"}`}>
                {s.trend}
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: s.dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)" }}>
              {s.label}
            </p>
            <p className="text-2xl font-black leading-none" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {s.value}
            </p>
            <p className="text-[10px] mt-1.5" style={{ color: s.dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)" }}>
              {s.sub}
            </p>
          </div>
        ))}
      </div>

      {/* ── MAIN 2-COL GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* CHART — 2 cols */}
        <div className="lg:col-span-2 bg-white border border-neutral-200/60 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Performance
              </h2>
              <p className="text-[11px] text-neutral-500 mt-0.5">6-week earnings and views trend</p>
            </div>
            <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200/60">
              {(["earnings", "views"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setChartTab(t)}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-black transition-all cursor-pointer capitalize ${
                    chartTab === t ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"
                  }`}
                >
                  {t === "earnings" ? "Earnings ($)" : "Views"}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Chart */}
          <div className="relative select-none rounded-xl overflow-hidden" style={{ height: 160 }}>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className="w-full h-full cursor-crosshair"
              onMouseMove={handleMouseMoveSvg}
              onMouseLeave={() => setHovIdx(null)}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="db-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d1f8ff" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#d1f8ff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Horizontal guide lines */}
              {[0.25, 0.5, 0.75].map(f => (
                <line
                  key={f}
                  x1={PAD} y1={PAD + (1 - f) * (H - PAD * 2)}
                  x2={W - PAD} y2={PAD + (1 - f) * (H - PAD * 2)}
                  stroke="rgba(0,0,0,0.05)" strokeWidth="1"
                />
              ))}

              {/* Area */}
              <path d={areaPath} fill="url(#db-area)" className="transition-all duration-500" />

              {/* Line */}
              <path d={linePath} fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-500" />

              {/* Dots */}
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r={hovIdx === i ? 6 : 4} fill="black" stroke="#d1f8ff" strokeWidth={hovIdx === i ? 3 : 2} className="transition-all duration-150" />
                  {hovIdx === i && (
                    <circle cx={p.x} cy={p.y} r={12} fill="rgba(0,0,0,0.05)" />
                  )}
                </g>
              ))}

              {/* Tooltip */}
              {hovIdx !== null && (() => {
                const p = pts[hovIdx];
                const inRight = p.x > W * 0.65;
                const tx = inRight ? p.x - 110 : p.x + 10;
                return (
                  <g>
                    <line x1={p.x} y1={PAD} x2={p.x} y2={H - PAD} stroke="rgba(0,0,0,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                    <rect x={tx} y={p.y - 36} width={100} height={38} rx="6" fill="black" />
                    <text x={tx + 8} y={p.y - 20} fill="rgba(255,255,255,0.6)" fontSize="8" fontWeight="bold">
                      {WEEK_LABELS[hovIdx]}
                    </text>
                    <text x={tx + 8} y={p.y - 7} fill="white" fontSize="11" fontWeight="bold">
                      {chartTab === "earnings"
                        ? `$${earnings[hovIdx].toFixed(2)}`
                        : `${views[hovIdx].toLocaleString()} views`}
                    </text>
                  </g>
                );
              })()}
            </svg>
          </div>

          {/* Week labels */}
          <div className="flex justify-between mt-2 px-1">
            {WEEK_LABELS.map((l, i) => (
              <span key={i} className={`text-[10px] font-bold transition-colors ${hovIdx === i ? "text-black" : "text-neutral-400"}`}>
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* CHECKLIST — 1 col */}
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6 flex flex-col">
          <div className="mb-4">
            <h2 className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Creator Checklist
            </h2>
            <div className="flex items-center justify-between mt-3 mb-1.5">
              <p className="text-[10px] text-neutral-500">{completedTasks} of {checklistItems.length} done</p>
              <p className="text-[10px] font-black text-black">{progressPct}%</p>
            </div>
            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-black rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="space-y-2.5 flex-1">
            {checklistItems.map((t, i) => (
              <button
                key={i}
                onClick={() => navigate(t.href)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all hover:border-black group cursor-pointer"
                style={{ borderColor: t.done ? "rgba(16,185,129,0.2)" : "rgba(0,0,0,0.08)", background: t.done ? "rgba(16,185,129,0.04)" : "white" }}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${t.done ? "bg-emerald-500 border-emerald-500" : "border-neutral-300 group-hover:border-black"}`}>
                  {t.done && <CheckCircle size={11} className="text-white fill-white" strokeWidth={3} />}
                </div>
                <span className={`text-xs font-bold flex-1 leading-tight ${t.done ? "text-neutral-400 line-through" : "text-black"}`}>
                  {t.label}
                </span>
                {!t.done && <ChevronRight size={12} className="text-neutral-300 group-hover:text-black transition-colors flex-shrink-0" />}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate("/creator/campaigns")}
            className="mt-5 w-full btn-primary-gradient py-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5"
          >
            <Flame size={13} />
            Explore Live Campaigns
          </button>
        </div>
      </div>

      {/* ── BOTTOM 2-COL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* RECENT SUBMISSIONS */}
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Recent Submissions</h2>
            <button
              onClick={() => navigate("/creator/submissions")}
              className="flex items-center gap-1 text-xs font-bold text-neutral-500 hover:text-black transition-colors cursor-pointer"
            >
              View all <ArrowUpRight size={12} />
            </button>
          </div>

          {submissions.length > 0 ? (
            <div className="space-y-3">
              {submissions.slice(0, 3).map(sub => {
                const verified = sub.status === "VERIFIED" || sub.status === "PAID";
                const statusColors: Record<string, string> = {
                  VERIFIED: "text-emerald-600 bg-emerald-50 border-emerald-100",
                  PAID: "text-blue-600 bg-blue-50 border-blue-100",
                  PENDING: "text-amber-600 bg-amber-50 border-amber-100",
                  REJECTED: "text-red-600 bg-red-50 border-red-100",
                };
                return (
                  <div key={sub.id} className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200/60 hover:border-neutral-300 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-neutral-100 border border-neutral-200/60 flex items-center justify-center flex-shrink-0 text-neutral-600">
                        {sub.platform === "TikTok" ? <Music2 size={14} /> : sub.platform === "YouTube" ? <Youtube size={14} /> : <Instagram size={14} />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-black truncate">{sub.campaignTitle}</p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">{sub.views.toLocaleString()} views · {sub.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${statusColors[sub.status]}`}>
                        {sub.status}
                      </span>
                      <p className="text-xs font-black text-black">${sub.earned.toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-400 mb-3">
                <Inbox size={20} />
              </div>
              <p className="text-sm font-black text-black">No submissions yet</p>
              <p className="text-xs text-neutral-500 mt-1 max-w-[200px]">Browse campaigns and submit your first clip to start earning.</p>
              <button
                onClick={() => navigate("/creator/campaigns")}
                className="mt-4 btn-primary-gradient px-4 py-2 rounded-xl text-xs font-black"
              >
                Browse Campaigns
              </button>
            </div>
          )}
        </div>

        {/* ACTIVITY FEED */}
        <div className="bg-white border border-neutral-200/60 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Activity Feed
            </h2>
            <span className="text-[9px] font-black bg-black text-white px-2 py-1 rounded-full">Live</span>
          </div>

          <div className="space-y-3">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors">
                <div className="flex-shrink-0 mt-0.5">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-black leading-snug">{item.text}</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate("/creator/submissions")}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:border-black hover:text-black transition-all cursor-pointer"
            >
              <Target size={12} /> New Submission
            </button>
            <button
              onClick={() => navigate("/creator/wallet")}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:border-black hover:text-black transition-all cursor-pointer"
            >
              <TrendingUp size={12} /> View Wallet
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
