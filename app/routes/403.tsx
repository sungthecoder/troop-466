import { Link } from "@remix-run/react";

export default function Error403() {
  return (
    <main className="relative min-h-screen bg-[url('/assets/image/campfire.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto flex min-h-screen max-w-4xl items-center justify-center p-6">
        <section className="w-full max-w-lg rounded-box border border-white/20 bg-white/75 p-8 text-center shadow-xl backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-troop466-700">
            Access Restricted
          </p>
          <h1 className="mt-3 font-serif text-4xl text-troop466-950">
            403 Forbidden
          </h1>
          <p className="mt-3 text-base text-slate-700">
            You do not have permission to view this page.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link className="btn btn-primary text-white" to="/">
              Back to Home
            </Link>
            <Link className="btn btn-ghost text-slate-700" to="/#contact">
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
