const { ipcRenderer } = require("electron");

const { contextBridge } = require("electron");

console.log("Preload Here");

contextBridge.exposeInMainWorld("electron", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
});
