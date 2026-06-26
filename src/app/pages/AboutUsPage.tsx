import { useEffect } from "react";
import { Nav, Footer } from "../App";
import { Users, Trophy, DollarSign, Star, Target, Shield, Heart } from "lucide-react";

export default function AboutUsPage() {
  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { label: "Active UGC Creators", val: "8,000+", icon: <Users size={20} className="text-purple-500" /> },
    { label: "Creator Prizes Paid", val: "$2.1M", icon: <DollarSign size={20} className="text-emerald-500" /> },
    { label: "Campaigns Completed", val: "500+", icon: <Trophy size={20} className="text-amber-500" /> },
    { label: "Creator Content Licensed", val: "15K+", icon: <Target size={20} className="text-blue-500" /> },
  ];

  const team = [
    { name: "Vishesh", role: "Founder & CEO", desc: "Passionate about content creator equity and gamifying business marketing.", avatar: "V" },
    { name: "Priya Rao", role: "Head of Creator Community", desc: "Fosters creator onboarding, support services, and live brief challenges.", avatar: "P" },
    { name: "Ashish Singh", role: "Product Development Lead", desc: "Oversees features engineering, platform dashboards, and ads API integrations.", avatar: "AS" },
  ];

  return (
    <div className="min-h-screen bg-white text-black">

      <Nav solid={true} />

      {/* HERO */}
      <section className="pt-28 pb-20 px-6 text-center bg-gradient-to-b from-[#f0fafd] to-white relative">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#d1f8ff] text-black border border-black/5 mb-6">
            Our Mission & Story
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
            Democratising Creator Deals
          </h1>
          <p className="text-base md:text-lg text-black/60 max-w-xl mx-auto font-medium" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Game of Creators is built to break down gates. We make campaign opportunities accessible to every creator based on quality, while providing brands with performance-validated UGC at scale.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl border border-neutral-100 bg-neutral-50/50 text-center shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-neutral-100 mx-auto mb-4">
                {s.icon}
              </div>
              <p className="text-3xl font-black text-black mb-1" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{s.val}</p>
              <p className="text-xs text-neutral-500 font-semibold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-neutral-100 mt-12 text-left">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>What We Stand For</h2>
          <p className="text-xs text-neutral-500 mt-2">The principles that guide our everyday development</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Merit-Driven Success", desc: "No gatekeeping. Creators earn based on actual submission performance and quality, not follower counts or status.", icon: <Star size={20} className="text-purple-500" /> },
            { title: "Secure Payout Protection", desc: "Prize budgets are escrowed up front, ensuring creators always receive guaranteed payment for won contests.", icon: <Shield size={20} className="text-emerald-500" /> },
            { title: "Creative Freedom", desc: "We provide rules and requirements, but trust creator ingenuity to tell authentic, viral stories for brands.", icon: <Heart size={20} className="text-pink-500" /> }
          ].map((v, i) => (
            <div key={i} className="p-6 rounded-2xl border border-neutral-150 shadow-sm space-y-4">
              <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 w-fit">{v.icon}</div>
              <h3 className="text-lg font-black text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{v.title}</h3>
              <p className="text-xs text-neutral-500 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto border-t border-neutral-100 text-left">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Meet GOC Builders</h2>
          <p className="text-xs text-neutral-500 mt-2">The team engineering the future of gamified marketing</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((t, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-neutral-100 bg-[#fafafa] flex flex-col justify-between shadow-sm">
              <div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center font-bold text-sm mb-4">
                  {t.avatar}
                </div>
                <h3 className="text-base font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>{t.name}</h3>
                <p className="text-[10px] text-purple-600 font-extrabold uppercase tracking-wider mb-3">{t.role}</p>
                <p className="text-xs text-neutral-500 leading-relaxed font-medium">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />

    </div>
  );
}
