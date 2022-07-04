import React, {useState} from 'react';
import ClickOutHandler from 'react-onclickout';
import {useDispatch, useSelector} from 'react-redux';
import { disconnect } from '../../socket/socketConnection';
import { setLogoutChat } from '../../store/chat';
import { setLogoutFriends } from '../../store/friends';
import { setLogoutRoom } from '../../store/room';
import { setLogoutAuth } from '../../store/user';
import {Container, CircleContainer, Circle, LogoutButton} from './topBar.style'

const TopBar = () => {

    const [showLoggoutButton, setShowLoggoutButton] = useState(false);
    const dispatch = useDispatch();

    const chatDetails = useSelector(state => state.chat.chatDetails);


    const handlelogout = (e) =>{
        dispatch(setLogoutAuth());
        dispatch(setLogoutChat());
        dispatch(setLogoutFriends());
        dispatch(setLogoutRoom());
        disconnect()
        
    }
    return (
        <Container>
            {/* {Object.keys(chatDetails).length ? <p>Chosen Conversation: {chatDetails.name}</p> : <p>&nbsp;</p>} */}
            <ClickOutHandler onClickOut={() => setShowLoggoutButton(false)}>
                <CircleContainer onClick={() =>setShowLoggoutButton(!showLoggoutButton)} >
                    <Circle/>
                    <Circle/>
                    <Circle/>
                    <LogoutButton onClick = {handlelogout} showLoggoutButton={showLoggoutButton}>Logout</LogoutButton>
                </CircleContainer>
            </ClickOutHandler>
        </Container>
    );
};

export default TopBar;