import React from 'react';
import { useSelector } from 'react-redux';
import TopBar from '../topBar/topBar';
import Conversations from './conversations/conversations';
import ConversationHeader from './header/conversationHeader';
import {Container, EmptyMessage} from './mainDashboard.style';

const MainDashboard = () => {
    const chatDetails = useSelector(state => state.chat.chatDetails);



    return (
        <Container>
            <TopBar/>
            <ConversationHeader/>
            {!!Object.keys(chatDetails).length && <Conversations/>}
            {!Object.keys(chatDetails).length &&<EmptyMessage>Choose Conversation to start chatting</EmptyMessage>}
        </Container>
    );
};

export default MainDashboard;