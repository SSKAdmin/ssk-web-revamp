import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export function Section({
  children,
  className,
  id,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 md:py-32 lg:py-40 px-8 overflow-hidden",
        className
      )}
    >
      <div className={cn("mx-auto max-w-7xl", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
