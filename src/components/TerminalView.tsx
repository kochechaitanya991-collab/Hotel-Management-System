import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, RotateCcw } from 'lucide-react';
import { Room, Customer, BillReceipt } from '../types/hotel';

interface TerminalViewProps {
  rooms: Room[];
  customers: Customer[];
  onBookRoom: (roomNumber: number, name: string, phone: string, days: number) => void;
  onCheckoutRoom: (roomNumber: number) => BillReceipt | null;
}

type Step =
  | 'MENU'
  | 'BOOK_ROOM_NUM'
  | 'BOOK_NAME'
  | 'BOOK_PHONE'
  | 'BOOK_DAYS'
  | 'CHECKOUT_ROOM_NUM';

export const TerminalView: React.FC<TerminalViewProps> = ({
  rooms,
  customers,
  onBookRoom,
  onCheckoutRoom,
}) => {
  const [history, setHistory] = useState<string[]>([
    '=================================',
    '     HOTEL MANAGEMENT SYSTEM     ',
    '=================================',
    '1. View Available Rooms',
    '2. Book a Room',
    '3. Check-Out & Generate Bill',
    '4. View Active Bookings',
    '5. Exit',
    'Enter choice (1-5):',
  ]);

  const [inputVal, setInputVal] = useState('');
  const [step, setStep] = useState<Step>('MENU');

  // Temporary booking buffer
  const [tempBooking, setTempBooking] = useState<{
    roomNumber: number;
    name: string;
    phone: string;
    days: number;
  }>({ roomNumber: 0, name: '', phone: '', days: 0 });

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const appendLines = (lines: string[]) => {
    setHistory((prev) => [...prev, ...lines]);
  };

  const showMenuPrompt = () => {
    appendLines([
      '',
      '=================================',
      '     HOTEL MANAGEMENT SYSTEM     ',
      '=================================',
      '1. View Available Rooms',
      '2. Book a Room',
      '3. Check-Out & Generate Bill',
      '4. View Active Bookings',
      '5. Exit',
      'Enter choice (1-5):',
    ]);
    setStep('MENU');
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const val = inputVal.trim();
    setInputVal('');

    if (step === 'MENU') {
      appendLines([`> ${val}`]);
      if (val === '1') {
        // View Available Rooms
        const output: string[] = ['', '--- Available Rooms ---'];
        let found = false;
        rooms.forEach((r) => {
          if (!r.isBooked) {
            output.push(
              `Room ${r.roomNumber} | Type: ${r.category.padEnd(10, ' ')} | Price: ₹${r.pricePerNight.toFixed(2)}/night | Status: Available`
            );
            found = true;
          }
        });
        if (!found) {
          output.push('No rooms currently available.');
        }
        appendLines(output);
        showMenuPrompt();
      } else if (val === '2') {
        // Book a Room
        const available = rooms.filter((r) => !r.isBooked);
        const output: string[] = ['', '--- Available Rooms ---'];
        if (available.length === 0) {
          output.push('No rooms currently available.');
          appendLines(output);
          showMenuPrompt();
          return;
        }
        available.forEach((r) => {
          output.push(
            `Room ${r.roomNumber} | Type: ${r.category.padEnd(10, ' ')} | Price: ₹${r.pricePerNight.toFixed(2)}/night | Status: Available`
          );
        });
        output.push('', 'Enter Room Number to Book:');
        appendLines(output);
        setStep('BOOK_ROOM_NUM');
      } else if (val === '3') {
        // Check-Out
        appendLines(['', 'Enter Room Number for Check-Out:']);
        setStep('CHECKOUT_ROOM_NUM');
      } else if (val === '4') {
        // View Active Bookings
        const output: string[] = ['', '--- Current Active Bookings ---'];
        if (customers.length === 0) {
          output.push('No active bookings.');
        } else {
          customers.forEach((c) => {
            output.push(
              `Room: ${c.roomNumber} | Guest: ${c.name} | Phone: ${c.phone} | Duration: ${c.daysStayed} days`
            );
          });
        }
        appendLines(output);
        showMenuPrompt();
      } else if (val === '5') {
        appendLines(['Exiting system. Good luck with your project!']);
        setTimeout(() => {
          showMenuPrompt();
        }, 1500);
      } else {
        appendLines(['Invalid selection. Try again.']);
        showMenuPrompt();
      }
    } else if (step === 'BOOK_ROOM_NUM') {
      appendLines([`> ${val}`]);
      const roomNum = parseInt(val);
      const selected = rooms.find((r) => r.roomNumber === roomNum && !r.isBooked);
      if (!selected) {
        appendLines(['Invalid Room Number or Room is already occupied.']);
        showMenuPrompt();
        return;
      }
      setTempBooking((prev) => ({ ...prev, roomNumber: roomNum }));
      appendLines(['Enter Customer Name:']);
      setStep('BOOK_NAME');
    } else if (step === 'BOOK_NAME') {
      appendLines([`> ${val}`]);
      if (!val) {
        appendLines(['Customer Name cannot be empty.']);
        showMenuPrompt();
        return;
      }
      setTempBooking((prev) => ({ ...prev, name: val }));
      appendLines(['Enter Customer Phone:']);
      setStep('BOOK_PHONE');
    } else if (step === 'BOOK_PHONE') {
      appendLines([`> ${val}`]);
      if (!val) {
        appendLines(['Customer Phone cannot be empty.']);
        showMenuPrompt();
        return;
      }
      setTempBooking((prev) => ({ ...prev, phone: val }));
      appendLines(['Enter Number of Days for Stay:']);
      setStep('BOOK_DAYS');
    } else if (step === 'BOOK_DAYS') {
      appendLines([`> ${val}`]);
      const days = parseInt(val);
      if (isNaN(days) || days <= 0) {
        appendLines(['Invalid number of days.']);
        showMenuPrompt();
        return;
      }
      onBookRoom(tempBooking.roomNumber, tempBooking.name, tempBooking.phone, days);
      appendLines([`Booking successful! Room ${tempBooking.roomNumber} assigned to ${tempBooking.name}.`]);
      showMenuPrompt();
    } else if (step === 'CHECKOUT_ROOM_NUM') {
      appendLines([`> ${val}`]);
      const roomNum = parseInt(val);
      const cust = customers.find((c) => c.roomNumber === roomNum);
      const room = rooms.find((r) => r.roomNumber === roomNum);

      if (!cust) {
        appendLines([`No active booking found for Room ${roomNum}`]);
        showMenuPrompt();
        return;
      }
      if (!room) {
        appendLines([`Room details could not be found for Room ${roomNum}`]);
        showMenuPrompt();
        return;
      }

      const receipt = onCheckoutRoom(roomNum);
      if (receipt) {
        appendLines([
          '',
          '==================================',
          '          CHECK-OUT BILL          ',
          '==================================',
          `Customer Name : ${receipt.customerName}`,
          `Phone Number  : ${receipt.phone}`,
          `Room Number   : ${receipt.roomNumber}`,
          `Room Category : ${receipt.roomCategory}`,
          `Stay Duration : ${receipt.daysStayed} days`,
          `Rate/Night    : ₹${receipt.pricePerNight.toFixed(2)}`,
          '----------------------------------',
          `Total Amount  : ₹${receipt.totalAmount.toFixed(2)}`,
          '==================================',
          'Check-out completed successfully.',
        ]);
      } else {
        appendLines(['Error processing check-out.']);
      }
      showMenuPrompt();
    }
  };

  const handleReset = () => {
    setHistory([
      '=================================',
      '     HOTEL MANAGEMENT SYSTEM     ',
      '=================================',
      '1. View Available Rooms',
      '2. Book a Room',
      '3. Check-Out & Generate Bill',
      '4. View Active Bookings',
      '5. Exit',
      'Enter choice (1-5):',
    ]);
    setStep('MENU');
    setInputVal('');
  };

  return (
    <div className="bg-slate-950 text-emerald-400 font-mono text-xs rounded-xl border border-slate-800 shadow-xl overflow-hidden flex flex-col h-[560px]">
      {/* Terminal Title Bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 ml-2">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            java HotelManagementSystem
          </span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Clear & Reset
        </button>
      </div>

      {/* Terminal Output Body */}
      <div className="flex-1 p-5 overflow-y-auto space-y-1 scrollbar-thin">
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.startsWith('>')
                ? 'text-white font-bold'
                : line.includes('CHECK-OUT BILL') || line.includes('HOTEL MANAGEMENT SYSTEM')
                ? 'text-amber-300 font-bold'
                : line.includes('Booking successful') || line.includes('Check-out completed')
                ? 'text-emerald-300 font-bold'
                : line.includes('Invalid') || line.includes('No active booking')
                ? 'text-rose-400 font-bold'
                : 'text-emerald-400'
            }`}
          >
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Prompt Input */}
      <form onSubmit={handleCommand} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-500 font-bold select-none">&gt;</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={step === 'MENU' ? 'Type 1, 2, 3, 4, or 5 and press Enter' : 'Enter input...'}
          className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 font-mono text-xs"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded flex items-center gap-1 transition-colors text-[11px]"
        >
          Send <CornerDownLeft className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
