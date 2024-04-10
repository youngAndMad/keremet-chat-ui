import PrivateRoute from "@components/PrivateRoute";
import { userLogined } from "@libs/user-exist";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/secured/")({
  component: () => <div>Hello /auth/secured/!</div>,
  loader: userLogined,
});
