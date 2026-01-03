import contactoTitulo from "@/assets/contacto-titulo.png";
import mascotaVerdeDireccion from "@/assets/mascota-verde-direccion.png";
import telefonoTitulo from "@/assets/telefono-titulo.png";
import mascotaRosaPatines from "@/assets/mascota-rosa-patines.png";
import horariosTitulo from "@/assets/horarios-titulo.png";
import backgroundContacto from "@/assets/background-contacto.jpg";
import mapaImage from "@/assets/mapa.png";

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {/* Columna 1 - Dirección */}
          <div className="flex flex-col items-center self-start">
            <div className="relative mb-4 -mt-28">
              <img 
                src={mascotaVerdeDireccion} 
                alt="Mascota verde con dirección" 
                className="w-80 md:w-96 h-auto"
              />
            </div>
            <a 
              href="https://maps.app.goo.gl/iSKcbi8bHu61NUUU7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center hover:opacity-80 transition-opacity"
            >
              <p className="text-[#769fbc] font-semibold text-base md:text-lg uppercase tracking-wide">
                Terraza Pedregal
              </p>
              <p className="text-[#769fbc] font-semibold text-base md:text-lg uppercase tracking-wide">
                Periferico Sur 4132
              </p>
              <p className="text-[#769fbc] font-semibold text-base md:text-lg uppercase tracking-wide">
                Jardines el Pedregal CDMX
              </p>
            </a>
            {/* Mapa debajo de la dirección */}
            <a 
              href="https://maps.app.goo.gl/iSKcbi8bHu61NUUU7" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 hover:opacity-80 transition-opacity"
            >
              <img 
                src={mapaImage} 
                alt="Mapa de ubicación Terraza Pedregal" 
                className="w-64 md:w-80 h-auto rounded-lg shadow-md"
              />
            </a>
          </div>

          {/* Columna 2 - Teléfono */}
          <div className="flex flex-col items-center">
            <img 
              src={telefonoTitulo} 
              alt="Teléfono" 
              className="w-64 md:w-80 h-auto mb-2"
            />
            <a 
              href="tel:+525578426657" 
              className="text-[#6b9ac4] text-xl md:text-2xl font-light tracking-wider hover:opacity-80 transition-opacity"
            >
              + 52 5578426657
            </a>
            <div className="mt-6 flex flex-col items-center">
              <div className="relative mb-2">
                <div className="bg-[#8b9a6b] px-10 py-4 transform -skew-x-3">
                  <span className="text-white text-2xl md:text-3xl font-medium tracking-wide skew-x-3 inline-block">
                    E-MAIL
                  </span>
                </div>
              </div>
              <a 
                href="mailto:contacto@rayuela.com.mx" 
                className="text-[#6b9ac4] text-lg md:text-xl font-light tracking-wide hover:opacity-80 transition-opacity"
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
              className="w-64 md:w-80 h-auto"
            />
          </div>

          {/* Columna 4 - Horarios */}
          <div className="flex flex-col items-center">
            <img 
              src={horariosTitulo} 
              alt="Horarios" 
              className="w-64 md:w-72 h-auto mb-4"
            />
            <div className="text-center space-y-2">
              <div className="flex gap-4 justify-center">
                <span className="text-[#4a4a4a] font-medium text-base md:text-lg">
                  <span className="md:hidden">L-V</span>
                  <span className="hidden md:inline">LUN - VIE</span>
                </span>
                <span className="text-[#4a4a4a] font-light text-base md:text-lg">11:00 AM - 7 PM</span>
              </div>
              <div className="flex gap-4 justify-center">
                <span className="text-[#4a4a4a] font-medium text-base md:text-lg">
                  <span className="md:hidden">SAB</span>
                  <span className="hidden md:inline">SABADO</span>
                </span>
                <span className="text-[#4a4a4a] font-light text-base md:text-lg">11:00 AM - 8 PM</span>
              </div>
              <div className="flex gap-4 justify-center">
                <span className="text-[#4a4a4a] font-medium text-base md:text-lg">
                  <span className="md:hidden">DOM</span>
                  <span className="hidden md:inline">DOMINGO</span>
                </span>
                <span className="text-[#e74c3c] font-light text-base md:text-lg">CERRADO</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
