import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Nav, Footer } from "../App";
import { 
  Mail, MapPin, Send, Check
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">

      <Nav solid={true} />

      {/* BODY */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-16 grid md:grid-cols-5 gap-12 text-left items-start">
        
        {/* Left Column: Details & Map Mockup */}
        <div className="md:col-span-2 space-y-8">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#d1f8ff] text-black border border-black/5 mb-4">
              Get in Touch
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Contact Our Team
            </h1>
            <p className="text-xs text-neutral-500 leading-relaxed mt-2 font-medium">
              Have questions about contest setup, enterprise integrations, or creator guidelines? Drop us a line.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 bg-[#fafafa] p-4 rounded-xl border border-neutral-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-white border border-neutral-100 flex items-center justify-center text-purple-600">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase text-neutral-400">Official Support</p>
                <p className="text-xs font-bold text-black mt-0.5">support@gameofcreators.com</p>
              </div>
            </div>

            <div className="flex gap-3 bg-[#fafafa] p-4 rounded-xl border border-neutral-100 shadow-sm">
              <div className="w-10 h-10 rounded-lg bg-white border border-neutral-100 flex items-center justify-center text-purple-600">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-[10px] font-extrabold uppercase text-neutral-400">Headquarters</p>
                <p className="text-xs font-bold text-black mt-0.5">San Francisco, California, USA</p>
              </div>
            </div>
          </div>

          {/* Dark map mockup */}
          <div className="aspect-[4/3] rounded-3xl bg-neutral-900 border border-neutral-800 p-4 relative overflow-hidden flex flex-col justify-end shadow-lg">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "15px 15px" }} />
            
            {/* Map center indicator */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-purple-500 border border-white relative z-10" />
            </div>

            <div className="relative z-10 bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl text-left">
              <p className="text-[10px] font-extrabold text-white leading-none">Game of Creators SF</p>
              <p className="text-[8px] text-white/50 mt-0.5">Market Street, SF, CA</p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="md:col-span-3 bg-[#fafafa] rounded-3xl border border-neutral-100 p-8 shadow-sm">
          {!success ? (
            <form onSubmit={handleMessageSubmit} className="space-y-5">
              <h2 className="text-xl font-extrabold text-black" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Send us a message</h2>
              
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1.5">Full Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Ashish Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  required
                  placeholder="e.g. ashish@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1.5">Message / Requirements</label>
                <textarea 
                  required
                  placeholder="Write your questions or campaign objectives..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors resize-none bg-white"
                />
              </div>

              <button 
                type="submit"
                className="w-full btn-primary-gradient py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                Send Direct Message
                <Send size={13} />
              </button>
            </form>
          ) : (
            <div className="text-center py-12 space-y-6">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                <Check size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Message Sent!</h2>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
                  Thank you, <strong>{name}</strong>. We've received your request and our support coordinators will get back to you at <strong>{email}</strong> within 12 hours.
                </p>
              </div>
            </div>
          )}
        </div>

      </section>

      <Footer />

    </div>
  );
}
