import { useEffect } from "react";
import { Nav, Footer } from "../App";

export default function TermsOfServicePage() {
  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black text-left">

      <Nav solid={true} />

      {/* BODY CONTENT */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-4 gap-12">
        {/* Left Sidebar Table of Contents */}
        <div className="hidden md:block space-y-3.5 border-r border-neutral-100 pr-6">
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 mb-6">Terms of Service</p>
          <a href="#acceptance" className="block text-xs font-bold text-black hover:text-purple-600 transition-colors">1. Acceptance of Terms</a>
          <a href="#account" className="block text-xs font-bold text-neutral-500 hover:text-black transition-colors">2. Account Registration</a>
          <a href="#contests" className="block text-xs font-bold text-neutral-500 hover:text-black transition-colors">3. Contest Campaigns</a>
          <a href="#payments" className="block text-xs font-bold text-neutral-500 hover:text-black transition-colors">4. Payments & Escrow</a>
          <a href="#liability" className="block text-xs font-bold text-neutral-500 hover:text-black transition-colors">5. Limitation of Liability</a>
        </div>

        {/* Right Content */}
        <div className="md:col-span-3 space-y-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Terms of Service</h1>
            <p className="text-[10px] text-neutral-400 font-semibold">Last Updated: June 25, 2026</p>
          </div>

          <section id="acceptance" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2">1. Acceptance of Terms</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              By accessing or using the Game of Creators platform, services, or dashboards, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the services.
            </p>
          </section>

          <section id="account" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2">2. Account Registration</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Users must provide true, accurate, and complete information during registration. Content creators must verify social handles using GOC API authentication. Brands must represent legitimate business entities.
            </p>
          </section>

          <section id="contests" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2">3. Contest Campaigns</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Brands establish contest rules, payout budgets, and brief goals. Creators upload entries to compete on standings leaderboards. Low-quality or non-compliant content can be flagged or disqualified by moderators.
            </p>
          </section>

          <section id="payments" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2">4. Payments & Escrow</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Campaign budgets are held in secure escrow. Once a contest finishes and winners are chosen, funds are distributed to creator accounts via Stripe. GOC charges a service commission as detailed in our pricing options.
            </p>
          </section>

          <section id="liability" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2">5. Limitation of Liability</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Game of Creators provides the platform on an "as is" basis. We are not responsible for copyright disputes arising from off-brief music or third-party assets utilized by creators, nor are we liable for organic social network algorithm fluctuations.
            </p>
          </section>
        </div>
      </div>

      <Footer />

    </div>
  );
}
