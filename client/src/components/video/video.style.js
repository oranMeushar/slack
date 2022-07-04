import styled from '@emotion/styled';

export const Container = styled.div`
    width:100%;
`;


export const VideoEl = styled.video`
    width:100%;
    height:${({height})=> height && height}
`;