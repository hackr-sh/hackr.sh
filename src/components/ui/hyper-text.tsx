"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import { cn } from "~/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  animateOnHover?: boolean;
  className?: string;
  animateOnLoad?: boolean;
  delay?: number;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export default function HyperText({
  text,
  duration = 800,
  animateOnHover = false,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
  delay = 0,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(" ").map((w) => w.split("")));
  const [trigger, setTrigger] = useState(false);
  const interations = useRef(- delay);
  const isFirstRender = useRef(true);
  const textSplit = text.split(" ");

  const triggerAnimation = () => {
    interations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!animateOnLoad && isFirstRender.current) {
          clearInterval(interval);
          isFirstRender.current = false;
          return;
        }
        if (interations.current < text.length) {
          setDisplayText((t) => t.map((w, i) => w.map((l, j) => {
            return l === " "
              ? l
              : textSplit.slice(0, i).reduce((acc, w) => acc + w.length + 1, 0) + j <= interations.current
                ? textSplit[i]![j] ?? " "
                : alphabets[getRandomInt(alphabets.length)] ?? " "
          })));
          interations.current = interations.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 10),
    );
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad, textSplit]);

  return (
    <div
      className="py-2 flex flex-row cursor-default scale-100 gap-3 flex-wrap" 
    >
      <AnimatePresence mode="wait">
        {displayText.map((word, i) => (
          <span className="flex flex-row" key={i}>
            {word.map((letter, i) => (
              <motion.h1
                key={i}
                className={cn("font-mono cursor-text", letter === " " ? "w-3" : "", className)}
                onMouseEnter={animateOnHover ? triggerAnimation : undefined}
                {...framerProps}
              >
                {letter.toUpperCase()}
              </motion.h1>
            ))}
          </span>
        ))}
      </AnimatePresence>
    </div>
  );
}
