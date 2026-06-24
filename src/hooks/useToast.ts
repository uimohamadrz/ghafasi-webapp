import { useCallback, useRef, useState } from 'react';

export function useToast(hideAfterMs = 1600) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showToast = useCallback((text: string) => {
    setMessage(text);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(null), hideAfterMs);
  }, [hideAfterMs]);

  return { toastMessage: message, showToast };
}
