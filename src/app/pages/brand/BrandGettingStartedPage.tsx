import { Play, CheckCircle, BarChart2, DollarSign, ArrowRight, TrendingUp, Search, Handshake } from "lucide-react";
import imgCreate from "../../../assets/images/create_campaign.png";
import imgSubmit from "../../../assets/images/creators_submit.png";
import imgReview from "../../../assets/images/review_submissions.png";
import imgDistribute from "../../../assets/images/distribute_payouts.png";

export default function BrandGettingStartedPage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-12 animate-fade-in font-sans pb-20">
      
      {/* Header & Video */}
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-black">
            Getting Started with Game Of Creators
          </h1>
          <p className="text-sm text-neutral-500 font-medium mt-2">Learn how to create engaging campaigns for your brand</p>
        </div>
        
        {/* Video Placeholder */}
        <div className="w-full aspect-video bg-neutral-900 rounded-3xl overflow-hidden relative shadow-[0_4px_16px_rgba(0,0,0,0.05)] border border-black/10 flex flex-col group cursor-pointer">
           <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80" 
            alt="Video Thumbnail" 
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity grayscale"
          />
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white font-bold text-xs">G</div>
            <span className="text-white text-xs font-bold">Oleo Chasing Influencers. Let Creators Compete for Your Brand</span>
          </div>
          <div className="flex-1 flex items-center justify-center relative z-10">
             <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black shadow-lg transition-transform group-hover:scale-110">
               <Play size={32} fill="currentColor" />
             </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded text-white text-[10px] font-bold z-10 border border-white/10">
            Watch on YouTube
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-black">Welcome to Game Of Creators</h2>
        <p className="text-sm text-neutral-700 font-bold">Game Of Creators connects brands with talented creators to build engaging video campaigns.</p>
        <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">LAUNCH CAMPAIGNS, GET HIGH QUALITY, AND REACH YOUR AUDIENCE. IT'S REALLY THAT SIMPLE.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-neutral-100 text-black rounded-full flex items-center justify-center mb-4 border border-black/5">
              <CheckCircle size={24} />
            </div>
            <h4 className="font-bold text-black text-sm mb-2">All Platforms</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">Run campaigns on Instagram, TikTok, YouTube, or all platforms at once.</p>
          </div>
          <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-neutral-100 text-black rounded-full flex items-center justify-center mb-4 border border-black/5">
              <BarChart2 size={24} />
            </div>
            <h4 className="font-bold text-black text-sm mb-2">Performance Analytics</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">Track views, engagement, and ROI in real-time across your campaigns.</p>
          </div>
          <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-6 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-neutral-100 text-black rounded-full flex items-center justify-center mb-4 border border-black/5">
              <DollarSign size={24} />
            </div>
            <h4 className="font-bold text-black text-sm mb-2">Instant Payouts</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">Automate creator payouts based on predefined milestones & performance.</p>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="space-y-8 bg-white rounded-3xl p-8 border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
        <h3 className="text-center font-bold text-black text-lg">How It Works</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center flex flex-col items-center relative">
            <div className="w-8 h-8 rounded-full bg-black text-white font-black flex items-center justify-center mb-4 z-10 border-4 border-white shadow-sm">1</div>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm border border-neutral-100 relative group bg-neutral-50">
               <img src={imgCreate} alt="Create Campaign" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="font-bold text-black text-sm mb-2">Create Campaign</h4>
            <p className="text-xs text-neutral-500">Set your budget, requirements, platform, and payout structure.</p>
          </div>
          <div className="text-center flex flex-col items-center relative">
            <div className="w-8 h-8 rounded-full bg-black text-white font-black flex items-center justify-center mb-4 z-10 border-4 border-white shadow-sm">2</div>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm border border-neutral-100 relative group bg-neutral-50">
               <img src={imgSubmit} alt="Creators Submit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="font-bold text-black text-sm mb-2">Creators Submit</h4>
            <p className="text-xs text-neutral-500">Creators create and submit video content linked to your brand.</p>
          </div>
          <div className="text-center flex flex-col items-center relative">
            <div className="w-8 h-8 rounded-full bg-black text-white font-black flex items-center justify-center mb-4 z-10 border-4 border-white shadow-sm">3</div>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm border border-neutral-100 relative group bg-neutral-50">
               <img src={imgReview} alt="Review Submissions" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="font-bold text-black text-sm mb-2">Review Submissions</h4>
            <p className="text-xs text-neutral-500">Verify content meets guidelines before they post on their channels.</p>
          </div>
          <div className="text-center flex flex-col items-center relative">
            <div className="w-8 h-8 rounded-full bg-black text-white font-black flex items-center justify-center mb-4 z-10 border-4 border-white shadow-sm">4</div>
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-sm border border-neutral-100 relative group bg-neutral-50">
               <img src={imgDistribute} alt="Distribute Payouts" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <h4 className="font-bold text-black text-sm mb-2">Distribute</h4>
            <p className="text-xs text-neutral-500">Payouts are distributed automatically based on content performance.</p>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button className="bg-black hover:bg-neutral-800 text-white px-8 py-3 rounded-full text-sm font-bold transition-colors shadow-sm">
            BOOK YOUR CALL NOW
          </button>
        </div>
      </div>

    </div>
  );
}
