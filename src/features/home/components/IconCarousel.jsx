import PropTypes from "prop-types";
import { ICON_LIST } from "../../cardTemplate/data/iconList";
const IconCarousel = ({ currentIndex }) => {
  const COLOR_LIST = ["#B48EAE", "#BAACBD"];
  const extendedIconList = [...ICON_LIST, ...ICON_LIST, ...ICON_LIST];
  const offset = ICON_LIST.length;

  return (
    <div className="flex h-[60px] w-1/2 min-w-[300px] flex-col justify-center overflow-hidden px-10 xl:h-[120px] xl:min-w-[500px]">
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
                className="flex-shrink-0 xl:w-[160px]"
              >
                <button className="relative flex cursor-default items-center justify-center transition-all duration-500">
                  <div
                    className="relative flex h-[40px] w-[40px] items-center justify-center rounded-md transition-all duration-300 xl:h-[90px] xl:w-[90px]"
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

IconCarousel.propTypes = {
  currentIndex: PropTypes.number.isRequired,
};

export default IconCarousel;
