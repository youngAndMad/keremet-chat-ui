import { Outlet, createRootRoute } from "@tanstack/react-router";
import "../index.css";
import CurrentUserContextProvider from "@contexts/currentUserContext";
import { StompSessionProvider } from "react-stomp-hooks";
import { CookiesProvider, useCookies } from "react-cookie";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [session] = useCookies(["SESSION" as const]);
  return (
    <>
      <StompSessionProvider
        url={import.meta.env.VITE_WEB_SOCKET_URL}
        connectHeaders={{
          Cookie: `SESSION=${session.SESSION}`,
        }}
        onConnect={(frame) => console.log("Connected: ", frame)}
      >
        <CookiesProvider>
          <CurrentUserContextProvider>
            <Outlet />
          </CurrentUserContextProvider>
        </CookiesProvider>
      </StompSessionProvider>
    </>
  );
}
