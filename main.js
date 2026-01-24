const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process'); // Thư viện để chạy lệnh hệ thống

function createWindow () {
  const win = new BrowserWindow({
    width: 900,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  win.loadFile('index.html');
}

// Ví dụ một lệnh "tweak" - Dọn dẹp bộ nhớ đệm hệ thống
ipcMain.on('run-tweak', (event, arg) => {
  exec('del /q/f/s %TEMP%\\*', (err, stdout, stderr) => {
    if (err) {
      event.reply('tweak-reply', 'Lỗi rồi đại ca ơi!');
      return;
    }
    event.reply('tweak-reply', 'Đã dọn dẹp xong! Máy mượt như lụa.');
  });
});

app.whenReady().then(createWindow);
