import axios from "axios";

const api = axios.create({
  baseURL:`http://${process.env.HOST_API_CLIENT || 'localhost'}:5050`,

});

export default api;

