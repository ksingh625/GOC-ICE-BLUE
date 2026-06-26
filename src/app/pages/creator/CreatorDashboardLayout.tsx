import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router";
import GOCLogo from "../../../imports/GOC-Logo.png";
import { 
  LayoutDashboard, Trophy, Rocket, Wallet, Settings, 
  PhoneCall, Bell, ChevronDown, LogOut, 
  Compass, FileCheck, ChevronRight, Menu, X, ArrowLeft,
  Plus, RefreshCw, Check
} from "lucide-react";

export default function CreatorDashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [activeAccount, setActiveAccount] = useState("gamer_ash");
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [coins, setCoins] = useState(1250);
  
  const navigate = useNavigate();
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  const accounts = [
    { 
      id: "gamer_ash", 
      handle: "@gamer_ash", 
      name: "Ashish Kumar singh", 
      email: "ksinghash5@gmail.com", 
      avatar: "G", 
      desc: "Primary Gaming & Tech UGC Profile", 
      platform: "YouTube, TikTok" 
    },
    { 
      id: "ash_menace", 
      handle: "@ash_menace", 
      name: "Ashish Kumar singh", 
      email: "ashmenace@gmail.com", 
      avatar: "M", 
      desc: "Secondary Lifestyle & Vlogging Profile", 
      platform: "Instagram, Twitter" 
    }
  ];

  const currentAccount = accounts.find(acc => acc.id === activeAccount) || accounts[0];

  const notifications = [
    { id: 1, text: "Vishesh approved your TikTok submission for Vibe Clip!", time: "2h ago", unread: true },
    { id: 2, text: "Roobet Official campaign is ending in 24 hours. Submit now!", time: "5h ago", unread: true },
    { id: 3, text: "You earned $150.00 from Milestone Rewards!", time: "1 day ago", unread: false },
    { id: 4, text: "New campaign 'Honey Dipped' matches your Lifestyle niche.", time: "2 days ago", unread: false }
  ];

  const hasUnread = notifications.some(n => n.unread);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Sync state from localStorage
  useEffect(() => {
    const updateStats = () => {
      try {
        const storedSubs = localStorage.getItem("goc_submissions");
        if (storedSubs) setSubmissions(JSON.parse(storedSubs));
        const storedCoins = localStorage.getItem("goc_coins");
        if (storedCoins) setCoins(parseInt(storedCoins));
      } catch (e) {
        console.error(e);
      }
    };
    
    updateStats();
    window.addEventListener("storage", updateStats);
    return () => window.removeEventListener("storage", updateStats);
  }, [drawerOpen, switcherOpen]);

  // Handle active account changes
  const handleSelectAccount = (id: string) => {
    setActiveAccount(id);
    try {
      localStorage.setItem("goc_active_account", id);
    } catch (e) {
      console.error(e);
    }
  };

  const totalEarningsVal = submissions
    .filter(s => s.status === "VERIFIED" || s.status === "PAID")
    .reduce((acc, curr) => acc + curr.earned, 0);

  const navItems = [
    { label: "Getting Started", desc: "How it works", href: "/creator/getting-started", icon: <Rocket size={18} /> },
    { label: "Campaigns", desc: "Available contests", href: "/creator/campaigns", icon: <Compass size={18} /> },
    { label: "Dashboard", desc: "Your overview", href: "/creator/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "My Submissions", desc: "Content submissions", href: "/creator/submissions", icon: <FileCheck size={18} /> },
    { label: "Leaderboard", desc: "Top creators", href: "/creator/leaderboard", icon: <Trophy size={18} /> },
    { label: "Wallet", desc: "Earnings & Transactions", href: "/creator/wallet", icon: <Wallet size={18} /> },
    { label: "Settings", desc: "Account preferences", href: "/creator/settings", icon: <Settings size={18} /> }
  ];

  const getPageTitle = () => {
    const active = navItems.find(item => location.pathname === item.href);
    return active ? active.label : "Dashboard";
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-black flex font-sans" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      
      {/* ── SIDEBAR (DESKTOP) ── */}
      <aside 
        className={`hidden md:flex flex-col bg-white border-r border-neutral-200/60 transition-all duration-300 relative z-30 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 border-b border-neutral-200/60 flex items-center px-5 overflow-hidden">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src={GOCLogo} alt="GOC Logo" className="h-8 w-auto filter brightness-0" />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-all duration-200 group text-left relative ${
                  active 
                    ? "bg-[#d1f8ff]/50 text-black font-bold" 
                    : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                }`}
              >
                {/* Active left indicator tag */}
                {active && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-black rounded-r" />
                )}
                <div className={`transition-transform duration-200 group-hover:scale-105 ${active ? "text-black" : "text-neutral-400 group-hover:text-black"}`}>
                  {item.icon}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold leading-tight">{item.label}</p>
                    <p className="text-[9px] text-neutral-450 mt-0.5 leading-none font-medium truncate group-hover:text-neutral-600 transition-colors">
                      {item.desc}
                    </p>
                  </div>
                )}
                {!sidebarCollapsed && !active && (
                  <ChevronRight size={10} className="text-neutral-350 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Support Help Block */}
        {!sidebarCollapsed && (
          <div className="p-4 m-3 rounded-2xl bg-[#d1f8ff]/20 border border-black/5 flex flex-col items-center text-center">
            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center mb-2.5 shadow-sm">
              <PhoneCall size={14} className="text-[#d1f8ff]" />
            </div>
            <h4 className="text-[11px] font-extrabold text-black">We're here to help</h4>
            <p className="text-[9px] text-neutral-500 mt-1 max-w-[150px] leading-normal font-semibold">Have doubts about payouts or uploading? Call Vishesh.</p>
            <a 
              href="tel:+919876543210" 
              className="mt-3 w-full py-1.5 rounded-lg bg-black text-white text-[10px] font-bold hover:bg-black/90 transition-colors inline-block"
            >
              Strategic Support
            </a>
          </div>
        )}
      </aside>

      {/* ── MOBILE DRAWER SIDEBAR ── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          
          {/* Menu Panel */}
          <aside className="relative w-64 bg-white h-full flex flex-col z-10 border-r border-neutral-200 animate-slide-right">
            <div className="h-16 border-b flex items-center justify-between px-5">
              <div className="flex items-center">
                <img src={GOCLogo} alt="GOC Logo" className="h-8 w-auto filter brightness-0" />
              </div>
              <button onClick={() => setMobileSidebarOpen(false)} className="text-neutral-500 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 py-6 px-4 space-y-1.5 overflow-y-auto">
              {navItems.map((item) => {
                const active = location.pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-xl transition-all ${
                      active 
                        ? "bg-[#d1f8ff]/50 text-black font-black" 
                        : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                    }`}
                  >
                    <div className={active ? "text-black" : "text-neutral-450"}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">{item.label}</p>
                      <p className="text-[9px] text-neutral-400 mt-0.5 leading-none">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Support Box */}
            <div className="p-4 m-4 rounded-2xl bg-[#d1f8ff]/25 border border-black/5 text-center flex flex-col items-center">
              <PhoneCall size={16} className="text-black mb-2" />
              <h4 className="text-[11px] font-black text-black">Strategic Support</h4>
              <p className="text-[9px] text-neutral-500 mt-0.5">Vishesh & Ashish are 24/7 active</p>
              <a href="tel:+919876543210" className="mt-2.5 w-full py-1.5 bg-black text-white text-[10px] font-black rounded-lg">Call Founder</a>
            </div>
          </aside>
        </div>
      )}

      {/* ── MAIN CONTENT WORKSPACE ── */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* TOP NAVBAR HEADER */}
        <header className="h-16 bg-white border-b border-neutral-200/60 flex items-center justify-between px-6 sticky top-0 z-20">
          
          {/* Breadcrumb / Toggle block */}
          <div className="flex items-center gap-4">
            {/* Desktop Collapse button */}
            <button 
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex w-8 h-8 rounded-lg items-center justify-center border border-neutral-200 hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors focus:outline-none"
            >
              <ArrowLeft size={14} className={`transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
            
            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center border border-neutral-200 hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors"
            >
              <Menu size={16} />
            </button>

            {/* Path details */}
            <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
              <span>Creator</span>
              <ChevronRight size={10} className="text-neutral-350" />
              <span className="text-black font-extrabold">{getPageTitle()}</span>
            </div>
          </div>

          {/* Right Header Toolbar options */}
          <div className="flex items-center gap-3">

            {/* Notifications Alert Center */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-50 transition-colors relative focus:outline-none"
              >
                <Bell size={14} />
                {hasUnread && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-neutral-200 bg-white p-3 shadow-2xl z-50 animate-fade-in">
                  <div className="flex items-center justify-between border-b pb-2 mb-2">
                    <span className="text-xs font-extrabold text-black">Notifications</span>
                    <button className="text-[10px] font-bold text-neutral-400 hover:text-black">Mark all read</button>
                  </div>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-lg text-[10px] text-left transition-colors cursor-pointer ${n.unread ? "bg-[#d1f8ff]/20 font-bold" : "hover:bg-neutral-50"}`}>
                        <p className="text-black/85 leading-tight">{n.text}</p>
                        <span className="text-[8px] text-neutral-400 block mt-1 font-semibold">{n.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Card */}
            <div className="relative">
              <button 
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-2 px-2 py-1 border border-neutral-200/80 rounded-full hover:bg-neutral-50 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center font-black text-xs text-[#d1f8ff] shadow-sm">
                  {currentAccount.avatar}
                </div>
                <div className="text-left hidden lg:block pr-1">
                  <p className="text-[10px] font-black leading-none text-black">{currentAccount.name}</p>
                  <span className="text-[8px] font-extrabold tracking-wider bg-[#d1f8ff] text-black border border-black/10 px-1.5 py-0.2 rounded mt-0.5 inline-block uppercase leading-none">
                    {currentAccount.handle}
                  </span>
                </div>
                <ChevronDown size={11} className="text-neutral-450 hidden lg:block" />
              </button>
            </div>

          </div>
        </header>

        {/* WORKSPACE VIEW CONTENT SCROLL CONTAINER */}
        <main className="flex-1 overflow-y-auto">
          <Outlet context={{ activeAccount, setActiveAccount }} />
        </main>
      </div>

      {/* ── RIGHT PROFILE DRAWER ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />
          
          {/* Panel */}
          <aside className="relative w-80 sm:w-96 bg-white h-full shadow-2xl z-10 border-l border-neutral-200/80 flex flex-col justify-between animate-slide-left p-6 text-left">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
                <h3 className="text-sm font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Creator Profile
                </h3>
                <button 
                  onClick={() => setDrawerOpen(false)} 
                  className="w-8 h-8 rounded-lg border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Profile Card */}
              <div className="p-4 rounded-2xl bg-[#d1f8ff]/20 border border-neutral-200/60 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-black text-[#d1f8ff] flex items-center justify-center font-black text-lg shadow-md border border-black/10">
                  {currentAccount.avatar}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-black text-black leading-none">{currentAccount.name}</h4>
                  <p className="text-[10px] text-neutral-500 font-bold mt-1.5">{currentAccount.handle}</p>
                  <p className="text-[9px] text-neutral-450 mt-0.5 truncate">{currentAccount.email}</p>
                </div>
              </div>

              {/* Current Standing Statistics in Drawer */}
              <div className="border border-neutral-200/80 rounded-2xl p-4 space-y-3.5">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-neutral-400">Trust Score</span>
                  <span className="text-emerald-600">100 / 100 (Excellent)</span>
                </div>
                <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: "100%" }} />
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1 text-[9px] font-semibold text-neutral-400">
                  <div>
                    <p>Total Winnings</p>
                    <p className="text-black font-extrabold mt-0.5">${totalEarningsVal.toFixed(2)}</p>
                  </div>
                  <div>
                    <p>GOC Coins</p>
                    <p className="text-black font-extrabold mt-0.5">{coins}</p>
                  </div>
                </div>
              </div>

              {/* Action items */}
              <div className="space-y-1">
                <button 
                  onClick={() => {
                    setDrawerOpen(false);
                    setSwitcherOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-all text-xs font-bold text-neutral-700 hover:text-black cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <RefreshCw size={14} className="text-neutral-450" />
                    Switch Creator Account
                  </span>
                  <span className="text-[9px] bg-neutral-100 text-neutral-500 border border-neutral-200/60 px-2 py-0.5 rounded-md font-extrabold">
                    {currentAccount.handle}
                  </span>
                </button>

                <Link 
                  to="/creator/settings" 
                  onClick={() => setDrawerOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl hover:bg-neutral-50 transition-all text-xs font-bold text-neutral-700 hover:text-black text-left"
                >
                  <Settings size={14} className="text-neutral-450" />
                  Edit Profile Information
                </Link>

                <Link 
                  to="/creator/wallet" 
                  onClick={() => setDrawerOpen(false)}
                  className="w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl hover:bg-neutral-50 transition-all text-xs font-bold text-neutral-700 hover:text-black text-left"
                >
                  <Wallet size={14} className="text-neutral-450" />
                  View Wallet Balance
                </Link>
              </div>
            </div>

            {/* Bottom logout block */}
            <div className="border-t border-neutral-100 pt-4">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-all rounded-xl text-xs font-extrabold cursor-pointer border border-red-200/45"
              >
                <LogOut size={13} />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── ACCOUNT SWITCHER MODAL ── */}
      {switcherOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in"
          onClick={() => setSwitcherOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl border border-neutral-200 w-full max-w-md p-6 text-left space-y-6 shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                  Switch Creator Account
                </h3>
                <p className="text-[10px] text-neutral-450 font-semibold mt-0.5">Select the active identity you want to represent.</p>
              </div>
              <button 
                onClick={() => setSwitcherOpen(false)} 
                className="w-8 h-8 rounded-lg border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Accounts List */}
            <div className="space-y-3">
              {accounts.map((acc) => {
                const isActive = activeAccount === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => {
                      handleSelectAccount(acc.id);
                      setSwitcherOpen(false);
                      setDrawerOpen(true);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-4 group cursor-pointer ${
                      isActive 
                        ? "bg-[#d1f8ff]/25 border-black shadow-sm" 
                        : "bg-white border-neutral-200 hover:border-black/50 hover:bg-neutral-50/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-md transition-all ${
                        isActive 
                          ? "bg-black text-[#d1f8ff]" 
                          : "bg-neutral-100 text-neutral-500 group-hover:bg-black group-hover:text-white"
                      }`}>
                        {acc.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-black flex items-center gap-1.5">
                          {acc.name}
                          {isActive && (
                            <span className="text-[8px] bg-black text-white px-1.5 py-0.2 rounded font-extrabold uppercase leading-none">
                              Active
                            </span>
                          )}
                        </h4>
                        <p className="text-[10px] text-neutral-550 font-extrabold mt-1">{acc.handle}</p>
                        <p className="text-[9px] text-neutral-400 mt-0.5 leading-none font-medium">{acc.desc}</p>
                      </div>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                      isActive 
                        ? "bg-black border-black text-[#d1f8ff]" 
                        : "border-neutral-300 text-transparent group-hover:border-black"
                    }`}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Add New Account Button */}
            <div className="border-t border-neutral-100 pt-4">
              <button
                onClick={() => {
                  alert("Add New Account features are mocked for this simulation.");
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-black text-white hover:bg-black/90 rounded-2xl text-xs font-extrabold transition-colors shadow-sm cursor-pointer"
              >
                <Plus size={14} className="text-[#d1f8ff]" />
                Add New Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide / Fade style helpers */}
      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slide-left {
          animation: slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
