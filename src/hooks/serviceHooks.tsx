import { useState, useEffect } from "react";
import { useAppContext, Movie, Room, Reservation } from "./context";
import { MovieService } from "../services/movie.service";
import { RoomService } from "../services/room.service";
import { ReservationService } from "../services/reservation.service";

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

export const useCinemaServices = () => {
  const { dispatch } = useAppContext();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadCinemaData = async () => {
      try {
        setLoading(true);

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

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error loading cinema data:", error);
      }
    };

    loadCinemaData();
  }, [dispatch]);

  return { loading }; 
};
