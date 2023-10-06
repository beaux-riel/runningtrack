import React, { useState, useEffect, useRef } from "react";

const ScrollingDot = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0.8);
  const [laps, setLaps] = useState(0);
  const pathRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScrollPosition = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPerc = 1 - scrollPosition / maxScrollPosition;

      if (scrollPerc <= 0.01 && scrollPercentage > 0.01) {
        setLaps((prevLaps) => prevLaps + 1);
      }

      setScrollPercentage(scrollPerc);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPercentage]);

  const getPathLength = () => {
    if (pathRef.current) {
      return pathRef.current.getTotalLength();
    }
    return 0;
  };

  const getDotPosition = () => {
    const pathLength = getPathLength();
    const currentLength = scrollPercentage * pathLength;
    if (pathRef.current) {
      const point = pathRef.current.getPointAtLength(currentLength);
      return {
        x: point.x,
        y: point.y,
      };
    }
    return { x: 0, y: 0 };
  };

  const dotPosition = getDotPosition();

  return (
    <div
      style={{
        position: "fixed",
        top: "10%",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "200px",
        height: "200px",
      }}
    >
      <svg
        id="track"
        width="200"
        height="200"
        viewBox="0 0 220 200"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      >
        <g transform="scale(1.2) translate(-20, -20)">
          <path
            ref={pathRef}
            d="m 64.920826,87.413086 h 92.524964 c 14.1599,0 25.55938,14.249354 25.55938,31.949234 0,17.69986 -11.39948,31.94922 -25.55938,31.94922 H 64.920826 c -14.159896,0 -25.55938,-14.24936 -25.55938,-31.94922 0,-17.69988 11.399484,-31.949234 25.55938,-31.949234 z"
            fill="none"
            stroke="#B0B0B0"
            strokeWidth="10"
          />
          <path
            d="m 64.920826,87.413086 h 92.524964 c 14.1599,0 25.55938,14.249354 25.55938,31.949234 0,17.69986 -11.39948,31.94922 -25.55938,31.94922 H 64.920826 c -14.159896,0 -25.55938,-14.24936 -25.55938,-31.94922 0,-17.69988 11.399484,-31.949234 25.55938,-31.949234 z"
            fill="none"
            stroke="#4d4d4d"
            strokeWidth="2"
          />
          <circle cx={dotPosition.x} cy={dotPosition.y} r="5" fill="#FFF" />
        </g>
      </svg>
      <div className="flex flex-col z-10 pt-8">
        <p className="mx-auto text-rayaBrown">You&apos;ve scrolled</p>
        <div className="flex flex-row mx-auto gap-1">
          <p className="mx-auto bg-white text-xl rounded w-8 text-center">{laps}</p>
          <p className="text-sm text-white pt-2 font-bold">{laps === 1 ? "LAP" : "LAPS"}</p>
        </div>
      </div>
    </div>
  );
};

export default ScrollingDot;
