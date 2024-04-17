import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import githubLogo from "@assets/images/logo/github.png";
import { useState } from "react";
import "./SignUp.scss";
import { useForm } from "react-hook-form";
import api from "@libs/api";
import { Button } from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAlert } from "@/providers/alertProvider";
import { User } from "@/types/user/user";

export const Route = createFileRoute("/auth/signup/")({
  component: Signup,
});

interface SignupFormData {
  username: string;
  email: string;
  password: string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SignupFormData>();

  const { showAlert } = useAlert();

  const navigate = useNavigate();
  const { setToStorage } = useLocalStorage();

  const onSubmit = (formData: SignupFormData) => {
    api
      .post<User>("/api/v1/auth/register", { ...formData })
      .then(async (user) => {
        reset();
        showAlert(`User ${user.email} registered successfully`, "success");
        setToStorage("user", user);
        await navigate({
          to: "/",
          params: {
            hint: "User registered successfully!. Please sign in",
          },
        });
      })
      .catch((err) => showAlert(JSON.stringify(err), "error"));
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <h1 className="signup-title">Sign up to KeremetChat</h1>
        <div className="social-login">
          <a
            className="btn btn-block social-btn github"
            href={import.meta.env.VITE_GITHUB_AUTH_URL}
          >
            <img src={githubLogo} alt="Github" /> Sign up with Github
          </a>
        </div>
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              required
              {...register("username", { required: "Username is required" })}
            />
            {errors.username && <span>{errors.username.message}</span>}{" "}
          </div>
          <div className="form-item">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              required
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="form-item">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              required
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="form-item">
            <Button type="submit">Sign up</Button>
          </div>
        </form>
        <span className="login-link">
          Already have an account? <Link to="/auth/login/">Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Signup;
