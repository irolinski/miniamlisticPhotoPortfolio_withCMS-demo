import { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import Footer from "../../Components/Footer";
import { apiUrl } from "../../App";

type aboutProps = {
  instagramUrl: string;
  location: string;
}

type aboutData = {
  role: string;
  profile_picture_url: string;
  description: string;
  phone_num: string;
  e_mail: string;
  instagramUrl: string;
  location: string;
};

export default function AboutPage({instagramUrl, location}: aboutProps) {
  const [aboutData, setAboutData] = useState<aboutData>();
  const [loadingState, setLoadingState] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const aboutmeAPIRes = await fetch(
        `${apiUrl}/about-me`
      );
      const data = await aboutmeAPIRes.json();
      setAboutData(data);
      setLoadingState(false);
    })();
  }, []);
  if (loadingState)
    return (
      <div className="flex justify-center translate-y-[35vh] text-grey">
        <ScaleLoader color={"#e3e1e1"} />
      </div>
    );
  return (
    <>
      <div className="flex flex-wrap fade-in-1s mx-auto justify-around sm:p-16 mb-36 mt-24 lg:my-0 lg:py-[8vh] lg:flex-nowrap">
        <img
          className="fade-in-2s max-w-96 max-h-96 py-8 px-16 lg:px-16 mx-auto self-center xs:-translate-y-12 lg:-translate-y-0 hover:cursor-none"
          src={aboutData?.profile_picture_url}
        />
        <div className="about-text font-header py-10 px-8 sm:px-12 lg:p-10 my-1 lg:my-4">
          <p className="fade-in-1s pt-16 text-md md:px-16 lg:py-8 lg:px-24">
            <span className="text-justify whitespace-pre-line">
              {aboutData?.description}
            </span>
            <span className="flex pt-2">
              <img
                src="/icons/phone.svg"
                className="block self-center h-5 w-5"
                aria-hidden="true"
              />
              &nbsp; {aboutData?.phone_num} <br />
            </span>
            <span className="flex pt-1">
              <img
                src="/icons/mail.svg"
                className="block self-center h-5 w-5 translate-y-[1px]"
                aria-hidden="true"
              />{" "}
              <a href="mailto:pola.brogosiewicz@gmail.com">
                &nbsp; {aboutData?.e_mail}
              </a>
            </span>
          </p>
        </div>
      </div>
      <Footer instagramUrl={instagramUrl} location={location} />
    </>
  );
}
