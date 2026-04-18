import { useState, useEffect, useCallback, useRef } from 'react';

interface UseCarouselOptions {
  itemCount: number;
  autoPlay?: boolean;
  interval?: number;
}

export const useCarousel = ({ itemCount, autoPlay = true, interval = 5000 }: UseCarouselOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (autoPlay) {
      timerRef.current = window.setInterval(next, interval);
    }
  }, [autoPlay, interval, next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const onInteraction = () => {
    resetTimer();
  };

  return { currentIndex, next, prev, goTo, onInteraction };
};
