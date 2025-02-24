import React from "react";
import { useAppContext } from "../hooks/context";
const MovieList = ({ onSelectMovie }: any) => {
  const { state, dispatch } = useAppContext();
  return (
    <div>
      <h1>Películas</h1>
      <ul className="list-custom">
        {state.movies.map((movie) => (
          <li key={movie.id}>
            <div className="item-content">
              <strong>{movie.title}</strong>
            </div>
            <div className="item-description">
              {movie.genre} - {movie.duration} min
            </div>
            <div
              className="item-action"
              onClick={() => {
                dispatch({
                  type: "SELECTED_MOVIE",
                  payload: movie
                });
              }}
            >
              Eliminar
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
