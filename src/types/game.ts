// Tipos para la API de juegos
export interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: Genre[];
  platforms: Platform[];
  metacritic?: number;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface GenreCategory {
  id: number;
  name: string;
  slug: string;
}

// Estados de la aplicación
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
