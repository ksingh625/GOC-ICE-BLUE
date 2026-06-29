import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Nav, Footer } from "../App";
import GOCLogo from "../../imports/GOC-Logo.png";
import confetti from "canvas-confetti";
import { MapPin, Briefcase, Clock, Send, X, Check } from "lucide-react";

export default function JobsPage() {
  const [filter, setFilter] = useState("All");
  const [selectedJob, setSelectedJob] = useState<{ title: string; dept: string; loc: string } | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  const jobs = [
    {
      title: "Senior Fullstack Engineer",
      dept: "Engineering",
      type: "Full-time",
      loc: "San Francisco, CA / Remote",
      desc: "Lead development of the contest matching backend, creators leaderboard databases, and ads platform API integrations (Meta, TikTok)."
    },
    {
      title: "UGC Community Manager",
      dept: "Marketing",
      type: "Full-time",
      loc: "Remote",
      desc: "Grow and support our community of 8,000+ UGC creators. Host live training sessions, brief walkthroughs, and creator showcases."
    },
    {
      title: "Product Designer (UI/UX)",
      dept: "Design",
      type: "Full-time",
      loc: "San Francisco, CA",
      desc: "Own the design system and end-to-end user experience for the brand campaign dashboards, creator wallets, and mobile viewports."
    },
    {
      title: "Developer Relations Engineer",
      dept: "Engineering",
      type: "Full-time",
      loc: "Remote",
      desc: "Build tools and sample applications for creator integrations, maintain API documentation, and help creators connect handles."
    }
  ];

  const filteredJobs = filter === "All" ? jobs : jobs.filter(j => j.dept === filter);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setApplied(true);
      setTimeout(() => {
        setSelectedJob(null);
        setApplied(false);
        setName("");
        setEmail("");
        setResumeUploaded(false);
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-black text-left">
      
      <Nav solid={true} />

      {/* HERO */}
      <section className="py-16 px-6 bg-gradient-to-b from-[#f0fafd] to-slate-50">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#d1f8ff] text-black border border-black/5 mb-4">
            Careers at GOC
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Join the Gaming Arena
          </h1>
          <p className="text-sm text-black/60 max-w-lg font-medium">
            We are building the infrastructure for the next generation of performance creator marketing. Join our team to shape the creator economy.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="max-w-4xl mx-auto px-6 py-6 flex gap-2 overflow-x-auto">
        {["All", "Engineering", "Design", "Marketing"].map((dept) => (
          <button
            key={dept}
            onClick={() => setFilter(dept)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filter === dept 
                ? "bg-black text-white" 
                : "bg-slate-100 text-neutral-600 hover:bg-slate-200/70"
            }`}
          >
            {dept}
          </button>
        ))}
      </section>

      {/* JOBS BOARD */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-6">
        {filteredJobs.map((job, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-purple-50 text-purple-600 border border-purple-100 px-2.5 py-0.5 rounded-full">
                  {job.dept}
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest bg-slate-100 text-neutral-500 border border-neutral-200 px-2.5 py-0.5 rounded-full">
                  {job.type}
                </span>
              </div>
              <h3 className="text-lg font-extrabold text-black">{job.title}</h3>
              <p className="text-xs text-neutral-500 max-w-xl font-medium leading-relaxed">{job.desc}</p>
              
              <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-semibold pt-1">
                <div className="flex items-center gap-1"><MapPin size={12} /> <span>{job.loc}</span></div>
                <div className="flex items-center gap-1"><Briefcase size={12} /> <span>{job.dept} team</span></div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedJob(job)}
              className="btn-primary-gradient px-6 py-3 rounded-full text-xs whitespace-nowrap align-self-start md:align-self-center"
            >
              Apply Now
            </button>
          </div>
        ))}
      </section>

      {/* APPLICATIONS MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
            <button 
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-neutral-450 hover:text-black transition-colors"
            >
              <X size={20} />
            </button>

            {!applied ? (
              <form onSubmit={handleApplySubmit} className="space-y-5">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-purple-600 mb-1">Apply for Position</p>
                  <h3 className="text-xl font-extrabold text-black">{selectedJob.title}</h3>
                  <p className="text-[10px] text-neutral-450">{selectedJob.loc}</p>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Ashish Singh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-full border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
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
                    className="w-full px-4 py-3 rounded-full border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                {/* Upload resume */}
                <div>
                  <label className="block text-[10px] font-extrabold uppercase text-neutral-500 mb-1.5">Upload Resume</label>
                  <div 
                    onClick={() => setResumeUploaded(true)}
                    className="border-2 border-dashed border-neutral-200 hover:border-black/20 p-5 rounded-3xl text-center cursor-pointer transition-colors bg-neutral-50/50"
                  >
                    {resumeUploaded ? (
                      <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-xs">
                        <Check size={16} /> Resume-Ashish.pdf uploaded
                      </div>
                    ) : (
                      <>
                        <p className="text-xs font-bold text-neutral-700">Click to upload PDF resume</p>
                        <p className="text-[9px] text-neutral-400 mt-0.5">PDF or Word files up to 10MB</p>
                      </>
                    )}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full btn-primary-gradient py-3.5 rounded-full text-xs flex items-center justify-center gap-1.5"
                >
                  Submit Application
                  <Send size={13} />
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-black mb-2">Application Sent!</h2>
                  <p className="text-xs text-neutral-500 leading-relaxed">
                    Thank you for applying, {name}. Our recruiters will review your resume and details and get in touch with you shortly.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />

    </div>
  );
}
