const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Web của Phúc - Admin Gia Phúc"
  })
  win.loadFile('index.html') // Nó sẽ mở file web của cậu lên
}

app.whenReady().then(createWindow)
