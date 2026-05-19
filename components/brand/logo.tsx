import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: 28,
  md: 32,
  lg: 36,
  xl: 44,
} as const;

type LogoSize = keyof typeof sizeMap | number;

type LogoProps = {
  href?: string | null;
  size?: LogoSize;
  showText?: boolean;
  className?: string;
  imageClassName?: string;
  textClassName?: string;
};

export function Logo({
  href = "/",
  size = "md",
  showText = true,
  className,
  imageClassName,
  textClassName,
}: LogoProps) {
  const px = typeof size === "number" ? size : sizeMap[size];

  const inner = (
    <>
      <Image
        src="/logo.png"
        alt="MilkyBacklinks"
        width={px}
        height={px}
        className={cn("shrink-0 rounded-lg object-contain", imageClassName)}
        priority={size === "lg" || size === "xl"}
      />
      {showText && (
        <span
          className={cn(
            "font-bold text-[#1a1a1a] tracking-tight",
            size === "sm" && "text-sm",
            size === "md" && "text-lg",
            size === "lg" && "text-lg",
            size === "xl" && "text-xl",
            textClassName
          )}
        >
          Milky<span className="text-[#f97316]">Backlinks</span>
        </span>
      )}
    </>
  );

  const classes = cn("flex items-center gap-2.5", className);

  if (href) {
    return (
      <Link href={href} className={cn(classes, "group")}>
        {inner}
      </Link>
    );
  }

  return <div className={classes}>{inner}</div>;
}
