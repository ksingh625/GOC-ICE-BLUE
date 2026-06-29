import { Plus, PhoneCall, Search, LayoutGrid, List, ChevronDown } from "lucide-react";
import { Link } from "react-router";

export default function BrandCampaignsPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-black">
            My Campaigns
          </h1>
          <p className="text-sm text-neutral-500 font-medium mt-1">Create, review, and manage your campaigns in one place.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
            <PhoneCall size={16} className="text-neutral-500" />
            Book a Call with Founder
          </button>
          <Link to="/brand/campaigns/create" className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={16} />
            Create Campaign
          </Link>
        </div>
      </div>
      {/* Search & Filters */}
      <div className="space-y-4">
        {/* Top Row: Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-black/10 rounded-full text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all shadow-sm"
          />
        </div>

        {/* Second Row: Format Toggles & View Toggles */}
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex items-center p-1 bg-neutral-100 rounded-full border border-black/5 shadow-inner w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2 bg-black text-white rounded-full text-sm font-bold shadow-sm">All</button>
            <button className="flex-1 md:flex-none px-6 py-2 text-neutral-500 hover:text-black rounded-full text-sm font-bold transition-colors">Text & Image</button>
            <button className="flex-1 md:flex-none px-6 py-2 text-neutral-500 hover:text-black rounded-full text-sm font-bold transition-colors">Video</button>
          </div>

          <div className="flex items-center p-1 bg-neutral-100 rounded-full border border-black/5 shadow-inner w-full md:w-auto">
            <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2 bg-black text-white rounded-full text-sm font-bold shadow-sm">
              <LayoutGrid size={16} /> Grid
            </button>
            <button className="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2 text-neutral-500 hover:text-black rounded-full text-sm font-bold transition-colors">
              <List size={16} /> List
            </button>
          </div>
        </div>

        {/* Third Row: Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-black/10 rounded-full px-5 py-2.5 text-sm font-bold text-black focus:outline-none focus:border-black cursor-pointer shadow-sm">
              <option>Date Created: Latest</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
          </div>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-black/10 rounded-full px-5 py-2.5 text-sm font-bold text-black focus:outline-none focus:border-black cursor-pointer shadow-sm">
              <option>All Platforms</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
          </div>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-black/10 rounded-full px-5 py-2.5 text-sm font-bold text-black focus:outline-none focus:border-black cursor-pointer shadow-sm">
              <option>All Types</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
          </div>
        </div>

        {/* Fourth Row: State Badges */}
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-black/10 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
            All <span className="bg-white text-black px-1.5 py-0.5 rounded-full shadow-sm">1</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-black/10 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
            Draft <span className="bg-white text-black px-1.5 py-0.5 rounded-full shadow-sm">1</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-black/10 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
            Pending approval <span className="bg-white text-black px-1.5 py-0.5 rounded-full shadow-sm">0</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-black/10 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
            Ready <span className="bg-white text-black px-1.5 py-0.5 rounded-full shadow-sm">0</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-black/10 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
            Upcoming <span className="bg-white text-black px-1.5 py-0.5 rounded-full shadow-sm">0</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-black text-white rounded-full text-xs font-bold shadow-sm">
            Live <span className="bg-white text-black px-1.5 py-0.5 rounded-full shadow-sm">0</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-black/10 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
            Ended <span className="bg-white text-black px-1.5 py-0.5 rounded-full shadow-sm">0</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-neutral-100 border border-black/10 rounded-full text-xs font-bold text-neutral-600 hover:bg-neutral-200 transition-colors">
            Rejected <span className="bg-white text-black px-1.5 py-0.5 rounded-full shadow-sm">0</span>
          </button>
        </div>
      </div>

      {/* Empty State / No Campaigns Found */}
      <div className="py-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold text-black mb-2 font-heading">No Campaigns Found</h2>
        <p className="text-neutral-500 text-sm font-medium">No contests found for Live.</p>
      </div>
      {/* Campaign Types Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Leaderboard Campaign */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          {/* Image Placeholder */}
          <div className="w-full h-64 bg-neutral-100 flex items-center justify-center p-6 relative border-b border-black/5">
            <div className="relative z-10 w-full max-w-sm bg-white border border-black/10 rounded-3xl p-6 shadow-xl">
              <h3 className="text-black text-center font-black tracking-widest uppercase text-sm mb-4">LEADERBOARD</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-black border-b border-black/5 pb-2">
                  <div className="flex items-center gap-4"><span className="text-2xl font-black text-black">1</span><span className="font-bold">ALEX CHEN</span></div>
                  <span className="text-xl font-bold">$50</span>
                </div>
                <div className="flex items-center justify-between text-neutral-600 border-b border-black/5 pb-2">
                  <div className="flex items-center gap-4"><span className="text-xl font-black text-neutral-400">2</span><span className="font-bold">DAVID KIM</span></div>
                  <span className="text-lg font-bold">$30</span>
                </div>
                <div className="flex items-center justify-between text-neutral-400">
                  <div className="flex items-center gap-4"><span className="text-lg font-black text-neutral-300">3</span><span className="font-bold">JEFF BEZOS</span></div>
                  <span className="text-base font-bold">$20</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-black mb-2">Leaderboard Campaign</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium mb-6">
              A Leaderboard Campaign is a performance-based campaign where creators compete to deliver the highest number of <strong className="text-black">organic views</strong> for your brand's content. Creators are ranked on a live leaderboard, and top performers win prize money.
            </p>
            
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Create Your Contest</h4>
                  <p className="text-xs text-neutral-500 mt-1">Set your brief, start & end dates, select the platform where creators should post, set the prize pool distribution according to each winning position.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Creators Participate</h4>
                  <p className="text-xs text-neutral-500 mt-1">Creators produce original content based on the campaign requirements and publish it on the selected social media platforms within the campaign duration.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Reward Top Performers</h4>
                  <p className="text-xs text-neutral-500 mt-1">Once the campaign ends, rankings are finalized and payouts are made to creators based on their leaderboard position.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-auto">
              <button className="w-full bg-black hover:bg-neutral-800 text-white py-3 rounded-full text-sm font-bold transition-colors">
                Create Leaderboard Campaign
              </button>
              <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <PhoneCall size={14} className="text-neutral-500" />
                Need Help? Book a Call with Founder
              </button>
            </div>
          </div>
        </div>

        {/* CPM Campaign */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          {/* Image Placeholder */}
          <div className="w-full h-64 bg-[#f8f9fa] flex items-center justify-center p-6 relative border-b border-black/5">
            <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
              <div className="bg-white rounded-3xl p-4 border border-black/5 shadow-xl rotate-[-2deg] mb-[-20px] ml-[-40px] z-10 w-48">
                <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 bg-neutral-300 rounded-full" /><div className="h-2 w-16 bg-neutral-200 rounded" /></div>
                <div className="w-full h-24 bg-neutral-100 rounded-full" />
              </div>
              <div className="bg-white rounded-3xl p-4 border border-black/5 shadow-2xl z-20 w-56 flex flex-col items-center relative">
                <div className="absolute -top-4 bg-black text-white font-black px-4 py-1.5 rounded-full text-sm shadow-md">
                  1000 views <span className="bg-white text-black px-2 py-0.5 rounded-full ml-1">$5</span>
                </div>
                <div className="flex items-center gap-2 mb-2 mt-2 w-full"><div className="w-4 h-4 bg-neutral-800 rounded-full" /><div className="h-2 w-20 bg-neutral-200 rounded" /></div>
                <div className="w-full h-32 bg-neutral-100 rounded-full" />
                <div className="absolute -bottom-4 -right-4 bg-white border border-black text-black font-black px-4 py-2 rounded-full text-xl shadow-lg rotate-12">
                  CPM
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-black mb-2">CPM Campaign</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium mb-6">
              CPM-based campaigns pay creators purely based on the number of views they generate, at a fixed rate per 1,000 views. This gives you predictable, performance-based costs and allows you to scale content efficiently.
            </p>
            
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Create Your Contest</h4>
                  <p className="text-xs text-neutral-500 mt-1">Set your brief, start and end dates, total budget, platform(s) for posting, and the <strong className="text-black">CPM rate</strong> (payment per 1,000 views).</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Creators Participate</h4>
                  <p className="text-xs text-neutral-500 mt-1">Creators produce original content based on the campaign requirements and publish it on the selected social media platforms within the campaign duration.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Views Determine Payout</h4>
                  <p className="text-xs text-neutral-500 mt-1">Payouts are calculated based on the number of views (per thousand views) each creator generates.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-auto">
              <button className="w-full bg-black hover:bg-neutral-800 text-white py-3 rounded-full text-sm font-bold transition-colors">
                Create CPM Campaign
              </button>
              <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <PhoneCall size={14} className="text-neutral-500" />
                Need Help? Book a Call with Founder
              </button>
            </div>
          </div>
        </div>

        {/* Milestone Campaign */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          {/* Image Placeholder */}
          <div className="w-full h-64 bg-neutral-900 flex items-center justify-center p-6 relative border-b border-black/5">
            <div className="relative z-10 w-full flex gap-3 justify-center items-end h-40">
              <div className="w-24 bg-black rounded-t-xl border border-neutral-800 flex flex-col items-center justify-end p-3 relative h-[60%] shadow-lg">
                <div className="absolute -top-4 bg-white text-black text-xs font-black px-2 py-1 rounded">10K <span className="font-normal text-[10px]">views</span></div>
                <div className="w-12 h-12 bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center rounded-full rotate-12 mb-2"><DollarSign size={24} /></div>
                <div className="text-white font-black text-xl">$20</div>
              </div>
              <div className="w-24 bg-black rounded-t-xl border border-neutral-800 flex flex-col items-center justify-end p-3 relative h-[80%] shadow-lg">
                <div className="absolute -top-4 bg-white text-black text-xs font-black px-2 py-1 rounded">100K <span className="font-normal text-[10px]">views</span></div>
                <div className="w-12 h-12 bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center rounded-full -rotate-6 mb-2"><DollarSign size={24} /></div>
                <div className="text-white font-black text-xl">$50</div>
              </div>
              <div className="w-24 bg-black rounded-t-xl border border-neutral-800 flex flex-col items-center justify-end p-3 relative h-[100%] shadow-lg">
                <div className="absolute -top-4 bg-white text-black text-xs font-black px-2 py-1 rounded">200K <span className="font-normal text-[10px]">views</span></div>
                <div className="w-12 h-12 bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center rounded-full rotate-6 mb-2"><DollarSign size={24} /></div>
                <div className="text-white font-black text-xl">$100</div>
              </div>
            </div>
          </div>
          
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-black mb-2">Milestone Campaign</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium mb-6">
              Milestone campaigns reward creators as they reach specific view targets. This provides guaranteed payouts for creators and guaranteed results for your brand, with full control over the maximum budget.
            </p>
            
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Define Milestones</h4>
                  <p className="text-xs text-neutral-500 mt-1">Set specific view targets (e.g., 10K, 50K, 100K) and the payout amount for each. You can also set a cap on the number of winners per milestone.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Creators Participate</h4>
                  <p className="text-xs text-neutral-500 mt-1">Creators produce and publish content. As their videos gain organic views, our system tracks their progress towards the milestones you set.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Payouts Based on Achieved Milestones</h4>
                  <p className="text-xs text-neutral-500 mt-1">When a creator reaches a milestone, the payout is calculated and credited based only the milestone they have actually achieved for that submission.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-auto">
              <button className="w-full bg-black hover:bg-neutral-800 text-white py-3 rounded-full text-sm font-bold transition-colors">
                Create Milestone Campaign
              </button>
              <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <PhoneCall size={14} className="text-neutral-500" />
                Need Help? Book a Call with Founder
              </button>
            </div>
          </div>
        </div>

        {/* Dual Rewards Campaign */}
        <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
          {/* Image Placeholder */}
          <div className="w-full h-64 bg-neutral-100 flex items-center justify-center p-6 relative gap-4 border-b border-black/5">
            <div className="relative z-10 w-1/2 h-40 bg-white rounded-3xl border border-black/10 p-2 flex items-end gap-1 justify-center pb-0 shadow-sm">
               <div className="w-8 h-12 bg-neutral-100 text-black border border-black/5 flex items-center justify-center text-xs font-bold rounded-t">$20</div>
               <div className="w-8 h-20 bg-neutral-100 text-black border border-black/5 flex items-center justify-center text-xs font-bold rounded-t">$50</div>
               <div className="w-8 h-28 bg-neutral-100 text-black border border-black/5 flex items-center justify-center text-xs font-bold rounded-t">$100</div>
            </div>
            <div className="text-black font-black text-4xl">+</div>
            <div className="relative z-10 w-1/2 h-40 bg-white rounded-3xl border border-black/10 p-2 flex flex-col items-center justify-center shadow-sm">
                <div className="bg-neutral-100 border border-black/5 rounded px-2 py-1 text-[10px] font-black text-black mb-2">1000 views <span className="text-black font-normal ml-1">$5</span></div>
                <div className="w-16 h-20 bg-neutral-50 border border-black/5 rounded flex flex-col">
                  <div className="h-4 bg-neutral-200 rounded-t" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-black text-white text-[10px] font-black px-2 py-1 rounded shadow-lg rotate-12">CPM</div>
            </div>
          </div>
          
          <div className="p-8 flex-1 flex flex-col">
            <h3 className="text-lg font-bold text-black mb-2">Dual Rewards Campaign</h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-medium mb-6">
              Dual Rewards combines both payout models in one campaign: creators earn milestone-based rewards for hitting view targets and CPM-based rewards from ongoing performance, all under a unified budget pool.
            </p>
            
            <div className="space-y-4 mb-8 flex-1">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Configure Combined Rewards</h4>
                  <p className="text-xs text-neutral-500 mt-1">Define milestone tiers and set the CPM rate in the same contest setup so both reward tracks run together.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Creators Publish and Grow</h4>
                  <p className="text-xs text-neutral-500 mt-1">Creators submit content and continue building organic views. Their progress contributes to both milestone eligibility and CPM-based earnings.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-neutral-100 text-black border border-black/10 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                <div>
                  <h4 className="text-sm font-bold text-black">Reward Through Both Paths</h4>
                  <p className="text-xs text-neutral-500 mt-1">Payouts are calculated from achieved milestones and view-based CPM performance, giving creators a blended earning model in one campaign.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mt-auto">
              <button className="w-full bg-black hover:bg-neutral-800 text-white py-3 rounded-full text-sm font-bold transition-colors">
                Create Dual Rewards Campaign
              </button>
              <button className="w-full bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors">
                <PhoneCall size={14} className="text-neutral-500" />
                Need Help? Book a Call with Founder
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
