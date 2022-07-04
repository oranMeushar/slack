import styled from '@emotion/styled';

export const Container = styled.div`
    width:100%;
    height:90vh;
    display:flex;
    flex-direction:column;
    padding-bottom:1vmin;
    /* justify-content:flex-end; */
`;

export const MessagesContainer = styled.div`
    display:flex;
    flex-direction:column;
    align-items: flex-end;
    height:100%;
    overflow:auto;
    padding:4vmin;
    gap:2vmin;
    .left{
        align-self: flex-start;
        /* background-color:#F2911B; */
        /* background-color:#29F2A9; */
        background-image: linear-gradient(to right bottom, #418166, #407e64, #3f7c62, #3e7960, #3d775e, #427c63, #468167, #4b866c, #579379, #63a186, #6faf93, #7bbda0);    }

    ::-webkit-scrollbar {
        width: 20px;
    }
    
    ::-webkit-scrollbar-thumb {
    background: #5f5b70;
    border-radius: 100px;
    background-clip: padding-box;
    border: 6px solid rgba(0, 0, 0, 0);
  }
`;

export const Message = styled.div`
    font-size: 3vmin;
    /* background-color:#2EB475; */
    background-image: linear-gradient(to right bottom, #418166, #407e64, #3f7c62, #3e7960, #3d775e, #427c63, #468167, #4b866c, #579379, #63a186, #6faf93, #7bbda0);    border-radius: 0.6rem;
    width: 30vmin;
    padding:0.2vmin 2vmin;
    display: flex;
    flex-direction:column;
    word-break: break-word;
    color:white;
    p:nth-of-type(2){
        font-size: 1.5vmin;
        align-self: flex-end;
        color:black;

    }
`;
export const Date = styled.div`
    align-self: center;
    font-size: 2vmin;
    background-color:#205939;
    padding:0.2vmin 1vmin;
    border-radius: 0.6rem;
    color:white;
`;