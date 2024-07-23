"use client";

import { Settings2 } from "lucide-react";

import { ExternalLink } from "@/components/atoms/ExternalLink";
import { Tooltip } from "@/components/atoms/Tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppStore } from "@/lib/useAppStore";

export function SettingsPanel() {
  const model = useAppStore((state) => state.model);
  const setModel = useAppStore((state) => state.setModel);
  const temperature = useAppStore((state) => state.temperature);
  const setTemperature = useAppStore((state) => state.setTemperature);

  return (
    <Sheet>
      <Tooltip content="Settings">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Settings2 className="h-5 w-5" />
          </Button>
        </SheetTrigger>
      </Tooltip>
      <SheetContent className="data-[state=closed]:duration-200 data-[state=open]:duration-200">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            {`Configure Llama 3.1 settings used by `}
            <ExternalLink href="https://console.groq.com/docs/models">Groq</ExternalLink>.
          </SheetDescription>
        </SheetHeader>
        <fieldset className="mt-8 grid gap-8">
          <div className="grid gap-3">
            <Label htmlFor="model">Model</Label>
            <Select
              value={model}
              onValueChange={(model) => {
                if (
                  model === "llama-3.1-405b-reasoning" ||
                  model === "llama-3.1-70b-versatile" ||
                  model === "llama-3.1-8b-instant"
                ) {
                  setModel(model);
                }
              }}
            >
              <SelectTrigger
                id="model"
                className="items-start [&_[data-description]]:hidden"
              >
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="llama-3.1-405b-reasoning"
                  disabled
                  className="data-[disabled]:opacity-70"
                >
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <div className="grid gap-0.5">
                      <p>
                        Llama 3.1{" "}
                        <span className="font-medium text-foreground">405B</span>
                      </p>
                      <p className="text-warning text-xs" data-description>
                        Not yet available (coming soon).
                      </p>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="llama-3.1-70b-versatile">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    Llama 3.1 <span className="font-medium text-foreground">70B</span>
                  </div>
                </SelectItem>
                <SelectItem value="llama-3.1-8b-instant">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    Llama 3.1 <span className="font-medium text-foreground">8B</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-3">
            <Label htmlFor="temperature">Temperature</Label>
            <Input
              id="temperature"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
            />
          </div>
        </fieldset>
      </SheetContent>
    </Sheet>
  );
}
