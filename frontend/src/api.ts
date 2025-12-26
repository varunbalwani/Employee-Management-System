import axios from "axios";

// Define the structure of an Employee object for type safety
export interface Employee {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  createdBy?: string;
}

const API_BASE_URL = "http://localhost:8080/api/employee";
const AUTH_URL = "http://localhost:8080/api/auth";

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiService = {
  getAllEmployees: () => {
    return axios.get<Employee[]>(API_BASE_URL);
  },

  getEmployeeById: (id: number) => {
    return axios.get<Employee>(`${API_BASE_URL}/${id}`);
  },

  createEmployee: (employee: Employee) => {
    return axios.post<Employee>(API_BASE_URL, employee);
  },

  updateEmployee: (id: number, employee: Employee) => {
    return axios.put<Employee>(`${API_BASE_URL}/${id}`, employee);
  },

  deleteEmployee: (id: number) => {
    return axios.delete(`${API_BASE_URL}/${id}`);
  },

  login: (data: any) => {
    return axios.post(`${AUTH_URL}/login`, data);
  },

  register: (data: any) => {
    return axios.post(`${AUTH_URL}/register`, data);
  },
};

export default apiService;
