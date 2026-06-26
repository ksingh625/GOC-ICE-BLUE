import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ALL_CAMPAIGN_DATA } from "../../App";
import { 
  Search, Grid, Compass, Calendar, Trophy, Coins,
  Clock, CheckCircle, ChevronDown, Check, ChevronRight, X,
  Video, Image as ImageIcon, Flame, ArrowUpRight, DollarSign, Laptop, Users,
  Sparkles, Smartphone, Award, PlayCircle
} from "lucide-react";

export default function CreatorCampaignsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"All" | "Live" | "Ended">("Live");
  const [contentType, setContentType] = useState<"All" | "Text" | "Video">("All");
  const [platformFilter, setPlatformFilter] = useState("All Platforms");
  const [typeFilter, setTypeFilter] = useState("All Campaign Types");
  const [selectedCamp, setSelectedCamp] = useState<typeof ALL_CAMPAIGN_DATA[0] | null>(null);

  // Billboard Slider State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const featuredCamp = ALL_CAMPAIGN_DATA.filter(c => c.featured);

  // Keyboard shortcut Ctrl+K / Cmd+K
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

  // Billboard auto-rotate
  useEffect(() => {
    if (isSliderHovered || featuredCamp.length === 0) return;
    const interval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % featuredCamp.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [featuredCamp.length, isSliderHovered]);

  // Main Filter Logic
  const filtered = ALL_CAMPAIGN_DATA.filter((c) => {
    const matchSearch = 
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.brand.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    const matchTab = 
      activeTab === "All" ||
      (activeTab === "Live" && c.daysLeft > 0) ||
      (activeTab === "Ended" && c.daysLeft <= 0);

    const matchContentType =
      contentType === "All" ||
      (contentType === "Video" && c.tags.includes("Clipping")) ||
      (contentType === "Text" && !c.tags.includes("Clipping"));

    const matchPlatform = 
      platformFilter === "All Platforms" || 
      (platformFilter === "TikTok" && c.platforms?.includes("tiktok")) ||
      (platformFilter === "Instagram" && c.platforms?.includes("instagram")) ||
      (platformFilter === "YouTube" && c.platforms?.includes("youtube"));

    const matchType = 
      typeFilter === "All Campaign Types" ||
      (typeFilter === "Milestone" && c.tags.includes("Milestone")) ||
      (typeFilter === "CPM" && c.payType === "Per View") ||
      (typeFilter === "Leaderboard" && !c.tags.includes("Milestone") && c.payType !== "Per View");

    return matchSearch && matchTab && matchContentType && matchPlatform && matchType;
  });

  // Netflix-style categorizations
  const trendingCampaigns = filtered.filter(c => c.featured || c.hot || (c.daysLeft > 0 && c.daysLeft < 8));
  const clippingCampaigns = filtered.filter(c => c.tags.includes("Clipping") || c.tags.includes("Video"));
  const productCampaigns = filtered.filter(c => c.tags.includes("Product") || c.tags.includes("Logo") || c.tags.includes("Review"));
  const socialCampaigns = filtered.filter(c => c.platforms?.includes("instagram") || c.platforms?.includes("tiktok"));

  const isFilterActive = search !== "" || platformFilter !== "All Platforms" || typeFilter !== "All Campaign Types" || contentType !== "All";

  // Render Campaign Card helper (Premium layout)
  const renderCampaignCard = (c: typeof ALL_CAMPAIGN_DATA[0]) => {
    const spentNum = parseFloat(c.spent.replace(/[^0-9.]/g, ""));
    const budgetNum = parseFloat(c.budget.replace(/[^0-9.]/g, ""));
    const percent = Math.min(100, Math.round((spentNum / (budgetNum || 1)) * 100)) || 0;
    const isLive = c.daysLeft > 0;

    return (
      <div 
        key={c.id} 
        onClick={() => setSelectedCamp(c)}
        className="w-72 bg-white border border-neutral-200/80 hover:border-black hover:shadow-xl rounded-3xl p-5 shadow-xs transition-all duration-300 flex-shrink-0 flex flex-col justify-between cursor-pointer group text-left relative"
      >
        {c.hot && (
          <span className="absolute top-8 left-8 z-10 bg-black text-[#d1f8ff] text-[8px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm animate-pulse">
            <Flame size={9} className="fill-[#d1f8ff]" /> HOT
          </span>
        )}

        <div>
          {/* Card Thumbnail Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/40 mb-4">
            <img 
              src={c.img} 
              alt={c.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <span className={`absolute top-3 right-3 text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
              isLive ? "bg-white text-black shadow-xs" : "bg-neutral-250 text-neutral-500"
            }`}>
              {isLive ? `${c.daysLeft}d left` : "Ended"}
            </span>
          </div>

          {/* Brand Info & Avatar */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5.5 h-5.5 rounded-lg flex items-center justify-center text-white font-extrabold text-[9px] shadow-xs"
              style={{ background: c.logoColor, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {c.logo}
            </div>
            <span className="text-[10px] font-black text-neutral-450 tracking-wide uppercase">{c.brand}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm font-black text-black group-hover:text-black line-clamp-1 leading-snug" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            {c.title}
          </h3>

          {/* Platforms Custom Display */}
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {c.platforms?.map(p => {
              const colorClass = 
                p === "tiktok" ? "bg-black text-[#d1f8ff]" : 
                p === "youtube" ? "bg-red-50 text-red-600 border-red-100" :
                "bg-pink-50 text-pink-600 border-pink-100";
              return (
                <span key={p} className={`px-2 py-0.5 text-[8px] font-extrabold uppercase rounded-full border border-black/5 ${colorClass}`}>
                  {p}
                </span>
              );
            })}
          </div>

          {/* Stats Info */}
          <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] text-neutral-400 font-bold border-t border-neutral-100 pt-3">
            <div>
              <p className="text-[8px] uppercase tracking-wider text-neutral-400">Prize Pool</p>
              <p className="text-black font-black mt-0.5 text-xs">{c.prize}</p>
            </div>
            <div>
              <p className="text-[8px] uppercase tracking-wider text-neutral-400">Pay Rate</p>
              <p className="text-emerald-600 font-extrabold mt-0.5">{c.payRate}/{c.payUnit === "view" ? "1K views" : "UGC"}</p>
            </div>
          </div>
        </div>

        {/* Budget bar & action */}
        <div className="mt-4 pt-3 border-t border-neutral-50 space-y-3.5">
          <div>
            <div className="flex justify-between items-center text-[9px] text-neutral-400 font-bold mb-1">
              <span>Escrow Funding</span>
              <span className="font-extrabold text-black">{percent}% released</span>
            </div>
            <div className="w-full bg-neutral-100 rounded-full h-1 overflow-hidden">
              <div className="bg-black h-full rounded-full transition-all" style={{ width: `${percent}%` }} />
            </div>
          </div>

          <button className="w-full py-2.5 rounded-xl border border-neutral-200 group-hover:border-black text-[11px] font-black text-neutral-600 group-hover:text-black bg-white group-hover:bg-[#d1f8ff]/25 transition-all flex items-center justify-center gap-1">
            <span>View Brief</span>
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto text-left">
      
      {/* ── HEADER TITLE ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Campaigns Arena
          </h1>
          <p className="text-xs text-neutral-500 font-semibold mt-1">Submit links, track clipping performance, and collect payouts directly.</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => navigate("/creator/getting-started")}
            className="px-4 py-2 border border-neutral-200 bg-white hover:bg-neutral-50 rounded-xl text-xs font-black text-neutral-600 transition-all cursor-pointer shadow-xs"
          >
            How it works
          </button>
          <button 
            onClick={() => navigate("/creator/submissions")}
            className="btn-primary-gradient px-4 py-2 rounded-xl text-xs font-black shadow-sm"
          >
            My Submissions
          </button>
        </div>
      </div>

      {/* ── SEARCH & INTEGRATION BAR ── */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-3.5 text-neutral-400" size={15} />
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Search campaigns, brands, or platforms... (Press Ctrl+K)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-neutral-200 text-xs focus:outline-none focus:border-black transition-all bg-white shadow-xs"
          />
        </div>

        {/* Tab filters (Live vs Ended) */}
        <div className="bg-neutral-100 p-1 rounded-xl border border-black/5 flex w-full md:w-auto">
          {(["Live", "All", "Ended"] as const).map((tab) => {
            const count = 
              tab === "All" ? ALL_CAMPAIGN_DATA.length :
              tab === "Live" ? ALL_CAMPAIGN_DATA.filter(c => c.daysLeft > 0).length :
              ALL_CAMPAIGN_DATA.filter(c => c.daysLeft <= 0).length;

            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab 
                    ? "bg-white text-black shadow-xs" 
                    : "text-neutral-500 hover:text-black"
                }`}
              >
                {tab} Campaigns ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* ── DETAILED CHIP FILTER ROW ── */}
      <div className="flex flex-wrap gap-2 items-center justify-between border-b border-neutral-100 pb-5">
        
        {/* Dropdowns */}
        <div className="flex flex-wrap gap-2">
          {/* Platforms */}
          <div className="relative">
            <select 
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="appearance-none bg-white border border-neutral-200/80 hover:border-black rounded-xl pl-3.5 pr-8 py-2 text-[11px] font-black text-neutral-600 cursor-pointer focus:outline-none shadow-xs"
            >
              <option>All Platforms</option>
              <option>TikTok</option>
              <option>Instagram</option>
              <option>YouTube</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>

          {/* Campaign Types */}
          <div className="relative">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none bg-white border border-neutral-200/80 hover:border-black rounded-xl pl-3.5 pr-8 py-2 text-[11px] font-black text-neutral-600 cursor-pointer focus:outline-none shadow-xs"
            >
              <option>All Campaign Types</option>
              <option>Milestone</option>
              <option>CPM</option>
              <option>Leaderboard</option>
            </select>
            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
        </div>

        {/* Content format selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Format:</span>
          {(["All", "Text", "Video"] as const).map(f => (
            <button
              key={f}
              onClick={() => setContentType(f)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all border cursor-pointer ${
                contentType === f 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-neutral-600 border-neutral-200/85 hover:border-black"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── CINEMATIC BILLBOARD BANNER SLIDER (Only show if not searching/filtering) ── */}
      {!isFilterActive && featuredCamp.length > 0 && (
        <div 
          className="relative overflow-hidden w-full h-[280px] rounded-3xl bg-neutral-900 shadow-md group border border-neutral-200/40 select-none animate-fade-in"
          onMouseEnter={() => setIsSliderHovered(true)}
          onMouseLeave={() => setIsSliderHovered(false)}
        >
          {featuredCamp.map((camp, idx) => {
            const isActive = idx === activeSlide;
            const spentNum = parseFloat(camp.spent.replace(/[^0-9.]/g, ""));
            const budgetNum = parseFloat(camp.budget.replace(/[^0-9.]/g, ""));
            const percent = Math.min(100, Math.round((spentNum / (budgetNum || 1)) * 100)) || 0;

            return (
              <div
                key={camp.id}
                className="absolute inset-0 w-full h-full flex flex-col md:flex-row justify-between items-stretch transition-all duration-1000"
                style={{
                  opacity: isActive ? 1 : 0,
                  visibility: isActive ? "visible" : "hidden",
                  transform: isActive ? "scale(1)" : "scale(1.03)",
                }}
              >
                {/* Background image & gradient overlay */}
                <div className="absolute inset-0 z-0">
                  <img src={camp.img} alt={camp.title} className="w-full h-full object-cover opacity-25" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
                </div>

                {/* Left Billboard details */}
                <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between flex-1 text-white max-w-xl">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#d1f8ff] text-black text-[9px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                        <Sparkles size={9} className="fill-black" /> FEATURED CHALLENGE
                      </span>
                      <span className="text-[10px] text-neutral-350 font-bold uppercase tracking-wider">Ends In {camp.daysLeft} days</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-black tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                      {camp.title}
                    </h2>
                    <p className="text-[11px] text-neutral-300 font-semibold line-clamp-2 leading-relaxed max-w-md">
                      {camp.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 mt-4">
                    <button 
                      onClick={() => setSelectedCamp(camp)}
                      className="px-5 py-2.5 rounded-xl bg-[#d1f8ff] hover:bg-white text-black text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow"
                    >
                      <PlayCircle size={14} /> Join Campaign
                    </button>
                    <div className="text-[10px] text-neutral-300 font-semibold">
                      <p>Active Pool: <strong className="text-white">{camp.prize}</strong></p>
                      <p>Platform: <strong className="text-[#d1f8ff] capitalize">{camp.platforms?.join(", ")}</strong></p>
                    </div>
                  </div>
                </div>

                {/* Right metrics overlay */}
                <div className="relative z-10 p-6 md:p-8 md:flex flex-col justify-end hidden text-right text-white max-w-xs border-l border-white/5 bg-black/10">
                  <div className="space-y-4">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold">Escrow Released</p>
                      <h4 className="text-lg font-black text-white" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{camp.spent} / {camp.budget}</h4>
                      <div className="w-40 bg-white/20 rounded-full h-1 mt-1.5 overflow-hidden">
                        <div className="bg-[#d1f8ff] h-full rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    
                    <div className="flex justify-end gap-2">
                      <div className="px-2.5 py-1 bg-white/10 rounded-lg text-center">
                        <p className="text-[11px] font-black text-white">{camp.submissions}</p>
                        <p className="text-[7px] uppercase tracking-widest text-neutral-400 font-bold mt-0.5">Clips</p>
                      </div>
                      <div className="px-2.5 py-1 bg-white/10 rounded-lg text-center">
                        <p className="text-[11px] font-black text-[#d1f8ff]">{camp.payRate}</p>
                        <p className="text-[7px] uppercase tracking-widest text-neutral-400 font-bold mt-0.5">Payout</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {featuredCamp.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${idx === activeSlide ? "bg-[#d1f8ff] w-4" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── CAMPAIGNS CONTAINER ── */}
      {filtered.length > 0 ? (
        isFilterActive ? (
          /* Plain Grid Layout when search/filters are active */
          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-neutral-400 tracking-wider">Search Results ({filtered.length})</h3>
            <div className="flex flex-wrap gap-6 justify-start">
              {filtered.map(renderCampaignCard)}
            </div>
          </div>
        ) : (
          /* Netflix horizontal rows */
          <div className="space-y-8">
            {/* Trending Challenges */}
            {trendingCampaigns.length > 0 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-1.5">
                  <Flame className="text-black fill-[#d1f8ff]" size={16} />
                  <h3 className="text-base font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Trending Contests</h3>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-none custom-modal-scrollbar">
                  {trendingCampaigns.map(renderCampaignCard)}
                </div>
              </div>
            )}

            {/* UGC Video / Clipping */}
            {clippingCampaigns.length > 0 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-1.5">
                  <Video className="text-black" size={16} />
                  <h3 className="text-base font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Video UGC & Clipping Deals</h3>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-none custom-modal-scrollbar">
                  {clippingCampaigns.map(renderCampaignCard)}
                </div>
              </div>
            )}

            {/* Product Demos */}
            {productCampaigns.length > 0 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-1.5">
                  <Smartphone className="text-black" size={16} />
                  <h3 className="text-base font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Product Reviews & Showcase</h3>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-none custom-modal-scrollbar">
                  {productCampaigns.map(renderCampaignCard)}
                </div>
              </div>
            )}

            {/* Social campaigns */}
            {socialCampaigns.length > 0 && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-1.5">
                  <Compass className="text-black" size={16} />
                  <h3 className="text-base font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>TikTok & Instagram Challenges</h3>
                </div>
                <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-none custom-modal-scrollbar">
                  {socialCampaigns.map(renderCampaignCard)}
                </div>
              </div>
            )}
          </div>
        )
      ) : (
        <div className="text-center py-20 bg-white border border-neutral-200/60 rounded-3xl">
          <Compass size={40} className="mx-auto mb-4 text-neutral-350 animate-spin" style={{ animationDuration: "10s" }} />
          <h3 className="text-sm font-extrabold text-black">No Campaigns Found</h3>
          <p className="text-xs text-neutral-500 mt-1 font-medium">Try clearing your filters or changing search keywords.</p>
        </div>
      )}

      {/* ── CAMPAIGN DETAILS MODAL ── */}
      {selectedCamp && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs"
          onClick={() => setSelectedCamp(null)}
        >
          <div 
            className="bg-white rounded-3xl border border-neutral-200 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative text-left animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Cover Image */}
            <div className="relative h-48 flex-shrink-0 bg-neutral-900 overflow-hidden">
              <img src={selectedCamp.img} alt={selectedCamp.title} className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
              <button 
                onClick={() => setSelectedCamp(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-white transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow"
                  style={{ background: selectedCamp.logoColor, fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {selectedCamp.logo}
                </div>
                <div>
                  <h4 className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{selectedCamp.brand}</h4>
                  <div className="flex gap-1.5 mt-0.5 flex-wrap">
                    {selectedCamp.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded text-[8px] font-extrabold bg-[#d1f8ff] text-black border border-black/5 uppercase">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable details content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="text-xl font-extrabold text-black tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  {selectedCamp.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed font-semibold">
                  {selectedCamp.description}
                </p>
              </div>

              {/* Grid Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Prize Pool", val: selectedCamp.prize, icon: <Trophy size={14} className="text-amber-500" /> },
                  { label: "Pay Rate", val: `${selectedCamp.payRate}/${selectedCamp.payUnit}`, icon: <DollarSign size={14} className="text-emerald-500" /> },
                  { label: "Submissions", val: selectedCamp.submissions, icon: <Users size={14} className="text-purple-500" /> },
                  { label: "Days Left", val: selectedCamp.daysLeft, icon: <Clock size={14} className="text-blue-500" /> }
                ].map((m, idx) => (
                  <div key={idx} className="p-3 bg-slate-50/50 border border-neutral-200/60 rounded-2xl flex flex-col justify-between">
                    <div className="text-neutral-400">{m.icon}</div>
                    <div className="mt-3">
                      <p className="text-xs font-black text-black leading-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{m.val}</p>
                      <p className="text-[8px] font-extrabold text-neutral-400 uppercase tracking-wider mt-0.5">{m.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guidelines */}
              <div className="p-4 rounded-2xl bg-[#d1f8ff]/15 border border-black/5 space-y-2.5">
                <h4 className="text-xs font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Participation Guidelines</h4>
                <ul className="text-[10px] text-neutral-600 space-y-2 list-disc list-inside font-semibold leading-normal">
                  <li>Minimum views requirement: **{selectedCamp.views}** views to unlock top tier multipliers.</li>
                  <li>Incorporate native call-outs and packaging shots in the first 4 seconds.</li>
                  <li>No duplicate uploads or links from other creator campaigns.</li>
                  <li>Funds held in escrow vault; released upon review.</li>
                </ul>
              </div>
            </div>

            {/* Bottom Join CTA */}
            <div className="p-4 border-t border-neutral-100 bg-white flex-shrink-0">
              <button 
                onClick={() => {
                  setSelectedCamp(null);
                  navigate("/creator/submissions");
                }}
                className="w-full btn-primary-gradient py-3.5 rounded-xl text-xs font-black shadow-sm"
              >
                Join Campaign — Submit Video Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
