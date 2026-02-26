import React from 'react';
import styled from 'styled-components';
import GeneratorImgForm from '../components/GeneratorImgForm.jsx';
import GeneratedImgCard from '../components/GeneratedimgCard.jsx';

const Container = styled.div`
flex: 1;
overflow-y: scroll;
background: ${({ theme }) => theme.bg};
padding: 50px 30px;
display:flex;
flex-direction: column;
justify-content: flex-start;
gap: 20px;
align-items: center;
padding-top: 50px;
@media only screen and (max-width: 768px) {
  padding: 50px 10px;
  padding-bottom: 50px;
  justify-content: flex-start;
}
`;

const Wrapper = styled.div`
// flex: 1;
height: fit-content;
width: 100%;
max-width: 1200px;
gap: 8%;
padding: 32px 0px;
display: flex;
justify-content: center;
@media(max-width: 768px) {
  flex-direction: column;
}
`;

const CreatePost = () => {
    return (
    <Container>
        <Wrapper>
            <GeneratorImgForm />
            <GeneratedImgCard loading/>
        </Wrapper>
    </Container>
    );
};

export default CreatePost;