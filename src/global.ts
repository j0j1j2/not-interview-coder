export {};

declare global {
  interface Window {
    move: {
      startDrag: () => void;
      dragWindow: (deltaX: number, deltaY: number) => void;
      stopDrag: () => void;
    };
    capture: {
      captureFocused: () => void;
    };
  }
}
