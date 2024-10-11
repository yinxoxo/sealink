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
  selectedDateRange,
  setSelectedDateRange,
  selectedRange,
  setSelectedRange,
}) => {
  const [tempDateRange, setTempDateRange] = useState(selectedDateRange);
  const [showCalendar, setShowCalendar] = useState(false);

  const defaultRange = {
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  };

  const handleRangeChange = (value) => {
    console.log("Selected range changed to:", value);
    setSelectedRange(value);

    if (value === "last7days") {
      setSelectedDateRange(defaultRange);
      setShowCalendar(false);
    } else if (value === "last28days") {
      const newDateRange = {
        from: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
        to: new Date(),
      };
      setSelectedDateRange(newDateRange);
      setShowCalendar(false);
    }
  };

  const handleCustomClick = () => {
    setShowCalendar(true);
    setTempDateRange(selectedDateRange);
  };

  const handleDateRangeChange = (selectedDate) => {
    if (!selectedDate || !selectedDate.from || !selectedDate.to) return;
    setTempDateRange(selectedDate);
  };

  const handleApply = () => {
    if (tempDateRange?.from && tempDateRange?.to) {
      console.log("Applying custom date range:", tempDateRange);
      setSelectedRange("custom");
      setSelectedDateRange(tempDateRange);
      setShowCalendar(false);
    } else {
      console.error("Date range is invalid");
    }
  };

  const handleCancel = () => {
    setTempDateRange(selectedDateRange);
    setShowCalendar(false);
  };

  return (
    <div className="relative">
      <Select value={selectedRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-[300px] border-none">
          <LuCalendarRange className="mr-2" />
          {selectedRange === "custom"
            ? selectedDateRange?.from && selectedDateRange?.to
              ? `${format(selectedDateRange.from, "PPP")} - ${format(
                  selectedDateRange.to,
                  "PPP",
                )}`
              : "Custom range"
            : selectedRange === "last7days"
              ? "Last 7 days"
              : "Last 28 days"}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="last7days">Last 7 days</SelectItem>
          <SelectItem value="last28days">Last 28 days</SelectItem>
          <SelectItem value="custom" onFocus={handleCustomClick}>
            Custom range
          </SelectItem>
        </SelectContent>
      </Select>

      {showCalendar && (
        <div className="absolute top-14 w-[300px] bg-white">
          <div className="border-2 p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={tempDateRange?.from}
              selected={tempDateRange}
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
