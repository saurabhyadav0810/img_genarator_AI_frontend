import React from 'react';
import styled from 'styled-components';
import Button from './button.jsx';
import { AddRounded, ExploreRounded, LogoutRounded, ChatRounded } from '@mui/icons-material';
import { useNavigate, useLocation } from "react-router-dom";
const Container = styled.div`
width: 100%;
background: ${({ theme }) => theme.navbar};
color: ${({ theme }) => theme.text_primary};
font-weight: bold;
font-size: 22px;
padding: 14px 50px;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 0 0 10px rgba(0,0,0,0.15);
box-sizing: border-box;
@media only screen and (max-width: 600px) {
  padding: 10px 12px;
}
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/");
    return (
      <Container>
        Vibely
        <RightSection>
        {
            path[1] === "post" ?( 
            <Button 
        onClick={() => navigate("/")}
        text="Explore post"
         leftIcon={
         <ExploreRounded style={{
            fontSize: "18px",
        }}
        />
    }
    type="secondary"
        />) : (
        
        <Button 
        onClick={() => navigate("/post")}
        text="Create new post"
         leftIcon={
         <AddRounded style={{
            fontSize: "18px",
        }}
        />
    }
        />
            )}
        <Button
          onClick={() => navigate("/chat")}
          text="Chat"
          leftIcon={<ChatRounded style={{ fontSize: "18px" }} />}
          type={path[1] === "chat" ? "primary" : "secondary"}
        />
        <Button
          onClick={onLogout}
          text="Logout"
          leftIcon={<LogoutRounded style={{ fontSize: "18px" }} />}
          type="secondary"
        />
        </RightSection>
      </Container>
    );
};
export default Navbar;