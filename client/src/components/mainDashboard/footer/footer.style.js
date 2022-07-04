import styled from '@emotion/styled';
import sendImg from '../../../resources/images/send.png';

export const Container = styled.form`
    display:flex;
    padding: 0 4vmin;
    align-items:center;
    gap:1vmin;
    input{
        width:100%;
        background-color:#3B384D;
        font-size: 3vmin;
        color:white;
        outline:none;
        border-radius: 1rem;
        padding: 0.5vmin;
        letter-spacing:0.2vmin;
        border:1px solid #C9F2E3

    }
`;

export const SendImg = styled.div`
    width: 3vmin;
    height:3vmin;
    display: block;
    background-color: #2EB475;
    cursor: pointer;
    mask: url(${sendImg}) no-repeat center / contain;
    -webkit-mask: url(${sendImg}) no-repeat center / contain;
    

`;

