import axios from "axios";
import { SignUpFormData } from "../Types";

export async function signUpVerification(formData: SignUpFormData): Promise<{ status: string, message: string }> {
  const BASE_URL = process.env.REACT_APP_API_ENDPOINT;
  try {
    if (!BASE_URL) throw new Error('No API ENDPOINT FOUND');
    const headers = {
      'accept': '*/*',
      'Content-Type': 'application/json'
    };
    const { data } = await axios.post(`${BASE_URL}/auth/Register`, formData, { headers });
    // Return the data value
    return data.value;
  } catch (error) {
    console.error(error);
    // Returns an error
    throw new Error('An error occurred during account creation verification');
  }
}
