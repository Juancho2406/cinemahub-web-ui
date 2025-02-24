import axios from "axios";
import { BASE_URL } from "./movie.service"; // Asegúrate de que la ruta esté correcta
import { Reservation } from "../hooks/context";

export class ReservationService {
  // Crear una reserva
  static async createReservation(reservationData: Reservation) {
    const reservationBody = {
      movieId: reservationData.movieName,
      roomId: reservationData.roomName,
      movieName: reservationData.movieName,
      roomName: reservationData.roomName,
      seats: JSON.stringify([]), // Suponiendo que es un array vacío, lo puedes cambiar
      email: reservationData.email,
      sendConfirmationEmail: reservationData.sendConfirmationEmail,
    };

    try {
      const response = await axios.post(`${BASE_URL}/reservations`, reservationBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  }

  // Obtener todas las reservas
  static async getReservations(): Promise<Reservation[]> {
    try {
      const response = await axios.get(`${BASE_URL}/reservations`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      return response.data; 
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error; 
    }
  }

  // Eliminar una reserva por ID
  static async deleteReservation(reservation: Reservation) {
    try {
      const response = await axios.delete(`${BASE_URL}/reservations/${reservation.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data; // Devuelve la respuesta del backend (puede ser un mensaje de éxito)
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error; // Lanza el error para manejarlo en la parte que lo llame
    }
  }

  // Actualizar una reserva
  static async updateReservation(reservationData: Reservation) {
    const reservationBody = {
      movieId: reservationData.movieId,
      roomId: reservationData.roomId,
      seats: JSON.stringify(reservationData.schedule), // Suponiendo que seats es un array
      email: reservationData.email,
      sendConfirmationEmail: reservationData.sendConfirmationEmail,
    };

    try {
      const response = await axios.put(`${BASE_URL}/reservations`, reservationBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating reservation:", error);
      throw error; // Lanza el error para manejarlo en la parte que lo llame
    }
  }
}
