import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar.jsx';
const Container = styled.div`
height: 100%;
overflow-y: scroll;
background: ${({ theme }) => theme.bg};
padding: 30px 30px;
padding-bottom: 50px;
display:flex;
flex-direction: column;
gap: 20px;
align-items: center;
@media only screen and (max-width: 768px) {
  padding: 6px 10px;
}
`;

const Headline = styled.div`
font-size: 34px;
font-weight: 500;
color: ${({ theme }) => theme.text_primary};
display: flex;
flex-direction: column;
align-items: center;
text-align: center;
@media only screen and (max-width: 600px) {
    font-size: 22px;
}
`;
const Span = styled.span`
font-size: 30px;
font-weight: 500;
color: ${({ theme }) => theme.secondary};
@media only screen and (max-width: 600px) {
    font-size: 20px;
}
`;

  
const Home = () => {
    return <Container>
        <Headline>Explore popular posts in the Community!
            <Span>⦿ Generated With AI ⦿</Span>
        </Headline>
        <SearchBar />
          
    </Container>;
};

export default Home;