import React from "react";
import { useAppContext, Movie } from "../hooks/context";
import { MovieService } from "../services/movie.service"; 
const MovieList = () => {
  const { state, dispatch } = useAppContext();

  const handleDelete = async (movie: Movie) => {
    console.log(movie)
    try {
      await MovieService.deleteMovie(movie);
      dispatch({
        type: "REMOVE_MOVIE",
        payload: movie
      });
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <ul className="list-custom">
        {state.movies.map((movie) => (
          <div
            className="item-action"
            onClick={() => {
              dispatch({
                type: "SELECTED_MOVIE",
                payload: movie
              });
            }}
          >
            <li key={movie.id}>
              <div className="item-content">
                <strong>{movie.title}</strong>
              </div>
              <div className="item-description">
                {movie.genre} - {movie.duration} min
              </div>

              <div
                className="item-action"
                onClick={() => handleDelete(movie)}
              >
                Eliminar
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
