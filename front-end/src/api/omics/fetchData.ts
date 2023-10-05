// src/api.ts
import axios, { AxiosRequestConfig } from "axios";

export const sendRequest = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
