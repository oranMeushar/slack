import styled from '@emotion/styled';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: ${({isModal}) => isModal ? 'rgba(39, 49, 58, 0.3)' : 'rgba(39, 49, 58, 0)'};
  z-index:100;
  display: grid;
  place-items: center;
  pointer-events: ${({isModal}) => isModal ? 'all' : 'none'};
  transform:${({isModal}) => isModal ? 'scale(1)' : 'scale(0)'};
  transition: background-color 0.3s linear;
`;


export const ModalChildren = styled.div`
  position: relative;
  z-index: 10;
`;