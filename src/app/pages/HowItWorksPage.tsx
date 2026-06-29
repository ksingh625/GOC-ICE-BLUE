import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Nav, Footer } from "../App";
import { 
  Trophy, Target, ArrowRight, 
  Camera, Award, BarChart3
} from "lucide-react";

export default function HowItWorksPage() {
  const [tab, setTab] = useState<"brands" | "creators">("brands");
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  const brandSteps = [
    {
      title: "1. Create Your Challenge Brief",
      desc: "Define your campaign targets, details, rules, and licensing specs. Upload assets or guidelines using our user-friendly brief creator tool in under 15 minutes.",
      metric: "Brief Complete",
      stat: "15 mins",
      icon: <Target size={20} className="text-[#a855f7]" />
    },
    {
      title: "2. Lock in Your Payout Prize Pool",
      desc: "Select a custom budget and establish payout rankings (e.g. 1st place, top 10, top 25). Escrowed funds ensure that creators know you have locked in actual rewards.",
      metric: "Guaranteed Payouts",
      stat: "$1k - $50k",
      icon: <Award size={20} className="text-[#f97316]" />
    },
    {
      title: "3. Creators Compete & Submit Video UGC",
      desc: "Creators upload high-quality videos based on your guidelines. Verified analytics track organic performance, views, ER, and overall community response.",
      metric: "Live Video Entries",
      stat: "30+ per contest",
      icon: <Camera size={20} className="text-[#22c55e]" />
    },
    {
      title: "4. License Winning Content & Scale",
      desc: "Select the winning submissions, automatically license the intellectual property rights, and sync directly with Meta or TikTok Ads Managers to fuel your advertising.",
      metric: "IP Transfer Complete",
      stat: "1-Click Sync",
      icon: <Trophy size={20} className="text-[#eab308]" />
    }
  ];

  const creatorSteps = [
    {
      title: "1. Discover Active Brand Briefs",
      desc: "Explore a variety of brand contests. Filter by product type, niches, payout scale, and platforms. Select briefs that fit your content creation style.",
      metric: "Contests Available",
      stat: "100+ active",
      icon: <Target size={20} className="text-[#a855f7]" />
    },
    {
      title: "2. Film, Polish, and Upload Your Entry",
      desc: "Use your creativity to draft a compelling video. Upload the file to GOC to verify guidelines compliance. No follower minimums needed to start.",
      metric: "Quality Checked",
      stat: "Free to enter",
      icon: <Camera size={20} className="text-[#f97316]" />
    },
    {
      title: "3. Track Your Live Standings on Leaderboards",
      desc: "Your video generates scores based on organic views and engagements. Track your placement on the live dashboard updates as the competition proceeds.",
      metric: "Position Verified",
      stat: "Real-time updates",
      icon: <BarChart3 size={20} className="text-[#22c55e]" />
    },
    {
      title: "4. Claim Cash & License Your Assets",
      desc: "If your entry places in the winning tiers, GOC automatically transfers funds to your wallet. You retain full copyright ownership of unselected submissions.",
      metric: "Earnings Payout",
      stat: "Stripe transfer",
      icon: <Trophy size={20} className="text-[#eab308]" />
    }
  ];

  const currentSteps = tab === "brands" ? brandSteps : creatorSteps;

  return (
    <div className="min-h-screen bg-white text-black">
      
      <Nav solid={true} />

      {/* HERO */}
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-[#f0fafd] to-white relative">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#d1f8ff] text-black border border-black/5 mb-6">
            Gamified Marketing Workflow
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            How Game Of Creators Works
          </h1>
          <p className="text-base md:text-lg text-black/60 max-w-xl mx-auto mb-10 font-medium">
            The world's first contest-powered system where brands set targets, creators compete, and only winning content is licensed.
          </p>

          {/* Tab Selector */}
          <div className="inline-flex p-1.5 rounded-full border border-black/10 bg-white shadow-md">
            <button 
              onClick={() => { setTab("brands"); setActiveStep(0); }}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                tab === "brands" ? "bg-black text-white" : "text-black/60 hover:text-black"
              }`}
            >
              For Brands
            </button>
            <button 
              onClick={() => { setTab("creators"); setActiveStep(0); }}
              className={`px-6 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                tab === "creators" ? "bg-black text-white" : "text-black/60 hover:text-black"
              }`}
            >
              For Creators
            </button>
          </div>
        </div>
      </section>

      {/* STEPS GRID CONTENT */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Step Cards Selection */}
          <div className="space-y-4">
            {currentSteps.map((step, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-6 rounded-3xl border text-left cursor-pointer transition-all duration-300 ${
                  activeStep === idx 
                    ? "bg-[#d1f8ff]/40 border-black shadow-lg" 
                    : "bg-white border-neutral-100 hover:border-black/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 rounded-3xl bg-white border border-neutral-100 flex-shrink-0">
                    {step.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-black">
                    {step.title}
                  </h3>
                </div>
                <p className="text-xs text-black/60 leading-relaxed font-medium pl-12">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Right: Visualization Panel */}
          <div className="p-8 rounded-3xl border border-black/10 bg-[#fafafa] shadow-2xl flex flex-col justify-between min-h-[420px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#d1f8ff]/30 rounded-full filter blur-[50px] pointer-events-none" />

            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#a855f7] bg-white border border-[#a855f7]/20 px-2.5 py-1 rounded-full">
                  Step {activeStep + 1}
                </span>
                <span className="text-xs font-black text-black/40">Status: Active</span>
              </div>

              <h2 className="text-2xl font-black text-black mb-4">
                {currentSteps[activeStep].title}
              </h2>
              <p className="text-sm text-black/70 leading-relaxed font-medium mb-8">
                {currentSteps[activeStep].desc}
              </p>
            </div>

            {/* Custom Metric Card */}
            <div className="p-4 rounded-3xl bg-white border border-black/5 flex items-center justify-between relative z-10 shadow-sm">
              <div>
                <p className="text-[10px] font-bold text-black/40 uppercase tracking-wider">{currentSteps[activeStep].metric}</p>
                <p className="text-lg font-black text-black mt-0.5">{currentSteps[activeStep].stat}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold text-xs border border-emerald-500/20">
                ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-gradient-to-b from-[#f0fafd] to-white border border-black/8">
          <h2 className="text-3xl font-black mb-4">
            Ready to get started?
          </h2>
          <p className="text-sm text-black/60 mb-8 max-w-md mx-auto">
            Join hundreds of brands already running high-performance UGC campaigns on Game of Creators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/get-started")}
              className="btn-primary-gradient px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 justify-center"
            >
              Launch a Campaign <ArrowRight size={15} />
            </button>
            <button
              onClick={() => navigate("/book-demo")}
              className="btn-secondary-dark px-8 py-3 rounded-full text-sm font-bold"
            >
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      <Footer />

    </div>
  );
}
