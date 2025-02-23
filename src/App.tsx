import React, { useState } from 'react';
import MovieList from './components/movie-list.component';
import RoomList from './components/room-list.component';
import ReservationForm from './components/reservation-form.component';
import MovieForm from './components/movie-form.component';
// import { reserveSeats } from './services/api';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSelectMovie = (movie:any) => {
    setSelectedMovie(movie);
    setSelectedRoom(null); // Reset room when movie changes
  };

  const handleSelectRoom = (room:any) => {
    setSelectedRoom(room);
  };

  const handleReserve = async (movieId:any, roomId:any, seats:any) => {
    // await reserveSeats(movieId, roomId, seats);
    alert('Reserva exitosa!');
  };

  return (
    <div>
      <h1>Sistema de Gestión de Reservas de Cine</h1>
      <MovieForm />
      <MovieList onSelectMovie={handleSelectMovie} />
      {selectedMovie && <RoomList selectedMovie={selectedMovie} onSelectRoom={handleSelectRoom} />}
      {selectedRoom && selectedMovie && (
        <ReservationForm selectedRoom={selectedRoom} selectedMovie={selectedMovie} onReserve={handleReserve} />
      )}
    </div>
  );
};

export default App;
