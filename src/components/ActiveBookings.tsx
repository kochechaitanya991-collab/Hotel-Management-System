import React, { useState } from 'react';
import { Users, Search, LogOut, CalendarPlus, Phone, Clock } from 'lucide-react';
import { Customer, Room } from '../types/hotel';

interface ActiveBookingsProps {
  customers: Customer[];
  rooms: Room[];
  onCheckout: (roomNumber: number) => void;
  onOpenBook: () => void;
}

export const ActiveBookings: React.FC<ActiveBookingsProps> = ({
  customers,
  rooms,
  onCheckout,
  onOpenBook,
}) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter((c) => {
    const q = search.toLowerCase();
    const room = rooms.find((r) => r.roomNumber === c.roomNumber);
    const roomCat = room ? room.category.toLowerCase() : '';
    return (
      c.name.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.roomNumber.toString().includes(q) ||
      roomCat.includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">Active Bookings</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-amber-100 text-amber-800 border border-amber-200">
              {customers.length} Guests Checked In
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Current hotel occupants, stay records, and checkout access
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guest, phone, room..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>
          <button
            onClick={onOpenBook}
            className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            New Booking
          </button>
        </div>
      </div>

      {customers.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
          <Users className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800">No active bookings</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            There are currently no guests registered in any room.
          </p>
          <button
            onClick={onOpenBook}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors inline-flex items-center gap-1.5"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            Book a Room Now
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3">Room</th>
                  <th className="px-5 py-3">Guest Name</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Duration</th>
                  <th className="px-5 py-3">Daily Rate</th>
                  <th className="px-5 py-3">Total Payable</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filtered.map((customer) => {
                  const room = rooms.find((r) => r.roomNumber === customer.roomNumber);
                  const pricePerNight = room ? room.pricePerNight : 0;
                  const totalBill = customer.daysStayed * pricePerNight;

                  return (
                    <tr key={customer.id || customer.roomNumber} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold font-mono">
                            {customer.roomNumber}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900">Room #{customer.roomNumber}</span>
                            <p className="text-[11px] text-slate-500">{room?.category || 'Standard'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap font-medium text-slate-900">
                        {customer.name}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap text-slate-600 font-mono">
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{customer.phone}</span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{customer.daysStayed} days</span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap font-mono text-slate-700">
                        ₹{pricePerNight.toFixed(2)}
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <span className="font-bold text-slate-900 font-mono">
                          ₹{totalBill.toFixed(2)}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 whitespace-nowrap text-right">
                        <button
                          onClick={() => onCheckout(customer.roomNumber)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
                        >
                          <LogOut className="w-3 h-3" />
                          Check-Out
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="p-8 text-center text-xs text-slate-500">
              No active bookings matched &quot;{search}&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
