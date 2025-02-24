import React, { useState, useEffect } from "react";
import { useAppContext, Reservation } from "../hooks/context"; // Asegúrate de tener acceso al contexto
import { createReservation } from "../services/reservation.service";

const ReservationForm = () => {
  const { state, dispatch } = useAppContext();

  // Estado local para los campos del formulario
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
  const [email, setEmail] = useState<string>(""); // Nuevo estado para el correo
  const [sendConfirmationEmail, setSendConfirmationEmail] =
    useState<boolean>(false); // Flag para enviar correo de confirmación

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Para los campos de tipo input y select
    if (name === "movieId") setMovieId(value);
    if (name === "roomId") setRoomId(value);
    if (name === "schedule") setSchedule(value);
    if (name === "email") setEmail(value); // Manejo del correo

    // Para el checkbox, verificamos si el evento es de tipo CheckboxChangeEvent
    if (name === "sendConfirmationEmail" && "checked" in e.target) {
      setSendConfirmationEmail(e.target.checked); // `checked` existe en CheckboxChangeEvent
    }
  };

  const handleSeatChange = (seat: string) => {
    setSelectedSeats((prevSeats: any) =>
      prevSeats.includes(seat)
        ? prevSeats.filter((s: any) => s !== seat)
        : [...prevSeats, seat]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("Se ejecuto el form", e);
    e.preventDefault();

    const newReservation: Reservation = {
      movieId,
      roomId,
      schedule,
      selectedSeats,
      email, // Agregar el correo al objeto de la reserva
      sendConfirmationEmail // Agregar el flag para el correo de confirmación
    };

    createReservation(newReservation);

    dispatch({ type: "ADD_RESERVATION", payload: newReservation });

    // Limpiar el formulario
    setMovieId("");
    setRoomId("");
    setSchedule("");
    setSelectedSeats([]);
    setEmail(""); // Limpiar el correo
    setSendConfirmationEmail(false); // Limpiar el flag
  };

  useEffect(() => {
    if (state.selectedReservation) {
      setMovieId(state.selectedReservation.movieId);
      setRoomId(state.selectedReservation.roomId);
      setSchedule(state.selectedReservation.schedule);
      setSelectedSeats(state.selectedReservation.selectedSeats);
      setEmail(state.selectedReservation.email || ""); // Si hay un correo en la reserva seleccionada
      setSendConfirmationEmail(
        state.selectedReservation.sendConfirmationEmail || false
      ); // Si hay un flag para enviar correo
    }
  }, [state.selectedReservation]);

  const room = state.rooms.find((room) => room.id === roomId);

  const renderSeats = () => {
    const rows = room?.seats || []; // Suponiendo que `seats` es una matriz 2D, donde cada fila es un arreglo de asientos

    return rows.map((row, rowIndex) => (
      <div
        key={rowIndex}
        style={{
          display: "flex",
          justifyContent: "space-evenly", // Distribuye los asientos uniformemente en cada fila
          marginBottom: "10px",
          gap: "10px", // Espacio entre los asientos
          width: "calc(100% - 20px)", // Ajusta el ancho para dar margen a los lados
          margin: "0 auto" // Centra la fila de asientos en la pantalla
        }}
      >
        {row.map((seat: string) => (
          <div
            key={seat}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "5px"
            }}
          >
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: 0
              }}
            >
              <input
                type="checkbox"
                checked={selectedSeats.includes(Number(seat))}
                onChange={() => handleSeatChange(seat)}
                disabled={room?.reservedSeats?.includes(seat)} // Deshabilitado si el asiento está reservado
                style={{
                  marginBottom: "5px",
                  transform: "scale(1.2)"
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  textAlign: "center",
                  marginTop: "3px"
                }}
              >
                {seat}
              </span>
            </label>
          </div>
        ))}
      </div>
    ));
  };

  const screenStyle: React.CSSProperties = {
    width: "60%", // Ajusta el ancho de la pantalla (puedes modificarlo según el diseño)
    height: "30px", // Alto de la pantalla
    backgroundColor: "#000", // Color de fondo de la pantalla
    color: "#fff", // Color del texto de la pantalla
    display: "flex",
    justifyContent: "center", // Centra el texto dentro de la pantalla
    alignItems: "center", // Centra el texto verticalmente dentro de la pantalla
    marginBottom: "20px", // Espacio entre la pantalla y los asientos
    borderRadius: "5px", // Bordes redondeados
    fontWeight: "bold", // Textos más gruesos para la pantalla
    textTransform: "uppercase" // Texto en mayúsculas
  };

  return (
    <div>
      <h2>
        {state.selectedReservation ? "Editar Reserva" : "Registrar Reserva"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="movieId" className="input-label">
            Película:
          </label>
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
          <label htmlFor="roomId">Sala:</label>
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

        {/* Campo para el correo electrónico */}
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

        {/* Campo para el flag de confirmación por correo */}
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

        <div>
          <label>Mapa de Asientos:</label>
          <div style={screenStyle}>Pantalla</div>
          <div id="seatsContainer">{renderSeats()}</div>
        </div>

        <div>
          <button type="submit">
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
