import React from 'react';
import { BedDouble, CheckCircle2, UserCheck, DollarSign } from 'lucide-react';
import { Room, Customer, BillReceipt } from '../types/hotel';

interface StatsOverviewProps {
  rooms: Room[];
  customers: Customer[];
  receipts: BillReceipt[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ rooms, customers, receipts }) => {
  const totalRooms = rooms.length;
  const availableRooms = rooms.filter((r) => !r.isBooked).length;
  const occupiedRooms = totalRooms - availableRooms;
  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  const totalBilled = receipts.reduce((acc, r) => acc + r.totalAmount, 0);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Available Rooms</span>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">{availableRooms}</span>
          <span className="text-xs text-slate-500">of {totalRooms} total</span>
        </div>
        <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(availableRooms / (totalRooms || 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Occupancy Rate</span>
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <BedDouble className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">{occupancyRate}%</span>
          <span className="text-xs text-slate-500">{occupiedRooms} booked</span>
        </div>
        <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${occupancyRate}%` }}
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Guests</span>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <UserCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">{customers.length}</span>
          <span className="text-xs text-slate-500">checked in</span>
        </div>
        <p className="mt-2 text-xs text-slate-500">Currently residing</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Revenue Billed</span>
          <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-slate-900">₹{totalBilled.toLocaleString('en-IN')}</span>
          <span className="text-xs text-slate-500">({receipts.length} bills)</span>
        </div>
        <p className="mt-2 text-xs text-emerald-600 font-medium">From completed checkouts</p>
      </div>
    </div>
  );
};
