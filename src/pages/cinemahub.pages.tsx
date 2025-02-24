import React, { useState } from "react";
import { useCinemaServices } from "../hooks/serviceHooks";
import MovieList from "../components/movie-list.component";
import RoomList from "../components/room-list.component";
import ReservationList from "../components/reservation-list.components";
import MovieForm from "../components/movie-form.component";
import RoomForm from "../components/room-form.component";
import ReservationForm from "../components/reservation-form.component";
import { Loader } from "../components/at/loader-at-component";

export const CinemaHubComponent = () => {
  const { loading } = useCinemaServices(); // Obtiene el estado de carga
  const [activeMenu, setActiveMenu] = useState<string>("movies"); // Estado para controlar el menú activo

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="cinemaHubPage">
      {/* Barra de Menús */}
      <div className="menu-bar">
        <button onClick={() => setActiveMenu("movies")}>Películas</button>
        <button onClick={() => setActiveMenu("rooms")}>Salas</button>
        <button onClick={() => setActiveMenu("reservations")}>
          Reservaciones
        </button>
      </div>

      {/* Contenido Dinámico */}
      <div className="content">
        {activeMenu === "movies" && (
          <>
            <h1>Películas</h1>
            <MovieList />
            <MovieForm />
          </>
        )}
        {activeMenu === "rooms" && (
          <>
            <h1>Salas</h1>
            <RoomList />
            <RoomForm />
          </>
        )}
        {activeMenu === "reservations" && (
          <>
            <h2>Reservaciones</h2>
            <ReservationList />
            <ReservationForm />
          </>
        )}
      </div>
    </div>
  );
};
