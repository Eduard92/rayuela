import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import NosotrosSection from "@/components/NosotrosSection";
import CalendarioSection from "@/components/CalendarioSection";
import PaquetesSection from "@/components/PaquetesSection";
import FotosSection from "@/components/FotosSection";
import CotizaSection from "@/components/CotizaSection";
const Index = () => {
  return (
    <>
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
        <main>
          <HeroSection />
          <NosotrosSection />
          <CalendarioSection />
          <PaquetesSection />
          <FotosSection />
          <CotizaSection />
        </main>
      </div>
    </>
  );
};

export default Index;
