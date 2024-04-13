import axios from "axios";
import { RegisterFormData } from "./pages/Register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await axios.post(
    `${API_BASE_URL}/api/users/register`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  if (response.status !== 200) {
    throw new Error(
      `Request failed with status code ${response.status}: ${response.statusText}`
    );
  }

  return response.data;
};
