import Header from '../components/Header'
import Hero from '../components/Hero'
import DemoCard from '../components/DemoCard'
import Footer from '../components/Footer'

const demos = [
  {
    id: 'react-voice-starter',
    title: 'React Voice+ Starter Kit',
    description: 'A comprehensive React application demonstrating voice-enabled interactions using NLX\'s Voice+ capabilities.',
    features: [
      'Voice navigation between pages',
      'Custom voice commands for UI interactions',
      'Voice-controlled form filling',
      'Interactive voice command test lab',
      'Real-time touchpoint configuration'
    ],
    demoUrl: '/react-voice+-starter/',
    githubUrl: 'https://github.com/nlxai/demos/tree/main/react-voice+-starter',
    isExternal: false
  }
]

export default function HomePage() {
  const activeDemos = demos.filter(demo => demo.demoUrl !== '#')
  const comingSoonDemos = demos.filter(demo => demo.demoUrl === '#')

  return (
    <div className="min-h-screen flex flex-col bg-nlx-offwhite-1">
      <Header />
      <Hero />
      
      <main className="flex-grow max-w-container mx-auto px-5 lg:px-10 py-12 md:py-16 lg:py-20">
        <section className="mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-h2 text-nlx-black mb-8 md:mb-12 text-center">Available Demos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {activeDemos.map(demo => (
              <DemoCard key={demo.id} {...demo} />
            ))}
          </div>
        </section>

        {comingSoonDemos.length > 0 && (
          <section>
            <h2 className="text-h2 text-nlx-black mb-8 md:mb-12 text-center">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 opacity-60">
              {comingSoonDemos.map(demo => (
                <DemoCard key={demo.id} {...demo} />
              ))}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

