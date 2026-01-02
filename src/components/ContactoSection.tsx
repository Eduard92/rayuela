import contactoTitulo from "@/assets/contacto-titulo.png";
import mascotaVerdeDireccion from "@/assets/mascota-verde-direccion.png";
import telefonoTitulo from "@/assets/telefono-titulo.png";
import mascotaRosaPatines from "@/assets/mascota-rosa-patines.png";
import horariosTitulo from "@/assets/horarios-titulo.png";
import backgroundContacto from "@/assets/background-contacto.jpg";

const ContactoSection = () => {
  return (
    <section id="contacto" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundContacto})` }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Título CONTACTO */}
        <div className="flex justify-center mb-12">
          <img 
            src={contactoTitulo} 
            alt="Contacto" 
            className="w-64 md:w-80 h-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {/* Columna 1 - Dirección */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <img 
                src={mascotaVerdeDireccion} 
                alt="Mascota verde con dirección" 
                className="w-40 md:w-48 h-auto"
              />
            </div>
            <div className="text-center">
              <p className="text-[#4a4a4a] font-bold text-sm md:text-base uppercase tracking-wide">
                Terraza Pedregal
              </p>
              <p className="text-[#4a4a4a] font-bold text-sm md:text-base uppercase tracking-wide">
                Periferico Sur 4132
              </p>
              <p className="text-[#4a4a4a] font-bold text-sm md:text-base uppercase tracking-wide">
                Jardines el Pedregal CDMX
              </p>
            </div>
          </div>

          {/* Columna 2 - Teléfono */}
          <div className="flex flex-col items-center">
            <img 
              src={telefonoTitulo} 
              alt="Teléfono" 
              className="w-40 md:w-48 h-auto mb-2"
            />
            <a 
              href="tel:+525578426657" 
              className="text-[#6b9ac4] text-lg md:text-xl font-light tracking-wider hover:opacity-80 transition-opacity"
            >
              + 52 5578426657
            </a>
            <div className="mt-6 flex flex-col items-center">
              <div className="relative mb-2">
                <div className="bg-[#8b9a6b] px-6 py-2 transform -skew-x-3">
                  <span className="text-white text-lg md:text-xl font-medium tracking-wide skew-x-3 inline-block">
                    E-MAIL
                  </span>
                </div>
              </div>
              <a 
                href="mailto:contacto@rayuela.com.mx" 
                className="text-[#6b9ac4] text-base md:text-lg font-light tracking-wide hover:opacity-80 transition-opacity"
              >
                contacto@rayuela.com.mx
              </a>
            </div>
          </div>

          {/* Columna 3 - Mascota rosa */}
          <div className="flex flex-col items-center">
            <img 
              src={mascotaRosaPatines} 
              alt="Mascota rosa con patines" 
              className="w-40 md:w-56 h-auto"
            />
          </div>

          {/* Columna 4 - Horarios */}
          <div className="flex flex-col items-center">
            <img 
              src={horariosTitulo} 
              alt="Horarios" 
              className="w-36 md:w-44 h-auto mb-4"
            />
            <div className="text-center space-y-1">
              <div className="flex gap-3 justify-center">
                <span className="text-[#4a4a4a] font-medium text-sm md:text-base">LUN - VIE</span>
                <span className="text-[#4a4a4a] font-light text-sm md:text-base">11:00 AM - 7 PM</span>
              </div>
              <div className="flex gap-3 justify-center">
                <span className="text-[#4a4a4a] font-medium text-sm md:text-base">SABADO</span>
                <span className="text-[#4a4a4a] font-light text-sm md:text-base">11:00 AM - 8 PM</span>
              </div>
              <div className="flex gap-3 justify-center">
                <span className="text-[#4a4a4a] font-medium text-sm md:text-base">DOMINGO</span>
                <span className="text-[#e74c3c] font-light text-sm md:text-base">CERRADO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
