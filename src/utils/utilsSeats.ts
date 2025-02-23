import { Room } from "../hooks/context";
const generateSeats = (capacity: number, seatsPerRow: number): string[][] => {
    const rows: string[][] = [];
    let rowIndex = 0;
    let seatIndex = 1;
  
    // Generar el mapa de asientos
    while (seatIndex <= capacity) {
      const row: string[] = [];
      for (let i = 0; i < seatsPerRow && seatIndex <= capacity; i++) {
        const seat = `${String.fromCharCode(65 + rowIndex)}${seatIndex}`; // Ejemplo: A1, A2, B1, C1, etc.
        row.push(seat);
        seatIndex++;
      }
      rows.push(row);
      rowIndex++;
    }
    return rows;
  };
  
  // Función que se asegura de que la sala tenga el arreglo de asientos
  export const ensureSeats = (room: Room): Room => {
    // Si no tiene un arreglo de seats, lo generamos
    if (!room.seats || room.seats.length === 0) {
      room.seats = generateSeats(room.capacity, 10);  // Suponemos 5 asientos por fila
    }
    return room;
  };
  