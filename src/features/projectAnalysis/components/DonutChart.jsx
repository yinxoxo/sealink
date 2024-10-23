import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import Loading from "../../../components/Loading/index";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DonutChart = ({ loading, visitorData }) => {
  if (loading || !visitorData) {
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
        backgroundColor: ["#4a798f", "#a2b0c4", "#f9cd60"],
        hoverBackgroundColor: ["#5d9ab6", "#d8dfe9", "#f7d785"],
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
      datalabels: {
        display: true,
        color: "#fff",
        font: {
          weight: "bold",
          size: "20px",
        },
        formatter: (value) => {
          return value;
        },
      },
    },
  };

  return (
    <div className="mx-auto h-[300px] max-h-full w-[300px] max-w-full">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

DonutChart.propTypes = {
  loading: PropTypes.bool.isRequired,
  visitorData: PropTypes.arrayOf(
    PropTypes.shape({
      deviceType: PropTypes.string,
    }),
  ),
};

export default DonutChart;
