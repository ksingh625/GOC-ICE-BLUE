import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router";
import GOCLogo from "../../../imports/GOC-Logo.png";
import { 
  LayoutDashboard, Trophy, Rocket, Wallet, Settings, 
  PhoneCall, Bell, ChevronDown, LogOut, 
  Compass, FileCheck, ChevronRight, Menu, X, ArrowLeft,
  Plus, RefreshCw, Check, Flame, BarChart2, CreditCard,
  Video
} from "lucide-react";

export default function BrandDashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [activeAccount, setActiveAccount] = useState("brand_nova");
  
  const navigate = useNavigate();
  const location = useLocation();
  const notifRef = useRef<HTMLDivElement>(null);

  const accounts = [
    { 
      id: "brand_nova", 
      handle: "@novasport", 
      name: "NovaSport", 
      email: "marketing@novasport.com", 
      avatar: "N", 
      desc: "Primary Athletics Brand", 
    },
    { 
      id: "brand_lumina", 
      handle: "@lumina", 
      name: "Lumina", 
      email: "hello@lumina.co", 
      avatar: "L", 
      desc: "Secondary Lifestyle Brand", 
    }
  ];

  const currentAccount = accounts.find(acc => acc.id === activeAccount) || accounts[0];

  const notifications = [
    { id: 1, text: "Your 'Summer Vibes' campaign is now live!", time: "2h ago", unread: true },
    { id: 2, text: "New high-quality submissions for your latest campaign.", time: "5h ago", unread: true },
    { id: 3, text: "Wallet top-up successful: $10,000 added.", time: "1 day ago", unread: false },
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

  const handleSelectAccount = (id: string) => {
    setActiveAccount(id);
  };

  const navItems = [
    { label: "Getting Started", desc: "How it works", href: "/brand/getting-started", icon: <Rocket size={18} /> },
    { label: "Campaigns", desc: "Create/Manage Camp...", href: "/brand/campaigns", icon: <Trophy size={18} /> },
    { label: "Dashboard", desc: "Overview & analytics", href: "/brand/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Analytics", desc: "Performance insights", href: "/brand/analytics", icon: <BarChart2 size={18} /> },
    { label: "Billing & Wallet", desc: "Balance, transactions ...", href: "/brand/billing", icon: <CreditCard size={18} /> },
    { label: "Settings", desc: "Account preferences", href: "/brand/settings", icon: <Settings size={18} /> }
  ];

  const getPageTitle = () => {
    const active = navItems.find(item => location.pathname === item.href);
    return active ? active.label : "Dashboard";
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-black flex font-sans">
      
      {/* ── SIDEBAR (DESKTOP) ── */}
      <aside 
        className={`hidden md:flex flex-col bg-white border-r border-neutral-200/60 transition-all duration-300 relative z-30 sticky top-0 h-screen ${
          sidebarCollapsed ? "w-20" : "w-72"
        }`}
      >
        {/* Logo Section */}
        <div className={`h-16 border-b border-neutral-200/60 flex items-center overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'justify-center px-0' : 'px-5'}`}>
          <Link to="/" className={`flex items-center ${sidebarCollapsed ? 'w-[26px] overflow-hidden justify-start' : 'flex-shrink-0'}`}>
            <img src={GOCLogo} alt="GOC Logo" className={`h-8 w-auto filter brightness-0 ${sidebarCollapsed ? 'max-w-none' : ''}`} />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6 px-4 space-y-3 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname.includes(item.href);
            return (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-full transition-all duration-200 group text-left relative ${
                  active 
                    ? "bg-neutral-100 text-black font-extrabold shadow-none" 
                    : "text-neutral-500 hover:text-black hover:bg-neutral-100"
                }`}
              >

                <div className={`transition-transform duration-200 group-hover:scale-105 ${active ? "text-black" : "text-neutral-400 group-hover:text-black"}`}>
                  {item.icon}
                </div>
                {!sidebarCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold leading-tight">{item.label}</p>
                    <p className={`text-[11px] mt-1 leading-none font-medium truncate transition-colors ${active ? "text-neutral-500 font-medium" : "text-neutral-400 group-hover:text-neutral-500"}`}>
                      {item.desc}
                    </p>
                  </div>
                )}
                {!sidebarCollapsed && !active && (
                  <ChevronRight size={14} className="text-neutral-300 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Support Help Block */}
        {!sidebarCollapsed && (
          <div className="p-5 m-4 rounded-3xl bg-neutral-100 border border-neutral-200/80 flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mb-3 shadow-sm">
              <PhoneCall size={16} className="text-emerald-400" />
            </div>
            <h4 className="text-sm font-black text-black">We're here to help</h4>
            <p className="text-xs text-neutral-500 mt-1 max-w-[180px] leading-relaxed font-semibold">Have doubts about campaigns or billing? Call us.</p>
            <div className="w-full flex flex-col gap-2 mt-4">
              <a 
                href="tel:+919876543210" 
                className="w-full py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-black/90 transition-colors inline-block text-center"
              >
                Book Call with Founder
              </a>
            </div>
          </div>
        )}
      </aside>

      {/* ── MOBILE DRAWER SIDEBAR ── */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)} />
          
          {/* Menu Panel */}
          <aside className="relative w-72 bg-white h-full flex flex-col z-10 border-r border-neutral-200 animate-slide-right">
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
                const active = location.pathname.includes(item.href);
                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3.5 px-3.5 py-3 rounded-full transition-all ${
                      active 
                        ? "bg-neutral-100 text-black font-extrabold" 
                        : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                    }`}
                  >
                    <div className={active ? "text-black" : "text-neutral-450"}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold leading-tight">{item.label}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5 leading-none">{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
            {/* Support Box */}
            <div className="p-4 m-4 rounded-3xl bg-[#d1f8ff]/25 border border-black/5 text-center flex flex-col items-center">
              <PhoneCall size={16} className="text-black mb-2" />
              <h4 className="text-[11px] font-black text-black">Strategic Support</h4>
              <p className="text-[9px] text-neutral-500 mt-0.5">Vishesh & Ashish are 24/7 active</p>
              <a href="tel:+919876543210" className="mt-2.5 w-full py-1.5 bg-black text-white text-[10px] font-black rounded-full text-center">Call Founder</a>
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
              className="hidden md:flex w-8 h-8 rounded-full items-center justify-center border border-neutral-200 hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors focus:outline-none"
            >
              <ArrowLeft size={14} className={`transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`} />
            </button>
            
            {/* Mobile menu trigger */}
            <button 
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center border border-neutral-200 hover:bg-neutral-50 text-neutral-500 hover:text-black transition-colors"
            >
              <Menu size={16} />
            </button>

            {/* Path details */}
            <div className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
              <span>Brand Portal</span>
              <ChevronRight size={14} className="text-neutral-300" />
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
                <div className="absolute right-0 mt-3 w-80 rounded-3xl border border-neutral-200 bg-white p-3 shadow-2xl z-50 animate-fade-in">
                  <div className="flex items-center justify-between border-b pb-2 mb-2">
                    <span className="text-xs font-extrabold text-black">Notifications</span>
                    <button className="text-[10px] font-bold text-neutral-400 hover:text-black">Mark all read</button>
                  </div>
                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-3xl text-[10px] text-left transition-colors cursor-pointer ${n.unread ? "bg-[#d1f8ff]/20 font-bold" : "hover:bg-neutral-50"}`}>
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
                className="flex items-center gap-3 px-3 py-1.5 border border-neutral-200/80 rounded-full hover:bg-neutral-50 transition-colors focus:outline-none cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center font-black text-sm text-white shadow-sm">
                  {currentAccount.avatar}
                </div>
                <div className="text-left hidden lg:block pr-1">
                  <p className="text-xs font-black leading-none text-black flex items-center gap-1">
                    Ashish Singh
                  </p>
                  <span className="text-[8px] font-black tracking-widest text-neutral-500 mt-1 inline-block uppercase leading-none">
                    Brand
                  </span>
                </div>
                <ChevronDown size={14} className="text-neutral-400 hidden lg:block" />
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
                <h3 className="text-lg font-extrabold text-black">
                  Brand Profile
                </h3>
                <button 
                  onClick={() => setDrawerOpen(false)} 
                  className="w-8 h-8 rounded-full border border-neutral-200 hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Profile Card */}
              <div className="p-5 rounded-3xl bg-white border border-neutral-200 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-black text-xl shadow-md border border-black/10">
                  {currentAccount.avatar}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-black text-black leading-none">{currentAccount.name}</h4>
                  <p className="text-xs text-neutral-500 font-bold mt-2">{currentAccount.handle}</p>
                  <p className="text-xs text-neutral-400 mt-1 truncate">{currentAccount.email}</p>
                </div>
              </div>

              {/* Action items */}
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setDrawerOpen(false);
                    setSwitcherOpen(true);
                  }}
                  className="w-full flex items-center justify-between px-4 py-4 rounded-full border border-neutral-200 hover:border-black hover:bg-neutral-50 transition-all text-sm font-bold text-neutral-700 hover:text-black cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <RefreshCw size={16} className="text-neutral-500" />
                    Switch Brand Account
                  </span>
                  <span className="text-xs bg-neutral-100 text-neutral-600 border border-neutral-200 px-2.5 py-1 rounded-full font-extrabold">
                    {currentAccount.handle}
                  </span>
                </button>

                <Link 
                  to="/brand/settings" 
                  onClick={() => setDrawerOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-4 rounded-full hover:bg-neutral-50 transition-all text-sm font-bold text-neutral-700 hover:text-black text-left"
                >
                  <Settings size={16} className="text-neutral-500" />
                  Edit Profile Information
                </Link>

                <Link 
                  to="/brand/billing" 
                  onClick={() => setDrawerOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-4 rounded-full hover:bg-neutral-50 transition-all text-sm font-bold text-neutral-700 hover:text-black text-left"
                >
                  <CreditCard size={16} className="text-neutral-500" />
                  View Billing & Wallet
                </Link>
              </div>
            </div>

            {/* Bottom logout block */}
            <div className="border-t border-neutral-100 pt-6">
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white transition-all rounded-full text-sm font-extrabold cursor-pointer border border-red-200"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </aside>
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
