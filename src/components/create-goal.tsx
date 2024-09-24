import { X } from "lucide-react";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { createGoal } from "../http/create-goal";
import { useQueryClient } from "@tanstack/react-query";

const createGoalForm = z.object({
  title: z.string().min(1, "Informe a atividade que desenha realizar"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalForm>;

export function CreateGoal() {
  const queryClient = useQueryClient();

  const { register, control, handleSubmit, formState, reset } =
    useForm<CreateGoalForm>({
      resolver: zodResolver(createGoalForm),
    });

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    });

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

    reset();
  }

  return (
    <DialogContent>
      <div className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          <div className="item flex justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-500" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          className="flex flex-1 flex-col justify-between gap-6"
          onSubmit={handleSubmit(handleCreateGoal)}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register("title")}
              />

              {formState.errors.title && (
                <span className="text-sm text-red-400">
                  {formState.errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label>Quantas vezes na semana?</Label>
              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={1}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-300">
                          1x na semana
                        </span>
                        <span className="text-lg leading-none">🥱</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="2">
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-300">
                          2x na semana
                        </span>
                        <span className="text-lg leading-none">🙂</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="3">
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-300">
                          3x na semana
                        </span>
                        <span className="text-lg leading-none">😎</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="4">
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-300">
                          4x na semana
                        </span>
                        <span className="text-lg leading-none">😜</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="5">
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-300">
                          5x na semana
                        </span>
                        <span className="text-lg leading-none">🤨</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="6">
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-300">
                          6x na semana
                        </span>
                        <span className="text-lg leading-none">🤯</span>
                      </RadioGroupItem>
                      <RadioGroupItem value="7">
                        <RadioGroupIndicator />
                        <span className="text-sm font-medium leading-none text-zinc-300">
                          Todos os dias da semana
                        </span>
                        <span className="text-lg leading-none">🔥</span>
                      </RadioGroupItem>
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" color="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
