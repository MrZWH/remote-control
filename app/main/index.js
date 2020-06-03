const { app } = require('electron');
const path = require('path');

const handleIPC = require('./ipc');
const { create: createMainWindow } = require('./windows/main');

app.on('ready', () => {
  createMainWindow();
  handleIPC();
});
