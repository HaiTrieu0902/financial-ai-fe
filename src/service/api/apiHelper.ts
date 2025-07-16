/* eslint-disable @typescript-eslint/no-explicit-any */

import client from '.';
const API_HELPER = {
  get: (path: string, params?: any) => client.get(path, { params }).then((res) => res?.data),
  post: (path: string, payload: any) => client.post(path, payload).then((res) => res?.data),
  put: (path: string, payload: any) => client.put(path, payload).then((res) => res?.data),
  delete: (path: string, payload: any) => client.delete(path, { data: payload }).then((res) => res?.data),
  patch: (path: string, payload: any) => client.patch(path, payload).then((res) => res?.data),
};

export default API_HELPER;
