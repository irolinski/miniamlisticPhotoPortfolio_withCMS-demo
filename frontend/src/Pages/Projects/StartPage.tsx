import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { baseUrl } from "../../App";

type startPageTypes = {
  instagramUrl: string;
  loadingState: boolean;
};

export default function StartPage({ instagramUrl, loadingState }: startPageTypes) {
  const blankData: any[] | (() => any[]) = [];

  const [slideshowData, setSlideshowData] = useState<any[]>(blankData);

  useEffect(() => {
    (async () => {
      const slideshowAPIRes = await fetch(
        "https://miniamlistic-photo-portfolio-with-cms-demo-czkay78p5.vercel.app/api/slideshow"
      );

      const slideshow = await slideshowAPIRes.json();
      setSlideshowData(slideshow);
    })();
  }, []);

  let slides = slideshowData;

  const [image, setImage] = useState(slides[0]);
  const [slideOpacity, setSlideOpacity] = useState(1);
  const [imgNum, setImgNum] = useState(1);
  const [showStarted, setShowStarted] = useState(0);

  function slide() {
    setSlideOpacity(0);
    setTimeout(() => {
      setImage(slides[imgNum]);
    }, 500);
    setTimeout(() => {
      setSlideOpacity(1);
    }, 600);

    imgNum < slides.length - 1 ? setImgNum(imgNum + 1) : setImgNum(0);
  }
  if (loadingState) return (<div className="flex justify-center translate-y-[45vh] text-grey"><ScaleLoader color={"#e3e1e1"} /></div>)
  return (
    <div
      className="flex flex-wrap min-w-[100%] min-h-[100%] mx-auto justify-around sm:p-16 mb-36 mt-24 sm:mt-0 sm:mb-8 md:mb-0 lg:mb-8 lg:pt-[12.5vh] xl:flex-nowrap xl:py-[20vh]"
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
      <div className="start-menu fade-in-1s xl:pr-16">
        <div className="text-center">
          <span className="font-header hover:text-gray-600/75 text-3xl xs:text-4xl hover:cursor-none">
            Pola Walczak
          </span>
        </div>
        <div className="flex flex-row px-8 pt-4 xs:pt-8 justify-center xl:flex-col xl:text-center xl:pt-36">
          <a
            href={`${baseUrl}/#/projekty`}
            className="hover:text-gray font-light px-3 py-2 my-2 text-md sm:text-lg lg:text-xl font-header hover:cursor-crosshair"
          >
            Projekty
          </a>
          <a
            href={`${baseUrl}/#/o-mnie`}
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
      <div className="slideshow pt-16 px-8 sm:pt-16 md:pt-16 xl:pt-0">
        {/* load all slideshow images - this prevents the slideshow from bugging out on low conncection speed */}
        {slides.map((src, i) => {
          return <img className="hidden" src={src} key={i} />;
        })}

        {/* display only the one determined by slide function */}
        <div style={{ opacity: slideOpacity, transition: `opacity 0.7s` }}>
          <img className="w-[800px] min-h-[20vh] xxs:min-h-[25vh] xs:min-h-[30vh] sm:min-h-[30vh] md:min-h-[45vh] h-[100%}" src={image} />
        </div>
      </div>
    </div>
  );
}
