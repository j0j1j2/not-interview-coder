import { BrowserWindow, ipcMain } from "electron";

export function registerWindow(mainWindow: BrowserWindow) {
    let windowBound: Electron.Rectangle;
  
    ipcMain.on("start-drag", () => {
      windowBound = mainWindow.getBounds();
    });
  
    ipcMain.on("drag-window", (event, { deltaX, deltaY }) => {
      if (windowBound) {
        mainWindow.setBounds({
          x: windowBound.x + deltaX,
          y: windowBound.y + deltaY,
          width: windowBound.width,
          height: windowBound.height,
        });
      }
      windowBound = mainWindow.getBounds();
    });
  
    ipcMain.on("stop-drag", () => {
      windowBound = mainWindow.getBounds();
    });
  }