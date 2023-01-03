// import { useEffect, useState } from "react";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const signin = (formData) => API.post("/users/signin", formData);

export const signup = (formData) => API.post("/users/signup", formData);

export const fetchUsers=(search)=> API.get(`/users?search=${search}`)

export const createChat=(userId)=> API.post(`/chat`,userId)

export const fetchChats=()=> API.get('/chat')

export const createGroup=(groupChatName,selectedUsers)=> API.post(`/chat/group`, {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      })