export type RoomCategory = 'Single' | 'Double' | 'Deluxe' | 'Suite' | string;

export interface Room {
  roomNumber: number;
  category: RoomCategory;
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
  roomCategory: RoomCategory;
  daysStayed: number;
  pricePerNight: number;
  totalAmount: number;
  checkOutDate: string;
}
