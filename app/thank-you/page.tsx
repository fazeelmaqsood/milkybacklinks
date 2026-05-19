import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/layout/nav";
import { Footer } from "@/components/layout/footer";
import { ThankYouContent } from "./content";

export const metadata: Metadata = {
  title: "Request Confirmed",
  description: "Your request has been received.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 flex items-center justify-center px-4">
        <Suspense fallback={null}>
          <ThankYouContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
