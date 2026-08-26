"use client";

import { useEffect, useRef, useState } from "react";

import { useQuiz } from "@/context/QuizContext";

type YouTubePlayerProps = {
  videoId: string;
  autoPlay?: boolean;
  onReady?: (player: YT.Player) => void;
  onStateChange?: (event: YT.OnStateChangeEvent) => void;
};

export default function YouTubePlayer({
  videoId,
  autoPlay = true,
  onReady,
  onStateChange,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const [isReady, setIsReady] = useState(false);


  const { player, setPlayer, handleStateChange } = useQuiz();





  console.log('videoId', videoId)
  console.log('player', player)

  useEffect(() => {
    if (typeof window === "undefined") return;

    /** Load the script only once */
    const loadYouTubeAPI = () =>
      new Promise<void>((resolve) => {
        // Already loaded?
        if (window.YT?.Player) {
          resolve();
          return;
        }

        // Check if the script already exists
        const existingScript = document.getElementById("youtube-iframe-api");
        if (!existingScript) {
          const script = document.createElement("script");
          script.id = "youtube-iframe-api";
          script.src = "https://www.youtube.com/iframe_api";
          document.body.appendChild(script);
        }

        // Attach ready callback
        const previousCallback = window.onYouTubeIframeAPIReady;
        window.onYouTubeIframeAPIReady = () => {
          previousCallback?.(); // in case something else was waiting
          resolve();
        };
      });

    /** Initialize player after script is ready */
    loadYouTubeAPI().then(() => {
      if (!containerRef.current) return;
      const YTGlobal = window.YT;
      if (!YTGlobal?.Player) return;

      playerRef.current = new YTGlobal.Player(containerRef.current, {
        width: "100%",
        height: "100%",
        aspectRatio: "16/9",
        videoId,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          rel: 0,
          modestbranding: 1,
          controls: 1,
          showinfo: 0,
          enablejsapi: 1,
        },
        events: {
          onReady: (event: YT.PlayerEvent) => {
            setIsReady(true);
            onReady?.(event.target);
            setPlayer(playerRef.current)
          },
          onStateChange: (event: YT.OnStateChangeEvent) => {
            handleStateChange(event);
            onStateChange?.(event);
          },
        },
      });

      
    });

    // Cleanup player when unmounted
    return () => {
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [autoPlay, onReady, onStateChange, videoId, handleStateChange, setPlayer]);

  return (
    <div className="relative aspect-video w-full rounded-2xl shadow-lg">
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0B1317] text-gray-400">
          Loading video...
        </div>
      )}
      <div ref={containerRef} className="rounded-2xl" id={`youtube-player-${videoId}`} />
    </div>
  );
}
