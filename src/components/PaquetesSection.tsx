import backgroundPattern from "@/assets/background-pattern.jpg";
import paquetesEncabezado from "@/assets/paquetes-encabezado.png";
import mascotaVerde from "@/assets/mascota-verde-pastel.png";
import mascotaRosa from "@/assets/mascota-rosa-globo.png";
import quieresMas from "@/assets/quieres-mas.png";
import cotizaAqui from "@/assets/cotiza.png";

const PaquetesSection = () => {
  const paqueteItems = {
    columna1: [
      "Uso de todas las áreas",
      "Menú de adulto (a elegir)",
      "Menú de niños (a elegir)",
      { text: "Mesa de botanas", detail: "(crudités, papas y chicharrones de carrito)" },
      "Ensalada (a elegir)",
    ],
    columna2: [
      { text: "Pastel personalizado", detail: "(sabores a elegir: vainilla o chocolate. Relleno: nutella o mermelada de fresa)" },
      "Aguas de sabor y refresco",
      "Café Americano",
      "Piñata personalizada",
      "Pinta caritas (1hr)",
    ],
    columna3: [
      "Personal de staff",
      "Meseros",
      "Invitación digital",
      "Música de ambientación",
      "Sanitización, limpieza y desinfección del lugar",
    ],
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundPattern})`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 lg:py-16">
        
        {/* Main Container with Characters */}
        <div className="w-full max-w-7xl flex items-center justify-center relative">
          
          {/* Left Character - Hidden on mobile */}
          <div className="hidden lg:block absolute -left-8 xl:-left-16 bottom-0 w-72 xl:w-96 z-20">
            <img 
              src={mascotaVerde} 
              alt="Mascota verde con pastel" 
              className="w-full h-auto object-contain float-animation"
            />
          </div>

          {/* Center Content */}
          <div className="w-full lg:max-w-3xl xl:max-w-4xl flex flex-col items-center">
            
            {/* Title Image */}
            <div className="mb-6 lg:mb-8">
              <img 
                src={paquetesEncabezado} 
                alt="Paquete Rayuela Mágica" 
                className="w-64 sm:w-80 md:w-96 lg:w-[450px] h-auto object-contain"
              />
            </div>

            {/* Description */}
            <p className="text-center text-base sm:text-lg md:text-xl text-[#e8a0b5] mb-8 lg:mb-10 max-w-2xl leading-relaxed px-4">
              En Rayuela hemos creado un paquete que combina diversión, creatividad y magia.
              <br />
              Aquí encontrarás todo lo necesario para celebrar en grande.
            </p>

            {/* Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full px-4 lg:px-8">
              
              {/* Column 1 */}
              <div className="space-y-2">
                {paqueteItems.columna1.map((item, index) => (
                  <div key={index} className="text-sm sm:text-base md:text-lg">
                    {typeof item === 'string' ? (
                      <p className="text-[#6bc4c8]">{item}</p>
                    ) : (
                      <p className="text-[#6bc4c8]">
                        {item.text} <span className="text-[#e8a0b5] text-xs sm:text-sm">{item.detail}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 2 */}
              <div className="space-y-2">
                {paqueteItems.columna2.map((item, index) => (
                  <div key={index} className="text-sm sm:text-base md:text-lg">
                    {typeof item === 'string' ? (
                      <p className="text-[#e8a0b5]">{item}</p>
                    ) : (
                      <p className="text-[#d4a849]">
                        {item.text} <span className="text-[#e8a0b5] text-xs sm:text-sm">{item.detail}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Column 3 */}
              <div className="space-y-2">
                {paqueteItems.columna3.map((item, index) => (
                  <p key={index} className="text-sm sm:text-base md:text-lg text-[#e8855e]">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 lg:mt-12">
              <img 
                src={quieresMas} 
                alt="¿Quieres más?" 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
              />
              <img 
                src={cotizaAqui} 
                alt="Cotiza aquí" 
                className="h-12 sm:h-14 md:h-16 w-auto object-contain cursor-pointer hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* Right Character - Hidden on mobile */}
          <div className="hidden lg:block absolute -right-8 xl:-right-16 bottom-0 w-64 xl:w-80 z-20">
            <img 
              src={mascotaRosa} 
              alt="Mascota rosa con globo" 
              className="w-full h-auto object-contain float-animation-delayed"
            />
          </div>
        </div>

        {/* Mobile Characters */}
        <div className="flex lg:hidden justify-between w-full max-w-md mt-8 px-4">
          <img 
            src={mascotaVerde} 
            alt="Mascota verde con pastel" 
            className="w-28 sm:w-36 h-auto object-contain float-animation"
          />
          <img 
            src={mascotaRosa} 
            alt="Mascota rosa con globo" 
            className="w-24 sm:w-32 h-auto object-contain float-animation-delayed"
          />
        </div>
      </div>
    </section>
  );
};

export default PaquetesSection;
