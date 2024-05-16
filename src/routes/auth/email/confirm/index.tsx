import api from "@/libs/api";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";

const EmailConfirmSchema = z.object({
  token: z.string().optional(),
});

type EmailConfirmType = z.infer<typeof EmailConfirmSchema>;

type DisplayMessage = {
  mode: "error" | "success";
  message: string;
};

export const Route = createFileRoute("/auth/email/confirm/")({
  component: EmailConfirmComponent,
  validateSearch: (search): EmailConfirmType =>
    EmailConfirmSchema.parse(search),
});

function EmailConfirmComponent() {
  const { token } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [displayMessage, setDisplayMessage] = useState<DisplayMessage>();

  useEffect(() => {
    if (token === undefined) {
      setDisplayMessage({
        mode: "error",
        message: "Token was not found to verify email",
      });
    }

    api
      .post("/api/v1/auth/email/verify/" + token)
      .then(() => {
        setDisplayMessage({
          mode: "success",
          message: "Email verified successfully",
        });
      })
      .catch((err) => {
        setDisplayMessage({
          mode: "error",
          message:
            "Email verification failed. " + err.message || "Unknown error",
        });
      })
      .finally(() => {
        if (displayMessage?.mode === "success") {
          setTimeout(() => {
            navigate({ to: "/" });
          }, 2000);
        }
      });
  });

  return (
    <>
      {displayMessage ? (
        <div className={`alert alert-${displayMessage.mode}`}>
          {displayMessage.message}
        </div>
      ) : (
        <div>Verifying email...</div>
      )}
    </>
  );
}
