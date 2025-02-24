import React, { useState, useEffect } from "react";
import { useAppContext, Reservation } from "../hooks/context";
import { createReservation } from "../services/reservation.service";
import MapSeats from "./map-seats-component";

const ReservationForm = () => {
  const { state, dispatch } = useAppContext();

  const [movieId, setMovieId] = useState<string>(
    state.selectedReservation ? state.selectedReservation.movieId : ""
  );
  const [roomId, setRoomId] = useState<string>(
    state.selectedReservation ? state.selectedReservation.roomId : ""
  );
  const [schedule, setSchedule] = useState<string>(
    state.selectedReservation ? state.selectedReservation.schedule : ""
  );
  const [selectedSeats, setSelectedSeats] = useState<number[]>(
    state.selectedReservation ? state.selectedReservation.selectedSeats : []
  );
  const [email, setEmail] = useState<string>(""); 
  const [sendConfirmationEmail, setSendConfirmationEmail] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "movieId") setMovieId(value);
    if (name === "roomId") setRoomId(value);
    if (name === "schedule") setSchedule(value);
    if (name === "email") setEmail(value);
    if (name === "sendConfirmationEmail" && "checked" in e.target) {
      setSendConfirmationEmail(e.target.checked);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReservation: Reservation = {
      movieId,
      roomId,
      schedule,
      selectedSeats,
      email,
      sendConfirmationEmail,
    };

    createReservation(newReservation);
    dispatch({ type: "ADD_RESERVATION", payload: newReservation });

    // Limpiar formulario
    setMovieId("");
    setRoomId("");
    setSchedule("");
    setSelectedSeats([]);
    setEmail("");
    setSendConfirmationEmail(false);
  };

  useEffect(() => {
    if (state.selectedReservation) {
      setMovieId(state.selectedReservation.movieId);
      setRoomId(state.selectedReservation.roomId);
      setSchedule(state.selectedReservation.schedule);
      setSelectedSeats(state.selectedReservation.selectedSeats);
      setEmail(state.selectedReservation.email || "");
      setSendConfirmationEmail(
        state.selectedReservation.sendConfirmationEmail || false
      );
    }
  }, [state.selectedReservation]);

  const room = state.rooms.find((room) => room.id === roomId);




  return (
    <div>
      <h2>{state.selectedReservation ? "Editar Reserva" : "Registrar Reserva"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movieId" className="input-label">Película:</label>
          <select
            className="select-custom"
            id="movieId"
            name="movieId"
            value={movieId}
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
          <label htmlFor="roomId" className="input-label">Sala:</label>
          <select
            className="select-custom"
            id="roomId"
            name="roomId"
            value={roomId}
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
          <label htmlFor="schedule" className="input-label">Horario:</label>
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
          <label htmlFor="email" className="input-label">Correo electrónico:</label>
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
            {state.selectedReservation ? "Actualizar Reserva" : "Registrar Reserva"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
