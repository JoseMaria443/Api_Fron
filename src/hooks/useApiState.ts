import { useState, useEffect } from 'react';
import { LoadingState } from '@/types/game';

/**
 * Hook personalizado para manejar estados de carga de API
 * Implementa el patrón Loading -> Success -> Error
 */
export function useApiState<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
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
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

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
