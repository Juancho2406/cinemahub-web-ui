import React, { useState, useEffect } from "react";
import { useAppContext, Movie } from "../hooks/context"; 
import { MovieService } from "../services/movie.service";

const MovieForm = () => {
  const { dispatch, state } = useAppContext();

  const [title, setTitle] = useState<string>(
    state.selectedMovie ? state.selectedMovie.title : ""
  );
  const [genre, setGenre] = useState<string>(
    state.selectedMovie ? state.selectedMovie.genre : ""
  );
  const [duration, setDuration] = useState<number | null>(
    state.selectedMovie ? state.selectedMovie.duration : null
  );
  const [rating, setRating] = useState<string>(
    state.selectedMovie ? state.selectedMovie.rating : ""
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "genre") setGenre(value);
    if (name === "rating") setRating(value);
    if (name === "duration") {
      if (value === "" || /^[0-9\b]+$/.test(value)) {
        setDuration(Number(value));
      } else {

        setDuration(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovie: Movie = {
      id: state.selectedMovie ? state.selectedMovie.id : Date.now().toString(), // Si hay una película seleccionada, mantén el mismo ID
      title,
      genre,
      duration: duration || 0,
      rating
    };

    if (state.selectedMovie) {
      MovieService.updateMovie(newMovie); 
      dispatch({
        type: "UPDATE_MOVIE",
        payload: newMovie
      });
    } else {
      // Si no hay una película seleccionada, creamos una nueva
      MovieService.createMovie(newMovie);
      dispatch({
        type: "ADD_MOVIES",
        payload: [newMovie]
      });
    }

    // Limpiar los campos después de la acción
    setTitle("");
    setGenre("");
    setDuration(0);
    setRating("");
  };

  useEffect(() => {
    if (state.selectedMovie) {
      setTitle(state.selectedMovie.title);
      setGenre(state.selectedMovie.genre);
      setDuration(state.selectedMovie.duration);
      setRating(state.selectedMovie.rating);
    }
  }, [state.selectedMovie]);

  return (
    <div>
      <h2>{state.selectedMovie ? "Editar Película" : "Registrar Película"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="input-label">
            Título:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="input-custom"
            value={title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="genre" className="input-label">
            Género:
          </label>
          <input
            className="input-custom"
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="duration" className="input-label">
            Duración (minutos):
          </label>
          <input
            className="input-custom"
            type="text"
            id="duration"
            name="duration"
            value={duration || undefined}
            onChange={handleChange}
            required
            pattern="^[0-9]*$"
            placeholder="Ingresa la duración en minutos"
          />
        </div>
        <div>
          <label htmlFor="rating" className="input-label">
            Clasificación:
          </label>
          <select
            className="select-custom"
            id="rating"
            name="rating"
            value={rating}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una clasificación</option>
            <option value="+7">+7</option>
            <option value="+13">+13</option>
            <option value="+16">+16</option>
            <option value="+18">+18</option>
          </select>
        </div>
        <div>
          <button type="submit">
            {state.selectedMovie ? "Actualizar Película" : "Registrar Película"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
