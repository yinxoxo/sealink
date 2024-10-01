import { useNavigate } from "react-router-dom";
import ArtCard from "../../CardTemplate/ArtCard";
import SimpleCard from "../../cardTemplate/SimpleCard";
import WoodCard from "../../cardTemplate/WoodCard";
import BreadCard from "../../cardTemplate/BreadCard";
import JiaCard from "../../cardTemplate/JiaCard";
import GalaxyCard from "../../cardTemplate/GalaxyCard";
import ForestCard from "../../cardTemplate/ForestCard";
import NinaWishCard from "../../cardTemplate/NinaWishCard";
import initialSimpleCardContent from "../../cardTemplate/cardContent/initialSimpleCardContent";
import initialWoodCardContent from "../../cardTemplate/cardContent/initialWoodCardContent";
import initialArtCardContent from "../../cardTemplate/cardContent/initialArtCardContent";
import initialBreadCardContent from "../../cardTemplate/cardContent/initialBreadCardContent";
import initialJiaCardContent from "../../cardTemplate/cardContent/initialJiaCardContent";
import initialForestCardContent from "../../cardTemplate/cardContent/initialForestCardContent";
import initialGalaxyCardContent from "../../cardTemplate/cardContent/initialGalaxyCardContent";
import initialNinaWishCardContent from "../../cardTemplate/cardContent/initialNinaWishCardContent";
import { useAuth } from "../../contexts/AuthContext/useAuth";
import { CardEditorProvider } from "../../contexts/CardEditorContext/CardEditorProvider";

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

  const renderBackContent = (user) => {
    return (
      <div className="text-center">
        {!user ? (
          <div
            onClick={() => handleNavigate("/login", "/templates")}
            className="text-sea mt-4 px-4 py-2 text-[68px] font-bold opacity-70 shadow-md"
          >
            Sign up <br />
            or <br /> Log in
          </div>
        ) : (
          <div className="text-sea mt-4 px-4 py-2 text-[68px] font-bold opacity-70 shadow-md">
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
    <section className="mt-[90px] flex flex-wrap justify-center py-5">
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
