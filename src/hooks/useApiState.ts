import { useCallback, useEffect, useState } from 'react';
import { LoadingState } from '@/types/game';

export function useApiState<T>(
  fetchFunction: () => Promise<T>,
  dependencies: readonly unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoadingState('loading');
    setError(null);

    try {
      const result = await fetchFunction();
      setData(result);
      setLoadingState('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setLoadingState('error');
    }
  }, [fetchFunction]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchData();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [fetchData, dependencies]);

  return {
    data,
    loadingState,
    error,
    retry: fetchData,
    isLoading: loadingState === 'loading',
    isSuccess: loadingState === 'success',
    isError: loadingState === 'error',
  };
}
