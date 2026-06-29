import { Plus, Gift, DollarSign, Trophy, Eye, Coins, HelpCircle } from "lucide-react";
import { Link } from "react-router";

export default function BrandDashboardPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-black">
          Dashboard
        </h1>
        <div className="flex items-center gap-3">
          <button className="bg-white border-black/5 hover:bg-neutral-50 text-neutral-700 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
            <Gift size={16} />
            Refer & earn 30% commission
          </button>
          <button className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={16} />
            Create Campaign
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spent */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Total Spent</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">$0.00</h3>
            <p className="text-sm text-neutral-600 font-medium mt-1 mt-1">Money spent on campaigns</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <DollarSign size={18} />
          </div>
        </div>

        {/* Total Campaigns */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Total Campaigns</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">0</h3>
            <p className="text-sm text-neutral-600 font-medium mt-1 mt-1">Campaigns created</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <Trophy size={18} />
          </div>
        </div>

        {/* Total Views */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Total Views</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">0</h3>
            <p className="text-sm text-neutral-600 font-medium mt-1 mt-1">Views on campaign content</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <Eye size={18} />
          </div>
        </div>

        {/* Available Coins */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Available Coins</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">100</h3>
            <p className="text-sm text-neutral-600 font-medium mt-1 mt-1">Coins to redeem or use</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#d1f8ff]/50 flex items-center justify-center text-emerald-700 border border-emerald-100">
            <Coins size={18} />
          </div>
        </div>
      </div>

      {/* Onboarding Banner */}
      <div className="bg-white rounded-3xl bg-neutral-50 rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-black shrink-0 mt-1 sm:mt-0">
            <HelpCircle size={20} />
          </div>
          <div>
            <h4 className="font-bold text-black text-base">New to Game Of Creators?</h4>
            <p className="text-base text-neutral-600 font-medium mt-0.5">Learn about our two campaign types: Leaderboard and CPM campaigns</p>
          </div>
        </div>
        <Link to="/brand/getting-started" className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap text-center">
          Get Started
        </Link>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Activity */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[300px]">
          <div className="p-6 md:p-8 border-b border-neutral-100">
            <h3 className="text-lg font-bold text-black">Recent Activity</h3>
            <p className="text-sm text-neutral-600 font-medium mt-1">Your recent campaigns</p>
          </div>
          <div className="flex-1 flex items-center justify-center p-8 bg-neutral-50/50">
            <p className="text-sm text-neutral-400 font-medium text-center">No campaigns created yet</p>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[300px]">
          <div className="p-6 md:p-8 border-b border-neutral-100">
            <h3 className="text-lg font-bold text-black">Analytics Overview</h3>
            <p className="text-sm text-neutral-600 font-medium mt-1">Performance insights for your campaigns</p>
          </div>
          <div className="flex-1 p-6">
            <div className="w-full h-full bg-neutral-50/50 rounded-3xl flex items-center justify-center border border-black/5 border-dashed">
              <p className="text-sm font-bold text-neutral-400">Detailed analytics available soon</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
