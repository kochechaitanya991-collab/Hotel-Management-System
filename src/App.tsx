import { useState, useEffect } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { StatsOverview } from './components/StatsOverview';
import { RoomList } from './components/RoomList';
import { BookingModal } from './components/BookingModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ActiveBookings } from './components/ActiveBookings';
import { BillingHistory } from './components/BillingHistory';
import { BillReceiptModal } from './components/BillReceiptModal';
import { AddRoomModal } from './components/AddRoomModal';
import { TerminalView } from './components/TerminalView';
import { INITIAL_ROOMS, INITIAL_CUSTOMERS, INITIAL_RECEIPTS } from './data/initialData';
import { Room, Customer, BillReceipt } from './types/hotel';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('hms_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('hms_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [receipts, setReceipts] = useState<BillReceipt[]>(() => {
    const saved = localStorage.getItem('hms_receipts');
    return saved ? JSON.parse(saved) : INITIAL_RECEIPTS;
  });

  const [activeTab, setActiveTab] = useState<TabType>('rooms');

  // Modals state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<number | undefined>(undefined);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedRoomForCheckout, setSelectedRoomForCheckout] = useState<number | undefined>(undefined);

  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [currentReceipt, setCurrentReceipt] = useState<BillReceipt | null>(null);

  // Toast notifications
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    localStorage.setItem('hms_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('hms_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('hms_receipts', JSON.stringify(receipts));
  }, [receipts]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // MODULE 1: Room Creation
  const handleAddRoom = (roomNumber: number, category: string, pricePerNight: number) => {
    const newRoom: Room = {
      roomNumber,
      category,
      pricePerNight,
      isBooked: false,
    };
    setRooms((prev) => [...prev, newRoom].sort((a, b) => a.roomNumber - b.roomNumber));
    showToast(`Room #${roomNumber} (${category}) added to inventory.`);
  };

  // MODULE 2 & 3: Booking Operation
  const handleConfirmBooking = (roomNumber: number, name: string, phone: string, days: number) => {
    // 1. Mark room as booked
    setRooms((prev) =>
      prev.map((r) => (r.roomNumber === roomNumber ? { ...r, isBooked: true } : r))
    );

    // 2. Add customer
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name,
      phone,
      roomNumber,
      daysStayed: days,
      bookedAt: new Date().toISOString(),
    };
    setCustomers((prev) => [...prev, newCustomer]);

    showToast(`Booking confirmed! Room #${roomNumber} assigned to ${name}.`);
  };

  // MODULE 3: Check-Out & Bill Generation
  const handleConfirmCheckout = (roomNumber: number): BillReceipt | null => {
    const targetCustomer = customers.find((c) => c.roomNumber === roomNumber);
    const targetRoom = rooms.find((r) => r.roomNumber === roomNumber);

    if (!targetCustomer || !targetRoom) {
      showToast(`No active booking found for Room ${roomNumber}`, 'error');
      return null;
    }

    const totalBill = targetCustomer.daysStayed * targetRoom.pricePerNight;
    const newReceipt: BillReceipt = {
      id: `bill-${Date.now()}`,
      customerName: targetCustomer.name,
      phone: targetCustomer.phone,
      roomNumber: targetCustomer.roomNumber,
      roomCategory: targetRoom.category,
      daysStayed: targetCustomer.daysStayed,
      pricePerNight: targetRoom.pricePerNight,
      totalAmount: totalBill,
      checkOutDate: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    // 1. Mark room as available
    setRooms((prev) =>
      prev.map((r) => (r.roomNumber === roomNumber ? { ...r, isBooked: false } : r))
    );

    // 2. Remove customer from active list
    setCustomers((prev) => prev.filter((c) => c.roomNumber !== roomNumber));

    // 3. Save receipt
    setReceipts((prev) => [newReceipt, ...prev]);

    // 4. Open receipt modal
    setCurrentReceipt(newReceipt);
    showToast(`Check-out completed for Room #${roomNumber}. Bill: ₹${totalBill.toFixed(2)}`);

    return newReceipt;
  };

  const handleOpenBookModal = (roomNumber?: number) => {
    setSelectedRoomForBooking(roomNumber);
    setIsBookModalOpen(true);
  };

  const handleOpenCheckoutModal = (roomNumber?: number) => {
    setSelectedRoomForCheckout(roomNumber);
    setIsCheckoutModalOpen(true);
  };

  const availableRooms = rooms.filter((r) => !r.isBooked);
  const occupiedRooms = rooms.filter((r) => r.isBooked);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeBookingsCount={customers.length}
        availableRoomsCount={availableRooms.length}
        onOpenBookModal={() => handleOpenBookModal()}
        onOpenAddRoom={() => setIsAddRoomOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Toast Alert */}
        {toast && (
          <div
            className={`mb-4 p-3 rounded-xl border flex items-center justify-between text-xs font-semibold shadow-sm transition-all duration-300 ${
              toast.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => setToast(null)}
              className="text-slate-400 hover:text-slate-600 px-1 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Top KPIs Summary */}
        <StatsOverview rooms={rooms} customers={customers} receipts={receipts} />

        {/* Tab Views */}
        {activeTab === 'rooms' && (
          <RoomList
            rooms={rooms}
            customers={customers}
            onBookRoom={(num) => handleOpenBookModal(num)}
            onCheckoutRoom={(num) => handleOpenCheckoutModal(num)}
            onAddRoom={() => setIsAddRoomOpen(true)}
          />
        )}

        {activeTab === 'book' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Make a New Reservation</h2>
              <p className="text-xs text-slate-500 mb-6">
                Assign an available room, record guest information, and specify stay duration
              </p>
              {availableRooms.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-sm font-semibold text-slate-700">No rooms available</p>
                  <p className="text-xs text-slate-500 mt-1">Please check out an occupied room first.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const rNum = Number((form.elements.namedItem('room') as HTMLSelectElement).value);
                    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
                    const days = Number((form.elements.namedItem('days') as HTMLInputElement).value);
                    handleConfirmBooking(rNum, name, phone, days);
                    form.reset();
                    setActiveTab('rooms');
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Available Room</label>
                    <select
                      name="room"
                      className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      {availableRooms.map((r) => (
                        <option key={r.roomNumber} value={r.roomNumber}>
                          Room #{r.roomNumber} — {r.category} (₹{r.pricePerNight.toFixed(2)}/night)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Guest Full Name</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="e.g. John Doe"
                        required
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        required
                        className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Stay Duration (Days)</label>
                    <input
                      name="days"
                      type="number"
                      min="1"
                      defaultValue="1"
                      required
                      className="w-32 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 font-bold"
                    />
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-colors"
                    >
                      Complete Booking
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {activeTab === 'checkout' && (
          <div className="max-w-xl mx-auto">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
              <h2 className="text-lg font-bold text-slate-900 mb-1">Check-Out & Billing Service</h2>
              <p className="text-xs text-slate-500 mb-6">
                Select an occupied room to compute total room fees and finalize checkout
              </p>
              {occupiedRooms.length === 0 ? (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  <p className="text-sm font-semibold text-slate-700">No rooms currently occupied</p>
                  <p className="text-xs text-slate-500 mt-1">All rooms are currently vacant and ready for guests.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {occupiedRooms.map((r) => {
                    const cust = customers.find((c) => c.roomNumber === r.roomNumber);
                    const bill = cust ? cust.daysStayed * r.pricePerNight : 0;
                    return (
                      <div
                        key={r.roomNumber}
                        className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 font-mono text-sm">
                              Room #{r.roomNumber}
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                              {r.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            Guest: <strong className="text-slate-800">{cust?.name}</strong> •{' '}
                            {cust?.daysStayed} days
                          </p>
                          <p className="text-xs font-mono font-bold text-emerald-700 mt-0.5">
                            Total Due: ₹{bill.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => handleConfirmCheckout(r.roomNumber)}
                          className="px-4 py-2 text-xs font-semibold rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
                        >
                          Check Out & Bill
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <ActiveBookings
            customers={customers}
            rooms={rooms}
            onCheckout={(num) => handleOpenCheckoutModal(num)}
            onOpenBook={() => handleOpenBookModal()}
          />
        )}

        {activeTab === 'history' && (
          <BillingHistory
            receipts={receipts}
            onViewReceipt={(receipt) => setCurrentReceipt(receipt)}
          />
        )}

        {activeTab === 'terminal' && (
          <TerminalView
            rooms={rooms}
            customers={customers}
            onBookRoom={(roomNumber, name, phone, days) =>
              handleConfirmBooking(roomNumber, name, phone, days)
            }
            onCheckoutRoom={(roomNumber) => handleConfirmCheckout(roomNumber)}
          />
        )}
      </main>

      {/* Modals */}
      <BookingModal
        isOpen={isBookModalOpen}
        onClose={() => {
          setIsBookModalOpen(false);
          setSelectedRoomForBooking(undefined);
        }}
        availableRooms={availableRooms}
        initialSelectedRoomNumber={selectedRoomForBooking}
        onConfirmBooking={handleConfirmBooking}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => {
          setIsCheckoutModalOpen(false);
          setSelectedRoomForCheckout(undefined);
        }}
        occupiedRooms={occupiedRooms}
        customers={customers}
        initialSelectedRoomNumber={selectedRoomForCheckout}
        onConfirmCheckout={handleConfirmCheckout}
      />

      <AddRoomModal
        isOpen={isAddRoomOpen}
        onClose={() => setIsAddRoomOpen(false)}
        existingRooms={rooms}
        onAddRoom={handleAddRoom}
      />

      <BillReceiptModal
        receipt={currentReceipt}
        onClose={() => setCurrentReceipt(null)}
      />
    </div>
  );
}
