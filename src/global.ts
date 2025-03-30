export {};

declare global {
  interface Window {
    capture: {
      captureFocused: () => void;
    };
    store: {
      getOpenAiApiKey: () => Promise<string>;
      setOpenAiApiKey: (apiKey: string) => Promise<void>;
    };
    win: {
      resizeWindow: (width: number, height: number) => void;
      startDrag: () => void;
      dragWindow: (deltaX: number, deltaY: number) => void;
      stopDrag: () => void;
      onInputEvent: (callback: (input: any) => void) => void;
    };
  }
}
