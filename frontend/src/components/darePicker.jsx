"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerDemo({Controller, control}) {

  return (
      <Controller
        name="date"
        control={control}
        rules={{ required: "Please select a date" }}
        render={({ field, fieldState }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!field.value}
                className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(field.value, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                className="rounded-lg border"
              />
            </PopoverContent>
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </Popover>
        )}
      />
  );
}
