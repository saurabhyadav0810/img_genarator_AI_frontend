import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

// Auth
export const UserRegister = async (data) => await API.post("/api/auth/register", data);
export const UserLogin = async (data) => await API.post("/api/auth/login", data);
export const VerifyOtp = async (data) => await API.post("/api/auth/verify-otp", data);

// Posts
export const GetPosts = async () => await API.get("/api/posts");
export const CreatePost = async (data) => await API.post("/api/posts", data);
export const GenerateImage = async (data) => await API.post("/api/generate", data);

