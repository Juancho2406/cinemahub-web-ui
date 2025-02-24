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
  id?: string;
  movieId?: string;
  movieName: string;
  roomId?: string;
  roomName: string;
  schedule: string;
  reservedSeats?: string[];
  email: string;
  sendConfirmationEmail?: boolean;
}

interface State {
  movies: Movie[];
  rooms: Room[];
  reservations: Reservation[];
  selectedRoom?: Room;
  selectedReservation?: Reservation;
  selectedMovie?: Movie;
  selectedSeats?: string[];
}

const initialState: State = {
  movies: [],
  rooms: [],
  reservations: []
};

type Action =
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "UPDATE_MOVIE"; payload: Movie }
  | { type: "REMOVE_MOVIE"; payload: Movie }
  | { type: "REMOVE_ROOM"; payload: Room }
  | { type: "ADD_ROOM"; payload: Room }
  | { type: "UPDATE_ROOM"; payload: Room }
  | { type: "ADD_RESERVATION"; payload: Reservation }
  | { type: "UPDATE_RESERVATION"; payload: Reservation }
  | { type: "ADD_MOVIES"; payload: Movie[] }
  | { type: "ADD_ROOMS"; payload: Room[] }
  | { type: "ADD_RESERVATIONS"; payload: Reservation[] }
  | { type: "SELECTED_MOVIE"; payload: Movie }
  | { type: "SELECTED_ROOM"; payload: Room }
  | { type: "SELECTED_RESERVATION"; payload: Reservation }
  | { type: "DELETE_RESERVATION"; payload: Reservation }
  | { type: "SELECTED_SEATS"; payload: string[] }
  | { type: "LIST_MOVIES" }
  | { type: "LIST_ROOMS" }
  | { type: "LIST_RESERVATIONS" };

// Reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_MOVIE":
      return { ...state, movies: [...state.movies, action.payload] };

    case "ADD_MOVIES":
      return { ...state, movies: [...state.movies, ...action.payload] };
    case "ADD_ROOM":
      return { ...state, rooms: [...state.rooms, action.payload] };
    case "SELECTED_SEATS":
      return {
        ...state,
        selectedSeats: action.payload
      };
    case "SELECTED_MOVIE":
      return {
        ...state,
        selectedMovie: action.payload
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter(
          (movie: any) => movie.id !== action.payload.id
        )
      };
    case "REMOVE_ROOM":
      return {
        ...state,
        rooms: state.rooms.filter((room: any) => room.name !== action.payload)
      };
    case "ADD_RESERVATION":
      return {
        ...state,
        reservations: [...state.reservations, action.payload]
      };

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
    // case "DELETE_RESERVATION":
    //   return {
    //     ...state,
    //     reservations: state.reservations.filter(
    //       (reservation) => reservation.id !== action.payload
    //     )
    //   };
    case "UPDATE_ROOM":
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.id ? { ...room, ...action.payload } : room
        )
      };
    case "UPDATE_MOVIE":
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload.id ? action.payload : movie
        )
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
