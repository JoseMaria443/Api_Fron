import GameCarousel from '@/components/GameCarousel';

// Los 10 géneros más relevantes en videojuegos
// IDs basados en la API de RAWG
const GAME_GENRES = [
  { id: 4, name: 'Acción' }, // Action
  { id: 51, name: 'Indie' }, // Indie
  { id: 3, name: 'Aventura' }, // Adventure
  { id: 5, name: 'RPG' }, // RPG
  { id: 10, name: 'Estrategia' }, // Strategy
  { id: 2, name: 'Shooter' }, // Shooter
  { id: 14, name: 'Simulación' }, // Simulation
  { id: 7, name: 'Puzzle' }, // Puzzle
  { id: 1, name: 'Carreras' }, // Racing
  { id: 15, name: 'Deportes' }, // Sports
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black">
      {/* Header */}
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
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>Explora juegos increíbles</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1920px] mx-auto py-8">
        {/* Hero Section */}
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

        {/* Carruseles por Género */}
        <div className="space-y-8">
          {GAME_GENRES.map((genre) => (
            <GameCarousel
              key={genre.id}
              genreId={genre.id}
              genreName={genre.name}
              pageSize={10}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
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
