export default function Footer() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="max-w-3xl mx-auto px-5 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} mydxx — built with{" "}
          <span className="text-term">next.js</span> + mdx
        </p>
        <div className="flex items-center gap-5 font-mono text-xs text-muted">
          <a
            href="https://github.com/Mydxx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-term transition-colors"
          >
            github
          </a>
          <a
            href="/rss.xml"
            className="hover:text-term transition-colors"
          >
            rss
          </a>
        </div>
      </div>
    </footer>
  );
}
