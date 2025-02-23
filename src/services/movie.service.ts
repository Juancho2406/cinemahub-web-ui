import axios from "axios";
import { Movie } from "../hooks/context";
export const BASE_URL =
  "https://3tmga2hhac.execute-api.us-east-1.amazonaws.com/prod";

export const createMovie = async (movieData: Movie) => {
  const movieBody = {
    title: movieData.title,
    genre: movieData.genre,
    duration: movieData.duration,
    rating: 4.5
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
};

export const getMovies = async () => {
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
};
