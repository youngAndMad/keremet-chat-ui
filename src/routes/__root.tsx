import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../index.css";
import CurrentUserContextProvider from "@contexts/currentUserContext";
import { CookiesProvider } from "react-cookie";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <CookiesProvider>
        <CurrentUserContextProvider>
          <Outlet />
        </CurrentUserContextProvider>
      </CookiesProvider>
    </>
  );
}
