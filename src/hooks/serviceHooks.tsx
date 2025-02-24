import { useState, useEffect } from "react";
import { useAppContext, Movie, Room, Reservation } from "./context";
import { getMovies } from "../services/movie.service";
import { getRooms } from "../services/room.service";
import { getReservations } from "../services/reservation.service";
import {Loader} from "../components/at/loader-at-component"; // Asegúrate de importar tu componente Loader

// Funciones para obtener los datos de los servicios
const fetchMovies = async (): Promise<Movie[]> => {
  const movies = await getMovies();
  return movies;
};

const fetchRooms = async (): Promise<Room[]> => {
  const rooms = await getRooms();
  return rooms;
};

const fetchReservations = async (): Promise<Reservation[]> => {
  let reservations: any = [];
  try {
    reservations = await getReservations();
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
        // const reservations = await fetchReservations();

        dispatch({ type: "ADD_MOVIES", payload: movies });
        dispatch({ type: "ADD_ROOMS", payload: rooms });
        // dispatch({ type: "ADD_RESERVATIONS", payload: reservations });

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
