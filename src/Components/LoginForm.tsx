import React, { useContext, useRef, useState } from 'react'
import Spinner from './Spinner';
import { loginVerification } from '../utils/loginVerification';
import { AppContext } from '../DataLayer/DataProviders/AppProvider';
import { Link } from 'react-router-dom';

function LoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [{ token }, appDispatch] = useContext(AppContext);
  console.log(token);
  // Login Handler Function =======
  async function handleLogin(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const emailVal = (emailRef.current?.value)?.trim().toLowerCase();
    const passwordVal = (passwordRef.current?.value)?.trim();

    if (!emailVal || !passwordVal) return;
    if (emailVal === '' || passwordVal === '') return;

    setIsLoading(true);
    try {
      const { isLoggedIn, _token, errorMessage } = await loginVerification(emailVal, passwordVal);
      setIsLoading(false);
      // Handle Login Failure Messages =======
      if (!isLoggedIn) {
        setErrorMessage(errorMessage);
        // Reset password input =======
        if (passwordRef.current) passwordRef.current.value = '';
      } else {
        // Handle Successful Login =======
        if (isLoggedIn) {
          setErrorMessage('');
          //  Saving the token in AppContext ===== =======
          appDispatch({ type: "UPDATE_TOKEN", payload: _token });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form
      action=""
      className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
    >
      <p className="text-center  font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
        Login in to your account
      </p>
      {errorMessage && (
        <span className="text-red-500 pl-2 text-sm">*{errorMessage}</span>
      )}
      <div>
        <div className="relative">
          <input
            type="email"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            placeholder="Enter email"
            ref={emailRef}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <input
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
            ref={passwordRef}
          />
        </div>
      </div>

      <button
        type="submit"
        className=" text-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        onClick={handleLogin}
      >
        {isLoading ? <Spinner /> : "Login in"}
      </button>

      <p className="text-center text-sm text-gray-500">
        No account?&nbsp;
        <Link
          className=" text-blue-300 dark:text-blue-300 underline transition-all duration-100 hover:text-blue-400"
          to="/sign-up"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}

export default LoginForm;
