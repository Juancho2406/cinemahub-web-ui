import React, { useState, useEffect } from 'react';
import { getMovies } from '../services/movie.service';
const MovieList = ({ onSelectMovie }:any) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getMovies();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Lista de Películas</h2>
      <ul>
        {movies.map((movie:any) => (
          <li key={movie.id} onClick={() => onSelectMovie(movie)}>
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
