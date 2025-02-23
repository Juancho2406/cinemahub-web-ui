import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useMemo
} from "react";

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number; 
  rating: string; 
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  seats?: string[][];
  reservedSeats?: string[];
}

export interface Reservation {
  movieId: string;
  roomId: string;
  schedule: string; 
  selectedSeats: number[];
  reservedSeats?: string[];
}

interface State {
  movies: Movie[];
  rooms: Room[];
  reservations: Reservation[];
  selectedRoom?: Room;
  selectedReservation?: Reservation;
  selectedMovie?: Movie;
}

const initialState: State = {
  movies: [],
  rooms: [],
  reservations: [],
  selectedRoom: {
    id: "",
    name: "",
    capacity: 0,
    seats: [
      ["A1", "A2", "A3", "A4", "A5"],
      ["B1", "B2", "B3", "B4", "B5"],
      ["C1", "C2", "C3", "C4", "C5"]
    ]
  }
};

type Action =
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "ADD_ROOM"; payload: Room }
  | { type: "ADD_RESERVATION"; payload: Reservation }
  | { type: "ADD_MOVIES"; payload: Movie[] }
  | { type: "ADD_ROOMS"; payload: Room[] }
  | { type: "ADD_RESERVATIONS"; payload: Reservation[] }
  | { type: "SELECTED_ROOM"; payload: Room }
  | { type: "SELECTED_RESERVATION"; payload: Reservation }
  | { type: "LIST_MOVIES" }
  | { type: "LIST_ROOMS" }
  | { type: "LIST_RESERVATIONS" };

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };

    case "ADD_ROOM":
      return { ...state, rooms: [...state.rooms, action.payload] };

    case "ADD_RESERVATION":
      return {
        ...state,
        reservations: [...state.reservations, action.payload]
      };
    case "ADD_MOVIES":
      return { ...state, movies: [...state.movies, ...action.payload] };

    case "ADD_ROOMS":
      return { ...state, rooms: [...state.rooms, ...action.payload] };

    case "ADD_RESERVATIONS":
      return {
        ...state,
        reservations: [...state.reservations, ...action.payload]
      };

    case "SELECTED_ROOM":
      return {
        ...state,
        selectedRoom: action.payload
      };
      case "SELECTED_RESERVATION":
        return {
          ...state,
          selectedReservation: action.payload
        };
    case "LIST_MOVIES":
      return state;

    case "LIST_ROOMS":

      return state;

    case "LIST_RESERVATIONS":
      return state;

    default:
      return state;
  }
}

interface AppContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useAppContext(): AppContextProps {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
