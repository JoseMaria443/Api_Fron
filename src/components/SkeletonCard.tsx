export default function SkeletonCard() {
  return (
    <div className="min-w-[280px] h-[380px] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
