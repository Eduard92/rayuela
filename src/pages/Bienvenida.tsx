import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import letterR from "@/assets/letters/R.png";
import letterA from "@/assets/letters/A.png";
import letterY from "@/assets/letters/Y.png";
import letterU from "@/assets/letters/U.png";
import letterE from "@/assets/letters/E.png";
import letterL from "@/assets/letters/L.png";
import letterAA from "@/assets/letters/AA.png";
import cursorImg from "@/assets/cursor2.png";
import backgroundPattern from "@/assets/background-pattern.jpg";

const letters = [
  { src: letterR, alt: "R", className: "w-24 md:w-40" },
  { src: letterA, alt: "a", className: "w-24 md:w-40" },
  { src: letterY, alt: "y", className: "w-20 md:w-36" },
  { src: letterU, alt: "u", className: "w-16 md:w-28" },
  { src: letterE, alt: "e", className: "w-24 md:w-36" },
  { src: letterL, alt: "l", className: "w-10 md:w-16" },
  { src: letterAA, alt: "a", className: "w-20 md:w-32" },
];

const Bienvenida = () => {
  const navigate = useNavigate();
  const [animatedLetters, setAnimatedLetters] = useState<boolean[]>(
    new Array(letters.length).fill(false)
  );
  const [showEnter, setShowEnter] = useState(false);

  useEffect(() => {
    // Animate letters one by one
    letters.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedLetters((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, index * 200 + 300);
    });

    // Show enter button after all letters
    setTimeout(() => {
      setShowEnter(true);
    }, letters.length * 200 + 800);
  }, []);

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundPattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: `url(${cursorImg}) 16 16, auto`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/30" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Center box */}
        <div className="bg-white/90 rounded-xl shadow-xl p-6 md:p-10 flex flex-col items-center">
          {/* Letters row */}
          <div className="flex items-end justify-center gap-0 md:gap-1">
            {letters.map((letter, index) => (
              <img
                key={index}
                src={letter.src}
                alt={letter.alt}
                className={`${letter.className} h-auto transition-all duration-500 ease-out ${
                  animatedLetters[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              />
            ))}
          </div>

          {/* Enter button */}
          <button
            onClick={handleEnter}
            className={`mt-8 px-8 py-3 bg-rayuela-pink text-white font-display text-xl rounded-full 
              hover:bg-rayuela-pink/80 hover:scale-105 transition-all duration-300 
              shadow-lg hover:shadow-xl ${
                showEnter
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            style={{
              cursor: `url(${cursorImg}) 16 16, pointer`,
            }}
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bienvenida;
