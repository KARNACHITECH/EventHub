import { Event, User, Booking } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative startups, and cutting-edge technology demonstrations.',
    date: '2024-03-15',
    time: '09:00',
    venue: 'Convention Center',
    location: 'Downtown City',
    image: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Technology',
    organizer: 'Tech Events Inc.',
    status: 'upcoming',
    totalCapacity: 500,
    soldTickets: 245,
    featured: true,
    ticketTypes: [
      {
        id: '1',
        name: 'Early Bird',
        price: 99,
        available: 50,
        total: 100,
        description: 'Limited early bird pricing',
        perks: ['Conference materials', 'Networking lunch', 'Certificate']
      },
      {
        id: '2',
        name: 'Regular',
        price: 149,
        available: 180,
        total: 300,
        description: 'Standard conference ticket',
        perks: ['Conference materials', 'Networking lunch']
      },
      {
        id: '3',
        name: 'VIP',
        price: 299,
        available: 25,
        total: 100,
        description: 'Premium experience with exclusive benefits',
        perks: ['All Regular benefits', 'VIP seating', 'Meet & greet', 'Exclusive dinner']
      }
    ]
  },
  {
    id: '2',
    title: 'Music Festival Summer',
    description: 'Three days of amazing music with top artists from around the world. Experience the best in electronic, rock, and indie music.',
    date: '2024-06-20',
    time: '16:00',
    venue: 'City Park',
    location: 'Central Park',
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Music',
    organizer: 'Summer Music Ltd.',
    status: 'upcoming',
    totalCapacity: 2000,
    soldTickets: 1200,
    featured: true,
    ticketTypes: [
      {
        id: '4',
        name: 'General Admission',
        price: 79,
        available: 500,
        total: 1500,
        description: 'Access to all stages and areas'
      },
      {
        id: '5',
        name: 'VIP Pass',
        price: 199,
        available: 150,
        total: 300,
        description: 'Premium experience with exclusive access',
        perks: ['VIP area access', 'Complimentary drinks', 'Artist meet & greet']
      },
      {
        id: '6',
        name: '3-Day Pass',
        price: 199,
        available: 150,
        total: 200,
        description: 'Full festival access for all three days',
        perks: ['All days access', 'Festival merchandise', 'Camping pass']
      }
    ]
  },
  {
    id: '3',
    title: 'Art Exhibition Opening',
    description: 'Discover contemporary art from emerging and established artists. An exclusive opening night with wine tasting and artist talks.',
    date: '2024-04-10',
    time: '18:00',
    venue: 'Modern Art Gallery',
    location: 'Arts District',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Art',
    organizer: 'Gallery Modern',
    status: 'upcoming',
    totalCapacity: 150,
    soldTickets: 89,
    featured: false,
    ticketTypes: [
      {
        id: '7',
        name: 'Standard Entry',
        price: 25,
        available: 40,
        total: 100,
        description: 'Gallery access and wine tasting'
      },
      {
        id: '8',
        name: 'Collector Pass',
        price: 75,
        available: 21,
        total: 50,
        description: 'Exclusive benefits for art collectors',
        perks: ['Private viewing', 'Artist meet & greet', 'Catalog signed by artists']
      }
    ]
  },
  {
    id: '4',
    title: 'Business Summit 2024',
    description: 'Network with industry leaders and learn about the latest business trends, strategies, and innovations that will shape the future.',
    date: '2024-05-08',
    time: '08:30',
    venue: 'Business Center',
    location: 'Financial District',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Business',
    organizer: 'Business Leaders Network',
    status: 'upcoming',
    totalCapacity: 300,
    soldTickets: 156,
    featured: true,
    ticketTypes: [
      {
        id: '9',
        name: 'Professional',
        price: 199,
        available: 80,
        total: 200,
        description: 'Full summit access with networking opportunities'
      },
      {
        id: '10',
        name: 'Executive',
        price: 399,
        available: 64,
        total: 100,
        description: 'Premium experience with exclusive sessions',
        perks: ['Executive lounge access', 'Private networking dinner', 'One-on-one mentoring']
      }
    ]
  },
  {
    id: '5',
    title: 'Food & Wine Festival',
    description: 'Savor the finest cuisines and wines from around the world. Meet renowned chefs and participate in cooking workshops.',
    date: '2024-07-15',
    time: '12:00',
    venue: 'Waterfront Plaza',
    location: 'Marina District',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Food',
    organizer: 'Culinary Events Co.',
    status: 'upcoming',
    totalCapacity: 800,
    soldTickets: 432,
    featured: false,
    ticketTypes: [
      {
        id: '11',
        name: 'Tasting Pass',
        price: 65,
        available: 200,
        total: 500,
        description: 'Access to all food and wine tastings'
      },
      {
        id: '12',
        name: 'Chef Experience',
        price: 150,
        available: 168,
        total: 300,
        description: 'Includes cooking workshops and chef meet & greets',
        perks: ['Cooking workshop', 'Recipe book', 'Chef autograph session']
      }
    ]
  },
  {
    id: '6',
    title: 'Startup Pitch Competition',
    description: 'Watch innovative startups pitch their ideas to top investors. Network with entrepreneurs and discover the next big thing.',
    date: '2024-08-22',
    time: '14:00',
    venue: 'Innovation Hub',
    location: 'Tech Quarter',
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Business',
    organizer: 'Startup Accelerator',
    status: 'upcoming',
    totalCapacity: 250,
    soldTickets: 127,
    featured: true,
    ticketTypes: [
      {
        id: '13',
        name: 'Observer',
        price: 49,
        available: 73,
        total: 150,
        description: 'Watch the competition and network'
      },
      {
        id: '14',
        name: 'Investor Pass',
        price: 199,
        available: 50,
        total: 100,
        description: 'Access to private investor sessions',
        perks: ['Investor meetup', 'Startup pitch decks', 'Private networking']
      }
    ]
  }
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  role: 'user',
  bookings: []
};

export const mockBookings: Booking[] = [
  {
    id: '1',
    eventId: '1',
    userId: '1',
    tickets: [
      { ticketTypeId: '1', quantity: 2, price: 99 }
    ],
    totalAmount: 198,
    status: 'confirmed',
    bookingDate: '2024-02-15',
    paymentMethod: 'Credit Card',
    confirmationCode: 'TC2024-001'
  }
];