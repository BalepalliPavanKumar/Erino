import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://lead-management-jqrh.vercel.app/api",
  withCredentials: true, // send cookie
});

// Auth
export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const logout = () => API.post("/auth/logout");
export const me = () => API.get("/auth/me");

// Leads
export const createLead = (data) => API.post("/leads", data);

// Updated listLeads to accept pagination params
export const listLeads = (params = { page: 1, limit: 5 }) =>
  API.get("/leads", { params });



export const getLead = (id) => API.get(`/leads/${id}`);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);

export default API;
