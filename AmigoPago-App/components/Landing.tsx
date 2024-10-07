import { useState } from 'react'
import { Globe, DollarSign, Award, MapPin } from 'lucide-react'

export default function LandingPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cityState: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white py-8 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">The wallet of the Latino Immigrants</h1>
        <p className="text-xl mb-4 text-[#fbdc6a]">Fast, secure, and easy-to-use wallet for local and international payments!!!</p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
          Get Started
        </button>
      </header>

      <main className="flex-grow">
        <section className="py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#ff6f00]">Why Choose AmigoPago?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <h3 className="font-bold mb-2">Low-Cost, Fast Transfers</h3>
              <p className="text-sm">Affordable and quick international payments using Digital Dollars.</p>
            </div>
            <div className="text-center">
              <DollarSign className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <h3 className="font-bold mb-2">Using Cash</h3>
              <p className="text-sm">Cash to Digital Dollars conversion via registered Latino-owned U.S. merchants.</p>
            </div>
            <div className="text-center">
              <Award className="w-16 h-16 mx-auto text-blue-600 mb-4" />
              <h3 className="font-bold mb-2">Rewards-Based Credits</h3>
              <p className="text-sm">AMI points (earn on every TX) used as collateral for interest-free credits.</p>
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Seamless Payments, Anywhere</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-[#fbdc6a]" />
              <h3 className="font-bold mb-2 text-[#fbdc6a]">Local Payments</h3>
              <p className="text-sm">Pay at Latino-owned U.S. merchants with AMI points</p>
            </div>
            <div className="text-center">
              <Globe className="w-16 h-16 mx-auto mb-4 text-[#fbdc6a]" />
              <h3 className="font-bold mb-2 text-[#fbdc6a]">International Transfers</h3>
              <p className="text-sm">Send money across borders with low fees and lightning-fast transaction times</p>
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-8 text-[#ff6f00]">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sara M.',
                quote: '"AmigoPago Wallet has revolutionized how I send money to my family abroad. It\'s fast, cheap, and incredibly easy to use!"',
              },
              {
                name: 'Pedro R.',
                quote: '"As a small business owner, I love how simple it is to accept payments , just like receiving cash. Game changer!"',
              },
              {
                name: 'Maria T.',
                quote: '"I was new to wallets, but AmigoPago Wallet made it so easy to get started. Now I use it for all my in-store purchases and remittances!"',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-100 p-6 rounded-lg">
                <p className="italic mb-4">{testimonial.quote}</p>
                <p className="font-bold">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-blue-600 text-white py-12 px-4">
          <h2 className="text-2xl font-bold text-center mb-4">Ready to Simplify Your Payments?</h2>
          <p className="text-center mb-8 text-[#fbdc6a]">Join our waiting list and be the first to experience the future of money</p>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black rounded"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="cityState"
                placeholder="City, State"
                value={formData.cityState}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-black rounded"
                required
              />
            </div>
            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
              Join Waiting List
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}