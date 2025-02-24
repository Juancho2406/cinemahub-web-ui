import React, { useState, useEffect } from "react";
import { useAppContext } from "../hooks/context";
import { CheckCircle, Circle } from "react-feather";

export const MapSeats = () => {
  const { state, dispatch } = useAppContext();
  const room = state.selectedRoom;

  if (room?.name === "") {
    return <></>;
  }

  // Usamos el estado global de selectedSeats
  const selectedSeats = state.selectedSeats;

  // useEffect para actualizar selectedSeats cuando cambia la reserva
  useEffect(() => {
    if (state.selectedReservation) {
      dispatch({
        type: "SELECTED_SEATS",
        payload: state.selectedReservation.reservedSeats || [],
      });
    }
  }, [state.selectedReservation, dispatch]);

  // Función para manejar la selección de asientos
  const handleSeatChange = (seat: string) => {
    dispatch({
      type: "SELECTED_SEATS",
      payload: selectedSeats?.includes(seat)
        ? selectedSeats.filter((s) => s !== seat) // Elimina el asiento de la lista
        : [...selectedSeats || [], seat], // Agrega el asiento a la lista
    });
  };

  // Función para renderizar los asientos
  const renderSeats = () => {
    const rows = room?.seats || []; // Obtener las filas de asientos

    return rows.map((row: any, rowIndex: number) => (
      <div key={rowIndex} className="seat-row">
        {row.map((seat: string) => {
          const isSelected = selectedSeats?.includes(seat); // Verificamos si está seleccionado
          const isReserved = room?.reservedSeats?.includes(seat); // Verificamos si está reservado

          return (
            <div
              key={seat}
              className="seat-container"
              onClick={() => !isReserved && handleSeatChange(seat)} // Solo selecciona si no está reservado
            >
              <label>
                {/* Si el asiento está seleccionado, usamos el CheckCircle */}
                {isSelected ? (
                  <CheckCircle
                    style={{
                      color: "green",
                      cursor: isReserved ? "not-allowed" : "pointer",
                    }}
                  />
                ) : (
                  <Circle
                    style={{
                      color: isReserved ? "gray" : "lightgray",
                      cursor: isReserved ? "not-allowed" : "pointer",
                    }}
                  />
                )}
                {/* Texto del número de asiento */}
                <span className="seat-label">{seat}</span>
              </label>
            </div>
          );
        })}
      </div>
    ));
  };

  const screenStyle: React.CSSProperties = {
    width: "100%",
    height: "30px",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "80px",
    borderRadius: "5px",
    fontWeight: "bold",
    textTransform: "uppercase",
  };

  return (
    <div>
      <label>Mapa de Asientos:</label>
      <div style={screenStyle}>Pantalla</div>
      <div id="seatsContainer">{renderSeats()}</div>
    </div>
  );
};
