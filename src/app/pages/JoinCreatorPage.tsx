import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import GOCLogo from "../../imports/GOC-Logo.png";
import confetti from "canvas-confetti";
import { 
  Camera, Instagram, Youtube, Sparkles, User, Mail, Globe, 
  ArrowRight, Check, Image as ImageIcon
} from "lucide-react";

export default function JoinCreatorPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [niche, setNiche] = useState<string[]>([]);
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  const nichesList = [
    "Beauty & Skincare",
    "Tech & Gadgets",
    "Fashion & Style",
    "Gaming",
    "Fitness & Health",
    "Food & Cooking",
    "Travel & Vlogs",
    "Finance & Business",
    "Comedy & Entertainment"
  ];

  const handleNicheToggle = (item: string) => {
    if (niche.includes(item)) {
      setNiche(niche.filter(n => n !== item));
    } else {
      setNiche([...niche, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
      setStep(3);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-black flex flex-col justify-between">
      
      {/* HEADER */}
      <nav className="border-b border-neutral-200/60 bg-white px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img src={GOCLogo} alt="Game of Creators" className="h-8 w-auto filter brightness-0" />
        </Link>
        <span className="text-xs font-bold text-black/50">Creator Application Wizard</span>
      </nav>

      {/* BODY */}
      <div className="flex-1 max-w-xl w-full mx-auto p-6 flex flex-col justify-center py-12">
        <div className="bg-white border border-neutral-200/85 rounded-3xl p-8 shadow-md text-left">
          
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black mb-1">Join the Creator Arena</h2>
                <p className="text-xs text-neutral-500">Sign up to compete in brand deals and earn guaranteed payouts.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 text-neutral-400" size={16} />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Ashish Singh"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-neutral-400" size={16} />
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. ashish@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-full border border-neutral-200 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => setStep(2)}
                disabled={!name || !email}
                className="w-full btn-primary-gradient py-3.5 rounded-full text-xs flex items-center justify-center gap-1.5"
              >
                Next: Connect Socials & Niche
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="text-2xl font-black mb-1">Niches & Social handles</h2>
                <p className="text-xs text-neutral-500">Connect your profiles to receive matching contest alerts.</p>
              </div>

              {/* Niche Selector */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-2.5">Select Your Niches</label>
                <div className="flex flex-wrap gap-2">
                  {nichesList.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleNicheToggle(n)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        niche.includes(n) 
                          ? "bg-[#d1f8ff] border-black text-black" 
                          : "bg-white border-neutral-200 text-neutral-600 hover:border-black/20"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Handles */}
              <div className="space-y-3">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600">Your Handles (Optional)</label>
                
                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 text-pink-500"><Instagram size={18} /></div>
                  <input 
                    type="text" 
                    placeholder="Instagram handle (e.g. ashish_ugc)"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    className="flex-1 px-3.5 rounded-full border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div className="flex gap-2">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 text-red-600"><Youtube size={18} /></div>
                  <input 
                    type="text" 
                    placeholder="YouTube channel (e.g. ashish_creators)"
                    value={youtube}
                    onChange={(e) => setYoutube(e.target.value)}
                    className="flex-1 px-3.5 rounded-full border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>

              {/* Portfolio Drag Uploader Mock */}
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5">Sample Video Portfolio</label>
                <div className="border-2 border-dashed border-neutral-200 hover:border-black/20 p-6 rounded-3xl text-center cursor-pointer transition-colors bg-neutral-50/50">
                  <Camera size={24} className="mx-auto mb-2 text-neutral-400" />
                  <p className="text-xs font-bold text-neutral-700">Drag your video file here</p>
                  <p className="text-[10px] text-neutral-400 mt-0.5">MP4, MOV up to 60MB</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-full border border-neutral-200 text-xs font-bold text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-1 btn-primary-gradient py-3.5 rounded-full text-xs flex items-center justify-center gap-1.5"
                >
                  {submitting ? "Submitting Application..." : "Submit Application"}
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-12 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                <Check size={28} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-black mb-2">Application Received!</h2>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>! We've received your application. Our community team will review your niches and sample portfolio. You should receive a confirmation email at <strong>{email}</strong> within 24-48 hours.
                </p>
              </div>
              <button 
                onClick={() => navigate("/creator/dashboard")}
                className="btn-primary-gradient px-8 py-3 rounded-full text-xs"
              >
                Enter Creator Dashboard
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
