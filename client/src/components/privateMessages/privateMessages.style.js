import styled from '@emotion/styled';

export const Container = styled.div`
    height:60%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 1vmin;
    margin-top:2vmin;
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
  };
`;

export const FriendContainer = styled.div`
    display: flex;
    align-items: center;
    gap:2vmin;
    cursor: pointer;
    padding-left: 1.5vmin;
    background-color:${({isCurrent}) =>isCurrent && 'rgba(100, 149, 237, 0.2)'};
    :hover{
        background-color: rgba(100, 149, 237, 0.2);
    }

`;


export const GreenCircle = styled.div`
    border-radius: 50%;
    width: 1.6vmin;
    height: 1.6vmin;
    background-color: #2EB475;
    margin: 0 1vmin 0 auto;

`;




