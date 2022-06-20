import axios from "axios";

export const AxiosInstance = async () => {
  const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api'
  });

  return axiosClient;
};
