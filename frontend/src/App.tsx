import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import "./App.scss";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import StartPage from "./Pages/Projects/StartPage.tsx";
import AllProjects from "./Pages/Projects/AllProjects";
import ProjectPage from "./Pages/Projects/ProjectPage.tsx";
import AboutPage from "./Pages/Projects/AboutPage.tsx";
import { useEffect, useState } from "react";

export const baseUrl = "/photoportfolio_cms-demo"

export type seriesType = {
  name: string;
  slides: Array<string>;
  url: string;
  cover: string;
};

export type dataType = Array<seriesType>;

export default function App() {
  const location = useLocation();

  const blankData: any[] | (() => any[]) = [];

  let [imageData, setImageData] = useState<any[]>(blankData);
  const [instagramUrl, setInstagramUrl] = useState<string>("");
  const [imgsLoadingState, setImgsLoadingState] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const seriesAPIRes = await fetch(
        "https://miniamlistic-photo-portfolio-with-cms-demo-czkay78p5.vercel.app/api/series"
      );
      const profileAPIRes = await fetch(
        "https://miniamlistic-photo-portfolio-with-cms-demo-czkay78p5.vercel.app/api/about-me"
      );
      const series = await seriesAPIRes.json();
      const profile = await profileAPIRes.json();

      setImageData(series);
      setInstagramUrl(profile.instagram_url);
      setImgsLoadingState(false);
    })();
  }, []);

  return (
    <>
    <div className="min-h-full max-w-[1920px] mx-auto relative 3xl:top-[12.5vh]">
      <Navbar location={location.pathname} />
      <div className="">
        <Routes>
          <Route path="/" element={<Navigate replace to="/start" />} />
          <Route
            path="/start"
            element={<StartPage instagramUrl={instagramUrl} loadingState={imgsLoadingState} />}
          />
          <Route
            path="/projekty"
            element={<AllProjects imageData={imageData} loadingState={imgsLoadingState} />}
          />
          {imageData.map((p: seriesType, i: number) => {
            return (
              <Route
                path={`/projekty/${p.name.replace(/\s+/g, "-").toLowerCase()}`}
                element={<ProjectPage name={p.name} slides={p.slides} />}
                key={i}
              />
            );
          })}
          <Route path="/o-mnie" element={<AboutPage />} />
          <Route path="*" element={<Navigate replace to="/start" />} />
        </Routes>
      </div>
    </div>
    <Footer location={location.pathname} instagramUrl={instagramUrl} />
    </ >

  );
}
