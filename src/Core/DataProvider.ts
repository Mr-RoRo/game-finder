import { ApiParams, ApiResponse, query } from "./Request";
import { AxiosRequestConfig } from "axios";

async function HttpRequest<DataType>(url: string, options: AxiosRequestConfig) {
  const data = await query<DataType>({ url: url, ...options });
  return data;
}
export class DataProvider {
  static post = async <DataType>(url: string, params?: ApiParams) => {
    const options: AxiosRequestConfig = {
      method: "post",
    };
    if (params && params.data) {
      options.data = params.data;
    }
    if (params && params.onUploadProgress) {
      options.onUploadProgress = params.onUploadProgress;
    }
    const data = await HttpRequest<ApiResponse<DataType>>(url, options);
    return data;
  };
  static async get<DataType>(url: string, params?: ApiParams) {
    const options: AxiosRequestConfig = {
      method: "get",
    };
    if (params && params.data) {
      options.data = params.data;
    }
    if (params && params.onUploadProgress) {
      options.onUploadProgress = params.onUploadProgress;
    }
    const data = await HttpRequest<ApiResponse<DataType>>(url, options);
    return data;
  }

  static async patch<DataType>(url: string, params?: ApiParams) {
    const options: AxiosRequestConfig = {
      method: "PATCH",
    };
    if (params && params.data) {
      options.data = params.data;
    }
    if (params && params.onUploadProgress) {
      options.onUploadProgress = params.onUploadProgress;
    }
    const data = await HttpRequest<ApiResponse<DataType>>(url, options);
    return data;
  }
  static async put<DataType>(url: string, params?: ApiParams) {
    const options: AxiosRequestConfig = {
      method: "PUT",
    };
    if (params && params.data) {
      options.data = params.data;
    }
    if (params && params.onUploadProgress) {
      options.onUploadProgress = params.onUploadProgress;
    }
    const data = await HttpRequest<ApiResponse<DataType>>(url, options);
    return data;
  }

  static async delete<DataType>(url: string, params?: ApiParams) {
    const options: AxiosRequestConfig = {
      method: "DELETE",
    };
    if (params && params.data) {
      options.data = params.data;
    }
    if (params && params.onUploadProgress) {
      options.onUploadProgress = params.onUploadProgress;
    }
    const data = await HttpRequest<ApiResponse<DataType>>(url, options);
    return data;
  }
}
