import React from 'react';
import {ModalContainer, ModalChildren} from './modal.style';

const Modal = ({children, isClicked, setIsClicked}) => {

    const handleModalClicked = () =>{
        setIsClicked(false); 
    }

    return (
        <ModalContainer isModal={isClicked} onClick={handleModalClicked}>
            <ModalChildren onClick={(e) => e.stopPropagation()}>
                {children}
            </ModalChildren>
        </ModalContainer>
    );
};

export default Modal;



