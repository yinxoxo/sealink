import { CardContainer, SocialLinksSection } from "./CardFigure";
import pickleImg from "../../images/pickle.png";
import { useEffect, useState, useCallback } from "react";
import { ICON_LIST } from "../../cardTemplate/cardContent/iconList";
// import IconSlider from "./IconSlider";
import BackgroundIcon from "./BackgroundIcon";
import IconCarousel from "./IconCarousel";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % ICON_LIST.length);
  }, []);

  const AUTO_PLAY_INTERVAL = 3000;

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, nextSlide]);

  return (
    <div className="font-pop h-fit min-h-svh w-full">
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
      <section className="sticky bottom-0 -z-10 flex h-screen w-full items-center justify-center bg-[#F3F3F1]">
        <div className="flex w-[90%] flex-col">
          <div className="flex w-full">
            <div className="w-1/2">
              <div className="mt-[8rem] flex w-full">
                <div className="w-full">
                  <BackgroundIcon currentIndex={currentIndex} />
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <div className="mt-[12rem] text-left text-[64px] font-[700] leading-[1.05] tracking-[-0.02em] text-[#264F1A]">
                Easily connect all your social media and businesses with
                Sealink.
              </div>
              <p className="mt-5 leading-[1.25] tracking-[-0.02em] text-[#264F1A]">
                Seamlessly integrate all your online platforms into one,
                easy-to-share link.
              </p>
              <div className="mt-5 flex">
                {/* <button className="rounded-full bg-[#264F1A] p-5 text-white">
                  Get started for free
                </button> */}
              </div>
            </div>
          </div>
          <div className="mt-[4rem] w-full">
            <IconCarousel
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              setIsPlaying={setIsPlaying}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
