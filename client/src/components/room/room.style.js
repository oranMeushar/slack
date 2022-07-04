import styled from '@emotion/styled';
import shareScreenOffImg from '../../resources/images/shareScreenOff.png';

export const Container = styled.div`
    position:absolute;
    width: ${({isFullScreen}) => isFullScreen ? '100vw' : '30vw'};
    height: ${({isFullScreen}) => isFullScreen ? '100vh' : '25vw'};
    background-color:#292929;
    right:0;
    bottom:0;
    z-index: 20;    
    display:grid;
    grid-template-columns: 1fr;
    grid-template-rows:${({isFullScreen}) => isFullScreen ? '0.05fr 2fr 0.1fr' : '0.15fr 2fr 0.15fr'};
    
`;

export const Top = styled.div`
    border-bottom:1px solid black;
    width:100%;
    cursor: ${({isFullScreen}) => isFullScreen ? 'default' : 'move'}; ;;
`;

export const VideosContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: auto;
    ::-webkit-scrollbar {
        width: 20px;
    };
    
    ::-webkit-scrollbar-thumb {
    background: #5f5b70;
    border-radius: 100px;
    background-clip: padding-box;
    border: 6px solid rgba(0, 0, 0, 0);
  }
    
`;


export const Footer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap:3vmin;
    position: relative;
    background-color: #2EB475;
    padding: 1vmin;

    img:last-child{
        position:absolute;
        right:1vmin;
        bottom:50%;
        transform: translateY(50%);
    }
`;

export const Image = styled.img`
    width:2.5vmin;
    height:2.5vmin;
    cursor: pointer;
    user-select: none;
`;
export const ShareImage = styled.div`
    width:2.5vmin;
    height:2.5vmin;
    display: block;
    background-color: black;
    cursor: pointer;
    mask: url(${shareScreenOffImg}) no-repeat center / contain;
    -webkit-mask: url(${shareScreenOffImg}) no-repeat center / contain;
`;

