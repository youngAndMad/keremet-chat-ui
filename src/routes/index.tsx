import Navbar from "@/components/layout/Navbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <Navbar />
    </div>
  ),
});
