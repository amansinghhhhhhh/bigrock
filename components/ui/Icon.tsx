interface IconProps {
  name: string;
  className?: string;
  fill?: boolean;
}

export default function Icon({ name, className = "ico", fill = false }: IconProps) {
  return (
    <svg
      className={fill ? `${className} ico-fill` : className}
      aria-hidden="true"
    >
      <use href={`#i-${name}`} />
    </svg>
  );
}
