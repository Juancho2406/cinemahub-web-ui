import React from 'react';
import { useAppContext } from "../hooks/context";
const RoomList = ({ selectedMovie, onSelectRoom }:any) => {
    const { state } = useAppContext();
  return (
    <div>
      <h1>Salas</h1>
      <ul>
        {state.rooms.map((room) => (
          <li key={room.id}>
            {room.name} - Capacidad: {room.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
