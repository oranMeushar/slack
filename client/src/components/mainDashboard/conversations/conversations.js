import React, {useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';
import Footer from '../footer/footer';
import {Container, MessagesContainer, Message, Date} from './conversations.style';
import moment from 'moment-timezone';

const Conversations = () => {

    const messages = useSelector(state =>state.chat.messages);

    const msgContainerRef = useRef();


    useEffect(() => {
        //*Scrolls the parent element
        msgContainerRef.current.scrollIntoView({ behavior: "smooth" })
    },[messages])

    const renderMessages = () =>{
        
        const  userId = JSON.parse(localStorage.getItem('user'))._id;

        let lastDay = messages[0].createdAt.split('T')[0];
        
        
        return messages.map((msg, idx) =>{
            const {createdAt} = msg;
            
            let wasSentOnNewDay = createdAt.split('T')[0] !== lastDay;
            wasSentOnNewDay && (lastDay = createdAt.split('T')[0]);
            
            const sentTime = moment(createdAt).format('HH:mm')

            return (
                <>
                    {(wasSentOnNewDay || idx === 0) && <Date>{lastDay}</Date>}
                    <Message
                        key={idx} 
                        className={msg.sender === userId ? 'right' : 'left'}>
                        <p>{msg.content}</p>
                        <p>{sentTime}</p>
                    </Message>
                </>
                
                )
        })
            
        
    }

    return (
        <Container>
            <MessagesContainer>
               {!!messages.length && renderMessages()}
               <div ref={msgContainerRef}/> 
            </MessagesContainer>
            <Footer/>   
        </Container>
    );
};

export default Conversations;