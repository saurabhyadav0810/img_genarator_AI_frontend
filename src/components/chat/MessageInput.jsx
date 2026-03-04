import React, { useState } from "react";
import styled from "styled-components";
import { SendRounded } from "@mui/icons-material";

const Container = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.text_secondary + "30"};
  background: ${({ theme }) => theme.bgLight};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 14px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.text_secondary + "40"};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const SendBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: ${({ theme }) => theme.primary};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const MessageInput = ({ onSend, onTyping }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    onTyping?.();
  };

  return (
    <Container onSubmit={handleSubmit}>
      <Input
        placeholder="Type a message..."
        value={text}
        onChange={handleChange}
      />
      <SendBtn type="submit" disabled={!text.trim()}>
        <SendRounded style={{ fontSize: 20 }} />
      </SendBtn>
    </Container>
  );
};

export default MessageInput;
