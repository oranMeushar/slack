import styled from '@emotion/styled';
import groupImg from '../../resources/images/group.png';

export const Container = styled.div`
    height: 100%;
    width: 8%;
    border-right:1px solid black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:2vmin;
`;

// export const GroupImg = styled.img`
//     width: 6vmin;
//     height:6vmin;
//     margin-top:1vmin;
// `;
export const GroupImg = styled.div`
    width: 6.5vmin;
    height:6.5vmin;
    display: block;
    background-color: #2EB475;;
    mask: url(${groupImg}) no-repeat center / contain;
    -webkit-mask: url(${groupImg}) no-repeat center / contain;
    
`;

export const NewRoomButton = styled.button`
    background: #2EB475;
    border-radius: 50%;
    width: 6vmin;
    aspect-ratio: 1 / 1;
    font-size: 4vmin;
    display:grid;
    place-items: center;
    cursor: pointer;
    color:#2C293E;
    border:none;

    :disabled {
        background-color:#A9A9A9;
        pointer-events: none;
    }
`;

