import PropTypes from "prop-types";
import NavBar from "./NavBar";
import { SketchPicker } from "react-color";

const EditBoard = ({
  selectedText,
  setHydraText,
  setJuiceText,
  setDescriptionText,
  hydraText,
  juiceText,
  descriptionText,
  hydraTextStyle,
  setHydraTextStyle,
  juiceTextStyle,
  setJuiceTextStyle,
  descriptionTextStyle,
  setDescriptionTextStyle,
}) => {
  const handleColorChange = (color) => {
    switch (selectedText) {
      case "hydraText":
        setHydraTextStyle({ ...hydraTextStyle, color: color.hex });
        break;
      case "juiceText":
        setJuiceTextStyle({ ...juiceTextStyle, color: color.hex });
        break;
      case "descriptionText":
        setDescriptionTextStyle({ ...descriptionTextStyle, color: color.hex });
        break;
      default:
        break;
    }
  };

  const renderInput = () => {
    switch (selectedText) {
      case "hydraText":
        return (
          <>
            <input
              type="text"
              value={hydraText}
              onChange={(e) => setHydraText(e.target.value)}
              className="rounded border p-2"
            />
            <div className="mt-4">
              <label>Font Size</label>
              <input
                type="range"
                min="10"
                max="100"
                value={hydraTextStyle.fontSize}
                onChange={(e) =>
                  setHydraTextStyle({
                    ...hydraTextStyle,
                    fontSize: e.target.value,
                  })
                }
                className="slider"
              />
              <span>{hydraTextStyle.fontSize}px</span>
            </div>
            <div className="mt-4">
              <label>Font Weight</label>
              <input
                type="range"
                min="100"
                max="900"
                step="100"
                value={hydraTextStyle.fontWeight}
                onChange={(e) =>
                  setHydraTextStyle({
                    ...hydraTextStyle,
                    fontWeight: e.target.value,
                  })
                }
                className="slider"
              />
              <span>{hydraTextStyle.fontWeight}</span>
            </div>
            <div className="mt-4">
              <label>Font Color</label>
              <input
                type="color"
                value={hydraTextStyle.color}
                onChange={(e) =>
                  setHydraTextStyle({
                    ...hydraTextStyle,
                    color: e.target.value,
                  })
                }
                className="color-picker"
              />
            </div>
          </>
        );
      case "juiceText":
        return (
          <>
            <input
              type="text"
              value={juiceText}
              onChange={(e) => setJuiceText(e.target.value)}
              className="rounded border p-2"
            />
            <div className="mt-4">
              <label>Font Size</label>
              <input
                type="range"
                min="10"
                max="100"
                value={juiceTextStyle.fontSize}
                onChange={(e) =>
                  setJuiceTextStyle({
                    ...juiceTextStyle,
                    fontSize: e.target.value,
                  })
                }
                className="slider"
              />
              <span>{juiceTextStyle.fontSize}px</span>
            </div>
            <div className="mt-4">
              <label>Font Weight</label>
              <input
                type="range"
                min="100"
                max="900"
                step="100"
                value={juiceTextStyle.fontWeight}
                onChange={(e) =>
                  setJuiceTextStyle({
                    ...juiceTextStyle,
                    fontWeight: e.target.value,
                  })
                }
                className="slider"
              />
              <span>{juiceTextStyle.fontWeight}</span>
            </div>
            <div className="mt-4">
              <label>Font Color</label>
              {/* 使用SketchPicker作為顏色選擇器 */}
              <SketchPicker
                color={hydraTextStyle.color}
                onChangeComplete={handleColorChange}
              />
            </div>
          </>
        );
      case "descriptionText":
        return (
          <>
            <input
              type="text"
              value={descriptionText}
              onChange={(e) => setDescriptionText(e.target.value)}
              className="rounded border p-2"
            />
            <div className="mt-4">
              <label>Font Size</label>
              <input
                type="range"
                min="10"
                max="100"
                value={descriptionTextStyle.fontSize}
                onChange={(e) =>
                  setDescriptionTextStyle({
                    ...descriptionTextStyle,
                    fontSize: e.target.value,
                  })
                }
                className="slider"
              />
              <span>{descriptionTextStyle.fontSize}px</span>
            </div>
            <div className="mt-4">
              <label>Font Weight</label>
              <input
                type="range"
                min="100"
                max="900"
                step="100"
                value={descriptionTextStyle.fontWeight}
                onChange={(e) =>
                  setDescriptionTextStyle({
                    ...descriptionTextStyle,
                    fontWeight: e.target.value,
                  })
                }
                className="slider"
              />
              <span>{descriptionTextStyle.fontWeight}</span>
            </div>
            <div className="mt-4">
              <label>Font Color</label>
              <input
                type="color"
                value={descriptionTextStyle.color}
                onChange={(e) =>
                  setDescriptionTextStyle({
                    ...descriptionTextStyle,
                    color: e.target.value,
                  })
                }
                className="color-picker"
              />
            </div>
          </>
        );
      default:
        return <p>Please select text to edit.</p>;
    }
  };

  return (
    <section className="fixed right-0 min-h-full w-[450px] flex-[3] flex-col border-2 border-solid border-neutral-300 bg-slate-100">
      <NavBar />
      <div className="flex flex-col p-4">{renderInput()}</div>
    </section>
  );
};

export default EditBoard;

EditBoard.propTypes = {
  selectedText: PropTypes.string.isRequired,
  setHydraText: PropTypes.func.isRequired,
  setJuiceText: PropTypes.func.isRequired,
  setDescriptionText: PropTypes.func.isRequired,
  hydraText: PropTypes.string.isRequired,
  juiceText: PropTypes.string.isRequired,
  descriptionText: PropTypes.string.isRequired,
  hydraTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  }).isRequired,
  setHydraTextStyle: PropTypes.func.isRequired,
  juiceTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  }).isRequired,
  setJuiceTextStyle: PropTypes.func.isRequired,
  descriptionTextStyle: PropTypes.shape({
    fontSize: PropTypes.number,
    fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  }).isRequired,
  setDescriptionTextStyle: PropTypes.func.isRequired,
};
