import { useState } from "react";
const LinkChart = () => {
  const [activeTab, setActiveTab] = useState("socialIcons");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
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

      <div className="mt-4">
        {activeTab === "socialIcons" && (
          <div>
            <p>Displaying Social Icons data here.</p>
          </div>
        )}
        {activeTab === "buttons" && (
          <div>
            <p>Displaying Buttons data here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LinkChart;
