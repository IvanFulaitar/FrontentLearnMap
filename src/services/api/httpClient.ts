export interface ApiResponse<T> {
  data: T;
  status: number;
}

export interface HttpClient {
  get<T>(url: string): Promise<ApiResponse<T>>;
  post<TRequest, TResponse>(url: string, body: TRequest): Promise<ApiResponse<TResponse>>;
}

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockHttpClient: HttpClient = {
  async get<T>(_url: string) {
    await delay();
    return { data: undefined as T, status: 200 };
  },
  async post<TRequest, TResponse>(_url: string, _body: TRequest) {
    await delay();
    return { data: undefined as TResponse, status: 201 };
  },
};
