interface NavigationButtonProps {
  to: string;
  image: string;
  alt: string;
  className?: string;
  animationClass?: string;
}

const NavigationButton = ({
  to,
  image,
  alt,
  className = "",
  animationClass = "",
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
      className={`nav-button block ${animationClass} ${className} cursor-pointer`}
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
