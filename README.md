Click on the "Hangup" button to end the call and close the connection.
Prerequisites
Web browser with support for WebRTC API (e.g., Google Chrome, Mozilla Firefox)
Compatible webcam and microphone for video and audio input
How It Works
The application uses the WebRTC API to establish a peer-to-peer connection between two clients for video communication. Here's a brief overview of the key components and functionalities:

getUserMedia: The navigator.getUserMedia() method is used to access the user's camera and microphone and obtain a media stream.
RTCPeerConnection: Two RTCPeerConnection objects are created, one for each peer, to manage the peer-to-peer connection. ICE candidates are exchanged to establish direct communication between peers.
Offer/Answer Exchange: The initiating peer (caller) creates an offer using createOffer(), sets it as the local description, and sends it to the other peer. The receiving peer (callee) sets the offer as the remote description, creates an answer using createAnswer(), sets it as the local description, and sends it back to the caller.
ICE Candidate Exchange: ICE candidates are exchanged between peers through the onicecandidate event handlers. Each peer adds the received ICE candidates using addIceCandidate() to establish network connectivity.
Media Stream Handling: Video streams from the local and remote peers are displayed in <video> elements on the web page.
