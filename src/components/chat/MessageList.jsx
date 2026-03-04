import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Bubble = styled.div`
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  align-self: ${({ $own }) => ($own ? "flex-end" : "flex-start")};
  background: ${({ $own, theme }) => ($own ? theme.primary : theme.bgLight)};
  color: ${({ $own, theme }) => ($own ? "#fff" : theme.text_primary)};
  border-bottom-right-radius: ${({ $own }) => ($own ? "4px" : "16px")};
  border-bottom-left-radius: ${({ $own }) => ($own ? "16px" : "4px")};
`;

const Time = styled.span`
  font-size: 10px;
  color: ${({ theme }) => theme.text_secondary};
  align-self: ${({ $own }) => ($own ? "flex-end" : "flex-start")};
  margin-top: -4px;
`;

const TypingIndicator = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  font-style: italic;
  padding: 4px 16px;
`;

const Empty = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const formatTime = (date) => {
  const d = new Date(date);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const MessageList = ({ messages, currentUserId, typing }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  if (!messages.length)
    return <Empty>No messages yet. Say hello!</Empty>;

  return (
    <Container>
      {messages.map((msg) => {
        const own = msg.sender === currentUserId;
        return (
          <React.Fragment key={msg._id}>
            <Bubble $own={own}>{msg.text}</Bubble>
            <Time $own={own}>{formatTime(msg.createdAt)}</Time>
          </React.Fragment>
        );
      })}
      {typing && <TypingIndicator>typing...</TypingIndicator>}
      <div ref={bottomRef} />
    </Container>
  );
};

export default MessageList;
