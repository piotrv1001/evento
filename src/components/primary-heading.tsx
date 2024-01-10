import { cn } from "@/lib/utils";

type PrimaryHeadingProps = {
  className?: string;
  children: React.ReactNode;
};

export default function PrimaryHeading({
  children,
  className,
}: PrimaryHeadingProps) {
  return (
    <h1
      className={cn(
        "text-3xl lg:text-6xl font-bold tracking-tight",
        className
      )}
    >
      {children}
    </h1>
  );
}
