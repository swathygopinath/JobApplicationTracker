import axios from "axios";

const API_BASE_URL = "https://localhost:44328"; // your backend base URL

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApplications = (page = 1, pageSize = 5) =>
  api.get(`/applications?page=${page}&pageSize=${pageSize}`);

export const addApplication = (app) => api.post("/applications", app);

export const updateApplication = (id, app) =>
  api.put(`/applications/${id}`, app);

export const deleteApplication = (id) => api.delete(`/applications/${id}`);
