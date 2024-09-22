import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Link to="/templates" className="self-end">
        <button className="w-fit rounded-3xl bg-gray-300 p-2 text-white hover:bg-gray-400">
          Create New SeaLink
        </button>
      </Link>
    </div>
  );
};
export default Dashboard;
