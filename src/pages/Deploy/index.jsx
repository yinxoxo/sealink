import { useParams } from "react-router-dom";
import { useCardEditorContext } from "../../contexts/CardEditorContext/useCardEditorContext";
import SimpleCard from "../../cardTemplate/SimpleCard";
import ArtCard from "../../cardTemplate/ArtCard";
import BreadCard from "../../cardTemplate/BreadCard";
import ForestCard from "../../cardTemplate/ForestCard";
import GalaxyCard from "../../cardTemplate/GalaxyCard";
import JiaCard from "../../cardTemplate/JiaCard";
import WoodCard from "../../cardTemplate/WoodCard";
import Loading from "../../components/Loading";
import NinaWishCard from "../../cardTemplate/NinaWishCard";

const Deploy = () => {
  const { template } = useParams();
  const { projectData } = useCardEditorContext();

  const cardComponents = {
    ArtCard,
    BreadCard,
    ForestCard,
    GalaxyCard,
    JiaCard,
    SimpleCard,
    WoodCard,
    NinaWishCard,
  };

  const CardComponent = cardComponents[template];

  if (!projectData) {
    return <Loading />;
  }

  return (
    <div className="w- h-full min-h-screen">
      <CardComponent />
    </div>
  );
};

export default Deploy;
