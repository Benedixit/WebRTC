let localStream, localPeerConnection, remotePeerConnection;

const callButton = document.querySelector("button#call");
const startButton = document.querySelector("button#start");
const hangupButton = document.querySelector("button#hangup");

startButton.disabled = false;
callButton.disabled = true;
hangupButton.disabled = true;

const constraints = { audio: true, video: true };
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

const successCallback = (stream) => {
    localVideo.srcObject = stream;
    localStream = stream;
    callButton.disabled = false;
};

const errorCallback = (error) => {
    console.error("navigator.getUserMedia error:", error);
};

startButton.onclick = () => {
    startButton.disabled = true;
    navigator.getUserMedia(constraints, successCallback, errorCallback);
};

callButton.onclick = () => {
    callButton.disabled = true;
    hangupButton.disabled = false;

    var servers = null;
    localPeerConnection = new RTCPeerConnection(servers);
    remotePeerConnection = new RTCPeerConnection(servers);

    localPeerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            remotePeerConnection.addIceCandidate(event.candidate);
            console.log(event.candidate)
        }
    };

    remotePeerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            localPeerConnection.addIceCandidate(event.candidate);
            console.log(event.candidate)
        }
    };

    remotePeerConnection.ontrack = (event) => {
        remoteVideo.srcObject = event.streams[0];
    };

    localStream.getTracks().forEach((track) => {
        localPeerConnection.addTrack(track, localStream);
    });

    localPeerConnection.createOffer()
        .then((offer) => {
            return localPeerConnection.setLocalDescription(offer);
            console.log(offer)
        })
        .then(() => {
            return remotePeerConnection.setRemoteDescription(localPeerConnection.localDescription);
        })
        .then(() => {
            return remotePeerConnection.createAnswer();
        })
        .then((answer) => {
            return remotePeerConnection.setLocalDescription(answer);
            console.log(answer)
        })
        .then(() => {
            return localPeerConnection.setRemoteDescription(remotePeerConnection.localDescription);
        })
        .catch(onSignallingError);
};

const onSignallingError = (error) => {
    console.error("Signalling error:", error);
};

hangupButton.onclick = () => {
    localPeerConnection.close();
    remotePeerConnection.close();
    localPeerConnection = null;
    remotePeerConnection = null;
    hangupButton.disabled = true;
    callButton.disabled = false;
};
