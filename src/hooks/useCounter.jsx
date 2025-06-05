import { useEffect, useState } from "react";

export const useCounter = (end, duration = 2500, delay = 0) => {
  const [count, setCount] = useState(0);
  console.log(count,'------------------');
  
  useEffect(() => {
    if (end == null) return;

    let frame = 0;
    const fps = 60;
    const totalFrames = Math.round((duration / 1000) * fps);
    const increment = end / totalFrames;
    let animationFrameId;

    const startAnimation = () => {
      const animate = () => {
        frame++;
        const nextValue = Math.round(increment * frame);
        if (nextValue >= end) {
          setCount(end);
        } else {
          setCount(nextValue);
          animationFrameId = requestAnimationFrame(animate);
        }
      };
      animationFrameId = requestAnimationFrame(animate);
    };

    const delayTimeout = setTimeout(startAnimation, delay);

    return () => {
      clearTimeout(delayTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [end, duration, delay]);

  return count;
};
