import React from "react";
import { useAppContext } from "../hooks/context";
const RoomList = ({ selectedMovie, onSelectRoom }: any) => {
  const { state } = useAppContext();
  return (
    <div>
      <h1>Salas</h1>
      <ul className="list-custom">
        {state.rooms.map((room) => (
          <li key={room.id}>
            <div>
              {room.name} - Capacidad: {room.capacity}
            </div>
            <div className="item-action">Eliminar</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
