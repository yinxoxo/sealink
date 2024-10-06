import { useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { LuCalendarRange } from "react-icons/lu";

const TimeRangeSelector = ({
  showCalendar,
  setShowCalendar,
  setSelectedDateRange,
  selectedRange,
  setSelectedRange,
}) => {
  const [date, setDate] = useState({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  const handleRangeChange = (value) => {
    setSelectedRange(value);

    let newDateRange;
    if (value === "last7days") {
      newDateRange = {
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        to: new Date(),
      };
    } else if (value === "last28days") {
      newDateRange = {
        from: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
        to: new Date(),
      };
    } else if (value === "custom") {
      setShowCalendar(true);
      return;
    }

    setDate(newDateRange);
    setSelectedDateRange(newDateRange);
  };

  const handleDateRangeChange = (selectedDate) => {
    if (!selectedDate || !selectedDate.from || !selectedDate.to) return;

    setDate(selectedDate);
  };

  const handleApply = () => {
    setSelectedDateRange(date);
    setShowCalendar(false);
  };

  const handleCancel = () => {
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <Select value={selectedRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-[300px] border-none">
          <LuCalendarRange className="mr-2" />
          {selectedRange === "custom"
            ? date?.from && date?.to
              ? `${format(date.from, "PPP")} - ${format(date.to, "PPP")}`
              : "Custom range"
            : selectedRange === "last7days"
              ? "Last 7 days"
              : "Last 28 days"}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last7days">Last 7 days</SelectItem>
          <SelectItem value="last28days">Last 28 days</SelectItem>
          <SelectItem value="custom">Custom range</SelectItem>
        </SelectContent>
      </Select>

      {showCalendar && (
        <div className="absolute top-14 w-[300px] bg-white">
          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateRangeChange}
              numberOfMonths={1}
            />
            <div className="mt-2 flex justify-end">
              <Button variant="outline" className="mr-2" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleApply}>Apply</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeRangeSelector;
