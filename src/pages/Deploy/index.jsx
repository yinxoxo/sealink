import NotFound from "@/components/ErrorMessage/NotFound";
import useRecordVisitorData from "@/firebase/useRecordVisitorData";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import ArtCard from "../../features/cardTemplate/components/ArtCard";
import BreadCard from "../../features/cardTemplate/components/BreadCard";
import ForestCard from "../../features/cardTemplate/components/ForestCard";
import GalaxyCard from "../../features/cardTemplate/components/GalaxyCard";
import JiaCard from "../../features/cardTemplate/components/JiaCard";
import NinaWishCard from "../../features/cardTemplate/components/NinaWishCard";
import SimpleCard from "../../features/cardTemplate/components/SimpleCard";
import WoodCard from "../../features/cardTemplate/components/WoodCard";
import { useVisitorProject } from "../../firebase/useVisitorProject";

const Deploy = () => {
  const { userId, template, projectId } = useParams();
  const {
    data: projectData,
    isLoading,
    isError,
  } = useVisitorProject(userId, projectId);

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

  useRecordVisitorData(userId, projectId);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !projectData || !projectData.isPublished) {
    return <NotFound />;
  }

  return (
    <div className="h-full min-h-screen w-full">
      <Helmet>
        <title>{projectData.title}</title>
        <meta property="og:title" content={projectData.title} />
        <meta
          property="og:description"
          content="Check out this awesome project!"
        />
        {projectData.screenshotUrl && (
          <meta property="og:image" content={projectData.screenshotUrl} />
        )}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      {CardComponent ? <CardComponent data={projectData} /> : <NotFound />}
    </div>
  );
};

export default Deploy;
