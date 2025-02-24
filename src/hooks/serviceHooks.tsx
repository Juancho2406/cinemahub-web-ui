import { useState, useEffect } from "react";
import { useAppContext, Movie, Room, Reservation } from "./context";
import { MovieService } from "../services/movie.service";
import { RoomService } from "../services/room.service";
import { ReservationService } from "../services/reservation.service";

// Funciones para obtener los datos de los servicios
const fetchMovies = async (): Promise<Movie[]> => {
  const movies = await MovieService.getMovies();
  return movies;
};

const fetchRooms = async (): Promise<Room[]> => {
  const rooms = await RoomService.getRooms();
  return rooms;
};

const fetchReservations = async (): Promise<Reservation[]> => {
  let reservations: any = [];
  try {
    reservations = await ReservationService.getReservations();
  } catch (error) {
    console.error(error);
  }
  return reservations;
};

// Hook para cargar los datos del cine
export const useCinemaServices = () => {
  const { dispatch } = useAppContext();
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const loadCinemaData = async () => {
      try {
        setLoading(true); // Inicia el loading al cargar los datos

        const movies = await fetchMovies();
        const rooms = await fetchRooms();
        const reservations = await fetchReservations();
        reservations.map((reservation) => {
          movies.map((movie) => {
            if (reservation.movieName === movie.id) {
              reservation.movieName = movie.title
            }
            return movie
          });
          return reservation
        });
        reservations.map((reservation) => {
          rooms.map((room) => {
            if (reservation.roomName === room.id) {
              reservation.roomName = room.name
            }
            return room
          });
          return reservation
        });
        dispatch({ type: "ADD_MOVIES", payload: movies });
        dispatch({ type: "ADD_ROOMS", payload: rooms });
        dispatch({ type: "ADD_RESERVATIONS", payload: reservations });

        setLoading(false); // Termina el loading cuando los datos estén cargados
      } catch (error) {
        setLoading(false); // Asegúrate de finalizar el loading incluso si hay un error
        console.error("Error loading cinema data:", error);
      }
    };

    loadCinemaData();
  }, [dispatch]);

  return { loading }; // Devuelve el estado de carga
};
