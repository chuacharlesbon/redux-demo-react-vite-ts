// services.ts
import axios, { AxiosError, type AxiosInstance } from 'axios';
import { navigateTo } from './navigateService';

/** --------------------------------------------------
 *  Create ONE pre-configured Axios instance
 * --------------------------------------------------*/
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // Vite
  // baseURL: process.env.REACT_APP_API_URL // CRA
  timeout: 10_000,
  withCredentials: true, // send cookies if you need them
});

/** --------------------------------------------------
 *  Optional: request / response interceptors
 * --------------------------------------------------*/
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    // global error handling
    if (err.response?.status === 401) {
      // e.g. redirect to login
      navigateTo('/logout');
    }
    return Promise.reject(err);
  }
);

/** --------------------------------------------------
 *  Declare strongly-typed end-points
 * --------------------------------------------------*/
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

/* GET /todos */
export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get<Todo[]>('/todos');
  return data;
};

/* POST /todos */
export const addTodo = async (
  payload: Pick<Todo, 'title'>
): Promise<Todo> => {
  const { data } = await api.post<Todo>('/todos', payload);
  return data;
};

/* DELETE /todos/:id */
export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`/todos/${id}`);
};

/** --------------------------------------------------
 *  Export the raw Axios instance too (optional)
 * --------------------------------------------------*/
export default api;