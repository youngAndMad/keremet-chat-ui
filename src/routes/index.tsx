import Navbar from "@/components/layout/Navbar";
import { useCurrentUser } from "@/contexts/currentUserContext";
import { createFileRoute } from "@tanstack/react-router";
import { useCookies } from "react-cookie";
import { StompSessionProvider } from "react-stomp-hooks";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [session] = useCookies(["SESSION" as const]);
  const { isExists: isCurrentUserExists } = useCurrentUser();
  console.log("isCurrentUserExists", isCurrentUserExists);

  return isCurrentUserExists ? (
    <StompSessionProvider
      url={import.meta.env.VITE_WEB_SOCKET_URL}
      connectHeaders={{
        Cookie: `SESSION=${session.SESSION}`,
      }}
      onConnect={(frame) => console.log("Connected: ", frame)}
    >
      <div>
        <Navbar />
      </div>
    </StompSessionProvider>
  ) : (
    <div>
      <Navbar />
    </div>
  );
}
