import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  keywords: string[];
};

const faqData: FAQItem[] = [
  // General Porsche
  {
    id: "porsche-history",
    question: "What is the history of Porsche?",
    answer: "Porsche was founded in 1931 by Ferdinand Porsche, the engineer behind the original Volkswagen Beetle. The first Porsche-badged car was the 1948 Porsche 356, followed by the iconic 911 in 1963. Porsche has become one of the most respected automotive brands, known for its engineering excellence and driving dynamics.",
    category: "General Porsche",
    keywords: ["history", "founding", "ferdinand", "356", "brand"]
  },
  {
    id: "porsche-logo",
    question: "What does the Porsche logo mean?",
    answer: "The Porsche logo features a heraldic coat of arms from the Free People's State of Württemberg, representing the region where Porsche is based in Stuttgart, Germany. The black and red colors represent the state colors, and the horse symbolizes the Stuttgart region (which means 'horse farm' in old German). The crest is topped with a red-white checkerboard pattern from the city of Stuttgart.",
    category: "General Porsche",
    keywords: ["logo", "symbol", "stuttgart", "colors", "heraldic"]
  },
  {
    id: "porsche-models",
    question: "What are the different Porsche model lines?",
    answer: "Porsche offers a diverse lineup including: 911 (iconic sports car), 718 Boxster/Cayman (mid-engine roadster/coupe), Panamera (luxury sedan/coupe), Cayenne (SUV), Macan (compact SUV), Taycan (electric sedan), and the Motorsport models like GT3/GT2. Each model maintains Porsche's signature driving dynamics and engineering excellence.",
    category: "General Porsche",
    keywords: ["models", "911", "panamera", "cayenne", "taycan", "718"]
  },
  {
    id: "porsche-engineering",
    question: "What makes Porsche engineering special?",
    answer: "Porsche is known for its engineering excellence, particularly rear-engine/rear-wheel drive layouts, high-revving engines, and motorsport-derived technology. Their 'Intelligent Performance' philosophy combines power with efficiency. Porsche also pioneered technologies like PDK dual-clutch transmission and active aerodynamics in production cars.",
    category: "General Porsche",
    keywords: ["engineering", "technology", "pdk", "aerodynamics", "performance"]
  },
  // ModBot 911 Information
  {
    id: "what-is-modbot",
    question: "What is ModBot 911?",
    answer: "ModBot 911 is an AI-powered chatbot specifically designed to provide expert advice on Porsche 911 modifications. Built using Next.js and powered by OpenAI's GPT, it offers personalized recommendations on performance upgrades, handling improvements, and other modifications for Porsche 911 owners.",
    category: "ModBot 911 Information",
    keywords: ["modbot", "chatbot", "ai", "gpt", "next.js", "porsche 911"]
  },
  {
    id: "how-modbot-knows",
    question: "How does ModBot 911 know about Porsche models?",
    answer: "ModBot 911 has been trained on extensive Porsche 911 knowledge through structured data, a comprehensive products database, and a sophisticated recommendation engine. It understands different 911 generations (996, 997, 991, etc.) and can provide model-specific advice on modifications and upgrades.",
    category: "ModBot 911 Information",
    keywords: ["knowledge", "data", "training", "porsche", "911", "models"]
  },
  {
    id: "what-questions-modbot",
    question: "What kind of questions can I ask ModBot 911?",
    answer: "You can ask about performance upgrades, handling improvements, exhaust systems, suspension modifications, budget planning, installation difficulty, and more. ModBot 911 excels at helping with ECU tuning, power gains, part compatibility, and recommending modifications based on your specific Porsche model and goals.",
    category: "ModBot 911 Information",
    keywords: ["questions", "ask", "query", "help", "support"]
  },
  {
    id: "trust-recommendations",
    question: "Can I trust ModBot 911's recommendations?",
    answer: "Yes, ModBot 911 provides data-driven recommendations based on technical specifications, proven products from established brands, and safety considerations. All recommendations consider your specific car model, budget, and goals, with detailed explanations for each suggestion.",
    category: "ModBot 911 Information",
    keywords: ["trust", "recommendations", "reliable", "advice", "safety"]
  },
  {
    id: "personal-data",
    question: "Does ModBot 911 store my personal data?",
    answer: "ModBot 911 follows privacy-first principles. Basic chat functionality works anonymously without storing personal data. Email addresses from newsletter subscriptions are stored in a development file (subscribers.json) and would use a proper email service in production. No user accounts or chat sessions are stored by default.",
    category: "ModBot 911 Information",
    keywords: ["privacy", "data", "storage", "email", "newsletter", "personal"]
  },
  // Performance & Tuning
  {
    id: "power-gains-996",
    question: "How much power can I gain from tuning my 996 Turbo?",
    answer: "With a proper ECU tune like the Cobb Accessport V3, you can expect 60-80HP and 80-100TQ gains on a stock 996 Turbo. Combined with supporting mods like intake and exhaust, gains can reach 100+ HP. Always ensure your fuel system can support the additional power.",
    category: "Performance & Tuning",
    keywords: ["996", "turbo", "power", "gains", "tune", "cobb", "accessport"]
  },
  {
    id: "best-first-mod",
    question: "What's the best first modification for my 911?",
    answer: "For most 911s, start with an ECU tune or piggyback system. It's the most cost-effective way to unlock power while maintaining reliability. For naturally aspirated models, consider a cold air intake and exhaust system. Always prioritize supporting modifications before adding boost.",
    category: "Performance & Tuning",
    keywords: ["first", "mod", "modification", "beginner", "ecu", "tune", "intake", "exhaust"]
  },
  {
    id: "turbo-vs-na-mods",
    question: "What's the difference between modding turbocharged vs naturally aspirated 911s?",
    answer: "Turbocharged 911s (996/997/991/992 Turbo models) respond incredibly well to tuning with massive power gains from simple ECU modifications. NA models require more physical modifications like headers, intakes, and exhaust systems for noticeable gains. Turbo models are more mod-friendly but require careful attention to supporting systems.",
    category: "Performance & Tuning",
    keywords: ["turbo", "naturally aspirated", "na", "996", "997", "991", "992", "difference"]
  },

  // Suspension & Handling
  {
    id: "coilovers-vs-springs",
    question: "Should I get coilovers or lowering springs for my 911?",
    answer: "Coilovers like Bilstein B16 PSS10 offer adjustable damping and height, making them ideal for track use or fine-tuning. Lowering springs like H&R Sport Springs are more affordable and maintain OEM dampers. Choose coilovers if you want adjustability and track capability, springs for simple lowering and improved looks.",
    category: "Suspension & Handling",
    keywords: ["coilovers", "springs", "lowering", "bilstein", "h&r", "suspension", "track"]
  },
  {
    id: "track-suspension-setup",
    question: "What suspension setup is best for track days?",
    answer: "For serious track use, go with adjustable coilovers like KW V3 or Bilstein B16. Set them up with slightly stiffer springs, aggressive alignment (more negative camber), and performance brake pads. Don't forget adjustable sway bars for fine-tuning balance. Start conservative and adjust based on track feedback.",
    category: "Suspension & Handling",
    keywords: ["track", "suspension", "coilovers", "kw", "bilstein", "alignment", "sway bars"]
  },

  // Exhaust & Sound
  {
    id: "exhaust-sound-comparison",
    question: "How do different exhaust brands sound on a 911?",
    answer: "Fabspeed offers aggressive, deep tones with significant volume. Akrapovič provides refined, exotic sound with titanium construction. Borla S-Type delivers classic American muscle car growl. AWE Tuning offers sophisticated sound with drone-free highway cruising. Choose based on your preference for aggression vs refinement.",
    category: "Exhaust & Sound",
    keywords: ["exhaust", "sound", "fabspeed", "akrapovic", "borla", "awe", "tone"]
  },
  {
    id: "exhaust-drone-fix",
    question: "How can I eliminate exhaust drone on highway cruising?",
    answer: "Drone typically occurs around 2000-2500 RPM. Solutions include resonators, Helmholtz chambers, or switching to a different exhaust design. AWE Tuning exhausts are specifically engineered to eliminate drone. You can also add aftermarket resonators to existing systems or consider valve-controlled exhausts for on-demand sound control.",
    category: "Exhaust & Sound",
    keywords: ["drone", "highway", "resonator", "awe", "valve", "cruise"]
  },

  // Installation & DIY
  {
    id: "diy-difficulty-levels",
    question: "What modifications can I do myself vs needing a shop?",
    answer: "DIY-friendly: ECU tuning with Accessport, air filters, basic bolt-on parts. Intermediate: Exhaust systems, springs (with proper tools). Professional: Turbo upgrades, engine internals, alignment, complex electrical work. Always prioritize safety and don't hesitate to use a professional for critical systems.",
    category: "Installation & DIY",
    keywords: ["diy", "installation", "difficulty", "professional", "tools", "safety"]
  },
  {
    id: "required-tools",
    question: "What tools do I need for basic 911 modifications?",
    answer: "Essential tools include metric socket set, torque wrench, jack and jack stands, basic hand tools, and OBD2 scanner. For suspension work, add spring compressors and alignment tools. For tuning, you'll need a laptop and quality diagnostic software. Invest in quality tools - your safety depends on them.",
    category: "Installation & DIY",
    keywords: ["tools", "socket", "torque", "jack", "obd2", "scanner", "laptop"]
  },

  // Reliability & Maintenance
  {
    id: "reliability-concerns",
    question: "Will modifications affect my 911's reliability?",
    answer: "Conservative modifications with quality parts typically don't hurt reliability. Aggressive tuning, cheap parts, or poor installation can cause issues. Stick to proven brands, conservative tunes, and proper supporting modifications. Regular maintenance becomes even more critical with modified cars.",
    category: "Reliability & Maintenance",
    keywords: ["reliability", "maintenance", "conservative", "quality", "proven"]
  },
  {
    id: "warranty-implications",
    question: "How do modifications affect my Porsche warranty?",
    answer: "Any modification can potentially void warranty coverage for related components. Dealerships must prove the modification caused the failure under Magnuson-Moss Act. Keep all stock parts and documentation. Consider waiting until warranty expires for major modifications, or work with Porsche-authorized tuners when possible.",
    category: "Reliability & Maintenance",
    keywords: ["warranty", "dealership", "magnuson-moss", "stock", "authorized"]
  },

  // Budget & Planning
  {
    id: "budget-recommendations",
    question: "How much should I budget for performance modifications?",
    answer: "Budget 20-30% of your car's value for meaningful modifications. Start with $2000-3000 for basic bolt-ons (tune, intake, exhaust). Serious performance builds can cost $10,000-20,000+. Always budget for installation, supporting modifications, and potential repairs. Quality parts are worth the investment.",
    category: "Budget & Planning",
    keywords: ["budget", "cost", "investment", "planning", "value"]
  },
  {
    id: "modification-order",
    question: "In what order should I modify my 911?",
    answer: "1. ECU tune (biggest bang for buck), 2. Supporting mods (intake, exhaust), 3. Suspension for handling, 4. Brakes for stopping power, 5. Aesthetic modifications. Always ensure supporting systems can handle increased performance before adding more power.",
    category: "Budget & Planning",
    keywords: ["order", "sequence", "planning", "supporting", "systems"]
  },

  // Model-Specific
  {
    id: "996-specific-mods",
    question: "What are the best modifications for a 996 generation 911?",
    answer: "For 996 Turbo: Cobb Accessport, upgraded intercoolers, exhaust system, and suspension. For 996 Carrera: Headers, intake, exhaust, and lightweight flywheel. Address the IMS bearing issue on early models before major modifications. The 996 responds well to bolt-on modifications.",
    category: "Model-Specific",
    keywords: ["996", "turbo", "carrera", "ims", "bearing", "intercooler", "headers"]
  },
  {
    id: "997-vs-991-mods",
    question: "Are there different considerations for 997 vs 991 modifications?",
    answer: "997s have more aftermarket support and are easier to modify. 991s have more sophisticated electronics requiring specialized tuning. Both respond well to basic bolt-ons. 991s may require different exhaust routing due to rear suspension changes. 997.2 DFI engines need different tuning approaches than 997.1 models.",
    category: "Model-Specific",
    keywords: ["997", "991", "dfi", "electronics", "aftermarket", "routing"]
  }
];

const categories = [
  "All Categories",
  "General Porsche",
  "ModBot 911 Information",
  "Performance & Tuning",
  "Suspension & Handling", 
  "Exhaust & Sound",
  "Installation & DIY",
  "Reliability & Maintenance",
  "Budget & Planning",
  "Model-Specific"
];

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-zinc-900" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-3xl mx-auto px-2">
            Get expert answers to common Porsche 911 modification questions from our community of enthusiasts and professionals
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 sm:mb-10 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQ questions and answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 text-white px-4 py-4 pl-12 rounded-lg border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-base min-h-[44px] touch-manipulation"
            />
            <svg
              className="absolute left-4 top-4 h-5 w-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors min-h-[40px] ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-zinc-400 text-sm">
            {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
            {selectedCategory !== 'All Categories' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => (
              <div key={item.id} className="bg-zinc-800 rounded-lg border border-zinc-700">
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full px-4 sm:px-6 py-4 text-left flex justify-between items-center hover:bg-zinc-750 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-1">
                      {item.question}
                    </h3>
                    <span className="text-xs sm:text-sm text-red-400 font-medium">
                      {item.category}
                    </span>
                  </div>
                  {openItems.includes(item.id) ? (
                    <ChevronUpIcon className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(item.id) && (
                  <div className="px-4 sm:px-6 pb-4">
                    <div className="pt-4 border-t border-zinc-600">
                      <p className="text-sm sm:text-base text-zinc-300 leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                      
                      {/* Keywords for better searchability */}
                      <div className="mt-4 pt-4 border-t border-zinc-700">
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          <span className="text-xs text-zinc-500">Related:</span>
                          {item.keywords.slice(0, 5).map((keyword, index) => (
                            <span
                              key={index}
                              className="text-xs bg-zinc-700 text-zinc-300 px-2 py-1 rounded"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🤔</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No questions found
              </h3>
              <p className="text-zinc-400">
                Try adjusting your search terms or category filter
              </p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-zinc-800 rounded-lg p-6 sm:p-8 border border-zinc-700">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-sm sm:text-base text-zinc-300 mb-6">
              Can&apos;t find what you&apos;re looking for? Ask ModBot 911 directly for personalized advice on your specific Porsche modifications.
            </p>
            <button
              onClick={() => {
                const chatSection = document.getElementById('chat-section');
                if (chatSection) {
                  chatSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              Ask ModBot 911
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}