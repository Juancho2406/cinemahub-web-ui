import React, { useState, useEffect } from "react";
import { useAppContext, Room } from "../hooks/context";
import { RoomService } from "../services/room.service";

const RoomForm = () => {
  const { state, dispatch } = useAppContext();

  const [name, setName] = useState<string>(state.selectedRoom?.name || "");
  const [capacity, setCapacity] = useState<number>(state.selectedRoom?.capacity || 0);
  const [rows, setRows] = useState<number>(state.selectedRoom?.seats?.length || 0);
  const [seatsPerRow, setSeatsPerRow] = useState<number>(state.selectedRoom?.seats?.[0]?.length || 0);
  const [seats, setSeats] = useState<string[][]>(state.selectedRoom?.seats || []);

  // Maneja cambios en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const numericValue = Number(value);

    switch (name) {
      case "name":
        setName(value);
        break;
      case "capacity":
        setCapacity(numericValue);
        updateSeats(numericValue, rows, seatsPerRow); // Ajusta los asientos al cambiar la capacidad
        break;
      case "rows":
        setRows(numericValue);
        updateSeats(capacity, numericValue, seatsPerRow); // Reajustar asientos por filas
        break;
      case "seatsPerRow":
        setSeatsPerRow(numericValue);
        updateSeats(capacity, rows, numericValue); // Reajustar capacidad al cambiar los asientos por fila
        break;
      default:
        break;
    }
  };

  // Generar la matriz de asientos con base en la capacidad
  const updateSeats = (newCapacity: number, rows: number, seatsPerRow: number) => {
    const totalSeats = rows * seatsPerRow;

    if (newCapacity > totalSeats) {
      setSeats(generateSeatsMatrix(rows, seatsPerRow, newCapacity));
    } else {
      setSeats(generateSeatsMatrix(rows, seatsPerRow, totalSeats));
    }
    setCapacity(rows * seatsPerRow);
  };

  // Generar la matriz de asientos
  const generateSeatsMatrix = (rows: number, seatsPerRow: number, newCapacity: number) => {
    const newSeats: string[][] = [];
    let seatIndex = 0;

    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < seatsPerRow; j++) {
        if (seatIndex < newCapacity) {
          const seat = String.fromCharCode(65 + i) + (j + 1); // A1, A2, B1, B2, etc.
          row.push(seat);
          seatIndex++;
        }
      }
      newSeats.push(row);
    }

    return newSeats;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const roomData: Room = {
      id: state.selectedRoom?.id || Date.now().toString(), // Si es una sala existente, usa el ID
      name,
      capacity,
      seats,
    };

    if (state.selectedRoom) {
      // Si hay una sala seleccionada, se actualiza
      await RoomService.updateRoom(roomData); // Llamada a updateRoom
      dispatch({ type: "UPDATE_ROOM", payload: roomData });
    } else {
      // Si no hay sala seleccionada, se crea una nueva
      await RoomService.createRoom(roomData);
      dispatch({ type: "ADD_ROOMS", payload: [roomData] });
    }

    // Limpiar formulario después de enviar
    setName("");
    setCapacity(0);
    setRows(0);
    setSeatsPerRow(0);
    setSeats([]);
  };

  // Efecto para llenar los campos si hay una sala seleccionada
  useEffect(() => {
    if (state.selectedRoom) {
      setName(state.selectedRoom.name);
      setCapacity(state.selectedRoom.capacity);
      setRows(state.selectedRoom.seats?.length || 0);
      setSeatsPerRow(state.selectedRoom.seats?.[0]?.length || 0);
      setSeats(state.selectedRoom.seats || []);
    }
  }, [state.selectedRoom]);

  // Crear un array con números del 1 al 20
  const rowOptions = Array.from({ length: 20 }, (_, index) => index + 1);
  const seatOptions = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <div>
      <h2>{state.selectedRoom ? "Editar Sala" : "Registrar Sala"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="input-label">
            Nombre:
          </label>
          <input
            className="input-custom"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="capacity" className="input-label">
            Capacidad:
          </label>
          <input
            className="input-custom"
            type="number"
            id="capacity"
            name="capacity"
            value={capacity}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <div>
          <label htmlFor="rows" className="input-label">
            Número de filas:
          </label>
          <select
            className="input-custom"
            id="rows"
            name="rows"
            value={rows}
            onChange={handleChange}
            required
          >
            {rowOptions.map((row) => (
              <option key={row} value={row}>
                {row}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="seatsPerRow" className="input-label">
            Número de asientos por fila:
          </label>
          <select
            className="input-custom"
            id="seatsPerRow"
            name="seatsPerRow"
            value={seatsPerRow}
            onChange={handleChange}
            required
          >
            {seatOptions.map((seat) => (
              <option key={seat} value={seat}>
                {seat}
              </option>
            ))}
          </select>
        </div>

        {/* Mostrar el mapa de la sala */}
        <div>
          <h3>Mapa de la Sala</h3>
          <div className="seats-map">
            {seats.map((row, index) => (
              <div key={index} className="seat-row">
                {row.map((seat, i) => (
                  <span key={i} className="seat">
                    {seat}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <button type="submit">
            {state.selectedRoom ? "Actualizar Sala" : "Registrar Sala"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomForm;
