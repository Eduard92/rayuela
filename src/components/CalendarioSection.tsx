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

  // Rotaciones sutiles para efecto asimétrico
  const rotations = [0.8, -0.5, 0.6, -0.8, 0.4, -0.6, 0.7];

  return (
    <section className="relative min-h-screen bg-background overflow-hidden flex items-end">
      <div className="container mx-auto px-4 pb-8 lg:pb-16">
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-2 max-w-5xl mx-auto">
          {diasSemana.map((dia, index) => (
            <div 
              key={dia} 
              className="text-center text-xs lg:text-base font-semibold"
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
          <div 
            className="grid grid-cols-7 max-w-5xl mx-auto"
            style={{ 
              gap: 0,
              background: "linear-gradient(45deg, #F5A3C7 0%, #8BC4E8 50%, #F7A34A 100%)"
            }}
          >
            {gridColors.map((color, index) => (
              <div
                key={index}
                className="aspect-square transition-transform hover:scale-110 cursor-pointer hover:z-10"
                style={{ 
                  backgroundColor: color,
                  transform: `rotate(${rotations[index % rotations.length]}deg) scale(1.02)`,
                  transformOrigin: "center",
                }}
              />
            ))}
          </div>

          {/* Personaje rosa posicionado a la derecha */}
          <div className="absolute -right-12 lg:-right-40 bottom-0 lg:bottom-4 w-52 lg:w-[28rem] z-10">
            <img 
              src={rosaCalendario} 
              alt="Ela - Mascota de Rayuela" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Título Calendario */}
          <div className="absolute right-12 lg:right-24 bottom-4 lg:bottom-24 w-48 lg:w-72 z-0">
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
