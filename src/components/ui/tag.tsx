import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export function Tag(props: ComponentProps<"button">) {
  return (
    <button
      {...props}
      className={twMerge(
        "disable:pointer-events-none flex items-center gap-2 rounded-full border border-dashed border-zinc-800 px-3 py-2 text-sm leading-none text-zinc-300 outline-none ring-pink-500/10 hover:border-zinc-700 focus-visible:border-pink-500 focus-visible:ring-4 disabled:opacity-50",
      )}
    />
  );
}
