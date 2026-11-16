import { useEffect, useRef, useState } from "react";
import "./AnimatedText.css";

const animationVariants = new Set(["word", "line", "fade", "blur", "underline", "character"]);

function useReveal({ delay, once, threshold }) {
  const elementRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold: threshold || 0.15, rootMargin: "0px 0px -20px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, once, threshold]);

  return { elementRef, isRevealed };
}

function getWordTokens(text, highlightWords) {
  const highlights = new Set(highlightWords);
  let wordIndex = 0;
  return text.split(/(\s+)/).map((token, index) => {
    if (/^\s+$/.test(token)) return { key: `space-${index}`, text: token, type: "space" };
    return {
      key: `word-${index}`,
      text: token,
      type: "word",
      wordIndex: wordIndex++,
      highlighted: highlights.has(token),
    };
  });
}

export default function AnimatedText({
  as: Element = "div",
  children,
  className = "",
  variant = "fade",
  delay = 0,
  duration = 650,
  stagger = 55,
  threshold = 0.18,
  once = true,
  highlightWords = [],
  ...props
}) {
  const validVariant = animationVariants.has(variant) ? variant : "fade";
  const { elementRef, isRevealed } = useReveal({ delay, once, threshold });
  const text = typeof children === "string" ? children : null;
  const words = validVariant === "word" && text !== null
    ? getWordTokens(text, highlightWords)
    : [];
  const style = {
    "--animated-delay": `${delay}ms`,
    "--animated-duration": `${duration}ms`,
    "--animated-stagger": `${stagger}ms`,
    ...props.style,
  };

  return (
    <Element
      {...props}
      ref={elementRef}
      className={`animated-text animated-text--${validVariant}${isRevealed ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      data-animation-variant={validVariant}
      aria-label={words.length || validVariant === "character" ? text : props["aria-label"]}
    >
      {words.length ? (
        words.map((word) =>
          word.type === "space" ? (
            <span aria-hidden="true" key={word.key}>{word.text}</span>
          ) : (
            <span
              aria-hidden="true"
              className={`animated-text__word${word.highlighted ? " animated-text__highlight" : ""}`}
              key={word.key}
              style={{ "--word-index": word.wordIndex }}
            >
              {word.text}
            </span>
          ),
        )
      ) : validVariant === "character" && text !== null ? (
        <span aria-hidden="true">
          {Array.from(text).map((character, index) => (
            <span
              aria-hidden="true"
              className="animated-text__character"
              key={`${character}-${index}`}
              style={{ "--character-index": index }}
            >
              {character === " " ? "\u00a0" : character}
            </span>
          ))}
        </span>
      ) : validVariant === "line" ? (
        <span className="animated-text__line-mask">
          <span className="animated-text__line-content">{children}</span>
        </span>
      ) : (
        children
      )}
    </Element>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1200,
  delay = 0,
  className = "",
  ...props
}) {
  const target = Number(String(value).replace(/[^\d.-]/g, ""));
  const formattedTarget = Number.isFinite(target) ? target.toLocaleString("en-IN") : String(value);
  const { elementRef, isRevealed } = useReveal({ delay, once: true, threshold: 0.1 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isRevealed || !Number.isFinite(target)) return undefined;

    let frameId;
    let startTime;
    const animate = (time) => {
      if (startTime === undefined) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCount(Math.round(target * easedProgress));
      if (progress < 1) frameId = window.requestAnimationFrame(animate);
    };

    const timeoutId = window.setTimeout(() => {
      frameId = window.requestAnimationFrame(animate);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(frameId);
    };
  }, [delay, duration, isRevealed, target]);

  return (
    <span
      {...props}
      ref={elementRef}
      className={`animated-counter${isRevealed ? " is-revealed" : ""}${className ? ` ${className}` : ""}`}
      aria-label={`${formattedTarget}${suffix}`}
    >
      {Number.isFinite(target)
        ? (isRevealed ? count.toLocaleString("en-IN") : "0")
        : value}{suffix}
    </span>
  );
}
