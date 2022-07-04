import styled from '@emotion/styled';

export const Container = styled.div`
    height: 33%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1vmin;
    color:white;
    font-size: 2.2vmin;
    >p:first-child{
        text-align:center;
        padding-bottom: 0.5vmin;
        position: sticky;
        top:0;
        z-index: 10;
        background-color: #2C293E;
        span{
            border-bottom:1px solid white;
            padding-bottom:2px;
        }
    };
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

export const FriendContainer = styled.div`
    display: flex;
    align-items: center;
    gap:2vmin;
    position:relative;
    padding-left: 1.5vmin;
    ::before{
        content: attr(data-email);
        position: absolute;
        width: fit-content;
        background-color: white;
        border-radius:6px;
        padding: 0.5vmin 1vmin;
        top:-85%;
        visibility: hidden;
        color:black;
    }
    :hover::before{
        visibility: visible;
    }
    :hover{

        background-color: rgba(100, 149, 237, 0.2);
    }

`;
export const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    gap:1vmin;
    margin: 0 0.2vmin 0 auto;
`;

export const Button = styled.div`
    cursor: pointer;
`;

export const Avatar = styled.div`
    border-radius: 50%;
    padding: 1vmin;
    display: grid;
    place-items: center;
    background:#00BFFF;

`;