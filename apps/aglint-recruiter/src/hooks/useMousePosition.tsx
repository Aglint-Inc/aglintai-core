import { useEffect, useState } from 'react';

export const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<{
    [_id in 'x' | 'y']: number | null;
  }>({
    x: null,
    y: null,
  });
  useEffect(() => {
    const updateMousePosition = (ev: any) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);
  return mousePosition;
};
