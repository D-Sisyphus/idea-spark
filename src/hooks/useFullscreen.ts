import { useState, useEffect, useCallback } from 'react';

export const useFullscreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [violations, setViolations] = useState<{ type: string; timestamp: Date }[]>([]);

  const enterFullscreen = useCallback(async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    } catch (error) {
      console.error('Failed to exit fullscreen:', error);
    }
  }, []);

  const logViolation = useCallback((type: string) => {
    setViolations((prev) => [...prev, { type, timestamp: new Date() }]);
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      if (!isCurrentlyFullscreen && violations.length >= 0) {
        // User exited fullscreen during exam
        logViolation('fullscreen_exit');
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        logViolation('tab_switch');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common shortcuts
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'p' || e.key === 'a')) ||
        e.key === 'F12' ||
        (e.altKey && e.key === 'Tab')
      ) {
        e.preventDefault();
        logViolation('blocked_shortcut');
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      logViolation('right_click');
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [logViolation, violations.length]);

  return {
    isFullscreen,
    violations,
    enterFullscreen,
    exitFullscreen,
    logViolation,
  };
};
