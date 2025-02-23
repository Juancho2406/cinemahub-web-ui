import React from "react";
import { useCinemaServices } from "../hooks/serviceHooks";
import MovieList from "../components/movie-list.component";
import RoomList from "../components/room-list.component";
import ReservationList from "../components/reservation-list.components";
import MovieForm from "../components/movie-form.component";
import RoomForm from "../components/room-form.component";
import ReservationForm from "../components/reservation-form.component";
export const CinemaHubComponent = () => {
  useCinemaServices();
  return (
    <div>
      <MovieList></MovieList>
      <MovieForm></MovieForm>
      <RoomList></RoomList>
      <RoomForm></RoomForm>
      <ReservationList></ReservationList>
      <ReservationForm></ReservationForm>
    </div>
  );
};
