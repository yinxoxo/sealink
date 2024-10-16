import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useVisitorProject } from "../../firebase/useVisitorProject";
import useRecordVisitorData from "@/firebase/useRecordVisitorData";
import Loading from "../../components/Loading";
import NotFound from "@/components/ErrorMessage/NotFound";
import ArtCard from "../../cardTemplate/ArtCard";
import BreadCard from "../../cardTemplate/BreadCard";
import ForestCard from "../../cardTemplate/ForestCard";
import GalaxyCard from "../../cardTemplate/GalaxyCard";
import JiaCard from "../../cardTemplate/JiaCard";
import SimpleCard from "../../cardTemplate/SimpleCard";
import WoodCard from "../../cardTemplate/WoodCard";
import NinaWishCard from "../../cardTemplate/NinaWishCard";

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
  console.log("project data in deploy", projectData.screenshotUrl);

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
