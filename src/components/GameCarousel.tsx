'use client';

import { useEffect, useState } from 'react';
import { Game, LoadingState } from '@/types/game';
import { gamesService } from '@/services/gamesService';
import GameCard from './GameCard';
import SkeletonCard from './SkeletonCard';
import ErrorMessage from './ErrorMessage';

interface GameCarouselProps {
  genreId: number;
  genreName: string;
  pageSize?: number;
}

export default function GameCarousel({ 
  genreId, 
  genreName, 
  pageSize = 10 
}: GameCarouselProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const loadGames = async () => {
    setLoadingState('loading');
    setError(null);

    try {
      const response = await gamesService.getGamesByGenre(genreId, pageSize);
      setGames(response.results);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setLoadingState('error');
    }
  };

  useEffect(() => {
    loadGames();
  }, [genreId, pageSize]);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`carousel-${genreId}`);
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {genreName}
        </h2>
        
        {loadingState === 'success' && games.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll izquierda"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              aria-label="Scroll derecha"
            >
              <svg
                className="w-6 h-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        {loadingState === 'loading' && (
          <div
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {loadingState === 'error' && (
          <div className="px-4">
            <ErrorMessage
              title="Error al cargar juegos"
              message={`No pudimos cargar los juegos de ${genreName}. ${error || ''}`}
              onRetry={loadGames}
            />
          </div>
        )}

        {loadingState === 'success' && (
          <>
            {games.length > 0 ? (
              <div
                id={`carousel-${genreId}`}
                className="flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                No se encontraron juegos en esta categoría
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
