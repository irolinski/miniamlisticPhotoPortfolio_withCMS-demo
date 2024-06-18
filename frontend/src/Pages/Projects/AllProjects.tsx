import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { dataType, seriesType } from "../../App";
import SeriesCard from "../../Components/Projects/ProjectCard";
import Footer from "../../Components/Footer";

type dataProp = {
  imageData: dataType;
  instagramUrl: string;
  loadingState: boolean;
  location: string;
};

export default function AllProjects({ imageData, instagramUrl, loadingState, location }: dataProp) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  useEffect(() => {
    if (loadingCount === imageData.length) {
      setImagesLoaded(true);
    }
  }, [loadingCount, imageData.length]);

  const handleImageLoad = () => {
    setLoadingCount((prevCount) => prevCount + 1);
  };

  if (loadingState || !imagesLoaded)
    return (
      <div className="flex justify-center translate-y-[35vh] text-grey">
        <ScaleLoader color={"#e3e1e1"} />
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap fade-in-1s mx-auto justify-around md:p-16 pt-4">
        {imageData.map((p: seriesType, i: number) => (
          <div key={i} style={{ display: 'none' }}>
            <img src={p.cover} onLoad={() => handleImageLoad()} alt={p.name} />
          </div>
        ))}
        {imageData.map((p: seriesType, i: number) => (
          <SeriesCard
            imageUrl={p.cover}
            seriesTitle={p.name}
            seriesUrl={p.name.replace(/\s+/g, "-").toLowerCase()}
            key={i}
          />
        ))}
      </div>
      <Footer instagramUrl={instagramUrl} location={location} />
    </>
  );
}
