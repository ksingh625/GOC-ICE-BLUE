import { useState, useEffect } from "react";
import { useNavigate, useOutletContext, Link } from "react-router";
import {
  User, Mail, Phone, Globe, Check, Instagram, Youtube, Camera,
  ChevronDown, Lock, FileText, Share2, Users, Laptop, Smartphone,
  ArrowLeft, Shield, Copy, CheckCircle, AlertTriangle, Bell,
  Trash2, ExternalLink, Eye, EyeOff, ChevronRight
} from "lucide-react";

const NICHES = [
  "Beauty", "Fashion", "Fitness", "Travel", "Tech", "Gaming",
  "Food", "Comedy", "Finance", "Lifestyle", "Wellness", "Education",
];

export default function CreatorSettingsPage() {
  const navigate = useNavigate();
  const context = useOutletContext<{ activeAccount: string }>();
  const activeAccount = context?.activeAccount || "gamer_ash";

  const [view, setView] = useState<"main" | "profile">("main");
  const [toast, setToast] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("socials");

  // Profile fields
  const [name, setName] = useState("Ashish Kumar Singh");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [gender, setGender] = useState("Male");
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Maharashtra");
  const [city, setCity] = useState("Mumbai");
  const [bio, setBio] = useState("UGC video creator specialising in gaming, lifestyle and comedy clips.");
  const [selectedNiches, setSelectedNiches] = useState<string[]>(["Gaming", "Comedy", "Lifestyle"]);

  const handle = activeAccount === "gamer_ash" ? "@gamer_ash" : "@ash_menace";
  const email = activeAccount === "gamer_ash" ? "ksinghash5@gmail.com" : "ashmenace@gmail.com";
  const avatarLetter = activeAccount === "gamer_ash" ? "G" : "M";

  useEffect(() => { setName("Ashish Kumar Singh"); }, [activeAccount]);

  // Social connection state
  const [ytConnected, setYtConnected] = useState(false);
  const [igConnected, setIgConnected] = useState(false);
  const [ttConnected, setTtConnected] = useState(false);

  // Password form
  const [pwdOpen, setPwdOpen] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [copied, setCopied] = useState(false);

  // Notification toggles
  const [notifPayout, setNotifPayout] = useState(true);
  const [notifCampaign, setNotifCampaign] = useState(true);
  const [notifLeader, setNotifLeader] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile saved successfully!");
    setView("main");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyRef = () => {
    navigator.clipboard.writeText(`https://gameofcreators.com/ref/${activeAccount}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    showToast("Referral link copied!");
  };

  const navSections = [
    { id: "socials", label: "Social Accounts", icon: <Globe size={14} /> },
    { id: "account", label: "Account", icon: <User size={14} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={14} /> },
    { id: "security", label: "Security", icon: <Shield size={14} /> },
    { id: "community", label: "Community", icon: <Users size={14} /> },
  ];

  const socials = [
    {
      id: "yt",
      icon: <Youtube size={18} />,
      name: "YouTube",
      desc: "Verify videos and track view metrics",
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
      connected: ytConnected,
      toggle: () => {
        setYtConnected(v => !v);
        showToast(ytConnected ? "YouTube disconnected" : "YouTube connected!");
      },
    },
    {
      id: "ig",
      icon: <Instagram size={18} />,
      name: "Instagram",
      desc: "Connect Business or Creator account",
      iconBg: "bg-pink-50",
      iconColor: "text-pink-500",
      connected: igConnected,
      toggle: () => {
        setIgConnected(v => !v);
        showToast(igConnected ? "Instagram disconnected" : "Instagram connected!");
      },
    },
    {
      id: "tt",
      icon: <Camera size={18} />,
      name: "TikTok",
      desc: "Participate in TikTok campaigns",
      iconBg: "bg-neutral-100",
      iconColor: "text-black",
      connected: ttConnected,
      toggle: () => {
        setTtConnected(v => !v);
        showToast(ttConnected ? "TikTok disconnected" : "TikTok connected!");
      },
    },
  ];

  // ── MAIN SETTINGS VIEW ──────────────────────────────────────────
  if (view === "main") {
    return (
      <div className="p-6 md:p-8 max-w-5xl mx-auto">

        {/* Toast */}
        {toast && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-black text-white text-xs font-bold px-4 py-3 rounded-full shadow-xl animate-fade-in border border-white/10">
            <CheckCircle size={14} className="text-[#d1f8ff]" />
            {toast}
          </div>
        )}

        {/* ── PAGE HEADER ── */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-black">
              Settings
            </h1>
            <p className="text-xs text-neutral-500 font-medium mt-1">
              Manage your account, connections, and preferences.
            </p>
          </div>
          <button
            onClick={() => setView("profile")}
            className="btn-primary-gradient flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black shadow-sm"
          >
            <User size={13} />
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── LEFT NAV ── */}
          <div className="lg:w-52 flex-shrink-0">
            <nav className="bg-white border border-neutral-200/60 rounded-3xl p-2 space-y-0.5 sticky top-4">
              {navSections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-full text-xs font-bold transition-all text-left cursor-pointer ${
                    activeSection === s.id
                      ? "bg-black text-white"
                      : "text-neutral-500 hover:text-black hover:bg-neutral-50"
                  }`}
                >
                  {s.icon}
                  {s.label}
                </button>
              ))}
              <div className="pt-2 border-t border-neutral-100 mt-2">
                <button
                  onClick={() => navigate("/")}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-full text-xs font-bold text-red-500 hover:bg-red-50 transition-all text-left cursor-pointer"
                >
                  <Trash2 size={14} />
                  Log Out
                </button>
              </div>
            </nav>
          </div>

          {/* ── RIGHT CONTENT ── */}
          <div className="flex-1 space-y-5">

            {/* PROFILE CARD */}
            <div className="bg-white border border-neutral-200/60 rounded-3xl p-5 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-black text-[#d1f8ff] flex items-center justify-center font-black text-xl shadow-md flex-shrink-0">
                {avatarLetter}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-black text-black">{name}</h3>
                <p className="text-xs text-neutral-500 mt-0.5">{email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-black bg-[#d1f8ff] border border-black/10 text-black px-2 py-0.5 rounded-full uppercase tracking-wide">{handle}</span>
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">Trust Score: 100%</span>
                </div>
              </div>
              <button
                onClick={() => setView("profile")}
                className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-neutral-500 hover:text-black transition-colors"
              >
                Edit <ChevronRight size={13} />
              </button>
            </div>

            {/* ── SOCIALS ── */}
            {activeSection === "socials" && (
              <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 space-y-4">
                <div className="mb-2">
                  <h2 className="text-sm font-black text-black">Social Accounts</h2>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Connect your channels to participate in campaigns and verify views.</p>
                </div>

                {socials.map((s) => (
                  <div key={s.id} className={`flex items-center justify-between p-4 rounded-3xl border transition-all ${s.connected ? "border-black bg-black/[0.02]" : "border-neutral-200"}`}>
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-full ${s.iconBg} ${s.iconColor} flex items-center justify-center flex-shrink-0 border border-neutral-200/60`}>
                        {s.icon}
                      </div>
                      <div>
                        <p className="text-xs font-black text-black">{s.name}</p>
                        <p className="text-[10px] text-neutral-400 font-medium mt-0.5">{s.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {s.connected && (
                        <span className="hidden sm:flex items-center gap-1 text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle size={9} /> Connected
                        </span>
                      )}
                      <button
                        onClick={s.toggle}
                        className={`px-4 py-2 rounded-full text-[11px] font-bold transition-all border cursor-pointer ${
                          s.connected
                            ? "bg-white text-neutral-600 border-neutral-200 hover:border-red-300 hover:text-red-500"
                            : "bg-black text-white border-black hover:bg-neutral-800"
                        }`}
                      >
                        {s.connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── ACCOUNT ── */}
            {activeSection === "account" && (
              <div className="space-y-4">
                {/* Profile completion */}
                <div className="bg-white border border-neutral-200/60 rounded-3xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-black text-black">Profile Completion</h2>
                    <span className="text-xs font-black text-black">80%</span>
                  </div>
                  <div className="w-full bg-neutral-100 rounded-full h-2 mb-3">
                    <div className="bg-black h-2 rounded-full transition-all duration-700" style={{ width: "80%" }} />
                  </div>
                  <p className="text-[11px] text-neutral-500 mb-4">Add your bio and location to reach 100%.</p>
                  <button
                    onClick={() => setView("profile")}
                    className="btn-primary-gradient px-4 py-2.5 rounded-full text-xs font-black"
                  >
                    Complete Profile
                  </button>
                </div>

                {/* Referral */}
                <div className="bg-white border border-neutral-200/60 rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Share2 size={16} className="text-black" />
                    <h2 className="text-sm font-black text-black">Referral Program</h2>
                  </div>
                  <p className="text-[11px] text-neutral-500 mb-4">Earn <strong className="text-black">200 GOC coins</strong> for every creator you refer who completes their first submission.</p>
                  <div className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-full px-4 py-3">
                    <p className="flex-1 text-xs font-semibold text-neutral-600 truncate font-mono">
                      gameofcreators.com/ref/{activeAccount}
                    </p>
                    <button
                      onClick={copyRef}
                      className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 rounded-full text-[10px] font-bold hover:bg-neutral-800 transition-colors cursor-pointer flex-shrink-0"
                    >
                      {copied ? <Check size={11} /> : <Copy size={11} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>

                {/* Quick links */}
                <div className="bg-white border border-neutral-200/60 rounded-3xl overflow-hidden">
                  {[
                    { label: "Terms of Service", to: "/terms", icon: <FileText size={14} /> },
                    { label: "Privacy Policy", to: "/privacy", icon: <Shield size={14} /> },
                    { label: "Help & Support", to: "/contact", icon: <ExternalLink size={14} /> },
                  ].map((item, i) => (
                    <Link
                      key={i}
                      to={item.to}
                      className="flex items-center justify-between px-5 py-4 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0"
                    >
                      <div className="flex items-center gap-2.5 text-xs font-bold text-neutral-700">
                        {item.icon}
                        {item.label}
                      </div>
                      <ChevronRight size={13} className="text-neutral-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeSection === "notifications" && (
              <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 space-y-4">
                <h2 className="text-sm font-black text-black mb-2">Notification Preferences</h2>

                {[
                  { label: "Payout & Wallet Alerts", desc: "Get notified when earnings are verified or withdrawn.", state: notifPayout, set: setNotifPayout },
                  { label: "New Campaign Alerts", desc: "Discover campaigns that match your niche.", state: notifCampaign, set: setNotifCampaign },
                  { label: "Leaderboard Updates", desc: "See your rank change in real-time.", state: notifLeader, set: setNotifLeader },
                ].map((n, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-neutral-50/50 border border-neutral-100 rounded-3xl">
                    <div>
                      <p className="text-xs font-bold text-black">{n.label}</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">{n.desc}</p>
                    </div>
                    {/* Toggle switch */}
                    <button
                      onClick={() => n.set(!n.state)}
                      className={`relative w-11 h-6 rounded-full transition-all cursor-pointer flex-shrink-0 border ${
                        n.state ? "bg-black border-black" : "bg-neutral-200 border-neutral-300"
                      }`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${n.state ? "translate-x-5" : "translate-x-0"}`} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ── SECURITY ── */}
            {activeSection === "security" && (
              <div className="space-y-4">
                {/* Change password */}
                <div className="bg-white border border-neutral-200/60 rounded-3xl p-6">
                  <button
                    onClick={() => setPwdOpen(!pwdOpen)}
                    className="w-full flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                        <Lock size={14} className="text-black" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black text-black">Change Password</p>
                        <p className="text-[10px] text-neutral-500">Last changed 30 days ago</p>
                      </div>
                    </div>
                    <ChevronDown size={14} className={`text-neutral-400 transition-transform duration-200 ${pwdOpen ? "rotate-180" : ""}`} />
                  </button>

                  {pwdOpen && (
                    <div className="mt-5 pt-4 border-t border-neutral-100 space-y-3 max-w-sm">
                      <div className="relative">
                        <input
                          type={showPwd ? "text" : "password"}
                          placeholder="Current password"
                          className="w-full px-4 py-2.5 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black bg-neutral-50/30 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwd(!showPwd)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                        >
                          {showPwd ? <EyeOff size={13} /> : <Eye size={13} />}
                        </button>
                      </div>
                      <input type="password" placeholder="New password" className="w-full px-4 py-2.5 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black bg-neutral-50/30" />
                      <input type="password" placeholder="Confirm new password" className="w-full px-4 py-2.5 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black bg-neutral-50/30" />
                      <button
                        onClick={() => { showToast("Password updated!"); setPwdOpen(false); }}
                        className="bg-black text-white px-5 py-2.5 rounded-full text-xs font-black hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        Update Password
                      </button>
                    </div>
                  )}
                </div>

                {/* Active Sessions */}
                <div className="bg-white border border-neutral-200/60 rounded-3xl p-6">
                  <h2 className="text-sm font-black text-black mb-4">Active Sessions</h2>
                  <div className="space-y-2">
                    {[
                      { icon: <Laptop size={14} />, label: "Chrome · Windows 10", sub: "Active now · 152.58.107.72", active: true },
                      { icon: <Smartphone size={14} />, label: "Safari · iPhone 15", sub: "2 days ago", active: false },
                    ].map((sess, i) => (
                      <div key={i} className={`flex items-center gap-3 p-3.5 rounded-3xl border ${sess.active ? "border-black bg-black/[0.02]" : "border-neutral-200"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${sess.active ? "bg-black text-white" : "bg-neutral-100 text-neutral-500"}`}>
                          {sess.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-black truncate">{sess.label}</p>
                          <p className="text-[9px] text-neutral-400 mt-0.5">{sess.sub}</p>
                        </div>
                        {sess.active && <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex-shrink-0">This device</span>}
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => showToast("All other sessions signed out.")}
                    className="mt-4 px-4 py-2.5 bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 rounded-full text-xs font-bold transition-colors cursor-pointer"
                  >
                    Sign out other sessions
                  </button>
                </div>

                {/* Danger Zone */}
                <div className="bg-white border border-red-200/60 rounded-3xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={15} className="text-red-500" />
                    <h2 className="text-sm font-black text-red-500">Danger Zone</h2>
                  </div>
                  <p className="text-[11px] text-neutral-500 mb-4">Deleting your account is permanent and cannot be undone. All your data, earnings, and submissions will be removed.</p>
                  <button className="px-4 py-2.5 border border-red-300 text-red-500 hover:bg-red-500 hover:text-white rounded-full text-xs font-black transition-all cursor-pointer">
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* ── COMMUNITY ── */}
            {activeSection === "community" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Users size={18} />,
                      name: "Discord Community",
                      desc: "Get updates, support, and exclusive bonus codes from the GOC team.",
                      href: "https://discord.gg/goc",
                      bg: "bg-indigo-50",
                      btnColor: "bg-indigo-600 hover:bg-indigo-700 text-white",
                      label: "Join Discord",
                    },
                    {
                      icon: <Phone size={18} />,
                      name: "WhatsApp Group",
                      desc: "Get fast updates and connect with other creators in your niche.",
                      href: "https://wa.me/goc",
                      bg: "bg-emerald-50",
                      btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
                      label: "Join WhatsApp",
                    },
                  ].map((c, i) => (
                    <div key={i} className={`${c.bg} border border-neutral-200/60 rounded-3xl p-6`}>
                      <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center mb-4 shadow-sm text-black">
                        {c.icon}
                      </div>
                      <h3 className="text-sm font-black text-black">{c.name}</h3>
                      <p className="text-[11px] text-neutral-500 mt-1.5 mb-4 leading-relaxed">{c.desc}</p>
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-black transition-colors ${c.btnColor}`}
                      >
                        {c.label} <ExternalLink size={11} />
                      </a>
                    </div>
                  ))}
                </div>

                <div className="bg-white border border-neutral-200/60 rounded-3xl p-6">
                  <h3 className="text-sm font-black text-black mb-4">Need Help?</h3>
                  <p className="text-[11px] text-neutral-500 mb-4">Our founders Vishesh & Ashish are personally available for strategic creator support.</p>
                  <a href="tel:+919876543210" className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-full text-xs font-black hover:bg-neutral-800 transition-colors">
                    📞 Call Founder Support
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    );
  }

  // ── PROFILE EDIT VIEW ────────────────────────────────────────────
  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">

      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-black text-white text-xs font-bold px-4 py-3 rounded-full shadow-xl animate-fade-in border border-white/10">
          <CheckCircle size={14} className="text-[#d1f8ff]" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => setView("main")}
          className="w-9 h-9 rounded-full border border-neutral-200 hover:bg-neutral-50 flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
        </button>
        <div>
          <h1 className="text-xl font-black text-black">
            Edit Profile
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">Your public creator information on Game of Creators.</p>
        </div>
      </div>

      {/* Trust score banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-full px-5 py-4 flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
            <Shield size={15} className="text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-emerald-700">Trust Score: 100 / 100</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Excellent standing · 0 violations</p>
          </div>
        </div>
        <span className="text-[9px] font-black bg-emerald-500 text-white px-2.5 py-1 rounded-full uppercase">Verified</span>
      </div>

      <form onSubmit={handleSave} className="space-y-5">

        {/* Avatar + identity (read only) */}
        <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-black text-[#d1f8ff] flex items-center justify-center font-black text-2xl shadow-lg flex-shrink-0">
            {avatarLetter}
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Username</label>
              <div className="px-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-500">
                {handle.replace("@", "")}
              </div>
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Account Type</label>
              <div className="px-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-full text-xs font-semibold text-neutral-500">
                Creator
              </div>
            </div>
          </div>
        </div>

        {/* Personal info */}
        <div className="bg-white border border-neutral-200/60 rounded-3xl p-6 space-y-4">
          <h3 className="text-sm font-black text-black">Personal Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-2.5 bg-neutral-100 border border-neutral-200 rounded-full text-xs text-neutral-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black bg-white"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Country", val: country, set: setCountry, placeholder: "India" },
              { label: "State", val: state, set: setState, placeholder: "Maharashtra" },
              { label: "City", val: city, set: setCity, placeholder: "Mumbai" },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">{f.label}</label>
                <input
                  type="text"
                  value={f.val}
                  onChange={e => f.set(e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full px-4 py-2.5 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-[9px] font-black uppercase tracking-widest text-neutral-400 mb-1.5">Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black resize-none"
            />
          </div>
        </div>

        {/* Niche tags */}
        <div className="bg-white border border-neutral-200/60 rounded-3xl p-6">
          <h3 className="text-sm font-black text-black mb-1">Content Niches</h3>
          <p className="text-[11px] text-neutral-500 mb-4">Select your content categories so brands can discover you.</p>
          <div className="flex flex-wrap gap-2">
            {NICHES.map(n => {
              const active = selectedNiches.includes(n);
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSelectedNiches(prev => prev.includes(n) ? prev.filter(x => x !== n) : [...prev, n])}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    active ? "bg-black text-white border-black" : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  {active && <Check size={11} strokeWidth={3} />}
                  {n}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full btn-primary-gradient py-4 rounded-full text-sm font-black shadow-sm hover:opacity-90 transition-opacity"
        >
          Save Profile Changes
        </button>

      </form>
    </div>
  );
}

