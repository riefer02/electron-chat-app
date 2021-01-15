// Main Process
const { app, BrowserWindow, Notification, ipcMain } = require("electron");
const isDev = !app.isPackaged;
const path = require("path");

function createWindow() {
  // Browser Window <- Renderer Process
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#c2e1c2",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  window.loadFile("index.html");
  isDev && window.webContents.openDevTools();

  //   window.webContents.once("dom-ready", () => {
  //     const notification = new Notification({
  //       title: "Hello World",
  //       body: "My first electron application!",
  //     });
  //     notification.show();
  //   });
}

console.log(isDev);
if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

app.whenReady().then(() => {
  createWindow();
});

ipcMain.on("notify", (_, message) => {
  new Notification({
    title: "Notification",
    body: message,
  }).show();
});

app.on("window-all-closed", () => {
  if (process.platform !== "win32") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Chromium -> Web Engine for rendering the UI, full Chrome web browser with the removal of the Google Excess
// V8 -> Engine that provies capabilities to execute, run JS code in the browser
// Node JS(V8) -> we able to run JS code + provide more features

// Webpack -> is a module builder, main purpose is to bundle JS files for usage in browser
// Babel ->  JS compiler

console.log("Hello World!");
console.log(process.platform);
