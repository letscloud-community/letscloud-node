import { AxiosResponse } from 'axios';

export default class RequestError extends Error {
  public response: AxiosResponse;

  constructor(message: string, response: AxiosResponse) {
    super(message);

    this.name = 'RequestError';
    this.response = response;
  }
}
