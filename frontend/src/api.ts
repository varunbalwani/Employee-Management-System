import axios from "axios";

// Define the structure of an Employee object for type safety
export interface Employee {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
}

const API_BASE_URL =
  "https://employee-management-system-backend-latest-xyx1.onrender.com/api/employee";

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
};

export default apiService;
