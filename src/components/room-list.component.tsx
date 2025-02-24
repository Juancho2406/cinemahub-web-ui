import React from "react";
import { Room, useAppContext } from "../hooks/context";
import { RoomService } from "../services/room.service"; // Asegúrate de importar la función deleteRoom
import { MapSeats } from "./map-seats-component";

const RoomList = () => {
  const { state, dispatch } = useAppContext();

  // Función para manejar la eliminación de una sala
  const handleDelete = async (room: Room) => {
    try {
      // Llamamos a la función deleteRoom y esperamos la respuesta
      await RoomService.deleteRoom(room);

      // Después de eliminar, actualizamos el estado para eliminarla de la lista
      dispatch({
        type: "REMOVE_ROOM",
        payload: room,
      });
    } catch (error) {
      console.error("Error deleting room:", error);
      // Aquí puedes agregar algún manejo de errores o una notificación para el usuario
    }
  };

  // Función para manejar la selección de una sala
  const handleSelectRoom = (room: Room) => {
    dispatch({
      type: "SELECTED_ROOM",
      payload: room,
    });
  };

  return (
    <div>
      <h1>Salas</h1>
      <ul className="list-custom">
        {state.rooms.map((room) => (
          <li key={room.id}>
            <div
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => handleSelectRoom(room)} // Selecciona la sala al hacer clic
            >
              {room.name} - Capacidad: {room.capacity}
            </div>
            <div
              className="item-action"
              onClick={() => handleDelete(room)} // Llamamos a handleDelete al hacer clic en "Eliminar"
            >
              Eliminar
            </div>
          </li>
        ))}
      </ul>
      <MapSeats></MapSeats>
    </div>
  );
};

export default RoomList;
