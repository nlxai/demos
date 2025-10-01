import { useNavigate } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import PricingCard from '../components/PricingCard'

const PRICING_PLANS = [
    {
      name: 'Starter',
      price: '$29',
      period: 'per month',
      description: 'Perfect for small teams getting started with Voice+',
      features: [
        'Up to 5 team members',
        '1,000 voice interactions/month',
        'Basic voice recognition',
        'Email support',
        'Standard security'
      ],
      highlighted: false,
      buttonText: 'Start Free Trial'
    },
    {
      name: 'Professional',
      price: '$79',
      period: 'per month',
      description: 'Ideal for growing businesses with advanced needs',
      features: [
        'Up to 25 team members',
        '10,000 voice interactions/month',
        'Advanced voice recognition',
        'Priority support',
        'Enhanced security',
        'Custom integrations',
        'Analytics dashboard'
      ],
      highlighted: true,
      buttonText: 'Start Free Trial'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited team members',
        'Unlimited voice interactions',
        'Premium voice recognition',
        'Dedicated support manager',
        'Enterprise-grade security',
        'Custom integrations & APIs',
        'Advanced analytics',
        'SLA guarantees'
      ],
      highlighted: false,
      buttonText: 'Contact Sales'
    }
  ]

export default function Pricing() {
  const navigate = useNavigate()

  const handlePlanSelection = (planName: string) => {
    if (planName === 'Enterprise') {
      navigate('/contact')
      return
    }
    console.log(`Selected plan: ${planName}`)
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      <SectionHeader 
        title="Simple, Transparent Pricing"
        subtitle="Choose the perfect plan for your team. All plans include our core Voice+ features with a 14-day free trial."
      />

      <section role="region" aria-labelledby="pricing-plans-heading">
        <h2 id="pricing-plans-heading" className="sr-only">Pricing Plans</h2>
        
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 mb-16">
          {PRICING_PLANS.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              onSelect={handlePlanSelection}
            />
          ))}
        </div>
      </section>

      <section role="region" aria-labelledby="faq-heading" className="mb-16">
        <h2 id="faq-heading" className="text-3xl font-semibold text-gray-900 text-center mb-8">
          Frequently Asked Questions
        </h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <dl className="space-y-6 sm:space-y-8">
            <div>
              <dt className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the free trial?
              </dt>
              <dd className="text-gray-600">
                All plans include a 14-day free trial with full access to features. No credit card required to start.
              </dd>
            </div>
            
            <div>
              <dt className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan?
              </dt>
              <dd className="text-gray-600">
                Yes, you can change your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.
              </dd>
            </div>
            
            <div>
              <dt className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my usage limits?
              </dt>
              <dd className="text-gray-600">
                We'll notify you when you're approaching your limits. You can upgrade your plan or purchase additional capacity as needed.
              </dd>
            </div>
            
            <div>
              <dt className="text-lg font-semibold text-gray-900 mb-2">
                Is there a setup fee?
              </dt>
              <dd className="text-gray-600">
                No setup fees for Starter and Professional plans. Enterprise plans may include implementation services with transparent pricing.
              </dd>
            </div>
            
            <div>
              <dt className="text-lg font-semibold text-gray-900 mb-2">
                How secure is my data?
              </dt>
              <dd className="text-gray-600">
                We employ enterprise-grade security measures including encryption, secure data centers, and compliance with industry standards like SOC 2 and GDPR.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section role="region" aria-labelledby="contact-sales-heading" className="text-center bg-gray-50 rounded-lg p-6 sm:p-8">
        <h2 id="contact-sales-heading" className="text-2xl font-semibold text-gray-900 mb-4">
          Need a Custom Solution?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our Enterprise plan can be tailored to your specific needs. Contact our sales team to discuss custom pricing, integrations, and features.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Contact Sales Team
        </button>
      </section>
    </div>
  )
}