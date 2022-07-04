import { store } from '../store';
import { setLocalStream, setRemoteStreams } from '../store/room';
import Peer from 'simple-peer';
import { signalPeerData } from '../socket/socketConnection';

const peers = {};

const getConfiguration = () =>{
    const turnIceServers = null;

    if (turnIceServers) {
        //* use TURN server credentials
    }
    else{
        console.warn('Using only STUN server');
        //*basically i dont need stun server for local network


        // In short STUN server is needed the large majority of the time
        //  when the two parties are not on the same network
        //  (to get valid connection candidates for peer-to-peer media streaming) 
        //  and a signalling server is ALWAYS needed(whether they are on different networks or not) 
        //  so that the negotiation and connection build up can take place.

        return{
            iceServers:[
                {urls:'stun:stun.l.google.com:19302'}
            ]
        }
    }
}

export const getLocalStreamPreview = async(onlyAudio = false, cb) =>{

    const onlyAudioConstraints = {
        audio:true,
        video:false,
    };

    const defaultConstraints = {
        audio:true,
        video:true
    }
    
    const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

    try{
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        store.dispatch(setLocalStream(stream))
        cb();
    }catch(e){
        console.log(e);
    }

}

export const prepareNewPeerConnection = (socketIdConnection, isInitiator) => {
    const localStream = store.getState().room.localStream;

    peers[socketIdConnection] = new Peer({
        initiator:isInitiator,
        config:getConfiguration(),
        stream:localStream//*this is the stream that will be sent to all the connected users
    })

    //* when peer i has signaling data, give it to peer j somehow
    peers[socketIdConnection].on('signal', (data) =>{

        //* The data is details about the internet connection such as SDP and ice candidates, firewall, and more...
        const signalData = {
            signal: data,
            socketIdConnection
        }

        //* Pass signaling data to other users
        signalPeerData(signalData);
    })

    
    peers[socketIdConnection].on('stream', (remoteStream) =>{
        remoteStream.socketIdConnection = socketIdConnection;
        addNewRemoteStream(remoteStream);
    })
}

const addNewRemoteStream = (remoteStream) =>{
    const remoteStreams = store.getState().room.remoteStreams;
    const newRemoteStreams = [...remoteStreams, remoteStream];
    store.dispatch(setRemoteStreams(newRemoteStreams));
}

export const handleSignalingData = (data) =>{
    const {signal, socketIdConnection} = data;

    peers[socketIdConnection] && peers[socketIdConnection].signal(signal);
}

//*the user who exit the room will close all other connections
//*he has with the other users
export const closeAllConnections = () =>{
    Object.entries(peers).forEach(peer =>{
        const socketIdConnection = peer[0];
        if(peers[socketIdConnection]){
            peers[socketIdConnection].destroy();
            delete peers[socketIdConnection];
        }
    })
}
export const handleParticipantLeftRoom = (participantSocketId) =>{

    if (peers[participantSocketId]) {
        peers[participantSocketId].destroy();
        delete peers[participantSocketId];
    }
    
    const remoteStreams = store.getState().room.remoteStreams;


    const filteredRemoteStreams = remoteStreams.filter(stream => stream.socketIdConnection !== participantSocketId);
    store.dispatch(setRemoteStreams(filteredRemoteStreams));
}

export const switchOutgoingTracks = (stream) => {
    for (let socket_id in peers) {
      for (let index in peers[socket_id].streams[0].getTracks()) {
        for (let index2 in stream.getTracks()) {
          if (
            peers[socket_id].streams[0].getTracks()[index].kind ===
            stream.getTracks()[index2].kind
          ) {
            peers[socket_id].replaceTrack(
              peers[socket_id].streams[0].getTracks()[index],
              stream.getTracks()[index2],
              peers[socket_id].streams[0]
            );
            break;
          }
        }
      }
    }
  };