import { ApiListResponse, DeveloperCategory, GamesResponse, GameDetails, GenreCategory, Screenshot, Trailer } from '@/types/game';

const RAWG_BASE_URL = process.env.NEXT_PUBLIC_RAWG_BASE_URL;
const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY;

const normalizeRawgBaseUrl = (url: string) => {
  let normalizedUrl = url.trim().replace(/\/+$/, '');

  if (normalizedUrl.endsWith('/games')) {
    normalizedUrl = normalizedUrl.slice(0, -'/games'.length);
  }

  return normalizedUrl;
};

const validateEnvConfig = () => {
  if (!RAWG_API_KEY) {
    throw new Error('Falta NEXT_PUBLIC_RAWG_API_KEY en variables de entorno');
  }

  if (!RAWG_BASE_URL) {
    throw new Error('Falta NEXT_PUBLIC_RAWG_BASE_URL en variables de entorno');
  }
};

const buildUrl = (path: string, query: Record<string, string | number>) => {
  const normalizedBaseUrl = normalizeRawgBaseUrl(RAWG_BASE_URL || '');

  const params = new URLSearchParams({
    key: RAWG_API_KEY || '',
    ...Object.fromEntries(
      Object.entries(query).map(([key, value]) => [key, String(value)])
    ),
  });

  return `${normalizedBaseUrl}${path}?${params.toString()}`;
};

export const gamesService = {
  async getGamesByGenre(genreId: number, pageSize: number = 10): Promise<GamesResponse> {
    try {
      validateEnvConfig();

      const url = buildUrl('/games', {
        genres: genreId,
        page_size: pageSize,
        ordering: '-rating',
      });
      
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

  async getGenres(): Promise<ApiListResponse<GenreCategory>> {
    try {
      validateEnvConfig();

      const url = buildUrl('/genres', {});
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data: ApiListResponse<GenreCategory> = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener géneros:', error);
      throw error;
    }
  },

  async getDevelopers(pageSize: number = 40): Promise<ApiListResponse<DeveloperCategory>> {
    try {
      validateEnvConfig();

      const url = buildUrl('/developers', {
        page_size: pageSize,
        ordering: '-games_count',
      });

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data: ApiListResponse<DeveloperCategory> = await response.json();
      return data;
    } catch (error) {
      console.error('Error al obtener desarrolladores:', error);
      throw error;
    }
  },

  async getTopRankedGames(pageSize: number = 24): Promise<GamesResponse> {
    try {
      validateEnvConfig();

      const url = buildUrl('/games', {
        page_size: pageSize,
        ordering: '-rating',
      });

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
      console.error('Error al obtener ranking de juegos:', error);
      throw error;
    }
  },

  async getGamesByDeveloper(developerId: number, pageSize: number = 24): Promise<GamesResponse> {
    try {
      validateEnvConfig();

      const url = buildUrl('/games', {
        developers: developerId,
        page_size: pageSize,
        ordering: '-rating',
      });

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
      console.error('Error al obtener juegos por desarrollador:', error);
      throw error;
    }
  },

  async searchGames(query: string, pageSize: number = 10): Promise<GamesResponse> {
    try {
      validateEnvConfig();

      const url = buildUrl('/games', {
        search: query,
        page_size: pageSize,
      });
      
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
      validateEnvConfig();

      const url = buildUrl(`/games/${gameId}`, {});
      
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
      validateEnvConfig();

      const url = buildUrl(`/games/${gameId}/screenshots`, {});
      
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
      validateEnvConfig();

      const url = buildUrl(`/games/${gameId}/movies`, {});
      
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
