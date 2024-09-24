import { type ComponentProps, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(
        "h-10 rounded-lg border border-zinc-900 bg-black px-4 text-sm placeholder-zinc-500 outline-none ring-pink-500/10 hover:border-zinc-800 focus-visible:border-pink-500 focus-visible:ring-4",
      )}
    />
  );
});
