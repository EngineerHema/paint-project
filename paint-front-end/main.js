const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Path to the preload script
            nodeIntegration: false,  // For security, nodeIntegration should be false
            contextIsolation: true,  // Ensures proper isolation between renderer and main process
        },
    });

    mainWindow.loadURL('http://localhost:3000');  // React app URL
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// IPC handler for showing the save file dialog
ipcMain.handle('show-save-dialog', async () => {
    const result = await dialog.showSaveDialog({
        title: 'Save Your File',
        defaultPath: path.join(app.getPath('documents'), 'example.json'),
        filters: [
            { name: 'JSON Files', extensions: ['json'] },
        ],
    });

    if (result.canceled) {
        return null; // Return null if the user cancels the dialog
    }

    return result.filePath;  // Return the chosen file path
});
