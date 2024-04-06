import axios, {AxiosResponse, AxiosRequestConfig} from 'axios';

const apiClient = axios
    .create({baseURL: import.meta.env.VITE_API_BASE_URL});

// Define a generic type for response data
export interface ApiResponse<T> {
    data: T;
}

// Define a generic function for making HTTP requests
export async function request<T>(
    method: string,
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

        return response.data;
    } catch (error) {
        throw new Error(`Request failed: ${error}`);
    }
}

// Define specific methods for common HTTP request types
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('GET', url, undefined, config);
}

export async function post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('POST', url, data, config);
}

export async function put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('PUT', url, data, config);
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request<T>('DELETE', url, undefined, config);
}
