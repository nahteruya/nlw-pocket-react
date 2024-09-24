import logoInOrbit from "../assets/logo-in-orbit.svg";
import letsStart from "../assets/lets-start-illustration.svg";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export function EmptyGoals() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8">
      <img src={logoInOrbit} alt="in.orbit" />
      <img src={letsStart} alt="" />
      <p className="max-w-80 text-center leading-relaxed text-zinc-300">
        Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora mesmo?
      </p>

      <DialogTrigger asChild>
        <Button>
          <Plus className="size-4" />
          Cadastrar meta
        </Button>
      </DialogTrigger>
    </div>
  );
}
