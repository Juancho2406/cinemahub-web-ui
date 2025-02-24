import React, { useState, useEffect } from "react";
import { useAppContext } from "../hooks/context";
import { CheckCircle, Circle } from "react-feather";

export const MapSeats = () => {
  const { state, dispatch } = useAppContext();
  const room = state.selectedRoom;

  if (room?.name === "") {
    return <></>;
  }


  const selectedSeats = state.selectedSeats;


  useEffect(() => {
    if (state.selectedReservation) {
      dispatch({
        type: "SELECTED_SEATS",
        payload: state.selectedReservation.reservedSeats || [],
      });
    }
  }, [state.selectedReservation, dispatch]);

  const handleSeatChange = (seat: string) => {
    dispatch({
      type: "SELECTED_SEATS",
      payload: selectedSeats?.includes(seat)
        ? selectedSeats.filter((s) => s !== seat) 
        : [...selectedSeats || [], seat],
    });
  };

  const renderSeats = () => {
    const rows = room?.seats || []; 
    return rows.map((row: any, rowIndex: number) => (
      <div key={rowIndex} className="seat-row">
        {row.map((seat: string) => {
          const isSelected = selectedSeats?.includes(seat); 
          const isReserved = room?.reservedSeats?.includes(seat); 

          return (
            <div
              key={seat}
              className="seat-container"
              onClick={() => !isReserved && handleSeatChange(seat)} 
            >
              <label>
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
