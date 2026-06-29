import { useState, useEffect } from "react";
import { 
  Trophy, Search, ArrowUpRight, Flame, Globe, Eye,
  Medal, Star, ChevronLeft, ChevronRight, TrendingUp, Sparkles
} from "lucide-react";

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

export default function CreatorLeaderboardPage() {
  const [search, setSearch] = useState("");
  const [activeMetric, setActiveMetric] = useState<"winnings" | "views" | "coins">("winnings");
  const [activeAccount, setActiveAccount] = useState("gamer_ash");
  
  // Local storage synchronized metrics
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [availableCoins, setAvailableCoins] = useState(1250);

  useEffect(() => {
    // Read active account
    try {
      const storedAcc = localStorage.getItem("goc_active_account");
      if (storedAcc) setActiveAccount(storedAcc);
    } catch (e) {
      console.error(e);
    }

    // Read submissions
    try {
      const stored = localStorage.getItem("goc_submissions");
      if (stored) setSubmissions(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }

    // Read coins
    try {
      const storedCoins = localStorage.getItem("goc_coins");
      if (storedCoins) setAvailableCoins(parseInt(storedCoins));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const totalEarningsVal = submissions
    .filter(s => s.status === "VERIFIED" || s.status === "PAID")
    .reduce((acc, curr) => acc + curr.earned, 0);

  const campaignsJoined = new Set(submissions.map(s => s.campaignId)).size;
  const totalViewsVal = submissions.reduce((acc, curr) => acc + curr.views, 0);

  // Static leaderboard entries
  const staticLeaderboard = [
    { name: "reelsapers", avatar: "https://i.pravatar.cc/100?img=33", winnings: 987.97, views: 1200000, campaigns: 14, coins: 4500, label: "UGC Maestro" },
    { name: "danzayn", avatar: "https://i.pravatar.cc/100?img=12", winnings: 246.57, views: 450000, campaigns: 8, coins: 1800, label: "Clipping King" },
    { name: "celest", avatar: "https://i.pravatar.cc/100?img=47", winnings: 202.86, views: 380000, campaigns: 9, coins: 1500, label: "Beauty Reviewer" },
    { name: "fitbyfiona", avatar: "https://i.pravatar.cc/100?img=45", winnings: 175.00, views: 340000, campaigns: 6, coins: 1200, label: "Fitness Guru" },
    { name: "lucas_edits", avatar: "https://i.pravatar.cc/100?img=15", winnings: 145.20, views: 300000, campaigns: 7, coins: 1100, label: "Editor Specialist" },
    { name: "vlogwithval", avatar: "https://i.pravatar.cc/100?img=28", winnings: 124.50, views: 280000, campaigns: 5, coins: 950, label: "Travel Creator" },
    { name: "skincare_kate", avatar: "https://i.pravatar.cc/100?img=32", winnings: 112.10, views: 240000, campaigns: 4, coins: 800, label: "Wellness Reviewer" },
    { name: "gaming_sam", avatar: "https://i.pravatar.cc/100?img=52", winnings: 98.40, views: 210000, campaigns: 3, coins: 700, label: "Apex Legend" },
    { name: "foodie_flo", avatar: "https://i.pravatar.cc/100?img=25", winnings: 84.60, views: 190000, campaigns: 3, coins: 600, label: "Culinary Host" },
    { name: "tech_guru", avatar: "https://i.pravatar.cc/100?img=60", winnings: 72.30, views: 160000, campaigns: 2, coins: 500, label: "Tech Specialist" }
  ];

  // User details row injection
  const userRow = {
    name: activeAccount,
    avatar: activeAccount === "gamer_ash" ? "https://i.pravatar.cc/100?img=11" : "https://i.pravatar.cc/100?img=49",
    winnings: totalEarningsVal,
    views: totalViewsVal,
    campaigns: campaignsJoined,
    coins: availableCoins,
    label: activeAccount === "gamer_ash" ? "GOC Pro Creator" : "Beauty & Lifestyle"
  };

  // Combine & Sort
  const combined = [...staticLeaderboard];
  if (!combined.some(c => c.name === userRow.name)) {
    combined.push(userRow);
  }

  // Filter based on search query
  const filtered = combined.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort dynamically based on metric
  const sorted = [...filtered].sort((a, b) => {
    if (activeMetric === "winnings") return b.winnings - a.winnings;
    if (activeMetric === "views") return b.views - a.views;
    return b.coins - a.coins;
  });

  // Assign ranks dynamically
  const ranked = sorted.map((item, idx) => ({
    ...item,
    rank: idx + 1
  }));

  // Top 3 Podium Selection
  const first = ranked.find(c => c.rank === 1);
  const second = ranked.find(c => c.rank === 2);
  const third = ranked.find(c => c.rank === 3);

  const formatViews = (val: number) => {
    if (val >= 1000000) return `${(val/1000000).toFixed(1)}M`;
    if (val >= 1000) return `${Math.round(val/1000)}K`;
    return String(val);
  };

  const getMetricValue = (item: typeof ranked[0]) => {
    if (activeMetric === "winnings") return `$${item.winnings.toFixed(2)}`;
    if (activeMetric === "views") return formatViews(item.views);
    return `${item.coins} coins`;
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto text-left animate-fade-in">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight">
            Leaderboard Podiums
          </h1>
          <p className="text-xs text-neutral-500 font-semibold mt-1">Participate, win campaigns, accumulate views, and climb the rankings podium.</p>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3.5 top-3 text-neutral-400" size={14} />
          <input 
            type="text" 
            placeholder="Search creators..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-neutral-200 text-xs focus:outline-none focus:border-black bg-white shadow-xs"
          />
        </div>
      </div>

      {/* ── METRIC TOGGLES ── */}
      <div className="flex bg-neutral-100 p-0.5 rounded-full border border-black/5 self-start w-fit">
        {(["winnings", "views", "coins"] as const).map(m => (
          <button 
            key={m}
            onClick={() => setActiveMetric(m)}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer capitalize ${
              activeMetric === m ? "bg-white text-black shadow-xs" : "text-neutral-550 hover:text-black"
            }`}
          >
            {m === "winnings" ? "Total Earnings" : m === "views" ? "Approved Views" : "GOC Coins"}
          </button>
        ))}
      </div>

      {/* ── PODIUM DISPLAY (10x Better UI) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end justify-center py-10 px-4 bg-gradient-to-b from-[#d1f8ff]/15 to-transparent border border-neutral-200/60 rounded-3xl relative overflow-hidden">
        
        {/* Decorative glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#d1f8ff]/30 filter blur-[80px] pointer-events-none" />

        {/* 2nd Place Pedestal */}
        {second && (
          <div className="flex flex-col items-center order-2 sm:order-1 animate-fade-in">
            <div className="relative mb-3 flex items-center justify-center">
              <div className={`w-14 h-14 rounded-full border-2 overflow-hidden shadow-lg bg-neutral-100 transition-all ${
                second.name === activeAccount ? "border-black ring-4 ring-black/10 scale-105" : "border-slate-300"
              }`}>
                <img src={second.avatar} alt={second.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1.5 bg-slate-400 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black border border-white">
                2
              </div>
            </div>
            <p className="text-xs font-black text-black truncate max-w-[120px] flex items-center gap-1">
              @{second.name}
              {second.name === activeAccount && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </p>
            <span className="text-[8px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full font-black uppercase mt-0.5">{second.label}</span>
            
            {/* Pedestal Stand */}
            <div className="w-full max-w-[150px] bg-slate-100 border border-neutral-200/50 rounded-t-2xl h-24 mt-4 flex flex-col justify-center items-center p-3 text-center shadow-xs">
              <span className="text-sm font-black text-slate-800">
                {getMetricValue(second)}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 font-black mt-1">Silver Runner</span>
            </div>
          </div>
        )}

        {/* 1st Place Pedestal */}
        {first && (
          <div className="flex flex-col items-center order-1 sm:order-2 animate-fade-in scale-105 z-10">
            <div className="relative mb-3 flex items-center justify-center">
              <div className={`w-20 h-20 rounded-full border-4 overflow-hidden shadow-xl bg-neutral-100 transition-all ${
                first.name === activeAccount ? "border-black ring-4 ring-black/10 scale-105" : "border-yellow-400 ring-4 ring-yellow-400/20"
              }`}>
                <img src={first.avatar} alt={first.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-2 bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-black border-2 border-white shadow-md">
                1
              </div>
              <div className="absolute -top-7 text-yellow-500 animate-bounce">
                <Trophy size={22} className="fill-yellow-500/20" />
              </div>
            </div>
            <p className="text-sm font-black text-black truncate max-w-[140px] flex items-center gap-1">
              @{first.name}
              {first.name === activeAccount && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </p>
            <span className="text-[8px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-black uppercase mt-0.5">{first.label}</span>
            
            {/* Pedestal Stand */}
            <div className="w-full max-w-[170px] bg-[#d1f8ff] border border-[#d1f8ff] rounded-t-2xl h-32 mt-4 flex flex-col justify-center items-center p-3 text-center shadow-md relative">
              <span className="text-base font-black text-black">
                {getMetricValue(first)}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-black/60 font-black mt-1">Gold Champion</span>
            </div>
          </div>
        )}

        {/* 3rd Place Pedestal */}
        {third && (
          <div className="flex flex-col items-center order-3 animate-fade-in">
            <div className="relative mb-3 flex items-center justify-center">
              <div className={`w-14 h-14 rounded-full border-2 overflow-hidden shadow-lg bg-neutral-100 transition-all ${
                third.name === activeAccount ? "border-black ring-4 ring-black/10 scale-105" : "border-amber-600/60"
              }`}>
                <img src={third.avatar} alt={third.name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1.5 bg-amber-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black border border-white">
                3
              </div>
            </div>
            <p className="text-xs font-black text-black truncate max-w-[120px] flex items-center gap-1">
              @{third.name}
              {third.name === activeAccount && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
            </p>
            <span className="text-[8px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded-full font-black uppercase mt-0.5">{third.label}</span>
            
            {/* Pedestal Stand */}
            <div className="w-full max-w-[150px] bg-amber-800/10 border border-amber-800/5 rounded-t-2xl h-20 mt-4 flex flex-col justify-center items-center p-3 text-center shadow-xs">
              <span className="text-sm font-black text-amber-900">
                {getMetricValue(third)}
              </span>
              <span className="text-[8px] uppercase tracking-widest text-amber-700/60 font-black mt-1">Bronze Medal</span>
            </div>
          </div>
        )}
      </div>

      {/* ── RANKINGS TABLE ── */}
      <div className="bg-white border border-neutral-200/85 rounded-3xl overflow-hidden shadow-xs">
        <div className="px-6 py-4.5 border-b border-neutral-100 flex items-center justify-between">
          <h3 className="text-sm font-black text-black uppercase tracking-wider">Full Leaderboard rankings</h3>
          <span className="text-[10px] bg-neutral-100 border border-black/5 px-2 py-0.5 rounded-full font-bold text-neutral-450">
            {ranked.length} Active Creators
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/50 border-b border-neutral-200/40 text-neutral-450 uppercase text-[9px] font-black tracking-wider">
                <th className="px-6 py-3.5">Rank</th>
                <th className="px-6 py-3.5">Creator</th>
                <th className="px-6 py-3.5">Campaigns Joined</th>
                <th className="px-6 py-3.5">Approved Views</th>
                <th className="px-6 py-3.5">GOC Coins</th>
                <th className="px-6 py-3.5 text-right">Winnings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {ranked.map((item) => {
                const isMe = item.name === activeAccount;
                return (
                  <tr 
                    key={item.name}
                    className={`hover:bg-slate-50/40 transition-colors ${
                      isMe ? "bg-[#d1f8ff]/20 font-bold" : ""
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className={`w-5.5 h-5.5 rounded-full flex items-center justify-center font-black text-[10px] border ${
                        item.rank === 1 ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        item.rank === 2 ? "bg-slate-100 text-slate-650 border-slate-200" :
                        item.rank === 3 ? "bg-amber-100 text-amber-800 border-amber-200" :
                        "text-neutral-450 border-transparent"
                      }`}>
                        {item.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img src={item.avatar} alt={item.name} className="w-8.5 h-8.5 rounded-full object-cover border border-neutral-200 shadow-xs" />
                      <div>
                        <p className="font-black text-black flex items-center gap-1">
                          @{item.name}
                          {isMe && (
                            <span className="text-[7px] bg-black text-[#d1f8ff] font-black uppercase px-1 py-0.2 rounded-full">
                              YOU
                            </span>
                          )}
                        </p>
                        <span className="text-[8px] text-neutral-400 font-semibold uppercase">{item.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-neutral-600">{item.campaigns} campaigns</td>
                    <td className="px-6 py-4 font-bold text-neutral-600">{formatViews(item.views)}</td>
                    <td className="px-6 py-4 font-black text-neutral-650">{item.coins.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-black text-black">${item.winnings.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[10px] text-neutral-450 font-bold">Showing 1-{ranked.length} of {ranked.length} creators</span>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-full border border-neutral-200 text-neutral-450 hover:bg-neutral-50 cursor-pointer disabled:opacity-50" disabled>
              <ChevronLeft size={14} />
            </button>
            <button className="p-1.5 rounded-full border border-neutral-200 text-neutral-450 hover:bg-neutral-50 cursor-pointer disabled:opacity-50" disabled>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
