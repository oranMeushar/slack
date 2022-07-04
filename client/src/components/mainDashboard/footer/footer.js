import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendNewMessage } from '../../../store/chat.js';
import {Container, SendImg} from './footer.style';
const Footer = () => {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const chatDetails = useSelector(state => state.chat.chatDetails);

    const inputRef = useRef();


    useEffect(() => {
        setMessage('');
    }, [chatDetails])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(message.length > 0){
            const {userId} = chatDetails;
            dispatch(sendNewMessage({receiverId:userId, type:'DIRECT', message}));
            setMessage('');
        }
    }

    return (
        <Container onSubmit={handleSubmit}>
            <input ref={inputRef} type="text" value={message} onChange={(e) =>setMessage(e.target.value)} />
            <SendImg  onClick={(e)=>{inputRef.current.focus(); handleSubmit(e)}}/>
        </Container>
    );
};

export default Footer;