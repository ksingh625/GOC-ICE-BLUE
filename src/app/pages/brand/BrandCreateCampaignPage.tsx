import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, Upload, Check, ChevronDown, Trophy, FileText, Video, Edit2, Lock } from "lucide-react";

export default function BrandCreateCampaignPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  
  const [campaignFormat, setCampaignFormat] = useState("video");
  const [campaignType, setCampaignType] = useState("leaderboard");

  const steps = [
    { id: 1, name: "Campaign Basics", desc: "Format, type, and targeting" },
    { id: 2, name: "Project Brief", desc: "Goals and requirements" },
    { id: 3, name: "Resources", desc: "Assets and inspiration" },
    { id: 4, name: "Timeline & Rewards", desc: "Schedule and prizes" },
  ];

  const handleContinue = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
    setActiveStep(stepId + 1);
  };

  const renderStep1 = () => (
    <div className="space-y-6 pt-4 animate-fade-in">
      
      <div className="space-y-4">
        {/* Format and Type side-by-side to save space */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Campaign Format</label>
            <div className="flex bg-neutral-100 p-1 rounded-lg h-[52px]">
              <button 
                onClick={() => setCampaignFormat("text")}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${campaignFormat === "text" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"}`}
              >
                <FileText size={16} /> Text / Image
              </button>
              <button 
                onClick={() => setCampaignFormat("video")}
                className={`flex-1 flex items-center justify-center gap-2 py-1.5 rounded-md text-sm font-medium transition-all ${campaignFormat === "video" ? "bg-white text-black shadow-sm" : "text-neutral-500 hover:text-black"}`}
              >
                <Video size={16} /> Video
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Campaign Type</label>
            <div 
              onClick={() => setCampaignType("leaderboard")}
              className="px-4 py-3 h-[52px] border border-neutral-200 rounded-lg bg-white shadow-sm cursor-pointer ring-1 ring-black/5 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3">
                <Trophy size={16} className="text-black" />
                <h4 className="font-bold text-black text-sm">Leaderboard</h4>
                <span className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-black bg-black">
                  <Check size={10} className="text-white" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1.5">Campaign Title</label>
            <input type="text" placeholder="e.g., Viral short for our new iOS app..." className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Platform</label>
              <div className="relative">
                <select className="w-full h-10 appearance-none border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100 cursor-pointer">
                  <option>YouTube</option>
                  <option>Instagram</option>
                  <option>TikTok</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
              <div className="relative">
                <select className="w-full h-10 appearance-none border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100 cursor-pointer">
                  <option>Technology</option>
                  <option>Gaming</option>
                  <option>Lifestyle</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Checkboxes side-by-side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors shadow-sm">
            <input type="checkbox" className="w-4 h-4" />
            <div className="text-sm font-bold text-black">Require Trust Score</div>
          </label>
          <label className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors shadow-sm">
            <input type="checkbox" className="w-4 h-4" />
            <div className="text-sm font-bold text-black">Allow Multiple Entries</div>
          </label>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Campaign Thumbnail</label>
          <div className="border-2 border-dashed border-neutral-200 rounded-lg p-5 flex flex-col items-center justify-center bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer group">
            <Upload size={20} className="text-neutral-400 mb-2 group-hover:text-black transition-colors" />
            <div className="text-sm font-medium text-black text-center mb-1">Upload or drag & drop (max 5MB)</div>
          </div>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="flex justify-end gap-3 pt-5 mt-5 border-t border-neutral-100">
        <button className="h-10 px-6 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700">Save Draft</button>
        <button onClick={() => handleContinue(1)} className="h-10 px-8 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Continue</button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5 pt-4 animate-fade-in">
      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5">
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea 
            className="w-full h-32 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors p-3 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100 resize-y" 
            placeholder="Describe your project goals, key messaging, and any specific requirements here. Markdown is supported."
          ></textarea>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700 mb-1.5">
            Campaign Rules <span className="text-red-500">*</span>
          </label>
          <textarea 
            className="w-full h-24 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors p-3 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100 resize-y" 
            placeholder="1. Must include #BrandName&#10;2. Must be at least 30 seconds long..."
          ></textarea>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="flex justify-between items-center pt-5 mt-5 border-t border-neutral-100">
        <button onClick={() => setActiveStep(1)} className="h-10 px-6 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700">Back</button>
        <div className="flex gap-3">
          <button className="h-10 px-6 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700">Save Draft</button>
          <button onClick={() => handleContinue(2)} className="h-10 px-8 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Continue</button>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5 pt-4 animate-fade-in">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1.5">Brand Assets (Logos, Guidelines)</label>
          <div className="border-2 border-dashed border-neutral-200 rounded-lg p-5 flex flex-col items-center justify-center bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer group">
            <Upload size={20} className="text-neutral-400 mb-2 group-hover:text-black transition-colors" />
            <div className="text-sm font-medium text-black text-center mb-1">Upload brand assets</div>
            <div className="text-xs text-neutral-500">ZIP, PDF, or Images (max. 10MB)</div>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-neutral-700 mb-1">Inspiration Links</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" placeholder="https://instagram.com/example" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
            <input type="text" placeholder="Short description" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input type="text" placeholder="Add another link..." className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
            <input type="text" placeholder="Short description" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
          </div>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="flex justify-between items-center pt-5 mt-5 border-t border-neutral-100">
        <button onClick={() => setActiveStep(2)} className="h-10 px-6 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700">Back</button>
        <div className="flex gap-3">
          <button className="h-10 px-6 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700">Save Draft</button>
          <button onClick={() => handleContinue(3)} className="h-10 px-8 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Continue</button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-5 pt-4 animate-fade-in">
      <div className="space-y-5">
        
        {/* Campaign Duration */}
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3 border-b border-neutral-100 pb-2">Campaign Schedule</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">Start Date</label>
              <input type="date" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 mb-1.5 uppercase tracking-wide">End Date</label>
              <input type="date" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors px-4 text-sm focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
            </div>
          </div>
        </div>
        
        {/* Prize Distribution */}
        <div>
          <div className="flex justify-between items-center mb-3 border-b border-neutral-100 pb-2">
            <h3 className="text-sm font-medium text-neutral-700">Prize Distribution</h3>
            <span className="text-sm font-bold text-black">Total: $100.00</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-neutral-500 w-16">1st</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <input type="number" defaultValue="50" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors pl-7 pr-3 text-sm font-medium focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-neutral-500 w-16">2nd</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <input type="number" defaultValue="30" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors pl-7 pr-3 text-sm font-medium focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-neutral-500 w-16">3rd</span>
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
                <input type="number" defaultValue="20" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors pl-7 pr-3 text-sm font-medium focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
              </div>
            </div>
          </div>
        </div>

        {/* Bonus */}
        <div>
          <h3 className="text-sm font-medium text-neutral-700 mb-3 border-b border-neutral-100 pb-2">Bonus (Optional)</h3>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-neutral-500 w-[104px] whitespace-nowrap">Pay Per Video</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500">$</span>
              <input type="number" placeholder="0.00" className="w-full h-10 border border-neutral-200 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors pl-7 pr-3 text-sm font-medium focus:outline-none focus:border-neutral-300 focus:bg-white focus:ring-4 focus:ring-neutral-100" />
            </div>
          </div>
          <p className="text-xs text-neutral-500 mt-1 pl-[120px]">Pay a flat fee to creators for every verified submission.</p>
        </div>
      </div>
      
      {/* Bottom Nav */}
      <div className="flex justify-between items-center pt-5 mt-5 border-t border-neutral-100">
        <button onClick={() => setActiveStep(3)} className="h-10 px-6 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700">Back</button>
        <div className="flex gap-3">
          <button className="h-10 px-6 border border-neutral-200 rounded-lg bg-white hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-700">Save Draft</button>
          <button className="h-10 px-8 bg-black hover:bg-neutral-800 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">Submit Campaign</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans pb-10">
      
      <div className="max-w-3xl mx-auto px-6 pt-8 pb-4">
        <Link to="/brand/campaigns" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-black transition-colors mb-4">
          <ArrowLeft size={16} /> Back to Campaigns
        </Link>
        
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-black font-heading mb-1">Create Campaign</h1>
          <p className="text-sm text-neutral-600">Complete the steps below to launch your campaign.</p>
        </div>

        {/* Sticky Progress Indicator */}
        <div className="sticky top-0 z-20 py-4 mb-6 bg-[#fafafa]/95 backdrop-blur-sm border-b border-neutral-200/50 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold text-black">
              Step {activeStep} of {steps.length}: <span className="font-medium text-neutral-600">{steps.find(s => s.id === activeStep)?.name}</span>
            </div>
            <div className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
              {steps.length - activeStep === 0 ? 'Last step' : `${steps.length - activeStep} steps left`}
            </div>
          </div>
          <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black transition-all duration-500 ease-out" 
              style={{ width: `${(activeStep / steps.length) * 100}%` }} 
            />
          </div>
        </div>

        {/* Accordion Container */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          {steps.map((s, idx) => {
            const isActive = activeStep === s.id;
            const isCompleted = completedSteps.includes(s.id) && !isActive;
            const isLocked = !isActive && !isCompleted && s.id > 1 && !completedSteps.includes(s.id - 1);
            
            return (
              <div key={s.id} className={`${idx !== steps.length - 1 ? 'border-b border-neutral-200' : ''}`}>
                {/* Accordion Header */}
                <div 
                  onClick={() => {
                    if (!isLocked) setActiveStep(s.id);
                  }}
                  className={`flex items-center justify-between p-5 md:p-6 transition-colors ${
                    isLocked ? 'bg-neutral-50 cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-neutral-50'
                  } ${isActive ? 'bg-neutral-50/50' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {/* Status Icon */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all shadow-sm
                      ${isCompleted ? 'bg-black text-white' : 
                        isActive ? 'bg-black text-white ring-4 ring-neutral-200' : 
                        'bg-white text-neutral-400 border border-neutral-200'}`}
                    >
                      {isCompleted ? <Check size={16} /> : (isLocked ? <Lock size={14} /> : s.id)}
                    </div>
                    
                    <div>
                      <h3 className={`text-base font-bold ${isActive || isCompleted ? 'text-black' : 'text-neutral-500'}`}>
                        {s.name}
                      </h3>
                      {!isActive && (
                        <p className="text-sm text-neutral-500 mt-0.5">{s.desc}</p>
                      )}
                    </div>
                  </div>

                  {/* Edit Button for completed steps */}
                  {isCompleted && (
                    <button className="text-neutral-400 hover:text-black transition-colors p-2 rounded-full hover:bg-neutral-100">
                      <Edit2 size={16} />
                    </button>
                  )}
                </div>

                {/* Accordion Body */}
                {isActive && (
                  <div className="px-5 md:px-6 pb-6 pt-2">
                    {s.id === 1 && renderStep1()}
                    {s.id === 2 && renderStep2()}
                    {s.id === 3 && renderStep3()}
                    {s.id === 4 && renderStep4()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
