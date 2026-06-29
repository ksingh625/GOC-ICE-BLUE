import { TrendingDown, BarChart2, Banknote, Download, Upload, CreditCard, PlusCircle } from "lucide-react";

export default function BrandBillingPage() {
  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in font-sans">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-black">
          Billing & Account
        </h1>
      </div>

      {/* Tabs */}
      <div className="bg-neutral-100/80 rounded-3xl flex overflow-hidden max-w-5xl border border-black/5 p-1.5">
        <button className="flex-1 bg-white text-black py-2.5 rounded-full text-sm font-bold transition-all text-center shadow-sm">
          Cash Account
        </button>
        <button className="flex-1 text-neutral-500 hover:text-black hover:bg-neutral-200/50 py-2.5 rounded-full text-sm font-bold transition-all text-center">
          Coin Wallet
        </button>
        <button className="flex-1 text-neutral-500 hover:text-black hover:bg-neutral-200/50 py-2.5 rounded-full text-sm font-bold transition-all text-center">
          Subscription
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spent */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-black mb-1">Total Spent</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">$0.00</h3>
            <p className="text-xs text-neutral-500 font-medium">Lifetime contest spending</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <TrendingDown size={16} />
          </div>
        </div>

        {/* Campaigns Run */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-black mb-1">Campaigns Run</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">0</h3>
            <p className="text-xs text-neutral-500 font-medium">Total campaigns created</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <BarChart2 size={16} />
          </div>
        </div>

        {/* Available Balance */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-black mb-1">Available Balance</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">$0.00</h3>
            <p className="text-xs text-neutral-500 font-medium">Ready for contests</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <Banknote size={16} />
          </div>
        </div>

        {/* Withdrawable Balance */}
        <div className="bg-white p-6 rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex items-start justify-between">
          <div>
            <p className="text-sm font-bold text-black mb-1">Withdrawable Balance</p>
            <h3 className="text-2xl font-extrabold text-black mb-1">$0.00</h3>
            <p className="text-xs text-neutral-500 font-medium">From referrals & bonuses</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black border border-black/5">
            <Banknote size={16} />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-black hover:bg-neutral-800 text-white py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
            <Upload size={16} />
            Top Up Wallet
          </button>
          <button className="flex-1 bg-white border border-neutral-200 hover:bg-neutral-50 text-black py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
            <Download size={16} />
            Withdraw Balance
          </button>
          <button className="flex-1 bg-black hover:bg-neutral-800 text-white py-3 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm">
            <PlusCircle size={16} />
            Manage Payout Methods
          </button>
        </div>
        <p className="text-xs text-neutral-500 text-center font-medium">
          Please add a payout method to withdraw your balance.
        </p>
      </div>

      {/* Cash Transaction History */}
      <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-bold text-black">Cash Transaction History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-500">
            <thead className="bg-neutral-50/50 border-b border-black/5 text-neutral-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Description</th>
                <th className="p-4">Type</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Message</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-400 font-medium">
                  No cash transaction history yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cash Withdrawal Request History */}
      <div className="bg-white rounded-3xl border border-black/5 shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-black/5">
          <h3 className="text-lg font-bold text-black">Cash Withdrawal Request History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-500">
            <thead className="bg-neutral-50/50 border-b border-black/5 text-neutral-400 font-bold uppercase tracking-wider">
              <tr>
                <th className="p-4">Date Submitted</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Your Notes</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={6} className="p-8 text-center text-neutral-400 font-medium">
                  No cash withdrawal requests yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
