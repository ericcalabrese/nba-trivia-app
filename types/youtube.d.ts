declare global {
  namespace YT {
    const PlayerState: {
      ENDED: -1;
      PLAYING: 1;
      PAUSED: 2;
      BUFFERING: 3;
      CUED: 5;
    };
    type PlayerVars = {
      autoplay?: 0 | 1;
      rel?: 0 | 1;
      modestbranding?: 0 | 1;
      controls?: 0 | 1;
      showinfo?: 0 | 1;
      enablejsapi?: 0 | 1;
    };

    interface PlayerEvent {
      target: Player;
    }

    interface OnStateChangeEvent extends PlayerEvent {
      data: number;
    }

    interface PlayerOptions {
      width?: number | string;
      height?: number | string;
      aspectRatio?: string;
      videoId: string;
      playerVars?: PlayerVars;
      events?: {
        onReady?: (event: PlayerEvent) => void;
        onStateChange?: (event: OnStateChangeEvent) => void;
      };
    }

    class Player {
      constructor(element: HTMLElement, options?: PlayerOptions);
      playVideo(): void;
      pauseVideo(): void;
      getCurrentTime(): number;
      getPlayerState(): number;
      destroy(): void;
    }
  }

  interface Window {
    YT?: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export {};
  