declare module 'jsmpeg' {
  interface PlayerOptions {
    canvas?: HTMLCanvasElement;
    autoplay?: boolean;
    loop?: boolean;
    audio?: boolean;
    video?: boolean;
    preserveDrawingBuffer?: boolean;
    progressive?: boolean;
    throttled?: boolean;
    disableGl?: boolean;
  }

  export default class JSMpegPlayer {
    constructor(
      source: WebSocket | ArrayBuffer | Uint8Array,
      options?: PlayerOptions
    );

    play(): void;
    pause(): void;
    stop(): void;
    destroy(): void;
    canvas: HTMLCanvasElement;
    volume: number;
    currentTime: number;
    duration: number;
    source: any;
  }
}
