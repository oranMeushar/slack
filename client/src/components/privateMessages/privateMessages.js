import React, { useState} from 'react';
import {Container, FriendContainer, GreenCircle} from './privateMessages.style';
import { useSelector, useDispatch } from 'react-redux';
import { getFriendsSelector } from '../../store/friendsSelecors';
import { setChosenChat, getChatHistory } from '../../store/chat.js';
import { updateUserActiveRooms } from '../../socket/socketConnection';
import Avatar from '../avatar/avatar';


const PrivateMessages = () => {
    const friendsList = useSelector(getFriendsSelector);
    const dispatch = useDispatch();

    const [currentConversation, setCurrentConversation] = useState(null);

    const handleFriendChatClicked = (payload) =>{
        dispatch(setChosenChat(payload));
        dispatch(getChatHistory(payload));
        setCurrentConversation(payload.chatDetails.userId);
    }

    const friend = (user) =>{
        const {name, isOnline, _id} = user;
        const DIRECT = 'DIRECT';
       

        const chatDetails = {name, userId:_id}
        const payload = {
            chatDetails,
            chatType:DIRECT
        }
        return(
            <FriendContainer isCurrent={_id === currentConversation} key={_id} onClick={() =>handleFriendChatClicked(payload)}>
                <Avatar name={name}/>
                <p>{name}</p>
                {isOnline && <GreenCircle/>}
            </FriendContainer>
        )
    }

    return (
        <Container>
            <p> <span>Private Messages</span> </p>
           {
            friendsList.map(user =>{
                return friend(user)
            })
           }
        </Container>
    );
};

export default PrivateMessages;