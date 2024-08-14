import axios from "axios";
import { LoginVerification } from "../Types";

export async function loginVerification(email: string, password: string): Promise<LoginVerification> {
  const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
  try {
    if (!BASE_URL) throw new Error('No API ENDPOINT FOUND');
    const headers = {
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    };
    const userData = {
      email,
      password
    };
    const { data } = await axios.post(`${BASE_URL}/auth/login`, userData, { headers });
console.log(data);
    // Means the email or password was wrong
    if (data.statusCode === 401) throw new Error('Invalid email or password');

    // Return a valid LoginVerification object
    return {
      isLoggedIn: true,
      _token: data.value.token,
      errorMessage: ''
    };
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      return {
        isLoggedIn: false,
        _token: '',
        errorMessage: error.message
      };
    } else {
      throw error;
    }
  }
}
