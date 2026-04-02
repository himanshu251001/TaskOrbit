import { getAccessToken, setAccessToken } from "../services/auth";

const BASE_URL = `http://${import.meta.env.VITE_API_URL || "localhost:3000"}`;
