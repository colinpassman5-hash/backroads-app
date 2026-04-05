import Image from "next/image";

type CobraLogoProps = {
  variant?: "icon" | "lockup";
  className?: string;
  priority?: boolean;
};

export function CobraLogo({ variant = "icon", className = "", priority = false }: CobraLogoProps) {
  if (variant === "lockup") {
    return (
      <div className={`relative ${className}`}>
        <Image
          src="/brand/cobra-lockup.png"
          alt="Cobra Grip logo"
          width={1024}
          height={1024}
          priority={priority}
          className="h-auto w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src="/brand/cobra-icon.png"
        alt="Cobra Grip icon"
        width={1024}
        height={1024}
        priority={priority}
        className="h-auto w-full object-contain"
      />
    </div>
  );
}
