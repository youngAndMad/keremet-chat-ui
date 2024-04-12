import "./Login.scss";
import githubLogo from "@assets/images/logo/github.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/login/")({
  component: Login,
});

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
    // api
    //   .post("/api/v1/auth/login", { ...data })
    //   .then((data) => console.log(data))
    //   .catch((err) => console.error(err));
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1 className="login-title">Login to KeremetChat</h1>
        <div className="social-login">
          <a
            className="btn btn-block social-btn github"
            href={import.meta.env.VITE_GITHUB_AUTH_URL}
          >
            <img src={githubLogo} alt="Github" /> Log in with Github
          </a>
        </div>
        <div className="or-separator">
          <span className="or-text">OR</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div className="form-item">
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                maxLength: {
                  value: 30,
                  message: "Password cannot exceed 30 characters",
                },
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
              name="password"
              className="form-control"
              placeholder="Password"
              required
            />
          </div>
          {/* Display error messages for password field */}
          {errors.password && (
            <p role="error" className="text-red-500 text-xs italic">
              {errors.password.message}
            </p>
          )}
          <div className="form-item">
            <button type="submit" className="btn btn-block btn-primary">
              Login
            </button>
          </div>
        </form>
        <span className="signup-link">
          New user? <Link to="/auth/signup">Sign up!</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;
