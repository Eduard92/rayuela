import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SectionReveal from "@/components/SectionReveal";
import JsonLdSchema from "@/components/JsonLdSchema";
import AudioPlayer from "@/components/AudioPlayer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEmpresaData } from "@/hooks/useEmpresaData";
import { EmpresaProvider } from "@/contexts/EmpresaContext";
import logo from "@/assets/rayuela-logo.png";

const NosotrosSection = lazy(() => import("@/components/NosotrosSection"));
const CalendarioSection = lazy(() => import("@/components/CalendarioSection"));
const PaquetesSection = lazy(() => import("@/components/PaquetesSection"));
const FotosSection = lazy(() => import("@/components/FotosSection"));
const CotizaSection = lazy(() => import("@/components/CotizaSection"));
const ContactoSection = lazy(() => import("@/components/ContactoSection"));
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
        <title>Rayuela - Fiestas Infantiles y Eventos Creativos en CDMX</title>
        <meta
          name="description"
          content="Rayuela organiza fiestas infantiles únicas y eventos creativos llenos de color, diversión y magia. Conoce nuestros paquetes, cotiza tu evento y reserva tu fecha."
        />
        <meta
          name="keywords"
          content="fiestas infantiles cdmx, salón de fiestas infantiles, eventos creativos para niños, paquetes de fiestas infantiles, animación infantil, decoración de fiestas, Rayuela fiestas"
        />
        <link rel="canonical" href="https://rayuela.com.mx/home" />
        <meta property="og:url" content="https://rayuela.com.mx/home" />
      </Helmet>
      <JsonLdSchema />
      <div className="min-h-screen bg-background">
        <Header />
        <AudioPlayer />
        <WhatsAppButton />
        <main>
          <HeroSection />
          <Suspense fallback={null}>
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
          </Suspense>
          <footer className="bg-white/90 py-6 text-center text-sm text-gray-500">
            <p>
              &copy; {new Date().getFullYear()} Rayuela. Todos los derechos reservados.
            </p>
          </footer>
        </main>
      </div>
    </EmpresaProvider>
  );
};
export default Index;
