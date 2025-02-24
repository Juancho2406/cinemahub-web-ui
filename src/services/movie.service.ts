import axios from "axios";
import { Movie } from "../hooks/context";

export const BASE_URL = "https://3tmga2hhac.execute-api.us-east-1.amazonaws.com/prod";

export class MovieService {
  // Crear película
  static async createMovie(movieData: Movie) {
    const movieBody = {
      title: movieData.title,
      genre: movieData.genre,
      duration: movieData.duration,
      rating: 4.5, // Ejemplo de un valor de rating, lo puedes cambiar si es necesario
    };

    try {
      const response = await axios.post(`${BASE_URL}/movies`, movieBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error creating movie:", error);
      throw error;
    }
  }

  // Obtener todas las películas
  static async getMovies() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data as Movie[];
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }

  // Eliminar película por título
  static async deleteMovie(movie: Movie) {
    try {
      const response = await axios.delete(`${BASE_URL}/movies/${movie.title}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  }

  // Actualizar película por ID
  static async updateMovie(movie: Movie) {
    const movieBody = {
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      rating: movie.rating,  // Usando el rating que venga del movieData
    };

    try {
      const response = await axios.put(`${BASE_URL}/movies/${movie.title}`, movieBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
    }
  }
}
