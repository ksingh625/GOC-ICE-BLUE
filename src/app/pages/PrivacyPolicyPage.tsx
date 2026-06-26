import { useEffect } from "react";
import { Nav, Footer } from "../App";

export default function PrivacyPolicyPage() {
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
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 mb-6">Privacy Policy</p>
          <a href="#introduction" className="block text-xs font-bold text-black hover:text-purple-600 transition-colors">1. Introduction</a>
          <a href="#data-collection" className="block text-xs font-bold text-neutral-500 hover:text-black transition-colors">2. Information We Collect</a>
          <a href="#data-usage" className="block text-xs font-bold text-neutral-500 hover:text-black transition-colors">3. How We Use Data</a>
          <a href="#intellectual-property" className="block text-xs font-bold text-neutral-500 hover:text-black transition-colors">4. UGC Licensing & IP</a>
          <a href="#security" className="block text-xs font-bold text-neutral-500 hover:text-black transition-colors">5. Data Security</a>
        </div>

        {/* Right Content */}
        <div className="md:col-span-3 space-y-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Privacy Policy</h1>
            <p className="text-[10px] text-neutral-400 font-semibold">Last Updated: June 25, 2026</p>
          </div>

          <section id="introduction" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>1. Introduction</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              At Game of Creators ("GOC", "we", "us", or "our"), we value your privacy. This Privacy Policy details how we collect, store, share, and protect information collected from brands, agencies, and content creators using our platform, websites, and associated services.
            </p>
          </section>

          <section id="data-collection" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>2. Information We Collect</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              We collect information to support contest matching, licensing, and transaction security:
            </p>
            <ul className="list-disc list-inside text-xs text-neutral-600 font-medium space-y-2">
              <li><strong>Profile Details:</strong> Names, email addresses, brand names, and social handle authorizations.</li>
              <li><strong>Content Submission Assets:</strong> Video files, descriptions, tags, and organic performance metrics pulled from TikTok, Instagram, or YouTube APIs.</li>
              <li><strong>Payment Data:</strong> Financial details processed securely via Stripe or escrow gateways.</li>
            </ul>
          </section>

          <section id="data-usage" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>3. How We Use Data</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              We use collected information to verify contest submissions, calculate leaderboard standings, distribute payments, transfer intellectual property licenses, and synchronize winning media with linked Meta/TikTok ad accounts.
            </p>
          </section>

          <section id="intellectual-property" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>4. UGC Licensing & IP</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              Content creators retain ownership of their content until a brand chooses to reward and license it. Upon reward distribution, the specified intellectual property rights (perpetual, worldwide usage rights) are transferred legally according to GOC guidelines.
            </p>
          </section>

          <section id="security" className="space-y-3">
            <h2 className="text-lg font-extrabold text-black border-b border-neutral-100 pb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>5. Data Security</h2>
            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              We secure data with standard TLS encryption, secure escrow protocols, and restrict developer access to raw personal details. No credentials are sold or shared for external marketing.
            </p>
          </section>
        </div>
      </div>

      <Footer />

    </div>
  );
}
