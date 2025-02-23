import React, { useState } from 'react';

const ReservationForm = ({ selectedRoom, selectedMovie, onReserve }:any) => {
  const [seats, setSeats] = useState<any>([]);

  const handleSeatSelection = (seat:any) => {
    setSeats((prevSeats:any) =>
      prevSeats.includes(seat) ? prevSeats.filter((s:any) => s !== seat) : [...prevSeats, seat]
    );
  };

  const handleSubmit = () => {
    onReserve(selectedMovie.id, selectedRoom.id, seats);
  };

  return (
    <div>
      <h2>Reserva tus Asientos</h2>
      <div>
        <p>Selecciona los asientos para la película {selectedMovie.title} en la sala {selectedRoom.name}:</p>
        {/* Muestra los asientos disponibles (simulación) */}
        <div className="seat-map">
          {[1, 2, 3, 4, 5].map((seat:any) => (
            <button
              key={seat}
              className={seats.includes(seat) ? 'selected' : ''}
              onClick={() => handleSeatSelection(seat)}
            >
              Asiento {seat}
            </button>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit}>Reservar</button>
    </div>
  );
};

export default ReservationForm;
