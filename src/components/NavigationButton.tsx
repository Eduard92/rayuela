import { Link } from "react-router-dom";

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
  return (
    <Link
      to={to}
      className={`nav-button block ${animationClass} ${className}`}
    >
      <img
        src={image}
        alt={alt}
        className="w-full h-auto object-contain max-w-[180px] md:max-w-[220px] lg:max-w-[260px]"
        loading="lazy"
      />
    </Link>
  );
};

export default NavigationButton;
