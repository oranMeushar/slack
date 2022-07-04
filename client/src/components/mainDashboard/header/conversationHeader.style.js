import styled from '@emotion/styled';

export const Container = styled.div`
    border-bottom:1px solid black;
    display:flex;
    gap:1vmin;
    align-items:center;
    padding-left:3vmin;
    font-size: 2.2vmin;
    min-height: 2vmin;
    color:white;
    >div,p{
        transform: translateY(-1vmin);
    }
`;
