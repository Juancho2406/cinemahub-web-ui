import axios from "axios";
import { BASE_URL } from "./movie.service";
import { Reservation } from "../hooks/context";

export class ReservationService {

  static async createReservation(reservationData: Reservation) {
    const reservationBody = {
      movieId: reservationData.movieName,
      roomId: reservationData.roomName,
      movieName: reservationData.movieName,
      roomName: reservationData.roomName,
      reservedSeats: reservationData.reservedSeats,
      seats: reservationData.reservedSeats,
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


  static async deleteReservation(reservation: Reservation) {
    try {
      const response = await axios.delete(`${BASE_URL}/reservations/${reservation.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data; 
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw error; 
    }
  }

  static async updateReservation(reservationData: Reservation) {
    console.log(reservationData)
    const reservationBody = {
      movieId: reservationData.movieId,
      roomId: reservationData.roomId,
      seats: JSON.stringify(reservationData.schedule), 
      email: reservationData.email,
      sendConfirmationEmail: reservationData.sendConfirmationEmail,
    };

    try {
      const response = await axios.put(`${BASE_URL}/reservations/${reservationData.id}`, reservationBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating reservation:", error);
      throw error; 
    }
  }
}
