import axios from "axios";
import { Movie } from "../hooks/context";

export const BASE_URL =
  "https://3tmga2hhac.execute-api.us-east-1.amazonaws.com/prod";

export class MovieService {
  static async createMovie(movieData: Movie) {
    const movieBody = {
      title: movieData.title,
      genre: movieData.genre,
      duration: movieData.duration,
      rating: movieData.rating
    };

    try {
      const response = await axios.post(`${BASE_URL}/movies`, movieBody, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error creating movie:", error);
      throw error;
    }
  }
  static async getMovies() {
    try {
      const response = await axios.get(`${BASE_URL}/movies`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response.data as Movie[];
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  }

  static async deleteMovie(movie: Movie) {
    try {
      const response = await axios.delete(`${BASE_URL}/movies/${movie.id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting movie:", error);
      throw error;
    }
  }

  static async updateMovie(movie: Movie) {
    const movieBody = {
      id: movie.id,
      title: movie.title,
      genre: movie.genre,
      duration: movie.duration,
      rating: movie.rating 
    };

    try {
      const response = await axios.put(
        `${BASE_URL}/movies/${movie.id}`,
        movieBody,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating movie:", error);
      throw error;
    }
  }
}
