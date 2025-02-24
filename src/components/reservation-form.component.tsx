import React, { useState, useEffect } from "react";
import { useAppContext, Reservation } from "../hooks/context";
import { ReservationService } from "../services/reservation.service";
import { MapSeats } from "./map-seats-component";

const ReservationForm = () => {
  const { state, dispatch } = useAppContext();
  // Estados iniciales
  const [movieName, setMovieName] = useState<string>(state.selectedReservation?.movieName || "");
  const [roomName, setRoomName] = useState<string>(state.selectedRoom?.name || "");
  const [schedule, setSchedule] = useState<string>(state.selectedReservation?.schedule || ""); 
  const [email, setEmail] = useState<string>(state.selectedReservation?.email || "");
  const [sendConfirmationEmail, setSendConfirmationEmail] = useState<boolean>(state.selectedReservation ? true : false);

  // Manejo de cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "movieName") {
      setMovieName(value);
    }

    if (name === "roomName") {
      setRoomName(value);

      const selectedRoom = state.rooms.find(room => room.name === value);
      if (selectedRoom) {
        dispatch({
          type: "SELECTED_ROOM",
          payload: selectedRoom
        });
      } else {
        dispatch({
          type: "SELECTED_ROOM",
          payload: {} as any
        });
      }
    }

    if (name === "schedule") {
      setSchedule(value);
    }

    if (name === "email") {
      setEmail(value);
    }

    if (name === "sendConfirmationEmail" && "checked" in e.target) {
      setSendConfirmationEmail(e.target.checked);
    }
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newReservation: Reservation = {
      id: state.selectedReservation?.id, // Si hay una reserva seleccionada, se mantiene el id, sino se genera uno nuevo
      movieName,
      roomName,
      schedule,
      reservedSeats: state.selectedSeats, // Usamos el estado global de reservedSeats
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

    // Limpiar formulario después de enviar
    setMovieName("");
    setRoomName("");
    setSchedule("");
    setEmail("");
    setSendConfirmationEmail(false);
  };

  // Efecto para actualizar los campos cuando se selecciona una nueva sala
  useEffect(() => {
    if (state.selectedRoom) {
      // Si hay una sala seleccionada, actualizamos los valores del formulario
      setRoomName(state.selectedRoom.name);
      // Puedes agregar lógica adicional para llenar otros campos, como schedule o reservedSeats, si es necesario
    }
  }, [state.selectedRoom]);

  return (
    <div>
      <h2>{state.selectedReservation ? "Editar Reserva" : "Registrar Reserva"}</h2>
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
              <option key={room.id} value={room.name}>
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

        <MapSeats /> {/* El componente que maneja la selección de asientos */}

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
