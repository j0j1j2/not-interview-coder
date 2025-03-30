import './view/main'
import "./index.css";

let dragging = false;
let startX: number, startY: number;

document.addEventListener("mousedown", (e) => {
  if (e.shiftKey) {
    dragging = true;
    startX = e.screenX;
    startY = e.screenY;
    window.win.startDrag();
  }
});

document.addEventListener("mousemove", (e) => {
  if (dragging) {
    window.win.dragWindow(e.screenX - startX, e.screenY - startY);
    startX = e.screenX;
    startY = e.screenY;
  }
});

document.addEventListener("mouseup", () => {
  if (dragging) {
    dragging = false;
    window.win.stopDrag();
  }
});
