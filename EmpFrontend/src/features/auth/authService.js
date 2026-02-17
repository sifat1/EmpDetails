import API from "../../api/api";

export const login = (data) => API.post("/auth/login", data);
