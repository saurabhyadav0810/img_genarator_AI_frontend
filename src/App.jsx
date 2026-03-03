import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { darkTheme } from "./utils/theme";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Authentication from "./pages/Authentication";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
  `;

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 3;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {!user ? (
        <Authentication setUser={setUser} />
      ) : (
        <Container>
          <Wrapper>
            <BrowserRouter>
              <Navbar user={user} onLogout={handleLogout} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post" element={<CreatePost />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </BrowserRouter>
          </Wrapper>
        </Container>
      )}
    </ThemeProvider>
  )
}

export default App
