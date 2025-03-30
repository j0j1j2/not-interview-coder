import { BrowserWindow, ipcMain } from "electron";
import store from "src/store";

export function registerStore(_mainWindow: BrowserWindow) {
    ipcMain.handle('get-openai-api-key', () => {
        console.log("get-openai-api-key:::");
        return undefined;
    });
  
    ipcMain.handle('set-openai-api-key', (event, apiKey: string) => {
        console.log("set-openai-api-key:::", apiKey);
        return undefined;
    });
  }
  