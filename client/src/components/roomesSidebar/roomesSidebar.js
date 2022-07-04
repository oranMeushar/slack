import React, {useState} from 'react';
import {Container, GroupImg, NewRoomButton} from './roomesSidebar.style';
import { createNewRoom } from '../../socket/socketConnection';
import { useDispatch, useSelector } from 'react-redux';
import { setRoomCreation } from '../../store/room';
import ActiveRoomButton from './activeRoomButton/activeRoomButton';
import { getLocalStreamPreview } from '../../webRTC/webrtcHandler';

const MainSidebar = () => {

    const isUserInRoom = useSelector(state => state.room.isUserInRoom);
    const activeRooms = useSelector(state => state.room.activeRooms);

    //*added
    console.log('activeRooms = ', activeRooms);
    const dispatch = useDispatch();

    const handleButtonClicked = () =>{

        const successfullCallback = () =>{
            createNewRoom();
            dispatch(setRoomCreation({isUserInRoom: true, isUserRoomCreator:true}));
        };
        
        getLocalStreamPreview(false, successfullCallback);
    }


    return (
        <Container>
            <GroupImg/>
            <NewRoomButton disabled={isUserInRoom} onClick={handleButtonClicked}>+</NewRoomButton>
            {activeRooms?.map(room => (<ActiveRoomButton {...room}/>)) }
        </Container>
    );
};

export default MainSidebar;