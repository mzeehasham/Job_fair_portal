import React from "react";
import NewAccPageIm from "../Images/NewAccPageIm.png";
import SignUpForm from "../Components/SignUpForm";

function SignUp() {
  return (
    <section className="bg-white dark:bg-gray-900 relative">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage: `url(${NewAccPageIm})`,
            backgroundRepeat: "no-repeat",
            width: "50vw",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-blue-500 capitalize dark:text-white">
              Create A New Account
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your resume.
            </p>
            {/* form  */}
            <SignUpForm />
          </div>
        </div>
      </div>
    </section>
  );
}
export default SignUp;
