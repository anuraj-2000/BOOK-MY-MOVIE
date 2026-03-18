export interface Show {
  id: number;
  name: string;
  start_time: string;
  total_seats: number;
  available_seats: number;
}

export interface Booking {
  id: number;
  show_id: number;
  seats: number;
  status: string;
}