import { useEffect } from "react";
import { useAppContext,Movie, Room, Reservation } from "./context"; 
import { ensureSeats } from "../utils/utilsSeats";
import { getMovies } from "../services/movie.service";
import { getRooms } from "../services/room.service";
import { getReservations } from "../services/reservation.service";


const fetchMovies = async (): Promise<Movie[]> => {
  const movies = await getMovies()
  return movies
};

const fetchRooms = async (): Promise<Room[]> => {
  const rooms = await getRooms()
  return rooms
};

const fetchReservations = async (): Promise<Reservation[]> => {
  let reservations:any = []
  try {
    reservations = await getReservations()
  } catch (error) {
    
  }
  return reservations
};

export const useCinemaServices = () => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    const loadCinemaData = async () => {
      try {

        const movies = await fetchMovies();
        const rooms = await fetchRooms();

        const reservations = await fetchReservations();

        dispatch({ type: "ADD_MOVIES", payload: movies });
        dispatch({ type: "ADD_ROOMS", payload: rooms });
        dispatch({ type: "ADD_RESERVATIONS", payload: reservations });
      } catch (error) {
        console.error("Error loading cinema data:", error);
      }
    };

    loadCinemaData();
  }, [dispatch]); 
};

