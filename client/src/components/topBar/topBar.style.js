import styled from '@emotion/styled';

export const Container = styled.div`
    /* border-bottom:1px solid black; */
    width:100%;
    display: flex;
    /* justify-content: space-between; */
    justify-content: flex-end;
    align-items: center;

    p:nth-of-type(1) {
        font-size:2.5vmin
    }
`;

export const CircleContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    gap:0.2vmin;
    margin-right:1vmin;
    cursor:pointer;
    position:relative;
    transform: translateY(1vmin);
`;
export const LogoutButton = styled.div`
    position:absolute;
    background: white;
    width: fit-content;
    padding:0.5vmin 1vmin;
    border-radius: 0.6rem;
    bottom:-150%;
    right:0;
    font-size: 2vmin;
    visibility: ${({showLoggoutButton}) => showLoggoutButton ? 'visible' : 'hidden'};
`;


export const Circle = styled.div`
    width:0.8vmin;
    height: 0.8vmin;
    border-radius: 50%;
    background-color:rgba(154,152,152,1);
`;
