import axios from "axios";
import { BASE_URL } from "./movie.service"; 
import { Room } from "../hooks/context";

export class RoomService {

  static async createRoom(roomData: Room) {
    const roomDataBody = {
      ...roomData,
      seats: JSON.stringify(roomData.seats)
    };
    try {
      const response = await axios.post(`${BASE_URL}/rooms`, roomDataBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating room:", error);
      throw error;
    }
  }

  static async getRooms() {
    try {
      const response = await axios.get(`${BASE_URL}/rooms`, {
        headers: {
          Accept: "application/json"
        }
      });
      const rooms: [any] = response.data;
      return rooms; 
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error; 
    }
  }

  static async deleteRoom(room: Room) {
    try {
      const response = await axios.delete(`${BASE_URL}/rooms/${room.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response.data; 
    } catch (error) {
      console.error("Error deleting room:", error);
      throw error; 
    }
  }

  static async updateRoom(room: Room) {
    try {
      const response = await axios.put(`${BASE_URL}/rooms/${room.id}`, room, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response.data; 
    } catch (error) {
      console.error("Error updating room:", error);
      throw error; 
    }
  }
}
