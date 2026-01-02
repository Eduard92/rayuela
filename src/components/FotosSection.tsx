import { useState } from "react";
import fotosTitulo from "@/assets/fotos-titulo.png";
import backgroundFotos from "@/assets/background-fotos.png";
import mascotaVerde from "@/assets/mascota-verde-globo.png";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const galleryImages = [
  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&q=80",
  "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80",
  "https://images.unsplash.com/photo-1502781252888-9143ba7f074e?w=800&q=80",
  "https://images.unsplash.com/photo-1496843916299-590492c751f4?w=800&q=80",
];

const FotosSection = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section id="fotos" className="relative py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Mascota verde a la izquierda */}
          <div className="hidden lg:block absolute left-0 -bottom-12 z-30">
            <img 
              src={mascotaVerde} 
              alt="Mascota verde con globo" 
              className="w-96 xl:w-[28rem] h-auto"
            />
          </div>

          {/* Contenedor principal de la galería */}
          <div className="relative w-full max-w-4xl mx-auto lg:ml-48 xl:ml-64">
            {/* Título FOTOS */}
            <div className="absolute -top-12 -right-16 md:-right-32 z-20">
              <img 
                src={fotosTitulo} 
                alt="Fotos" 
                className="w-56 md:w-80 h-auto"
              />
            </div>

            {/* Imagen principal */}
            <div className="relative rounded-lg overflow-hidden shadow-xl mb-4">
              <img 
                src={galleryImages[selectedImage]} 
                alt={`Foto ${selectedImage + 1}`}
                className="w-full h-[300px] md:h-[450px] object-cover transition-all duration-300"
              />
            </div>

            {/* Thumbnails carousel */}
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index} className="pl-2 basis-1/4 md:basis-1/6">
                    <button
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-full aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                        selectedImage === index 
                          ? "ring-4 ring-[#F5A623] scale-105" 
                          : "opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex -left-12" />
              <CarouselNext className="hidden md:flex -right-12" />
            </Carousel>
          </div>
        </div>
      </div>

      {/* Background wave pattern at bottom */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-repeat-x bg-bottom"
        style={{
          backgroundImage: `url(${backgroundFotos})`,
          backgroundSize: "auto 100%",
        }}
      />

      {/* Mascota móvil */}
      <div className="lg:hidden flex justify-center mt-8">
        <img 
          src={mascotaVerde} 
          alt="Mascota verde con globo" 
          className="w-32 h-auto"
        />
      </div>
    </section>
  );
};

export default FotosSection;
