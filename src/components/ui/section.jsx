import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva(
  "w-full scroll-mt-16 md:scroll-mt-24 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-page",
        page: "bg-page",
        section: "bg-section",
        primary: "bg-primary text-white-app",
        card: "bg-white-card",
        transparent: "bg-transparent",
      },
      size: {
        default: "py-12 px-6 md:px-8 md:py-14 lg:p-16",
        compact: "py-8 px-6 md:px-8 md:py-10 lg:px-16 lg:py-12",
        hero: "px-6 py-12 md:py-16",
        none: "p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const containerVariants = cva("w-full mx-auto", {
  variants: {
    containerSize: {
      "7xl": "max-w-7xl",
      "5xl": "max-w-5xl",
      "3xl": "max-w-3xl",
      "2xl": "max-w-2xl",
      full: "max-w-full",
      none: "",
    },
  },
  defaultVariants: {
    containerSize: "7xl",
  },
});

function Section({
  as: Component = "section",
  className,
  variant = "default",
  size = "default",
  container = true,
  containerSize = "7xl",
  containerClassName,
  children,
  ...props
}) {
  return (
    <Component
      data-slot="section"
      className={cn(sectionVariants({ variant, size, className }))}
      {...props}
    >
      {container ? (
        <div
          data-slot="section-container"
          className={cn(containerVariants({ containerSize }), containerClassName)}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}

function SectionHeader({ className, ...props }) {
  return (
    <div
      data-slot="section-header"
      className={cn(
        "flex flex-col gap-3 sm:gap-4 items-center text-center max-w-2xl mx-auto",
        className
      )}
      {...props}
    />
  );
}

function SectionTitle({ className, as: Component = "h2", ...props }) {
  return (
    <Component
      data-slot="section-title"
      className={cn(
        "text-2xl sm:text-3xl font-bold leading-tight sm:leading-10 text-dark",
        className
      )}
      {...props}
    />
  );
}

function SectionDescription({ className, ...props }) {
  return (
    <p
      data-slot="section-description"
      className={cn("text-sm sm:text-base leading-6 text-body", className)}
      {...props}
    />
  );
}

export {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
};
export default Section;
