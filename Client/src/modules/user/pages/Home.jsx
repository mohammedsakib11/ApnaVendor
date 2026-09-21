import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Plumber",
    icon: "🔧",
  },
  {
    id: 2,
    name: "Electrician",
    icon: "⚡",
  },
  {
    id: 3,
    name: "Carpenter",
    icon: "🪚",
  },
  {
    id: 4,
    name: "Painter",
    icon: "🎨",
  },
  {
    id: 5,
    name: "Cleaning",
    icon: "🧹",
  },
];

const featuredVendors = [
  {
    id: 1,
    name: "Jay Plumbing Service",
    category: "Plumber",
    location: "Ahmedabad",
    rating: "4.5",
    reviews: "98 Reviews",
    price: "₹400 - ₹700",
  },
  {
    id: 2,
    name: "Perfect Painters",
    category: "Painter",
    location: "Ahmedabad",
    rating: "4.7",
    reviews: "120 Reviews",
    price: "₹2,250 - ₹8,000",
  },
  {
    id: 3,
    name: "AC Cool Services",
    category: "Electrician",
    location: "Ahmedabad",
    rating: "4.3",
    reviews: "75 Reviews",
    price: "₹500 - ₹2,000",
  },
];

const recentBookings = [
  {
    id: "B-1001",
    vendor: "Sharma Plumbing",
    service: "Pipe Repair",
    date: "27 May 2025",
    status: "Pending",
  },
  {
    id: "B-1002",
    vendor: "Perfect Painters",
    service: "Wall Painting",
    date: "24 May 2025",
    status: "Completed",
  },
];

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-full">

      {/* Hero / Welcome Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <div className="max-w-3xl">

            <p className="text-sm font-medium text-blue-600 mb-3">
              Welcome to ApnaVendor
            </p>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Find Trusted Services
              <br />
              Near You
            </h1>

            <p className="mt-4 text-gray-500 text-base max-w-2xl">
              Find trusted local service providers and book the service
              you need easily.
            </p>

            {/* Search */}
            <div className="mt-8 flex flex-col md:flex-row gap-3">

              <div className="flex-1 relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search services..."
                  className="w-full h-12 pl-11 pr-4 border border-gray-300 rounded-md bg-white text-sm outline-none focus:border-blue-500"
                />

              </div>

              <Link
                to="/vendors"
                className="h-12 px-7 flex items-center justify-center bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
              >
                Search
              </Link>

            </div>

          </div>

        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Categories
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Find services by category
            </p>
          </div>

          <Link
            to="/vendors"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </Link>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">

          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="bg-white border border-gray-200 rounded-lg p-5 text-center hover:border-blue-400 hover:shadow-sm transition"
            >

              <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center text-2xl">
                {category.icon}
              </div>

              <h3 className="mt-3 text-sm font-semibold text-gray-800">
                {category.name}
              </h3>

            </Link>
          ))}

        </div>

      </section>

      {/* Featured Vendors */}
      <section className="bg-white border-y border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Featured Vendors
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Trusted service providers near you
              </p>
            </div>

            <Link
              to="/vendors"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All
            </Link>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {featuredVendors.map((vendor) => (
              <div
                key={vendor.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >

                {/* Vendor Image Placeholder */}
                <div className="h-40 bg-gray-100 flex items-center justify-center">

                  <span className="text-5xl">
                    🏪
                  </span>

                </div>

                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h3 className="text-base font-semibold text-gray-800">
                        {vendor.name}
                      </h3>

                      <p className="mt-1 text-xs text-gray-500">
                        {vendor.category}
                      </p>
                    </div>

                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                      ★ {vendor.rating}
                    </span>

                  </div>

                  <div className="mt-4 space-y-2">

                    <p className="text-sm text-gray-500">
                      📍 {vendor.location}
                    </p>

                    <p className="text-sm text-gray-500">
                      ⭐ {vendor.reviews}
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {vendor.price}
                    </p>

                  </div>

                  <Link
                    to={`/vendors/${vendor.id}`}
                    className="mt-5 block w-full py-2.5 text-center border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition"
                  >
                    View Details
                  </Link>

                </div>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* Recent Bookings */}
      <section className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Bookings
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your recent service bookings
            </p>
          </div>

          <Link
            to="/bookings"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All
          </Link>

        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50 border-b border-gray-200">

                <tr>

                  <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                    Booking ID
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                    Vendor
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                    Service
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                    Date
                  </th>

                  <th className="px-5 py-3 text-xs font-semibold text-gray-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >

                    <td className="px-5 py-4 text-sm font-medium text-gray-800">
                      {booking.id}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-700">
                      {booking.vendor}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {booking.service}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {booking.date}
                    </td>

                    <td className="px-5 py-4">

                      <span
                        className={`
                          inline-block
                          px-2.5
                          py-1
                          rounded-full
                          text-xs
                          font-medium
                          ${
                            booking.status === "Completed"
                              ? "bg-green-50 text-green-700"
                              : "bg-yellow-50 text-yellow-700"
                          }
                        `}
                      >
                        {booking.status}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;