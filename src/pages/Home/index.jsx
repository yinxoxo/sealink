import { CardContainer, SocialLinksSection } from "./CardFigure";
import pickleImg from "../../images/pickle.png";

const Home = () => {
  return (
    <div className="font-pop min-h-svh w-full">
      {/* Main Section */}
      <section className="relative flex h-screen w-full items-center justify-center bg-[#264F1A]">
        <div className="flex w-[90%]">
          <div className="w-1/2">
            <div className="mt-[10rem] text-left text-[72px] font-[700] leading-[1.05] tracking-[-0.02em] text-[#D2E722]">
              Everything you are. In one, simple link in bio.
            </div>
            <p className="mt-5 leading-[1.25] tracking-[-0.02em] text-[#D2E722]">
              One link to help you share everything you create, curate and sell
              from your Instagram, TikTok, Twitter, YouTube and other social
              media profiles.
            </p>
            <div className="mt-7 flex items-center space-x-4">
              <div className="flex items-center rounded-lg bg-white p-5">
                <span className="text-gray-500">sealink/</span>

                <input
                  type="text"
                  placeholder="yourname"
                  className="ml-1 border-none text-gray-500 focus:outline-none"
                />
              </div>

              <button className="rounded-full bg-[#E8C0E9] p-5 text-black">
                Claim your SeaLink
              </button>
            </div>
          </div>
          <div className="w-1/2" style={{ perspective: "1000px" }}>
            <div
              className="rotate-animation relative mt-[10rem] flex w-full justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="absolute"
                style={{ transform: "translateZ(0px)" }}
              >
                <CardContainer />
              </div>
              <div
                className="absolute top-[22em] mr-[150px]"
                style={{ transform: "translateZ(40px)" }}
              >
                <SocialLinksSection />
              </div>
              <div
                className="absolute bottom-[-7rem] ml-[180px]"
                style={{ transform: "translateZ(-40px)" }}
              >
                <img
                  src={pickleImg}
                  alt="Pickle"
                  className="h-auto w-[300px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Section */}
      <div className="font-pop sticky bottom-0 -z-10 min-h-svh w-full">
        <section className="h-screen w-full items-center justify-center bg-[#F3F3F1]">
          <div className="flex w-[90%]">
            <div className="w-1/2">
              <div className="mt-[15rem] text-left text-[72px] font-[700] leading-[1.05] tracking-[-0.02em] text-[#D2E722]">
                Everything you are. In one, simple link in bio.
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
