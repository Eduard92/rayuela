import calendarioTitulo from "@/assets/calendario-titulo.png";
import rosaCalendario from "@/assets/rosa-calendario.png";

const CalendarioSection = () => {
  const diasSemana = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  
  // Colores del grid sin colores iguales adyacentes (horizontal y vertical)
  const gridColors = [
    "#F5A3C7", "#8BC4E8", "#F7A34A", "#9A8B4F", "#F5A3C7", "#F7A34A", "#8BC4E8",
    "#9A8B4F", "#F7A34A", "#8BC4E8", "#F5A3C7", "#F7A34A", "#9A8B4F", "#F5A3C7",
    "#F7A34A", "#F5A3C7", "#9A8B4F", "#8BC4E8", "#9A8B4F", "#F7A34A", "#9A8B4F",
    "#8BC4E8", "#9A8B4F", "#F5A3C7", "#F7A34A", "#8BC4E8", "#F5A3C7", "#8BC4E8",
    "#F5A3C7", "#F7A34A", "#8BC4E8", "#9A8B4F", "#F5A3C7", "#9A8B4F", "#F7A34A",
  ];

  // Polígonos asimétricos más sutiles para evitar espacios
  const clipPaths = [
    "polygon(2% 0%, 100% 1%, 99% 100%, 0% 98%)",
    "polygon(0% 2%, 98% 0%, 100% 99%, 1% 100%)",
    "polygon(1% 1%, 100% 0%, 99% 99%, 0% 100%)",
    "polygon(0% 0%, 99% 2%, 100% 100%, 2% 99%)",
    "polygon(1% 1%, 100% 0%, 98% 100%, 0% 99%)",
    "polygon(0% 0%, 100% 1%, 99% 98%, 1% 100%)",
    "polygon(2% 0%, 100% 1%, 98% 100%, 0% 99%)",
  ];

  return (
    <section className="relative min-h-screen bg-background py-8 lg:py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-2 max-w-4xl mx-auto">
          {diasSemana.map((dia, index) => (
            <div 
              key={dia} 
              className="text-center text-xs lg:text-sm font-semibold"
              style={{ 
                color: index === 2 ? "#F7A34A" : 
                       index === 3 ? "#F5A3C7" : 
                       index === 4 ? "#8BC4E8" : 
                       index === 5 ? "#F7A34A" : 
                       index === 6 ? "#F5A3C7" : "#8BC4E8"
              }}
            >
              {dia}
            </div>
          ))}
        </div>

        {/* Grid del calendario con polígonos asimétricos */}
        <div className="relative">
          <div className="grid grid-cols-7 max-w-4xl mx-auto -ml-1">
            {gridColors.map((color, index) => (
              <div
                key={index}
                className="aspect-square transition-transform hover:scale-105 cursor-pointer hover:z-10 -m-[2px]"
                style={{ 
                  backgroundColor: color,
                  clipPath: clipPaths[index % clipPaths.length],
                  transform: `rotate(${(index % 3 - 1) * 0.5}deg)`,
                }}
              />
            ))}
          </div>

          {/* Personaje rosa posicionado a la derecha */}
          <div className="absolute -right-4 lg:-right-20 bottom-0 lg:bottom-10 w-32 lg:w-64 z-10">
            <img 
              src={rosaCalendario} 
              alt="Ela - Mascota de Rayuela" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Título Calendario */}
          <div className="absolute right-8 lg:right-16 bottom-4 lg:bottom-20 w-40 lg:w-56 z-0">
            <img 
              src={calendarioTitulo} 
              alt="Calendario" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarioSection;
