import React, { useState, useEffect } from 'react';

const RoomList = ({ selectedMovie, onSelectRoom }:any) => {
  const [rooms, setRooms] = useState<any>([]);

  useEffect(() => {
    const fetchRooms = async () => {
    };
    if (selectedMovie) fetchRooms();
  }, [selectedMovie]);

  return (
    <div>
      <h2>Salas para {selectedMovie ? selectedMovie.title : ''}</h2>
      <ul>
        {rooms.map((room:any) => (
          <li key={room.id} onClick={() => onSelectRoom(room)}>
            {room.name} - Capacidad: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
