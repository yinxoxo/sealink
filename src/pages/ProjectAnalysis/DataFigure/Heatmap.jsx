import { useMemo } from "react";
import Loading from "../../../components/Loading/index";

const DailyHeatmap = ({ loading, visitorData }) => {
  const timeSlots = [
    "00:00-04:00",
    "04:00-08:00",
    "08:00-12:00",
    "12:00-16:00",
    "16:00-20:00",
    "20:00-24:00",
  ];

  const processData = () => {
    const dateVisits = {};
    visitorData.forEach((visitor) => {
      const visitDate = new Date(visitor.visitTime.seconds * 1000);
      const dateKey = visitDate.toISOString().split("T")[0];
      const hour = visitDate.getHours();
      const timeSlotIndex = Math.floor(hour / 4);

      if (!dateVisits[dateKey]) {
        dateVisits[dateKey] = Array(6).fill(0);
      }
      dateVisits[dateKey][timeSlotIndex]++;
    });

    const sortedDates = Object.keys(dateVisits).sort();
    return sortedDates.map((date) => ({
      date,
      slots: dateVisits[date],
    }));
  };

  const heatmapData = useMemo(() => processData(), [visitorData]);

  if (loading || !visitorData) {
    return <Loading />;
  }

  const getColor = (value) => {
    if (value > 5) return "bg-[#4a798f]";
    if (value > 4) return "bg-[#5296a6]";
    if (value > 3) return "bg-[#7bb0bb]";
    if (value > 2) return "bg-[#a8c8d0]";
    if (value > 1) return "bg-[#bbd9e1]";
    if (value > 0) return "bg-[#cadbdf]";
    return "bg-[#f1f2f3]";
  };

  const Legend = () => {
    const colors = [
      { color: "bg-[#f1f2f3]", label: "0" },
      { color: "bg-[#cadbdf]", label: "1" },
      { color: "bg-[#bbd9e1]", label: "2" },
      { color: "bg-[#a8c8d0]", label: "3-4" },
      { color: "bg-[#7bb0bb]", label: "5-6" },
      { color: "bg-[#5296a6]", label: ">6" },
    ];
    return (
      <div className="mt-4 flex flex-col items-center">
        <h3 className="mb-2 text-sm font-semibold text-gray-600">Views</h3>
        <div className="flex items-center">
          <span className="mr-2 text-xs text-gray-500">Less</span>
          {colors.map((item, index) => (
            <div
              key={index}
              className={`h-5 w-5 ${item.color}`}
              title={`${item.label} visits`}
            />
          ))}
          <span className="ml-2 text-xs text-gray-500">More</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex">
        {/* Time slots column */}
        <div className="mr-2 flex flex-col justify-between text-xs text-gray-500">
          {timeSlots.map((slot) => (
            <div key={slot} className="flex h-6 items-center">
              {slot}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex gap-1">
          {heatmapData.map((dayData) => (
            <div key={dayData.date} className="flex flex-col gap-1">
              {dayData.slots.map((value, slotIndex) => (
                <div
                  key={`${dayData.date}-${slotIndex}`}
                  className={`${getColor(value)} h-[1/10] max-h-[20px] min-h-[13px] w-[1/10] min-w-[13px] max-w-[20px]`}
                  title={`${dayData.date} ${timeSlots[slotIndex]}: ${value} visits`}
                />
              ))}
              <div className="mt-1 text-center text-xs text-gray-500">
                {new Date(dayData.date).getDate()}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Legend />
    </div>
  );
};

export default DailyHeatmap;
