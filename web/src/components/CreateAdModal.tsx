import {
  Check,
  GameController,
  CaretDown,
  CaretUp,
  AlignCenterVertical,
} from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as Select from "@radix-ui/react-select";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";

import { Input } from "./Form/Input";
import { useState, useEffect, FormEvent } from "react";

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChat, setUseVoiceChat] = useState(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChat,
      });

      alert("Ad created succesfully!");
    } catch (err) {
      console.log(err);
      alert("Error while creating ad.");
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">Post an ad</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2 ">
            <label htmlFor="game" className="font-semibold">
              Which game?
            </label>
            <div className="bg-zinc-900 py-3 px-4 rounded text-sm">
              <Select.Root>
                <Select.Trigger>
                  <Select.Value
                    className="text-zinc-500"
                    placeholder="Select the game you want to play"
                  />
                </Select.Trigger>
                <Select.Portal className="w-[416px]">
                  <Select.Content>
                    <Select.ScrollUpButton className="bg-zinc-900 flex justify-center rounded py-1.5 text-white">
                      <CaretUp />
                    </Select.ScrollUpButton>
                    <Select.Viewport className="bg-zinc-900 py-1.5 px-2 rounded text-sm">
                      {games.map((game) => {
                        return (
                          <Select.Item
                            className="text-white pl-6 py-1.5 flex rounded hover:bg-zinc-700"
                            value={game.id}
                          >
                            <Select.ItemIndicator>
                              <Check className="w-5 h-5 pr-1 text-emerald-400 absolute right-[387px]" />
                            </Select.ItemIndicator>
                            <Select.ItemText>{game.title}</Select.ItemText>
                          </Select.Item>
                        );
                      })}
                    </Select.Viewport>
                    <Select.ScrollDownButton className="bg-zinc-900 flex justify-center rounded py-1.5 text-white">
                      <CaretDown />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Your name or nickname</label>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder="How are you called in-game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">
                How many years have
                <br />
                you been playing for?
              </label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="It's ok if it is ZERO"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord">What's your discord?</label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="User#0000"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">When do you usually play?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Ter??a"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                  }`}
                  title="S??bado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">What time of the day?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  name="hourStart"
                  id="hourStart"
                  type="time"
                  placeholder="From"
                />
                <Input
                  name="hourEnd"
                  id="hourEnd"
                  type="time"
                  placeholder="Until"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 items-center text-sm">
            <Checkbox.Root
              checked={useVoiceChat}
              onCheckedChange={(checked) => {
                if (checked) {
                  setUseVoiceChat(true);
                } else {
                  setUseVoiceChat(false);
                }
              }}
              className="w-6 h-6 p-0.5 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-5 h-5 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            I usually use voice-chat
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
              Cancel
            </Dialog.Close>
            <button
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              type="submit"
            >
              <GameController className="w-6 h-6" />
              Find duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
