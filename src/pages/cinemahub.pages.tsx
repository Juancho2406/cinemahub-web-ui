import React, { useContext, useEffect } from "react";
import { useCinemaServices } from "../hooks/serviceHooks";
import MovieList from "../components/movie-list.component";
import RoomList from "../components/room-list.component";
import ReservationList from "../components/reservation-list.components";
import MovieForm from "../components/movie-form.component";
import RoomForm from "../components/room-form.component";
import ReservationForm from "../components/reservation-form.component";
import { Loader } from "../components/at/loader-at-component";
import { useAppContext } from "../hooks/context";

export const CinemaHubComponent = () => {
  const { loading } = useCinemaServices(); // Obtiene el estado de carga
  const { state } = useAppContext();

  useEffect(() => {
    console.log(state);
  }, [state]);
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="cinemaHubPage">
      <MovieList></MovieList>
      <MovieForm></MovieForm>
      <RoomList></RoomList>
      <RoomForm></RoomForm>
      <ReservationList></ReservationList>
      <ReservationForm></ReservationForm>
    </div>
  );
};
