import { Link } from "react-router";
import GOCLogo from "../../imports/GOC-Logo.png";
import { Instagram, Youtube, Twitter, MessageSquare } from "lucide-react";

interface FooterProps {
  theme?: "light" | "dark";
}

export function Footer({ theme = "light" }: FooterProps) {
  const isDark = theme === "dark";

  const cols = [
    { heading: "Platform", links: ["How It Works", "For Brands", "For Creators", "Campaigns", "Pricing"] },
    { heading: "Company", links: ["About Us", "Blog", "Careers", "Press", "Contact"] },
    { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Creator Agreement"] },
  ];

  const linkMap: Record<string, string> = {
    "How It Works": "/how-it-works",
    "For Brands": "/brands",
    "For Creators": "/creators",
    "Campaigns": "/campaigns",
    "Pricing": "/pricing",
    "About Us": "/about",
    "Blog": "/blogs",
    "Careers": "/jobs",
    "Press": "/about",
    "Contact": "/contact",
    "Privacy Policy": "/privacy",
    "Terms of Service": "/terms",
    "Cookie Policy": "/privacy",
    "Creator Agreement": "/terms"
  };

  const socials = [
    { Icon: Instagram, href: "#" },
    { Icon: Youtube, href: "#" },
    { Icon: isDark ? MessageSquare : Twitter, href: "#" }
  ];

  return (
    <footer 
      className="py-24 px-8 border-t transition-colors duration-500" 
      style={{ 
        background: isDark 
          ? "linear-gradient(180deg, rgba(3,3,18,0.5) 0%, rgba(1,1,7,0.9) 100%)" 
          : "linear-gradient(180deg, #ffffff 0%, #f0fcff 100%)",
        borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.08)"
      }}
    >
      <div className="max-w-6xl mx-auto text-left">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-4">
              <img
                src={GOCLogo}
                alt="Game of Creators"
                style={{ 
                  height: 32, 
                  width: "auto", 
                  filter: isDark ? "none" : "brightness(0)" 
                }}
              />
            </div>
            <p 
              className="text-sm leading-relaxed mb-6 max-w-xs" 
              style={{ 
                color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)", 
                fontFamily: "'DM Sans', sans-serif" 
              }}
            >
              Democratizing creator marketing. Making brand opportunities accessible to everyone, regardless of audience size, location, or background.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, href }, i) => (
                <a 
                  key={i} 
                  href={href}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ 
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", 
                    color: isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)", 
                    border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)" 
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.background = "#d1f8ff"; 
                    e.currentTarget.style.color = "#000000"; 
                    e.currentTarget.style.borderColor = "rgba(0,0,0,0.15)"; 
                    e.currentTarget.style.transform = "translateY(-2px)"; 
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"; 
                    e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"; 
                    e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"; 
                    e.currentTarget.style.transform = "none"; 
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <p 
                className="text-xs font-bold tracking-widest uppercase mb-4" 
                style={{ 
                  color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)", 
                  fontFamily: "'DM Sans', sans-serif" 
                }}
              >
                {heading}
              </p>
              <div className="flex flex-col gap-2.5">
                {links.map((link) => {
                  const href = linkMap[link] || "/";
                  return (
                    <Link 
                      key={link} 
                      to={href} 
                      className="text-sm transition-colors duration-150"
                      style={{ 
                        color: isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)", 
                        fontFamily: "'DM Sans', sans-serif" 
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = isDark ? "#ffffff" : "#000000")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = isDark ? "rgba(255,255,255,0.65)" : "rgba(0,0,0,0.65)")}
                    >
                      {link}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div 
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)" }}
        >
          <p 
            className="text-xs" 
            style={{ 
              color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)", 
              fontFamily: "'DM Sans', sans-serif" 
            }}
          >
            © 2026 Game of Creators. All rights reserved.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors text-[10px] font-extrabold uppercase tracking-wider cursor-pointer"
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              color: isDark ? "#ffffff" : "#000000"
            }}
          >
            Back to Top
            <span className="inline-block transform -rotate-90">→</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
