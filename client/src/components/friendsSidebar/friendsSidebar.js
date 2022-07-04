import React, {useState} from 'react';
import FriendsInvitation from '../friendsInvitation/friendsInvitation';
import Modal from '../modal/modal';
import PrivateMessages from '../privateMessages/privateMessages';
import {Container, FriendButton, Title, SubTitle, NewFriendFormContainer, SubmitButton} from './friendsSidebar.style';
import { toast} from 'react-toastify';
import * as api from '../../utils/api';
const FriendsSidebar = () => {

    const [isClicked, setIsClicked] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const endPoint = 'friends/invite';
        const user = JSON.parse(localStorage.getItem('user'));
        const [result, data] = await api.post(endPoint, {email}, user.token);
        if(result.status === 201) {
            toast.success(data.message)
        }
        else{
            toast.error(data.message);    
        }
        setIsClicked(false);
    }

    return (
        <>
            <Container>
                <FriendButton onClick={() => setIsClicked(true)}>Add Friend</FriendButton>
                <PrivateMessages/>
                <FriendsInvitation />
            </Container>
            <Modal isClicked={isClicked} setIsClicked={setIsClicked}>
                <NewFriendFormContainer onSubmit={handleSubmit}>
                    <Title>Invite a Friend</Title>
                    <SubTitle>Enter  email address of friend which you would like to invite</SubTitle>
                    <label htmlFor='sidebar-email'>
                        <p>Email</p>
                        <input type='email' id='sidebar-email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        <SubmitButton onClick = {handleSubmit}>Send</SubmitButton>
                    </label>
                </NewFriendFormContainer>
            </Modal>
        </>
    );
};

export default FriendsSidebar;