import { 
  User, CreditCard, Shield, FileText, Search, Gift, 
  ChevronRight, Twitter, Instagram, Youtube, Linkedin, 
  MessageCircle, LogOut, ExternalLink, Smartphone
} from "lucide-react";
import { Link } from "react-router";

export default function BrandSettingsPage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-10 animate-fade-in font-sans pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-black">
          Settings
        </h1>
        <p className="text-sm text-neutral-500 font-medium">Manage your account settings and preferences</p>
      </div>

      {/* Main Settings List */}
      <div className="space-y-3">
        <button className="w-full flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 hover:shadow-sm transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-black border border-black/5">
              <User size={18} />
            </div>
            <span className="text-sm font-bold text-black">Profile information</span>
          </div>
          <ChevronRight size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 hover:shadow-sm transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-black border border-black/5">
              <CreditCard size={18} />
            </div>
            <span className="text-sm font-bold text-black">Subscription and Billing</span>
          </div>
          <ChevronRight size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 hover:shadow-sm transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-black border border-black/5">
              <Shield size={18} />
            </div>
            <span className="text-sm font-bold text-black">Change Password</span>
          </div>
          <ChevronRight size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 hover:shadow-sm transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-black border border-black/5">
              <FileText size={18} />
            </div>
            <span className="text-sm font-bold text-black">Terms of Use</span>
          </div>
          <ChevronRight size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 hover:shadow-sm transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-black border border-black/5">
              <Search size={18} />
            </div>
            <span className="text-sm font-bold text-black">Privacy Policy</span>
          </div>
          <ChevronRight size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
        </button>

        <button className="w-full flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 hover:shadow-sm transition-all group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center text-black border border-black/5">
              <Gift size={18} />
            </div>
            <span className="text-sm font-bold text-black">Share Referral Links</span>
          </div>
          <ChevronRight size={18} className="text-neutral-400 group-hover:text-black transition-colors" />
        </button>
      </div>

      {/* Communities Section */}
      <div className="space-y-6 pt-4">
        <div>
          <h3 className="text-lg font-bold text-black">
            Follow Us & Join Communities
          </h3>
          <p className="text-sm text-neutral-500 font-medium mt-1">
            Stay connected with us on social media and join our creator communities for updates, support, and exclusive opportunities.
          </p>
        </div>

        {/* Social Media */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-black">Social Media</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 transition-all group">
              <div className="flex items-center gap-3">
                <Twitter size={18} className="text-black" />
                <span className="text-sm font-bold text-black">Twitter (X)</span>
              </div>
              <ExternalLink size={14} className="text-neutral-400 group-hover:text-black transition-colors" />
            </button>
            <button className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 transition-all group">
              <div className="flex items-center gap-3">
                <Instagram size={18} className="text-pink-600" />
                <span className="text-sm font-bold text-black">Instagram</span>
              </div>
              <ExternalLink size={14} className="text-neutral-400 group-hover:text-black transition-colors" />
            </button>
            <button className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 transition-all group">
              <div className="flex items-center gap-3">
                <Youtube size={18} className="text-red-600" />
                <span className="text-sm font-bold text-black">YouTube</span>
              </div>
              <ExternalLink size={14} className="text-neutral-400 group-hover:text-black transition-colors" />
            </button>
            <button className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-full hover:border-black/20 transition-all group">
              <div className="flex items-center gap-3">
                <Linkedin size={18} className="text-blue-600" />
                <span className="text-sm font-bold text-black">LinkedIn</span>
              </div>
              <ExternalLink size={14} className="text-neutral-400 group-hover:text-black transition-colors" />
            </button>
          </div>
        </div>

        {/* Join Our Communities */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-black">Join Our Communities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button className="flex items-center justify-between p-4 bg-[#f2f3f5] border border-[#e3e5e8] rounded-full hover:border-[#5865F2]/50 transition-all group text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#5865F2] shadow-sm">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <span className="text-sm font-bold text-black block">Discord Community</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Get updates, support, and bonus codes</span>
                </div>
              </div>
              <ExternalLink size={14} className="text-neutral-400 group-hover:text-black transition-colors" />
            </button>
            
            <button className="flex items-center justify-between p-4 bg-[#e8f5e9] border border-[#c8e6c9] rounded-full hover:border-[#25D366]/50 transition-all group text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#25D366] shadow-sm">
                  <Smartphone size={20} />
                </div>
                <div>
                  <span className="text-sm font-bold text-black block">WhatsApp Community</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Connect with creators and get support</span>
                </div>
              </div>
              <ExternalLink size={14} className="text-neutral-400 group-hover:text-black transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Logout Box */}
      <div className="pt-6">
        <div className="flex items-center justify-between p-4 bg-white border border-black/5 rounded-3xl shadow-sm">
          <div className="flex items-center gap-3 text-red-500">
            <LogOut size={20} />
            <span className="text-sm font-bold">Log out</span>
          </div>
          <Link to="/" className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
            Logout
          </Link>
        </div>
      </div>

    </div>
  );
}
