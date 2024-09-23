import LoadingGif from "../../images/loading.gif";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <img src={LoadingGif} alt="Loading" className="h-16 w-16" />
    </div>
  );
};

export default Loading;
