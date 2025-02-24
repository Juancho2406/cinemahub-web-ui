import React, { useState, useEffect } from "react";
import { useAppContext, Reservation } from "../hooks/context";
import { ReservationService } from "../services/reservation.service";
import { MapSeats } from "./map-seats-component";

const ReservationForm = () => {
  const { state, dispatch } = useAppContext();

  const [movieName, setmovieName] = useState<string>(
    state.selectedReservation ? state.selectedReservation.movieName : ""
  );
  const [roomName, setroomName] = useState<string>(
    state.selectedReservation ? state.selectedReservation.roomName : ""
  );
  const [schedule, setSchedule] = useState<string>(
    state.selectedReservation ? state.selectedReservation.schedule : ""
  );
  const [reservedSeats, setreservedSeats] = useState<string[]>(
    state.selectedReservation?.reservedSeats ?? []
  );
  const [email, setEmail] = useState<string>(
    state.selectedReservation ? state.selectedReservation.email : ""
  );
  const [sendConfirmationEmail, setSendConfirmationEmail] = useState<boolean>(
    state.selectedReservation ? true : false
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "movieName") setmovieName(value);
    if (name === "roomName") setroomName(value);
    if (name === "schedule") setSchedule(value);
    if (name === "email") setEmail(value);
    if (name === "sendConfirmationEmail" && "checked" in e.target) {
      setSendConfirmationEmail(e.target.checked);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation: Reservation = {
      movieName,
      roomName,
      schedule,
      reservedSeats,
      email,
      sendConfirmationEmail
    };

    if (state.selectedReservation) {
      // Si hay una reserva seleccionada, actualizamos
      await ReservationService.updateReservation(newReservation);
      dispatch({ type: "UPDATE_RESERVATION", payload: newReservation });
    } else {
      // Si no hay una reserva seleccionada, creamos una nueva
      await ReservationService.createReservation(newReservation);
      dispatch({ type: "ADD_RESERVATION", payload: newReservation });
    }

    // Limpiar formulario
    setmovieName("");
    setroomName("");
    setSchedule("");
    setreservedSeats([]);
    setEmail("");
    setSendConfirmationEmail(false);
  };

  useEffect(() => {
    if (state.selectedReservation) {
      // Llenar los campos con los datos de la reserva seleccionada
      setmovieName(state.selectedReservation.movieName);
      setroomName(state.selectedReservation.roomName);
      setSchedule(state.selectedReservation.schedule);
      setreservedSeats(state.selectedReservation.reservedSeats ?? []);
      setEmail(state.selectedReservation.email || "");
      setSendConfirmationEmail(
        state.selectedReservation.sendConfirmationEmail || false
      );
    }
  }, [state.selectedReservation]);

  return (
    <div>
      <h2>
        {state.selectedReservation ? "Editar Reserva" : "Registrar Reserva"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movieName" className="input-label">
            Película:
          </label>
          <select
            className="select-custom"
            id="movieName"
            name="movieName"
            value={movieName}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una película</option>
            {state.movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="roomName" className="input-label">
            Sala:
          </label>
          <select
            className="select-custom"
            id="roomName"
            name="roomName"
            value={roomName}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una sala</option>
            {state.rooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} (Capacidad: {room.capacity})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="schedule" className="input-label">
            Horario:
          </label>
          <input
            className="input-custom"
            type="text"
            id="schedule"
            name="schedule"
            value={schedule}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="input-label">
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-custom"
            value={email}
            onChange={handleChange}
            required
            placeholder="Ingrese su correo electrónico"
          />
        </div>

        <div>
          <label htmlFor="sendConfirmationEmail" className="input-label">
            <input
              type="checkbox"
              id="sendConfirmationEmail"
              name="sendConfirmationEmail"
              checked={sendConfirmationEmail}
              onChange={handleChange}
              className="input-custom"
            />
            Enviar correo de confirmación
          </label>
        </div>

        <MapSeats></MapSeats>

        <div>
          <button type="submit" className="btn-custom">
            {state.selectedReservation
              ? "Actualizar Reserva"
              : "Registrar Reserva"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
