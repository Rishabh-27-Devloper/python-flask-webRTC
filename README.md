# Real-time Video Calling App

![Python](https://img.shields.io/badge/Python-3.10-blue)
![Flask](https://img.shields.io/badge/Flask-Web%20Framework-yellow)
![Socket.IO](https://img.shields.io/badge/Socket.IO-WebSocket-green)
![PeerJS](https://img.shields.io/badge/PeerJS-WebRTC-purple)
![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey)

## Overview

This is a simple **real-time video calling web application** built with Flask, WebSockets (via Socket.IO), and WebRTC (via PeerJS). Each user gets a unique room ID and can join a room to start a peer-to-peer video call. The UI is basic and mirrors front camera videos for a natural feel.

## Features

* Peer-to-peer video calling with WebRTC (via PeerJS)
* Real-time user connection management using Flask-SocketIO
* Room ID generation and routing
* Switch between front/back camera
* Share screen
* Simple and responsive UI with video grid

## Tech Stack

* **Backend**: Python, Flask, Flask-SocketIO
* **Frontend**: HTML, CSS, JavaScript
* **WebRTC**: PeerJS
* **Real-time Signaling**: Socket.IO

## Project Structure

```
├── run.py               # Flask server with WebSocket support
├── templates/
│   └── index.html       # HTML template rendered per room ID
├── static/
│   └── script.js        # Client-side WebRTC logic and Socket.IO communication
```

## Getting Started

### Prerequisites

* Python 3.7+
* Node.js (for local development and package usage like `peerjs-server`, if used)

### Installation

1. Clone the repo:

```bash
git clone https://github.com/Rishabh-27-Devloper/python-flask-webRTC.git
cd python-flask-webRTC
```

2. Install dependencies:

```bash
pip install flask flask-socketio
```

3. Run the server:

```bash
python run.py
```

4. Open your browser and navigate to `http://localhost:5000` — it will generate a new room.

## Room Joining

Each room has a unique ID like `abcd-wxyz-1234-efgh` generated on page load. Share this URL to connect with other peers.

## Controls

* **Mute/Unmute** – Mutes or unmutes your local video
* **Switch Video** – Toggle between front and rear camera
* **Show Screen** – Share your screen with others

## License

This project is licensed under the MIT License.

## Future Improvements

* Add chat/messaging
* Improved UI/UX
* Participant limit and room management

## Author

Made with ❤ by [Prakhar Shukla](https://github.com/Rishabh-27-Devloper)
