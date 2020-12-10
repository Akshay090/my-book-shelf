import { useEffect } from "react";

// https://usehooks.com/useOnClickOutside/

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousestart", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
