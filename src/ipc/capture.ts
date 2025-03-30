import { desktopCapturer, ipcMain } from "electron";
import { activeWindow } from "get-windows";

export async function captureFocusedWindow() { 
  console.log("captureFocusedWindow");
    try {
      const activeInfo = await activeWindow();
      console.log(activeInfo);
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
  

export function registerCapture() {
    ipcMain.handle("capture-focused", async () => {
        captureFocusedWindow();
    });
}