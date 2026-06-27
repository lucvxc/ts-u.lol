"use client";

import { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlayLoud = () => {
      video.volume = 1;
      video.muted = false;
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    };

    tryPlayLoud();

    const onInteract = () => {
      tryPlayLoud();
      window.removeEventListener("click", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
    window.addEventListener("click", onInteract);
    window.addEventListener("keydown", onInteract);
    window.addEventListener("touchstart", onInteract);
    return () => {
      window.removeEventListener("click", onInteract);
      window.removeEventListener("keydown", onInteract);
      window.removeEventListener("touchstart", onInteract);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-black font-sans">
      <main className="flex flex-col items-center justify-center px-4 pt-4">
        <h1 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
          site dedicated to ts u/nxynigga (nxyy)
        </h1>
        <p className="mt-2 text-xs text-zinc-400 sm:text-sm">
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
      <div className="flex flex-1 items-center justify-center w-full overflow-hidden">
        <video
          ref={videoRef}
          src="https://cdn.june.lat/4vwbjs8.mp4"
          autoPlay
          loop
          playsInline
          controls={false}
          className="max-h-[70vh] max-w-full object-contain"
        />
      </div>
      <footer className="flex flex-col items-center justify-center gap-2 pb-4">
        <p className="text-xs text-zinc-400">
          click anywhere to hear audio btw.
        </p>
        <a
          href="https://github.com/lucvxc/ts-u.lol"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors hover:text-zinc-400"
        >
          <FaGithub className="h-6 w-6" />
        </a>
      </footer>
    </div>
  );
}