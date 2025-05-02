import { useState, useEffect } from "react";

export default function DigitingEffect({ text = "O  QG te aguarda" }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 90);

    return () => clearInterval(typingInterval);
  }, [text]);

  return (
    <p className=" text-6xl sm:text-8xl font-extrabold drop-shadow-xl">
      {displayedText}
      <span className="animate-blinking-cursor">|</span>
    </p>
  );
}
