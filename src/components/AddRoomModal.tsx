import React, { useState } from 'react';
import { X, Plus, BedDouble, AlertCircle } from 'lucide-react';
import { Room } from '../types/hotel';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  existingRooms: Room[];
  onAddRoom: (roomNumber: number, category: string, pricePerNight: number) => void;
}

export const AddRoomModal: React.FC<AddRoomModalProps> = ({
  isOpen,
  onClose,
  existingRooms,
  onAddRoom,
}) => {
  const [roomNumber, setRoomNumber] = useState<number | ''>('');
  const [category, setCategory] = useState<string>('Single');
  const [customCategory, setCustomCategory] = useState<string>('');
  const [pricePerNight, setPricePerNight] = useState<number | ''>('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!roomNumber || roomNumber <= 0) {
      setError('Please provide a valid positive room number.');
      return;
    }

    if (existingRooms.some((r) => r.roomNumber === roomNumber)) {
      setError(`Room #${roomNumber} already exists in the inventory.`);
      return;
    }

    const finalCategory = category === 'Other' ? customCategory.trim() : category;
    if (!finalCategory) {
      setError('Room category cannot be empty.');
      return;
    }

    if (!pricePerNight || pricePerNight <= 0) {
      setError('Please specify a positive nightly rate.');
      return;
    }

    onAddRoom(Number(roomNumber), finalCategory, Number(pricePerNight));
    setRoomNumber('');
    setCategory('Single');
    setCustomCategory('');
    setPricePerNight('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <BedDouble className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Add New Room</h3>
              <p className="text-xs text-slate-500">Expand hotel inventory</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Room Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 401"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value === '' ? '' : parseInt(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono font-bold"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Category / Room Type <span className="text-rose-500">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            >
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Presidential">Presidential</option>
              <option value="Other">Custom Category...</option>
            </select>
          </div>

          {category === 'Other' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Custom Category Name
              </label>
              <input
                type="text"
                placeholder="e.g. Executive Studio"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Price per Night (₹) <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              min="1"
              step="50"
              placeholder="e.g. 2500"
              value={pricePerNight}
              onChange={(e) => setPricePerNight(e.target.value === '' ? '' : parseFloat(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-mono"
              required
            />
          </div>

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
              className="px-5 py-2 text-xs font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
