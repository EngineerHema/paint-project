const { contextBridge, ipcRenderer } = require('electron');

// Expose saveFile method to the renderer process
contextBridge.exposeInMainWorld('electron', {
  saveFile: async () => {
    // Request the main process to show the save file dialog
    return await ipcRenderer.invoke('show-save-dialog');
  },
});
