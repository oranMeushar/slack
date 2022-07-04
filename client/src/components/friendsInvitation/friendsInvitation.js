import React from 'react';
import {Container,FriendContainer, ButtonsContainer, Button} from './friendsInvitation.style';
import {useSelector, useDispatch} from 'react-redux';
import {pendingFriendsSelector} from '../../store/friendsSelecors';
import { handleRejectInvitation, handleAcceptInvitation } from '../../store/friends';
import Avatar from '../avatar/avatar';
const FriendsInvitation = () => {

    const pendingFriends = useSelector(pendingFriendsSelector);

    const dispatch = useDispatch();



    const newFriendInv = (friendInv) =>{
        const {name, email, _id} = friendInv;
        return(
            <FriendContainer key={_id} data-email={email}>
                <Avatar name={name}/>
                <p>{name}</p>
                <ButtonsContainer>
                    <Button onClick={() =>dispatch(handleRejectInvitation({_id}))}>&#128473;</Button>
                    <Button onClick={() =>dispatch(handleAcceptInvitation({_id}))}>&#10003;</Button>
                </ButtonsContainer>
            </FriendContainer>
        )
    }
    
    return (
        <Container>
            <p><span>Invitations</span></p>
            {
                pendingFriends.map(friendInv=>{
                    return newFriendInv(friendInv)
                })
            }
        </Container>
    );
};

export default FriendsInvitation;