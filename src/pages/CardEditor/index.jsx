import { useParams } from "react-router-dom";
import Card2 from "../../CardTemplate/Card2";
import Card from "../../CardTemplate/Card";
import EditBoard from "./EditorBoard";

const CardEditor = () => {
  const { template } = useParams();

  const renderTemplate = () => {
    switch (template) {
      case "Card":
        return <Card />;
      case "Card2":
        return <Card2 />;
      default:
        return <Card />;
    }
  };

  return (
    <section className="ml-64 flex h-full min-h-screen w-full overflow-y-auto border-2 border-solid border-neutral-300">
      <div className="flex flex-[7] flex-col items-center border-2 border-solid border-neutral-300">
        {/* <div className="mb-8 mt-12 flex h-14 w-3/4 flex-row items-center justify-between border-2 border-solid border-neutral-300">
          <div className="text-center">你的SeaLink</div>
          <button className="border-2 border-solid border-neutral-300">
            複製SeaLink連結
          </button>
        </div> */}
        <div className="w-[560px] flex-grow border-2 border-solid border-neutral-300">
          {renderTemplate()}
        </div>
      </div>
      <EditBoard />
    </section>
  );
};

export default CardEditor;
