import PropTypes from "prop-types";
import { useCallback, useMemo } from "react";
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

  const getMonthAbbr = (date) => {
    return date.toLocaleString("en-US", { month: "short" });
  };

  const processData = useCallback(() => {
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
    return sortedDates.map((date) => {
      const dateObj = new Date(date);
      return {
        date,
        month: getMonthAbbr(dateObj),
        dayOfMonth: dateObj.getDate(),
        slots: dateVisits[date],
      };
    });
  }, [visitorData]);

  const heatmapData = useMemo(() => processData(), [processData]);

  if (loading || !visitorData) {
    return <Loading />;
  }

  const getColor = (value) => {
    if (value > 6) return "bg-[#5296a6]";
    if (value > 4) return "bg-[#7bb0bb]";
    if (value > 2) return "bg-[#a8c8d0]";
    if (value > 1) return "bg-[#bbd9e1]";
    if (value > 0) return "bg-[#d7e9eb]";
    return "bg-[#f1f2f3]";
  };

  const shouldShowDate = (dayOfMonth) => {
    return dayOfMonth === 7 || dayOfMonth === 14 || dayOfMonth === 21;
  };

  const Legend = () => {
    const colors = [
      { color: "bg-[#f1f2f3]", label: "0" },
      { color: "bg-[#d7e9eb]", label: "1" },
      { color: "bg-[#bbd9e1]", label: "2" },
      { color: "bg-[#a8c8d0]", label: "3-4" },
      { color: "bg-[#7bb0bb]", label: "5-6" },
      { color: "bg-[#5296a6]", label: ">6" },
    ];
    return (
      <div className="mt-auto flex min-h-full flex-col justify-end">
        <h3 className="mb-2 text-center text-sm font-semibold text-gray-600">
          Views
        </h3>
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

  let lastMonth = null;

  return (
    <div className="flex h-full flex-row items-center space-x-12 p-4">
      <div className="flex overflow-x-auto">
        <div className="mr-2 flex flex-col justify-between pb-5 text-gray-500">
          <span className="text-[10px]">00:00</span>
          <span className="text-center">|</span>
          <span className="text-[10px]">24:00</span>
        </div>

        <div className="flex gap-1 px-2">
          {heatmapData.map((dayData) => {
            const showMonth = lastMonth !== dayData.month;
            lastMonth = dayData.month;

            return (
              <div key={dayData.date} className="flex flex-col gap-1">
                {dayData.slots.map((value, slotIndex) => (
                  <div
                    key={`${dayData.date}-${slotIndex}`}
                    className={`${getColor(value)} h-[1/10] max-h-[25px] min-h-[18px] w-[1/10] min-w-[18px] max-w-[25px]`}
                    title={`${dayData.date} ${timeSlots[slotIndex]}: ${value} visits`}
                  />
                ))}
                <div className="mt-1 text-center text-xs text-gray-500">
                  {showMonth && (
                    <div className="text-[10px]">{dayData.month}</div>
                  )}
                  {shouldShowDate(dayData.dayOfMonth) && (
                    <div className="text-[10px]">{dayData.dayOfMonth}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <Legend />
      </div>
    </div>
  );
};

DailyHeatmap.propTypes = {
  loading: PropTypes.bool.isRequired,
  visitorData: PropTypes.arrayOf(
    PropTypes.shape({
      deviceType: PropTypes.string,
    }),
  ),
};

export default DailyHeatmap;
