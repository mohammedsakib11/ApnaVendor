const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-blue-600">
              ApnaVendor
            </h2>

            <p className="mt-3 text-sm text-gray-600 max-w-sm">
              Connect with trusted local service providers
              quickly and easily.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Quick Links
            </h3>

            <div className="mt-4 space-y-2">
              <a
                href="/"
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                Home
              </a>

              <a
                href="/vendors"
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                Find Vendors
              </a>

              <a
                href="/bookings"
                className="block text-sm text-gray-600 hover:text-blue-600"
              >
                My Bookings
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Support
            </h3>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                Contact Us
              </p>

              <p className="text-sm text-gray-600">
                Privacy Policy
              </p>

              <p className="text-sm text-gray-600">
                Terms & Conditions
              </p>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-500">
            © 2026 ApnaVendor. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;