import { useCurrentUser } from "@ctx/currentUserContext";
import { redirect } from "@tanstack/react-router";
import React, { PropsWithChildren } from "react";

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { isExists } = useCurrentUser();

  if (!isExists) {
    redirect({
      to: "/auth/login",
      throw: false,
    });
    return;
  }

  return <>{children}</>;
};

export default PrivateRoute;
