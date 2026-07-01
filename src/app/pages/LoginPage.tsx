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
          setSuccessMsg("Welcome back, Partner! Loading Dashboard...");
          setTimeout(() => navigate("/brand/dashboard"), 1000);
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
          setTimeout(() => navigate("/brand/dashboard"), 1200);
        }
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row font-sans">
      
      {/* ── LEFT PANEL: PREMIUM VISUAL SHOWCASE ── */}
      <div className="w-full md:w-[45%] bg-black text-white flex flex-col justify-between p-10 md:p-16 relative overflow-hidden">
        {/* Decorative dynamic blur spots */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] aspect-square bg-white/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square bg-neutral-600/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Logo */}
        <Link to="/" className="flex items-center gap-3 relative z-10 self-start">
          <img src={GOCLogo} alt="GOC Logo" className="h-10 w-auto filter brightness-0 invert" />
          <span className="font-heading font-extrabold text-base tracking-widest mt-1.5 uppercase">
            Portal
          </span>
        </Link>

        {/* Pitch Statement */}
        <div className="my-auto py-16 space-y-10 relative z-10 text-left">
          <div className="space-y-5">
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white bg-white/10 border border-white/20 px-4 py-1.5 rounded-full w-fit block">
              Creator Arena 2.0
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
              Enter the Arena <br className="hidden lg:inline" /> of GOC Creators.
            </h1>
            <p className="text-sm md:text-base text-neutral-400 font-medium max-w-md leading-relaxed">
              The premier ecosystem where high-energy creators launch UGC clips and top brands build gamified prize challenges.
            </p>
          </div>

        </div>


      </div>

      {/* ── RIGHT PANEL: AUTHENTICATION FORM CARD ── */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-white relative">
        <div className="w-full max-w-lg space-y-10 text-left">
          
          {/* Header Description */}
          <div>
            <h2 className="text-3xl font-black text-black tracking-tight">
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
            <div className="p-3.5 rounded-3xl bg-red-50 border border-red-150 text-red-650 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <AlertCircle size={15} />
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3.5 rounded-3xl bg-emerald-50 border border-emerald-150 text-emerald-700 text-xs font-bold flex items-center gap-2 animate-fade-in">
              <CheckCircle size={15} />
              {successMsg}
            </div>
          )}

          {/* Mode Tabs (Sign In vs Create Account) */}
          <div className="bg-neutral-100 p-1.5 rounded-3xl border border-black/5 flex w-full">
            <button
              onClick={() => setMode("signin")}
              className={`flex-1 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
                mode === "signin" 
                  ? "bg-white text-black shadow-sm" 
                  : "text-neutral-500 hover:text-black"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
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
              className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col gap-3 ${
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
              className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer flex flex-col gap-3 ${
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

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-neutral-200 rounded-full shadow-sm bg-white text-sm font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center py-3.5 px-4 border border-neutral-200 rounded-full shadow-sm bg-white text-sm font-bold text-neutral-700 hover:bg-neutral-50 cursor-pointer transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-neutral-500 font-bold text-xs uppercase tracking-wider">
                Or {mode === "signin" ? "sign in" : "sign up"} with email
              </span>
            </div>
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
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-full text-sm focus:outline-none focus:border-black bg-slate-50/20"
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
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-full text-sm focus:outline-none focus:border-black bg-slate-50/20"
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
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-full text-sm focus:outline-none focus:border-black bg-slate-50/20"
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
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-full text-sm focus:outline-none focus:border-black bg-slate-50/20"
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
                          className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-full text-sm focus:outline-none focus:border-black bg-slate-50/20"
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
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-full text-sm focus:outline-none focus:border-black bg-slate-50/20 transition-all ${
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
                  className={`w-full pl-11 pr-4 py-3.5 border rounded-full text-sm focus:outline-none focus:border-black bg-slate-50/20 transition-all ${
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
                    className="w-full pl-11 pr-4 py-3.5 border border-neutral-200 rounded-full text-sm focus:outline-none focus:border-black bg-slate-50/20"
                  />
                </div>
              </div>
            )}

            {/* Submit Action Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white hover:bg-neutral-800 transition-colors py-4 rounded-full text-sm font-black shadow-sm cursor-pointer flex items-center justify-center gap-2 mt-8"
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





        </div>
      </div>
      
    </div>
  );
}
