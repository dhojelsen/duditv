// getting node scope
const remote = require('electron').remote;

// register remotely initialized libs
window.dudiTV = {};
window.dudiTV.screenSize = remote.getGlobal('screenSize');
window.dudiTV.cec = remote.getGlobal('cec');
window.dudiTV.omx = remote.getGlobal('omx');

require('./player.js');
require('./cec.js');
