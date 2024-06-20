/* eslint-disable security/detect-object-injection */
import { useEffect, useRef, useState } from 'react';

export const useMouseScroll = () => {
  const [scrollDir, setScrollDir] = useState('scrolling down');

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? 'scrolling down' : 'scrolling up');
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollDir]);

  return scrollDir;
};

export const useOnline = () => {
  const [isOnline, setIsOnline] = useState(!document.hidden);
  const handChangeStatus = () => {
    setIsOnline(!document.hidden);
  };
  useEffect(() => {
    document.addEventListener('onlineStatus', handChangeStatus);
    return () => {
      document.removeEventListener('onlineStatus', handChangeStatus);
    };
  }, []);
  return isOnline;
};

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

export const getBoundingSingleStatus = (id: string, x: number, y: number) => {
  const div = document.getElementById(id);
  const coords = div.getBoundingClientRect();
  const boundedX = coords.left <= x && x <= coords.right;
  const boundedY = coords.top <= y && y <= coords.bottom;
  return boundedX && boundedY;
};

export const getBoundingStatus = (id: string, x: number, y: number) => {
  const extraDivs = document.getElementsByClassName(`${id}-Include`);
  const extrDivArr = [];
  for (let i = 0; i < extraDivs.length; i++) {
    extrDivArr.push(...extraDivs[i].getElementsByTagName('*'));
  }
  const divs = [
    ...document.getElementById(id).getElementsByTagName('*'),
    ...extrDivArr,
  ];
  let right = Math.log(0);
  let bottom = Math.log(0);
  let top = Infinity;
  let left = Infinity;
  for (let i = 0; i < divs.length; i++) {
    const div = divs[i];
    const coords = div.getBoundingClientRect();
    if (coords.right > right) right = coords.right;
    if (coords.left < left) left = coords.left;
    if (coords.bottom > bottom) bottom = coords.bottom;
    if (coords.top < top) top = coords.top;
  }
  const boundedX = left <= x && x <= right;
  const boundedY = top <= y && y <= bottom;

  return boundedX && boundedY;
};
