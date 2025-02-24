import React from "react";
import { Room, useAppContext } from "../hooks/context";
import { RoomService } from "../services/room.service";
import { MapSeats } from "./map-seats-component";

const RoomList = () => {
  const { state, dispatch } = useAppContext();

  const handleDelete = async (room: Room) => {
    try {
      await RoomService.deleteRoom(room);
      dispatch({
        type: "REMOVE_ROOM",
        payload: room
      });
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleRoomClick = (room: Room) => {
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
      <MapSeats />
    </div>
  );
};

export default RoomList;
