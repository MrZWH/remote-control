const { app } = require('electron');
const path = require('path');

const handleIPC = require('./ipc');
const {
  create: createMainWindow,
  show: showMainWindow,
  close: closeMainWindow,
} = require('./windows/main');
// const { create: createControlWindow } = require('./windows/control');

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  qpp.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时，将会聚焦到 myWindow 这个窗口
    showMainWindow();
  });
  app.on('ready', () => {
    createMainWindow();
    // createControlWindow();
    handleIPC();
    require('./trayAndMenu');
    require('./robot.js');
  });
  app.on('before-quit', () => {
    closeMainWindow();
  });
  app.on('activate', () => {
    showMainWindow();
  });
}
