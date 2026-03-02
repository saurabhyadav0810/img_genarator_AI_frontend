import React from "react";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Avatar } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import FileSaver from "file-saver";
const Card = styled.div`
 position: relative;
 display: flex;
 border-radius: 20px;
 box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
 cursor: pointer;
 transition: all 0.3s ease;
 width: 100%;
 height: 300px;
 overflow: hidden;
 
 &:hover {
   box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
   scale: 1.05;
 }
 
 &:nth-child(1) {
   grid-column: auto/span 2;

 }
`;
const HoverOverlay = styled.div`
opacity: 0;
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
flex-direction: column;
align-items: start;
gap: 10px;
backdrop-filter: blur(2px);
background: rgba(0, 0, 0, 0.5);
color: ${({ theme }) => theme.white};
transition: opacity 0.3s ease;
border-radius: 6px;
justify-content: end;
padding: 16px;
${Card}:hover & {
opacity: 1;
}

`;
const Prompt = styled.div`
    font-weight: 400;
    font-size: 15px;
    display: flex;
    gap: 8px;
    align-items: center;
    color: ${({ theme }) => theme.white};
`;

const Author = styled.div`
    font-weight: 400;
    font-size: 15px;
    display: flex;
    gap: 8px;
    align-items: center;
    color: ${({ theme }) => theme.white};
`;
const ImageCard = ({item}) => {
    return (
        <Card>
            <LazyLoadImage style={{borderRadius: "12px"}}
            width="100%"
            height="100%"
            src={item?.photo} 
            alt="Generated Image" />
            <HoverOverlay>
                <Prompt>{item.prompt}</Prompt>
                <div style={{display: "flex",
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "space-between"}}>
                <Author>
                    <Avatar sx={{ width: "32px", height: "32px" }}>{item?.name?.charAt(0)}</Avatar>
                    {item?.name}
                    </Author>
                    <DownloadRounded onClick={() =>FileSaver.saveAs(item?.photo, "download.jpg")} />
                </div>
            </HoverOverlay>
        </Card>
    )
}
export default ImageCard;