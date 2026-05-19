"use client";

import { useState, Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, AlertCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signUp, useSession } from "@/lib/auth-client";

type Mode = "signin" | "signup";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") ?? "/dashboard";
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && session?.user) {
      router.replace(redirectTo);
    }
  }, [session, isPending, router, redirectTo]);

  const [mode, setMode] = useState<Mode>("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (isPending || session?.user) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-[#f97316]" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }
    if (mode === "signup" && !form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    if (mode === "signup") {
      const { data, error: authError } = await signUp.email({
        name: form.name.trim(),
        email: form.email,
        password: form.password,
      });

      setLoading(false);

      if (authError || !data) {
        setError(authError?.message ?? "Could not create account.");
        return;
      }

      router.push(redirectTo);
      router.refresh();
      return;
    }

    const { data, error: authError } = await signIn.email({
      email: form.email,
      password: form.password,
    });

    setLoading(false);

    if (authError || !data) {
      setError(authError?.message ?? "Invalid email or password.");
      return;
    }

    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="w-full max-w-sm">
      <Link href="/" className="flex items-center gap-2.5 justify-center mb-10">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f97316] to-[#fb923c] flex items-center justify-center shadow-lg shadow-[#f97316]/30">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-[#1a1a1a] text-xl">
          Milky<span className="text-[#f97316]">Backlinks</span>
        </span>
      </Link>

      <div className="rounded-2xl border border-[#e0ddd8] bg-[#f2f0eb] p-8">
        <h1 className="text-xl font-bold text-[#1a1a1a] mb-1">
          {mode === "signin" ? "Sign in" : "Create account"}
        </h1>
        <p className="text-sm text-[#9a9793] mb-6">
          {mode === "signin"
            ? "Access your campaign dashboard."
            : "Register to view campaigns after checkout."}
        </p>

        <div className="flex rounded-lg border border-[#e0ddd8] p-1 mb-6 bg-[#faf8f5]">
          <button
            type="button"
            onClick={() => {
              setMode("signin");
              setError("");
            }}
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              mode === "signin"
                ? "bg-white text-[#1a1a1a] shadow-sm"
                : "text-[#9a9793] hover:text-[#1a1a1a]"
            }`}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("signup");
              setError("");
            }}
            className={`flex-1 rounded-md py-1.5 text-xs font-medium transition-colors ${
              mode === "signup"
                ? "bg-white text-[#1a1a1a] shadow-sm"
                : "text-[#9a9793] hover:text-[#1a1a1a]"
            }`}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Jane Smith"
                autoComplete="name"
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              placeholder="you@company.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              required
              minLength={8}
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-2">
              <AlertCircle className="w-4 h-4 text-[#ef4444] shrink-0" />
              <p className="text-xs text-[#fca5a5]">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {mode === "signin" ? "Signing in..." : "Creating account..."}
              </>
            ) : mode === "signin" ? (
              "Sign in"
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </div>

      <p className="text-center text-xs text-[#b5b2ad] mt-6">
        Need help?{" "}
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "hello@milkybacklinks.com"}`}
          className="text-[#f97316] hover:underline"
        >
          Contact support
        </a>
      </p>

      <p className="text-center text-xs text-[#b5b2ad] mt-3">
        <Link href="/" className="hover:text-[#6b6866] transition-colors">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] grid-bg flex items-center justify-center px-4">
      <Suspense fallback={<Loader2 className="w-6 h-6 animate-spin text-[#f97316]" />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
