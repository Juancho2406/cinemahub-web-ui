import React, { useState, useEffect } from "react";
import { useAppContext } from "../hooks/context";
import { CheckCircle, Circle } from "react-feather";

const MapSeats = ({ selectedMovie, onSelectRoom }: any) => {
  const { state } = useAppContext();
  const room = state.selectedRoom;

  console.log(room)
  const [selectedSeats, setSelectedSeats] = useState<number[]>(
    state.selectedReservation ? state.selectedReservation.selectedSeats : []
  );

  useEffect(() => {
    if (state.selectedReservation) {
      setSelectedSeats(state.selectedReservation.selectedSeats);
    }
  }, [state.selectedReservation]);

  const handleSeatChange = (seat: number) => {
    setSelectedSeats((prevSeats) => {
      // Si el asiento ya está seleccionado, lo desmarcamos, si no lo agregamos.
      if (prevSeats.includes(seat)) {
        return prevSeats.filter((s) => s !== seat); // Elimina el asiento de la lista
      } else {
        return [...prevSeats, seat]; // Agrega el asiento a la lista
      }
    });
  };

  const renderSeats = () => {
    const rows = room?.seats || []; // Obtener las filas de asientos

    return rows.map((row: any, rowIndex: number) => (
      <div key={rowIndex} className="seat-row">
        {row.map((seat: string) => {
          const seatNumber = Number(seat); // Asegurarse de que el asiento sea un número
          const isSelected = selectedSeats.includes(seatNumber); // Verificamos si está seleccionado
          const isReserved = room?.reservedSeats?.includes(seatNumber.toString()); // Verificamos si está reservado

          return (
            <div key={seat} className="seat-container">
              <label>
                {/* Si el asiento está seleccionado, usamos el CheckCircle */}
                {isSelected ? (
                  <CheckCircle
                    style={{
                      color: "green",
                      cursor: isReserved ? "not-allowed" : "pointer",
                    }}
                    onClick={() => !isReserved && handleSeatChange(seatNumber)} // Solo selecciona si no está reservado
                  />
                ) : (
                  <Circle
                    style={{
                      color: isReserved ? "gray" : "lightgray",
                      cursor: isReserved ? "not-allowed" : "pointer",
                    }}
                    onClick={() => !isReserved && handleSeatChange(seatNumber)} // Solo selecciona si no está reservado
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

export default MapSeats;
