import { useEffect, useState } from "react";

function useDebounce(query, pageNumber, delay) {
  const [debouncedValue, setDebouncedValue] = useState(query);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebouncedValue(query);
    }, delay);

    return () => clearTimeout(timer);
  }, [query, delay]);
  return debouncedValue;
}

export default useDebounce;
