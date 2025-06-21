from flask import Flask,redirect , render_template, request, jsonify
import random, string
from flask_socketio import SocketIO, emit, join_room
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
# Dictionary to store peer connections
peer_connections = {}

def genRoom():
    id = "-".join("".join(random.choice(string.ascii_letters + string.digits) for i in range(4)) for j in range(4))
    return id

@app.route('/')
def index():
    roomID = genRoom()
    return redirect(f"/room/{roomID}")

@app.route('/room/<roomID>')
def room(roomID):
    return render_template('index.html',roomID=roomID)

# Endpoint for signaling - handles offer, answer, and ICE candidates
@app.route('/signaling', methods=['POST'])
def signaling():
    data = request.json
    peer_id = data['peer_id']
    signal = data['signal']

    if peer_id in peer_connections:
        # Forward signaling message to the corresponding peer
        peer_connections[peer_id].send(signal)

    return jsonify({'status': 'success'})

# Endpoint for creating peer connection
@app.route('/create_connection', methods=['POST'])
def create_connection():
    data = request.json
    peer_id = data['peer_id']
    peer_connections[peer_id] = request.websocket

    # Send acknowledgment
    peer_connections[peer_id].send('Connection established.')

    return jsonify({'status': 'success'})

@socketio.on('join-room')
def connection(roomID, userID):
    print(roomID+" --> "+userID)
    join_room(roomID)
    emit('user-connected',userID,room=roomID,broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
