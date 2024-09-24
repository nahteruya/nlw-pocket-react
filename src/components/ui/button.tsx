import { forwardRef, type ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "flex items-center justify-center gap-2 rounded-lg text-sm font-medium tracking-tight transition duration-300",
  variants: {
    color: {
      primary: "bg-violet-500 text-violet-50 hover:bg-violet-600",
      secondary: "bg-zinc-900 text-zinc-400 hover:bg-zinc-800",
    },
    size: {
      default: "px-4 py-2.5",
      sm: "px-3 py-1.5",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "default",
  },
});

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color, size, ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={buttonVariants({ color, size, className })}
      />
    );
  },
);
