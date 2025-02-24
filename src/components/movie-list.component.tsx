import React from "react";
import { useAppContext, Movie } from "../hooks/context";
import { MovieService } from "../services/movie.service"; // Asegúrate de importar la función deleteMovie
const MovieList = () => {
  const { state, dispatch } = useAppContext();

  // Función para manejar la eliminación de una película
  const handleDelete = async (movie: Movie) => {
    console.log(movie)
    try {
      // Llamamos a la función deleteMovie y esperamos la respuesta
      await MovieService.deleteMovie(movie);

      // Después de eliminar, actua
      // lizamos el estado para eliminarla de la lista
      dispatch({
        type: "REMOVE_MOVIE",
        payload: movie
      });
    } catch (error) {
      console.error("Error deleting movie:", error);
      // Aquí puedes agregar algún manejo de errores o una notificación para el usuario
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
                onClick={() => handleDelete(movie)} // Llamamos a handleDelete al hacer clic en "Eliminar"
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
