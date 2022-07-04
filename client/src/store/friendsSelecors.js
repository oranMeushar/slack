import {createSelector} from '@reduxjs/toolkit';


const friendsSelector = state => state.friends;


export const onlineUsersSelector = createSelector(
    [friendsSelector], (friends) => {
        return friends.onlineUsers
    }
)

export const friendsListSelector = createSelector(
    [friendsSelector], (friends) => {
        return friends.friendsList
    }
)

export const pendingFriendsSelector = createSelector(
    [friendsSelector], (friends) => {

        let results = []
        const {pendingFriends} = friends;

        if(pendingFriends.length){
            results = pendingFriends.map(friendRequest =>{
                return {
                        ...friendRequest.senderId,
                        _id:friendRequest._id //*the id of the request
                }
            })
        } 
        return results;
    }
);

export const getFriendsSelector = createSelector(
    [friendsListSelector, onlineUsersSelector], (friendsList, onlineUsers) =>{
        const results = [];
        friendsList.forEach(friend =>{
            const foundOnlineFriend = onlineUsers.find(user => user.userId === friend._id.toString())
            results.push({
                ...friend,
                isOnline: foundOnlineFriend ? true : false
            })
        })
        return results;
    })
