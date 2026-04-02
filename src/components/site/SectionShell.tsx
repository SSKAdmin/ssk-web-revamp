import { cn } from "@/lib/utils";

export function SectionShell({
  dark = false,
  children,
  className,
  id,
}: {
  dark?: boolean;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        dark ? "bg-ssk-navy text-white" : "bg-ssk-surface text-ssk-navy",
        "py-24 lg:py-40",
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-10">
        {children}
      </div>
    </section>
  );
}
