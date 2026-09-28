"use client";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="bg-red-500/10 text-red-500 p-4 rounded-full mb-6">
        <AlertTriangle size={48} />
      </div>
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Something went wrong!</h2>
      <p className="text-[var(--text-muted)] max-w-md mb-8">
        We encountered an unexpected error while trying to load this page. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-3 rounded-xl font-medium transition-colors"
        >
          Try again
        </button>
        <a 
          href="/" 
          className="bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--foreground)] hover:border-[var(--primary)] px-6 py-3 rounded-xl font-medium transition-all"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
