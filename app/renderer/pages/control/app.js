const peer = require('./peer-control');

peer.on('add-stream', (stream) => {
  play(stream);
});

let video = document.getElementById('screen-video');

function play(stream) {
  let video = document.getElementById('screen-video');
  video.srcObject = stream;
  video.onloadedmetadata = function () {
    video.play();
  };
}

window.onkeydown = function (e) {
  // data {keyCode, meta, alt, ctrl, shift}
  let data = {
    keyCode: e.keyCode,
    shift: e.shiftKey,
    meta: e.metaKey,
    control: e.ctrlKey,
    alt: e.altKey,
  };

  peer.emit('robot', 'key', data);
};

window.onmouseup = function (e) {
  // data {clientX, clientY, screen:{width, height}, video:{width, height}}
  let data = {
    clientX: e.clientX,
    clientY: e.clientY,
    video: {
      width: video.getBoundingClientRect().width,
      height: video.getBoundingClientRect().height,
    },
  };

  peer.emit('robot', 'mouse', data);
};
