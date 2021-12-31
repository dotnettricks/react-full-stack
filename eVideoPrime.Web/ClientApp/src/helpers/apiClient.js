import axios from "axios";
import { API_ADDRESS } from "./constant";

const apiClient = axios.create({
    baseURL: API_ADDRESS,
    timeout: 50000,
    mode: 'cors',
    headers: {
        'Access-Control-Allow-Origin': true, 'Content-Type': 'application/json', 'Authorization': ''
    }
})

export default apiClient;