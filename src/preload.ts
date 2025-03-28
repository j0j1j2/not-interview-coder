import { contextBridge, ipcRenderer } from "electron";

// Expose the ipcRenderer to the renderer process safely.
contextBridge.exposeInMainWorld("move", {
  startDrag: () => ipcRenderer.send("start-drag"),
  dragWindow: (deltaX: number, deltaY: number) =>
    ipcRenderer.send("drag-window", { deltaX, deltaY }),
  stopDrag: () => ipcRenderer.send("stop-drag"),
});

contextBridge.exposeInMainWorld("capture", {
  captureFocused: () => ipcRenderer.send("capture-focused"),
});
