import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { CardEditorProvider } from "../../contexts/CardEditorContext/CardEditorProvider";
import ArtCard from "../../features/cardTemplate/components/ArtCard";
import BreadCard from "../../features/cardTemplate/components/BreadCard";
import ForestCard from "../../features/cardTemplate/components/ForestCard";
import GalaxyCard from "../../features/cardTemplate/components/GalaxyCard";
import JiaCard from "../../features/cardTemplate/components/JiaCard";
import NinaWishCard from "../../features/cardTemplate/components/NinaWishCard";
import SimpleCard from "../../features/cardTemplate/components/SimpleCard";
import WoodCard from "../../features/cardTemplate/components/WoodCard";
import initialArtCardContent from "../../features/cardTemplate/data/initialArtCardContent";
import initialBreadCardContent from "../../features/cardTemplate/data/initialBreadCardContent";
import initialForestCardContent from "../../features/cardTemplate/data/initialForestCardContent";
import initialGalaxyCardContent from "../../features/cardTemplate/data/initialGalaxyCardContent";
import initialJiaCardContent from "../../features/cardTemplate/data/initialJiaCardContent";
import initialNinaWishCardContent from "../../features/cardTemplate/data/initialNinaWishCardContent";
import initialSimpleCardContent from "../../features/cardTemplate/data/initialSimpleCardContent";
import initialWoodCardContent from "../../features/cardTemplate/data/initialWoodCardContent";

const Template = () => {
  const { user } = useAuth();
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderBackContent = (user) => {
    return (
      <div className="text-center">
        {!user ? (
          <div
            onClick={() => handleNavigate("/login", "/templates")}
            className="mt-4 px-4 py-2 text-[68px] font-bold text-sea opacity-70"
          >
            Sign up <br />
            or <br /> Log in
          </div>
        ) : (
          <div className="mt-4 px-4 py-2 text-[68px] font-bold text-sea opacity-70">
            Build <br /> Your <br /> SeaLink
          </div>
        )}
      </div>
    );
  };

  const cardTemplates = [
    {
      component: SimpleCard,
      data: initialSimpleCardContent,
      name: "SimpleCard",
    },
    { component: WoodCard, data: initialWoodCardContent, name: "WoodCard" },
    { component: ArtCard, data: initialArtCardContent, name: "ArtCard" },
    { component: BreadCard, data: initialBreadCardContent, name: "BreadCard" },
    { component: JiaCard, data: initialJiaCardContent, name: "JiaCard" },
    {
      component: ForestCard,
      data: initialForestCardContent,
      name: "ForestCard",
    },
    {
      component: GalaxyCard,
      data: initialGalaxyCardContent,
      name: "GalaxyCard",
    },
    {
      component: NinaWishCard,
      data: initialNinaWishCardContent,
      name: "NinaWishCard",
    },
  ];

  return (
    <section className="mt-[10rem] flex flex-wrap justify-center py-5">
      {cardTemplates.map(({ component: CardComponent, data, name }) => (
        <div
          key={name}
          className="template-card"
          onClick={() => handleTemplateClick(name)}
        >
          <div className="card-inner">
            <div className="template-card-size">
              <CardComponent data={{ ...data }} />
            </div>
            <div className="card-back template-card-size">
              <div className="flex h-full w-full items-center justify-center bg-white bg-opacity-90">
                {renderBackContent(user)}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

const TemplateWithProvider = () => {
  return (
    <CardEditorProvider>
      <Template />
    </CardEditorProvider>
  );
};

export default TemplateWithProvider;
