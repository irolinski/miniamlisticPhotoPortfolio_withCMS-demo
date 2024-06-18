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
  if (loadingState)
    return (
      <div className="flex justify-center translate-y-[35vh] text-grey">
        <ScaleLoader color={"#e3e1e1"} />
      </div>
    );
  return (
    <>
      <div className="flex flex-wrap fade-in-1s mx-auto justify-around md:p-16 pt-4">
        {imageData.map((p: seriesType, i: number) => {
          return (
            <SeriesCard
              imageUrl={p.cover}
              seriesTitle={p.name}
              seriesUrl={p.name.replace(/\s+/g, "-").toLowerCase()}
              key={i}
            />
          );
        })}
      </div>
      <Footer instagramUrl = {instagramUrl} location={location} />
    </>
  );
}
