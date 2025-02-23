import React, { useState, useEffect } from "react";
import { useAppContext, Movie } from "../hooks/context"; // Asegúrate de tener acceso al contexto
import { createMovie } from "../services/movie.service";



const MovieForm = () => {
  const { dispatch, state } = useAppContext();

  const [title, setTitle] = useState<string>(state.selectedMovie ? state.selectedMovie.title : "");
  const [genre, setGenre] = useState<string>(state.selectedMovie ? state.selectedMovie.genre : "");
  const [duration, setDuration] = useState<number>(state.selectedMovie ? state.selectedMovie.duration : 0);
  const [rating, setRating] = useState<string>(state.selectedMovie ? state.selectedMovie.rating : "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "title") setTitle(value);
    if (name === "genre") setGenre(value);
    if (name === "duration") setDuration(Number(value));
    if (name === "rating") setRating(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newMovie: Movie = { id: Date.now().toString(), title, genre, duration, rating };
    createMovie(newMovie)
    dispatch({ type: "ADD_MOVIES", payload: [newMovie] });
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
        <div>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="genre">Género:</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={genre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="duration">Duración (minutos):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="rating">Clasificación:</label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={rating}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit">{state.selectedMovie ? "Actualizar Película" : "Registrar Película"}</button>
        </div>
      </form>
    </div>
  );
};

export default MovieForm;
