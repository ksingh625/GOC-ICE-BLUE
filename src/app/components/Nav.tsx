import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import GOCLogo from "../../imports/GOC-Logo.png";
import { gsap } from "gsap";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavProps {
  onBrowse?: () => void;
  onHome?: () => void;
  solid?: boolean;
  theme?: "light" | "dark";
  showProfile?: boolean;
}

export function Nav({
  solid = false,
  theme = "light",
  showProfile = false,
}: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  const isSolid = solid || scrolled;
  const isDark = theme === "dark";

  // Navigation Links
  const navItems = [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Creators", href: "/creators" },
    { label: "Brands", href: "/brands" },
    { label: "Campaigns", href: "/campaigns" },
    { label: "Blog", href: "/blogs" },
    { label: "Pricing", href: "/pricing" },
  ];

  // Check if item is active
  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  // Determine signup/login target based on path
  const isCreatorFlow = location.pathname.startsWith("/creators") || location.pathname.startsWith("/join-creator");
  const loginTarget = isCreatorFlow ? "/login?role=creator" : "/login?role=brand";
  const signupTarget = isCreatorFlow ? "/signup?role=creator" : "/signup?role=brand";
  const signUpLabel = isCreatorFlow ? "Start Creating" : "Sign Up";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isSolid
          ? isDark
            ? "rgba(10, 10, 36, 0.95)"
            : "rgba(255, 255, 255, 0.95)"
          : "transparent",
        backdropFilter: isSolid ? "blur(20px)" : "none",
        borderBottom: isSolid
          ? isDark
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.08)"
          : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center group focus:outline-none">
          <img
            src={GOCLogo}
            alt="Game of Creators"
            className="transition-all duration-200 group-hover:opacity-90"
            style={{
              height: 36,
              width: "auto",
              filter: isDark && !isSolid ? "none" : isDark ? "none" : "brightness(0)",
              cursor: "pointer",
            }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const activeColor = isDark ? "#ffffff" : "#000000";
            const inactiveColor = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)";

            return (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium relative group"
                style={{
                  color: active ? activeColor : inactiveColor,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = activeColor)}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = active ? activeColor : inactiveColor)
                }
              >
                {item.label}
                <span
                  className="absolute -bottom-0.5 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: activeColor }}
                />
              </Link>
            );
          })}
        </div>

        {/* Action Buttons / Profile */}
        <div className="hidden md:flex items-center gap-3">
          {showProfile ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
                  isDark
                    ? "border-white/15 bg-white/5 hover:bg-white/10 text-white"
                    : "border-black/15 bg-black/5 hover:bg-black/10 text-black"
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs text-white">
                  AS
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-xs font-bold leading-none">Ashish Singh</p>
                  <p className={`text-[10px] ${isDark ? "text-white/50" : "text-black/50"}`}>
                    ashish332@gmail.com
                  </p>
                </div>
                <ChevronDown size={14} className="opacity-55" />
              </button>

              {profileOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-3xl border p-2 shadow-2xl z-50 backdrop-blur-md ${
                    isDark
                      ? "bg-slate-900/95 border-white/10 text-white"
                      : "bg-white/95 border-black/10 text-black"
                  }`}
                >
                  <Link
                    to="/get-started"
                    onClick={() => setProfileOpen(false)}
                    className="block w-full text-left px-4 py-2 text-xs font-semibold rounded-full hover:bg-white/5 transition-colors"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/campaigns"
                    onClick={() => setProfileOpen(false)}
                    className="block w-full text-left px-4 py-2 text-xs font-semibold rounded-full hover:bg-white/5 transition-colors"
                  >
                    Campaigns
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={() => setProfileOpen(false)}
                    className="block w-full text-left px-4 py-2 text-xs font-semibold rounded-full hover:bg-white/5 transition-colors text-purple-400"
                  >
                    Billing & Pricing
                  </Link>
                  <hr className={`my-1 ${isDark ? "border-white/10" : "border-black/10"}`} />
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("/");
                    }}
                    className="block w-full text-left px-4 py-2 text-xs font-semibold rounded-full hover:bg-red-500/10 text-red-400 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to={loginTarget}
                className={
                  isDark
                    ? "btn-secondary-dark px-5 py-2 text-sm rounded-full text-white"
                    : "btn-secondary-dark px-5 py-2 text-sm rounded-full"
                }
              >
                Login
              </Link>
              <Link to={signupTarget} className="btn-primary-gradient px-5 py-2 text-sm rounded-full">
                {signUpLabel}
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className={`md:hidden ${isDark ? "text-white" : "text-black"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{
            background: isDark ? "rgba(10, 10, 36, 0.98)" : "rgba(209, 248, 255, 0.98)",
            borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium ${isDark ? "text-white/70" : "text-black/70"}`}
            >
              {item.label}
            </Link>
          ))}
          {showProfile ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <Link
                to="/get-started"
                onClick={() => setMobileOpen(false)}
                className={`text-xs font-semibold ${isDark ? "text-white" : "text-black"}`}
              >
                My Profile
              </Link>
              <Link
                to="/campaigns"
                onClick={() => setMobileOpen(false)}
                className={`text-xs font-semibold ${isDark ? "text-white" : "text-black"}`}
              >
                Campaigns
              </Link>
              <Link
                to="/pricing"
                onClick={() => setMobileOpen(false)}
                className="text-xs font-semibold text-purple-400"
              >
                Billing & Pricing
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/");
                }}
                className="text-xs font-semibold text-red-400 text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link
                to={loginTarget}
                onClick={() => setMobileOpen(false)}
                className="btn-secondary-dark flex-1 py-2.5 text-sm rounded-full text-center"
              >
                Login
              </Link>
              <Link
                to={signupTarget}
                onClick={() => setMobileOpen(false)}
                className="btn-primary-gradient flex-1 py-2.5 text-sm rounded-full text-center"
              >
                {signUpLabel}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
