

// -------------------------------------------------------------------------- //
//- CEC EVENT HANDLING
window.dudiTV.cec.once( 'ready', function(client) {
  client.sendCommand( 0xf0, CEC.Opcode.GIVE_DEVICE_POWER_STATUS );
});



window.dudiTV.cec.on( 'USER_CONTROL_PRESSED', function(packet) {
  document.getElementById('data').innerHTML = 'User pressed ' + packet.args;
});


// -------------------------------------------------------------------------- //
//- START CEC CLIENT

// -d8 = set log level to 8 (=TRAFFIC) (-d 8)
// -br = logical address set to `recording device`
// RPI = device
window.dudiTV.cec.start( 'cec-client', '-d', '8' );
