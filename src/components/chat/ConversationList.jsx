import React from "react";
import styled from "styled-components";
import { Avatar } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow-y: auto;
  flex: 1;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  cursor: pointer;
  border-radius: 8px;
  background: ${({ $active, theme }) =>
    $active ? theme.primary + "22" : "transparent"};
  &:hover {
    background: ${({ theme }) => theme.primary + "15"};
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Name = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Email = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Empty = styled.div`
  padding: 24px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 14px;
`;

const ConversationList = ({ conversations, activeId, onSelect, currentUserId }) => {
  if (!conversations.length)
    return <Empty>No conversations yet. Search for a user to start chatting!</Empty>;

  return (
    <Container>
      {conversations.map((conv) => {
        const other = conv.participants?.find((p) => p._id !== currentUserId);
        if (!other) return null;
        return (
          <Item
            key={conv._id}
            $active={activeId === conv._id}
            onClick={() => onSelect(conv)}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: "#9747FF", fontSize: 16 }}>
              {other.name?.[0]?.toUpperCase()}
            </Avatar>
            <Info>
              <Name>{other.name}</Name>
              <Email>@{other.username}</Email>
            </Info>
          </Item>
        );
      })}
    </Container>
  );
};

export default ConversationList;
