import axios from "axios";
import { BASE_URL } from "./movie.service"; // Asegúrate de que la ruta esté correcta
import { Room } from "../hooks/context";

export class RoomService {
  // Crear una sala
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

  // Obtener todas las salas
  static async getRooms() {
    try {
      const response = await axios.get(`${BASE_URL}/rooms`, {
        headers: {
          Accept: "application/json"
        }
      });
      const rooms: [any] = response.data;
      rooms.map((room) => {
        const array = JSON.parse(room.seats);
        room.seats = array
        return room;
      });
      return rooms; // Devuelve la lista de salas
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error; // Lanza el error para manejarlo en la parte que lo llame
    }
  }

  // Eliminar una sala por nombre
  static async deleteRoom(room: Room) {
    try {
      const response = await axios.delete(`${BASE_URL}/rooms/${room.name}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response.data; // Devuelve la respuesta del backend (puede ser un mensaje de éxito)
    } catch (error) {
      console.error("Error deleting room:", error);
      throw error; // Lanza el error para manejarlo en la parte que lo llame
    }
  }

  // Actualizar una sala
  static async updateRoom(room: Room) {
    try {
      const response = await axios.put(`${BASE_URL}/rooms/${room.name}`, room, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response.data; // Devuelve la sala actualizada
    } catch (error) {
      console.error("Error updating room:", error);
      throw error; // Lanza el error para manejarlo en la parte que lo llame
    }
  }
}
