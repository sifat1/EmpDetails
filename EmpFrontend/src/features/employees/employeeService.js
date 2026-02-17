import API from "../../api/api";

export const getEmployees = (search = "") =>
  API.get(`/employees?search=${search}`);

export const getEmployee = (id) =>
  API.get(`/employees/${id}`);

export const createEmployee = (data) =>
  API.post(`/employees`, data);

export const updateEmployee = (id, data) =>
  API.put(`/employees/${id}`, data);

export const deleteEmployee = (id) =>
  API.delete(`/employees/${id}`);
