import { ICON_LIST } from "../../cardTemplate/cardContent/iconList";

const IconCarousel = ({ currentIndex }) => {
  const COLOR_LIST = ["#B48EAE", "#BAACBD"];
  const extendedIconList = [...ICON_LIST, ...ICON_LIST, ...ICON_LIST];
  const offset = ICON_LIST.length;

  return (
    <div className="flex h-[120px] w-1/2 min-w-[500px] flex-col justify-center overflow-hidden px-10">
      <div className="w-full">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${-(currentIndex * 160) - offset * 160}px)`,
          }}
        >
          {extendedIconList.map((iconItem, index) => {
            const IconComponent = iconItem.icon;
            const adjustedIndex = index - offset;
            const isActive =
              adjustedIndex === currentIndex ||
              adjustedIndex + ICON_LIST.length === currentIndex ||
              adjustedIndex - ICON_LIST.length === currentIndex;

            return (
              <div
                key={`${iconItem.id}-${index}`}
                className="flex-shrink-0"
                style={{ width: "160px" }}
              >
                <button className="relative flex items-center justify-center transition-all duration-500">
                  <div
                    className="relative flex h-[90px] w-[90px] items-center justify-center rounded-md transition-all duration-300"
                    style={{
                      backgroundColor:
                        COLOR_LIST[Math.abs(adjustedIndex) % COLOR_LIST.length],
                      transform: isActive
                        ? "translateY(-10px) scale(1.1)"
                        : "translateY(0) scale(1)",
                    }}
                  >
                    <IconComponent size={30} color="#ffffff" />
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IconCarousel;
