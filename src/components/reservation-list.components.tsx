import React from "react";
import { useAppContext } from "../hooks/context";

const ReservationList = ({ selectedRoom, selectedMovie }: any) => {
  const { state } = useAppContext();

  return (
    <div>
      <h1>Reservas</h1>
      <ul className="list-custom">
        {state.reservations.map((reservation, index) => (
          <li key={index} className="list-item">
            <div className="item-content">
              Película: {reservation.movieId} - Sala: {reservation.roomId} -
              Horario: {reservation.schedule} - Asientos:{" "}
              {reservation.selectedSeats.join(", ")}
            </div>
            <div className="item-action">Eliminar</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
