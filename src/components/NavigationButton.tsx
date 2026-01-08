type HoverEffect = 'scale' | 'rotate' | 'shake' | 'pulse' | 'bounce' | 'tilt';

interface NavigationButtonProps {
  to: string;
  image: string;
  alt: string;
  className?: string;
  animationClass?: string;
  hoverEffect?: HoverEffect;
}

const hoverEffectClasses: Record<HoverEffect, string> = {
  scale: 'hover:scale-110',
  rotate: 'hover:rotate-3',
  shake: 'hover:animate-[wiggle_0.3s_ease-in-out]',
  pulse: 'hover:animate-[pulse_0.5s_ease-in-out]',
  bounce: 'hover:-translate-y-2',
  tilt: 'hover:rotate-[-3deg] hover:scale-105',
};

const NavigationButton = ({
  to,
  image,
  alt,
  className = "",
  animationClass = "",
  hoverEffect = 'scale',
}: NavigationButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const element = document.querySelector(to);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`nav-button block ${animationClass} ${className} cursor-pointer transition-transform duration-300 ${hoverEffectClasses[hoverEffect]}`}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-auto object-contain"
        loading="lazy"
      />
    </button>
  );
};

export default NavigationButton;
