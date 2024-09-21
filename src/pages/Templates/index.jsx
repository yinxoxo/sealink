import { useNavigate } from "react-router-dom";
import SimpleCard from "../../CardTemplate/SimpleCard";
import ArtCard from "../../CardTemplate/ArtCard";
import BusinessCard from "../../CardTemplate/BusinessCard";
import { useCardEditorContext } from "../../contexts/CardEditorContext";
import { useAuth } from "../../contexts/AuthContext";

const Template = () => {
  const { user } = useAuth();
  const {
    hydraText,
    juiceText,
    descriptionText,
    hydraTextStyle,
    juiceTextStyle,
    descriptionTextStyle,
    icons,
    simpleCardButtons,
    backgroundSettings,
    iconColor,
    iconSize,
  } = useCardEditorContext();

  const navigate = useNavigate();

  const handleNavigate = (path, from) => {
    if (!user) {
      navigate("/signup", { state: { from } });
    } else {
      navigate(path);
    }
  };

  const handleTemplateClick = (template) => {
    handleNavigate(`/dashboard/card-editor/${template}`, "templates");
  };

  return (
    <section className="flex flex-wrap justify-center">
      <div
        className="template-card"
        onClick={() => handleTemplateClick("SimpleCard")}
      >
        <div className="card-inner">
          <div className="template-card-size">
            <SimpleCard
              hydraText={hydraText}
              juiceText={juiceText}
              descriptionText={descriptionText}
              icons={icons}
              iconColor={iconColor}
              iconSize={iconSize}
              hydraTextStyle={hydraTextStyle}
              juiceTextStyle={juiceTextStyle}
              descriptionTextStyle={descriptionTextStyle}
              simpleCardButtons={simpleCardButtons}
              backgroundSettings={backgroundSettings}
            />
          </div>
          <div className="card-back template-card-size">
            <div className="flex h-full w-full items-center justify-center bg-white bg-opacity-90">
              <div className="text-center">
                {!user ? (
                  <div
                    onClick={() => handleNavigate("/login", "/templates")}
                    className="mt-4 px-4 py-2 text-[68px] font-bold text-slate-400 opacity-50 shadow-md"
                  >
                    Sign up <br />
                    or <br /> Log in
                  </div>
                ) : (
                  <div className="mt-4 px-4 py-2 text-[68px] font-bold text-slate-400 opacity-50 shadow-md">
                    Build <br /> Your <br /> SeaLink
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="template-card"
        onClick={() => handleTemplateClick("ArtCard")}
      >
        <div className="template-card-size">
          <ArtCard />
        </div>
      </div>

      <div
        className="template-card"
        onClick={() => handleTemplateClick("BusinessCard")}
      >
        <div className="template-card-size">
          <BusinessCard />
        </div>
      </div>
    </section>
  );
};

export default Template;
