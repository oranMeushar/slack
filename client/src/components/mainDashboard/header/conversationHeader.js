import React from 'react';
import {Container} from './conversationHeader.style';
import { useSelector } from 'react-redux';
import Avatar from '../../avatar/avatar';
const ConversationHeader = () => {

    const chatDetails = useSelector(state => state.chat.chatDetails)

    const showChatDetails = () =>{
        const {name} = chatDetails;
        return(
            <>
                <Avatar name={name}/>
                <p>{name}</p>         
            </>
        )
    }
    return (
        <Container>
            {!!Object.keys(chatDetails).length && showChatDetails()}
        </Container>
    );
};

export default ConversationHeader;