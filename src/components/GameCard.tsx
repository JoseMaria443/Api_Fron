import { Game } from '@/types/game';
import Image from 'next/image';
import Link from 'next/link';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const gameGenres = Array.isArray(game.genres) ? game.genres : [];
  const gamePlatforms = Array.isArray(game.platforms) ? game.platforms : [];

  return (
    <Link href={`/game/${game.id}`}>
      <div className="group min-w-[280px] h-[380px] bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden">
        {game.background_image ? (
          <Image
            src={game.background_image}
            alt={game.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="280px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
            </svg>
          </div>
        )}
        {game.metacritic && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md font-bold text-sm">
            {game.metacritic}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {game.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              {game.rating.toFixed(1)}
            </span>
          </div>
          {game.released && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(game.released).getFullYear()}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {gameGenres.slice(0, 2).map((genre) => (
            <span
              key={genre.id}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <div className="flex gap-2 items-center text-gray-500 dark:text-gray-400">
          {gamePlatforms.slice(0, 3).map((platform, index) => (
            <span key={platform.platform.id} className="text-xs">
              {platform.platform.name.split(' ')[0]}
              {index < Math.min(2, gamePlatforms.length - 1) && ','}
            </span>
          ))}
          {gamePlatforms.length > 3 && (
            <span className="text-xs">+{gamePlatforms.length - 3}</span>
          )}
        </div>
      </div>
      </div>
    </Link>
  );
}
