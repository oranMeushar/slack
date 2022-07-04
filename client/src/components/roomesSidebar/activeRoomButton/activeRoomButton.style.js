import styled from '@emotion/styled';

export const Container = styled.div`
    position:relative;
    cursor:pointer;

    ::before{
        content: attr(data-details);
        position: absolute;
        white-space:nowrap;
        font-size:1.5vmin;
        background-color: white;
        border-radius:6px;
        padding: 0.5vmin 1vmin;
        top:-85%;
        visibility: hidden;
    }
    :hover::before{
        visibility: visible;
    }
`;