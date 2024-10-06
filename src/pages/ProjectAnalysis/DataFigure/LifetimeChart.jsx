import { FiEye, FiLink, FiPercent } from "react-icons/fi";

const LifetimeChart = ({ visitorData }) => {
  const views = visitorData.length || 0;
  const clicks = visitorData.reduce(
    (acc, cur) => acc + (cur.clickEvents.length || 0),
    0,
  );
  const clickRate = views > 0 ? ((clicks / views) * 100).toFixed(0) : 0;

  return (
    <div className="w-full space-y-5 p-3">
      <h1 className="text-2xl font-semibold">Lifetime</h1>
      <div className="flex w-full items-center justify-between bg-white">
        <div className="flex items-center space-x-2">
          <div className="bg-lightGray rounded-full p-2">
            <FiEye size={20} className="text-gray-700" />
          </div>
          <div>
            <span className="mx-2 text-lg">{views}</span>
            <span className="text-sm text-gray-500">Views</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-lightGray rounded-full p-2">
            <FiLink size={20} className="text-gray-700" />
          </div>
          <div>
            <span className="mx-2 text-lg">{clicks}</span>
            <span className="text-sm text-gray-500">Clicks</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="bg-lightGray rounded-full p-2">
            <FiPercent size={20} className="text-gray-700" />
          </div>
          <div>
            <span className="mx-2 text-lg">{`${clickRate}%`}</span>
            <span className="text-sm text-gray-500">Click Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifetimeChart;
