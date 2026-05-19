import { Suspense } from "react";
import type { Metadata } from "next";
import { GetStartedForm } from "./form";
import { Nav } from "@/components/layout/nav";

export const metadata: Metadata = {
  title: "Get Started — Start Your $500 Campaign",
  description:
    "Submit your brand details and start a Digital PR Starter Campaign for $500. Outreach tracking and backlink reporting included.",
};

export default function GetStartedPage() {
  return (
    <Suspense fallback={null}>
      <GetStartedForm />
    </Suspense>
  );
}
