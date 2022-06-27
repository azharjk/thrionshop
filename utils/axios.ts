import getConfig from "next/config";

import axios from "axios";

const { publicRuntimeConfig } = getConfig();

export const AxiosInstance = async () => {
  const axiosClient = axios.create({
    baseURL: `${publicRuntimeConfig.thrionProductsHost}:${publicRuntimeConfig.thrionProductsPort}/api`,
  });

  return axiosClient;
};
