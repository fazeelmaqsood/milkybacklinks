"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/auth-client";

type SignOutButtonProps = {
  className?: string;
  showLabel?: boolean;
};

export function SignOutButton({ className, showLabel = true }: SignOutButtonProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className={
        className ??
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#9a9793] hover:text-[#1a1a1a] hover:bg-[#f2f0eb] transition-colors w-full"
      }
    >
      <LogOut className="w-4 h-4" />
      {showLabel ? "Sign out" : <span className="sr-only">Sign out</span>}
    </button>
  );
}
