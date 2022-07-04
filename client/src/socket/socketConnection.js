import { io } from 'socket.io-client';
import { setPendingFriends, setFriendsList, setOnlineUsers } from '../store/friends';
import { setActiveRooms} from '../store/room';
import { updateChatMessages } from '../store/chat';
import { setRoomDetails } from '../store/room';
import {store} from '../store';
import { prepareNewPeerConnection, handleSignalingData, handleParticipantLeftRoom } from '../webRTC/webrtcHandler';




const dispatch = store.dispatch;
let socket;

const connectSocketServer = (userDetails) =>{

    const {token} = userDetails;
    
    socket = io('http://localhost:8080',{
        auth: {
            token
        }
    });
    
    
    // socket.on('connect', (e) =>{
    //     console.log('Socket Connection: ', socket.id);
    // })


    socket.on('invitation', (data) =>{
        dispatch(setPendingFriends(data));
    })

    socket.on('friends-list', (data) =>{
        dispatch(setFriendsList(data));
    })

    socket.on('online-users', (data) =>{

        dispatch(setOnlineUsers(data));
    })

    socket.on('update-chat', (data) =>{
        dispatch(updateChatMessages(data));
    })

    socket.on('new-room', (data) =>{
        dispatch(setRoomDetails(data));
    })


    socket.on('prepare-connection', (data) =>{
        const {newSocketIdConnection} = data;
        prepareNewPeerConnection(newSocketIdConnection, false);
        socket.emit('init-connection', newSocketIdConnection);
        
    })

    socket.on('init-connection', (data) =>{
        const {socketIdConnection} = data;
        prepareNewPeerConnection(socketIdConnection, true);
    })


    socket.on('connection-signal', (data) =>{
        handleSignalingData(data);
    })


    socket.on('participant-left-room', (data) =>{
        handleParticipantLeftRoom(data);
    })

    socket.on('active-rooms', (data) =>{
        const friendsList  = store.getState().friends.friendsList;
        const relevantRooms = [];

        const userId = store.getState().auth.user._id;

        data.forEach(room =>{
            const isRoomCreator = room.creator.userId === userId
            if(isRoomCreator){
                relevantRooms.push({...room, creatorName:'RoomCreator'})
            }

            friendsList.forEach(friend =>{
                if (friend._id.toString() === room.creator.userId) {
                    relevantRooms.push({...room, creatorName:friend.name})
                }
            })
        })
        dispatch(setActiveRooms(relevantRooms));
    })
}

export const createNewRoom = () =>{
    socket.emit('new-room');
}

export const joinRoom = (roomId) =>{
    socket.emit('join-room', roomId);
}

export const exitRoom = (roomId) =>{
    socket.emit('exit-room', roomId);
}


export const signalPeerData = (signalData) =>{
    socket.emit('connection-signal', signalData);
}

export const disconnect = () =>{
    socket.emit('log-out');
}



export default connectSocketServer;