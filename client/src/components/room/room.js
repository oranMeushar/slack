import React, {useState, useEffect, useRef} from 'react';
import {Container, Top, Image, Footer, VideosContainer, ShareImage} from './room.style';
import Draggable from 'react-draggable';
import audioOffImg from '../../resources/images/audioOff.png';
import audioOnImg from '../../resources/images/audioOn.png';
import closeImg from '../../resources/images/close.png';
import cameraOnImg from '../../resources/images/cameraOn.png';
import cameraOffImg from '../../resources/images/cameraOff.png';
import resizeImg from '../../resources/images/resize.png';
import shareScreenImg from '../../resources/images/screen-share.png';
import shareScreenOffImg from '../../resources/images/shareScreenOff.png';
import { useDispatch, useSelector } from 'react-redux';
import { exitRoom } from '../../socket/socketConnection';
import { setLocalStream, setRemoteStreams, setRoomCreation, setRoomDetails, setScreenSharingStream } from '../../store/room';
import Video from '../video/video';
import { closeAllConnections, switchOutgoingTracks } from '../../webRTC/webrtcHandler';
import { useResizeDetector } from 'react-resize-detector';


const Room = () => {

    const [isAudio, setIsAudio] = useState(true);
    const [isCamera, setIsCamera] = useState(true);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [roomPosition, setRoomPosition] = useState({x:0, y:0});

    const roomRef = useRef();
    const dispatch = useDispatch();
    
    const {height, ref:videosContainerRef } = useResizeDetector();

    const roomId = useSelector(state =>state.room.roomDetails?.id);
    const localStream = useSelector(state => state.room.localStream);
    const remoteStreams = useSelector(state => state.room.remoteStreams);
    const screenSharingStream = useSelector(state => state.room.screenSharingStream);
    const isScreenSharingActive = useSelector(state => state.room.isScreenSharingActive);

    useEffect(() => {
        if (isFullScreen) {
                roomRef.current.style.right = 0;
                roomRef.current.style.bottom = 0;
                roomRef.current.style.transform = 'translate(0,0)';
                setRoomPosition({x:0, y:0});
        }
    },[isFullScreen])



    const handleCloseRoom = () =>{

        if (localStream) {
            localStream.getTracks().forEach(track =>{
                track.stop();
            })
            dispatch(setLocalStream(null));
        }

        if(screenSharingStream) {
            screenSharingStream.getTracks().forEach(track =>{
                track.stop();
            })
            dispatch(setScreenSharingStream(null))
        }

        dispatch(setRemoteStreams([]));
        closeAllConnections();
        exitRoom(roomId);
        dispatch(setRoomDetails(null));
        dispatch(setRoomCreation({isUserInRoom: false, isUserRoomCreator:false}));
        setIsCamera(false);
        setIsAudio(false);
    }

    const handleCameraClicked = () =>{
        localStream.getVideoTracks()[0].enabled = !isCamera;
        setIsCamera(!isCamera);
    }

    const handleAudioClicked = () =>{
        localStream.getAudioTracks()[0].enabled = !isAudio;
        setIsAudio(!isAudio);
    }

    const handleScreenSharingClicked = async () =>{
        if(!isScreenSharingActive){
            let stream = null;
            try{
                stream = await navigator.mediaDevices.getDisplayMedia({audio:false, video:true})
            }
            catch(e){
                console.log(e);
            }
            if(stream){  
               dispatch(setScreenSharingStream(stream));
               switchOutgoingTracks(stream);
            }
        }
        else{
           switchOutgoingTracks(localStream);
           screenSharingStream.getTracks().forEach(track =>track.stop());
           dispatch(setScreenSharingStream(null));
        }

    }

    return (
        <Draggable bounds="parent" handle={'.top'} disabled = {isFullScreen} position={isFullScreen && {x: 0, y: 0}}>
        <Container ref={roomRef} isFullScreen={isFullScreen} right={roomPosition.x} bottom={roomPosition.y}>
            <Top className={'top'} isFullScreen={isFullScreen}/>
            <VideosContainer ref={videosContainerRef}>
                <Video stream={ screenSharingStream ? screenSharingStream : localStream} isLocalStream height={height/2.1}/>
                {
                    remoteStreams?.map(remoteStream => (<Video stream={remoteStream} height={height/2.1}/>))
                }
            </VideosContainer>
            <Footer>
                <Image src={isScreenSharingActive ? shareScreenOffImg : shareScreenImg} onClick={handleScreenSharingClicked}/>
                <Image src={isAudio ? audioOnImg : audioOffImg} onClick={ handleAudioClicked}/>
                <Image src={closeImg} onClick={handleCloseRoom}/>
                <Image src={isCamera ? cameraOnImg : cameraOffImg} onClick={handleCameraClicked}/>
                <Image src={resizeImg} onClick={()=>setIsFullScreen(!isFullScreen)}/>
            </Footer> 
        </Container>
        </Draggable>
    );
};

export default Room;