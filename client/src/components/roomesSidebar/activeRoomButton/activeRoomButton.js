import React from 'react';
import {Container} from './activeRoomButton.style';
import Avatar from '../../avatar/avatar'
import { joinRoom } from '../../../socket/socketConnection';
import { setRoomCreation, setRoomDetails } from '../../../store/room';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStreamPreview } from '../../../webRTC/webrtcHandler';
import { toast} from 'react-toastify';

const ActiveRoomButton = ({creator, creatorName, id:roomId, participants}) => {

    
    const isUserInRoom = useSelector(state => state.room.isUserInRoom);
    const dispatch = useDispatch();

    const handleJoinRoom = (roomId) =>{

        if(!isUserInRoom){
            const successfullCallback = () =>{
                joinRoom(roomId);
                dispatch(setRoomDetails({id:roomId, creator, participants}));
                dispatch(setRoomCreation({isUserInRoom: true, isUserRoomCreator:false}));
            };
            getLocalStreamPreview(false, successfullCallback);
        }
        else{
            toast.error('You are already in a room')
        }
                
    }

    return (
        <Container onClick={() =>handleJoinRoom(roomId)} key={roomId} data-details={`Creator: ${creatorName}, Participants: ${participants.length}`}>
            <Avatar name={creatorName}/>
        </Container>
    );
};

export default ActiveRoomButton;