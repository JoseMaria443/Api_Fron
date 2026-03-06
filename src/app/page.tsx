'use client';

import { FormEvent, useEffect, useState } from 'react';
import GameCarousel from '@/components/GameCarousel';
import GameCard from '@/components/GameCard';
import ErrorMessage from '@/components/ErrorMessage';
import LoadingSpinner from '@/components/LoadingSpinner';
import { gamesService } from '@/services/gamesService';
import { Game, GenreCategory, LoadingState } from '@/types/game';

const FALLBACK_GENRES = [
  { id: 4, name: 'Acción' },
  { id: 51, name: 'Indie' },
  { id: 3, name: 'Aventura' },
  { id: 5, name: 'RPG' },
  { id: 10, name: 'Estrategia' },
  { id: 2, name: 'Shooter' },
  { id: 14, name: 'Simulación' },
  { id: 7, name: 'Puzzle' },
  { id: 1, name: 'Carreras' },
  { id: 15, name: 'Deportes' }
];

type BrowseMode = 'home' | 'search';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Game[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);
  const [browseMode, setBrowseMode] = useState<BrowseMode>('home');

  const [genres, setGenres] = useState<GenreCategory[]>([]);
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const genresResponse = await gamesService.getGenres();
        setGenres(genresResponse.results || []);
      } catch {
        setGenres([]);
      }
    };

    loadMenuData();
  }, []);

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const query = searchQuery.trim();
    if (!query) {
      setBrowseMode('home');
      setSearchResults([]);
      setLoadingState('idle');
      setError(null);
      return;
    }

    setBrowseMode('search');
    setLoadingState('loading');
    setError(null);

    try {
      const response = await gamesService.searchGames(query, 24);
      setSearchResults(response.results);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setLoadingState('error');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setLoadingState('idle');
    setError(null);
    setBrowseMode('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GameHub
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Descubre los mejores juegos por género
              </p>
            </div>

            <form className="hidden md:flex items-center gap-2" onSubmit={handleSearch}>
              <div className="relative w-[320px]">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="search"
                  name="q"
                  placeholder="Buscar juegos..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="w-full h-11 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {(browseMode === 'search' || searchQuery.trim()) && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="h-11 px-4 rounded-xl bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  Limpiar
                </button>
              )}
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-[1920px] mx-auto py-8">
        <section className="px-4 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Explora los Mejores Juegos
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Navega por nuestras categorías y descubre títulos increíbles para cada género
            </p>
          </div>
        </section>

        {browseMode === 'search' ? (
          <section className="px-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Resultados para &quot;{searchQuery.trim()}&quot;
            </h3>

            {loadingState === 'loading' && <LoadingSpinner />}

            {loadingState === 'error' && (
              <ErrorMessage
                title="Error al buscar juegos"
                message={error || 'No se pudieron cargar los resultados de búsqueda'}
                onRetry={() => {
                  const fakeEvent = { preventDefault: () => undefined } as FormEvent<HTMLFormElement>;
                  handleSearch(fakeEvent);
                }}
              />
            )}

            {loadingState === 'success' && (
              <>
                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchResults.map((game) => (
                      <GameCard key={game.id} game={game} />
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-gray-500 dark:text-gray-400">
                    No se encontraron juegos para tu búsqueda
                  </div>
                )}
              </>
            )}
          </section>
        ) : (
          <div className="space-y-8">
            {(genres.length > 0 ? genres : FALLBACK_GENRES).map((genre) => (
              <GameCarousel
                key={genre.id}
                genreId={genre.id}
                genreName={genre.name}
                pageSize={10}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Universidad Politécnica de Chiapas - Aplicación de Consumo de API
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Datos proporcionados por RAWG Video Games Database API
          </p>
        </div>
      </footer>
    </div>
  );
}
