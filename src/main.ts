import { app, BrowserWindow, globalShortcut, ipcMain, desktopCapturer, session } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { activeWindow } from "get-windows";
import fs from 'node:fs/promises';
const DEVMODE =
  process.env.NODE_ENV === "development" || process.argv.includes("--dev");

let mainWindow: BrowserWindow;
let opacity = 1.0;

if (started) {
  app.quit();
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    opacity,
    focusable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  hideWindow();
  registerShortCuts();
  registerDragMove();

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  if (DEVMODE) {
    mainWindow.webContents.openDevTools();
  }
}

function hideWindow() {
  app.dock.hide();
  mainWindow.setContentProtection(true);
}

function registerShortCuts() {
  globalShortcut.register("CommandOrControl+]", () => {
    opacity = Math.min(1.0, opacity + 0.1);
    mainWindow.setOpacity(opacity);
  });

  globalShortcut.register("CommandOrControl+[", () => {
    opacity = Math.max(0.0, opacity - 0.1);
    mainWindow.setOpacity(opacity);
  });

  globalShortcut.register("CommandOrControl+\\", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });

  globalShortcut.register("CommandOrControl+P", async () => {
    await captureFocusedWidnow();
  });
}

function registerDragMove() {
  let windowBound: Electron.Rectangle;

  ipcMain.on("start-drag", () => {
    console.log("start-drag");
    windowBound = mainWindow.getBounds();
  });

  ipcMain.on("drag-window", (event, { deltaX, deltaY }) => {
    console.log("drag-window", { deltaX, deltaY });
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
    console.log("stop-drag");
    windowBound = mainWindow.getBounds();
  });
}

async function captureFocusedWidnow() { 
  try {
    const activeInfo = await activeWindow();
    const sources = await desktopCapturer.getSources({
      types: ['window'],
      thumbnailSize: { width: activeInfo.bounds.width, height: activeInfo.bounds.height }
    }); 
    const source = sources.filter(s => s.id.split(':').at(1) == activeInfo.id.toString()).at(0);
    return source.thumbnail.toPNG();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// #region lifecycle
app.on("ready", createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
// #endregion
