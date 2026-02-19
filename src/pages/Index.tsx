import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NosotrosSection from "@/components/NosotrosSection";
import CalendarioSection from "@/components/CalendarioSection";
import PaquetesSection from "@/components/PaquetesSection";
import FotosSection from "@/components/FotosSection";
import CotizaSection from "@/components/CotizaSection";
import ContactoSection from "@/components/ContactoSection";
import AudioPlayer from "@/components/AudioPlayer";
import WhatsAppButton from "@/components/WhatsAppButton";
import SectionReveal from "@/components/SectionReveal";
import { useEmpresaData } from "@/hooks/useEmpresaData";
import { EmpresaProvider } from "@/contexts/EmpresaContext";
import logo from "@/assets/rayuela-logo.png";

const Index = () => {
  const { data, isLoading, error } = useEmpresaData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8">
        <img
          src={logo}
          alt="Rayuela"
          className="w-48 md:w-64 h-auto animate-pulse"
        />
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#769fbc]/30 border-t-[#769fbc] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error al cargar datos de la empresa:", error);
  }

  const empresaData = data?.data;

  return (
    <EmpresaProvider
      empresaData={empresaData}
      isLoading={isLoading}
      error={error}
    >
      <Helmet>
        <title>Rayuela - Fiestas Infantiles y Eventos Creativos</title>
        <meta
          name="description"
          content="Rayuela organiza fiestas infantiles únicas y eventos creativos llenos de color, diversión y magia. Conoce nuestros paquetes y cotiza tu evento especial."
        />
        <meta
          name="keywords"
          content="fiestas infantiles, eventos creativos, decoración de fiestas, animación infantil, paquetes de fiestas"
        />
        <link rel="canonical" href="https://rayuela.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <AudioPlayer />
        <WhatsAppButton />
        <main>
          <HeroSection />
          <SectionReveal direction="left">
            <NosotrosSection />
          </SectionReveal>
          <SectionReveal direction="up">
            <CalendarioSection />
          </SectionReveal>
          <SectionReveal direction="right">
            <PaquetesSection />
          </SectionReveal>
          <SectionReveal direction="up">
            <CotizaSection />
          </SectionReveal>
          <SectionReveal direction="left">
            <FotosSection />
          </SectionReveal>
          <SectionReveal direction="up">
            <ContactoSection />
          </SectionReveal>
        </main>
      </div>
    </EmpresaProvider>
  );
};

export default Index;
