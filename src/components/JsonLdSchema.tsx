import { Helmet } from "react-helmet-async";
import { useEmpresa } from "@/contexts/EmpresaContext";

const JsonLdSchema = () => {
  const { empresaData } = useEmpresa();

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "@id": "https://rayuela.com.mx/#organization",
    name: "Rayuela",
    description:
      "Salón de fiestas infantiles y eventos creativos. El lugar donde tus sueños se hacen fiesta.",
    url: "https://rayuela.com.mx",
    telephone: empresaData?.telefono || "",
    email: empresaData?.contacto || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: empresaData?.direccion || "",
      addressCountry: "MX",
    },
    image: "https://rayuela.com.mx/og-image.jpg",
    logo: "https://rayuela.com.mx/favicon.png",
    sameAs: [
      empresaData?.facebook,
      empresaData?.instagram,
    ].filter(Boolean),
    priceRange: "$$",
    ...(empresaData?.horarios && {
      openingHoursSpecification: empresaData.horarios
        .filter((h) => h.cerrado !== 1 && h.hora)
        .map((h) => {
          const dayMap: Record<string, string[]> = {
            lunes: ["Monday"],
            martes: ["Tuesday"],
            "miércoles": ["Wednesday"],
            miercoles: ["Wednesday"],
            jueves: ["Thursday"],
            viernes: ["Friday"],
            "sábado": ["Saturday"],
            sabado: ["Saturday"],
            domingo: ["Sunday"],
            "lunes a viernes": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          };
          const days = dayMap[h.label.toLowerCase()] || [];
          const parts = h.hora.split(" - ");
          return days.map((day) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: day,
            opens: parts[0]?.trim() || "",
            closes: parts[1]?.trim() || "",
          }));
        })
        .flat(),
    }),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rayuela",
    url: "https://rayuela.com.mx",
    description: "Fiestas infantiles y eventos creativos en México",
    inLanguage: "es-MX",
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

export default JsonLdSchema;
