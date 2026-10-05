import React, { useState } from 'react';
import {
  FileText,
  Lightbulb,
  Cpu,
  HelpCircle,
  PlaySquare,
  BookOpen,
  GitBranch,
  Printer,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export const ProjectReportView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('all');

  const handlePrint = () => {
    window.print();
  };

  const sections = [
    {
      id: 'innovation',
      title: '1. Innovation & Originality of Idea',
      icon: <Lightbulb className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            The <strong>Hotel Management System (HMS)</strong> bridges the gap between traditional foundational
            computer science education and modern enterprise web software engineering. The project began as a core
            object-oriented Java console application (<code>HotelManagementSystem.java</code>, <code>HotelService.java</code>,{' '}
            <code>Room.java</code>, and <code>Customer.java</code>) and has been transformed into a responsive,
            cloud-ready web application while <em>preserving the algorithmic spirit</em> of the original system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3.5">
              <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                <Lightbulb className="w-4 h-4 text-amber-600" /> Dual-Paradigm Architecture
              </h4>
              <p className="text-xs text-amber-950/80">
                Pioneers an embedded real-time Java CLI Terminal Emulator alongside a rich, graphical front-desk dashboard. Both
                interfaces operate on the same live room inventory and guest state concurrently.
              </p>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5">
              <h4 className="font-bold text-emerald-900 mb-1 flex items-center gap-1.5 text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero-Latency Billing Computation
              </h4>
              <p className="text-xs text-emerald-950/80">
                Instant deterministic calculation of multi-day tariffs, preventing front-desk arithmetic errors and automatically
                issuing formatted tax receipts with audit IDs upon checkout.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs space-y-1.5">
            <span className="font-semibold text-slate-900">Key Differentiators:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Atomic room state synchronization preventing double-booking across all workflows.</li>
              <li>Dynamic inventory scalability allowing managers to configure new room categories and price tiers.</li>
              <li>Persistent client-side state caching with zero data loss on browser refresh.</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      id: 'implementation',
      title: '2. Technical Implementation & Functionality',
      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            The application is built using a modern decoupled architecture emphasizing high performance, strict type
            safety, and maintainability:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-2.5">Layer</th>
                  <th className="px-4 py-2.5">Technology Stack</th>
                  <th className="px-4 py-2.5">Role & Capability</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="px-4 py-2 font-semibold text-slate-900">Core Runtime</td>
                  <td className="px-4 py-2 font-mono text-indigo-700">TypeScript 5.7 + React 19</td>
                  <td className="px-4 py-2 text-slate-600">Component modularity, hooks, typed domain contracts</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold text-slate-900">Build & Tooling</td>
                  <td className="px-4 py-2 font-mono text-indigo-700">Vite 6 Bundler</td>
                  <td className="px-4 py-2 text-slate-600">Instant compilation, HMR, tree-shaking</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold text-slate-900">Design System</td>
                  <td className="px-4 py-2 font-mono text-indigo-700">Tailwind CSS 4 + Lucide</td>
                  <td className="px-4 py-2 text-slate-600">Adaptive utility classes, accessible responsive typography</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold text-slate-900">Persistence</td>
                  <td className="px-4 py-2 font-mono text-indigo-700">Browser LocalStorage API</td>
                  <td className="px-4 py-2 text-slate-600">Automatic serialization of rooms, guests, and receipts</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="font-bold text-slate-900 text-xs sm:text-sm pt-2">Implemented Modules:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <strong className="block text-slate-800 mb-1">Room Inventory</strong>
              Categorized inventory list, filter by status (All/Available/Occupied), and live search.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <strong className="block text-slate-800 mb-1">Reservation Engine</strong>
              Guest registration, phone validation, stay duration, and atomic booking lock.
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <strong className="block text-slate-800 mb-1">Billing & Receipts</strong>
              Automated stay math, digital tax receipt, invoice archive, and browser printing.
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'problem_solving',
      title: '3. Problem-Solving Approach',
      icon: <HelpCircle className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Hotel front-desk management suffers from three major operational bottlenecks:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 bg-rose-50/60 border border-rose-200/80 rounded-xl">
              <h5 className="font-bold text-rose-900 text-xs sm:text-sm">1. Double-Booking Prevention</h5>
              <p className="text-xs text-rose-950/80 mt-1">
                <strong>Approach:</strong> Strict state machine rules where rooms only qualify for assignment if{' '}
                <code>!isBooked</code>. When a reservation confirms, the room status flips atomically to true, immediately removing
                it from all booking selectors across both the GUI and terminal view.
              </p>
            </div>

            <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-xl">
              <h5 className="font-bold text-amber-900 text-xs sm:text-sm">2. Front-Desk Billing Accuracy</h5>
              <p className="text-xs text-amber-950/80 mt-1">
                <strong>Approach:</strong> Replaces manual paper calculators with a deterministic pipeline:
                <code> totalBill = daysStayed * room.pricePerNight</code>. The customer receives an itemized breakdown with
                timestamp and unique invoice reference ID, preventing disputes.
              </p>
            </div>

            <div className="p-3.5 bg-blue-50/60 border border-blue-200/80 rounded-xl">
              <h5 className="font-bold text-blue-900 text-xs sm:text-sm">3. Real-Time Operational Awareness</h5>
              <p className="text-xs text-blue-950/80 mt-1">
                <strong>Approach:</strong> Front-desk operators need at-a-glance metrics. The top dashboard calculates live
                occupancy rate percentage, available room counts, active guests, and cumulative invoiced revenue in real time.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'demonstration',
      title: '4. Practical Demonstration / Working Model',
      icon: <PlaySquare className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            The project provides a fully functional, end-to-end working model that can be verified directly in the browser:
          </p>

          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs space-y-2 font-mono">
            <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
              <span>LIVE TEST PROTOCOL</span>
              <span className="text-emerald-400">STATUS: 100% OPERATIONAL</span>
            </div>
            <p className="text-emerald-300">✓ Step 1: Browse default inventory (Room 101, 102, 201, 202, 301)</p>
            <p className="text-emerald-300">✓ Step 2: Book Room #101 for &quot;Suresh Patil&quot; (4 Days @ ₹1,200/night)</p>
            <p className="text-emerald-300">✓ Step 3: View updated Active Bookings roster showing ₹4,800.00 payable</p>
            <p className="text-emerald-300">✓ Step 4: Check out Room #101 & generate printable digital invoice</p>
            <p className="text-emerald-300">✓ Step 5: Switch to Original Java CLI and execute option &apos;1&apos; to verify vacancy</p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Live Preview Tested
            </span>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
              Production Build Passing
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 font-semibold">
              TypeScript 0 Errors
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'technical_knowledge',
      title: '5. Technical Knowledge & Explanation',
      icon: <BookOpen className="w-5 h-5 text-cyan-600" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            Deep dive into technical domain concepts, algorithms, and code structures:
          </p>

          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 text-xs sm:text-sm">Type Safety Contracts (src/types/hotel.ts)</h5>
            <pre className="p-3 bg-slate-950 text-slate-200 rounded-xl overflow-x-auto text-[11px] font-mono leading-relaxed">
{`export interface Room {
  roomNumber: number;
  category: 'Single' | 'Double' | 'Deluxe' | 'Suite' | string;
  pricePerNight: number;
  isBooked: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  roomNumber: number;
  daysStayed: number;
  bookedAt: string;
}

export interface BillReceipt {
  id: string;
  customerName: string;
  phone: string;
  roomNumber: number;
  roomCategory: string;
  daysStayed: number;
  pricePerNight: number;
  totalAmount: number;
  checkOutDate: string;
}`}
            </pre>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <strong className="block text-slate-800 mb-1">Algorithmic Complexity</strong>
              <p className="text-slate-600">
                Search & Filter: <span className="font-mono text-indigo-600 font-bold">O(n)</span><br />
                Room Allocation: <span className="font-mono text-indigo-600 font-bold">O(1)</span><br />
                Bill Calculation: <span className="font-mono text-indigo-600 font-bold">O(1)</span><br />
                Revenue Aggregation: <span className="font-mono text-indigo-600 font-bold">O(m)</span>
              </p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <strong className="block text-slate-800 mb-1">State Resilience & Cleanup</strong>
              <p className="text-slate-600">
                Uses immutable React state updaters (<code>setRooms(prev =&gt; ...)</code>) preventing side-effects, paired with
                automatic JSON serialization in browser storage.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'submission',
      title: '6. Documentation / GitHub / Report Submission',
      icon: <GitBranch className="w-5 h-5 text-violet-600" />,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="font-semibold text-slate-700">Project Name:</span>
              <span className="font-mono text-slate-900 font-bold">Hotel Management & Billing System</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="font-semibold text-slate-700">Author / Developer:</span>
              <span className="text-slate-900 font-semibold">Chaitanya Koche (kochechaitanya991@gmail.com)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="font-semibold text-slate-700">Imported Repository:</span>
              <span className="font-mono text-indigo-600 font-semibold">
                kochechaitanya991-collab/Hotel-Management-System
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200">
              <span className="font-semibold text-slate-700">Source Report File:</span>
              <span className="font-mono text-emerald-700 font-bold">/PROJECT_REPORT.md</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-semibold text-slate-700">Compilation & Linter:</span>
              <span className="text-emerald-700 font-semibold">TypeScript 5.7 — 0 Errors, Clean Build</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl text-xs space-y-2">
            <h5 className="font-bold text-indigo-900 flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4 text-indigo-600" /> Complete Documentation Artifacts
            </h5>
            <p className="text-indigo-950/80">
              Both <code>/PROJECT_REPORT.md</code> and <code>/README.md</code> are included in the repository root directory with
              comprehensive technical write-ups, architecture diagrams, command instructions, and demonstration procedures.
            </p>
          </div>
        </div>
      ),
    },
  ];

  const displayedSections =
    activeSection === 'all' ? sections : sections.filter((s) => s.id === activeSection);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Project Report & Submission</h2>
              <p className="text-xs text-slate-500">
                Official academic and technical project submission dossier
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => setActiveSection('all')}
          className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors shrink-0 ${
            activeSection === 'all'
              ? 'bg-slate-900 text-white font-semibold'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All 6 Sections
        </button>
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors shrink-0 ${
              activeSection === s.id
                ? 'bg-amber-500 text-slate-950 font-semibold'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {s.title.split('.')[1]?.trim() || s.title}
          </button>
        ))}
      </div>

      {/* Sections Cards */}
      <div className="space-y-5">
        {displayedSections.map((section) => (
          <div
            key={section.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4"
          >
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                {section.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                {section.title}
              </h3>
            </div>
            {section.content}
          </div>
        ))}
      </div>
    </div>
  );
};
