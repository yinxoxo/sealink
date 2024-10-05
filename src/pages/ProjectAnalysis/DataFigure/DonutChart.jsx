import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Loading from "@/components/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ visitorData }) => {
  if (!visitorData) {
    return <Loading />;
  }

  const deviceData = visitorData.reduce((acc, curr) => {
    const deviceType = curr.deviceType || "Unknown";
    if (!acc[deviceType]) {
      acc[deviceType] = 0;
    }
    acc[deviceType]++;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(deviceData),
    datasets: [
      {
        label: "Device Type Distribution",
        data: Object.values(deviceData),
        backgroundColor: ["#5d9ab6", "#d8dfe9", "#f7d785"],
        hoverBackgroundColor: ["#4a798f", "#a2b0c4", "#f9cd60"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
      //   datalabels: {
      //     color: "#000",
      //     font: {
      //       size: 16,
      //     },
      //     formatter: (value, context) => {
      //       return value;
      //     },
      //   },
    },
  };

  return (
    <div className="h-1/3 max-h-[500px] w-1/3 max-w-[500px] rounded-lg bg-white p-2">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DonutChart;
