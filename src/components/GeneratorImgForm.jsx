import  { GenerateImage, CreatePost }  from '../Api/index.js';
import styled from 'styled-components';
import Button from './button.jsx'; 
import TextInput from './TextInput.jsx';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';

const Form = styled.div`
flex: 1;
padding: 16px 20px;
display: flex;
flex-direction: column;
gap: 9%;
justify-content: center;
`;
const Top = styled.div`
display: flex;
flex-direction: column;
gap: 6px;
`;
const Title = styled.div`
font-size: 28px;
font-weight: 500;
color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
font-size: 17px;
font-weight: 400;
color: ${({ theme }) => theme.text_secondary};
`;
const Body = styled.div`
display: flex;
flex-direction: column;
gap: 18px;
font-size: 12px;
font-weight: 400;
color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
display: flex;
gap: 8px;
width: 100%;
justify-content: space-between;
@media only screen and (max-width: 500px) {
  flex-direction: column;
}
`;

const GeneratorImgForm = ({
    post,
     setPost,
      generateImageLoading,
       setGenerateImageLoading, 
       createpostLoading,
        setCreatePostLoading}) => {
          const generateImgfun = async () => {
            setGenerateImageLoading(true);
            await GenerateImage({prompt: post.prompt}).then((res)=>{
              setPost({...post, photo: res?.data?.photo});
              setGenerateImageLoading(false);
            }).catch((err)=>{
              console.log(err);
              setGenerateImageLoading(false);
            });
          };
          const createPostfun = async () => {
            setCreatePostLoading(true);
            await CreatePost(post).then(()=>{
              alert("Post Created Successfully");
              setPost({name: "", prompt: "", photo: ""});
              setCreatePostLoading(false);
            }).catch((err)=>{
              console.log(err);
              alert("Failed to create post");
              setCreatePostLoading(false);
            });
          };
    return (
        <Form>
            <Top>
                <Title>Generate Image with Prompt</Title>
                <Desc>Write your prompt according to the image you want to generate</Desc>
            </Top>
            <Body>
                <TextInput label="Author" 
                placeholder="Enter your name" 
                value={post.name}
                 handleChange={(e) => setPost({...post, name: e.target.value})} />
                <TextInput label="Prompt"
                 placeholder="Describe the image you want to generate"  
                rows="8" 
                textArea
                value={post.prompt}
                handleChange={(e) => setPost({...post, prompt: e.target.value})}
                 />
               
            </Body>
            <Actions>
                <Button text="Generate Image" 
                flex leftIcon={<AutoAwesome />}
                 isLoading={generateImageLoading}
                isDisabled={post.prompt === ""}
                onClick={()=>generateImgfun()}
                />
                <Button text="Post Image" 
                flex type="secondary" 
                leftIcon={<CreateRounded/>} 
                isLoading={createpostLoading}
                isDisabled={post.name==="" || post.prompt === "" || post.photo === ""}
                onClick={()=>createPostfun()}
                />
            </Actions>
        </Form>
    );
};

export default GeneratorImgForm;