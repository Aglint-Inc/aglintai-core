import axios from 'axios';

export const WebflowInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEBFLOW_BASE_URL,
});
