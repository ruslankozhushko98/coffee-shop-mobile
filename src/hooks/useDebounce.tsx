import { useEffect, useState } from 'react';

export function useDebounce<T>(title: T, delay: number): T {
  const [value, setValue] = useState<T>(title);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(title);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  return value;
}
