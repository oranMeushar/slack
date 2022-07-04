import React, {useEffect, useRef} from 'react';
import {Container, VideoEl} from './video.style';

const Video = ({stream, isLocalStream, height}) => {
    const videoRef = useRef();

    useEffect(() => {
        if (stream) {
            const video = videoRef.current;
            video.srcObject  = stream;
    
            video.onloadmetadata = () => {
                video.play();
            }
        }
    },[stream])

//TODO:check this "isLocalStream" value
    return (
        <Container>
            <VideoEl ref={videoRef} autoPlay={true} muted={isLocalStream ? true : false} height={height}/>
        </Container>
    );
};

export default Video;