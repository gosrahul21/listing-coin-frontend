// axiosInstance.js
import axios, { AxiosResponse } from 'axios';
import { RequestType } from '../types/enums/requestType';

const instance1 = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const instance3 = axios.create({
  baseURL: import.meta.env.VITE_AUtH_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export {
  instance1,
  instance3
};

export const apiCaller = async <T>(requestType: RequestType, endpoint: string, instance = instance1, data?: any, query?: any, contentType = 'application/json'): Promise<T> => {
  try {
    let headers: any = { 'Content-Type': contentType };
    const user = localStorage.getItem('user');
    if (user) {
      headers.Authorization = `Bearer ${JSON.parse(user).accessToken}`
    }
    const response: AxiosResponse<T> = await instance.request({
      method: requestType,
      url: endpoint,
      data,
      params: query,
      headers
    })
    return response.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};
