import { useEffect, useRef, useState } from 'react';

export const usePolling = (pollingCallback, interval, dependencies = []) => {
  const timerRef = useRef(null);
  const [isPolling, setIsPolling] = useState(true);
  const startPolling = () => {
    timerRef.current = setInterval(pollingCallback, interval);
    setIsPolling(true);
  };
  const stopPolling = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsPolling(false);
  };
  useEffect(() => {
    if (isPolling) startPolling();
    else stopPolling();
    return () => stopPolling();
  }, [isPolling, ...dependencies]);
  return { isPolling, stopPolling };
};
