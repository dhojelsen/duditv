options = { live:true,audioOutput:'hdmi', blackBackground:false, disableKeys:true, disableOnScreenDisplay:true};

window.dudiTV.omx.open('tcp.stream',options); //open file

setTimeout(function() {window.dudiTV.omx.setAlpha(100);},3000);
