import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

interface ApiClient {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

async function request<T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: never,
  config?: AxiosRequestConfig
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await apiClient({
      method,
      url,
      data,
      ...config,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(`Request failed: ${error}`);
  }
}

async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return request<T>("GET", url, undefined, config);
}

async function post<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>("POST", url, data, config);
}

async function put<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>("PUT", url, data, config);
}

async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return request<T>("DELETE", url, undefined, config);
}

async function patch<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  return request<T>("PATCH", url, data, config);
}

const api: ApiClient = {
  get,
  post,
  put,
  delete: del,
  patch,
};

export default api;
