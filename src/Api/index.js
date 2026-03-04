import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
});

export const UserRegister = async (data) => await API.post("/api/auth/register", data);
export const UserLogin = async (data) => await API.post("/api/auth/login", data);
export const VerifyOtp = async (data) => await API.post("/api/auth/verify-otp", data);

export const GetPosts = async () => await API.get("/api/posts");
export const CreatePost = async (data) => {
  const token = localStorage.getItem("token");
  return await API.post("/api/posts", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
export const GenerateImage = async (data) => await API.post("/api/generate", data);


const authHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});
export const GetConversations = async () =>
  await API.get("/api/chat", authHeaders());
export const CreateConversation = async (receiverId) =>
  await API.post("/api/chat/conversation", { receiverId }, authHeaders());
export const GetMessages = async (conversationId) =>
  await API.get(`/api/chat/${conversationId}`, authHeaders());
export const SearchUsers = async (query) =>
  await API.get(`/api/auth/search?q=${query}`, authHeaders());
