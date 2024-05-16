import axios from "axios";
import CONSTANTS from "../Constants/Constants";

const { BASE_URL } = CONSTANTS;
const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;
