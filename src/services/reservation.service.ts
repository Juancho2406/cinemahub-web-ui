import axios from 'axios';
import { BASE_URL } from './movie.service';

export const createReservation = async (reservationData: { movie: string, room: string, seats: number }) => {
    try {
      const response = await axios.post(`${BASE_URL}/reservations`, reservationData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw error;
    }
  };
  