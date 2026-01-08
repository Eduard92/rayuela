import { useState, useEffect } from "react";
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

interface GalleryImage {
  url: string;
  alt: string;
  sort_order: number;
}

const FotosSection = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("https://rayuela.com.mx/slider/1/photos");
        const data = await response.json();
        if (data.ok && data.images) {
          setImages(data.images.sort((a: GalleryImage, b: GalleryImage) => a.sort_order - b.sort_order));
        }
      } catch (error) {
        console.error("Error fetching gallery images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <section id="fotos" className="relative py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-8">
          {/* Mascota verde a la izquierda */}
          <div className="hidden lg:block absolute left-0 bottom-0 z-30">
            <img 
              src={mascotaVerde} 
              alt="Mascota verde con globo" 
              className="w-96 xl:w-[30rem] h-auto"
            />
          </div>

          {/* Contenedor principal de la galería */}
          <div className="relative w-full max-w-4xl mx-auto lg:ml-48 xl:ml-64">
            {/* Título FOTOS */}
            <div className="absolute -top-12 right-0 md:-right-32 z-20">
              <img 
                src={fotosTitulo} 
                alt="Fotos" 
                className="w-40 md:w-80 h-auto"
              />
            </div>

            {/* Imagen principal */}
            {loading ? (
              <div className="w-full h-[300px] md:h-[450px] bg-muted animate-pulse rounded-lg mb-4" />
            ) : images.length > 0 ? (
              <div className="relative rounded-lg overflow-hidden shadow-xl mb-4">
                <img 
                  src={images[selectedImage]?.url} 
                  alt={images[selectedImage]?.alt || `Foto ${selectedImage + 1}`}
                  className="w-full h-[300px] md:h-[450px] object-cover transition-all duration-300"
                />
              </div>
            ) : null}

            {/* Thumbnails carousel */}
            {images.length > 0 && (
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2">
                  {images.map((image, index) => (
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
                          src={image.url} 
                          alt={image.alt || `Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
              </Carousel>
            )}
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
