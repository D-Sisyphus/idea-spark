import { useState, useEffect, useCallback } from 'react';

interface UseExamTimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
}

export const useExamTimer = ({ initialMinutes, onTimeUp }: UseExamTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeRemaining, onTimeUp]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setTimeRemaining(initialMinutes * 60);
    setIsRunning(false);
  }, [initialMinutes]);

  const formatTime = useCallback((seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const percentage = (timeRemaining / (initialMinutes * 60)) * 100;
  const isLowTime = timeRemaining <= 300; // 5 minutes or less
  const isCriticalTime = timeRemaining <= 60; // 1 minute or less

  return {
    timeRemaining,
    formattedTime: formatTime(timeRemaining),
    percentage,
    isRunning,
    isLowTime,
    isCriticalTime,
    start,
    pause,
    reset,
  };
};
