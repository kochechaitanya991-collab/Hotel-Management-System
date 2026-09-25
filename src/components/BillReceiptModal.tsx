import React from 'react';
import { X, CheckCircle, Printer } from 'lucide-react';
import { BillReceipt } from '../types/hotel';

interface BillReceiptModalProps {
  receipt: BillReceipt | null;
  onClose: () => void;
}

export const BillReceiptModal: React.FC<BillReceiptModalProps> = ({ receipt, onClose }) => {
  if (!receipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-4 bg-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-200" />
            <span className="font-bold text-sm">Check-Out Completed Successfully</span>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-100 hover:text-white p-1 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Printable Receipt Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 font-mono text-xs text-slate-800 shadow-xs space-y-4">
            <div className="text-center pb-3 border-b border-dashed border-slate-300">
              <h2 className="font-bold text-base tracking-wide text-slate-900">GRAND HERITAGE HOTEL</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">CHECK-OUT TAX INVOICE & BILL</p>
              <p className="text-[10px] text-slate-400 mt-1">Date: {receipt.checkOutDate}</p>
              <p className="text-[10px] text-slate-400">Receipt Ref: #{receipt.id}</p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer Name :</span>
                <span className="font-semibold text-slate-900">{receipt.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone Number  :</span>
                <span className="text-slate-900">{receipt.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Room Number   :</span>
                <span className="font-bold text-slate-900">Room #{receipt.roomNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Room Category :</span>
                <span className="text-slate-900">{receipt.roomCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Stay Duration :</span>
                <span className="text-slate-900">{receipt.daysStayed} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Rate / Night  :</span>
                <span className="text-slate-900">₹{receipt.pricePerNight.toFixed(2)}</span>
              </div>

              <div className="pt-3 border-t-2 border-dashed border-slate-300 flex justify-between items-baseline font-bold text-sm">
                <span className="text-slate-900">Total Amount  :</span>
                <span className="text-emerald-700 text-base">₹{receipt.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-slate-200">
              Thank you for staying with Grand Heritage! Have a safe journey.
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Receipt
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-2 px-3 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
