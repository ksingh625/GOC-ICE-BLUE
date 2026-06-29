import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Nav, Footer } from "../App";
import GOCLogo from "../../imports/GOC-Logo.png";
import { Search, Filter, BookOpen, Clock, ArrowRight } from "lucide-react";

export default function BlogsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    document.body.style.fontFamily = "'DM Sans', sans-serif";
    window.scrollTo(0, 0);
  }, []);

  const posts = [
    {
      title: "How to Build a High-ROAS UGC Creative Sandbox",
      desc: "Stop guessing which video ads work. Learn how to launch creator contests to gather 30+ creative variations, test them organically, and sync the winners to paid ads.",
      category: "Brands",
      readTime: "6 min read",
      date: "June 24, 2026",
      bgGradient: "from-purple-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80"
    },
    {
      title: "5 Tips to Win More Creator Contest Deals on GOC",
      desc: "Read standings analytics carefully. Discover how micro-creators with zero initial followers win first place prizes alongside large influencers by nailing the guidelines.",
      category: "Creators",
      readTime: "4 min read",
      date: "June 18, 2026",
      bgGradient: "from-emerald-500 to-teal-500",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
    },
    {
      title: "Democratising UGC Licensing: IP Ownership Guidelines",
      desc: "Understanding digital rights management. How Game of Creators automates intellectual property license transfer on payout release, protecting brands and rewarding creators.",
      category: "Guides",
      readTime: "8 min read",
      date: "June 12, 2026",
      bgGradient: "from-blue-500 to-indigo-500",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
    },
    {
      title: "The Shift from Pay-per-Post Influencers to Gamified UGC",
      desc: "Upfront influencer fees rarely yield conversion value. Explore how performance-based crowdsourcing contests reduce acquisition costs by 60% compared to traditional channels.",
      category: "Brands",
      readTime: "5 min read",
      date: "June 05, 2026",
      bgGradient: "from-amber-500 to-orange-500",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
    }
  ];

  const filteredPosts = posts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-black">
      
      <Nav />

      {/* HERO */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-[#f0fafd] to-slate-50 text-left">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-[#d1f8ff] text-black border border-black/5 mb-4">
            Resources & Blogs
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            The Creator Economy Playbook
          </h1>
          <p className="text-sm text-black/60 max-w-lg font-medium">
            Guides, case studies, and resources on creator contests, UGC video marketing, and building creative sandboxes that convert.
          </p>
        </div>
      </section>

      {/* FILTER BAR & SEARCH */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-neutral-200/80 shadow-sm">
          {/* Search Box */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-3.5 text-neutral-400" size={16} />
            <input 
              type="text" 
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-full border border-neutral-200 text-xs focus:outline-none focus:border-black transition-colors bg-slate-50/50"
            />
          </div>

          {/* Filter Categories */}
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            {["All", "Brands", "Creators", "Guides"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  category === cat 
                    ? "bg-black text-white" 
                    : "bg-slate-100 text-neutral-600 hover:bg-slate-200/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        {filteredPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredPosts.map((post, idx) => (
              <div 
                key={idx}
                className="bg-white border border-neutral-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest bg-white/95 backdrop-blur-sm text-black px-2.5 py-1 rounded-full shadow-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 mb-3 font-semibold">
                    <Clock size={11} />
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-black mb-3 leading-snug group-hover:text-black/70 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-medium mb-6 line-clamp-3 flex-1">
                    {post.desc}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto">
                    <span className="text-[10px] text-neutral-450 font-bold uppercase tracking-wider">{post.date}</span>
                    <button className="inline-flex items-center gap-1 text-xs font-extrabold text-black group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-neutral-200/60 rounded-3xl">
            <BookOpen size={40} className="mx-auto mb-4 text-neutral-300" />
            <h3 className="text-lg font-black text-black">No articles found</h3>
            <p className="text-xs text-neutral-500 mt-1">Try adjusting your search filters or queries.</p>
          </div>
        )}
      </section>

      <Footer />

    </div>
  );
}
