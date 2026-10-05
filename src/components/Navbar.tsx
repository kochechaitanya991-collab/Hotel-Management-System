import React from 'react';
import { Hotel, BedDouble, CalendarPlus, LogOut, Users, Receipt, Terminal, Plus, FileText } from 'lucide-react';

export type TabType = 'rooms' | 'book' | 'checkout' | 'bookings' | 'history' | 'terminal' | 'report';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  activeBookingsCount: number;
  availableRoomsCount: number;
  onOpenBookModal: () => void;
  onOpenAddRoom: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  activeBookingsCount,
  availableRoomsCount,
  onOpenBookModal,
  onOpenAddRoom,
}) => {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'rooms', label: 'Rooms & Inventory', icon: <BedDouble className="w-4 h-4" />, badge: availableRoomsCount },
    { id: 'book', label: 'Book Room', icon: <CalendarPlus className="w-4 h-4" /> },
    { id: 'checkout', label: 'Check-Out & Bill', icon: <LogOut className="w-4 h-4" /> },
    { id: 'bookings', label: 'Active Bookings', icon: <Users className="w-4 h-4" />, badge: activeBookingsCount },
    { id: 'history', label: 'Billing Records', icon: <Receipt className="w-4 h-4" /> },
    { id: 'terminal', label: 'Original Java CLI', icon: <Terminal className="w-4 h-4" /> },
    { id: 'report', label: 'Project Report & Submission', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('rooms')}>
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Hotel className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                Grand Heritage
                <span className="text-xs px-2 py-0.5 rounded font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  HMS v1.0
                </span>
              </span>
              <p className="text-xs text-slate-400">Hotel Management & Billing System</p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddRoom}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Room
            </button>
            <button
              onClick={onOpenBookModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-colors"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              Quick Book
            </button>
          </div>
        </div>

        {/* Mobile Nav Tabs */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-800 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${
                  isActive ? 'bg-amber-500 text-slate-950 font-semibold' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && <span>({item.badge})</span>}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
