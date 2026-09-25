import React, { useState } from 'react';
import { Receipt, Search, Eye } from 'lucide-react';
import { BillReceipt } from '../types/hotel';

interface BillingHistoryProps {
  receipts: BillReceipt[];
  onViewReceipt: (receipt: BillReceipt) => void;
}

export const BillingHistory: React.FC<BillingHistoryProps> = ({ receipts, onViewReceipt }) => {
  const [search, setSearch] = useState('');

  const filtered = receipts.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.customerName.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      r.roomNumber.toString().includes(q) ||
      r.roomCategory.toLowerCase().includes(q)
    );
  });

  const totalRevenue = receipts.reduce((acc, r) => acc + r.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Billing & Check-Out Records</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Total Invoiced: ₹{totalRevenue.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Archived invoices, customer receipts, and generated statements
          </p>
        </div>

        <div className="relative flex-1 sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search bill by guest, room, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          />
        </div>
      </div>

      {receipts.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
          <Receipt className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800">No checkout bills yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Once a guest checks out and settles their bill, their itemized receipt will appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Receipt Ref</th>
                  <th className="px-5 py-3">Date & Time</th>
                  <th className="px-5 py-3">Guest Name</th>
                  <th className="px-5 py-3">Room</th>
                  <th className="px-5 py-3">Stay Duration</th>
                  <th className="px-5 py-3">Nightly Rate</th>
                  <th className="px-5 py-3">Total Billed</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-5 py-3.5 whitespace-nowrap font-mono text-slate-500">
                      #{r.id.slice(-6)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-slate-500">
                      {r.checkOutDate}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-semibold text-slate-900">
                      {r.customerName}
                      <p className="text-[11px] text-slate-400 font-mono">{r.phone}</p>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span className="font-semibold text-slate-800 font-mono">Room #{r.roomNumber}</span>
                      <span className="text-[11px] text-slate-500 block">({r.roomCategory})</span>
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-slate-600">
                      {r.daysStayed} day(s)
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-mono text-slate-700">
                      ₹{r.pricePerNight.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap font-mono font-bold text-emerald-700 text-sm">
                      ₹{r.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap text-right">
                      <button
                        onClick={() => onViewReceipt(r)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Bill
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No billing records matched your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
