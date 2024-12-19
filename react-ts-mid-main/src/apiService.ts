import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/user/'; // 修改成你的後端 API 位置

export const getAllUsers = async () => {
  return axios.get(`${API_URL}findAll`);
};

export const addUser = async (user: any) => {
  return axios.post(`${API_URL}insertOne`, user);
};

export const deleteUser = async (id: string) => {
  return axios.delete(`${API_URL}deleteById`, { params: { id } });
};

export const updateUserName = async (id: string, name: string) => {
  return axios.put(`${API_URL}updateNameByID`, { id, name });
};
