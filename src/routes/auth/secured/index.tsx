import { userLogined } from "@/libs/page-loader/user-state";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/secured/")({
  component: () => <div>Hello /auth/secured/!</div>,
  loader: userLogined,
});
