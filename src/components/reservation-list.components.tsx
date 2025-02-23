import React from "react";
import { useAppContext } from "../hooks/context";
const ReservationList = ({ selectedRoom, selectedMovie }: any) => {
  const { state } = useAppContext();
  return (
    <div>
      <h1>Reservas</h1>
      <ul>
        {state.reservations.map((reservation, index) => (
          <li key={index}>
            Película: {reservation.movieId} - Sala: {reservation.roomId} -
            Horario: {reservation.schedule} - Asientos:{" "}
            {reservation.selectedSeats.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;