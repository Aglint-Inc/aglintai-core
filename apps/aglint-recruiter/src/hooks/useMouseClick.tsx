import { useEffect, useState } from 'react';

export const useMouseClick = () => {
  const [data, setData] = useState({ click: false, x: null, y: null });
  const handleMouseUp = () => {
    setData({
      click: false,
      x: null,
      y: null,
    });
  };
  const handleMouseDown = (e: any) => {
    setData({
      click: true,
      x: e.clientX,
      y: e.clientY,
    });
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [handleMouseDown]);
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseUp]);
  return data;
};
