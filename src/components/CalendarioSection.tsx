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
  const [showConfetti, setShowConfetti] = useState(false);
  const diasSemana = ["DOMINGO", "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO"];
  const diasSemanaCortos = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  // Colores del grid sin colores iguales adyacentes - Paleta oficial Rayuela
  const baseColors = ["#FEBAED", "#76B3D0", "#FF6C1F", "#AEA434","#FDB52A"];
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
        const response = await fetch(`https://admin.rayuela.com.mx/getReservas/${year}/${month}`);
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
      id="calendario"
      className="relative py-4 md:py-18 min-h-screen overflow-hidden flex items-end pb-16"
      style={{ backgroundImage: `url(${backgroundNosotros})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container mx-auto px-4 pb-8 lg:pb-16">
        {/* Título Calendario - arriba en móvil, antes del mes */}
        <div className="flex justify-end lg:hidden mb-4">
          <img 
            src={calendarioTitulo} 
            alt="Calendario" 
            className="w-56 h-auto object-contain"
          />
        </div>
        {/* Navegación del mes */}
        <div className="flex items-center justify-center lg:justify-start gap-4 mb-4 w-full lg:w-[60%]">
          <button 
            onClick={goToPrevMonth}
            className="text-2xl lg:text-4xl font-black text-rayuela-orange hover:scale-110 transition-transform"
          >
            ←
          </button>
          <h2 className="text-xl lg:text-3xl font-black text-rayuela-blue uppercase">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <button 
            onClick={goToNextMonth}
            className="text-2xl lg:text-4xl font-black text-rayuela-orange hover:scale-110 transition-transform"
          >
            →
          </button>
        </div>
        {/* Días de la semana */}
        <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-2 w-full lg:w-[60%]">
          {diasSemana.map((dia, index) => (
            <div 
              key={dia} 
              className="text-center text-xs lg:text-base font-black"
              style={{
                color: index === 0 ? "#AEA434" :
                       index === 1 ? "#FF6C1F" :
                       index === 2 ? "#FEBAED" :
                       index === 3 ? "#FDB52A" :
                       index === 4 ? "#76B3D0" :
                       index === 5 ? "#AEA434" :
                       index === 6 ? "#FF6C1F" : "#FEBAED"
              }}
            >
              <span className="hidden lg:inline">{dia}</span>
              <span className="lg:hidden">{diasSemanaCortos[index]}</span>
            </div>
          ))}
        </div>
        {/* Grid del calendario dinámico */}
        <div className="relative w-full lg:w-[60%]">
          <div 
            className="grid grid-cols-7 w-full"
            style={{
              gap: 0,
              background: "linear-gradient(45deg, #FEBAED 0%, #76B3D0 50%, #FF6C1F 100%)"
            }}
          >
            {days.map((dayInfo, index) => {
              const { day, isCurrentMonth } = dayInfo;
              const reservado = isReservado(day, isCurrentMonth);
              const color = getColor(index, 7, baseColors);
              return (
                <div
                  key={index}
                  className="aspect-square transition-transform hover:scale-110 cursor-pointer hover:z-10 relative flex items-start justify-start p-1 lg:p-2"
                  style={{ 
                    backgroundColor: color,
                    transform: `rotate(${rotations[index % rotations.length]}deg) scale(1.02)`,
                    transformOrigin: "center",
                    opacity: isCurrentMonth ? 1 : 0.4,
                  }}
                >
                  <span className={`relative z-10 font-bold text-sm lg:text-lg drop-shadow-md ${isCurrentMonth ? 'text-white' : 'text-white/60'}`}>
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
          {/* Personaje rosa - a la derecha del calendario en desktop */}
          <div
            className="hidden lg:block absolute -right-[55%] -bottom-8 w-[52%] z-10"
            onMouseEnter={() => setShowConfetti(true)}
            onMouseLeave={() => setShowConfetti(false)}
          >
            <img
              src={rosaCalendario}
              alt="Ela - Mascota de Rayuela"
              className="w-full h-auto object-contain cursor-pointer transition-transform hover:scale-105"
            />
            {/* Confeti */}
            {showConfetti && (
              <div className="absolute inset-0 pointer-events-none overflow-visible">
                {[...Array(30)].map((_, i) => {
                  const angle = (Math.random() * 360) * (Math.PI / 180);
                  const distance = 150 + Math.random() * 200;
                  const tx = Math.cos(angle) * distance;
                  const ty = Math.sin(angle) * distance - Math.random() * 100;
                  return (
                    <div
                      key={i}
                      className="absolute animate-confetti-explode"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: '14px',
                        height: '14px',
                        backgroundColor: baseColors[i % baseColors.length],
                        animationDelay: `${Math.random() * 0.2}s`,
                        animationDuration: `${1.2 + Math.random() * 0.8}s`,
                        '--tx': `${tx}px`,
                        '--ty': `${ty}px`,
                      } as React.CSSProperties}
                    />
                  );
                })}
              </div>
            )}
          </div>
          {/* Título Calendario - solo desktop */}
          <div className="hidden lg:block absolute -right-[48%] -bottom-12 w-[50%] z-20">
            <img 
              src={calendarioTitulo} 
              alt="Calendario" 
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
        {/* Personaje rosa - debajo del calendario solo en móvil */}
        <div
          className="flex justify-center lg:hidden mt-4 relative"
          onMouseEnter={() => setShowConfetti(true)}
          onMouseLeave={() => setShowConfetti(false)}
        >
          <img
            src={rosaCalendario}
            alt="Ela - Mascota de Rayuela"
            className="w-48 h-auto object-contain cursor-pointer transition-transform hover:scale-105"
          />
          {/* Confeti */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              {[...Array(25)].map((_, i) => {
                const angle = (Math.random() * 360) * (Math.PI / 180);
                const distance = 100 + Math.random() * 150;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance - Math.random() * 80;
                return (
                  <div
                    key={i}
                    className="absolute animate-confetti-explode"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: '12px',
                      height: '12px',
                      backgroundColor: baseColors[i % baseColors.length],
                      animationDelay: `${Math.random() * 0.2}s`,
                      animationDuration: `${1.2 + Math.random() * 0.8}s`,
                      '--tx': `${tx}px`,
                      '--ty': `${ty}px`,
                    } as React.CSSProperties}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
export default CalendarioSection;