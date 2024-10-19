import NotFoundSvg from "../../assets/images/404.svg";

const NotFound = () => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center bg-gray-50">
      <div className="flex w-full items-center">
        <div className="flex w-1/2 justify-center">
          <img
            src={NotFoundSvg}
            alt="404 Not Found"
            className="h-auto w-full"
          />
        </div>
        <div className="w-1/2">
          <h1 className="mb-4 text-4xl font-bold text-gray-800">
            404 - Page Not Found
          </h1>
          <p className="mb-8 text-gray-600">
            Oops! The page you are looking for doesn't exist or has been moved.
          </p>
          <a
            href="/"
            className="rounded-full bg-button px-6 py-3 text-white transition duration-300 hover:bg-button-hover"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
