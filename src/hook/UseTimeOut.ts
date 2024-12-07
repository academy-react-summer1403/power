import { useRef, useCallback, useEffect } from "react";

export const useTimeout = () => {
  const ref = useRef<NodeJS.Timeout | null>(null);

  const setTimeoutRef = useCallback((fn: () => void, ms: number) => {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(fn, ms);
  }, []);

  useEffect(() => {
    return () => {
      if (ref.current) {
        clearTimeout(ref.current);
      }
    };
  }, []);

  return setTimeoutRef;
};
