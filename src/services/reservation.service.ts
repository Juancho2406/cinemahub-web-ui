import axios from "axios";
import { BASE_URL } from "./movie.service";
import { Reservation } from "../hooks/context";

export const createReservation = async (reservationData: Reservation) => {
  const reservationBody = {
    movieId: reservationData.movieId,
    roomId: reservationData.roomId,
    seats: JSON.stringify([]),
    email: reservationData.email,
    sendConfirmationEmail: reservationData.sendConfirmationEmail
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

export const deleteReservation = async (reservationId: string) => {
  try {
    const response = await axios.delete(`${BASE_URL}/reservations/${reservationId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
    return response.data; // Devuelve la respuesta del backend (puede ser un mensaje de éxito)
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw error; // Lanza el error para manejarlo en la parte que lo llame
  }
};