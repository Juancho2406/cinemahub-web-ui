import React from "react";
import { Reservation, useAppContext } from "../hooks/context";
import { ReservationService } from "../services/reservation.service";  // Asegúrate de importar el servicio

const ReservationList = ({ selectedRoom, selectedMovie }: any) => {
  const { state, dispatch } = useAppContext();

  // Función para manejar la eliminación de una reserva
  const handleDelete = (reservation: Reservation) => {
    // Llamar al servicio para borrar la reserva en la base de datos
    ReservationService.deleteReservation(reservation);

    // Actualizar el estado para eliminar la reserva de la lista
    // dispatch({ type: "DELETE_RESERVATION", payload: reservation });
  };

  return (
    <div>
      <h1>Reservas</h1>
      <ul className="list-custom">
        {state.reservations.map((reservation, index) => (
          <li key={index} className="list-item">
            <div className="item-content">
              Película: {reservation.movieName} - Sala: {reservation.roomName} -
              Horario: {reservation.schedule} - Asientos:{" "}
            </div>
            <div className="item-action">
              {/* Aquí asignamos el handleDelete a cada reserva */}
              <button onClick={() => handleDelete(reservation)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
