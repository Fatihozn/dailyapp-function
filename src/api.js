import axios from "axios";

export default function api() {
  return axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
  });
}

export function API() {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
}
