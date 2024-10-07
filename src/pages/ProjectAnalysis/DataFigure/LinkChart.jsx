import { useState } from "react";
import Loading from "../../../components/Loading";
import { ICON_MAP } from "../../../cardTemplate/cardContent/iconList";
import { RxButton } from "react-icons/rx";

const LinkChart = ({ loading, visitorData }) => {
  const [activeTab, setActiveTab] = useState("socialIcons");
  if (loading || !visitorData) {
    return <Loading />;
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const iconCountsArray = Object.entries(
    visitorData.reduce((acc, visitor) => {
      visitor.clickEvents
        .filter((event) => event.tagName === "A")
        .forEach((event) => {
          acc[event.id] = (acc[event.id] || 0) + 1;
        });
      return acc;
    }, {}),
  ).sort(([, countA], [, countB]) => countB - countA);

  const totalIconClicks = iconCountsArray.reduce(
    (acc, [, count]) => acc + count,
    0,
  );

  const buttonCountsArray = Object.entries(
    visitorData.reduce((acc, visitor) => {
      visitor.clickEvents
        .filter((event) => event.tagName === "BUTTON")
        .forEach((event) => {
          acc[event.href] = (acc[event.href] || 0) + 1;
        });
      return acc;
    }, {}),
  ).sort(([, countA], [, countB]) => countB - countA);

  const totalButtonClicks = buttonCountsArray.reduce(
    (acc, [, count]) => acc + count,
    0,
  );

  const getIconComponent = (iconId) => {
    const IconComponent = ICON_MAP[iconId];
    return IconComponent ? (
      <IconComponent className="text-[20px] text-gray-700" />
    ) : (
      <></>
    );
  };

  return (
    <div className="w-full p-3">
      <div className="relative flex w-full">
        <button
          onClick={() => handleTabClick("socialIcons")}
          className={`mr-5 pb-2 ${activeTab === "socialIcons" ? "font-bold" : ""}`}
        >
          Social Icons
        </button>
        <button
          onClick={() => handleTabClick("buttons")}
          className={`pb-2 ${activeTab === "buttons" ? "font-bold" : ""}`}
        >
          Buttons
        </button>
        <div
          className={`absolute bottom-0 h-[2px] bg-black transition-all duration-300 ease-in-out`}
          style={{
            width: activeTab === "socialIcons" ? "90px" : "70px",
            transform:
              activeTab === "socialIcons"
                ? "translateX(0px)"
                : "translateX(105px)",
          }}
        />
      </div>
      <div className="mr-auto flex justify-end">
        <div className="text-right">
          <span className="text-lg font-bold">
            Total Clicks:{" "}
            {activeTab === "socialIcons" ? totalIconClicks : totalButtonClicks}
          </span>
        </div>
      </div>
      <div className="mt-4 max-h-[300px] overflow-y-auto">
        {activeTab === "socialIcons" && (
          <div className="space-y-2">
            {iconCountsArray.map(([iconId, count]) => (
              <div
                key={iconId}
                className="flex items-center justify-between rounded-lg border-2 p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-gray-100 p-3">
                    {getIconComponent(iconId)}
                  </div>
                  <span className="text-sm">{iconId}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-right">{count} Clicks</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "buttons" && (
          <div className="space-y-2">
            {buttonCountsArray.map(([href, count]) => (
              <div
                key={href}
                className="flex items-center justify-between rounded-lg border-2 p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="rounded-full bg-gray-100 p-3">
                    <RxButton />
                  </div>
                  <span className="text-sm">{href}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-right">{count} Clicks</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkChart;
