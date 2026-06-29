import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import GOCLogo from "../../imports/GOC-Logo.png";
import confetti from "canvas-confetti";
import { 
  Building2, Globe, Target, DollarSign, ArrowRight, ArrowLeft, Check, Sparkles
} from "lucide-react";

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [niche, setNiche] = useState("Lifestyle");
  const [budget, setBudget] = useState(1000);
  const [briefTitle, setBriefTitle] = useState("");
  const [briefDesc, setBriefDesc] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete sign up and launch
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-black flex flex-col justify-between">
      
      {/* HEADER */}
      <nav className="border-b border-neutral-200/60 bg-white px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img src={GOCLogo} alt="Game of Creators" className="h-8 w-auto filter brightness-0" />
        </Link>
        <span className="text-xs font-bold text-black/50">Campaign Setup Wizard</span>
      </nav>

      {/* BODY CONTENT */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-6 grid md:grid-cols-5 gap-12 items-start py-12">
        
        {/* Left Side: Wizard Form */}
        <div className="md:col-span-3 bg-white rounded-3xl border border-neutral-200/70 p-8 shadow-sm">
          {step < 4 && (
            <div className="flex items-center gap-1.5 mb-8">
              {[1, 2, 3].map((num) => (
                <div key={num} className="flex items-center gap-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    step >= num ? "bg-black text-white" : "bg-neutral-100 text-neutral-400 border border-neutral-200"
                  }`}>
                    {num}
                  </div>
                  {num < 3 && <div className={`w-12 h-0.5 rounded ${step > num ? "bg-black" : "bg-neutral-200"}`} />}
                </div>
              ))}
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-2xl font-black mb-1">Tell us about your brand</h2>
              <p className="text-xs text-neutral-500 mb-6">Let's set up your brand profile to attract creator partners.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5">Brand / Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-3.5 text-neutral-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="e.g. Lumina Cosmetics"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5">Website URL</label>
                  <div className="relative">
                    <Globe className="absolute left-3.5 top-3.5 text-neutral-400" size={16} />
                    <input 
                      type="text" 
                      placeholder="e.g. https://lumina.com"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-black mb-1">Create Contest Brief Draft</h2>
              <p className="text-xs text-neutral-500 mb-6">Define the instructions and theme of your game contest.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5">Brief Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Unboxing & Glow-up TikTok Challenge"
                    value={briefTitle}
                    onChange={(e) => setBriefTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5">Niche Focus</label>
                  <select 
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-neutral-200 text-sm bg-white focus:outline-none focus:border-black transition-colors"
                  >
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Beauty">Beauty / Cosmetics</option>
                    <option value="Tech">Tech / Gadgets</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Food & Drink">Food & Drink</option>
                    <option value="Fitness">Fitness / Health</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5">Contest Details / Rules</label>
                  <textarea 
                    placeholder="Describe what creators should show in the video (e.g. 'Must show unboxing, try on product, and state 3 unique benefits. Keep under 30 seconds.')"
                    value={briefDesc}
                    onChange={(e) => setBriefDesc(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-full border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-black mb-1">Set Your Contest Prize Budget</h2>
              <p className="text-xs text-neutral-500 mb-6">Choose how much you want to distribute to the top creators.</p>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-3">Prize Budget ($USD)</label>
                <div className="flex items-center gap-4 bg-neutral-50 border border-neutral-200 p-6 rounded-3xl mb-6">
                  <DollarSign size={24} className="text-neutral-500" />
                  <span className="text-3xl font-black">{budget.toLocaleString()}</span>
                </div>

                <input 
                  type="range" 
                  min="500" 
                  max="10000" 
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full accent-black mb-6"
                />

                <div className="bg-purple-50 border border-purple-200/50 p-4 rounded-3xl text-xs text-purple-950 font-medium">
                  <strong>Estimated Reach:</strong> With a budget of ${budget.toLocaleString()}, we expect about {(budget / 50).toFixed(0)} to {(budget / 20).toFixed(0)} high-quality video submissions from creators.
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-6">
                <Check size={28} />
              </div>
              <h2 className="text-3xl font-black mb-3">Your campaign is live!</h2>
              <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-8 leading-relaxed">
                Congratulations! Your contest draft <strong>{briefTitle || "UGC Video Challenge"}</strong> has been created. Our team will review the details and start matching creators shortly.
              </p>
              <button 
                onClick={() => navigate("/campaigns")}
                className="btn-primary-gradient px-8 py-3 rounded-full text-xs"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {step < 4 && (
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-neutral-100">
              <button 
                onClick={handleBack}
                disabled={step === 1}
                className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-black transition-colors cursor-pointer disabled:opacity-40"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button 
                onClick={handleNext}
                disabled={step === 1 && !brandName}
                className="btn-primary-gradient px-6 py-2.5 rounded-full text-xs flex items-center gap-1.5"
              >
                {step === 3 ? "Launch Campaign" : "Next Step"}
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Live Card Preview */}
        <div className="md:col-span-2 space-y-6">
          <p className="text-xs font-extrabold uppercase tracking-widest text-neutral-400">Live Card Preview</p>
          
          <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-lg relative overflow-hidden text-left">
            {/* Visual Cover mockup */}
            <div className="aspect-[16/10] bg-neutral-900 rounded-3xl flex flex-col justify-between p-4 relative mb-4 overflow-hidden">
              {/* Background gradient mask */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              
              {/* Brand logo pill */}
              <div className="relative z-10 inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded-full text-white">
                <div className="w-4 h-4 rounded bg-purple-500 flex items-center justify-center text-[8px] font-black text-white">
                  {brandName ? brandName.charAt(0).toUpperCase() : "G"}
                </div>
                <span className="text-[10px] font-bold truncate max-w-[80px]">{brandName || "My Brand"}</span>
              </div>

              {/* Tag and Payout Info */}
              <div className="relative z-10 flex items-center justify-between text-white">
                <span className="text-[8px] font-black uppercase tracking-wider bg-purple-500/25 border border-purple-500/40 px-2 py-0.5 rounded-full">
                  {niche}
                </span>
                <span className="text-xs font-black">
                  Prize: ${budget.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Info details */}
            <h3 className="text-sm font-extrabold mb-1.5 text-black truncate">
              {briefTitle || "My Contest Brief Title"}
            </h3>
            <p className="text-[11px] text-neutral-500 leading-relaxed line-clamp-3 mb-4">
              {briefDesc || "Describe your UGC video guidelines. These instructions will be displayed to creators competing in the contest."}
            </p>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[10px] text-neutral-400">
              <span>0 creators joined</span>
              <span className="font-bold text-black bg-[#d1f8ff] px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
