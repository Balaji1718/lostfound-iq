import { HTMLAttributes } from "react";

interface LogoPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
}

export function LogoPlaceholder({ size = "md", className = "", ...props }: LogoPlaceholderProps) {
  const sizeClasses = {
    sm: "h-7 text-sm gap-1.5",
    md: "h-9 text-base gap-2.5",
    lg: "h-12 text-xl gap-3",
  };

  const logoSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div
      className={`inline-flex items-center font-semibold tracking-tight text-current ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <img
        src="/logo.png"
        alt="FindBack Logo"
        loading="eager"
        className={`${logoSizes[size]} object-contain`}
      />
      <span className="font-bold">FindBack</span>
    </div>
  );
}
