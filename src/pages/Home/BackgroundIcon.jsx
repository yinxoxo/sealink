import PropTypes from "prop-types";
import { ICON_LIST } from "../../cardTemplate/cardContent/iconList";

const BackgroundIcon = ({ currentIndex }) => {
  const COLOR_LIST = ["#B48EAE", "#BAACBD"];
  const CurrentIcon = ICON_LIST[currentIndex].icon;

  return (
    <div className="flex items-center justify-center opacity-70">
      <CurrentIcon
        className="text-[150px] sm:text-[200px] lg:text-[400px] xl:text-[300px]"
        color={COLOR_LIST[currentIndex % COLOR_LIST.length]}
      />
    </div>
  );
};

BackgroundIcon.propTypes = {
  currentIndex: PropTypes.number.isRequired,
};

export default BackgroundIcon;
