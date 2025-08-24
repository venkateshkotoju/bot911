import Link from 'next/link';
import FAQ from '@/components/FAQ';
import SEO from '@/components/SEO';

export default function FAQPage() {
  return (
    <>
      <SEO
        title="Frequently Asked Questions - Porsche 911 Modification Guide"
        description="Comprehensive FAQ about Porsche 911 modifications. Get expert answers on tuning, performance parts, installation, and more for 996, 997, 991, and 992 models."
        keywords={[
          'Porsche 911 FAQ',
          'Porsche modification questions',
          'Porsche tuning guide',
          'Porsche performance FAQ',
          '996 997 991 992 questions',
          'Porsche modding help'
        ]}
        url="https://modbot911.com/faq"
        canonicalUrl="https://modbot911.com/faq"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How much power can I gain from tuning my 996 Turbo?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "With a proper ECU tune like the Cobb Accessport V3, you can expect 60-80HP and 80-100TQ gains on a stock 996 Turbo. Combined with supporting mods like intake and exhaust, gains can reach 100+ HP."
              }
            },
            {
              "@type": "Question",
              "name": "What's the best first modification for my 911?", 
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "For most 911s, start with an ECU tune or piggyback system. It's the most cost-effective way to unlock power while maintaining reliability."
              }
            },
            {
              "@type": "Question",
              "name": "Should I get coilovers or lowering springs for my 911?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Coilovers like Bilstein B16 PSS10 offer adjustable damping and height, making them ideal for track use. Lowering springs are more affordable and maintain OEM dampers."
              }
            }
          ]
        }}
      />
      
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <header className="bg-zinc-900 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3">
                <img
                  src="/modbot-logo.png"
                  alt="ModBot 911 Logo"
                  className="h-10 w-10"
                />
                <span className="text-xl font-bold text-white">ModBot 911</span>
              </Link>
              
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-zinc-300 hover:text-white transition-colors">
                  Home
                </Link>
                <Link href="/products" className="text-zinc-300 hover:text-white transition-colors">
                  Products
                </Link>
                <Link href="/faq" className="text-red-400 font-medium">
                  FAQ
                </Link>
                <Link href="/admin" className="text-zinc-300 hover:text-white transition-colors">
                  Admin
                </Link>
              </nav>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Link href="/" className="text-zinc-300 hover:text-white transition-colors text-sm">
                  ← Back
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="bg-zinc-900 border-b border-zinc-800">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/" className="text-zinc-400 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span className="text-zinc-300 font-medium ml-1 md:ml-2">FAQ</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* FAQ Content */}
        <FAQ />

        {/* Additional SEO Content */}
        <section className="py-16 bg-zinc-900 border-t border-zinc-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  About ModBot 911
                </h3>
                <p className="text-zinc-300 leading-relaxed">
                  ModBot 911 is your trusted source for Porsche 911 modification advice. Our AI-powered platform 
                  provides expert guidance on performance upgrades, tuning, and parts selection for all 911 
                  generations from 996 to 992.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Popular Topics
                </h3>
                <ul className="text-zinc-300 space-y-2">
                  <li>• ECU Tuning & Performance Chips</li>
                  <li>• Suspension & Coilover Upgrades</li>
                  <li>• Exhaust System Modifications</li>
                  <li>• Turbo & Supercharger Upgrades</li>
                  <li>• Brake System Enhancements</li>
                  <li>• Installation Guides & DIY Tips</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-zinc-900 border-t border-zinc-800 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-zinc-400">
              © 2024 ModBot 911. Expert Porsche 911 modification advice and recommendations.
            </p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link href="/privacy" className="text-zinc-400 hover:text-white text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-zinc-400 hover:text-white text-sm">
                Terms of Service
              </Link>
              <Link href="/contact" className="text-zinc-400 hover:text-white text-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}