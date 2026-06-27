import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import GOCLogo from "../../imports/GOC-Logo.png";
import confetti from "canvas-confetti";
import { 
  Sparkles, Building2, ArrowRight, Lock, Mail, User, 
  Globe, Award, Check, AlertCircle, Phone, TrendingUp, CheckCircle
} from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // URL Parameter defaults
  const initialRole = searchParams.get("role") === "brand" ? "brand" : "creator";
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  const [role, setRole] = useState<"creator" | "brand">(initialRole);
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [referral, setReferral] = useState("");
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");

  // UI state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [highlightDemo, setHighlightDemo] = useState<"creator" | "brand" | null>(null);

  // Activity feed ledger data
  const ledger = [
    { text: "@gamer_ash earned $150.00 from Vibe Clip", type: "creator" },
    { text: "@roobet launched clipping contest ($5K pool)", type: "brand" },
    { text: "@ash_menace joined beauty vlog challenge", type: "creator" },
    { text: "@starbucks created winter reel campaign", type: "brand" }
  ];

  // Set URL state updates (for dynamic sync)
  useEffect(() => {
    setErrorMsg(null);
    setSuccessMsg(null);
  }, [role, mode]);

  const handleAutofill = (type: "creator" | "brand") => {
    setMode("signin");
    setRole(type);
    setErrorMsg(null);
    
    if (type === "creator") {
      setEmail("creator@goc.com");
      setPassword("password123");
    } else {
      setEmail("brand@goc.com");
      setPassword("password123");
    }
    
    setHighlightDemo(type);
    setTimeout(() => setHighlightDemo(null), 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      // SignIn validation logic
      if (mode === "signin") {
        const cleanEmail = email.trim().toLowerCase();
        const cleanUsername = cleanEmail.startsWith("@") ? cleanEmail.slice(1) : cleanEmail;
        const cleanPassword = password.trim();

        // 1. Check local storage for signed up users
        let loggedInUserRole: "creator" | "brand" | null = null;
        try {
          const savedUsers = JSON.parse(localStorage.getItem("goc_users") || "[]");
          const matchedUser = savedUsers.find(
            (u: any) => u.email.trim().toLowerCase() === cleanEmail && u.password === cleanPassword
          );
          if (matchedUser) {
            loggedInUserRole = matchedUser.role;
          }
        } catch (e) {
          console.error("Local storage lookup failed", e);
        }

        // 2. Check hardcoded sandbox credentials with extra tolerance for typos/spacing/passwords
        const matchesCreator = 
          loggedInUserRole === "creator" ||
          ((cleanEmail === "creator@goc.com" || 
            cleanEmail === "ashish332@gmail.com" || 
            cleanUsername === "gamer_ash" || 
            cleanEmail === "creator") && 
           (cleanPassword === "password123" || 
            cleanPassword === "creator123" || 
            cleanPassword === "password" || 
            cleanPassword.length >= 6));
        
        const matchesBrand = 
          loggedInUserRole === "brand" ||
          ((cleanEmail === "brand@goc.com" || 
            cleanEmail === "lumina@goc.com" || 
            cleanUsername === "brand_admin" || 
            cleanEmail === "brand") && 
           (cleanPassword === "password123" || 
            cleanPassword === "brand123" || 
            cleanPassword === "password" || 
            cleanPassword.length >= 6));

        if (matchesCreator) {
          setRole("creator");
          setSuccessMsg("Welcome back, Creator! Accessing Arena...");
          setTimeout(() => navigate("/creator/dashboard"), 1000);
        } else if (matchesBrand) {
          setRole("brand");
          setSuccessMsg("Welcome back, Partner! Loading Campaigns...");
          setTimeout(() => navigate("/campaigns"), 1000);
        } else {
          setErrorMsg("Invalid credentials. Try using the quick sandbox demo buttons below!");
        }
      } 
      // SignUp validation logic
      else {
        if (role === "creator") {
          if (!fullName || !email || !username) {
            setErrorMsg("Please fill out all required fields.");
            return;
          }
          
          try {
            const savedUsers = JSON.parse(localStorage.getItem("goc_users") || "[]");
            if (!savedUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
              savedUsers.push({ email, password, role, fullName, username });
              localStorage.setItem("goc_users", JSON.stringify(savedUsers));
            }
          } catch (e) {
            console.error("Local storage save failed", e);
          }

          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
          setSuccessMsg("Account created! Welcome to the Arena.");
          setTimeout(() => navigate("/creator/dashboard"), 1200);
        } else {
          if (!brandName || !email || !website) {
            setErrorMsg("Please fill out all required fields.");
            return;
          }

          try {
            const savedUsers = JSON.parse(localStorage.getItem("goc_users") || "[]");
            if (!savedUsers.some((u: any) => u.email.toLowerCase() === email.toLowerCase())) {
              savedUsers.push({ email, password, role, brandName, website });
              localStorage.setItem("goc_users", JSON.stringify(savedUsers));
            }
          } catch (e) {
            console.error("Local storage save failed", e);
          }

          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 }
          });
          setSuccessMsg("Brand Workspace initialized! Let's launch your first campaign.");
          setTimeout(() => navigate("/campaigns"), 1200);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* ── LEFT PANEL: PREMIUM VISUAL SHOWCASE ── */}
      <div className="w-full md:w-[45%] bg-black text-white flex flex-col justify-between p-10 md:p-16 relative overflow-hidden">
        {/* Decorative dynamic blur spots */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] aspect-square bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-neutral-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10 self-start">
          <img src={GOCLogo} alt="GOC Logo" className="h-10 w-auto filter brightness-0 invert" />
          <span className="font-extrabold text-base tracking-widest mt-1.5 uppercase" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Portal
          </span>
        </Link>

        {/* Pitch Statement */}
        <div className="my-auto py-16 space-y-10 relative z-10 text-left">
          <div className="space-y-5">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full w-fit block">
              Creator Arena 2.0
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Enter the Arena <br className="hidden lg:inline" /> of GOC Creators.
            </h1>
            <p className="text-sm md:text-base text-neutral-400 font-medium max-w-md leading-relaxed">
              The premier ecosystem where high-energy creators launch UGC clips and top brands build gamified prize challenges.
            </p>
          </div>

          {/* Features Highlights Cards */}
          <div className="space-y-4 max-w-lg">
            {/* Creator Feature Card */}
            <div className={`p-5 rounded-3xl border transition-all duration-300 ${
              role === "creator" 
                ? "bg-white/10 border-white/30 shadow-lg scale-[1.02]" 
                : "bg-white/5 border-transparent opacity-50 hover:opacity-70"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl flex-shrink-0 ${role === "creator" ? "bg-white text-black" : "bg-white/10 text-white"}`}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">For Creators</h4>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                    Submit video links, track analytics, climb leaderboard podiums, and redeem earnings directly.
                  </p>
                </div>
              </div>
            </div>

            {/* Brand Feature Card */}
            <div className={`p-5 rounded-3xl border transition-all duration-300 ${
              role === "brand" 
                ? "bg-white/10 border-white/30 shadow-lg scale-[1.02]" 
                : "bg-white/5 border-transparent opacity-50 hover:opacity-70"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-2xl flex-shrink-0 ${role === "brand" ? "bg-white text-black" : "bg-white/10 text-white"}`}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">For Brands & Agencies</h4>
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed">
                    Draft campaign briefs, host competitive challenges, verify clips, and manage transparent distributions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* ── RIGHT PANEL: AUTHENTICATION FORM CARD ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-white relative">
        <div className="w-full max-w-lg space-y-10 text-left">
          
          {/* Header Description */}
          <div>
            <h2 className="text-3xl font-black text-black tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {mode === "signin" ? "Sign In to GOC" : "Complete Your Profile"}
            </h2>
            <p className="text-sm text-neutral-500 mt-2 font-medium">
              {mode === "signin" 
                ? "Enter your credentials or choose a quick-fill demo below."
                : "Fill in the details below to join the gaming UGC movement."}
            </p>
          </div>

          {/* Feedback Toasts */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-150 text-red-650 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <AlertCircle size={15} />
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-150 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle size={15} />
              {successMsg}
            </div>
          )}

          {/* Mode Tabs (Sign In vs Create Account) */}
          <div className="bg-neutral-100 p-1.5 rounded-2xl border border-black/5 flex w-full">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                mode === "signin" 
                  ? "bg-white text-black shadow-sm" 
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                mode === "signup" 
                  ? "bg-white text-black shadow-sm" 
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Role selector buttons (Creator vs Brand) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Creator Selector */}
            <button
              type="button"
              onClick={() => setRole("creator")}
              className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col gap-3 ${
                role === "creator" 
                  ? "bg-[#f5f5f5] border-black" 
                  : "bg-white border-neutral-200 hover:border-black/30"
              }`}
            >
              <Sparkles size={20} className={role === "creator" ? "text-black" : "text-neutral-400"} />
              <div>
                <p className="text-sm font-bold text-black leading-none">Creator</p>
                <p className="text-[10px] text-neutral-500 mt-1.5 font-semibold">Earn on videos</p>
              </div>
            </button>

            {/* Brand Selector */}
            <button
              type="button"
              onClick={() => setRole("brand")}
              className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col gap-3 ${
                role === "brand" 
                  ? "bg-[#f5f5f5] border-black" 
                  : "bg-white border-neutral-200 hover:border-black/30"
              }`}
            >
              <Building2 size={20} className={role === "brand" ? "text-black" : "text-neutral-400"} />
              <div>
                <p className="text-sm font-bold text-black leading-none">Brand / Agency</p>
                <p className="text-[10px] text-neutral-500 mt-1.5 font-semibold">Launch brief deals</p>
              </div>
            </button>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* COMMON FIELDS IN SIGNUP */}
            {mode === "signup" && (
              <>
                {role === "creator" ? (
                  <>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-3.5 text-neutral-450" size={16} />
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Ashish Singh"
                          value={fullName}
                          onChange={e => setFullName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black bg-slate-50/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Username (Technical ID)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-3.5 text-neutral-450 text-sm font-bold">@</span>
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. gamer_ash"
                          value={username}
                          onChange={e => setUsername(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black bg-slate-50/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Telephone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-3.5 text-neutral-450" size={16} />
                        <input 
                          type="tel" 
                          placeholder="e.g. +91 9876543210"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black bg-slate-50/20"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Brand / Company Name</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-3.5 text-neutral-450" size={16} />
                        <input 
                          type="text" 
                          required
                          placeholder="e.g. Roobet Gaming"
                          value={brandName}
                          onChange={e => setBrandName(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black bg-slate-50/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Website URL</label>
                      <div className="relative">
                        <Globe className="absolute left-4 top-3.5 text-neutral-450" size={16} />
                        <input 
                          type="url" 
                          required
                          placeholder="e.g. https://roobet.com"
                          value={website}
                          onChange={e => setWebsite(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black bg-slate-50/20"
                        />
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Email Address Input */}
            <div className={`transition-all duration-350 ${highlightDemo ? "scale-[1.01] border-emerald-500" : ""}`}>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">
                {role === "creator" ? "Email Address or Username" : "Corporate Email"}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-neutral-400" size={16} />
                <input 
                  type="text" 
                  required
                  placeholder={role === "creator" ? "e.g. creator@goc.com" : "e.g. brand@goc.com"}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-sm focus:outline-none focus:border-black bg-slate-50/20 transition-all ${
                    highlightDemo ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/10" : "border-neutral-200"
                  }`}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className={`transition-all duration-350 ${highlightDemo ? "scale-[1.01]" : ""}`}>
              <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-4 text-neutral-400" size={16} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-xl text-sm focus:outline-none focus:border-black bg-slate-50/20 transition-all ${
                    highlightDemo ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/10" : "border-neutral-200"
                  }`}
                />
              </div>
            </div>

            {/* Referral field (Optional for Creator SignUp) */}
            {mode === "signup" && role === "creator" && (
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-neutral-500 mb-2">Referral Code (Optional)</label>
                <div className="relative">
                  <Award className="absolute left-4 top-3.5 text-neutral-450" size={16} />
                  <input 
                    type="text" 
                    placeholder="Enter GOC referral code"
                    value={referral}
                    onChange={e => setReferral(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-black bg-slate-50/20"
                  />
                </div>
              </div>
            )}

            {/* Submit Action Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-neutral-800 transition-colors py-4 rounded-xl text-sm font-black shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-8"
            >
              {loading ? (
                <span>Entering Arena...</span>
              ) : (
                <>
                  <span>Enter The Arena</span>
                  <ArrowRight size={16} className="text-white" />
                </>
              )}
            </button>
          </form>

          {/* ── SANDBOX DEMO QUICK-LOGINS (10x UX) ── */}
          <div className="border-t border-neutral-100 pt-8 mt-4">
            <p className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-4 text-center">
              Quick Sandbox Logins (Click to Auto-fill)
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleAutofill("creator")}
                className="py-3 px-3 border border-neutral-200 rounded-xl hover:border-black text-xs font-bold text-neutral-700 hover:text-black transition-all bg-slate-50/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles size={14} className="text-amber-500" />
                gamer_ash (Creator)
              </button>
              <button 
                onClick={() => handleAutofill("brand")}
                className="py-3 px-3 border border-neutral-200 rounded-xl hover:border-black text-xs font-bold text-neutral-700 hover:text-black transition-all bg-slate-50/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Building2 size={14} className="text-purple-500" />
                brand_admin (Brand)
              </button>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
