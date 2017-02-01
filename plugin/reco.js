// Load Network
var net = new convnetjs.Net();
net.fromJSON(json);

// Get Captcha Image
imgs = document.getElementsByTagName("img");

var c = document.createElement("canvas");
var cxt = c.getContext("2d");

var wc = document.createElement("canvas");
var wcxt = wc.getContext("2d");

cxt.drawImage(imgs[1],0,0);
var canvasData = cxt.getImageData(0, 0, 100, 40);

// Initialize Data Array
var data = new Array();
for(var i=0; i<5; i++) {
	data[i] = new Array();
	for(var j=0; j<800; j++) { data[i][j] = 0.0; }
}

var letterDetected = 0;
var pixelDetected = 0;
var count = 0;
var start = 0;
var end = 0;
var width = 0;
var temp = 0;
var cnt = 0;
var left = 0;
var right = 0;

var alphabet = "abcdefghijklmnopqrstuvwxyz";

// Cut Image
for (var x = 0; x < canvasData.width; x++) {
  pixelDetected = 0;
  for ( var y = 0; y < canvasData.height; y++) {

    // Scan Image By Column
    var idx = (x + y * canvasData.width) * 4;
    var r = canvasData.data[idx + 0];
    var g = canvasData.data[idx + 1];
    var b = canvasData.data[idx + 2];
    var gray = .299 * r + .587 * g + .114 * b;
    if(gray < 200) {
      var bin = 0;
      pixelDetected = 1;
    }
    else {var bin = 255;}

    // Binaryzation
    canvasData.data[idx + 0] = bin; // Red channel
    canvasData.data[idx + 1] = bin; // Green channel
    canvasData.data[idx + 2] = bin; // Blue channel
    canvasData.data[idx + 3] = 255; // Alpha channel
  }

  // If Pixel Detected, Mark Letter Start Point
  if(pixelDetected == 1 && letterDetected == 0) {
    start = x;
    letterDetected = 1;
    pixelDetected = 0;
  }

  // If Letter Finished, Cut The Letter Off
  else if(pixelDetected == 0 && letterDetected == 1) {

    // Initialize Letter Image
    var w = wcxt.createImageData(20, 40);
    for(var i=0; i<3200; i+=4) {
      w.data[i] = 255;
      w.data[i+1] = 255;
      w.data[i+2] = 255;
      w.data[i+3] = 255;
    }

    // Try To Fix Two-Letter Errors
    end = x;
    width = end - start;
    temp = width;
    cnt = 1;
    while(temp>20) {
      cnt = cnt + 1;
      temp = Math.round(width / cnt);
    }
    width = temp;

    // Cut It !
    for(var sep = 0; sep < cnt; sep ++) {
      left = Math.round((20 - width) / 2);
      right = left + width
      for(var lx=0; lx<width; lx++) {
        for(var ly=0; ly<40; ly++) {
          if(canvasData.data[(start + lx + ly * canvasData.width) * 4] == 0) {
            data[count][left + lx + ly * 20] = 255.0;
            w.data[(left + lx + ly * 20) * 4] = 0;
            w.data[(left + lx + ly * 20) * 4 + 1] = 0;
            w.data[(left + lx + ly * 20) * 4 + 2] = 0;
          }
        }
      }
      count ++;
      start = start + width;
    }
    letterDetected = 0;
    start = 0;
    end = 0;

    wcxt.putImageData(w, 0, 0);

    // Uncommend This Line, You can See The Individual Letters
    //document.getElementById("login-form").appendChild(wc);
  }
}

// Sometimes The Last Column Is Still Engadged
if(letterDetected == 1) {
  var w = wcxt.createImageData(20, 40);
    for(var i=0; i<3200; i+=4) {
      w.data[i] = 255;
      w.data[i+1] = 255;
      w.data[i+2] = 255;
      w.data[i+3] = 255;
    }

    end = canvasData.width;
    width = end - start;
    temp = width;
    cnt = 1;
    while(temp>20) {
      cnt = cnt + 1;
      temp = Math.round(width / cnt);
    }
    width = temp;
    for(var sep = 0; sep < cnt; sep ++) {
    left = Math.round((20 - width) / 2);
    right = left + width
    for(var lx=0; lx<width; lx++) {
      for(var ly=0; ly<40; ly++) {
        if(canvasData.data[(start + lx + ly * canvasData.width) * 4] == 0) {
          data[count][left + lx + ly * 20 + 1] = 255.0;
          w.data[(left + lx + ly * 20) * 4] = 0;
          w.data[(left + lx + ly * 20) * 4 + 1] = 0;
          w.data[(left + lx + ly * 20) * 4 + 2] = 0;
        }
      }
    }
    count ++;
    start = start + width;
  }
  letterDetected = 0;
  start = 0;
  end = 0;

  wcxt.putImageData(w, 0, 0);
  //document.getElementById("login-form").appendChild(wc);
}


// Predict The Letter
for(var i=0; i<count; i++) {
  image = new convnetjs.Vol(40, 20, 1);
  image.w = data[i];
  probe = net.forward(image);
  score = 0;
  index = 0;
  for(var j=0; j<26; j++){
    if(probe.w[j]>score){
      score = probe.w[j];
      index = j;
    }
  }
  document.getElementById("captcha").value = document.getElementById("captcha").value + alphabet.charAt(index);
}
