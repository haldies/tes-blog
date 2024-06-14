"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";

const formSchema = z.object({
  dob: z.date({ required_error: "A date of birth is required." }),
});

export function CalendarForm({ startDate: initialStartDate, endDate: initialEndDate, onDateRangeChange, onChartTypeChange }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dob: { from: initialStartDate, to: initialEndDate },
    },
  });

  const [selectedRange, setSelectedRange] = useState({
    startDate: initialStartDate || null,
    endDate: initialEndDate || null,
  });

  useEffect(() => {
    if (initialStartDate && initialEndDate) {
      setSelectedRange({
        startDate: initialStartDate,
        endDate: initialEndDate,
      });
    }
  }, [initialStartDate, initialEndDate]);

  const formattedStartDate = format(selectedRange.startDate ?? new Date(), "MMMM d, yyyy");
  const formattedEndDate = format(selectedRange.endDate ?? new Date(), "MMMM d, yyyy");

  const handleDateRangeSelect = (dates) => {
    form.setValue("dob", dates);
    setSelectedRange({
      startDate: dates.from,
      endDate: dates.to,
    });
    onDateRangeChange(dates);
  };

  const handle7DaysClick = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    setSelectedRange({
      startDate: lastWeek,
      endDate: today,
    });
    onDateRangeChange({ from: lastWeek, to: today });
    onChartTypeChange('daily');
  };

  const handlePerMonthClick = () => {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    setSelectedRange({
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth,
    });
    onDateRangeChange({ from: firstDayOfMonth, to: lastDayOfMonth });
    onChartTypeChange('monthly');
  };

  const handlePerYearClick = () => {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
    setSelectedRange({
      startDate: firstDayOfYear,
      endDate: lastDayOfYear,
    });
    onDateRangeChange({ from: firstDayOfYear, to: lastDayOfYear });
    onChartTypeChange('yearly');
  };

  return (
    <Form {...form}>
      <form
        className="space-y-8"
        onSubmit={form.handleSubmit((data) => console.log(data))}
      >
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal flex items-center w-auto border-none",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {formattedStartDate && formattedEndDate
                        ? `${formattedStartDate} - ${formattedEndDate}`
                        : "Select a date range"}
                      <ChevronDown color="#bbb9b9 " size={32} className="pl-2 pt-1" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col p-0">
                  <Button variant={"outline"} className=" border-none" onClick={handle7DaysClick}>7 Days</Button>
                  <Button variant={"outline"} className=" border-none" onClick={handlePerMonthClick}>Per Month</Button>
                  <Button variant={"outline"} className=" border-none" onClick={handlePerYearClick}>Per Year</Button>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className=" border-none" >custom</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={handleDateRangeSelect}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
