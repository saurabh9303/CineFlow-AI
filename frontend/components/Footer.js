import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#020617] text-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
                CF
              </div>

              <h2 className="text-xl font-bold">CineFlow AI</h2>

            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered social automation platform to create, edit, and publish viral content across all platforms.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link href="/auto" className="hover:text-white">Auto Mode</Link></li>
              <li><Link href="/manual" className="hover:text-white">Manual Mode</Link></li>
              <li><Link href="/analytics" className="hover:text-white">Analytics</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>

            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white">About</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <div className="flex gap-3">

              <a
                href="#"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
              >
                Twitter
              </a>

              <a
                href="#"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
              >
                YouTube
              </a>

              <a
                href="#"
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-sm"
              >
                GitHub
              </a>

            </div>

            <p className="text-gray-500 text-xs mt-6">
              © {new Date().getFullYear()} CineFlow AI. All rights reserved.
            </p>

          </div>

        </div>

      </div>

      {/* Bottom glow */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />

    </footer>
  );
}