

import { useState, useEffect } from "react";

export default function useWindowResize() {
  const [width, setWidth] = useState<any>();
  const [height, setHeight] = useState<any>();

  function handleResize() {
    setWidth(window.innerWidth);
    setHeight(window.window.innerHeight);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { width, height };
}