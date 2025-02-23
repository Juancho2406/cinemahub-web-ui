import axios from "axios";
import { BASE_URL } from "./movie.service";
import { Reservation } from "../hooks/context";

export const createReservation = async (reservationData: Reservation) => {
  const reservationBody = {
    movie: reservationData.movieId,
    room: reservationData.roomId,
    seats: reservationData.reservedSeats
  }
  try {
    const response = await axios.post(
      `${BASE_URL}/reservations`,
      reservationBody,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};

export const getReservations = async (): Promise<Reservation[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/reservations`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

    return response.data; // Devuelve la lista de reservas
  } catch (error) {
    console.error("Error fetching reservations:", error);
    throw error; // Lanza el error para manejarlo en la parte que lo llame
  }
};