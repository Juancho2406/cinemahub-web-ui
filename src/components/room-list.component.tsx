import React from "react";
import { Room, useAppContext } from "../hooks/context";
import { RoomService } from "../services/room.service";

const RoomList = () => {
  const { state, dispatch } = useAppContext();

  const handleDelete = async (room: Room) => {
    try {
      await dispatch({
        type: "REMOVE_ROOM",
        payload: room
      });
      await RoomService.deleteRoom(room);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleRoomClick = (room: Room) => {
    room = {
      ...room,
      seats: Array.isArray(room.seats) ? room.seats : JSON.parse(room.seats || '[]')
    };
  
    dispatch({
      type: "SELECTED_ROOM",
      payload: room
    });
  };
  

  return (
    <div>
      <ul className="list-custom">
        {state.rooms.map((room) => (
          
          <li key={room.id}>
            <div
              className="item-content"
              onClick={() => handleRoomClick(room)}
            >
              {room.name} - Capacidad: {room.capacity}
            </div>

            <div
              className="item-action"
              onClick={() => handleDelete(room)} 
            >
              Eliminar
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
