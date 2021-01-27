import axios, {
  AxiosInstance,
  Method,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import RequestError from '../errors/request-error';

export type ApiResponse<Data> = AxiosResponse<{ data: Data; success: boolean }>;

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
          if (!response.data.success) {
            reject(
              new RequestError('The request returned success false', response),
            );
          }

          return resolve(response);
        })
        .catch(reject);
    });
  }
}
