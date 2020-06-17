const { app, Menu, Tray } = require('electron');
const { show: showMainWindow } = require('../windows/main');
const path = require('path');
const { create: createAboutWindow } = require('../windows/about');

let tray;

function setTray() {
  tray = new Tray(path.resolve(__dirname, './icon_darwin.png'));

  tray.on('click', () => {
    showMainWindow();
  });

  tray.on('right-click', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '显示',
        click: showMainWindow,
      },
      {
        label: '退出',
        click: app.quit,
      },
    ]);
    tray.popUpContextMenu(contextMenu);
  });
}

function setAppMenu() {
  let appMenu = Menu.buildFromTemplate([
    {
      label: app.name,
      submenu: [
        {
          lable: 'About',
          click: createAboutWindow,
        },
        { type: 'separator' },
        { type: 'services' },
        { type: 'separator' },
        { type: 'hide' },
        { type: 'hideothers' },
        { type: 'unhide' },
        { type: 'separator' },
        { type: 'quit' },
      ],
    },
    { role: 'filename' },
    { role: 'windowMenu' },
    { role: 'editMenu' },
  ]);

  app.applicationMenu = appMenu;
}

app.whenReady().then(() => {
  setTray();
  setAppMenu();
});
