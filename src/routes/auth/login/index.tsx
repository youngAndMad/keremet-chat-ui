import { FormInput } from "@/components/ui/form/form-input";
import { useCurrentUser } from "@/contexts/currentUserContext";
import api from "@/libs/api";
import { userNotLogined } from "@/libs/page-loader/user-state";
import { useAlert } from "@/providers/alertProvider";
import githubLogo from "@assets/images/logo/github.png";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import "./Login.scss";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginHintSchema = z.object({
  hint: z.string().optional(),
});

type LoginHint = z.infer<typeof LoginHintSchema>;

export const Route = createFileRoute("/auth/login/")({
  component: Login,
  loader: userNotLogined,
  validateSearch: (search): LoginHint => LoginHintSchema.parse(search),
});

const emailPattern = {
  value: new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$", "ig"),
  message: "Enter a valid email address.",
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { setUser } = useCurrentUser();
  const navigate = useNavigate();
  const { hint } = Route.useSearch();
  const { showAlert } = useAlert();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log(data);
    api
      .post("/api/v1/auth/login", { ...data })
      .then(async () => {
        showAlert("Login successful", "success");
        setUser(data);
        await navigate({
          to: "/",
        });
      })
      .catch((err) => {
        showAlert(JSON.stringify(err), "error");
      });
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
          {hint && <p className="text-red-500 text-xs italic">{hint}</p>}
          <div className="form-item">
            <FormInput<LoginFormData>
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
            <FormInput<LoginFormData>
              id="password"
              type="password"
              autoComplete="on"
              name="password"
              label="Password"
              placeholder="Password"
              className="mb-2"
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
