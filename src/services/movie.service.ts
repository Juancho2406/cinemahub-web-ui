import axios from 'axios';

export const BASE_URL = 'https://3tmga2hhac.execute-api.us-east-1.amazonaws.com/prod';

export const createMovie = async (movieData: { title: string, genre: string, duration: number, rating: number }) => {
  try {
    const response = await axios.post(`${BASE_URL}/movies`, movieData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
};

// api/movies.ts
export const getMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movies`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };
  