import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { API_ENDPOINT } from '../config/envConstants';

interface IRequest {
  doGet: (url: string, token?: string) => AxiosPromise<any>;
  doPost: (url: string, data: any, token?: string) => AxiosPromise<any>;
  doDelete?: () => AxiosPromise<any>;
  doUpdate?: () => AxiosPromise<any>;
}

class Request implements IRequest {
  private baseURL: string;
  private api: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
    this.api = axios.create({ baseURL: this.baseURL });
  }

  doGet(url: string, token?: string) {
    const options: AxiosRequestConfig = {
      method: 'get',
      url,
      headers: {},
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    return this.api(options);
  }

  doPost(url: string, data: any, token?: string) {
    const options: AxiosRequestConfig = {
      method: 'post',
      data,
      url,
      headers: {},
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    return this.api(options);
  }
}

export default Request;

export const authRequest = new Request(`${API_ENDPOINT}auth/`);
