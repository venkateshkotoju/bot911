import SEO from '../components/SEO';
import Hero from '../components/sections/Hero';
import Footer from '../components/sections/Footer';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <SEO
        title="About ModBot 911 - AI-Powered Porsche Modification Expert"
        description="Learn about ModBot 911's mission to democratize Porsche 911 modification knowledge through AI-powered advice, expert recommendations, and community-driven insights."
        keywords={[
          'About ModBot 911',
          'Porsche modification expert',
          'AI automotive advice',
          'Porsche tuning platform',
          'modification guidance',
          'automotive AI assistant'
        ]}
        url="https://modbot911.com/about"
        canonicalUrl="https://modbot911.com/about"
      />
      <main className="min-h-screen bg-black text-white font-sans">
        <Hero />
        
        {/* About Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black to-zinc-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              About <span className="text-red-500">ModBot 911</span>
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-300 leading-relaxed">
              Democratizing Porsche 911 modification knowledge through the power of artificial intelligence
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-20 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                  Every Porsche 911 owner deserves access to expert modification advice, regardless of their experience level or budget. ModBot 911 was born from the frustration of navigating fragmented forums, conflicting advice, and expensive consultation fees.
                </p>
                <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                  We believe that with the right guidance, every 911 can reach its full potential. Our AI-powered platform combines decades of modification knowledge with cutting-edge technology to deliver instant, personalized advice that would traditionally cost hundreds of dollars in consultation fees.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h3 className="text-red-400 font-semibold mb-2">🎯 Accessibility</h3>
                    <p className="text-sm text-zinc-400">Expert advice for everyone, not just the wealthy</p>
                  </div>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h3 className="text-red-400 font-semibold mb-2">⚡ Speed</h3>
                    <p className="text-sm text-zinc-400">Instant answers, no waiting for forum replies</p>
                  </div>
                  <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
                    <h3 className="text-red-400 font-semibold mb-2">🔬 Accuracy</h3>
                    <p className="text-sm text-zinc-400">Data-driven recommendations, not opinions</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-red-600/20 to-zinc-800/40 rounded-2xl p-8 border border-red-600/20">
                  <div className="text-6xl mb-4 text-center">🏎️</div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">The Problem We Solve</h3>
                  <ul className="space-y-3 text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">❌</span>
                      <span>Fragmented information across dozens of forums</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">❌</span>
                      <span>Conflicting advice from different &ldquo;experts&rdquo;</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">❌</span>
                      <span>Expensive consultation fees for basic questions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">❌</span>
                      <span>Overwhelming choices without clear guidance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 sm:py-20 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                ModBot 911 was created by a team of Porsche enthusiasts and AI engineers who were tired of the traditional barriers to modification knowledge. After spending countless hours researching upgrades for our own 911s, we realized that most owners face the same challenges:
              </p>
              
              <div className="bg-zinc-900 rounded-lg p-6 mb-6 border border-zinc-800">
                <h3 className="text-xl font-semibold text-red-400 mb-4">💡 The &ldquo;Aha&rdquo; Moment</h3>
                <p className="text-zinc-300 italic">
                  &ldquo;After spending $300 on a consultation call just to learn which cold air intake would work with my 997.2, I knew there had to be a better way. That&apos;s when we decided to build ModBot 911 – democratizing access to expert modification knowledge through AI.&rdquo;
                </p>
                <p className="text-sm text-zinc-500 mt-2">- Founder & Lead Developer</p>
              </div>

              <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                We spent months curating modification data, interviewing tuning experts, and training our AI model on thousands of successful builds. The result is a platform that can instantly provide the same level of guidance that previously required expensive consultations or years of forum lurking.
              </p>
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 sm:py-20 bg-zinc-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
              The Technology Behind ModBot 911
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-black rounded-lg p-6 border border-zinc-800">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-semibold text-white mb-4">Advanced AI Engine</h3>
                <p className="text-zinc-400 mb-4">
                  Powered by OpenAI&apos;s GPT-4, our AI has been specifically trained on Porsche 911 modification data, technical specifications, and real-world performance results.
                </p>
                <ul className="text-sm text-zinc-500 space-y-1">
                  <li>• Model-specific knowledge (996-992)</li>
                  <li>• Performance data analysis</li>
                  <li>• Compatibility checking</li>
                  <li>• Cost-benefit optimization</li>
                </ul>
              </div>

              <div className="bg-black rounded-lg p-6 border border-zinc-800">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-white mb-4">Smart Recommendation Engine</h3>
                <p className="text-zinc-400 mb-4">
                  Our proprietary algorithm considers your specific 911 model, budget, goals, and experience level to provide tailored recommendations.
                </p>
                <ul className="text-sm text-zinc-500 space-y-1">
                  <li>• Multi-factor analysis</li>
                  <li>• Real-time product matching</li>
                  <li>• Performance predictions</li>
                  <li>• Installation difficulty scoring</li>
                </ul>
              </div>

              <div className="bg-black rounded-lg p-6 border border-zinc-800">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-white mb-4">Continuous Learning</h3>
                <p className="text-zinc-400 mb-4">
                  ModBot 911 continuously learns from user interactions, new product releases, and community feedback to improve recommendations.
                </p>
                <ul className="text-sm text-zinc-500 space-y-1">
                  <li>• User feedback integration</li>
                  <li>• Product database updates</li>
                  <li>• Performance tracking</li>
                  <li>• Community insights</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team Values */}
        <section className="py-16 sm:py-20 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-left">
                <h3 className="text-xl font-semibold text-red-400 mb-3">🎯 Accuracy First</h3>
                <p className="text-zinc-300">
                  Every recommendation is backed by data, not opinions. We prioritize technical accuracy over flashy marketing claims.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-red-400 mb-3">🤝 Community Driven</h3>
                <p className="text-zinc-300">
                  ModBot 911 grows stronger with every user interaction. We&apos;re building a knowledge base by enthusiasts, for enthusiasts.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-red-400 mb-3">💡 Innovation</h3>
                <p className="text-zinc-300">
                  We&apos;re constantly pushing the boundaries of what&apos;s possible when you combine automotive expertise with cutting-edge AI.
                </p>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-red-400 mb-3">🔓 Transparency</h3>
                <p className="text-zinc-300">
                  No hidden agendas or biased recommendations. We&apos;re transparent about how our AI works and why it suggests specific modifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 sm:py-20 bg-gradient-to-t from-zinc-900 to-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Unlock Your 911&apos;s Potential?
            </h2>
            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Join thousands of Porsche enthusiasts who trust ModBot 911 for expert modification advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/#chat-section" 
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🚀 Start Chatting Now
              </Link>
              <Link 
                href="/faq" 
                className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-zinc-600 text-white rounded-lg transition-all text-lg font-semibold"
              >
                📚 Browse FAQ
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}