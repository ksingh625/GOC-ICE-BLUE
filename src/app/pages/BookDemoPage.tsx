import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import GOCLogo from "../../imports/GOC-Logo.png";
import confetti from "canvas-confetti";
import { 
  Calendar as CalendarIcon, Clock, ChevronRight, User, Mail, Globe, 
  TrendingUp, Check, ArrowRight
} from "lucide-react";

export default function BookDemoPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [budget, setBudget] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  const dates = [
    { day: "Mon", num: "29", date: "June 29" },
    { day: "Tue", num: "30", date: "June 30" },
    { day: "Wed", num: "01", date: "July 1" },
    { day: "Thu", num: "02", date: "July 2" },
    { day: "Fri", num: "03", date: "July 3" },
  ];

  const times = [
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM"
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate && selectedTime && name && email) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-black">
      
      {/* HEADER */}
      <nav className="border-b border-neutral-200/60 bg-white px-6 py-4 flex items-center justify-between">
        <Link to="/">
          <img src={GOCLogo} alt="Game of Creators" className="h-8 w-auto filter brightness-0" />
        </Link>
        <Link to="/pricing" className="text-xs font-bold text-neutral-500 hover:text-black">Cancel & Back</Link>
      </nav>

      {/* BODY */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white border border-neutral-200/80 rounded-3xl p-8 md:p-12 shadow-sm grid md:grid-cols-5 gap-12">
          
          {/* Left Column: Founder Greetings & Info */}
          <div className="md:col-span-2 border-r border-neutral-100 pr-6 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm text-white">V</div>
              <div>
                <p className="text-sm font-extrabold text-black">Vishesh</p>
                <p className="text-[10px] text-neutral-400">Founder & CEO, Game of Creators</p>
              </div>
            </div>

            <h1 className="text-2xl font-black mb-3 leading-snug" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Book your 1:1 demo consultation
            </h1>
            <p className="text-xs text-neutral-500 leading-relaxed mb-6 font-medium">
              Find out how to scale your brand library with top-performing UGC videos, establish competitive budget rewards, and license video copyrights instantly.
            </p>

            <div className="space-y-3.5">
              {[
                "15 minutes live unboxing & briefing strategies",
                "Creator leaderboard structure demonstration",
                "Automatic licensing & ads manager syncing details"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <Check size={12} className="text-[#a855f7] mt-0.5" />
                  <span className="text-[11px] font-bold text-neutral-700 leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Booking Widget */}
          <div className="md:col-span-3 text-left">
            {!success ? (
              <form onSubmit={handleBooking} className="space-y-6">
                
                {/* Step 1: Select Date */}
                <div>
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-3 flex items-center gap-1.5">
                    <CalendarIcon size={14} /> 1. Select a Date
                  </label>
                  <div className="flex gap-2">
                    {dates.map((d) => (
                      <button
                        key={d.num}
                        type="button"
                        onClick={() => setSelectedDate(d.date)}
                        className={`flex-1 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedDate === d.date 
                            ? "bg-black border-black text-white" 
                            : "bg-white border-neutral-200 hover:border-black/20"
                        }`}
                      >
                        <p className="text-[9px] font-bold uppercase opacity-60 leading-none mb-1">{d.day}</p>
                        <p className="text-base font-black leading-none">{d.num}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Select Time */}
                {selectedDate && (
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-3 flex items-center gap-1.5">
                      <Clock size={14} /> 2. Select a Time
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {times.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelectedTime(t)}
                          className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all cursor-pointer ${
                            selectedTime === t 
                              ? "bg-black border-black text-white" 
                              : "bg-white border-neutral-200 hover:border-black/20"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Info */}
                {selectedDate && selectedTime && (
                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600">
                      3. Confirm Contact Details
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ashish Singh"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Your Email</label>
                        <input 
                          type="email" 
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="e.g. ashish@gmail.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Website URL</label>
                        <input 
                          type="text" 
                          value={website}
                          onChange={(e) => setWebsite(e.target.value)}
                          placeholder="e.g. cosmetics.com"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Monthly Ads Spend</label>
                        <select 
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-200 text-xs bg-white focus:outline-none focus:border-black transition-colors"
                        >
                          <option value="">Select Spend</option>
                          <option value="<$1k">Under $1k</option>
                          <option value="$1k-$5k">$1k - $5k</option>
                          <option value="$5k-$20k">$5k - $20k</option>
                          <option value=">$20k">Above $20k</option>
                        </select>
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full btn-primary-gradient py-3.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      Book Free Strategic Call
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}

              </form>
            ) : (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-black mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Booking Confirmed!</h2>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                    Awesome, {name}! Your meeting with Vishesh is confirmed for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>. A calendar invite and Google Meet link has been sent to <strong>{email}</strong>.
                  </p>
                </div>
                <button 
                  onClick={() => navigate("/")}
                  className="btn-primary-gradient px-8 py-3 rounded-full text-xs"
                >
                  Return Home
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
