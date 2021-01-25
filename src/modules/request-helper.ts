import axios, { AxiosInstance, Method, AxiosRequestConfig } from 'axios';

import { ApiResponse } from '../../letscloud-node';

export default class RequestHelper {
  private axiosInstance: AxiosInstance;

  constructor(apiToken: string) {
    this.axiosInstance = axios.create({
      baseURL: 'https://core.letscloud.io/api',
      headers: {
        'api-token': apiToken,
        'content-type': 'application/vnd.letscloud.v1+json',
      },
    });
  }

  public submitRequest<Data>(
    method: Method,
    resource: string,
    options: AxiosRequestConfig = {},
  ): Promise<ApiResponse<Data>> {
    return new Promise((resolve, reject) => {
      return this.axiosInstance(resource, {
        method,
        ...options,
      })
        .then((response: ApiResponse<Data>) => {
          if (!response.data.success) reject(response);

          return resolve(response);
        })
        .catch(reject);
    });
  }
}
