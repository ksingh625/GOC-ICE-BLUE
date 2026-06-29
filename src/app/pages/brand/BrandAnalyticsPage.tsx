import { Filter, Users, Eye, DollarSign, BarChart2, Video, Settings, ChevronDown, CheckCircle, Clock, XCircle, Search } from "lucide-react";

export default function BrandAnalyticsPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-6 animate-fade-in font-sans">
      
      {/* Filters Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)]">
        <div className="space-y-3 flex-1 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
          <p className="text-sm font-bold text-black mb-1">Filter by Submission Status</p>
          <div className="flex gap-2 min-w-max">
            <button className="bg-black text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm">
              <Users size={14} />
              All Submissions
            </button>
            <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
              <CheckCircle size={14} />
              Verified
            </button>
            <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
              <DollarSign size={14} />
              Paid
            </button>
            <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
              <Clock size={14} />
              Pending
            </button>
            <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
              Not Rejected
            </button>
            <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
              <XCircle size={14} />
              Rejected
            </button>
            <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
              <CheckCircle size={14} />
              Verified + Paid
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start lg:self-end pt-2">
          <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-colors">
            <Video size={14} />
            Video (YouTube, Instagram, TikTok)
            <ChevronDown size={14} />
          </button>
          <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-colors">
            All Campaign Typ...
            <ChevronDown size={14} />
          </button>
          <button className="bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-colors">
            <Settings size={14} />
            Customize Tiles
          </button>
        </div>
      </div>

      {/* KPI Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Total Campaigns</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">0</h3>
            <p className="text-xs text-neutral-500 font-medium">All submissions</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <BarChart2 size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Total Submissions</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">0</h3>
            <p className="text-xs text-neutral-500 font-medium">All submissions</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <Users size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Total Views</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">0</h3>
            <p className="text-xs text-neutral-500 font-medium">All submissions</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <Eye size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-600 mb-1">Total Spent</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">$0.00</h3>
            <p className="text-xs text-neutral-500 font-medium">All submissions</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <DollarSign size={18} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-neutral-100/80 rounded-full p-1.5 flex overflow-x-auto hide-scrollbar border border-black/5">
        <button className="flex-1 min-w-[120px] bg-white text-black shadow-sm rounded-full py-2.5 text-sm font-bold transition-all text-center">
          Overview
        </button>
        <button className="flex-1 min-w-[120px] text-neutral-500 hover:text-black hover:bg-neutral-200/50 rounded-full py-2.5 text-sm font-bold transition-all text-center">
          Detailed Analytics
        </button>
        <button className="flex-1 min-w-[120px] text-neutral-500 hover:text-black hover:bg-neutral-200/50 rounded-full py-2.5 text-sm font-bold transition-all text-center">
          Campaigns
        </button>
        <button className="flex-1 min-w-[120px] text-neutral-500 hover:text-black hover:bg-neutral-200/50 rounded-full py-2.5 text-sm font-bold transition-all text-center">
          Creators
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        
        {/* Platform Performance */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-6 border-b border-black/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-black">Platform Performance</h3>
          </div>
          <div className="flex-1 p-6">
            <div className="w-full h-full bg-neutral-50 rounded-3xl flex items-center justify-center border border-neutral-200 border-dashed">
              <p className="text-sm font-medium text-neutral-400">Not enough data to display platform performance</p>
            </div>
          </div>
        </div>

        {/* Campaign Type Performance */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col min-h-[400px]">
          <div className="p-6 border-b border-black/5 flex justify-between items-center">
            <h3 className="text-lg font-bold text-black">Campaign Type Performance</h3>
          </div>
          <div className="flex-1 p-6">
            <div className="w-full h-full bg-neutral-50 rounded-3xl flex items-center justify-center border border-neutral-200 border-dashed">
              <p className="text-sm font-medium text-neutral-400">Not enough data to display campaign type performance</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
