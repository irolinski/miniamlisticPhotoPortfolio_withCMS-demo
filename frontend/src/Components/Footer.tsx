import { useEffect, useState } from "react";

type footerProps = {
  location: string;
  instagramUrl: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}


export default function Footer({ location, instagramUrl}: footerProps) {
  const [onStartPage, setOnStartPage] = useState(false);

  useEffect(() => {
    location.includes("start") ? setOnStartPage(true) : setOnStartPage(false);
  });

  return (
    <footer
      className={classNames(
        onStartPage ? "xl:hidden" : "",
        "bg-transparent py-12 px-4 w-full bottom-0 fade-in-3s"
      )}
    >
      {instagramUrl !== "" && (
        <a href={instagramUrl} target="_blank">
          <img
            src="icons/instagram.svg"
            className="block h-8 w-8 mx-auto fade-in-3s"
            aria-hidden="true"
          />
        </a>
      )}
    </footer>
  );
}
