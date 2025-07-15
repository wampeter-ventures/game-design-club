export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-extrabold">404 – Page not found</h1>
      <p className="text-muted-foreground max-w-prose">
        The page you&apos;re looking for doesn&apos;t exist. Maybe you took a wrong turn at Albuquerque.
      </p>
      <a href="/" className="text-primary underline">
        Back to home
      </a>
    </div>
  )
}
