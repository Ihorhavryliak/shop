import axios from "axios";
import { getLocalStorage } from "../utils/getLocalStorage";

let token = '';


  if (localStorage.getItem('token') !== null) {
    token = localStorage.getItem('token') as string;
  }

export const instance = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: {
    "token": token
  }
});


