import { app, BrowserWindow, globalShortcut, ipcMain, desktopCapturer } from "electron";
import path from "node:path";
import started from "electron-squirrel-startup";
import { registerWindow } from "./ipc/window";
import { registerStore } from "./ipc/store";
import { captureFocusedWindow, registerCapture } from "./ipc/capture";

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
    transparent: true,
    opacity: opacity,
    hasShadow: false,
    focusable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  app.dock.hide();
  mainWindow.setContentProtection(true);
  mainWindow.setIgnoreMouseEvents(false, { forward: true });
  registerShortCuts();
  registerWindow(mainWindow);
  registerStore(mainWindow);
  registerCapture();

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools({
      mode: "detach",
    });
  }
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
    await captureFocusedWindow();
  });
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
