import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ALL_CAMPAIGN_DATA } from "../../App";
import confetti from "canvas-confetti";
import { 
  Search, FileCheck, ArrowUpRight, ShieldAlert,
  Inbox, Link2, Plus, Clock, Eye, CheckCircle2, XCircle,
  TrendingUp, CreditCard, ChevronDown, Check, X,
  Video, Sparkles, Youtube, Instagram, Smartphone, AlertCircle, PlayCircle,
  Award
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

export default function CreatorSubmissionsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING" | "VERIFIED" | "REJECTED" | "PAID">("ALL");
  
  // Submit Wizard Modal State
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  
  // Wizard Fields
  const [selectedCampId, setSelectedCampId] = useState(1);
  const [chosenPlatform, setChosenPlatform] = useState<"TikTok" | "YouTube" | "Instagram">("TikTok");
  const [videoUrl, setVideoUrl] = useState("");
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Submissions State
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  // Load submissions from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("goc_submissions");
      if (stored) {
        setSubmissions(JSON.parse(stored));
      } else {
        const defaultSub: Submission[] = [
          {
            id: 1,
            campaignId: 1,
            campaignTitle: "Roobet Official Clipping",
            url: "https://tiktok.com/@gamer_ash/video/98765432101",
            views: 12450,
            status: "VERIFIED",
            date: "June 25, 2026",
            platform: "TikTok",
            earned: 12.45
          }
        ];
        localStorage.setItem("goc_submissions", JSON.stringify(defaultSub));
        setSubmissions(defaultSub);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save submissions helper
  const saveSubmissions = (newSubs: Submission[]) => {
    setSubmissions(newSubs);
    try {
      localStorage.setItem("goc_submissions", JSON.stringify(newSubs));
    } catch (e) {
      console.error(e);
    }
  };

  // URL auto-platform detection & validation
  useEffect(() => {
    if (!videoUrl) {
      setValidationError(null);
      return;
    }
    const urlLower = videoUrl.toLowerCase();
    
    if (chosenPlatform === "TikTok" && !urlLower.includes("tiktok.com")) {
      setValidationError("TikTok links must contain 'tiktok.com'");
    } else if (chosenPlatform === "YouTube" && !urlLower.includes("youtube.com") && !urlLower.includes("youtu.be")) {
      setValidationError("YouTube links must contain 'youtube.com' or 'youtu.be'");
    } else if (chosenPlatform === "Instagram" && !urlLower.includes("instagram.com")) {
      setValidationError("Instagram links must contain 'instagram.com'");
    } else {
      setValidationError(null);
    }
  }, [videoUrl, chosenPlatform]);

  // Form submission handler
  const handleSubmitLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl || validationError || !checkedTerms) return;

    const matchedCamp = ALL_CAMPAIGN_DATA.find(c => c.id === selectedCampId);
    if (!matchedCamp) return;

    const newSub: Submission = {
      id: Date.now(),
      campaignId: matchedCamp.id,
      campaignTitle: matchedCamp.title,
      url: videoUrl,
      views: 0,
      status: "PENDING",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      platform: chosenPlatform,
      earned: 0
    };

    const updated = [newSub, ...submissions];
    saveSubmissions(updated);
    
    setSubmitModalOpen(false);
    setWizardStep(1);
    setVideoUrl("");
    setCheckedTerms(false);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Simulate Audit Approval (10x UX for Sandbox)
  const handleSimulateAudit = (subId: number) => {
    const matchedSub = submissions.find(s => s.id === subId);
    if (!matchedSub) return;

    // Determine target campaign views/rates
    const camp = ALL_CAMPAIGN_DATA.find(c => c.id === matchedSub.campaignId);
    const payoutFactor = camp?.payUnit === "view" ? 0.0012 : 1.5; // multiplier helper

    const simulatedViews = Math.floor(Math.random() * 32000) + 8500;
    const simulatedEarnings = parseFloat((simulatedViews * payoutFactor * 0.1).toFixed(2));

    const updated = submissions.map(s => {
      if (s.id === subId) {
        return {
          ...s,
          status: "VERIFIED" as const,
          views: simulatedViews,
          earned: simulatedEarnings
        };
      }
      return s;
    });

    saveSubmissions(updated);

    confetti({
      particleCount: 80,
      spread: 60,
      colors: ["#d1f8ff", "#000000", "#ffffff"]
    });
  };

  // Metrics Calculations
  const totalCampaignsCount = new Set(submissions.map(s => s.campaignId)).size;
  const totalViews = submissions.reduce((acc, curr) => acc + curr.views, 0);
  
  const paidEarnings = submissions
    .filter(s => s.status === "PAID")
    .reduce((acc, curr) => acc + curr.earned, 0);

  const pendingEarnings = submissions
    .filter(s => s.status === "VERIFIED" || s.status === "PENDING")
    .reduce((acc, curr) => acc + (curr.status === "VERIFIED" ? curr.earned : 0), 0);

  // Filters logic
  const filteredSubmissions = submissions.filter(s => {
    const matchSearch = s.campaignTitle.toLowerCase().includes(search.toLowerCase()) || s.url.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "ALL" || s.status === activeTab;
    return matchSearch && matchTab;
  });

  const getCampaignTitle = (id: number) => {
    return ALL_CAMPAIGN_DATA.find(c => c.id === id)?.title || "Campaign Challenge";
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto text-left relative animate-fade-in">
      
      {/* ── HEADER TITLE ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Submissions & Winnings
          </h1>
          <p className="text-xs text-neutral-500 font-semibold mt-1">Submit your UGC links, verify view counts, and request escrow cashouts.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Custom Search field */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-3 text-neutral-400" size={14} />
            <input 
              type="text" 
              placeholder="Search submissions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black bg-white shadow-xs"
            />
          </div>

          <button 
            onClick={() => {
              setWizardStep(1);
              setSubmitModalOpen(true);
            }}
            className="btn-primary-gradient px-4 py-2.5 rounded-xl text-xs font-black shadow-sm whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <Plus size={13} /> Submit Video Link
          </button>
        </div>
      </div>

      {/* ── SIX CARDS METRICS ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Submitted To", val: `${totalCampaignsCount} Challenges`, icon: <FileCheck size={14} className="text-purple-500" /> },
          { label: "Total Views", val: totalViews.toLocaleString(), icon: <Eye size={14} className="text-blue-500" /> },
          { label: "Cash Earned", val: `$${paidEarnings.toFixed(2)}`, icon: <CreditCard size={14} className="text-emerald-500" /> },
          { label: "Bonus Earned", val: "$0.00", icon: <Award size={14} className="text-amber-500" /> },
          { label: "Estimated Cash", val: `$${pendingEarnings.toFixed(2)}`, icon: <TrendingUp size={14} className="text-teal-500" /> },
          { label: "Estimated Bonus", val: "$0.00", icon: <Sparkles size={14} className="text-pink-500" /> }
        ].map((c, idx) => (
          <div key={idx} className="bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2 border-b border-neutral-50 pb-2 mb-2">
              <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400 leading-none">{c.label}</span>
              {c.icon}
            </div>
            <p className="text-sm font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{c.val}</p>
          </div>
        ))}
      </div>

      {/* ── SUBMISSION STATUS TABS ── */}
      <div className="flex border-b border-neutral-200">
        {(["ALL", "PENDING", "VERIFIED", "REJECTED", "PAID"] as const).map(tab => {
          const count = tab === "ALL" ? submissions.length : submissions.filter(s => s.status === tab).length;
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-extrabold border-b-2 transition-all cursor-pointer ${
                isActive 
                  ? "border-black text-black" 
                  : "border-transparent text-neutral-450 hover:text-black"
              }`}
            >
              {tab} <span className="ml-1 text-[9px] font-bold text-neutral-400 bg-neutral-100 px-1.5 py-0.5 rounded-full">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── SUBMISSIONS LIST GRID ── */}
      {filteredSubmissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSubmissions.map((sub) => {
            const isPending = sub.status === "PENDING";
            const isVerified = sub.status === "VERIFIED";
            const isRejected = sub.status === "REJECTED";
            const isPaid = sub.status === "PAID";

            return (
              <div 
                key={sub.id}
                className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between text-left relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 border-b border-neutral-50 pb-3">
                    <span className="text-[10px] font-bold text-neutral-400">{sub.date}</span>
                    <span className={`text-[9px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${
                      isPending ? "bg-amber-50 text-amber-600 border-amber-200" :
                      isVerified ? "bg-emerald-50 text-emerald-600 border-emerald-250" :
                      isPaid ? "bg-purple-50 text-purple-600 border-purple-200" :
                      "bg-red-50 text-red-650 border-red-200"
                    }`}>
                      {sub.status}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-black tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    {sub.campaignTitle}
                  </h3>
                  
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-semibold mt-1.5">
                    <Link2 size={12} className="text-neutral-400" />
                    <a href={sub.url} target="_blank" rel="noreferrer" className="hover:underline hover:text-black truncate max-w-xs">{sub.url}</a>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5 pt-3 border-t border-neutral-50 text-[10px] text-neutral-400 font-bold">
                    <div className="flex items-center gap-2">
                      <Eye size={13} className="text-blue-500" />
                      <div>
                        <p className="leading-none text-[8px] uppercase tracking-wider text-neutral-400">Views tracked</p>
                        <p className="text-black font-black mt-0.5">{sub.views.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CreditCard size={13} className="text-emerald-500" />
                      <div>
                        <p className="leading-none text-[8px] uppercase tracking-wider text-neutral-400">Earnings</p>
                        <p className="text-black font-black mt-0.5">${sub.earned.toFixed(2)} USD</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audit simulation button for testing */}
                {isPending && (
                  <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between gap-4 bg-[#d1f8ff]/10 p-3 rounded-2xl">
                    <span className="text-[9px] text-neutral-500 font-semibold leading-normal">
                      Verify this sandbox link to simulate campaign audit views & winnings.
                    </span>
                    <button
                      onClick={() => handleSimulateAudit(sub.id)}
                      className="px-3.5 py-1.5 bg-black hover:bg-[#d1f8ff] text-white hover:text-black text-[10px] font-black rounded-lg transition-all flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-xs"
                    >
                      <Sparkles size={11} /> Approve Audit
                    </button>
                  </div>
                )}

                {isRejected && (
                  <div className="mt-4 p-2.5 rounded-xl bg-red-50 border border-red-100 flex items-start gap-2">
                    <ShieldAlert size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                    <p className="text-[9px] text-red-600 leading-normal font-semibold">Video hooks must clearly show branding items. Avoid duplicate clips.</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white border border-neutral-200/60 rounded-3xl">
          <Inbox size={40} className="mx-auto mb-4 text-neutral-350" />
          <h3 className="text-sm font-extrabold text-black">No Submissions Found</h3>
          <p className="text-xs text-neutral-500 mt-1 font-medium">Click "Submit Video Link" above to send your video link for validation.</p>
        </div>
      )}

      {/* ── WIZARD SUBMIT MODAL ── */}
      {submitModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
          onClick={() => setSubmitModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl border border-neutral-200 w-full max-w-md p-6 space-y-6 shadow-2xl relative text-left animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Submit Clipping Link
                </h3>
                <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider mt-0.5">Wizard Step {wizardStep} of 3</p>
              </div>
              <button 
                type="button"
                onClick={() => setSubmitModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* STEP 1: CAMPAIGN & PLATFORM SELECTOR */}
            {wizardStep === 1 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">1. Target Challenge</label>
                  <div className="relative">
                    <select 
                      value={selectedCampId}
                      onChange={(e) => setSelectedCampId(parseInt(e.target.value))}
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-xs font-black text-neutral-700 focus:outline-none focus:border-black appearance-none shadow-xs"
                    >
                      {ALL_CAMPAIGN_DATA.filter(c => c.daysLeft > 0).map(c => (
                        <option key={c.id} value={c.id}>{c.title} ({c.brand})</option>
                      ))}
                    </select>
                    <ChevronDown size={12} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">2. Social Media Platform</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { name: "TikTok", icon: <Video size={13} />, style: "bg-black text-[#d1f8ff] border-black" },
                      { name: "YouTube", icon: <Youtube size={13} />, style: "bg-red-50 text-red-600 border-red-200" },
                      { name: "Instagram", icon: <Instagram size={13} />, style: "bg-pink-50 text-pink-600 border-pink-200" }
                    ].map(p => {
                      const isSelected = chosenPlatform === p.name;
                      return (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setChosenPlatform(p.name as any)}
                          className={`p-3 rounded-xl border-2 transition-all text-xs font-black flex flex-col items-center gap-1.5 cursor-pointer ${
                            isSelected ? p.style : "border-neutral-200 bg-white hover:border-black/30"
                          }`}
                        >
                          {p.icon}
                          <span>{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button 
                  onClick={() => setWizardStep(2)}
                  className="w-full btn-primary-gradient py-3.5 rounded-xl text-xs font-black shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Continue</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>
            )}

            {/* STEP 2: VIDEO URL ENTRY */}
            {wizardStep === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
                    Paste {chosenPlatform} Video URL
                  </label>
                  <div className="relative">
                    <Link2 className="absolute left-3.5 top-3.5 text-neutral-400" size={14} />
                    <input 
                      type="url" 
                      required
                      placeholder={
                        chosenPlatform === "TikTok" ? "https://tiktok.com/@gamer_ash/video/..." :
                        chosenPlatform === "YouTube" ? "https://youtube.com/shorts/..." :
                        "https://instagram.com/reel/..."
                      }
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3.5 border rounded-xl text-xs focus:outline-none bg-slate-50/20 ${
                        validationError ? "border-red-400 focus:border-red-400" : "border-neutral-200 focus:border-black"
                      }`}
                    />
                  </div>
                  {validationError ? (
                    <p className="text-[9px] text-red-500 mt-1.5 font-bold flex items-center gap-1">
                      <AlertCircle size={10} /> {validationError}
                    </p>
                  ) : (
                    <p className="text-[8px] text-neutral-450 mt-1 font-semibold pl-1">
                      Ensure your profile is public so our audit logs can fetch view stats.
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setWizardStep(1)}
                    className="flex-1 py-3.5 rounded-xl border border-neutral-200 hover:border-black text-xs font-black text-neutral-600 transition-all cursor-pointer bg-white"
                  >
                    Back
                  </button>
                  <button 
                    disabled={!videoUrl || !!validationError}
                    onClick={() => setWizardStep(3)}
                    className="flex-1 btn-primary-gradient py-3.5 rounded-xl text-xs font-black shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    Review brief
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: SUMMARY & DECLARATION */}
            {wizardStep === 3 && (
              <div className="space-y-5">
                <div className="p-4 bg-slate-50/80 border border-neutral-200 rounded-2xl space-y-2.5">
                  <h4 className="text-[10px] font-black uppercase text-neutral-400 tracking-wider">Submission Review</h4>
                  <div className="text-xs space-y-1">
                    <p className="text-black font-extrabold">{getCampaignTitle(selectedCampId)}</p>
                    <p className="text-neutral-500 font-semibold truncate">{videoUrl}</p>
                    <p className="text-neutral-500 font-semibold">Channel type: <strong className="text-black capitalize">{chosenPlatform}</strong></p>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 cursor-pointer mt-4 select-none">
                  <input 
                    type="checkbox" 
                    checked={checkedTerms}
                    onChange={(e) => setCheckedTerms(e.target.checked)}
                    className="mt-0.5 rounded border-neutral-300 focus:ring-black"
                  />
                  <span className="text-[9px] text-neutral-500 font-semibold leading-snug">
                    I declare that this is my original video link, incorporates the necessary GOC logo call-outs, and is free of view botting.
                  </span>
                </label>

                <div className="flex gap-2">
                  <button 
                    onClick={() => setWizardStep(2)}
                    className="flex-1 py-3.5 rounded-xl border border-neutral-200 hover:border-black text-xs font-black text-neutral-600 transition-all cursor-pointer bg-white"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleSubmitLink}
                    disabled={!checkedTerms}
                    className="flex-1 btn-primary-gradient py-3.5 rounded-xl text-xs font-black shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    Confirm & Submit
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
