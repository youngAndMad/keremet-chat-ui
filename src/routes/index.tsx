import Navbar from "@/components/layout/Navbar";
import { useCurrentUser } from "@/contexts/currentUserContext";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { StompSessionProvider, useStompClient } from "react-stomp-hooks";

export const Route = createFileRoute("/")({
  component: Index,
});

function ChildComponent() {
  const { isExists: isCurrentUserExists } = useCurrentUser();
  const [cookies] = useCookies(["SESSION" as const]);
  const stompClient = useStompClient();
  useEffect(() => {
    if (isCurrentUserExists) {
      stompClient?.publish({
        destination: "/user/status/start-session",
        headers: {
          Cookie: `SESSION=${cookies.SESSION}`,
        },
      });
    }
  }, [isCurrentUserExists, stompClient?.connected]);

  useEffect(() => {
    const handleWindowClose = () => {
      if (isCurrentUserExists && stompClient?.connected) {
        stompClient.publish({
          destination: "/user/status/close-session",
          headers: {
            Cookie: `SESSION=${cookies.SESSION}`,
          },
        });
      }
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  });

  return (
    <div>
      <Navbar />
    </div>
  );
}

function Index() {
  const [session] = useCookies(["SESSION" as const]);

  return (
    <StompSessionProvider
      url={import.meta.env.VITE_WEB_SOCKET_URL}
      connectHeaders={{
        Cookie: `SESSION=${session.SESSION}`,
      }}
      onConnect={(frame) => console.log("Connected: ", frame)}
    >
      <ChildComponent />
    </StompSessionProvider>
  );
}
