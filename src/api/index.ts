import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { API_ENDPOINT } from '../config/envConstants';

interface IRequestOptions extends AxiosRequestConfig {
  token?: string | undefined;
}

interface IRequest {
  doGet: (options: IRequestOptions) => AxiosPromise<any>;
  doPost: (options: IRequestOptions) => AxiosPromise<any>;
  doDelete: (options: IRequestOptions) => AxiosPromise<any>;
  doUpdate: (options: IRequestOptions) => AxiosPromise<any>;
}

class Request implements IRequest {
  private baseURL: string;
  private api: AxiosInstance;

  constructor(baseUrl: string) {
    this.baseURL = baseUrl;
    this.api = axios.create({ baseURL: this.baseURL });
  }

  doGet({ token, ...args }: IRequestOptions) {
    const options: AxiosRequestConfig = {
      method: 'get',
      headers: {},
      ...args,
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    return this.api(options);
  }

  doPost({ url, data, token, ...args }: IRequestOptions) {
    const options: AxiosRequestConfig = {
      method: 'post',
      data,
      url,
      headers: {},
      ...args,
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    return this.api(options);
  }

  doUpdate({ url, data, token, ...args }: IRequestOptions) {
    const options: AxiosRequestConfig = {
      method: 'put',
      data,
      url,
      headers: {},
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    return this.api(options);
  }

  doDelete({ url, token, ...args }: IRequestOptions) {
    const options: AxiosRequestConfig = {
      method: 'delete',
      url,
      headers: {},
      ...args,
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    return this.api(options);
  }
}

export default Request;

export const authRequest = new Request(`${API_ENDPOINT}auth/`);
export const playersRequest = new Request(`${API_ENDPOINT}players/`);
export const playersGroupRequest = new Request(`${API_ENDPOINT}playerGroup/`);
