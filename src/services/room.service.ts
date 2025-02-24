import axios from "axios";
import { BASE_URL } from "./movie.service";

export const createRoom = async (roomData: {
  name: string;
  capacity: number;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/rooms`, roomData, {
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
};

export const getRooms = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/rooms`, {
      headers: {
        Accept: "application/json"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
};

export const deleteRoom = async (name: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/rooms/${name}`, {
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
};
