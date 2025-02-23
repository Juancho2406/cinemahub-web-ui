import React from "react";
import { useAppContext } from "../hooks/context";
const MovieList = ({ onSelectMovie }: any) => {
  const { state } = useAppContext();
  return (
    <div>
      <h1>Películas</h1>
      <ul>
        {state.movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} - {movie.genre} - {movie.duration} min
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
