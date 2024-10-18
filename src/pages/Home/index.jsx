import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ICON_LIST } from "../../cardTemplate/cardContent/iconList";
import pickleImg from "../../images/pickle.png";
import BackgroundIcon from "./BackgroundIcon";
import { CardContainer, SocialLinksSection } from "./CardFigure";
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
    <div className="w-full font-pop xl:min-h-svh">
      <div className="relative">
        {/* Main Section */}
        <section className="relative z-20 flex min-h-screen w-full justify-center bg-[#264F1A] xl:items-center">
          <div className="flex w-[80%] flex-col sm:w-[90%] xl:flex-row">
            <div className="min-h-svh w-full md:mb-[200px] md:min-h-fit xl:mt-[3rem] xl:w-1/2">
              <div className="mt-[10rem] text-left text-[36px] font-[700] leading-[1.05] tracking-[-0.02em] text-[#D2E722] lg:text-[72px] xl:text-[72px]">
                Everything you are. In one, simple link in bio.
              </div>
              <p className="mt-5 leading-[1.25] tracking-[-0.02em] text-[#D2E722]">
                One link to help you share everything you create, curate and
                sell from your Instagram, TikTok, Twitter, YouTube and other
                social media profiles.
              </p>
              <div className="mt-12 flex flex-col items-center space-y-3 lg:mt-7 lg:flex-row lg:space-x-4 lg:space-y-0">
                <div className="flex w-full items-center rounded-lg bg-white p-5">
                  <span className="text-gray-500">sealink/</span>

                  <input
                    type="text"
                    placeholder="yourname"
                    className="ml-1 w-[100px] border-none text-gray-500 focus:outline-none"
                  />
                </div>
                <Link to="/signup" className="w-full">
                  <button className="w-full rounded-full bg-[#E8C0E9] p-5 text-black hover:bg-[#d1a5d2] hover:text-white">
                    Claim your SeaLink
                  </button>
                </Link>
              </div>
            </div>
            <div
              className="min-h-[560px] w-full sm:min-h-[650px] xl:mt-[6rem] xl:h-fit xl:w-1/2"
              style={{ perspective: "1000px" }}
            >
              <div
                className="rotate-animation relative flex w-full justify-center lg:mt-[10rem]"
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
                  className="absolute bottom-[-6rem] ml-[50px] xl:bottom-[-8rem] xl:ml-[180px]"
                  style={{ transform: "translateZ(-40px)" }}
                >
                  <img
                    src={pickleImg}
                    alt="Pickle"
                    className="h-auto w-[300px] object-cover hover:scale-110 xl:w-[350px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Bottom Section */}
        <section className="sticky bottom-0 z-10 flex min-h-screen w-full items-center justify-center bg-[#F3F3F1]">
          <div className="mt-[80px] flex w-[80%] flex-col items-center sm:w-[90%]">
            <div className="flex w-full flex-col xl:flex-row">
              <div className="mx-auto w-full xl:mt-[5rem] xl:w-1/2">
                <div className="mt-8 flex w-full items-center justify-center text-center xl:justify-center">
                  <BackgroundIcon currentIndex={currentIndex} />
                </div>
              </div>
              <div className="w-full xl:mt-[6rem] xl:w-1/2">
                <div className="mt-12 text-center text-[36px] font-[700] leading-[1.05] tracking-[-0.02em] text-[#264F1A] lg:text-[64px] xl:text-left xl:text-[64px]">
                  Easily connect all your social media and businesses with
                  Sealink.
                </div>
                <p className="mt-5 text-center leading-[1.25] tracking-[-0.02em] text-[#264F1A] xl:text-left">
                  Seamlessly integrate all your online platforms into one,
                  easy-to-share link.
                </p>

                <Link
                  to="/signup"
                  className="flex w-full justify-center xl:justify-start"
                >
                  <button className="relative z-30 mt-5 w-full rounded-full bg-[#264F1A] p-5 text-white sm:w-1/2">
                    Get started for free
                  </button>
                </Link>
              </div>
            </div>
            <div className="w-full xl:mt-16">
              <IconCarousel
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                setIsPlaying={setIsPlaying}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
