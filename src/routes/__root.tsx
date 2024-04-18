import CurrentUserContextProvider from "@contexts/currentUserContext";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { CookiesProvider } from "react-cookie";
import "../index.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      {" "}
      <CurrentUserContextProvider>
        <CookiesProvider>
          <Outlet />
        </CookiesProvider>
      </CurrentUserContextProvider>
    </>
  );
}
