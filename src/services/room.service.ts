import axios from 'axios';
import { BASE_URL } from './movie.service';

export const createRoom = async (roomData: { name: string, capacity: number }) => {
    try {
      const response = await axios.post(`${BASE_URL}/rooms`, roomData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating room:', error);
      throw error;
    }
  };
  