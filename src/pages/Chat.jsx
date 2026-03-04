import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import { Avatar, CircularProgress } from "@mui/material";
import { ArrowBackRounded } from "@mui/icons-material";
import { GetConversations, GetMessages, CreateConversation } from "../Api/index.js";
import ConversationList from "../components/chat/ConversationList.jsx";
import MessageList from "../components/chat/MessageList.jsx";
import MessageInput from "../components/chat/MessageInput.jsx";
import UserSearch from "../components/chat/UserSearch.jsx";

const SOCKET_URL = "http://localhost:3000";


const Container = styled.div`
  height: 100%;
  display: flex;
  overflow: hidden;
  background: ${({ theme }) => theme.bg};
`;

const Sidebar = styled.div`
  width: 320px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.text_secondary + "25"};
  background: ${({ theme }) => theme.bgLight};
  @media (max-width: 768px) {
    width: 100%;
    min-width: 100%;
    display: ${({ $hide }) => ($hide ? "none" : "flex")};
  }
`;

const SidebarHeader = styled.div`
  padding: 16px;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + "25"};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    display: ${({ $hide }) => ($hide ? "none" : "flex")};
  }
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.text_secondary + "25"};
  background: ${({ theme }) => theme.bgLight};
`;

const BackBtn = styled.div`
  display: none;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    display: flex;
  }
`;

const ChatName = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const ChatUsername = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.text_secondary};
`;

const ChatNameWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyChat = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text_secondary};
  font-size: 16px;
  text-align: center;
  padding: 20px;
`;

const LoaderWrap = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Chat = () => {
 
  const stored = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = stored.id;

  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConv, setLoadingConv] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState(false);
  const [typing, setTyping] = useState(false);
  const socketRef = useRef(null);
  const typingTimeout = useRef(null);

 
  useEffect(() => {
    const socket = io(SOCKET_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    socket.on("connect", () => {
      socket.emit("register", currentUserId);
    });

    socket.on("receive_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
      
      setConversations((prev) =>
        prev.map((c) =>
          c._id === msg.conversation ? { ...c, lastMessage: msg._id } : c
        )
      );
    });

    socket.on("message_sent", (msg) => {
      setMessages((prev) => {
        if (prev.find((m) => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    });

    socket.on("typing", () => {
      setTyping(true);
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => setTyping(false), 2000);
    });

    return () => {
      socket.disconnect();
    };
  }, [currentUserId]);


  useEffect(() => {
    const load = async () => {
      try {
        const res = await GetConversations();
        setConversations(res.data?.conversations || []);
      } catch (err) {
        console.error("Failed to load conversations", err);
      } finally {
        setLoadingConv(false);
      }
    };
    load();
  }, []);

 
  useEffect(() => {
    if (!activeConv) return;
    const load = async () => {
      setLoadingMsg(true);
      try {
        const res = await GetMessages(activeConv._id);
        setMessages(res.data?.messages || []);
      } catch (err) {
        console.error("Failed to load messages", err);
      } finally {
        setLoadingMsg(false);
      }
    };
    load();
  }, [activeConv]);


  const handleSend = useCallback(
    (text) => {
      if (!activeConv || !socketRef.current) return;
      const other = activeConv.participants?.find(
        (p) => p._id !== currentUserId
      );
      socketRef.current.emit("sendMessage", {
        senderId: currentUserId,
        receiverId: other._id,
        text,
      });
    },
    [activeConv, currentUserId]
  );

  
  const handleTyping = useCallback(() => {
    if (!activeConv || !socketRef.current) return;
    const other = activeConv.participants?.find(
      (p) => p._id !== currentUserId
    );
    socketRef.current.emit("typing", {
      senderId: currentUserId,
      receiverId: other._id,
    });
  }, [activeConv, currentUserId]);


  const handleSelectUser = async (user) => {
   
    const existing = conversations.find((c) =>
      c.participants?.some((p) => p._id === user._id)
    );
    if (existing) {
      setActiveConv(existing);
      return;
    }
    try {
      const res = await CreateConversation(user._id);
      const conv = res.data?.conversation;
      setConversations((prev) => [conv, ...prev]);
      setActiveConv(conv);
    } catch (err) {
      console.error("Failed to create conversation", err);
    }
  };

 
  const otherUser = activeConv?.participants?.find(
    (p) => p._id !== currentUserId
  );

  return (
    <Container>
      {}
      <Sidebar $hide={!!activeConv}>
        <SidebarHeader>
          Chats
          <UserSearch onSelectUser={handleSelectUser} />
        </SidebarHeader>
        {loadingConv ? (
          <LoaderWrap>
            <CircularProgress size={28} />
          </LoaderWrap>
        ) : (
          <ConversationList
            conversations={conversations}
            activeId={activeConv?._id}
            onSelect={setActiveConv}
            currentUserId={currentUserId}
          />
        )}
      </Sidebar>

      {}
      <ChatArea $hide={!activeConv}>
        {!activeConv ? (
          <EmptyChat>Select a conversation or search for a user to start chatting</EmptyChat>
        ) : (
          <>
            <ChatHeader>
              <BackBtn onClick={() => setActiveConv(null)}>
                <ArrowBackRounded />
              </BackBtn>
              <Avatar sx={{ width: 36, height: 36, bgcolor: "#9747FF", fontSize: 16 }}>
                {otherUser?.name?.[0]?.toUpperCase()}
              </Avatar>
              <ChatNameWrap>
                <ChatName>{otherUser?.name}</ChatName>
                <ChatUsername>@{otherUser?.username}</ChatUsername>
              </ChatNameWrap>
            </ChatHeader>

            {loadingMsg ? (
              <LoaderWrap>
                <CircularProgress size={28} />
              </LoaderWrap>
            ) : (
              <MessageList
                messages={messages}
                currentUserId={currentUserId}
                typing={typing}
              />
            )}

            <MessageInput onSend={handleSend} onTyping={handleTyping} />
          </>
        )}
      </ChatArea>
    </Container>
  );
};

export default Chat;
