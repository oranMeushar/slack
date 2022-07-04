import React from 'react';
import {Container} from './avatar.style';

const Avatar = ({name}) => {

    const avatar = name[0].toUpperCase() + name[1];
    return (
        <Container>
            {avatar}
        </Container>
    );
};

export default Avatar;