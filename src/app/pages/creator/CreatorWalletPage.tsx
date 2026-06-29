import { useState, useEffect } from "react";
import { 
  Wallet, DollarSign, ArrowUpRight, CreditCard,
  Coins, Award, Gift, HelpCircle, Check, AlertCircle, 
  ShoppingBag, ChevronRight, Inbox, Plus, RefreshCw, X, Copy
} from "lucide-react";
import confetti from "canvas-confetti";

interface Submission {
  id: number;
  campaignId: number;
  campaignTitle: string;
  url: string;
  views: number;
  status: "PENDING" | "VERIFIED" | "REJECTED" | "PAID";
  date: string;
  platform: string;
  earned: number;
}

interface Cashout {
  id: number;
  amount: number;
  email: string;
  method: string;
  date: string;
  status: "PENDING" | "COMPLETED";
}

export default function CreatorWalletPage() {
  const [walletTab, setWalletTab] = useState<"cash" | "coins">("cash");
  const [promoCode, setPromoCode] = useState("");
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  
  // Modals
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [redemptionCodeModal, setRedemptionCodeModal] = useState<{ name: string; code: string } | null>(null);
  
  // Withdraw Form fields
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("gamer_ash@goc.com");
  const [copiedCode, setCopiedCode] = useState(false);
  const [loadingRedeem, setLoadingRedeem] = useState<string | null>(null);

  // Synced local states
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [coins, setCoins] = useState(1250);
  const [withdrawals, setWithdrawals] = useState<Cashout[]>([]);

  // Load state from localStorage
  useEffect(() => {
    // Submissions
    try {
      const stored = localStorage.getItem("goc_submissions");
      if (stored) setSubmissions(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }

    // Coins
    try {
      const storedCoins = localStorage.getItem("goc_coins");
      if (storedCoins) {
        setCoins(parseInt(storedCoins));
      } else {
        localStorage.setItem("goc_coins", "1250");
        setCoins(1250);
      }
    } catch (e) {
      console.error(e);
    }

    // Withdrawals list
    try {
      const storedWiths = localStorage.getItem("goc_withdrawals");
      if (storedWiths) {
        setWithdrawals(JSON.parse(storedWiths));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Update coins helper
  const updateCoins = (newVal: number) => {
    setCoins(newVal);
    try {
      localStorage.setItem("goc_coins", String(newVal));
    } catch (e) {
      console.error(e);
    }
  };

  // Cash Calculations
  const lifetimeWinnings = submissions
    .filter(s => s.status === "VERIFIED" || s.status === "PAID")
    .reduce((acc, curr) => acc + curr.earned, 0);

  const totalWithdrawn = withdrawals.reduce((acc, curr) => acc + curr.amount, 0);
  const availableCash = Math.max(0, lifetimeWinnings - totalWithdrawn);

  const vouchers = [
    { id: 1, name: "Amazon $10 Gift Card", cost: 1000, desc: "Global voucher code redeemable on Amazon store.", bg: "bg-orange-50 text-orange-700 border-orange-200" },
    { id: 2, name: "Starbucks $5 Gift Card", cost: 500, desc: "Treat yourself to coffee. Redeem in all outlets.", bg: "bg-emerald-50 text-emerald-700 border-emerald-250" },
    { id: 3, name: "Roblox 400 Robux Voucher", cost: 800, desc: "Instantly claim 400 Robux on Roblox platform.", bg: "bg-red-50 text-red-600 border-red-200" },
    { id: 4, name: "App Store $15 Voucher", cost: 1500, desc: "Valid for apps, games, subscriptions & music.", bg: "bg-blue-50 text-blue-600 border-blue-200" }
  ];

  const handleRedeemVoucher = (name: string, cost: number) => {
    if (coins < cost) {
      setPromoError(`Insufficient coins. You need ${cost} GOC coins to claim this voucher.`);
      setTimeout(() => setPromoError(null), 3000);
      return;
    }

    setLoadingRedeem(name);

    setTimeout(() => {
      setLoadingRedeem(null);
      updateCoins(coins - cost);
      
      // Generate a mock code
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let code = "GOC-";
      for (let i = 0; i < 4; i++) code += characters.charAt(Math.floor(Math.random() * characters.length));
      code += "-";
      for (let i = 0; i < 4; i++) code += characters.charAt(Math.floor(Math.random() * characters.length));
      code += "-";
      for (let i = 0; i < 4; i++) code += characters.charAt(Math.floor(Math.random() * characters.length));

      setRedemptionCodeModal({ name, code });
      
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const handleRedeemPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    setPromoSuccess(null);

    const codeClean = promoCode.trim().toUpperCase();
    if (!codeClean) return;
    
    if (codeClean === "GOC50") {
      updateCoins(coins + 50);
      setPromoSuccess("Code GOC50 applied! +50 GOC Coins added to your wallet.");
      confetti({ particleCount: 30, spread: 40 });
    } else if (codeClean === "WELCOME") {
      updateCoins(coins + 100);
      setPromoSuccess("Welcome code applied! +100 GOC Coins added to your wallet.");
      confetti({ particleCount: 40, spread: 50 });
    } else if (codeClean === "ARENA20") {
      updateCoins(coins + 200);
      setPromoSuccess("Grand Arena launch code applied! +200 GOC Coins added.");
      confetti({ particleCount: 60, spread: 55 });
    } else {
      setPromoError("Invalid coupon or expired sandbox code.");
    }
    setPromoCode("");
    setTimeout(() => {
      setPromoSuccess(null);
      setPromoError(null);
    }, 4000);
  };

  const handleWithdrawCash = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(withdrawAmount);

    if (isNaN(amountVal) || amountVal <= 0 || amountVal > availableCash) {
      alert("Invalid withdrawal amount.");
      return;
    }

    if (amountVal < 5) {
      alert("Minimum cashout is $5.00.");
      return;
    }

    const newWith: Cashout = {
      id: Date.now(),
      amount: amountVal,
      email: paypalEmail,
      method: "PayPal Account",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "PENDING"
    };

    const updated = [newWith, ...withdrawals];
    setWithdrawals(updated);
    try {
      localStorage.setItem("goc_withdrawals", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setWithdrawModalOpen(false);
    setWithdrawAmount("");
    setPromoSuccess(`Cashout request of $${amountVal.toFixed(2)} submitted to ${paypalEmail}!`);
    
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 60,
      origin: { x: 1 }
    });

    setTimeout(() => setPromoSuccess(null), 4000);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto text-left relative animate-fade-in">
      
      {/* ── HEADER ── */}
      <div className="border-b border-neutral-100 pb-5">
        <h1 className="text-3xl font-black text-black tracking-tight">
          Wallet & Cashout
        </h1>
        <p className="text-xs text-neutral-500 font-semibold mt-1">Audit verification payouts, cashout via Paypal, and redeem GOC store coins.</p>
      </div>

      {/* ── TAB SWITCHER ── */}
      <div className="bg-neutral-100 p-1 rounded-full border border-black/5 flex w-full">
        <button 
          onClick={() => setWalletTab("cash")}
          className={`flex-1 py-3 rounded-full text-xs font-black transition-all cursor-pointer ${
            walletTab === "cash" 
              ? "bg-white text-black shadow-xs" 
              : "text-neutral-500 hover:text-black"
          }`}
        >
          USD Cash Balance (${availableCash.toFixed(2)})
        </button>
        <button 
          onClick={() => setWalletTab("coins")}
          className={`flex-1 py-3 rounded-full text-xs font-black transition-all cursor-pointer ${
            walletTab === "coins" 
              ? "bg-white text-black shadow-xs" 
              : "text-neutral-500 hover:text-black"
          }`}
        >
          GOC Coins Balance ({coins})
        </button>
      </div>

      {promoSuccess && (
        <div className="p-4 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center gap-2 text-emerald-700 text-xs font-bold animate-fade-in shadow-xs">
          <Check size={16} /> {promoSuccess}
        </div>
      )}

      {promoError && (
        <div className="p-4 rounded-3xl bg-red-50 border border-red-150 flex items-center gap-2 text-red-650 text-xs font-bold animate-fade-in shadow-xs">
          <AlertCircle size={16} /> {promoError}
        </div>
      )}

      {/* ── CASH VIEW TAB ── */}
      {walletTab === "cash" ? (
        <div className="space-y-6">
          {/* Cash Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Total Cash Earned */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">Total Cash Earned</span>
                  <h3 className="text-2.5xl font-black text-black mt-2 tracking-tight">
                    ${lifetimeWinnings.toFixed(2)}
                  </h3>
                </div>
                <div className="p-2.5 rounded-3xl bg-emerald-50 border border-emerald-100/50 text-emerald-600">
                  <DollarSign size={16} />
                </div>
              </div>
              <p className="text-[9px] text-neutral-550 font-bold mt-4 leading-none">Lifetime campaign verified earnings</p>
            </div>

            {/* Available for Withdrawal */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">Available to Withdraw</span>
                  <h3 className="text-2.5xl font-black text-black mt-2 tracking-tight">
                    ${availableCash.toFixed(2)}
                  </h3>
                </div>
                <div className="p-2.5 rounded-3xl bg-black text-[#d1f8ff] border-black shadow-xs">
                  <Wallet size={16} />
                </div>
              </div>
              <p className="text-[9px] text-neutral-550 font-bold mt-4 leading-none">Minimum request: $5.00</p>
            </div>

            {/* Cash Campaigns Joined */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">Escrow Audits Checked</span>
                  <h3 className="text-2.5xl font-black text-black mt-2 tracking-tight">
                    {submissions.filter(s => s.status === "VERIFIED" || s.status === "PAID").length}
                  </h3>
                </div>
                <div className="p-2.5 rounded-3xl bg-purple-50 border border-purple-100/50 text-purple-650">
                  <Award size={16} />
                </div>
              </div>
              <p className="text-[9px] text-neutral-550 font-bold mt-4 leading-none">Total clips validated by brand managers</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button 
              disabled={availableCash < 5}
              onClick={() => setWithdrawModalOpen(true)}
              className={`py-3.5 px-5 rounded-full text-xs font-black shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                availableCash >= 5 
                  ? "bg-black text-white hover:bg-[#d1f8ff] hover:text-black border border-black" 
                  : "bg-neutral-100 border border-neutral-200 text-neutral-400 cursor-not-allowed"
              }`}
            >
              <ArrowUpRight size={14} /> 
              {availableCash >= 5 ? "Request Paypal Cashout" : "Paypal Cashout ($5.00 Min)"}
            </button>
            
            <button 
              onClick={() => setPayoutModalOpen(true)}
              className="py-3.5 px-5 btn-primary-gradient rounded-full text-xs font-black shadow-xs flex items-center justify-center gap-2"
            >
              <CreditCard size={14} className="text-[#d1f8ff]" /> Manage Paypal Email
            </button>
          </div>

          {/* Cash Withdrawals Table */}
          <div className="bg-white border border-neutral-200/85 rounded-3xl overflow-hidden shadow-xs">
            <div className="px-6 py-4.5 border-b border-neutral-100 flex items-center justify-between">
              <h3 className="text-sm font-black text-black uppercase tracking-wider">Cashout Request Ledger</h3>
              <span className="text-[9px] bg-neutral-150 border border-black/5 px-2 py-0.5 rounded-full font-bold text-neutral-500 uppercase tracking-widest">
                {withdrawals.length} transactions
              </span>
            </div>
            
            {withdrawals.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-neutral-200/40 text-neutral-450 uppercase text-[9px] font-black tracking-wider">
                    <th className="px-6 py-3.5">Date Requested</th>
                    <th className="px-6 py-3.5">Payout Method</th>
                    <th className="px-6 py-3.5">Paypal Email</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-150">
                  {withdrawals.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50/20">
                      <td className="px-6 py-4 text-neutral-500 font-bold">{w.date}</td>
                      <td className="px-6 py-4 text-neutral-700 font-black">{w.method}</td>
                      <td className="px-6 py-4 text-neutral-500 font-semibold">{w.email}</td>
                      <td className="px-6 py-4">
                        <span className="text-[8px] bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-0.5 rounded-full font-black uppercase">
                          {w.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-black text-black">${w.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-16 flex flex-col items-center justify-center">
                <Inbox size={32} className="text-neutral-300 mb-2" />
                <p className="text-xs font-bold text-neutral-400">No cash withdrawal transactions recorded.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── COINS VIEW TAB ── */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Coins Balance */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400 font-bold">GOC Store Coins Balance</span>
                  <h3 className="text-3xl font-black text-black mt-2 tracking-tight">
                    {coins}
                  </h3>
                </div>
                <div className="p-2.5 rounded-3xl bg-amber-50 border border-amber-100 text-amber-600">
                  <Coins size={18} />
                </div>
              </div>
              <p className="text-[9px] text-neutral-550 font-bold mt-4 leading-none">Redeem instantly for gift vouchers in the GOC store</p>
            </div>

            {/* Redeem promo container */}
            <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400 font-bold">Claim a Promo Code</span>
                <p className="text-[9px] text-neutral-500 font-semibold mt-1">Try entering 'WELCOME' or 'GOC50' to add sandbox coins.</p>
              </div>
              
              <form onSubmit={handleRedeemPromoCode} className="flex gap-2 mt-4">
                <input 
                  type="text"
                  placeholder="Enter sandbox promo code..."
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black bg-slate-50/20"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-black hover:bg-[#d1f8ff] text-white hover:text-black font-black rounded-full text-xs transition-colors cursor-pointer border border-black/10"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>

          {/* Vouchers Store */}
          <div className="bg-white border border-neutral-200/85 rounded-3xl p-6 shadow-xs">
            <div className="border-b border-neutral-100 pb-3 mb-6">
              <h3 className="text-sm font-black text-black uppercase tracking-wider">Voucher redemption store</h3>
              <p className="text-[10px] text-neutral-550 font-semibold mt-0.5">Claim reward vouchers immediately by spending your earned coins.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {vouchers.map((v) => {
                const canClaim = coins >= v.cost;
                const isClaiming = loadingRedeem === v.name;

                return (
                  <div 
                    key={v.id} 
                    className="border border-neutral-200/80 rounded-3xl p-4 flex gap-4 bg-slate-50/15 hover:border-black hover:shadow-md transition-all duration-300 relative overflow-hidden text-left"
                  >
                    <div className="w-12 h-12 rounded-full bg-black/5 border border-black/5 flex items-center justify-center text-black flex-shrink-0">
                      <Gift size={20} className="text-neutral-700" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between gap-3.5">
                      <div>
                        <h4 className="text-xs font-black text-black">{v.name}</h4>
                        <p className="text-[9px] text-neutral-450 font-semibold mt-0.5 leading-normal">{v.desc}</p>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-neutral-50 pt-2.5">
                        <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1.5 leading-none">
                          <Coins size={11} /> {v.cost} Coins
                        </span>
                        
                        <button 
                          disabled={!canClaim || isClaiming}
                          onClick={() => handleRedeemVoucher(v.name, v.cost)}
                          className={`px-4 py-2 rounded-full text-[10px] font-black border transition-all cursor-pointer ${
                            isClaiming ? "bg-neutral-100 border-neutral-200 text-neutral-450 cursor-wait" :
                            canClaim 
                              ? "bg-black border-black text-white hover:bg-[#d1f8ff] hover:text-black hover:border-black shadow-xs" 
                              : "bg-neutral-50 border-neutral-200 text-neutral-400 cursor-not-allowed"
                          }`}
                        >
                          {isClaiming ? "Claiming..." : "Claim Voucher"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statement History Table */}
          <div className="bg-white border border-neutral-200/85 rounded-3xl overflow-hidden shadow-xs">
            <div className="px-6 py-4.5 border-b border-neutral-100">
              <h3 className="text-sm font-black text-black uppercase tracking-wider">Statement ledger history</h3>
            </div>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/50 border-b border-neutral-200/40 text-neutral-450 uppercase text-[9px] font-black tracking-wider">
                  <th className="px-6 py-3.5">Transaction Type</th>
                  <th className="px-6 py-3.5">Date Checked</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Credit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {coinTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/20">
                    <td className="px-6 py-4 font-black text-black flex items-center gap-2">
                      <ArrowUpRight size={14} className="text-amber-500" />
                      {t.type}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 font-bold">{t.date}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[8px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full border ${
                        t.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-black text-amber-600">{t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── PAYOUTS DETAIL CONFIG MODAL ── */}
      {payoutModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
          onClick={() => setPayoutModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl border border-neutral-200 w-full max-w-sm p-6 text-left space-y-6 shadow-2xl relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <h3 className="text-sm font-black text-black uppercase tracking-wider">Paypal Configuration</h3>
              <button onClick={() => setPayoutModalOpen(false)} className="text-neutral-400 hover:text-black">
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">PayPal Account Email</label>
                <input 
                  type="email"
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black bg-slate-50/20"
                />
              </div>
            </div>

            <button 
              onClick={() => {
                setPayoutModalOpen(false);
                setPromoSuccess("Paypal account configuration updated!");
                setTimeout(() => setPromoSuccess(null), 3000);
              }}
              className="w-full btn-primary-gradient py-3.5 rounded-full text-xs font-black shadow-xs cursor-pointer"
            >
              Update Config
            </button>
          </div>
        </div>
      )}

      {/* ── CASH WITHDRAW REQUEST MODAL ── */}
      {withdrawModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs"
          onClick={() => setWithdrawModalOpen(false)}
        >
          <form 
            onSubmit={handleWithdrawCash}
            className="bg-white rounded-3xl border border-neutral-200 w-full max-w-sm p-6 text-left space-y-6 shadow-2xl relative animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <h3 className="text-sm font-black text-black uppercase tracking-wider">Request Paypal Cashout</h3>
              <button type="button" onClick={() => setWithdrawModalOpen(false)} className="text-neutral-400 hover:text-black cursor-pointer">
                <X size={16} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-neutral-50 rounded-3xl border border-neutral-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-neutral-400">Available cashout balance</span>
                <span className="text-black font-black">${availableCash.toFixed(2)}</span>
              </div>

              <div>
                <label className="block text-[9px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">Withdrawal Amount ($)</label>
                <input 
                  type="number"
                  min="5"
                  step="0.01"
                  max={availableCash}
                  required
                  placeholder="e.g. 10.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-neutral-200 rounded-full text-xs focus:outline-none focus:border-black bg-slate-50/20"
                />
                <p className="text-[8px] text-neutral-450 mt-1 font-semibold pl-1">PayPal payouts take ~24 hours to clear audits.</p>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full btn-primary-gradient py-3.5 rounded-full text-xs font-black shadow-xs cursor-pointer"
            >
              Submit Cashout Request
            </button>
          </form>
        </div>
      )}

      {/* ── REDEMPTION CODE DISPLAY MODAL ── */}
      {redemptionCodeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-xs animate-fade-in"
          onClick={() => setRedemptionCodeModal(null)}
        >
          <div 
            className="bg-white rounded-3xl border border-neutral-200 w-full max-w-sm p-6 text-center space-y-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
              <h3 className="text-xs font-black uppercase text-neutral-400 tracking-wider">Voucher Claim Successful</h3>
              <button onClick={() => setRedemptionCodeModal(null)} className="text-neutral-400 hover:text-black cursor-pointer">
                <X size={15} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-500">
                <Gift size={28} />
              </div>
              
              <div>
                <h4 className="text-sm font-black text-black">{redemptionCodeModal.name}</h4>
                <p className="text-[10px] text-neutral-450 font-semibold mt-1">Copy and redeem your voucher code below.</p>
              </div>

              <div className="bg-slate-50/80 border border-neutral-200 rounded-3xl p-3.5 flex items-center justify-between font-mono text-xs font-black select-all">
                <span>{redemptionCodeModal.code}</span>
                <button 
                  onClick={() => handleCopyCode(redemptionCodeModal.code)}
                  className="p-1 text-neutral-400 hover:text-black cursor-pointer"
                  title="Copy code"
                >
                  {copiedCode ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                </button>
              </div>
            </div>

            <button 
              onClick={() => setRedemptionCodeModal(null)}
              className="w-full btn-primary-gradient py-3 rounded-full text-xs font-black cursor-pointer shadow-xs"
            >
              Return to Store
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
