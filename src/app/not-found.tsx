export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-9xl font-extrabold text-[var(--primary)]/20 mb-4 tracking-tighter">404</h1>
      <h2 className="text-3xl font-bold text-[var(--foreground)] mb-4">Page Not Found</h2>
      <p className="text-[var(--text-muted)] max-w-md mb-8">
        We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps you mistyped the URL.
      </p>
      <a href="/" className="bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white px-6 py-3 rounded-xl font-medium transition-colors">
        Return Home
      </a>
    </div>
  );
}
