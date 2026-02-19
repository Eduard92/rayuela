import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import backgroundPaquetes from "@/assets/background-paquetes.jpg";
import paquetesEncabezado from "@/assets/paquetes-encabezado.png";
import mascotaVerde from "@/assets/mascota-verde-pastel.png";
import mascotaRosa from "@/assets/mascota-rosa-globo.png";
import quieresMas from "@/assets/quieres-mas.png";
import cotizaAqui from "@/assets/cotiza.png";
import logmin1 from "@/assets/logmins/rayuela_logomin1.png";
import logmin2 from "@/assets/logmins/rayuela_logomin2.png";
import logmin3 from "@/assets/logmins/rayuela_logomin3.png";
import logmin4 from "@/assets/logmins/rayuela_logomin4.png";
import logmin5 from "@/assets/logmins/rayuela_logomin5.png";
import logmin6 from "@/assets/logmins/rayuela_logomin6.png";
import logmin7 from "@/assets/logmins/rayuela_logomin7.png";
import logmin8 from "@/assets/logmins/rayuela_logomin8.png";
import logmin9 from "@/assets/logmins/rayuela_logomin9.png";
import logmin10 from "@/assets/logmins/rayuela_logomin10.png";

const logmins = [logmin1, logmin2, logmin3, logmin4, logmin5, logmin6, logmin7, logmin8, logmin9, logmin10];
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ServicioItem {
  text: string;
  descripcion?: string;
  imagen?: string;
  galeria?: string[];
}

interface ServiciosData {
  columna1: ServicioItem[];
  columna2: ServicioItem[];
  columna3: ServicioItem[];
}

const hasDetail = (item: ServicioItem) =>
  !!(item.descripcion || item.imagen || item.galeria?.length);

const PaquetesSection = () => {
  const colors = ["text-rayuela-orange", "text-rayuela-yellow", "text-rayuela-blue", "text-rayuela-olive"];
  const [selected, setSelected] = useState<ServicioItem | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(0);
  }, [selected]);

  const { data: servicios } = useQuery<ServiciosData>({
    queryKey: ["servicios"],
    queryFn: async () => {
      const res = await fetch("https://rayuela.com.mx/api/servicios");
      if (!res.ok) throw new Error("Error al cargar servicios");
      return res.json();
    },
  });

  const renderColumn = (items: ServicioItem[], globalOffset: number) =>
    items.map((item, index) => {
      const globalIndex = globalOffset + index;
      const colorClass = colors[globalIndex % colors.length];
      const clickable = hasDetail(item);
      return (
        <div
          key={index}
          onClick={() => clickable && setSelected(item)}
          className={`text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 hover:brightness-110 hover:drop-shadow-lg ${clickable ? "cursor-pointer" : "cursor-default"}`}
        >
          <p className={`${colorClass} font-medium uppercase flex items-center gap-2`}>
            <img
              src={logmins[globalIndex % logmins.length]}
              alt=""
              className="w-5 h-5 object-contain shrink-0 opacity-80"
            />
            {item.text}
          </p>
        </div>
      );
    });

  const columns = servicios
    ? [servicios.columna1, servicios.columna2, servicios.columna3]
    : [[], [], []];

  return (
    <section id="paquetes" className="relative min-h-screen w-full overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${backgroundPaquetes})`,
        }}
      />
      {/* Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 lg:py-16">
        {/* Main Container with Characters */}
        <div className="w-full max-w-7xl flex items-center justify-center relative">
          {/* Left Character */}
          <div className="hidden lg:block absolute -left-24 xl:-left-36 bottom-0 w-80 xl:w-[450px] z-20">
            <img
              src={mascotaVerde}
              alt="Mascota verde con pastel"
              className="w-full h-auto object-contain float-animation cursor-pointer"
            />
          </div>
          {/* Center Content */}
          <div className="w-full lg:max-w-3xl xl:max-w-4xl flex flex-col items-center">
            {/* Title Image */}
            <div className="mb-8 lg:mb-10 -mt-8 lg:-mt-12">
              <img
                src={paquetesEncabezado}
                alt="Paquete Rayuela Mágica"
                className="w-64 sm:w-80 md:w-96 lg:w-[450px] h-auto object-contain cursor-pointer hover-buzz transition-all duration-300"
              />
            </div>
            {/* Description */}
            <p className="text-center font-medium uppercase text-base sm:text-lg md:text-xl text-rayuela-pink mb-8 lg:mb-10 max-w-2xl leading-relaxed px-4 transition-all duration-300 hover:scale-105 hover:brightness-110 hover:drop-shadow-lg cursor-pointer">
              En Rayuela hemos creado un paquete que combina diversión, creatividad y magia.
              <br />
              Aquí encontrarás todo lo necesario para celebrar en grande.
            </p>
            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full px-4 lg:px-8">
              {columns.map((col, ci) => {
                const offset = columns.slice(0, ci).reduce((sum, c) => sum + c.length, 0);
                return (
                  <div key={ci} className="space-y-2">
                    {renderColumn(col, offset)}
                  </div>
                );
              })}
            </div>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-16 lg:mt-20">
              <img
                src={quieresMas}
                alt="¿Quieres más?"
                className="h-20 sm:h-24 md:h-32 w-auto object-contain cursor-pointer hover:scale-110 hover:rotate-2 hover:drop-shadow-xl transition-all duration-300"
              />
              <img
                src={cotizaAqui}
                alt="Cotiza aquí"
                className="hidden md:block h-20 sm:h-24 md:h-32 w-auto object-contain cursor-pointer hover:scale-110 hover:-rotate-2 hover:drop-shadow-xl transition-all duration-300"
              />
            </div>
          </div>
          {/* Right Character */}
          <div className="hidden lg:block absolute -right-24 xl:-right-36 bottom-0 w-[368px] xl:w-[520px] z-20">
            <img
              src={mascotaRosa}
              alt="Mascota rosa con globo"
              className="w-full h-auto object-contain float-animation-delayed cursor-pointer"
            />
          </div>
        </div>
        {/* Mobile Characters */}
        <div className="flex lg:hidden justify-between w-full max-w-md mt-8 px-4">
          <img
            src={mascotaVerde}
            alt="Mascota verde con pastel"
            className="w-28 sm:w-36 h-auto object-contain float-animation cursor-pointer"
          />
          <img
            src={mascotaRosa}
            alt="Mascota rosa con globo"
            className="w-24 sm:w-32 h-auto object-contain float-animation-delayed cursor-pointer"
          />
        </div>
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl w-[95vw] rounded-2xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle className="text-rayuela-blue font-medium uppercase text-lg">
              {selected?.text}
            </DialogTitle>
          </DialogHeader>

          {/* Slider: galería + imagen */}
          {(() => {
            const slides: string[] = [
              ...(selected?.galeria ?? []),
              ...(selected?.imagen ? [selected.imagen] : []),
            ];
            if (slides.length === 0) return null;
            const prev = () => setSlideIndex((i) => (i - 1 + slides.length) % slides.length);
            const next = () => setSlideIndex((i) => (i + 1) % slides.length);
            const current = Math.min(slideIndex, slides.length - 1);
            return (
              <div className="relative w-full bg-black select-none">
                <img
                  src={slides[current]}
                  alt={`${selected?.text} ${current + 1}`}
                  className="w-full h-auto"
                />
                {slides.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors"
                    >‹</button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg transition-colors"
                    >›</button>
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {slides.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setSlideIndex(i)}
                          className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/40"}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })()}

          {selected?.descripcion && (
            <p className="px-6 pb-6 pt-3 text-sm text-gray-700 leading-relaxed">{selected.descripcion}</p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PaquetesSection;
