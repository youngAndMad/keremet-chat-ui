import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import githubLogo from "@assets/images/logo/github.png";
import "./SignUp.scss";
import { useForm } from "react-hook-form";
import api from "@libs/api";
import { Button } from "@mui/material";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useAlert } from "@/providers/alertProvider";
import { User } from "@/types/user/user";
import { userNotLogined } from "@/libs/page-loader/user-state";
import { FormInput } from "@/components/ui/form/form-input";
import React from "react";

export const Route = createFileRoute("/auth/signup/")({
  component: Signup,
  loader: userNotLogined,
});

type SignupFormData = {
  username: string;
  email: string;
  password: string;
};

const emailPattern = {
  value: new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$", "ig"),
  message: "Enter a valid email address.",
};

function Signup() {
  const {
    register,
    handleSubmit,
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
        setToStorage("user", user);
        navigate({
          to: "/auth/login/",
          search: {
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
            <FormInput<SignupFormData>
              name="username"
              type="text"
              id="username"
              label="Username"
              placeholder="Username"
              className="mb-2"
              register={register}
              rules={{ required: "You must enter your username." }}
              errors={errors}
            />
          </div>
          <div className="form-item">
            <FormInput<SignupFormData>
              id="email"
              type="email"
              name="email"
              label="Email Address"
              placeholder="Email Address"
              className="mb-2"
              register={register}
              rules={{
                required: "You must enter your email address.",
                pattern: emailPattern,
              }}
              errors={errors}
            />
          </div>
          <div className="form-item">
            <FormInput<SignupFormData>
              id="password"
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              className="mb-2"
              autoComplete="on"
              register={register}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
              errors={errors}
            />
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
