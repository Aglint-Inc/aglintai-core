import { useEffect, useState } from 'react';

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
