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

  const diasSemana = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  
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
      className="relative min-h-screen overflow-visible flex items-end pb-16"
      style={{ backgroundImage: `url(${backgroundNosotros})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container mx-auto px-4 pb-8 lg:pb-16">
        {/* Navegación del mes */}
        <div className="flex items-center justify-start gap-4 mb-4 max-w-5xl">
          <button 
            onClick={goToPrevMonth}
            className="text-2xl lg:text-4xl font-bold text-rayuela-orange hover:scale-110 transition-transform"
          >
            ←
          </button>
          <h2 className="text-xl lg:text-3xl font-bold text-rayuela-pink uppercase">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={goToNextMonth}
            className="text-2xl lg:text-4xl font-bold text-rayuela-orange hover:scale-110 transition-transform"
          >
            →
          </button>
        </div>

        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-2 max-w-5xl">
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

        {/* Grid del calendario dinámico */}
        <div className="relative">
          <div 
            className="grid grid-cols-7 max-w-5xl"
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
                  className="aspect-square transition-transform hover:scale-110 cursor-pointer hover:z-10 relative flex items-center justify-center"
                  style={{ 
                    backgroundColor: color,
                    transform: `rotate(${rotations[index % rotations.length]}deg) scale(1.02)`,
                    transformOrigin: "center",
                    opacity: isCurrentMonth ? 1 : 0.4,
                  }}
                >
                  <span className={`font-bold text-lg lg:text-2xl drop-shadow-md ${isCurrentMonth ? 'text-white' : 'text-white/60'}`}>
                    {day}
                  </span>
                  {reservado && (
                    <img 
                      src={pinReservado} 
                      alt="Reservado" 
                      className="absolute inset-0 w-full h-full object-contain p-1 lg:p-2"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Personaje rosa posicionado a la derecha */}
          <div className="absolute -right-8 lg:-right-28 bottom-0 w-40 lg:w-80 z-10">
            <img 
              src={rosaCalendario} 
              alt="Ela - Mascota de Rayuela" 
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Título Calendario */}
          <div className="absolute right-4 lg:right-0 -bottom-2 lg:-bottom-4 w-56 lg:w-96 z-20">
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
