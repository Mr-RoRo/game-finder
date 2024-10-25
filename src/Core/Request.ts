import axios, { AxiosRequestConfig } from "axios";

export type ApiResponseList<DataType> = DataType;
export interface ApiResponse<DataType> {
  count: number;
  next: string;
  previous: string;
  results: DataType;
}

export type ApiParams = {
  data?: any;
  onUploadProgress?: AxiosRequestConfig<any>["onUploadProgress"];
};

export async function query<DataType>(
  options: AxiosRequestConfig<any>
): Promise<DataType> {
  return new Promise((resolve, reject) => {
    axios(options)
      .then((Response) => {
        if (Response) {
          if (
            Response.status !== 200 &&
            Response.status !== 201 &&
            Response.status !== 204
          ) {
            console.log("api error", Response);
          } else resolve(Response.data as DataType);
        }
      })
      .catch((error) => {
        if (error && error.response) {
          reject(error.response.data);
        }
      });
  });
}
