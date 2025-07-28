import { ThemeToggle } from "../ThemeToggle"

export default function Hero() {
  return (
    <header className="text-center py-8">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-4">
        <img
          src="/modbot-logo.png"
          alt="ModBot 911 Logo"
          className="h-12"
        />
        <ThemeToggle />
      </div>
      <p className="text-sm sm:text-base text-zinc-400 mt-2">
        Your Porsche 911 mod companion
      </p>
    </header>
  )
}
