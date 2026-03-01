import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

export const GetPosts = async () => await API.get("/api/posts");

export const CreatePost = async (data) => await API.post("/api/posts", data);
export const GenerateImage = async (data) => await API.post("/api/generate", data);

