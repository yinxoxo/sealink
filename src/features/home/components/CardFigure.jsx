import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

export const CardContainer = () => {
  return (
    <div className="relative">
      <div className="flex h-full w-[8rem] min-w-[250px] transform flex-col items-center rounded-xl bg-[#D2E722] p-6 xl:max-h-[675px] xl:min-h-[450px] xl:max-w-[500px]">
        <div className="mb-4 flex flex-col items-center">
          <img
            src="https://plus.unsplash.com/premium_photo-1671656333460-793292581bc6?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="avatar"
            className="mb-2 h-24 w-24 rounded-full object-cover"
          />
          <h1 className="text-lg font-bold text-[#264F1A]">Fresh Greens</h1>
          <p className="text-sm text-[#264F1A]">
            Quality fruits and vegetables
          </p>
        </div>
        <div className="mb-4 flex flex-col space-y-2">
          <button className="cursor-default rounded-full bg-white px-6 py-3 text-[#264F1A]">
            Daily Fresh Picks
          </button>
          <button className="cursor-default rounded-full bg-white px-6 py-3 text-[#264F1A]">
            Our Best Sellers
          </button>
          <button className="cursor-default rounded-full bg-white px-6 py-3 text-[#264F1A]">
            Special Offers
          </button>
        </div>
      </div>
    </div>
  );
};

export const SocialLinksSection = () => {
  return (
    <div className="flex justify-center space-x-4 py-4">
      <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white p-2 shadow-md hover:scale-150">
        <FaFacebook className="text-3xl text-[#061592]" />
      </div>
      <div className="hover: flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white p-2 shadow-md hover:scale-150">
        <FaInstagram className="text-3xl text-[#061592]" />
      </div>
      <div className="hover: flex h-[50px] w-[50px] items-center justify-center rounded-full bg-white p-2 shadow-md hover:scale-150">
        <FaTwitter className="text-3xl text-[#061592]" />
      </div>
    </div>
  );
};
