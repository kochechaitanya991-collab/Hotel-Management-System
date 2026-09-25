import React, { useState } from 'react';
import { BedDouble, Check, X, Search, CalendarPlus, LogOut, Sparkles } from 'lucide-react';
import { Room, Customer } from '../types/hotel';

interface RoomListProps {
  rooms: Room[];
  customers: Customer[];
  onBookRoom: (roomNumber: number) => void;
  onCheckoutRoom: (roomNumber: number) => void;
  onAddRoom: () => void;
}

export const RoomList: React.FC<RoomListProps> = ({
  rooms,
  customers,
  onBookRoom,
  onCheckoutRoom,
  onAddRoom,
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'AVAILABLE' | 'OCCUPIED'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['ALL', ...Array.from(new Set(rooms.map((r) => r.category)))];

  const filteredRooms = rooms.filter((room) => {
    if (categoryFilter !== 'ALL' && room.category !== categoryFilter) return false;
    if (statusFilter === 'AVAILABLE' && room.isBooked) return false;
    if (statusFilter === 'OCCUPIED' && !room.isBooked) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesNum = room.roomNumber.toString().includes(q);
      const matchesCat = room.category.toLowerCase().includes(q);
      const customer = customers.find((c) => c.roomNumber === room.roomNumber);
      const matchesGuest = customer ? customer.name.toLowerCase().includes(q) : false;
      return matchesNum || matchesCat || matchesGuest;
    }
    return true;
  });

  const getCustomerForRoom = (roomNumber: number) => {
    return customers.find((c) => c.roomNumber === roomNumber);
  };

  return (
    <div className="space-y-6">
      {/* Controls Header */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Room Inventory & Availability</h2>
          <p className="text-xs text-slate-500">
            View room occupancy, standard pricing, and manage real-time bookings
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-48">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search room # or guest..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          {/* Status selector */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'ALL' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({rooms.length})
            </button>
            <button
              onClick={() => setStatusFilter('AVAILABLE')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'AVAILABLE' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Available ({rooms.filter((r) => !r.isBooked).length})
            </button>
            <button
              onClick={() => setStatusFilter('OCCUPIED')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                statusFilter === 'OCCUPIED' ? 'bg-white text-rose-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Occupied ({rooms.filter((r) => r.isBooked).length})
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs text-slate-400 font-medium shrink-0 mr-1">Category:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`text-xs px-3 py-1 rounded-full font-medium transition-colors shrink-0 ${
              categoryFilter === cat
                ? 'bg-slate-900 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {cat} {cat === 'ALL' ? '' : `(${rooms.filter((r) => r.category === cat).length})`}
          </button>
        ))}
      </div>

      {/* Room Grid */}
      {filteredRooms.length === 0 ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-xl p-12 text-center">
          <BedDouble className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-slate-800">No rooms match your filter</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or add a new room to inventory.
          </p>
          <button
            onClick={onAddRoom}
            className="mt-4 px-4 py-2 text-xs font-medium text-amber-900 bg-amber-100 hover:bg-amber-200 rounded-lg transition-colors"
          >
            Add New Room
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRooms.map((room) => {
            const customer = getCustomerForRoom(room.roomNumber);
            const isDeluxe = room.category.toLowerCase().includes('deluxe');

            return (
              <div
                key={room.roomNumber}
                className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-md overflow-hidden flex flex-col justify-between ${
                  room.isBooked
                    ? 'border-rose-200/80'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl font-bold font-mono text-slate-900">
                          #{room.roomNumber}
                        </span>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                            isDeluxe
                              ? 'bg-amber-100 text-amber-800 border border-amber-200'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isDeluxe && <Sparkles className="w-3 h-3 inline mr-1 text-amber-600" />}
                          {room.category}
                        </span>
                      </div>

                      {/* Status indicator badge */}
                      <span
                        className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold ${
                          room.isBooked
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {room.isBooked ? (
                          <>
                            <X className="w-3 h-3 text-rose-600" />
                            Occupied
                          </>
                        ) : (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            Available
                          </>
                        )}
                      </span>
                    </div>

                    <div className="mt-3 flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-bold text-slate-900">
                          ₹{room.pricePerNight.toFixed(2)}
                        </span>
                        <span className="text-xs text-slate-500 font-normal"> / night</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">
                        Standard Rate
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 text-xs text-slate-600 space-y-2">
                    {room.isBooked && customer ? (
                      <div className="bg-rose-50/60 border border-rose-100 rounded-lg p-3 space-y-1.5">
                        <div className="flex justify-between items-center text-slate-700 font-medium">
                          <span>Guest:</span>
                          <span className="font-semibold text-slate-900">{customer.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Contact:</span>
                          <span className="font-mono text-slate-800">{customer.phone}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600">
                          <span>Duration:</span>
                          <span className="font-semibold text-slate-800">{customer.daysStayed} days</span>
                        </div>
                        <div className="pt-1.5 border-t border-rose-200/50 flex justify-between items-center font-medium">
                          <span>Current Bill:</span>
                          <span className="text-rose-700 font-bold">
                            ₹{(customer.daysStayed * room.pricePerNight).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-emerald-50/40 border border-emerald-100 rounded-lg p-3 space-y-1 text-slate-600">
                        <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          Ready for immediate check-in
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Cleaned, inspected, and ready for next guest.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-5 pt-0">
                  {room.isBooked ? (
                    <button
                      onClick={() => onCheckoutRoom(room.roomNumber)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Check-Out & Generate Bill
                    </button>
                  ) : (
                    <button
                      onClick={() => onBookRoom(room.roomNumber)}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                    >
                      <CalendarPlus className="w-3.5 h-3.5" />
                      Book Room #{room.roomNumber}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
