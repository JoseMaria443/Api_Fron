import { GamesResponse } from '@/types/game';

// URL del backend que actúa como proxy a la API de RAWG
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:4000';

/**
 * Servicio para obtener juegos por género
 * Implementa async/await para peticiones asíncronas
 */
export const gamesService = {
  /**
   * Obtiene juegos filtrados por género
   * @param genreId - ID del género
   * @param pageSize - Cantidad de juegos a obtener (default: 10)
   */
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

  /**
   * Obtiene todos los géneros disponibles
   */
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

  /**
   * Busca juegos por término de búsqueda
   */
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
};
