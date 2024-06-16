import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { apiUrl, baseUrl } from "../../App";
import Footer from "../../Components/Footer";

type startPageTypes = {
  instagramUrl: string;
  loadingState: boolean;
  location: string;
};

export default function StartPage({
  instagramUrl,
  loadingState,
  location,
}: startPageTypes) {
  // const blankData: any[] | (() => any[]) = [];

  const [slideshowData, setSlideshowData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const slideshowAPIRes = await fetch(`${apiUrl}/slideshow`);

      const slideshow = await slideshowAPIRes.json();
      setSlideshowData(slideshow);
    })();
  }, []);

  let slides = slideshowData;

  const [image, setImage] = useState(slides[0]);
  const [slideOpacity, setSlideOpacity] = useState(1);
  const [imgNum, setImgNum] = useState(0);
  const [showStarted, setShowStarted] = useState(0);

  const [cl, setCl] = useState("carousel-image");

  const setVertical = () => {
    setCl(
      "w-auto min-h-[20vh] xxs:min-h-[25vh] xs:min-h-[30vh] sm:min-h-[30vh] vertical-slide translate-y-[2vh] md:translate-y-[1vh] scale-[0.8] md:scale-[1] xl:scale-[1.3]"
    );
  };
  const setHorizontal = () => {
    setCl(
      "w-[800px] lg:scale-[1.2]"
    );
  };

  function slide() {
    setSlideOpacity(0);
    setTimeout(() => {
      setImage(slides[imgNum]);
    }, 800);
    setTimeout(() => {
      setSlideOpacity(1);
    }, 900);

    imgNum < slides.length - 1 ? setImgNum(imgNum + 1) : setImgNum(0);
  }

  const [slidesLoaded, setImagesLoaded] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    if (loadingCount === slides.length) {
      setImagesLoaded(true);
    }
  }, [loadingCount, slides.length]);

  const handleImageLoad = () => {
    setLoadingCount((prevCount) => prevCount + 1);
  };

  if (loadingState || !slidesLoaded)
    return (
      <div className="flex justify-center translate-y-[45vh] text-grey">
        <ScaleLoader color={"#e3e1e1"} />
      </div>
    );
  return (
    <div className="start-page">
      <div
        className="flex flex-wrap min-w-[100%] min-h-[80vh] mx-auto justify-around sm:p-16 mb-36 mt-16 sm:mt-0 sm:mb-8 md:mb-0 lg:mb-8 xxl:pt-[12.5vh] xl:flex-nowrap xl:py-[20vh]"
        onLoad={() => {
          if (!showStarted) {
            slide();
            setShowStarted(1);
          } else {
            setTimeout(() => {
              slide();
            }, 7000);
          }
        }}
      >
        <div className="start-menu fade-in-1s md:m-[20px] lg:mx-[80px] xl:m-0 lg:px-4 xl:pr-24">
          <div className="text-center min-w-[300px]">
            <span className="font-header hover:text-gray-600/75 text-3xl xs:text-4xl hover:cursor-none">
              Anna Nowak
            </span>
          </div>
          <div className="flex flex-row px-8 pt-4 xs:pt-8 justify-center xl:flex-col xl:text-center xl:pt-36">
            <a
              href={`${baseUrl}#/projekty`}
              className="hover:text-gray font-light px-3 py-2 my-2 text-md sm:text-lg lg:text-xl font-header hover:cursor-crosshair"
            >
              Projekty
            </a>
            <a
              href={`${baseUrl}#/o-mnie`}
              className="hover:text-gray font-light px-3 py-2 my-2 text-md sm:text-lg lg:text-xl font-header hover:cursor-crosshair"
            >
              O mnie
            </a>
            {instagramUrl !== "" && (
              <a
                href={instagramUrl}
                target="_blank"
                className="instagram-link hidden xl:block hover:text-gray font-light px-3 py-2 my-2 text-md sm:text-lg lg:text-xl font-header hover:cursor-crosshair"
              >
                Instagram
              </a>
            )}
          </div>
        </div>
        <div className="slideshow px-8 sm:pt-16 md:pt-16 xl:pt-0 max-w-[694px] min-w-[100vw] lg:min-w-[694px]">
          {/* load all slideshow images - this prevents the slideshow from bugging out on low conncection speed */}
          {slides.map((src, i) => {
            return <img className="hidden" src={src} key={i} onLoad={handleImageLoad} />;
          })}

          {/* display only the one determined by slide function */}
          <div
            style={{ opacity: slideOpacity, transition: `opacity 0.9s` }}
            className=" min-h-[25vh] lg:max-w-[800px] flex justify-center "
          >
            <img
              className={cl}
              src={image}
              onLoad={(evt) => {
                evt.currentTarget.naturalWidth < evt.currentTarget.naturalHeight
                  ? setVertical()
                  : setHorizontal();
              }}
            />
          </div>
        </div>
      </div>
      <Footer location={location} instagramUrl={instagramUrl} />
    </div>
  );
}
