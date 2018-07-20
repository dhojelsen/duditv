// simple app example
const electron = require('electron'),
      app = electron.app,
      BrowserWindow = electron.BrowserWindow,
      omx = require('./utils/omxplayer-dbus/omxplayer.js'),
      cec = new (require('node-cec').NodeCec)( 'DudiTV' );

// ignore gpu errors
app.commandLine.appendSwitch('--ignore-gpu-blacklist');

// once the app is ready
app.once('ready', () => {

  const screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
  
  //registering global libraries for access within browser window
  global.omx = omx;
  global.cec = cec;

  this.window = new BrowserWindow({
    backgroundColor: '#000000',
    frame: false,
    fullscreen: true,
    x: 0,
    y: 0,
    width: screenSize.width,
    height: screenSize.height
  });

  this.window
    .once('closed', () => {
      this.window = null;
      // quit omx
      if ( omx != null ) {
        omx.quit();
      }
      // quit cec
      if ( cec != null ) {
        cec.stop();
      }
    })
    .loadURL('file://' + process.cwd() + '/index.html');

  // for debugging purpose, it might be handy to be able
  // to reload the window simply via `touch ~/app/reload`
  require('fs').watch('reload', () => app.quit());

});
