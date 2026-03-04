import React, { useState } from "react";
import styled from "styled-components";
import { SearchRounded } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { SearchUsers } from "../../Api/index.js";

const Container = styled.div`
  position: relative;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.text_secondary + "40"};
`;

const Input = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.text_secondary};
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.bgLight};
  border: 1px solid ${({ theme }) => theme.text_secondary + "30"};
  border-radius: 8px;
  max-height: 240px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const UserItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.primary + "15"};
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;

const UserEmail = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.text_secondary};
`;

const NoResults = styled.div`
  padding: 12px;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.text_secondary};
`;

const UserSearch = ({ onSelectUser }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const timerRef = React.useRef(null);

  const handleSearch = (value) => {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (value.trim().length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }

    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await SearchUsers(value.trim());
        setResults(res.data?.users || []);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleSelect = (user) => {
    setQuery("");
    setResults([]);
    setOpen(false);
    onSelectUser(user);
  };

  return (
    <Container>
      <SearchInput>
        <SearchRounded style={{ fontSize: 18, color: "#b1b2b3" }} />
        <Input
          placeholder="Search by username..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          onFocus={() => results.length && setOpen(true)}
        />
        {loading && <CircularProgress size={16} />}
      </SearchInput>
      {open && (
        <Dropdown>
          {results.length === 0 ? (
            <NoResults>No users found</NoResults>
          ) : (
            results.map((user) => (
              <UserItem key={user._id} onMouseDown={() => handleSelect(user)}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: "#007AFF", fontSize: 14 }}>
                  {user.name?.[0]?.toUpperCase()}
                </Avatar>
                <UserInfo>
                  <UserName>{user.name}</UserName>
                  <UserEmail>@{user.username}</UserEmail>
                </UserInfo>
              </UserItem>
            ))
          )}
        </Dropdown>
      )}
    </Container>
  );
};

export default UserSearch;
