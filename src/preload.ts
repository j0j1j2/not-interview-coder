import { contextBridge, ipcRenderer } from "electron";

// Expose the ipcRenderer to the renderer process safely.
contextBridge.exposeInMainWorld("win", {
  startDrag: () => ipcRenderer.send("start-drag"),
  dragWindow: (deltaX: number, deltaY: number) => ipcRenderer.send("drag-window", { deltaX, deltaY }),
  stopDrag: () => ipcRenderer.send("stop-drag"),
  resizeWindow: (width: number, height: number) => ipcRenderer.send("resize-window", { width, height }),
});

contextBridge.exposeInMainWorld("capture", {
  captureFocused: () => ipcRenderer.invoke("capture-focused"),
});

contextBridge.exposeInMainWorld("store", {
  getOpenAiApiKey: () => ipcRenderer.invoke("get-openai-api-key"),
  setOpenAiApiKey: (apiKey: string) => ipcRenderer.invoke("set-openai-api-key", apiKey),
});
