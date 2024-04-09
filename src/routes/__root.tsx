import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import "../index.css";
import CurrentUserContextProvider from "@ctx/currentUserContext";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <CurrentUserContextProvider>
        <div className="p-2 flex gap-2 text-lg">
          <Link
            to="/auth/login"
            activeProps={{
              className: "font-bold",
            }}
            activeOptions={{ exact: true }}
          >
            Login
          </Link>
          )
        </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools position="bottom-right" />
      </CurrentUserContextProvider>
    </>
  );
}
