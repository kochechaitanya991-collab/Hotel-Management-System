import React, { useState, useEffect } from 'react';
import { X, LogOut, Receipt, AlertCircle, FileText } from 'lucide-react';
import { Room, Customer } from '../types/hotel';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  occupiedRooms: Room[];
  customers: Customer[];
  initialSelectedRoomNumber?: number;
  onConfirmCheckout: (roomNumber: number) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  occupiedRooms,
  customers,
  initialSelectedRoomNumber,
  onConfirmCheckout,
}) => {
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialSelectedRoomNumber && occupiedRooms.some((r) => r.roomNumber === initialSelectedRoomNumber)) {
      setSelectedRoomNumber(initialSelectedRoomNumber);
    } else if (occupiedRooms.length > 0) {
      setSelectedRoomNumber(occupiedRooms[0].roomNumber);
    } else {
      setSelectedRoomNumber(0);
    }
    setError(null);
  }, [initialSelectedRoomNumber, occupiedRooms, isOpen]);

  if (!isOpen) return null;

  const targetCustomer = customers.find((c) => c.roomNumber === selectedRoomNumber);
  const targetRoom = occupiedRooms.find((r) => r.roomNumber === selectedRoomNumber);
  const totalBill = targetCustomer && targetRoom ? targetCustomer.daysStayed * targetRoom.pricePerNight : 0;

  const handleCheckout = () => {
    if (!selectedRoomNumber) {
      setError('Please select a room to check-out.');
      return;
    }
    if (!targetCustomer || !targetRoom) {
      setError(`No active booking found for Room ${selectedRoomNumber}`);
      return;
    }

    onConfirmCheckout(selectedRoomNumber);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Check-Out & Bill Generation</h3>
              <p className="text-xs text-slate-500">Calculate final amount and release room</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {occupiedRooms.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No Occupied Rooms</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              There are currently no guests checked in to any room.
            </p>
            <button
              onClick={onClose}
              className="mt-5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Occupied Room to Check-Out
              </label>
              <select
                value={selectedRoomNumber}
                onChange={(e) => setSelectedRoomNumber(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-medium"
              >
                {occupiedRooms.map((r) => {
                  const cust = customers.find((c) => c.roomNumber === r.roomNumber);
                  return (
                    <option key={r.roomNumber} value={r.roomNumber}>
                      Room #{r.roomNumber} ({r.category}) — Guest: {cust ? cust.name : 'Unknown'}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Formatted Bill View (Matching Java console output exactly) */}
            {targetCustomer && targetRoom && (
              <div className="border border-slate-300 rounded-xl overflow-hidden bg-slate-950 text-slate-100 font-mono text-xs shadow-inner">
                <div className="p-4 bg-slate-900 border-b border-slate-800 text-center">
                  <p className="text-slate-400 text-[11px]">==================================</p>
                  <p className="font-bold text-amber-400 tracking-wider">CHECK-OUT BILL</p>
                  <p className="text-slate-400 text-[11px]">==================================</p>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Customer Name :</span>
                    <span className="font-semibold text-white">{targetCustomer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Phone Number  :</span>
                    <span className="text-white">{targetCustomer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Room Number   :</span>
                    <span className="text-white font-bold">{targetCustomer.roomNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Room Category :</span>
                    <span className="text-white">{targetRoom.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Stay Duration :</span>
                    <span className="text-white">{targetCustomer.daysStayed} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rate/Night    :</span>
                    <span className="text-white">₹{targetRoom.pricePerNight.toFixed(2)}</span>
                  </div>

                  <div className="pt-2 border-t border-dashed border-slate-700 flex justify-between items-baseline font-bold">
                    <span className="text-amber-400">Total Amount  :</span>
                    <span className="text-lg text-emerald-400">₹{totalBill.toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900 border-t border-slate-800 text-center text-[10px] text-slate-400">
                  Room #{targetRoom.roomNumber} will be marked as available immediately upon checkout.
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={!targetCustomer || !targetRoom}
                className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Receipt className="w-3.5 h-3.5" />
                Confirm Check-Out & Bill
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
