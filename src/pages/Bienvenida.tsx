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
import backgroundWelcome from "@/assets/background-welcome.jpg";
import rayuelaHorizontal from "@/assets/rayuela-horizontal.png";
import textoSlogan from "@/assets/texto-slogan.png";

// Letras apiladas en 3 filas: Ra, yu, ela
const stackedLetters = [
  // Fila 1: R, a
  [
    { src: letterR, alt: "R", className: "w-20 md:w-32" },
    { src: letterA, alt: "a", className: "w-20 md:w-32" },
  ],
  // Fila 2: y, u
  [
    { src: letterY, alt: "y", className: "w-20 md:w-32" },
    { src: letterU, alt: "u", className: "w-16 md:w-24" },
  ],
  // Fila 3: e, l, a
  [
    { src: letterE, alt: "e", className: "w-20 md:w-28" },
    { src: letterL, alt: "l", className: "w-8 md:w-12" },
    { src: letterAA, alt: "a", className: "w-16 md:w-24" },
  ],
];

const Bienvenida = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"stacked" | "transition" | "final">("stacked");
  const [animatedLetters, setAnimatedLetters] = useState<number[]>([]);
  const [showFinal, setShowFinal] = useState(false);

  // Calcular total de letras
  const totalLetters = stackedLetters.flat().length;

  useEffect(() => {
    // Animar letras una por una
    let letterIndex = 0;
    stackedLetters.forEach((row) => {
      row.forEach((_, colIndex) => {
        const currentIndex = letterIndex;
        setTimeout(
          () => {
            setAnimatedLetters((prev) => [...prev, currentIndex]);
          },
          currentIndex * 150 + 300,
        );
        letterIndex++;
      });
    });

    // Después de todas las letras, iniciar transición
    setTimeout(
      () => {
        setPhase("transition");
      },
      totalLetters * 150 + 1500,
    );

    // Mostrar pantalla final
    setTimeout(
      () => {
        setPhase("final");
        setTimeout(() => setShowFinal(true), 100);
      },
      totalLetters * 150 + 2000,
    );
  }, []);

  const handleEnter = () => {
    navigate("/home");
  };

  // Contar índice global de letra
  const getGlobalIndex = (rowIndex: number, colIndex: number) => {
    let index = 0;
    for (let r = 0; r < rowIndex; r++) {
      index += stackedLetters[r].length;
    }
    return index + colIndex;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        cursor: `url(${cursorImg}) 16 16, auto`,
      }}
    >
      {/* Fondo gris claro para fase inicial */}
      <div
        className={`absolute inset-0 bg-[#f1eff0] transition-opacity duration-1000 ${
          phase === "final" ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Fondo con imagen para fase final */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === "final" ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${backgroundWelcome})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Fase 1: Letras apiladas */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          phase === "stacked" ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center gap-0 md:gap-1">
          {stackedLetters.map((row, rowIndex) => (
            <div key={rowIndex} className="flex items-end justify-center gap-0">
              {row.map((letter, colIndex) => {
                const globalIndex = getGlobalIndex(rowIndex, colIndex);
                const isVisible = animatedLetters.includes(globalIndex);
                return (
                  <img
                    key={colIndex}
                    src={letter.src}
                    alt={letter.alt}
                    className={`${letter.className} h-auto transition-all duration-500 ease-out ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    }`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Fase 2: Pantalla final con caja */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
          phase === "final" ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Logo horizontal fuera del cuadro - 75% del ancho */}
        <img
          src={rayuelaHorizontal}
          alt="Rayuela"
          className={`w-[80%] h-auto mb-[-2rem] md:mb-[-3rem] z-10 transition-all duration-700 ${
            showFinal ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        />

        {/* Cuadro blanco con slogan y botón */}
        <div
          className={`bg-white/90 rounded-xl shadow-2xl p-6 md:p-10 pt-12 md:pt-16 mx-4 w-[95%] md:w-[85%] max-w-6xl flex flex-col items-center transition-all duration-700 ${
            showFinal ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Texto slogan - 55rem en desktop */}
          <img
            src={textoSlogan}
            alt="El lugar donde tus sueños se hacen fiesta"
            className="w-full md:w-[55rem] max-w-full h-auto mb-6"
          />

          {/* Botón entrar */}
          <button
            onClick={handleEnter}
            className="px-10 py-3 bg-rayuela-pink text-white font-display text-xl rounded-full 
              hover:bg-rayuela-pink/80 hover:scale-105 transition-all duration-300 
              shadow-lg hover:shadow-xl"
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
