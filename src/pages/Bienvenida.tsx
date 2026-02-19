import { useState, useEffect, useRef } from "react";
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
import backgroundVideo from "@/assets/Rayuela3.0.webm";
import rayuelaHorizontal from "@/assets/rayuela-horizontal.png";
import textoSlogan from "@/assets/texto-slogan.png";
// Letras apiladas en 3 filas: Ra, yu, ela
const stackedLetters = [
  // Fila 1: R, a
  [
    { src: letterR, alt: "R", className: "w-32 md:w-52 lg:w-64" },
    { src: letterA, alt: "a", className: "w-32 md:w-52 lg:w-64" },
  ],
  // Fila 2: y, u
  [
    { src: letterY, alt: "y", className: "w-32 md:w-52 lg:w-64" },
    { src: letterU, alt: "u", className: "w-32 md:w-40 lg:w-52" },
  ],
  // Fila 3: e, l, a
  [
    { src: letterE, alt: "e", className: "w-40 md:w-48 lg:w-60" },
    { src: letterL, alt: "l", className: "w-12 md:w-20 lg:w-24" },
    { src: letterAA, alt: "a", className: "w-32 md:w-40 lg:w-52" },
  ],
];
// Transiciones diferentes para cada letra
const letterTransitions = [
  "translate-y-12 scale-75", // R - desde abajo con escala
  "translate-x-12 rotate-12", // a - desde derecha con rotación
  "-translate-y-12 scale-90", // y - desde arriba con escala
  "-translate-x-12 -rotate-12", // u - desde izquierda con rotación
  "translate-y-12 -rotate-6", // e - desde abajo con rotación
  "scale-50", // l - solo escala
  "-translate-y-12 rotate-6", // a - desde arriba con rotación
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
      {/* Fondo con pattern para fase inicial */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === "final" ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url(${backgroundPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Fondo con video para fase final */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          phase === "final" ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={backgroundVideo} type="video/webm" />
      </video>
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
                const hiddenTransform = letterTransitions[globalIndex] || "translate-y-8";
                return (
                  <img
                    key={colIndex}
                    src={letter.src}
                    alt={letter.alt}
                    className={`${letter.className} h-auto transition-all duration-700 ease-out ${
                      isVisible ? "opacity-100 translate-x-0 translate-y-0 rotate-0 scale-100" : `opacity-0 ${hiddenTransform}`
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
        {/* Logo horizontal fuera del cuadro - solo en desktop */}
        <img
          src={rayuelaHorizontal}
          alt="Rayuela"
          className={`hidden md:block w-[50%] h-auto mb-[-6rem] z-10 transition-all duration-700 ${
            showFinal ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        />
        {/* Cuadro blanco con slogan y botón */}
        <div
          className={`bg-white/60 rounded-xl shadow-2xl p-6 md:p-10  mx-4 w-[90%] md:w-[70%] max-w-4xl flex flex-col items-center transition-all duration-700 ${
            showFinal ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          {/* Logo horizontal dentro del cuadro - solo en móvil */}
          <img
            src={rayuelaHorizontal}
            alt="Rayuela"
            className={`md:hidden w-[90%] h-auto mb-4 transition-all duration-700 ${
              showFinal ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          />
          {/* Texto slogan */}
          <img
            src={textoSlogan}
            alt="El lugar donde tus sueños se hacen fiesta"
            className="w-[85%] md:w-[35rem] max-w-full h-auto"
          />
        </div>
        {/* Botón entrar - debajo del cuadro blanco */}
        <button
          onClick={handleEnter}
          className={`mt-6 px-16 py-5 bg-rayuela-orange text-white font-display text-3xl rounded-full
            hover:bg-rayuela-orange/80 hover:scale-110 transition-all duration-300
            shadow-2xl hover:shadow-3xl font-light ${
              showFinal ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
            }`}
          style={{
            cursor: `url(${cursorImg}) 16 16, pointer`,
          }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
};
export default Bienvenida;
