import Link from"next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center glass-card rounded-lg p-12 max-w-2xl mx-auto">
        <h1 className="text-6xl font-bold font-heading text-[var(--primary)] mb-4">404</h1>
        <h2 className="text-2xl text-foreground mb-8">This page could not be found.</h2>
        <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[var(--primary)] text-[var(--primary)]-foreground rounded-xl hover:bg-[var(--primary)]/90 transition-all font-semibold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Go Home
          </Link>
          <Link
            href="/hub"
            className="px-6 py-3 bg-muted text-foreground rounded-xl hover:bg-muted/80 transition-colors font-semibold border border-border"
          >
            View Hub
          </Link>
        </div>
      </div>
    </div>
  );
}

