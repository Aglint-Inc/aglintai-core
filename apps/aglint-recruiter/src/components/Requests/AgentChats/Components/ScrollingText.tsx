import { Box } from '@mui/material';
import React, { useEffect, useRef,useState } from 'react';

import { Text } from '@/devlink//Text';

const ScrollingText = () => {
  const textArray = [
    "Nothing will change until you explicitly confirm it",
    "Use '@' to mention people",
    "Use '#' to mention events",
    "Start a prompt with '/' to see commands"
  ];

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const intervalRef = useRef(null);

  useEffect(() => {
    const handleInteractionTimeout = () => {
      if (Date.now() - lastInteractionTime > 30000) {
        setIsPlaying(true);
      }
    };

    const interval = setInterval(handleInteractionTimeout, 1000);
    return () => clearInterval(interval);
  }, [lastInteractionTime]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      }, 10000); // Change text every 2 seconds
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, textArray.length]);

  const handleClick = () => {
    setLastInteractionTime(Date.now());
    setCurrentIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    setIsPlaying((prevState) => !prevState);
  };

  return (
    <Box onClick={handleClick}>
        <Text
            size={1}
            content={textArray[currentIndex]}
            styleProps={{
                style: {
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                },
            }}
            ></Text>
    </Box>
  );
};

export default ScrollingText;
