const socket = io('/');
console.log("roomID = "+roomID);
const mediaConstraints = {
    audio: true,
    video: {facingMode: 'user'}
};
let mediaStream;
function genID(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const userID = genID(10);
const myPeer = new Peer(userID,{
    initiator: true,
    trickle: false,
    config: {
      iceServers: [
        {
          urls: 'turn:freelecture.online',
          username: 'username',
          credential: 'password'
        }
      ]
    }
  });
myPeer.on('open', (id) => {
    socket.emit('join-room', roomID,userID);
    console.log('Connected to Peer server. ID:', id);
});


navigator.mediaDevices.getUserMedia(mediaConstraints)
    .then(stream =>{
        mediaStream = stream;
        addVideoStream(myVideo,stream);
    })

myPeer.on('call', call =>{
    call.answer(mediaStream);
    const video = document.createElement('video');
    video.muted = false;
    call.on('stream', userVideo =>{
        addVideoStream(video,userVideo)
    })
})

function addVideoStream(video,stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () =>{
        video.play();
        if (mediaConstraints.video.facingMode === 'user') {
            video.classList.add('mirror'); // Apply mirror effect for front camera
        }else {
        video.classList.remove('mirror'); // Remove mirror effect for back camera
            }
    })
    videoGrid.append(video);
}
function switchScreen(){
    mediaStream.getTracks().forEach(track => {
        track.stop();
    });
    mediaConstraints.video.facingMode = 'environment';
    navigator.mediaDevices.getDisplayMedia(mediaConstraints)
    .then(stream =>{
        mediaStream = stream;
        addVideoStream(myVideo,stream);
    })
}
function switchCamera() {
    // Stop the current stream
    mediaStream.getTracks().forEach(track => {
        track.stop();
    });

    // Toggle between 'user' (front camera) and 'environment' (back camera)
    mediaConstraints.video.facingMode = (mediaConstraints.video.facingMode === 'user') ? 'environment' : 'user';

    // Request new stream with updated constraints
    navigator.mediaDevices.getUserMedia(mediaConstraints)
        .then(stream => {
            mediaStream = stream;
            addVideoStream(myVideo, stream);
        })
        .catch(error => {
            console.error('Error switching camera:', error);
        });
}

function connectToNewUser(userId,stream){
    const call = myPeer.call(userId,stream);
    const video = document.createElement('video');
    video.muted = false;
    call.on('stream', userVideo =>{
        addVideoStream(video,userVideo)
    })
    call.on('close' ,() =>{
        video.remove();
    })
}

socket.on('user-connected', otherUserID =>{
    if (otherUserID != userID){
        console.log("New User: "+otherUserID);
        connectToNewUser(otherUserID,mediaStream);
    }
})

