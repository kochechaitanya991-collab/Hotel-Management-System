import React, { useState, useEffect } from 'react';
import { X, CalendarPlus, BedDouble, AlertCircle } from 'lucide-react';
import { Room } from '../types/hotel';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableRooms: Room[];
  initialSelectedRoomNumber?: number;
  onConfirmBooking: (roomNumber: number, name: string, phone: string, days: number) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  availableRooms,
  initialSelectedRoomNumber,
  onConfirmBooking,
}) => {
  const [selectedRoomNumber, setSelectedRoomNumber] = useState<number>(0);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [daysStayed, setDaysStayed] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialSelectedRoomNumber && availableRooms.some((r) => r.roomNumber === initialSelectedRoomNumber)) {
      setSelectedRoomNumber(initialSelectedRoomNumber);
    } else if (availableRooms.length > 0) {
      setSelectedRoomNumber(availableRooms[0].roomNumber);
    } else {
      setSelectedRoomNumber(0);
    }
    setError(null);
  }, [initialSelectedRoomNumber, availableRooms, isOpen]);

  if (!isOpen) return null;

  const currentRoom = availableRooms.find((r) => r.roomNumber === selectedRoomNumber);
  const estimatedCost = currentRoom ? currentRoom.pricePerNight * (daysStayed > 0 ? daysStayed : 0) : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!selectedRoomNumber || !currentRoom) {
      setError('Please select an available room.');
      return;
    }

    if (!customerName.trim()) {
      setError('Customer name is required.');
      return;
    }

    if (!customerPhone.trim()) {
      setError('Customer phone number is required.');
      return;
    }

    if (!daysStayed || daysStayed < 1) {
      setError('Stay duration must be at least 1 day.');
      return;
    }

    onConfirmBooking(selectedRoomNumber, customerName.trim(), customerPhone.trim(), daysStayed);
    // Reset form
    setCustomerName('');
    setCustomerPhone('');
    setDaysStayed(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CalendarPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Book a Room</h3>
              <p className="text-xs text-slate-500">Customer Registration & Room Assignment</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {availableRooms.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <BedDouble className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">No Rooms Available</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
              All rooms in the inventory are currently occupied. Check out a guest to free up room availability.
            </p>
            <button
              onClick={onClose}
              className="mt-5 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Room selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Select Available Room <span className="text-rose-500">*</span>
              </label>
              <select
                value={selectedRoomNumber}
                onChange={(e) => setSelectedRoomNumber(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
              >
                {availableRooms.map((r) => (
                  <option key={r.roomNumber} value={r.roomNumber}>
                    Room #{r.roomNumber} — {r.category} (₹{r.pricePerNight.toFixed(2)}/night)
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +91 9876543210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  required
                />
              </div>
            </div>

            {/* Days Stayed */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Number of Days for Stay <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={daysStayed || ''}
                  onChange={(e) => setDaysStayed(parseInt(e.target.value) || 0)}
                  className="w-32 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold"
                  required
                />
                <span className="text-xs text-slate-500">day(s) reservation</span>
              </div>
            </div>

            {/* Cost Preview Box */}
            {currentRoom && (
              <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-3.5 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Room Type:</span>
                  <span className="font-semibold text-slate-800">{currentRoom.category}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Nightly Rate:</span>
                  <span className="font-semibold text-slate-800">₹{currentRoom.pricePerNight.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Stay Duration:</span>
                  <span className="font-semibold text-slate-800">{daysStayed} night(s)</span>
                </div>
                <div className="pt-2 border-t border-emerald-200 flex justify-between items-baseline font-bold">
                  <span className="text-slate-800">Estimated Total Bill:</span>
                  <span className="text-base text-emerald-700">₹{estimatedCost.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
