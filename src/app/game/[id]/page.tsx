'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { GameDetails, Screenshot, Trailer, LoadingState } from '@/types/game';
import { gamesService } from '@/services/gamesService';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = Number(params.id);

  const [game, setGame] = useState<GameDetails | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>('loading');
  const [error, setError] = useState<string | null>(null);

  const loadGameData = async () => {
    setLoadingState('loading');
    setError(null);

    try {
      const [gameData, screenshotsData, trailersData] = await Promise.all([
        gamesService.getGameDetails(gameId),
        gamesService.getGameScreenshots(gameId),
        gamesService.getGameTrailers(gameId),
      ]);

      setGame(gameData);
      setScreenshots(screenshotsData);
      setTrailers(trailersData);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setLoadingState('error');
    }
  };

  useEffect(() => {
    if (gameId) {
      loadGameData();
    }
  }, [gameId]);

  if (loadingState === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (loadingState === 'error' || !game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center p-4">
        <ErrorMessage
          title="Error al cargar el juego"
          message={error || 'No se pudo cargar la información del juego'}
          onRetry={loadGameData}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Volver</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-8 shadow-2xl">
          {game.background_image ? (
            <Image
              src={game.background_image}
              alt={game.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-800 flex items-center justify-center">
              <svg className="w-32 h-32 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{game.name}</h1>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-bold">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xl">{game.rating.toFixed(1)}</span>
              </div>
              
              {game.metacritic && (
                <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">
                  <span className="text-xl">Metacritic: {game.metacritic}</span>
                </div>
              )}

              {game.released && (
                <div className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                  <span className="text-lg">{new Date(game.released).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Descripción</h2>
              <div 
                className="text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: game.description || game.description_raw || 'No hay descripción disponible.' }}
              />
            </section>

            {trailers.length > 0 && (
              <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Tráiler</h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-black">
                  <video
                    controls
                    className="w-full h-full"
                    poster={trailers[0].preview}
                  >
                    <source src={trailers[0].data.max} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              </section>
            )}

            {screenshots.length > 0 && (
              <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Capturas de Pantalla</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {screenshots.slice(0, 6).map((screenshot) => (
                    <div key={screenshot.id} className="relative aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={screenshot.image}
                        alt={`Screenshot ${screenshot.id}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <section className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Información</h2>
              
              <div className="space-y-4">
                {game.playtime > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Tiempo de juego</h3>
                    <p className="text-gray-900 dark:text-white">{game.playtime} horas</p>
                  </div>
                )}

                {game.genres.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Géneros</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {game.platforms.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Plataformas</h3>
                    <div className="flex flex-wrap gap-2">
                      {game.platforms.map((platform) => (
                        <span
                          key={platform.platform.id}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 text-sm rounded-full"
                        >
                          {platform.platform.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {game.developers && game.developers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Desarrolladores</h3>
                    <p className="text-gray-900 dark:text-white">
                      {game.developers.map(dev => dev.name).join(', ')}
                    </p>
                  </div>
                )}

                {game.publishers && game.publishers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Publicadores</h3>
                    <p className="text-gray-900 dark:text-white">
                      {game.publishers.map(pub => pub.name).join(', ')}
                    </p>
                  </div>
                )}

                {game.esrb_rating && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Clasificación ESRB</h3>
                    <p className="text-gray-900 dark:text-white">{game.esrb_rating.name}</p>
                  </div>
                )}

                {game.website && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Sitio Web</h3>
                    <a
                      href={game.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                    >
                      Visitar sitio oficial
                    </a>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
