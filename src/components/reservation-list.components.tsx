import React from "react";
import { Reservation, useAppContext } from "../hooks/context";
import { ReservationService } from "../services/reservation.service"; // Asegúrate de importar el servicio

const ReservationList = () => {
  const { state, dispatch } = useAppContext();
  // Función para manejar la eliminación de una reserva
  const handleDelete = (reservation: Reservation) => {
    console.log(reservation);
    // Llamar al servicio para borrar la reserva en la base de datos
    ReservationService.deleteReservation(reservation);
    dispatch({ type: "DELETE_RESERVATION", payload: reservation });
  };
  // Función para manejar la selección de una reserva
  const handleSelect = (reservation: Reservation) => {
    dispatch({ type: "SELECTED_RESERVATION", payload: reservation });
  };

  return (
    <div>
      <h1>Reservas</h1>
      <ul className="list-custom">
        {state.reservations.map((reservation, index) => (
          <li
            key={index}
            className="list-item"
            onClick={() => handleSelect(reservation)}
          >
            <div className="item-content">
              Película: {reservation.movieName} - Sala: {reservation.roomName} -
              Horario: {reservation.schedule} -<span>Asientos: </span>
              <span className="reserved-seats">
                {reservation.reservedSeats
                  ? reservation.reservedSeats.join(", ")
                  : ""}
              </span>
            </div>

            <div className="item-action">
              {/* Aquí asignamos el handleDelete a cada reserva */}
              <button onClick={() => handleDelete(reservation)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
