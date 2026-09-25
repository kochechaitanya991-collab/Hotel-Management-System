import { Room, Customer, BillReceipt } from '../types/hotel';

export const INITIAL_ROOMS: Room[] = [
  { roomNumber: 101, category: 'Single', pricePerNight: 1200, isBooked: false },
  { roomNumber: 102, category: 'Single', pricePerNight: 1200, isBooked: false },
  { roomNumber: 201, category: 'Double', pricePerNight: 2000, isBooked: true },
  { roomNumber: 202, category: 'Double', pricePerNight: 2000, isBooked: false },
  { roomNumber: 301, category: 'Deluxe', pricePerNight: 3500, isBooked: false },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    roomNumber: 201,
    daysStayed: 3,
    bookedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const INITIAL_RECEIPTS: BillReceipt[] = [
  {
    id: 'bill-prev-1',
    customerName: 'Ananya Verma',
    phone: '+91 98111 22334',
    roomNumber: 101,
    roomCategory: 'Single',
    daysStayed: 2,
    pricePerNight: 1200,
    totalAmount: 2400,
    checkOutDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleString('en-IN'),
  },
];
