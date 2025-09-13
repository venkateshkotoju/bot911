import SEO from '../components/SEO';
import Footer from '../components/sections/Footer';
import { ChevronRightIcon, CheckIcon } from 'lucide-react';
import Link from 'next/link';

export default function Landing() {
  return (
    <>
      <SEO
        title="Get Expert Porsche 911 Modification Advice in 30 Seconds - ModBot 911"
        description="Stop wasting money on wrong parts! Get instant, AI-powered Porsche 911 modification advice from our expert system. Free personalized recommendations for all 911 models."
        keywords={[
          'Porsche 911 modification advice',
          'instant Porsche tuning consultation',
          'AI Porsche expert',
          'free 911 modification guide',
          'Porsche performance recommendations',
          'expert 911 tuning advice'
        ]}
        url="https://modbot911.com/landing"
        canonicalUrl="https://modbot911.com/landing"
      />
      <main className="min-h-screen bg-black text-white font-sans">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-zinc-900"></div>
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/20 rounded-full px-4 py-2 mb-6">
              <span className="text-red-400 text-sm font-semibold">🔥 TRUSTED BY 10,000+ PORSCHE OWNERS</span>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Stop Wasting Money on{' '}
              <span className="text-red-500">Wrong Parts</span>
            </h1>
            
            {/* Sub-headline */}
            <p className="text-xl sm:text-2xl lg:text-3xl text-zinc-300 mb-8 leading-relaxed">
              Get <span className="text-red-400 font-semibold">instant expert advice</span> on your Porsche 911 modifications.
              <br className="hidden sm:block" />
              AI-powered. Data-driven. <span className="text-red-400 font-semibold">Completely free.</span>
            </p>
            
            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckIcon className="h-5 w-5 text-green-400" />
                <span>30-Second Recommendations</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckIcon className="h-5 w-5 text-green-400" />
                <span>All 911 Models Supported</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <CheckIcon className="h-5 w-5 text-green-400" />
                <span>No Sign-up Required</span>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="space-y-4">
              <Link 
                href="/#chat-section" 
                className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 border-2 border-red-500 hover:border-red-400 text-white rounded-lg transition-all text-xl font-bold shadow-2xl hover:shadow-red-500/25 transform hover:scale-105"
              >
                🚀 Get Expert Advice Now
                <ChevronRightIcon className="h-6 w-6" />
              </Link>
              <p className="text-sm text-zinc-500">
                ⚡ Instant results • 🔓 No account needed • 💯 Completely free
              </p>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 text-6xl opacity-10 rotate-12">🏎️</div>
          <div className="absolute bottom-20 right-10 text-4xl opacity-10 -rotate-12">⚡</div>
          <div className="absolute top-1/2 left-5 text-3xl opacity-5">🔧</div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Tired of This? 😤
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🤯</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Conflicting Forum Advice
                </h3>
                <p className="text-zinc-400">
                  Spend hours reading contradictory opinions from &ldquo;experts&rdquo; who can&apos;t agree on anything.
                </p>
              </div>
              
              <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">💸</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Expensive Mistakes
                </h3>
                <p className="text-zinc-400">
                  Buy the wrong parts, waste money on incompatible modifications, regret decisions.
                </p>
              </div>
              
              <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Endless Research
                </h3>
                <p className="text-zinc-400">
                  Weeks of research just to make one modification decision. Time you&apos;d rather spend driving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-20 bg-gradient-to-b from-zinc-900 to-black">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                There's a <span className="text-red-500">Better Way</span> 🎯
              </h2>
              <p className="text-xl text-zinc-300 max-w-3xl mx-auto">
                ModBot 911 eliminates the guesswork with AI-powered expert advice tailored to your specific Porsche model and goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 rounded-full p-2 flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Instant Expert Answers
                    </h3>
                    <p className="text-zinc-400">
                      Get professional-level advice in 30 seconds, not 30 days of forum searching.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 rounded-full p-2 flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Model-Specific Recommendations
                    </h3>
                    <p className="text-zinc-400">
                      Tailored advice for your exact 911 generation, from 996 to 992 Turbos.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 rounded-full p-2 flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Budget-Optimized Plans
                    </h3>
                    <p className="text-zinc-400">
                      Maximize your performance gains within your specific budget constraints.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-green-600 rounded-full p-2 flex-shrink-0">
                    <CheckIcon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Real Performance Data
                    </h3>
                    <p className="text-zinc-400">
                      Actual dyno-proven gains, not marketing claims or forum speculation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-zinc-800 rounded-lg p-8 border border-zinc-700">
                <div className="bg-black rounded-lg p-6 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-zinc-500 text-sm ml-2">ModBot 911 Chat</span>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="bg-zinc-700 rounded-lg p-3">
                      <span className="text-zinc-400">You:</span> What&apos;s the best first mod for my 997.1 Turbo with a $2,000 budget?
                    </div>
                    <div className="bg-red-600 rounded-lg p-3">
                      <span className="text-red-200">ModBot 911:</span> For your 997.1 Turbo with $2K, I recommend the Cobb Accessport V3 ($679). You&apos;ll gain 80-100HP instantly, with $1,300 left for supporting mods like intake and exhaust. This gives you the biggest performance bang for your buck.
                    </div>
                  </div>
                </div>
                <p className="text-center text-zinc-400 text-sm">
                  🎯 Real conversation example
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-20 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Trusted by <span className="text-red-500">10,000+</span> Porsche Owners
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black rounded-lg p-6 border border-zinc-800">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-zinc-300 mb-4">
                  &ldquo;ModBot 911 saved me from buying the wrong intake for my 991 Turbo. The AI recommendations were spot-on and saved me $800!&rdquo;
                </p>
                <div className="text-sm text-zinc-500">
                  - Sarah K., 991.2 Turbo Owner
                </div>
              </div>
              
              <div className="bg-black rounded-lg p-6 border border-zinc-800">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-zinc-300 mb-4">
                  &ldquo;Finally, modification advice that makes sense! No more contradictory forum posts. Just clear, expert guidance for my 997 Turbo build.&rdquo;
                </p>
                <div className="text-sm text-zinc-500">
                  - Mike R., 997.1 Turbo Owner
                </div>
              </div>
              
              <div className="bg-black rounded-lg p-6 border border-zinc-800">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">⭐</span>
                  ))}
                </div>
                <p className="text-zinc-300 mb-4">
                  &ldquo;Used ModBot 911 to plan my entire $15K build. Every recommendation was perfect. Gained 150HP and couldn&apos;t be happier!&rdquo;
                </p>
                <div className="text-sm text-zinc-500">
                  - David L., 992 Turbo S Owner
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">10K+</div>
                <div className="text-zinc-400">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">50K+</div>
                <div className="text-zinc-400">Questions Answered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">500+</div>
                <div className="text-zinc-400">Products Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2">24/7</div>
                <div className="text-zinc-400">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-xl font-bold text-white mb-3">
                  ❓ How accurate are ModBot 911's recommendations?
                </h3>
                <p className="text-zinc-400">
                  Our AI is trained on real dyno data, expert knowledge, and thousands of successful builds. We provide actual performance numbers, not marketing claims.
                </p>
              </div>
              
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-xl font-bold text-white mb-3">
                  💰 How much does it cost to use ModBot 911?
                </h3>
                <p className="text-zinc-400">
                  ModBot 911 is completely free to use. No hidden fees, no subscription, no credit card required. Just instant expert advice.
                </p>
              </div>
              
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-xl font-bold text-white mb-3">
                  🚗 Which Porsche models are supported?
                </h3>
                <p className="text-zinc-400">
                  We support all 911 generations: 996 (1999-2005), 997 (2005-2012), 991 (2012-2019), and 992 (2019+), including all variants.
                </p>
              </div>
              
              <div className="bg-zinc-900 rounded-lg p-6 border border-zinc-800">
                <h3 className="text-xl font-bold text-white mb-3">
                  ⚡ How fast do I get recommendations?
                </h3>
                <p className="text-zinc-400">
                  Most questions are answered in 30 seconds or less. Complex build planning might take 1-2 minutes for comprehensive recommendations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-t from-red-900/20 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Build Your Dream 911?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join thousands of Porsche owners getting smarter modification advice.
            </p>
            
            <div className="space-y-6">
              <Link 
                href="/#chat-section" 
                className="inline-flex items-center gap-3 px-12 py-6 bg-red-600 hover:bg-red-700 border-2 border-red-500 hover:border-red-400 text-white rounded-lg transition-all text-2xl font-bold shadow-2xl hover:shadow-red-500/25 transform hover:scale-105"
              >
                🚀 Start Your Build Now
                <ChevronRightIcon className="h-8 w-8" />
              </Link>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-400" />
                  <span>Free Forever</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-400" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-400" />
                  <span>Expert Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-green-400" />
                  <span>No Sign-up</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}