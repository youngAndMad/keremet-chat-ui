import { redirect } from "@tanstack/react-router";

export async function userLogined() {
  let userExist = localStorage.getItem("currentUser") !== null;

  if (!userExist) {
    throw redirect({
      to: "/auth/login",
    });
  }
}
