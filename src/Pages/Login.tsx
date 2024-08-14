import React from 'react'
import LoginForm from '../Components/LoginForm'

function Login() {
  return (
    <div className="">
      <div className="mx-auto bg-white dark:bg-gray-900 px-4 py-20 sm:px-6 lg:px-8 flex justify-center min-h-screen">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center sm:text-3xl text-2xl font-semibold tracking-wider text-blue-500 capitalize dark:text-white">
            Job Fair Portal
          </h1>
          <p className="mx-auto mt-4 max-w-lg p-2 text-center text-gray-500">
            Power your career with CUI Job Fair Portal. Create eye-catching
            resumes and connect with top companies for endless opportunities.
          </p>
          {/* Login Form */}
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login
