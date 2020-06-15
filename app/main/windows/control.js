const { BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');

let win;
function create() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadURL(
    path.resolve(__dirname, '../../renderer/pages/control/index.html')
  );
}

function send(channel, ...args) {
  win.webContents.send(channel, ...args);
}

module.exports = { create, send };
