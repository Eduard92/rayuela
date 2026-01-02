import { useState, useEffect } from "react";
import calendarioTitulo from "@/assets/calendario-titulo.png";
import rosaCalendario from "@/assets/rosa-calendario.png";
import backgroundNosotros from "@/assets/background-nosotros.jpg";
import pinReservado from "@/assets/pin-reservado.png";

interface Reserva {
  fecha: string;
  reservado: boolean;
}

const CalendarioSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [loading, setLoading] = useState(true);

  const diasSemana = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const diasSemanaFull = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  
  // Colores del grid sin colores iguales adyacentes
  const baseColors = ["#F5A3C7", "#8BC4E8", "#F7A34A", "#9A8B4F"];
  
  // Rotaciones sutiles para efecto asimétrico
  const rotations = [0.8, -0.5, 0.6, -0.8, 0.4, -0.6, 0.7];

  // Obtener el color evitando adyacentes
  const getColor = (index: number, totalCols: number, colors: string[]) => {
    const row = Math.floor(index / totalCols);
    const col = index % totalCols;
    
    const leftColor = col > 0 ? colors[(index - 1) % colors.length] : null;
    const topColor = row > 0 ? colors[(index - totalCols) % colors.length] : null;
    
    let colorIndex = index % baseColors.length;
    let attempts = 0;
    
    while (attempts < baseColors.length) {
      const color = baseColors[colorIndex];
      if (color !== leftColor && color !== topColor) {
        return color;
      }
      colorIndex = (colorIndex + 1) % baseColors.length;
      attempts++;
    }
    
    return baseColors[colorIndex];
  };

  // Fetch reservas desde la API
  useEffect(() => {
    const fetchReservas = async () => {
      setLoading(true);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      
      try {
        const response = await fetch(`https://rayuela.com.mx/getReservas/${year}/${month}`);
        if (response.ok) {
          const data = await response.json();
          // La API devuelve un objeto con fechas como claves, convertir a array
          const reservasArray = Object.keys(data).map(fecha => ({
            fecha,
            reservado: true
          }));
          setReservas(reservasArray);
        }
      } catch (error) {
        console.error("Error fetching reservas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [currentDate]);

  // Calcular los días del mes con días de meses adyacentes
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevMonthLastDay = new Date(year, month, 0);
    
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = prevMonthLastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days: { day: number; isCurrentMonth: boolean }[] = [];
    
    // Días del mes anterior
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, isCurrentMonth: true });
    }
    
    // Días del mes siguiente
    let nextMonthDay = 1;
    while (days.length % 7 !== 0) {
      days.push({ day: nextMonthDay++, isCurrentMonth: false });
    }
    
    return days;
  };

  const isReservado = (day: number, isCurrentMonth: boolean): boolean => {
    if (!isCurrentMonth) return false;
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const fechaStr = `${year}-${month}-${dayStr}`;
    
    return reservas.some(r => r.fecha === fechaStr && r.reservado);
  };

  const days = getDaysInMonth();

  const monthNames = [
    "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
    "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"
  ];

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <section 
      className="relative min-h-screen overflow-visible flex items-center md:items-end py-8 md:pb-16"
      style={{ backgroundImage: `url(${backgroundNosotros})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container mx-auto px-2 sm:px-4 pb-4 md:pb-8 lg:pb-16 w-full">
        {/* Título Calendario - arriba en móvil/tablet */}
        <div className="flex justify-center md:justify-end lg:hidden mb-4">
          <img 
            src={calendarioTitulo} 
            alt="Calendario" 
            className="w-40 sm:w-56 h-auto object-contain"
          />
        </div>

        {/* Navegación del mes */}
        <div className="flex items-center justify-center md:justify-start gap-2 sm:gap-4 mb-3 sm:mb-4 max-w-5xl mx-auto md:mx-0">
          <button 
            onClick={goToPrevMonth}
            className="text-xl sm:text-2xl lg:text-4xl font-bold text-rayuela-orange hover:scale-110 transition-transform p-2"
            aria-label="Mes anterior"
          >
            ←
          </button>
          <h2 className="text-base sm:text-xl lg:text-3xl font-bold text-rayuela-pink uppercase text-center min-w-[140px] sm:min-w-[200px]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={goToNextMonth}
            className="text-xl sm:text-2xl lg:text-4xl font-bold text-rayuela-orange hover:scale-110 transition-transform p-2"
            aria-label="Mes siguiente"
          >
            →
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-0.5 sm:gap-1 lg:gap-2 mb-1 sm:mb-2 max-w-5xl mx-auto md:mx-0">
          {diasSemana.map((dia, index) => (
            <div 
              key={dia} 
              className="text-center text-[10px] sm:text-xs lg:text-base font-semibold py-1"
              style={{ 
                color: index === 2 ? "#F7A34A" : 
                       index === 3 ? "#F5A3C7" : 
                       index === 4 ? "#8BC4E8" : 
                       index === 5 ? "#F7A34A" : 
                       index === 6 ? "#F5A3C7" : "#8BC4E8"
              }}
            >
              <span className="hidden md:inline">{diasSemanaFull[index]}</span>
              <span className="md:hidden">{dia}</span>
            </div>
          ))}
        </div>

        {/* Grid del calendario dinámico */}
        <div className="relative max-w-5xl mx-auto md:mx-0">
          <div 
            className="grid grid-cols-7"
            style={{ 
              gap: 0,
              background: "linear-gradient(45deg, #F5A3C7 0%, #8BC4E8 50%, #F7A34A 100%)"
            }}
          >
            {days.map((dayInfo, index) => {
              const { day, isCurrentMonth } = dayInfo;
              const reservado = isReservado(day, isCurrentMonth);
              const color = getColor(index, 7, baseColors);
              
              return (
                <div
                  key={index}
                  className="aspect-square transition-transform hover:scale-105 sm:hover:scale-110 cursor-pointer hover:z-10 relative flex items-start justify-start p-0.5 sm:p-1 lg:p-2"
                  style={{ 
                    backgroundColor: color,
                    transform: `rotate(${rotations[index % rotations.length]}deg) scale(1.02)`,
                    transformOrigin: "center",
                    opacity: isCurrentMonth ? 1 : 0.4,
                  }}
                >
                  <span className={`relative z-10 font-bold text-[10px] sm:text-sm lg:text-lg drop-shadow-md ${isCurrentMonth ? 'text-white' : 'text-white/60'}`}>
                    {day}
                  </span>
                  {reservado && (
                    <img 
                      src={pinReservado} 
                      alt="Reservado" 
                      className="absolute inset-0 w-full h-full object-contain p-0.5 sm:p-1 lg:p-2"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Personaje rosa - solo desktop */}
          <div className="hidden lg:block absolute -right-32 bottom-0 w-96 z-10">
            <img 
              src={rosaCalendario} 
              alt="Ela - Mascota de Rayuela" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Título Calendario - solo desktop */}
          <div className="hidden lg:block absolute right-0 -bottom-4 w-96 z-20">
            <img 
              src={calendarioTitulo} 
              alt="Calendario" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Personaje rosa - móvil y tablet */}
        <div className="flex justify-center lg:hidden mt-4 sm:mt-6">
          <img 
            src={rosaCalendario} 
            alt="Ela - Mascota de Rayuela" 
            className="w-32 sm:w-48 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarioSection;
