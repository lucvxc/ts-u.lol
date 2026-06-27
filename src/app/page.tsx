"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlayLoud = () => {
      video.muted = false;
      video.volume = 1;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          video.muted = false;
          video.play().catch(() => {});
        });
      }
    };

    tryPlayLoud();

    const onClick = () => tryPlayLoud();
    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onClick);
    window.addEventListener("mousemove", onClick);
    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onClick);
      window.removeEventListener("mousemove", onClick);
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black font-sans">
      <main className="flex flex-1 w-full flex-col items-center justify-center px-6 py-10">
        <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          site dedicated to ts u/nxynigga (nxyy)
        </h1>
        <p className="mt-4 text-sm text-zinc-400">
          funded and developed by{" "}
          <a
            href="https://discord.gg/junebot"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-white underline-offset-4 hover:underline"
          >
            luc
          </a>
        </p>
      </main>
      <div className="w-full flex-1">
        <video
          ref={videoRef}
          src="https://cdn.june.lat/4vwbjs8.mp4"
          autoPlay
          loop
          playsInline
          controls={false}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
