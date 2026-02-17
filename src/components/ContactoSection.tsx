import contactoTitulo from "@/assets/contacto-titulo.png";
import mascotaVerdeDireccion from "@/assets/mascota-verde-direccion.png";
import telefonoTitulo from "@/assets/telefono-titulo.png";
import mascotaRosaPatines from "@/assets/mascota-rosa-patines.png";
import horariosTitulo from "@/assets/horarios-titulo.png";
import backgroundContacto from "@/assets/background-contacto.jpg";
import mapaImage from "@/assets/mapa.png";
import { useEmpresa } from "@/contexts/EmpresaContext";
const ContactoSection = () => {
  const { empresaData } = useEmpresa();
  return (
    <section id="contacto" className="relative py-4 md:py-18 overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundContacto})` }}
      />
      <div className="container mx-auto px-4 relative z-10">
        {/* Título CONTACTO */}
        <div className="flex justify-center mb-5">
          <img
            src={contactoTitulo}
            alt="Contacto"
            className="w-80 md:w-[28rem] h-auto cursor-pointer hover-buzz transition-all duration-300"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          {/* Columna 1 - Dirección */}
          <div className="flex flex-col items-center self-start">
            <div className="relative mb-4 -mt-12 md:-mt-28">
              <img
                src={mascotaVerdeDireccion}
                alt="Mascota verde con dirección"
                className="w-64 max-w-[16rem] md:w-96 md:max-w-none h-auto float-animation cursor-pointer"
              />
            </div>
            {empresaData?.direccion && empresaData?.maps && (
              <a
                href={empresaData.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center transition-all duration-300 hover:scale-105 hover:brightness-110"
              >
                <p className="text-[#769fbc] font-black text-base md:text-lg uppercase tracking-wide whitespace-pre-line">
                  {empresaData.direccion}
                </p>
              </a>
            )}
            {/* Mapa debajo de la dirección */}
            {empresaData?.maps && (
              <a
                href={empresaData.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 transition-all duration-300 hover:scale-105"
              >
                <img
                  src={mapaImage}
                  alt="Mapa de ubicación Terraza Pedregal"
                  className="w-64 md:w-80 h-auto rounded-lg shadow-md"
                />
              </a>
            )}
          </div>
          {/* Columna 2 - Teléfono */}
          <div className="flex flex-col items-center">
            {empresaData?.telefono && (
              <>
                <img
                  src={telefonoTitulo}
                  alt="Teléfono"
                  className="w-64 md:w-80 h-auto mb-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 hover:drop-shadow-lg"
                />
                <a
                  href={`tel+:${empresaData.telefono}`}
                  className="text-[#6b9ac4] text-xl md:text-2xl font-black tracking-wider transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg"
                >
                  {empresaData.telefono}
                </a>
              </>
            )}
            {empresaData?.contacto && (
              <div className="mt-6 flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="bg-[#8b9a6b] px-10 py-4 transform -skew-x-3 transition-all duration-300 hover:scale-105 hover:brightness-110 cursor-pointer">
                    <span className="text-white text-2xl md:text-3xl font-black tracking-wide skew-x-3 inline-block">
                      E-MAIL
                    </span>
                  </div>
                </div>
                <a
                  href={`mailto:${empresaData.contacto}`}
                  className="text-[#6b9ac4] text-lg md:text-xl font-black tracking-wide transition-all duration-300 hover:scale-110 hover:brightness-110 hover:drop-shadow-lg"
                >
                  {empresaData.contacto}
                </a>
              </div>
            )}
          </div>
          {/* Columna 3 - Mascota rosa */}
          <div className="flex flex-col items-center">
            <img
              src={mascotaRosaPatines}
              alt="Mascota rosa con patines"
              className="w-44 md:w-80 h-auto float-animation-delayed cursor-pointer"
            />
          </div>
          {/* Columna 4 - Horarios */}
          <div className="flex flex-col items-center">
            {empresaData?.horarios && empresaData.horarios.length > 0 && (
              <>
                <img
                  src={horariosTitulo}
                  alt="Horarios"
                  className="w-64 md:w-72 h-auto mb-4 cursor-pointer transition-all duration-300 hover:scale-105 hover:brightness-110 hover:drop-shadow-lg"
                />
                <div className="text-center space-y-2">
                  {empresaData.horarios.map((horario, index) => (
                    <div key={index} className="flex gap-4 justify-center transition-all duration-300 hover:scale-105 hover:brightness-110 cursor-pointer">
                      <span className="text-[#6bc4c8] font-black text-base md:text-lg">
                        {horario.label.toUpperCase()}
                      </span>
                      <span className={`font-black text-base md:text-lg ${
                        horario.cerrado == 1 ? 'text-[#e74c3c]' : 'text-[#6bc4c8]'
                      }`}>
                        {horario.cerrado == 1 || horario.hora ==''? 'CERRADO' : horario.hora}
                      </span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactoSection;
