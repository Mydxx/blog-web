import Link from "next/link";

export const metadata = {
  title: "404",
};

export default function NotFound() {
  return (
    <div className="py-24">
      <p className="font-mono text-sm text-muted">
        <span className="text-term">$</span> cat{" "}
        <span className="text-ink">/this/page</span>
      </p>
      <p className="mt-6 text-3xl font-semibold tracking-tight">
        <span className="text-term">command</span> not found
      </p>
      <p className="mt-3 font-mono text-xs text-muted">
        exit code 404 — 页面不存在或已被移动
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-term hover:underline underline-offset-4"
      >
        cd ~/ <span aria-hidden="true">↵</span>
      </Link>
    </div>
  );
}
