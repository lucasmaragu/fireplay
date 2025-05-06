import Link from "next/link";

export default function Footer() {
    return(
        <footer className="py-12 border-t border-zinc-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="inline-block mb-4">
                <h1 className="font-bold text-2xl tracking-wider">
                  <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">FIRE</span>
                  <span className="text-red-500">PLAY</span>
                </h1>
              </Link>
              <p className="text-zinc-500 mb-4">Your ultimate destination for gaming adventures and discoveries.</p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-zinc-400 hover:text-white text-sm">public</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-zinc-400 hover:text-white text-sm">mail</span>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-zinc-400 hover:text-white text-sm">forum</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/games" className="text-zinc-500 hover:text-red-500 transition-colors">
                    Games
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-zinc-500 hover:text-red-500 transition-colors">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-zinc-500 hover:text-red-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-zinc-500 hover:text-red-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-zinc-500 hover:text-red-500 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="text-zinc-500 hover:text-red-500 transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-zinc-500 hover:text-red-500 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-zinc-500 hover:text-red-500 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-zinc-300 font-medium mb-4">Download</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="block p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-zinc-400 mr-3">smartphone</span>
                    <div>
                      <div className="text-xs text-zinc-500">Download on the</div>
                      <div className="text-sm font-medium text-zinc-300">App Store</div>
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="block p-3 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <span className="material-symbols-outlined text-zinc-400 mr-3">android</span>
                    <div>
                      <div className="text-xs text-zinc-500">Get it on</div>
                      <div className="text-sm font-medium text-zinc-300">Google Play</div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-500 text-sm">&copy; {new Date().getFullYear()} FIREPLAY. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex gap-6">
                <li>
                  <Link href="/terms" className="text-zinc-500 text-sm hover:text-red-500 transition-colors">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-zinc-500 text-sm hover:text-red-500 transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="text-zinc-500 text-sm hover:text-red-500 transition-colors">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
}