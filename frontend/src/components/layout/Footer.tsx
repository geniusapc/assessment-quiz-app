export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">© 2025 Quiz App. Built with React, TypeScript, and Vite.</div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Modern Tech Stack Demo</span>
            <span>•</span>
            <span>Clean Code Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
