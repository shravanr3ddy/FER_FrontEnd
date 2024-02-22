import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../../../utility/constants";

const SignUp = () => {
  // Initialize useForm hook
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  // Function to execute on form submit
  const onSubmit = async (data) => {
    try {
      // Extracting username and password from the form data
      const { username, password } = data;
      // Make an API call with username and password
      const response = await axios.post('http://localhost:8080/api/register', { username, password });
      console.log(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('authenticated', true);
      // Handle response or redirect user
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
<div className="login_body">
    <div className="container login_container">
      <div className="login form">
        <header>Signup</header>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <input
            type="text"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>} */}

          <input
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: true })}
          />
          {errors.username && <span>This field is required</span>}

          <input
            type="password"
            placeholder="Create a password"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && <span>This field is required</span>}
          {errors.password && errors.password.type === "minLength" && <span>Password must have at least 6 characters</span>}

          <input
            type="password"
            placeholder="Confirm your password"
            {...register("confirmPassword", { 
              validate: (value) => value === watch('password') || "The passwords do not match"
            })}
          />
          {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

          <input type="submit" className="button" value="Signup" />
        </form>
        <div className="signup">
          <span className="signup">
            Already have an account?
            <Link to={ROUTE_PATHS.LOGIN} className="navbar-brand">Login</Link>
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SignUp;
