import { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { CarouselApi } from "@/components/ui/carousel";
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const isManualChange = useRef(false);

  const handleImageChange = (index: number) => {
    if (index === selectedImage) return;
    isManualChange.current = true;
    setSelectedImage(index);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const goToPrevious = useCallback(() => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);
  // Auto-play effect
  useEffect(() => {
    if (images.length === 0 || lightboxOpen) return;
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length, lightboxOpen]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

  // Sync carousel position with selected image (only for autoplay, not manual clicks)
  useEffect(() => {
    if (carouselApi && images.length > 0 && !isManualChange.current) {
      carouselApi.scrollTo(selectedImage);
    } else if (isManualChange.current) {
      isManualChange.current = false;
    }
  }, [selectedImage, carouselApi, images.length]);

  // Preload next and previous images for smoother transitions
  useEffect(() => {
    if (images.length === 0) return;

    const preloadImage = (index: number) => {
      const img = new Image();
      img.src = images[index].url;
    };

    const nextIndex = (selectedImage + 1) % images.length;
    const prevIndex = selectedImage === 0 ? images.length - 1 : selectedImage - 1;

    preloadImage(nextIndex);
    preloadImage(prevIndex);
  }, [selectedImage, images]);
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
          <div className="hidden lg:block absolute left-0 bottom-0 z-30 float-animation-delayed mascotas-slide cursor-pointer">
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
            {/* Imagen principal con crossfade */}
            {loading ? (
              <div className="w-full h-[300px] md:h-[450px] bg-muted animate-pulse rounded-lg mb-4" />
            ) : images.length > 0 ? (
              <div
                className="relative rounded-lg overflow-hidden shadow-xl mb-4 h-[300px] md:h-[450px] cursor-pointer group"
                onClick={() => openLightbox(selectedImage)}
              >
                {/* Solo renderizar imagen actual y adyacentes para mejor rendimiento */}
                {images.map((image, index) => {
                  const isActive = selectedImage === index;
                  const isPrev = selectedImage === 0 ? index === images.length - 1 : index === selectedImage - 1;
                  const isNext = selectedImage === images.length - 1 ? index === 0 : index === selectedImage + 1;
                  const shouldRender = isActive || isPrev || isNext;

                  if (!shouldRender) return null;

                  return (
                    <img
                      key={index}
                      src={image.url}
                      alt={image.alt || `Foto ${index + 1}`}
                      loading="eager"
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        isActive
                          ? "opacity-100 z-10 group-hover:scale-105 transition-transform will-change-transform"
                          : "opacity-0 z-0 pointer-events-none"
                      }`}
                      style={{ willChange: isActive ? 'transform' : 'auto' }}
                    />
                  );
                })}
                {/* Overlay hint */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-20 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                    <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : null}
            {/* Thumbnails carousel */}
            {images.length > 0 && (
              <Carousel
                setApi={setCarouselApi}
                opts={{
                  align: "center",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2">
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="pl-2 basis-1/4 md:basis-1/6">
                      <button
                        onClick={() => handleImageChange(index)}
                        className={`relative w-full aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                          selectedImage === index
                            ? "ring-4 ring-[#F5A623] scale-105"
                            : "opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.alt || `Thumbnail ${index + 1}`}
                          loading="lazy"
                          decoding="async"
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
          className="w-32 h-auto float-animation cursor-pointer"
        />
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-50 text-white hover:text-rayuela-orange transition-colors p-2 hover:scale-110"
            aria-label="Cerrar"
          >
            <X size={32} />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-white bg-black/50 px-4 py-2 rounded-full text-sm font-bold">
            {lightboxIndex + 1} / {images.length}
          </div>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-rayuela-orange transition-colors p-3 hover:scale-110 bg-black/30 rounded-full"
            aria-label="Anterior"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-rayuela-orange transition-colors p-3 hover:scale-110 bg-black/30 rounded-full"
            aria-label="Siguiente"
          >
            <ChevronRight size={40} />
          </button>

          {/* Main Image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || `Foto ${lightboxIndex + 1}`}
              loading="eager"
              decoding="async"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Image Description */}
          {images[lightboxIndex].alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white bg-black/50 px-6 py-3 rounded-full text-sm max-w-2xl text-center">
              {images[lightboxIndex].alt}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
export default FotosSection;
