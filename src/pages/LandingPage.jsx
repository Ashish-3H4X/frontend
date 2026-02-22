import React from "react";
import  Img from '../assets/illustrion.png'

export default function LandingPageWithIllustration() {
  // change this path if you move the image to public folder
  const heroImg = Img;

  return (
    <div className="min-h-screen text-gray-100 antialiased relative overflow-x-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #1a1238 0%, #060606 75%)",
        }}
      />

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
          VIRTUAL LEARNING
        </div>

        <nav className="hidden md:flex gap-6 items-center text-sm">
          <a href="#features" className="hover:text-indigo-300 transition">Features</a>
          <a href="#about" className="hover:text-indigo-300 transition">About</a>
          <a href="#pricing" className="hover:text-indigo-300 transition">Pricing</a>
          <a href="#contact" className="hover:text-indigo-300 transition">Contact</a>
          <a href="/login" className="px-4 py-2 rounded-md bg-white text-black font-medium">Login</a>
        </nav>

        {/* Mobile hamburger (simple) */}
        <div className="md:hidden">
          <button
            className="p-2 rounded-md bg-white/10"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      {/* HERO */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Learn from experts. <span className="block text-indigo-300 mt-2">Build real-world skills.</span>
            </h1>

            <p className="mt-6 text-gray-300 max-w-xl">
              Hands-on projects, AI-powered learning paths, and mentors who guide you from idea to
              product. Start building a portfolio employers notice.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center sm:items-start sm:justify-start gap-4">
              <a
                href="/home"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/25 hover:border-white transition bg-black/30"
              >
                <span className="text-sm font-semibold">Get Started</span>
                <span className="inline-block transform group-hover:translate-x-1 transition">➜</span>
              </a>

              <a
                href="#features"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-black font-medium shadow"
              >
                Explore Courses
              </a>
            </div>

            {/* mini features */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left">
                <h4 className="font-semibold">Real Projects</h4>
                <p className="text-sm text-gray-300 mt-1">Build portfolio-ready apps.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left">
                <h4 className="font-semibold">AI Paths</h4>
                <p className="text-sm text-gray-300 mt-1">Personalized study routes.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left">
                <h4 className="font-semibold">Mentors</h4>
                <p className="text-sm text-gray-300 mt-1">Real feedback from pros.</p>
              </div>
            </div>
          </div>

          {/* Right: illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg p-4 rounded-xl bg-gradient-to-br from-black/40 to-white/5 border border-white/6 shadow-xl">
              <img
                src={heroImg}
                alt="Start learning illustration"
                className="w-full h-auto rounded-md object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </main>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold">About Virtual Learning</h3>
            <p className="mt-4 text-gray-300 max-w-lg">
              We focus on practical skills — short, project-driven courses, assessments and
              mentor support to help you get job-ready faster.
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex gap-3 items-start">
                <span className="mt-1 text-indigo-400">✔</span>
                <div>
                  <strong>Project-first</strong>
                  <p className="text-gray-400">Ship real features you can demo.</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 text-indigo-400">✔</span>
                <div>
                  <strong>Mentor reviews</strong>
                  <p className="text-gray-400">Actionable feedback from industry pros.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-700 w-full h-56 flex items-center justify-center shadow-lg">
            <div className="text-gray-400">Illustration / Graphic</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold text-center">Features</h3>
        <p className="text-center text-gray-300 mt-3 max-w-2xl mx-auto">
          Tools that make learning efficient and practical.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Hands-on Projects",
            "AI Assessments",
            "Mentor Support",
            "Career Tools",
            "Live Sessions",
            "Certificate",
          ].map((t) => (
            <div key={t} className="p-6 rounded-lg bg-white/5 border border-white/10">
              <h4 className="font-semibold">{t}</h4>
              <p className="mt-2 text-sm text-gray-300">Practical features to speed up your learning.</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="max-w-7xl mx-auto px-6 py-12">
        <div className="rounded-xl bg-gradient-to-r from-indigo-700/30 to-indigo-500/20 border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-xl font-bold">Ready to build real projects?</h4>
            <p className="text-gray-300 mt-2">Join learners building real products and landing jobs.</p>
          </div>

          <div className="flex gap-4">
            <a href="/home" className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow">Get Started</a>
            <a href="#features" className="px-6 py-3 rounded-full border border-white/10">See Features</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div>© {new Date().getFullYear()} Virtual Learning. All rights reserved.</div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-indigo-300">Privacy</a>
            <a href="/terms" className="hover:text-indigo-300">Terms</a>
            <a href="/contact" className="hover:text-indigo-300">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
