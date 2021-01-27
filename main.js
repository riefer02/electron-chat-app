// Main Process
const {
  app,
  BrowserWindow,
  Notification,
  ipcMain,
  Menu,
  Tray,
} = require('electron');
const isDev = !app.isPackaged;
const path = require('path');

const dockIcon = path.join(__dirname, 'assets', 'images', 'react_app_logo.png');
const trayIcon = path.join(__dirname, 'assets', 'images', 'react_icon.png');

function createSplashWindow() {
  // Browser Window <- Renderer Process
  const window = new BrowserWindow({
    width: 400,
    height: 200,
    backgroundColor: '#6e707e',
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
    },
  });

  window.loadFile('splash.html');
  return window;
}

function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: '#6e707e',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  window.loadFile('index.html');
  isDev && window.webContents.openDevTools();
  return window;
}

console.log(isDev);
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
  });
}

if (process.platform === 'darwin') {
  app.dock.setIcon(dockIcon);
}
let tray = null;
app.whenReady().then(() => {
  const template = require('./utils/Menu').createTemplate(app);
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  tray = new Tray(trayIcon);
  tray.setContextMenu(menu);
  const splash = createSplashWindow();
  const mainApp = createWindow();

  mainApp.once('ready-to-show', () => {
    // splash.destroy();
    // mainApp.show();
    setTimeout(() => {
      splash.destroy();
      mainApp.show();
    }, 1000);
  });
});

ipcMain.on('notify', (_, message) => {
  new Notification({
    title: 'Notification',
    body: message,
  }).show();
});

ipcMain.on('app-quit', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'win32') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Chromium -> Web Engine for rendering the UI, full Chrome web browser with the removal of the Google Excess
// V8 -> Engine that provies capabilities to execute, run JS code in the browser
// Node JS(V8) -> we able to run JS code + provide more features

// Webpack -> is a module builder, main purpose is to bundle JS files for usage in browser
// Babel ->  JS compiler

console.log('Hello World!');
console.log(process.platform);
