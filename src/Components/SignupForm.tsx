import React, { useEffect, useState } from "react";
import { SignUpFormData } from "../Types";
import { signUpVerification } from "../utils/signUpVerification";
import { useNavigate } from "react-router";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";


function SignUpForm() {

  // input fields states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [genderError, setGenderError] = useState("");

// Loading state
  const [isLoading, setIsLoading] = useState(false);
  
   // response states
  const [responseStatus, setResponseStatus] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  
  const navigate = useNavigate();


  // useEffect fot the response
  useEffect(()=>{
  if(responseStatus === "") return
  if(responseStatus==="Error"){
    const timeout = setTimeout(()=>{
    setResponseMessage("");
  },3000);
  return () => clearTimeout(timeout);
  }
  setTimeout(()=>{
    navigate('/login')
  },2000)
},[responseStatus,navigate]);

// Tailwind Classes
const tailwindLabelClasses = `block mb-2 text-sm text-gray-600 dark:text-gray-200`;

  const tailwindInputClasses = `block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`;

  const tailwindBtnClasses = `flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`;




// formHandler ==========================
 const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !firstName ||
      !lastName ||
      gender === -1 ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      // Handle the case when any field is empty
      console.log("*Please fill in all the fields");
      setGenderError("Please select a gender");
      return;
    }else {
      setGenderError("");
    }
    if (password !== confirmPassword) {
      setPasswordError("*Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setPasswordError("*Password should be at least 8 characters long");
      return;
    }

    // Password validation regex patterns
    const uppercaseRegex = /^(?=.*[A-Z])/;
    const numberRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[!@#$%^&*])/;

    // Check if the password meets the criteria
    if (
      !uppercaseRegex.test(password) ||
      !numberRegex.test(password) ||
      !specialCharRegex.test(password)
    ) {
      setPasswordError(
        "*Password must contain at least one uppercase letter, one number, and one special character"
      );
      return;
    }

    const lowercaseEmail = email.toLowerCase().trim();
    const lowercaseSuffix = "@cuiatd.edu.pk";

    if (!lowercaseEmail.endsWith(lowercaseSuffix)) {
      setEmailError("*Email should end with @cuiatd.edu.pk");
      return;
    }

    setIsLoading(true);
    const formData: SignUpFormData = {
      firstName,
      lastName,
      gender,
      email,
      password,
    };

  // Verifying the user data
 const {status,message} = await signUpVerification(formData);
 setResponseStatus(status);
 setResponseMessage(message);
 
 if (status){
  setIsLoading(false);
 }
// Resetting all input fields ===========
    setFirstName("");
    setLastName("");
    setGender(-1);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
  };

  // Input Fields Handlers ===========
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    setGender(value);
    setGenderError("");
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
  setConfirmPassword(event.target.value);
  setPasswordError("");
};

  return (
    <div>
      {responseMessage && <div className={`${responseStatus ==="Error" ? "bg-red-600":"bg-green-600" } absolute top-0 w-32 mx-auto`}><h3>{responseMessage}</h3></div>}
      <form
        className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
        onSubmit={handleFormSubmit}
      >
        <div>
          <label className={tailwindLabelClasses}>First Name</label>
          <input
            type="text"
            placeholder="John"
            className={tailwindInputClasses}
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>

        <div>
          <label className={tailwindLabelClasses}>Last name</label>
          <input
            type="text"
            placeholder="Snow"
            className={tailwindInputClasses}
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>

        <div>
          <label htmlFor="gender" className={tailwindLabelClasses}>
            Gender
          </label>
          <select
            id="gender"
            className={tailwindInputClasses}
            value={gender}
            onChange={handleGenderChange}
            required
          >
            <option value="-1" disabled hidden style={{ color: "#4b5552" }}>
              Select one of the options
            </option>
            <option value="1">Male</option>
            <option value="0">Female</option>
          </select>
          {genderError && <p className="text-red-500 mt-1">{genderError}</p>}
        </div>

        <div>
          <label className={tailwindLabelClasses}>Email address</label>
          <input
            type="email"
            placeholder="johnsnow@atdstudent.cui.edu.pk"
            className={tailwindInputClasses}
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p className="text-red-500 mt-1">{emailError}</p>}
        </div>

        <div>
          <label className={tailwindLabelClasses}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className={tailwindInputClasses}
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <div>
          <label className={tailwindLabelClasses}>Confirm password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className={tailwindInputClasses}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {passwordError && (
            <p className="text-red-500 mt-1">{passwordError}</p>
          )}
        </div>

        <button className={tailwindBtnClasses} type="submit">
          <span>{isLoading ? <Spinner /> : "Sign Up"} </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 rtl:-scale-x-100"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
      {responseMessage && (
        <div
          className={`${
            responseStatus === "Error" ? "text-red-600" : "text-green-600"
          } absolute my-2`}
        >
          <h3>*{responseMessage}</h3>
        </div>
      )}
      <br /><br />
      <Link
        to="/login"
        className=" text-blue-300 dark:text-blue-300 underline transition-all duration-100 hover:text-blue-400 object-right-bottom mx-auto my-20"
      >
        Already got a account?
      </Link>
    </div>
  );
}

export default SignUpForm;
