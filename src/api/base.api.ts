import axios from "axios";

const BASE_URL = "https://localhost:7205/api/"

export const instance = axios.create({baseURL: BASE_URL})