import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosStatic,
  AxiosError,
} from 'axios';

import { type API_PATHS } from '../constant/apiPaths';
import { type ApiInterface } from '../interface/NextApiRequest.interface';

export default class CustomAxios {
  private _axios: AxiosStatic;
  get: typeof axios.get;
  post: typeof axios.post;
  constructor() {
    this._axios = axios;
    this.get = axios.get;
    this.post = axios.post;
  }
  async call<T extends ApiInterface>(
    method: 'POST' | 'GET',
    path: (typeof API_PATHS)[number],
    body: T['request'],
    config?: AxiosRequestConfig<any>,
  ) {
    try {
      let caller: Promise<AxiosResponse<T['response'], any>>;
      switch (method) {
        case 'GET':
          caller = this._axios.get(path, { ...config, params: body });
          break;
        case 'POST':
          caller = this._axios.post(path, body, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      const resData = await caller.then((res) => res.data);
      return resData;
    } catch (error) {
      let errorMessage = 'Api Error';
      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data.error || errorMessage;
      }
      throw new Error(errorMessage);
    }
  }
}
