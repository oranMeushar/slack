import React, {useEffect} from 'react';
import FriendsSidebar from '../../components/friendsSidebar/friendsSidebar';
import MainDashboard from '../../components/mainDashboard/mainDashboard';
import RoomsSidebar from '../../components/roomesSidebar/roomesSidebar';
import connectSocketServer from '../../socket/socketConnection';
import { useSelector} from 'react-redux';
import {Container} from './home.style';
import Room from '../../components/room/room';

const Home = () => {

  const isUserInRoom = useSelector(state => state.room.isUserInRoom);

  useEffect(() =>{
    const userDetails = JSON.parse(localStorage.getItem('user'));
    connectSocketServer(userDetails)
  },[])

  return (
      <Container>
        <RoomsSidebar/>
        <FriendsSidebar/>
        <MainDashboard/>
        {isUserInRoom && <Room/>}
      </Container>
  );
};

export default Home