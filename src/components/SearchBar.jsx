import React from 'react';
import styled from 'styled-components';
import { SearchOutlined } from '@mui/icons-material';

const SearchBarContainer = styled.div`
    max-width: 550px;
    display: flex;
    width: 90%;
    cursor: pointer;
    gap: 6px;
    color: ${({ theme }) => theme.text_primary};
    border: 1px solid ${({ theme }) => theme.text_secondary + 90};
    border-radius: 8px;
    padding: 12px 16px;
    align-items: center;
`;
const SearchBar = () => {
    return (
        <SearchBarContainer>
            <SearchOutlined />
            <input 
            placeholder="search with prompt or name ..."
            style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: "16px",
                color: "inherit",
                background: "transparent"}}
                />
        </SearchBarContainer>
    )
}

export default SearchBar;