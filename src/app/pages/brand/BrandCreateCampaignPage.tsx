import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Upload, Info, Image, Video, Check, ChevronDown, Crown } from "lucide-react";

export default function BrandCreateCampaignPage() {
  const [step, setStep] = useState(1);
  const [campaignFormat, setCampaignFormat] = useState("video");
  const [campaignType, setCampaignType] = useState("leaderboard");

  const steps = [
    { id: 1, name: "Get Started", desc: "Basic information" },
    { id: 2, name: "Create Brief", desc: "Project details" },
    { id: 3, name: "Resources", desc: "Assets & links" },
    { id: 4, name: "Prize", desc: "Rewards & timeline" },
  ];

  const renderStep1 = () => (
    <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-6 md:p-8 animate-fade-in font-sans">
      <h2 className="text-xl font-bold text-black mb-6 font-heading">Customize your Contest</h2>
      
      <div className="space-y-6">
        {/* Campaign Format */}
        <div>
          <h3 className="text-sm font-bold text-black mb-3">Campaign Format</h3>
          <div className="flex bg-neutral-100 p-1 rounded-full border border-black/5 shadow-inner">
            <button 
              onClick={() => setCampaignFormat("text")}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${campaignFormat === "text" ? "bg-black text-white shadow-sm" : "text-neutral-500 hover:text-black"}`}
            >
              Text / Image Campaign
            </button>
            <button 
              onClick={() => setCampaignFormat("video")}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${campaignFormat === "video" ? "bg-black text-white shadow-sm" : "text-neutral-500 hover:text-black"}`}
            >
              Video Campaign
            </button>
          </div>
        </div>

        {/* Campaign Type */}
        <div>
          <h3 className="text-sm font-bold text-black mb-3">Campaign Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div 
              onClick={() => setCampaignType("leaderboard")}
              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${campaignType === "leaderboard" ? "border-black bg-white" : "border-black/5 bg-white hover:border-black/20"}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${campaignType === "leaderboard" ? "border-black" : "border-neutral-300"}`}>
                  {campaignType === "leaderboard" && <div className="w-2 h-2 bg-black rounded-full" />}
                </div>
                <h4 className="font-bold text-black text-sm">Leaderboard Campaign</h4>
              </div>
              <p className="text-xs text-neutral-500 ml-7 leading-relaxed">Creators compete for top spots based on performance. Prizes are awarded to winners.</p>
            </div>
            
            {/* Disabled types */}
            {["CPM Based Campaign", "Milestone Campaign", "Dual Rewards Campaign"].map((type, idx) => (
              <div key={type} className="p-5 rounded-2xl border border-black/5 bg-neutral-50/50 opacity-70 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-4 h-4 rounded-full border-2 border-neutral-200" />
                  <h4 className="font-bold text-neutral-400 text-sm">{type}</h4>
                </div>
                <p className="text-xs text-neutral-400 ml-7 leading-relaxed mb-3">
                  {idx === 0 && "Creators are paid based on the number of views their content receives..."}
                  {idx === 1 && "Creators will be rewarded upon reaching milestone based on views..."}
                  {idx === 2 && "Earn per view at your CPM rate plus unlock milestone rewards..."}
                </p>
                <div className="ml-7 flex items-center gap-2">
                  <span className="text-[10px] font-bold bg-black text-white px-2 py-1 rounded-full">Upgrade Plan</span>
                  <span className="text-[10px] text-neutral-400">Available in paid plans only</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black mb-1.5">Add campaign title</label>
            <input type="text" placeholder="e.g., Create a Viral shorts/video for our New App" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            <div className="text-right text-[10px] text-neutral-400 mt-1">0 / 100</div>
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1.5">Platform</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black cursor-pointer">
                <option>YouTube</option>
                <option>Instagram</option>
                <option>TikTok</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1">Choose the platform where creators will submit content.</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-black mb-1.5">Content Type</label>
            <div className="relative">
              <select className="w-full appearance-none bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black cursor-pointer">
                <option>Select content type (optional)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
            </div>
            <p className="text-[10px] text-neutral-500 mt-1">Specify the type of content you need from creators. This helps creators filter opportunities.</p>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 p-4 border border-black/5 rounded-3xl cursor-pointer hover:border-black/20 transition-colors">
            <input type="checkbox" className="mt-1" />
            <div>
              <div className="text-sm font-bold text-black">Trust Score</div>
              <div className="text-xs text-neutral-500 mt-0.5 leading-relaxed">Enable trust score requirements to allow only reliable creators to participate. Trust scores may decrease for rejected, low-quality, or policy-violating submissions.</div>
            </div>
          </label>
          <label className="flex items-start gap-3 p-4 border border-black/5 rounded-3xl cursor-pointer hover:border-black/20 transition-colors">
            <input type="checkbox" className="mt-1" />
            <div>
              <div className="text-sm font-bold text-black">Multiple Submissions</div>
              <div className="text-xs text-neutral-500 mt-0.5">Allow creators to submit multiple entries to this campaign.</div>
            </div>
          </label>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-black mb-1.5">Category</label>
          <div className="relative">
            <select className="w-full appearance-none bg-white border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black cursor-pointer">
              <option>Technology</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
          </div>
        </div>
        
        <label className="flex items-center gap-2 cursor-pointer mt-2">
          <input type="checkbox" />
          <span className="text-xs text-neutral-600">Target specific creators by selecting categories, subcategories, interests, or regions. Only matching creators will see this campaign.</span>
        </label>

        {/* Thumbnail */}
        <div>
          <label className="block text-xs font-bold text-black mb-1.5">Thumbnail</label>
          <div className="border border-dashed border-black/20 rounded-3xl p-8 flex flex-col items-center justify-center bg-neutral-50/50 hover:bg-neutral-50 transition-colors">
            <Upload size={24} className="text-neutral-400 mb-2" />
            <div className="text-sm font-bold text-black text-center">Drag, drop or browse <span className="text-black cursor-pointer underline">thumbnail</span></div>
            <div className="text-xs text-neutral-400 mb-4">Max file size: 5MB</div>
            <button className="bg-black hover:bg-neutral-800 text-white px-5 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2">
              <Upload size={14} /> Upload
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-black/5">
        <button className="px-6 py-2.5 border border-black/10 rounded-full text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">Save Draft</button>
        <button onClick={() => setStep(2)} className="px-8 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full text-sm font-bold transition-colors shadow-sm">Next</button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-6 md:p-8 animate-fade-in font-sans">
      <h2 className="text-xl font-bold text-black mb-6 font-heading">Project Overview</h2>
      
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-bold text-black">Brief / Project Description <span className="text-red-500">*</span></h3>
            <span className="text-[10px] bg-neutral-100 text-black px-2 py-0.5 rounded-full border border-black/10 font-bold shadow-sm">Required</span>
            <button className="ml-auto bg-black hover:bg-neutral-800 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors">Preview</button>
          </div>
          <p className="text-xs text-neutral-500 mb-3">Provide a detailed description of your project, what you want creators to do, key messages, target audience, and specific requirements.</p>
          <div className="border border-black/10 rounded-3xl overflow-hidden focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
            <div className="bg-neutral-50 border-b border-black/5 p-2 flex gap-2">
              <div className="flex bg-white border border-black/10 rounded-full overflow-hidden shadow-sm">
                <button className="px-3 py-1 text-sm font-bold hover:bg-neutral-50 border-r border-black/10">B</button>
                <button className="px-3 py-1 text-sm italic hover:bg-neutral-50 border-r border-black/10">I</button>
                <button className="px-3 py-1 text-sm underline hover:bg-neutral-50">S</button>
              </div>
              <div className="flex bg-white border border-black/10 rounded-full overflow-hidden shadow-sm">
                <button className="px-3 py-1 text-xs font-bold hover:bg-neutral-50 border-r border-black/10">H1</button>
                <button className="px-3 py-1 text-xs font-bold hover:bg-neutral-50 border-r border-black/10">H2</button>
                <button className="px-3 py-1 text-xs font-bold hover:bg-neutral-50">H3</button>
              </div>
            </div>
            <textarea className="w-full h-48 p-4 text-sm focus:outline-none resize-y" placeholder="Write your brief here..."></textarea>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-bold text-black">Set rules <span className="text-red-500">*</span></h3>
            <span className="text-[10px] bg-neutral-100 text-black px-2 py-0.5 rounded-full border border-black/10 font-bold shadow-sm">Required</span>
            <button className="ml-auto bg-black hover:bg-neutral-800 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors">Preview</button>
          </div>
          <p className="text-xs text-neutral-500 mb-3">Define clear rules and guidelines for participants to follow when creating content for your campaign.</p>
          <div className="border border-black/10 rounded-3xl overflow-hidden focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all">
            <div className="bg-neutral-50 border-b border-black/5 p-2 flex gap-2">
              <div className="flex bg-white border border-black/10 rounded-full overflow-hidden shadow-sm">
                <button className="px-3 py-1 text-sm font-bold hover:bg-neutral-50 border-r border-black/10">B</button>
                <button className="px-3 py-1 text-sm italic hover:bg-neutral-50 border-r border-black/10">I</button>
                <button className="px-3 py-1 text-sm underline hover:bg-neutral-50">S</button>
              </div>
            </div>
            <textarea className="w-full h-48 p-4 text-sm focus:outline-none resize-y" placeholder="List your rules here..."></textarea>
          </div>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-black/5">
        <button onClick={() => setStep(1)} className="px-6 py-2.5 border border-black/10 rounded-full text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">Back</button>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 border border-black/10 rounded-full text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">Save Draft</button>
          <button onClick={() => setStep(3)} className="px-8 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full text-sm font-bold transition-colors shadow-sm">Next</button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-6 md:p-8 animate-fade-in font-sans">
      <h2 className="text-xl font-bold text-black mb-6 font-heading">Add Resources</h2>
      
      <div className="space-y-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-bold text-black">Resources for Participants <span className="text-red-500">*</span></h3>
          </div>
          <p className="text-xs text-neutral-500 mb-1">Provide at least one resource to help participants understand your brand and campaign requirements. You can upload assets (logos, guidelines, examples) <strong className="text-black">or</strong> add external links (website, social media, portfolio).</p>
          <p className="text-[10px] text-red-500 mb-4 font-bold">At least one required</p>
          
          <div className="border border-dashed border-black/20 rounded-3xl p-8 flex flex-col items-center justify-center bg-neutral-50/50 hover:bg-neutral-50 transition-colors mb-6">
            <Upload size={24} className="text-neutral-400 mb-2" />
            <div className="text-sm font-bold text-black text-center">Drag, drop or browse <span className="text-black cursor-pointer underline">file</span></div>
            <div className="text-xs text-neutral-400 mb-4">Max file size: 5MB</div>
            <button className="bg-black hover:bg-neutral-800 text-white px-5 py-2 rounded-full text-xs font-bold transition-colors flex items-center gap-2">
              <Upload size={14} /> Upload File
            </button>
          </div>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-black/5" />
            <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Or</span>
            <div className="flex-1 h-px bg-black/5" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-black mb-1.5">External Link</label>
              <input type="text" placeholder="https://example.com/resource" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1.5">Description <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Describe this link" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <button className="w-full py-2.5 bg-neutral-100 text-neutral-500 rounded-full text-sm font-bold transition-colors hover:bg-neutral-200">Add Link</button>
          </div>
          
          <div className="mt-6 pt-6 border-t border-black/5">
            <h4 className="text-xs font-bold text-black mb-2">Assets & Resources</h4>
            <p className="text-xs text-neutral-500">No assets or links added yet.</p>
          </div>
        </div>

        <div className="pt-6 border-t border-black/5">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-sm font-bold text-black">Inspiration Content <span className="text-red-500">*</span></h3>
          </div>
          <p className="text-xs text-neutral-500 mb-4">Help creators understand your vision by adding at least one inspiration link (Instagram, YouTube, TikTok, Twitter etc.) with a description.</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-black mb-1.5">Inspiration Link <span className="text-red-500">*</span></label>
              <input type="text" placeholder="https://instagram.com/example" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1.5">Inspiration Description <span className="text-red-500">*</span></label>
              <input type="text" placeholder="Add description here*" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <button className="w-full py-2.5 bg-neutral-100 text-neutral-500 rounded-full text-sm font-bold transition-colors hover:bg-neutral-200">Add Inspiration</button>
          </div>
        </div>

        <div className="border border-black/10 rounded-3xl overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 bg-neutral-50 hover:bg-neutral-100 transition-colors">
            <span className="text-sm font-bold text-black">Tracking Links</span>
            <span className="text-xs text-neutral-500">Show</span>
          </button>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-black/5">
        <button onClick={() => setStep(2)} className="px-6 py-2.5 border border-black/10 rounded-full text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">Back</button>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 border border-black/10 rounded-full text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">Save Draft</button>
          <button onClick={() => setStep(4)} className="px-8 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full text-sm font-bold transition-colors shadow-sm">Next</button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] p-6 md:p-8 animate-fade-in font-sans">
      <h2 className="text-xl font-bold text-black mb-6 font-heading">Rewards & Timeline</h2>
      
      <div className="space-y-8">
        
        {/* Plan Details */}
        <div className="border border-black/10 rounded-3xl p-5 bg-white">
          <h3 className="text-xs font-bold text-black mb-4 uppercase tracking-widest">Your Plan Details</h3>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 border border-black/5">
              <span className="text-lg font-black text-black">E</span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-black">Your Current Subscription Plan</h4>
              <p className="text-xs text-neutral-500 mt-1">Get started with basic features. <strong className="text-black">Upgrade for better rates and more flexibility!</strong></p>
            </div>
          </div>
          
          <div className="mt-4 p-4 border border-black/5 rounded-3xl bg-neutral-50/50 flex flex-wrap items-center justify-between gap-4">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-full bg-white border border-black/10 flex items-center justify-center shrink-0 shadow-sm">
                 <Crown size={14} className="text-black" />
               </div>
               <div>
                 <div className="text-sm font-bold text-black uppercase tracking-wide">EXPLORER Plan</div>
                 <div className="flex items-center gap-2">
                   <span className="text-lg font-black text-black">$0.00</span> <span className="text-xs text-neutral-500">/month</span>
                   <span className="text-[10px] font-bold bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded-full ml-2">Limited features</span>
                 </div>
               </div>
             </div>
             <button className="bg-black text-white hover:bg-neutral-800 px-6 py-2 rounded-full text-xs font-bold transition-colors">Free Plan</button>
          </div>
        </div>

        {/* Plan Features */}
        <div>
          <h3 className="text-sm font-bold text-black mb-4">Plan Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-black/10 rounded-3xl p-5 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-bold text-black">Maximum Winners</h4>
                <div className="bg-[#d1f8ff]/30 text-[#000000] border border-black/10 px-3 py-1 rounded-full text-sm font-black shadow-sm">3</div>
              </div>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">The maximum number of creators you can reward in a single leaderboard contest. More winners means broader reach and engagement for your brand.</p>
              <button className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-bold rounded-full transition-colors">Upgrade for more winner slots!</button>
            </div>
            <div className="border border-black/10 rounded-3xl p-5 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-bold text-black">Minimum Budget</h4>
                <div className="bg-[#d1f8ff]/30 text-[#000000] border border-black/10 px-3 py-1 rounded-full text-sm font-black shadow-sm">$100.00</div>
              </div>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">The minimum total prize pool required to create a campaign. Lower minimums give you more flexibility for smaller campaigns.</p>
              <button className="w-full py-2 bg-neutral-100 hover:bg-neutral-200 text-black text-xs font-bold rounded-full transition-colors">Upgrade for lower minimum budgets!</button>
            </div>
            <div className="border border-black/10 rounded-3xl p-5 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-bold text-black">Active Campaigns</h4>
                <div className="bg-neutral-100 text-black border border-black/10 px-3 py-1 rounded-full text-sm font-black shadow-sm">1</div>
              </div>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">How many campaigns you can run simultaneously. Run multiple campaigns to maximize your brand's exposure across different audiences.</p>
              <button className="w-full py-2 bg-neutral-100 text-neutral-400 cursor-not-allowed text-xs font-bold rounded-full">Only 1 campaign allowed - upgrade now!</button>
            </div>
            <div className="border border-black/10 rounded-3xl p-5 bg-white">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-bold text-black">Platform Commission</h4>
                <div className="bg-neutral-100 text-black border border-black/10 px-3 py-1 rounded-full text-sm font-black shadow-sm">50%</div>
              </div>
              <p className="text-xs text-neutral-500 mb-4 leading-relaxed">Our service fee taken from your total prize pool. Higher-tier plans have lower commission rates, saving you money on larger campaigns.</p>
              <button className="w-full py-2 bg-neutral-100 text-neutral-400 cursor-not-allowed text-xs font-bold rounded-full">Only 1 campaign allowed - upgrade now!</button>
            </div>
          </div>
        </div>

        {/* Upgrade Card */}
        <div className="border border-black/10 rounded-3xl p-6 bg-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg shadow-black/5">
          <div>
             <h4 className="text-sm font-bold text-black mb-1">Ready to unlock more potential?</h4>
             <p className="text-xs text-neutral-500">Upgrade to reduce commission and get more winners</p>
          </div>
          <button className="bg-black hover:bg-neutral-800 text-white px-8 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm whitespace-nowrap">Upgrade Plan</button>
        </div>

        <hr className="border-black/5" />

        {/* Campaign Duration */}
        <div>
          <h3 className="text-sm font-bold text-black mb-4">Campaign Duration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-black mb-1.5">Start Date</label>
              <input type="date" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1.5">Start Time</label>
              <input type="time" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1.5">End Date</label>
              <input type="date" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            </div>
            <div>
              <label className="block text-xs font-bold text-black mb-1.5">End Time</label>
              <input type="time" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black" />
            </div>
          </div>
          <p className="text-[10px] text-neutral-500 mt-4 leading-relaxed">
            <strong className="text-black">Start Date Rule:</strong> Campaign must start at least 2 days from today. For example, if today is June 29th, you can create campaigns starting from July 1st 00:00 onwards. June 29th and June 30th are not allowed.
            <br />
            <strong className="text-black">Duration:</strong> Campaign must run between 3 and 28 days. The end date will automatically adjust to maintain minimum duration.
          </p>
        </div>
        
        <hr className="border-black/5" />

        {/* Prize Distribution */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-black">Prize Distribution</h3>
            <div className="bg-neutral-100 px-4 py-1.5 rounded-full text-xs font-bold text-black border border-black/5 shadow-inner">
              Total Prize Pool: <span className="text-sm font-black">$100.00</span>
            </div>
          </div>
          
          <div className="space-y-4 max-w-sm">
            <div className="flex items-center justify-between bg-neutral-50 border border-black/5 rounded-3xl p-3">
              <span className="text-xs font-bold text-black">Number of Winners<br/><span className="text-[10px] text-neutral-400 font-normal">(Required)</span></span>
              <div className="flex items-center gap-3">
                <button className="w-6 h-6 rounded-full bg-white border border-black/10 flex items-center justify-center text-black font-bold shadow-sm">-</button>
                <span className="text-sm font-black text-black">3</span>
                <button className="w-6 h-6 rounded-full bg-white border border-black/10 flex items-center justify-center text-black font-bold shadow-sm">+</button>
              </div>
            </div>
            <div className="text-[10px] text-right text-neutral-500 font-medium">Allowed: 3</div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-neutral-600 w-16">Winner 1</span>
              <input type="text" defaultValue="50" className="flex-1 border border-black/10 rounded-full px-4 py-2 text-sm font-bold focus:outline-none focus:border-black" />
              <span className="text-xs text-neutral-500 w-16">Min: $5.00</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-neutral-600 w-16">Winner 2</span>
              <input type="text" defaultValue="30" className="flex-1 border border-black/10 rounded-full px-4 py-2 text-sm font-bold focus:outline-none focus:border-black" />
              <span className="text-xs text-neutral-500 w-16">Min: $5.00</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-neutral-600 w-16">Winner 3</span>
              <input type="text" defaultValue="20" className="flex-1 border border-black/10 rounded-full px-4 py-2 text-sm font-bold focus:outline-none focus:border-black" />
              <span className="text-xs text-neutral-500 w-16">Min: $5.00</span>
            </div>
          </div>
        </div>

        <hr className="border-black/5 border-dashed" />

        {/* Creator Earning Opportunities */}
        <div>
          <div className="flex items-center gap-2 mb-4">
             <span className="text-xl">💰</span>
             <h3 className="text-sm font-bold text-black">Creator Earning Opportunities</h3>
          </div>
          <p className="text-xs text-neutral-500 mb-4">Motivate creators with additional earning opportunities beyond the main prize pool or CPM rate.</p>
          
          <div className="space-y-4">
            <div className="border border-[#d1f8ff] bg-[#d1f8ff]/10 rounded-3xl p-5">
              <label className="flex items-center gap-3 cursor-pointer mb-3">
                <span className="text-lg">🎁</span>
                <span className="text-sm font-bold text-black">Flat Fee Bonus (Per Verified Submission)</span>
              </label>
              <input type="text" placeholder="e.g., 10 for $10 per submission" className="w-full border border-black/10 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white shadow-sm" />
              <p className="text-[10px] text-neutral-500 mt-2">Optional: Give creators a guaranteed payment for each verified submission, regardless of views or ranking. This bonus is paid after the campaign ends. Great for encouraging participation!</p>
            </div>
            
            <label className="flex items-center justify-between border border-black/5 rounded-3xl p-5 cursor-pointer hover:border-black/20 transition-colors bg-white shadow-sm">
               <div className="flex items-center gap-3">
                 <span className="text-lg">🏆</span>
                 <span className="text-sm font-bold text-black">Additional Bonus Opportunities</span>
               </div>
               <input type="checkbox" />
            </label>
            <p className="text-[10px] text-neutral-500 ml-12 -mt-2">Offer additional bonuses that you'll handle manually (e.g., top creators bonus, affiliate commissions, special rewards).</p>
          </div>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t border-black/5">
        <button onClick={() => setStep(3)} className="px-6 py-2.5 border border-black/10 rounded-full text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">Back</button>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 border border-black/10 rounded-full text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-colors">Save Draft</button>
          <button className="px-8 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full text-sm font-bold transition-colors shadow-sm">Submit for Review</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-20">
      
      {/* Top Header Area */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-8">
        <Link to="/brand/campaigns" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-600 bg-white border border-black/10 px-4 py-2 rounded-full hover:bg-neutral-50 transition-colors mb-8 shadow-sm">
          <ArrowLeft size={14} /> Back to Campaigns
        </Link>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-black font-heading mb-3">Create New Campaign</h1>
          <p className="text-neutral-500 font-medium">Build your campaign in 4 simple steps</p>
        </div>

        {/* Progress Bar */}
        <div className="relative max-w-3xl mx-auto mb-16 px-4">
          <div className="absolute top-6 left-12 right-12 h-1 bg-neutral-200 rounded-full" />
          <div 
            className="absolute top-6 left-12 h-1 bg-black rounded-full transition-all duration-500"
            style={{ width: `${(step - 1) * 33.33}%` }}
          />
          
          <div className="relative flex justify-between z-10">
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-3 w-1/4">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg transition-all duration-300 shadow-sm
                    ${step > s.id ? 'bg-black text-white' : 
                      step === s.id ? 'bg-black text-white scale-110 shadow-lg' : 
                      'bg-white text-neutral-400 border border-black/10'}
                  `}
                >
                  {step > s.id ? <Check size={20} /> : s.id}
                </div>
                <div className="text-center">
                  <div className={`text-sm font-bold ${step >= s.id ? 'text-black' : 'text-neutral-400'}`}>{s.name}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
}
