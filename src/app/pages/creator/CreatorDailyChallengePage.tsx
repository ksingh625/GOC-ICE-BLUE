import { useState } from "react";
import { Flame, Trophy, Clock, CheckCircle2, RefreshCw, Crown, Eye, Video, Sparkles, ChevronDown, Zap, ShieldCheck } from "lucide-react";

export default function CreatorDailyChallengePage() {
  const [activeTab, setActiveTab] = useState<"views" | "reels">("views");
  const [mode, setMode] = useState("Daily");
  const [includePosts, setIncludePosts] = useState("Verified");

  return (
    <div className="min-h-screen pb-16 font-sans text-black bg-white">
      
      <div className="p-6 md:p-8 space-y-8 max-w-6xl mx-auto text-left relative z-10 animate-fade-in">
        
        {/* ── HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/5">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 text-black text-[10px] font-bold uppercase tracking-widest mb-4 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <Sparkles size={12} className="text-black" />
              Creator Arena
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-black flex items-center gap-3 tracking-tight">
              <Flame className="text-black" size={40} strokeWidth={2} />
              Daily Challenge
            </h1>
            <p className="text-sm font-medium mt-3 max-w-xl leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
              Win instant cash rewards by dominating the leaderboards. Participate in daily, weekly, and monthly sprints to maximize your earnings.
            </p>
          </div>
          
          {/* Top Filters */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-auto group">
              <select 
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="w-full sm:w-40 appearance-none bg-white border border-black/10 rounded-full px-4 py-2.5 pr-10 text-sm font-bold text-black focus:outline-none focus:border-black transition-all cursor-pointer hover:bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-hover:text-black transition-colors" size={16} />
            </div>
            
            <div className="relative w-full sm:w-auto group">
              <select 
                value={includePosts}
                onChange={(e) => setIncludePosts(e.target.value)}
                className="w-full sm:w-48 appearance-none bg-white border border-black/10 rounded-full px-4 py-2.5 pr-10 text-sm font-bold text-black focus:outline-none focus:border-black transition-all cursor-pointer hover:bg-neutral-50 shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
              >
                <option>Verified Posts</option>
                <option>All Posts</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none group-hover:text-black transition-colors" size={16} />
            </div>
          </div>
        </div>

        {/* ── PRIZE POOL & TIMERS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Prize Pool Card */}
          <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-white text-black p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-black/5 group">
            <div className="relative z-10 flex flex-col md:flex-row justify-between h-full gap-8">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d1f8ff] border border-black/5 text-[10px] font-black uppercase tracking-widest text-black mb-6 shadow-sm">
                    <Trophy size={12} className="text-black" />
                    Today's Prize Pool
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(0,0,0,0.5)" }}>Total Guaranteed</h3>
                  <div className="font-heading text-6xl md:text-7xl font-extrabold tracking-tight text-black">
                    ₹100
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center gap-4 min-w-[240px]">
                <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl p-4 transform transition-all hover:scale-[1.02] hover:bg-white cursor-default shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold" style={{ color: "rgba(0,0,0,0.6)" }}>Most verified reels</span>
                    <Zap size={14} className="text-black" />
                  </div>
                  <div className="font-heading text-2xl font-extrabold text-black">₹50</div>
                </div>
                
                <div className="bg-white/80 backdrop-blur-md border border-black/5 rounded-3xl p-4 transform transition-all hover:scale-[1.02] hover:bg-white cursor-default shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold" style={{ color: "rgba(0,0,0,0.6)" }}>Most verified views</span>
                    <Eye size={14} className="text-black" />
                  </div>
                  <div className="font-heading text-2xl font-extrabold text-black">₹50</div>
                </div>
              </div>
            </div>
          </div>

          {/* Time & Progress Stack */}
          <div className="flex flex-col gap-6">
            {/* Countdown Box */}
            <div className="bg-white rounded-3xl p-7 border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.02)] relative overflow-hidden group">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-black/5 text-[10px] font-black uppercase tracking-widest text-black mb-5">
                  <Clock size={12} />
                  Time Remaining
                </div>
                
                <div className="flex flex-col gap-1 mb-5">
                  <div className="font-heading text-4xl font-extrabold text-black tracking-tighter">22h 09m</div>
                  <div className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.4)" }}>Until contest closes</div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-black h-full rounded-full" style={{ width: '8% '}} />
                </div>
                
                <div className="mt-5 space-y-2 text-xs font-semibold">
                  <div className="flex justify-between items-center" style={{ color: "rgba(0,0,0,0.6)" }}>
                    <span>Starts</span>
                    <span className="text-black">13 Jun 2026, 12:00 am</span>
                  </div>
                  <div className="flex justify-between items-center" style={{ color: "rgba(0,0,0,0.6)" }}>
                    <span>Ends</span>
                    <span className="text-black">14 Jun 2026, 12:00 am</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── RULES & PROGRESS TWO-COLUMN ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Rules Card */}
          <div className="bg-white rounded-3xl p-7 border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
            <h3 className="text-lg font-extrabold text-black mb-6 flex items-center gap-2">
              <ShieldCheck className="text-black" size={20} />
              Contest Rules & Eligibility
            </h3>
            
            <div className="space-y-5">
              <div className="p-5 rounded-3xl bg-neutral-50 border border-black/5">
                <h4 className="text-sm font-bold text-black mb-2 flex items-center gap-2">
                  <Eye size={16} className="text-black" />
                  Most Verified Views Prize
                </h4>
                <ul className="space-y-2 text-[13px] font-medium" style={{ color: "rgba(0,0,0,0.7)" }}>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-black mt-2 shrink-0" />
                    <span><strong className="text-black">Eligibility:</strong> Minimum of 1,000 combined verified views across all eligible reels.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-black mt-2 shrink-0" />
                    <span><strong className="text-black">How to win:</strong> Rank #1 on the Views leaderboard when the timer hits zero.</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-5 rounded-3xl bg-neutral-50 border border-black/5">
                <h4 className="text-sm font-bold text-black mb-2 flex items-center gap-2">
                  <Video size={16} className="text-black" />
                  Most Verified Reels Prize
                </h4>
                <ul className="space-y-2 text-[13px] font-medium" style={{ color: "rgba(0,0,0,0.7)" }}>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-black mt-2 shrink-0" />
                    <span><strong className="text-black">Eligibility:</strong> At least 3 verified reels (min. 100 views each) and 500+ combined views.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-black mt-2 shrink-0" />
                    <span><strong className="text-black">How to win:</strong> Rank #1 on the Reels leaderboard when the timer hits zero.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* User Progress Cards */}
          <div className="bg-white rounded-3xl p-7 border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
            <h3 className="text-lg font-extrabold text-black mb-6 flex items-center gap-2">
              <Trophy className="text-black" size={20} />
              Your Live Progress
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-auto sm:h-[calc(100%-3rem)]">
              {/* Views Progress */}
              <div className="border border-black/10 rounded-3xl p-5 bg-white flex flex-col justify-between group hover:border-black transition-colors shadow-sm">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(0,0,0,0.5)" }}>Views Rank</h4>
                  <div className="font-heading text-3xl font-extrabold text-black tracking-tight mb-3">Unranked</div>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                    Submit and verify more reels to unlock your standing on the views board.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5">
                  <button className="w-full text-center py-2.5 rounded-full border border-black/10 text-xs font-bold text-black hover:bg-black hover:text-white transition-all shadow-sm">
                    Submit a Reel
                  </button>
                </div>
              </div>

              {/* Reels Progress */}
              <div className="border border-black/10 rounded-3xl p-5 bg-white flex flex-col justify-between group hover:border-black transition-colors shadow-sm">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(0,0,0,0.5)" }}>Reels Rank</h4>
                  <div className="font-heading text-3xl font-extrabold text-black tracking-tight mb-3">Unranked</div>
                  <p className="text-xs font-medium leading-relaxed" style={{ color: "rgba(0,0,0,0.6)" }}>
                    Maintain daily upload consistency to climb the ranks faster.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-black/5">
                  <button className="w-full text-center py-2.5 rounded-full border border-black/10 text-xs font-bold text-black hover:bg-black hover:text-white transition-all shadow-sm">
                    Needs More Data
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* ── LEADERBOARD SECTION ── */}
        <div className="bg-white rounded-3xl border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden">
          {/* Section Header */}
          <div className="p-6 md:p-8 border-b border-black/5 bg-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-extrabold text-black flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                  Live Leaderboard
                </h3>
                <p className="text-xs max-w-xl leading-relaxed font-medium" style={{ color: "rgba(0,0,0,0.6)" }}>
                  Ranks update automatically upon valid refreshes. Cache TTL cooldown applies between heavy queries.
                </p>
              </div>
              
              <button className="flex items-center justify-center gap-2 bg-black hover:bg-neutral-800 text-white py-2.5 px-5 rounded-full text-sm font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_12px_rgba(0,0,0,0.1)] shrink-0">
                <RefreshCw size={14} />
                Refresh Standings
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8 bg-neutral-50/30">
            {/* Sleek Segmented Control Tab */}
            <div className="flex p-1 bg-neutral-100 rounded-3xl mb-8 border border-black/5 max-w-md mx-auto md:mx-0 relative shadow-inner">
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] bg-white rounded-full shadow-sm border border-black/5 transition-transform duration-300 ease-in-out ${
                  activeTab === "views" ? "translate-x-0" : "translate-x-[calc(100%+0.5rem)]"
                }`}
              />
              <button 
                onClick={() => setActiveTab("views")}
                className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold transition-colors relative z-10 ${
                  activeTab === "views" ? "text-black" : "text-neutral-500 hover:text-black"
                }`}
              >
                <Eye size={14} className={activeTab === "views" ? "text-black" : ""} /> Views
              </button>
              <button 
                onClick={() => setActiveTab("reels")}
                className={`flex-1 flex justify-center items-center gap-2 py-2.5 rounded-full text-sm font-bold transition-colors relative z-10 ${
                  activeTab === "reels" ? "text-black" : "text-neutral-500 hover:text-black"
                }`}
              >
                <Video size={14} className={activeTab === "reels" ? "text-black" : ""} /> Reels
              </button>
            </div>

            {/* List */}
            <div className="space-y-3">
              
              {/* Rank 1 Card */}
              <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 bg-[#d1f8ff]/30 border border-[#d1f8ff] rounded-3xl transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:-translate-y-0.5">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-black rounded-l-2xl" />
                
                <div className="flex items-center gap-5">
                  <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center font-black text-black text-lg shadow-sm">1</div>
                    <Crown size={14} className="absolute -top-3 text-yellow-500" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center font-black text-white text-lg shadow-md border-2 border-white">J</div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-heading font-extrabold text-base text-black">jouska</span>
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-neutral-600 border border-black/10">Not eligible</span>
                    </div>
                    <p className="text-[11px] font-medium" style={{ color: "rgba(0,0,0,0.6)" }}>
                      Reels - <span className="text-black font-bold">0</span> (0 verified) • Views - <span className="text-black font-bold">24</span> (0 verified)
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right pl-[5.5rem] md:pl-0">
                  <div className="font-heading font-extrabold text-2xl text-black tracking-tight">0 views</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "rgba(0,0,0,0.4)" }}>0 ranks</div>
                </div>
              </div>

              {/* Rank 2 Card */}
              <div className="group relative flex flex-col md:flex-row md:items-center justify-between p-5 bg-white border border-black/5 rounded-3xl transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:border-black/20">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-full bg-neutral-50 border border-black/10 flex items-center justify-center font-black text-neutral-500 text-lg">2</div>
                  <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center font-black text-white text-lg shadow-md border-2 border-white">G</div>
                  <div>
                    <div className="font-heading font-extrabold text-base text-black mb-0.5">gauravvv7</div>
                    <p className="text-[11px] font-medium" style={{ color: "rgba(0,0,0,0.6)" }}>
                      Reels - <span className="text-black font-bold">0</span> (0 verified) • Views - <span className="text-black font-bold">5</span> (0 verified)
                    </p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right pl-[5.5rem] md:pl-0">
                  <div className="font-heading font-extrabold text-2xl text-black tracking-tight">0 views</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5" style={{ color: "rgba(0,0,0,0.4)" }}>0 ranks</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-black/5">
              <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.5)" }}>Showing 1 to 2 of 2 results</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.4)" }}>Show:</span>
                <select className="border border-black/10 rounded-full px-2 py-1 bg-white text-black text-xs font-bold outline-none hover:bg-neutral-50 transition-colors cursor-pointer shadow-sm">
                  <option>25</option>
                  <option>50</option>
                </select>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.4)" }}>per page</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── PAST WINNERS HISTORY ── */}
        <div className="bg-white rounded-3xl border border-black/10 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-6 md:p-8 border-b border-black/5 bg-white flex items-center justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-black flex items-center gap-2 mb-2">
                <Crown size={20} className="text-black" />
                Hall of Fame
              </h3>
              <p className="text-xs font-medium max-w-xl" style={{ color: "rgba(0,0,0,0.6)" }}>
                Historical records of past sprint winners. Recorded automatically upon contest closure.
              </p>
            </div>
          </div>

          <div className="divide-y divide-black/5">
            {[
              { date: "11 Jun → 12 Jun 2026", type: "Views", winner: "pro_diper", stats: "21,958 views • 3 reels", prize: "₹50", win: true },
              { date: "11 Jun → 12 Jun 2026", type: "Reels", winner: "pro_diyanshu", stats: "4 reels • 8,569 views", prize: "₹50", win: true },
              { date: "10 Jun → 11 Jun 2026", type: "Views", winner: "N/A", stats: "0 views • 0 reels", prize: "No prize", win: false },
              { date: "9 Jun → 10 Jun 2026", type: "Views", winner: "pro_diper", stats: "12,500 views • 2 reels", prize: "₹50", win: true },
              { date: "8 Jun → 9 Jun 2026", type: "Views", winner: "pro_diper", stats: "24,200 views • 2 reels", prize: "₹50", win: true },
            ].map((item, idx) => (
              <div key={idx} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors group">
                <div className="flex gap-4 items-center">
                  <div className="hidden sm:flex w-10 h-10 rounded-full bg-neutral-100 border border-black/5 items-center justify-center text-neutral-500 group-hover:bg-white group-hover:shadow-sm transition-all">
                    {item.type === "Views" ? <Eye size={16} /> : <Video size={16} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-black border border-black/10 shadow-sm">Daily Mode</span>
                      <span className="text-xs font-bold text-black">{item.date} — {item.type}</span>
                    </div>
                    <div className="text-sm font-medium" style={{ color: "rgba(0,0,0,0.6)" }}>
                      Winner: <span className="font-extrabold text-black">{item.winner}</span> <span className="text-neutral-300 px-1">•</span> {item.stats}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pl-[3.5rem] sm:pl-0">
                  {item.win ? (
                    <>
                      <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-neutral-100 text-black border border-black/5 shadow-sm">
                        Won {item.prize}
                      </div>
                      <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-black text-white shadow-sm">
                        Recorded
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-xs font-bold px-3 py-1.5 rounded-full bg-neutral-50 text-neutral-500 border border-black/5">
                        No one qualified
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Footer */}
          <div className="p-5 bg-neutral-50/50 flex flex-col sm:flex-row sm:items-center justify-between border-t border-black/5 gap-4">
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(0,0,0,0.5)" }}>Showing latest 5 records</span>
            <div className="flex items-center gap-1.5">
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black/10 bg-white text-neutral-400 hover:bg-neutral-50 hover:text-black transition-colors shadow-sm">«</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black/10 bg-white text-neutral-400 hover:bg-neutral-50 hover:text-black transition-colors shadow-sm">‹</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-xs font-bold shadow-md shadow-black/10">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black/10 bg-white text-neutral-600 text-xs font-bold hover:bg-neutral-50 hover:text-black transition-colors shadow-sm">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black/10 bg-white text-neutral-400 hover:bg-neutral-50 hover:text-black transition-colors shadow-sm">›</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-full border border-black/10 bg-white text-neutral-400 hover:bg-neutral-50 hover:text-black transition-colors shadow-sm">»</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
