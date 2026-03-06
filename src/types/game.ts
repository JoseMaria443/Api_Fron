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

export interface GameDetails extends Game {
  description_raw: string;
  description: string;
  website: string;
  developers: Developer[];
  publishers: Publisher[];
  esrb_rating?: {
    id: number;
    name: string;
    slug: string;
  };
  playtime: number;
  screenshots?: Screenshot[];
  movies?: Trailer[];
}

export interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
}

export interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
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

export interface DeveloperCategory {
  id: number;
  name: string;
  slug: string;
}

export interface ApiListResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
