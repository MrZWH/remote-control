const EventEmitter = require('events');
const peer = new EventEmitter();

const { ipcRenderer, desktopCapturer } = require('electron');

peer.on('robot', (type, data) => {
  if (type === 'mouse') {
    data.screen = { width: window.screen.width, height: window.screen.height };
  }

  ipcRenderer.send('robot', type, data);
});

const pc = new window.RTCPeerConnection({});

// onicecandidate iceEvent
// addIceCandidate
pc.onicecandidate = function (e) {
  console.log('candidate', JSON.stringify(e.candidate));
};
let candidates = [];
async function addIceCandidate(candidate) {
  if (candidate) {
    candidates.push(candidate);
  }
  if (pc.remoteDescription && pc.remoteDescription.type) {
    for (let i = 0; i < candidates.length; i++) {
      await pc.addIceCandidate(new RTCIceCandidate(candidates[i]));
    }
    candidates = [];
  }
}
window.addIceCandidate = addIceCandidate;

async function createOffer() {
  const offer = await pc.createOffer({
    offerToReceiveAudio: false,
    offerToReceiveVideo: true,
  });

  await pc.setLocalDescription(offer);
  console.log('pc offer', JSON.stringify(offer));
  return pc.localDescription;
}

createOffer();

async function setRemote(answer) {
  await pc.setRemoteDescription(answer);
}

window.setRemote = setRemote;

pc.onaddstream = function (e) {
  console.log('add-stream', e);
  peer.emit('add-stream', e.stream);
};

module.exports = peer;
