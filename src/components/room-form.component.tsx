import React, { useState, useEffect } from "react";
import { useAppContext, Room } from "../hooks/context"; // Asegúrate de tener acceso al contexto
import { createRoom } from "../services/room.service";

const RoomForm = () => {
  const { state,dispatch } = useAppContext();

  const [name, setName] = useState<string>(state.selectedRoom ? state.selectedRoom.name : "");
  const [capacity, setCapacity] = useState<number>(state.selectedRoom ? state.selectedRoom.capacity : 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "capacity") setCapacity(Number(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRoom: Room = { id: Date.now().toString(), name, capacity };
    createRoom(newRoom)
    dispatch({ type: "ADD_ROOMS", payload: [newRoom] });
    setName("");
    setCapacity(0);
  };

  useEffect(() => {
    if (state.selectedRoom) {
      setName(state.selectedRoom.name);
      setCapacity(state.selectedRoom.capacity);
    }
  }, [state.selectedRoom]);

  return (
    <div>
      <h2>{state.selectedRoom ? "Editar Sala" : "Registrar Sala"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="capacity">Capacidad:</label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={capacity}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">{state.selectedRoom ? "Actualizar Sala" : "Registrar Sala"}</button>
        </div>
      </form>
    </div>
  );
};

export default RoomForm;
