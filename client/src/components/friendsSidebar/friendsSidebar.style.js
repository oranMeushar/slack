import styled from '@emotion/styled';

export const Container = styled.div`
    height: 98%;
    width: 20%;
    border-right:1px solid black;
`;


export const FriendButton = styled.div`
    padding: 0.5vmin 1vmin;
    font-size:3vmin;
    background-color: #2EB475;
    text-align: center;
    box-shadow: 0.2px 5px 15px 0px rgba(0,0,0,0.5);
    cursor: pointer;
    width: 90%;
    margin:1vmin auto;
    border-radius: 0.6rem;
    color:#2C293E;
`;

export const NewFriendFormContainer = styled.form`
    display: flex;
    flex-direction: column;
    gap:2vmin;
    padding: 2vmin;
    background-color: white;
    border-radius: 6px;

    p{
        margin-bottom: 0.5vmin;
        font-size: 2vmin;
    }

    input{
        outline: none;
        border:1px solid black;
        width: 80%;
        letter-spacing: 0.2rem;
        padding: 0.5vmin;
        border-top:none;
        border-left:none;
        border-right:none;
    }
`;

export const Title = styled.div`
    font-size: 3vmin;
`;

export const SubTitle = styled.div`
    font-size:2vmin;
`;


export const SubmitButton = styled.div`
    background: #2EB475;
    width:fit-content;
    margin-top: 1vmin;
    padding:0.5vmin 2vmin;
    border-radius: 6px;
    font-size: 3vmin;
    cursor: pointer;
    color:#2C293E;

`;
