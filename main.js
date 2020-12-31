// Main Process
const { app, BrowserWindow, Notification } = require("electron");
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
      // will sanitize JS code
      // ToDo: explain when React application is initialized
      worldSafeExecuteJavaScript: true,
      // is a feature that ensures that both, your preload scripts and Electron
      // internal logical run in separate context
      contextIsolation: true,
    },
  });

  window.loadFile("index.html");
  isDev && window.webContents.openDevTools();

  window.webContents.once("dom-ready", () => {
    // const notification = new Notification({
    //   title: "Hello World",
    //   body: "My first electron application!",
    // });
    // notification.show();
  });
}

if (isDev) {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "node_modules", ".bin", "electron"),
  });
}

app.whenReady().then(() => {
  createWindow();
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

// Chromium -> Web Engine for rendering the UI, full Chrome-like web browser
// V8 -> Engine that provies capabilities to execute, run JS code in the browser
// Node JS(V8) -> we able to run JS code + provide more features

// Webpack -> is a module builder, main purpose is to bundle JS files for usage in browser
// Babel ->  JS compiler

console.log("Hello World!");
console.log(process.platform);
