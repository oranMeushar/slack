import React, {useState} from 'react';
import {Container, Image} from './footer.style';
import audioOffImg from '../../../resources/images/audioOff.png';
import audioOnImg from '../../../resources/images/audioOn.png';
import cameraOnImg from '../../../resources/images/cameraOn.png';
import cameraOffImg from '../../../resources/images/cameraOff.png';
import resizeImg from '../../../resources/images/resize.png';
import shareImg from '../../../resources/images/share.png';
const Footer = () => {
    return (
        <Container>
            <Image src={shareImg}/>
            <Image src={shareImg}/>
            <Image src={shareImg}/>
            <Image src={shareImg}/>
            <Image src={shareImg}/>
            <Image src={shareImg}/>
        </Container>
    );
};

export default Footer;