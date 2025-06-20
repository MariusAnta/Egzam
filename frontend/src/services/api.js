// api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

// Šią funkciją importuosi į AuthContext ir ten nustatysi interceptorių
export const setupInterceptors = (logout) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    }
  );
};

export default api;
