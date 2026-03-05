import { GamesResponse, GameDetails, Screenshot, Trailer } from '@/types/game';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

export const gamesService = {
  async getGamesByGenre(genreId: number, pageSize: number = 10): Promise<GamesResponse> {
    try {
      const url = `${BACKEND_URL}/api/games?genres=${genreId}&page_size=${pageSize}&ordering=-rating`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data: GamesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener juegos:', error);
      throw error;
    }
  },

  async getGenres() {
    try {
      const url = `${BACKEND_URL}/api/genres`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener géneros:', error);
      throw error;
    }
  },

  async searchGames(query: string, pageSize: number = 10): Promise<GamesResponse> {
    try {
      const url = `${BACKEND_URL}/api/games?search=${encodeURIComponent(query)}&page_size=${pageSize}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data: GamesResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error al buscar juegos:', error);
      throw error;
    }
  },

  async getGameDetails(gameId: number): Promise<GameDetails> {
    try {
      const url = `${BACKEND_URL}/api/games/${gameId}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data: GameDetails = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener detalles del juego:', error);
      throw error;
    }
  },

  async getGameScreenshots(gameId: number): Promise<Screenshot[]> {
    try {
      const url = `${BACKEND_URL}/api/games/${gameId}/screenshots`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error al obtener capturas:', error);
      throw error;
    }
  },

  async getGameTrailers(gameId: number): Promise<Trailer[]> {
    try {
      const url = `${BACKEND_URL}/api/games/${gameId}/movies`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error al obtener trailers:', error);
      throw error;
    }
  },
};
