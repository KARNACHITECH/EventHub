export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  image: string;
  category: string;
  ticketTypes: TicketType[];
  organizer: string;
  status: 'upcoming' | 'live' | 'ended';
  totalCapacity: number;
  soldTickets: number;
  featured: boolean;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  available: number;
  total: number;
  description?: string;
  perks?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'user' | 'admin';
  bookings: Booking[];
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  tickets: BookingTicket[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
  paymentMethod: string;
  confirmationCode: string;
}

export interface BookingTicket {
  ticketTypeId: string;
  quantity: number;
  price: number;
}

export interface CartItem {
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  price: number;
}