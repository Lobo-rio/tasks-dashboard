const path = require('path');

// Try to load electron module with error handling
let electron;
try {
  electron = require('electron');
} catch (error) {
  console.error('Failed to load electron module:', error);
  process.exit(1);
}

const { app, BrowserWindow, ipcMain } = electron;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  const devUrl = 'http://localhost:5175';
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else if (!app.isPackaged) {
    win.loadURL(devUrl);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

if (app) {
  app.whenReady().then(createWindow);

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Handle quit request from renderer
  ipcMain.on('quit-app', () => {
    app.quit();
  });
} else {
  console.error('Electron app is not available');
  process.exit(1);
}
