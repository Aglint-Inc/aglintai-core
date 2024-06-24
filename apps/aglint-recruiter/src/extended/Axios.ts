import { Axios, AxiosError, AxiosRequestConfig } from 'axios';

import { API_PATHS } from '../constant/apiPaths';
import { ApiInterface } from '../utils/apiUtils/api.type';

export default class CustomAxios extends Axios {
  constructor() {
    super();
  }
  async call<T extends ApiInterface>(
    method: 'POST' | 'GET',
    path: (typeof API_PATHS)[number],
    body: T['request'],
    config?: AxiosRequestConfig<any>,
  ): Promise<T['response']> {
    try {
      let caller = null;
      switch (method) {
        case 'GET':
          caller = this.get(path, { ...config, params: body });
          break;
        case 'POST':
          caller = this.post(path, body, config);
          break;
        default:
          break;
      }
      const resData = await caller.then((res) => res.data);
      return resData;
    } catch (error) {
      let errorMessage = 'Api Error';
      if (error instanceof AxiosError) {
        errorMessage = error.response.data.error;
      }
      throw new Error(errorMessage);
    }
  }
}
