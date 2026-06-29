import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Nav, Footer } from "../App";
import { 
  Mail, MapPin, Send, Check, ArrowRight
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
    <div className="min-h-screen bg-[#fafafa] text-black">
      <Nav solid={true} />

      <section className="min-h-[85vh] flex items-center pt-28 pb-16 px-6">
        <div className="max-w-6xl mx-auto w-full">
          <div className="bg-white rounded-[2.5rem] border border-neutral-200/60 shadow-[0_8px_40px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row">
            
            {/* LEFT SIDE - Info & Premium Branding */}
            <div className="md:w-5/12 bg-black text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
              {/* Background abstract element */}
              <div className="absolute -top-[20%] -right-[20%] w-[70%] h-[50%] bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-[20%] -left-[20%] w-[70%] h-[50%] bg-white/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase bg-white/10 border border-white/10 mb-6">
                  Contact Us
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                  Let's start a conversation.
                </h1>
                <p className="text-sm text-white/60 leading-relaxed max-w-sm mb-12">
                  Whether you're a brand ready to launch a contest or a creator looking for support, our dedicated team is here to help you scale.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                      <Mail size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Email</p>
                      <p className="text-sm font-semibold">hello@gameofcreators.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                      <MapPin size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Office</p>
                      <p className="text-sm font-semibold">Market Street, San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-16 pt-8 border-t border-white/10">
                <p className="text-xs text-white/40 leading-relaxed">
                  Join the thousands of brands and creators shifting to performance-based gamified marketing.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE - Form */}
            <div className="md:w-7/12 p-10 md:p-16 flex items-center">
              <div className="w-full max-w-lg mx-auto">
                {!success ? (
                  <form onSubmit={handleMessageSubmit} className="space-y-6">
                    <h2 className="text-2xl font-extrabold text-black mb-8">Send a message</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider">Full Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-[#fafafa] hover:bg-white"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="john@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-[#fafafa] hover:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-extrabold uppercase text-neutral-500 tracking-wider">How can we help?</label>
                      <textarea 
                        required
                        placeholder="Tell us about your campaign goals..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3.5 rounded-xl border border-neutral-200 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all resize-none bg-[#fafafa] hover:bg-white"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="btn-primary-gradient w-full py-4 rounded-xl text-sm flex items-center justify-center gap-2 group"
                    >
                      Send Message
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <p className="text-center text-[10px] text-neutral-400 mt-4 font-medium">
                      By submitting, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-6 flex flex-col items-center justify-center h-full">
                    <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center shadow-lg mx-auto">
                      <Check size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-black mb-3">Message Received</h2>
                      <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out, <strong>{name}</strong>. Our team will get back to you at <strong>{email}</strong> within 12-24 hours.
                      </p>
                    </div>
                    <button 
                      onClick={() => setSuccess(false)}
                      className="mt-4 text-xs font-bold text-neutral-500 hover:text-black transition-colors underline underline-offset-4"
                    >
                      Send another message
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
