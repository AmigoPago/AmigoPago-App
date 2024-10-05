export default function FooterSection() {
    return (
      <footer className="bg-gradient-to-b from-[#f5f6f7] via-[#f5f6f7] to-[#c1c6d0] py-12 w-full">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="text-sm lg:text-xl text-gray-700">© 2024 AmigoPago. All rights reserved</div>
          <div className="text-right">
            <p className="text-sm lg:text-xl font-semibold text-gray-700">Contact</p>
            <p className="text-sm lg:text-xl text-gray-700">+1-123-456-7890.</p>
            <p className="text-sm lg:text-xl text-gray-700">support@AmigoPago.xyz</p>
          </div>
        </div>
      </footer>
    )
  }
