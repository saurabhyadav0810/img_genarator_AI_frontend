import React from 'react';
import styled from 'styled-components';
import GeneratorImgForm from '../components/GeneratorImgForm.jsx';
import GeneratedImgCard from '../components/GeneratedimgCard.jsx';
import { useState } from 'react';

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
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createpostLoading, setCreatePostLoading] = useState(false);


  const storedUser = JSON.parse(localStorage.getItem("user") || '{}');

  const [post, setPost] = React.useState({
    name: storedUser.name || "",
    username: storedUser.username || "",
    prompt: "",
    photo: "",
  });
    return (
    <Container>
        <Wrapper>
            <GeneratorImgForm 
            post={post}
             setPost={setPost} 
             createpostLoading={createpostLoading}
              generateImageLoading={generateImageLoading} 
            setGenerateImageLoading={setGenerateImageLoading}
            setCreatePostLoading={setCreatePostLoading} />
            <GeneratedImgCard src={post?.photo} loading={generateImageLoading} />
        </Wrapper>
    </Container>
    );
};

export default CreatePost;