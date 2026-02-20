import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosError } from "axios";
import { toastError } from "$lib/toast.js";
import { PUBLIC_STRAPI_URL } from "$env/static/public";

const createStrapiClient = (): AxiosInstance => {
  const baseURL = `${PUBLIC_STRAPI_URL}/api`;

  return axios.create({
    baseURL,
    timeout: 60000, // Increased to 60 seconds to handle cold starts
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const strapiClient = createStrapiClient();

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const strapiRequest = async <T = any>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  config?: AxiosRequestConfig,
  retries = 2, // Add retry logic for GET requests
): Promise<T> => {
  try {
    const axiosConfig: AxiosRequestConfig = {
      method,
      url,
      ...config,
    };

    if (config?.params) {
      axiosConfig.params = config.params;
    }

    if (config?.data) {
      axiosConfig.data = config.data;
    }

    if (config?.headers) {
      axiosConfig.headers = {
        ...axiosConfig.headers,
        ...config.headers,
      };
    }

    const response = await strapiClient.request<T>(axiosConfig);

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    
    // Retry logic for GET requests on timeout or 5xx errors
    if (retries > 0 && method === "GET") {
      const shouldRetry = 
        axiosError.code === "ECONNABORTED" || // Timeout
        axiosError.code === "ETIMEDOUT" ||
        (axiosError.response?.status && axiosError.response.status >= 500);
      
      if (shouldRetry) {
        console.log(`Retrying request to ${url} (${retries} retries left)...`);
        await delay(1000); // Wait 1 second before retry
        return strapiRequest<T>(url, method, config, retries - 1);
      }
    }

    const responseData = axiosError.response?.data as any;

    let errorMessage = "An error occurred";
    if (responseData?.message) {
      errorMessage = responseData.message;
    } else if (axiosError.message) {
      errorMessage = axiosError.message;
    }

    toastError(errorMessage);
    throw error;

    /*throw new ApiErrorClass(errorMessage, {
      error: responseData?.error,
      statusCode: responseData?.statusCode,
      status: axiosError.response?.status,
      data: responseData,
    });*/
  }
};

export const api = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => strapiRequest<T>(url, "GET", config),

  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    strapiRequest<T>(url, "POST", { ...config, data }),

  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    strapiRequest<T>(url, "PUT", { ...config, data }),

  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    strapiRequest<T>(url, "PATCH", { ...config, data }),

  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    strapiRequest<T>(url, "DELETE", config),
};

export { strapiClient };
