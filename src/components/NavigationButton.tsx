type HoverEffect = 'scale' | 'rotate' | 'shake' | 'pulse' | 'bounce' | 'tilt';
interface NavigationButtonProps {
  to: string;
  image: string;
  alt: string;
  className?: string;
  animationClass?: string;
  hoverEffect?: HoverEffect;
  priority?: boolean;
  width?: number;
  height?: number;
  fetchPriority?: 'high' | 'low' | 'auto';
}
const NavigationButton = ({
  to,
  image,
  alt,
  className = "",
  animationClass = "",
  hoverEffect = 'scale',
  priority = false,
  width,
  height,
  fetchPriority,
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
      className={`nav-button block overflow-visible ${animationClass} ${className} cursor-pointer`}
    >
      <img
        src={image}
        alt={alt}
        width={width}
        height={height}
        className={`nav-button-image w-full h-auto object-contain hover-${hoverEffect}`}
        loading={priority ? "eager" : "lazy"}
        {...(priority ? { fetchPriority: fetchPriority || "high" } : {})}
      />
    </button>
  );
};
export default NavigationButton;