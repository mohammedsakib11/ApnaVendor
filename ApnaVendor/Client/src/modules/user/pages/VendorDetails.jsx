import { Link, useParams } from "react-router-dom";

const vendors = [
  {
    id: 1,
    name: "Jay Plumbing Service",
    category: "Plumber",
    location: "Ahmedabad",
    rating: "4.5",
    reviews: 98,
    price: "₹400 - ₹700",
    description:
      "Professional plumbing services for homes and offices. Experienced professionals providing reliable and affordable plumbing solutions.",
    phone: "+91 98765 43210",
    services: [
      "Pipe Repair",
      "Tap & Faucet Repair",
      "Bathroom Plumbing",
      "Water Tank Service",
    ],
    availability: "Available Today",
  },
  {
    id: 2,
    name: "Perfect Painters",
    category: "Painter",
    location: "Ahmedabad",
    rating: "4.7",
    reviews: 120,
    price: "₹2,250 - ₹8,000",
    description:
      "Reliable painting services with experienced professionals for residential and commercial properties.",
    phone: "+91 98765 43211",
    services: [
      "Interior Painting",
      "Exterior Painting",
      "Wall Painting",
      "Texture Painting",
    ],
    availability: "Available Today",
  },
  {
    id: 3,
    name: "AC Cool Services",
    category: "Electrician",
    location: "Ahmedabad",
    rating: "4.3",
    reviews: 75,
    price: "₹500 - ₹2,000",
    description:
      "Professional AC installation, repair and electrical services with experienced technicians.",
    phone: "+91 98765 43212",
    services: [
      "AC Repair",
      "AC Installation",
      "Electrical Repair",
      "AC Maintenance",
    ],
    availability: "Available Tomorrow",
  },
  {
    id: 4,
    name: "Home Care Cleaning",
    category: "Cleaning",
    location: "Ahmedabad",
    rating: "4.6",
    reviews: 86,
    price: "₹500 - ₹1,500",
    description:
      "Professional home and office cleaning services with trained and verified staff.",
    phone: "+91 98765 43213",
    services: [
      "Home Cleaning",
      "Office Cleaning",
      "Deep Cleaning",
      "Bathroom Cleaning",
    ],
    availability: "Available Today",
  },
  {
    id: 5,
    name: "Expert Wood Works",
    category: "Carpenter",
    location: "Ahmedabad",
    rating: "4.4",
    reviews: 64,
    price: "₹800 - ₹3,000",
    description:
      "Furniture repair and customized carpentry services for homes and offices.",
    phone: "+91 98765 43214",
    services: [
      "Furniture Repair",
      "Door Repair",
      "Custom Furniture",
      "Wood Work",
    ],
    availability: "Available Today",
  },
];

const reviews = [
  {
    id: 1,
    name: "Rahul Patel",
    rating: 5,
    comment: "Very professional service and reasonable pricing.",
  },
  {
    id: 2,
    name: "Priya Shah",
    rating: 4,
    comment: "Good service. Vendor arrived on time.",
  },
  {
    id: 3,
    name: "Mohit Patel",
    rating: 5,
    comment: "Excellent experience. Would definitely recommend.",
  },
];

const VendorDetails = () => {
  const { id } = useParams();

  const vendor = vendors.find(
    (item) => item.id === Number(id)
  );

  if (!vendor) {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <div className="text-5xl">
            🔍
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Vendor Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The vendor you are looking for does not exist.
          </p>

          <Link
            to="/vendors"
            className="inline-block mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Browse Vendors
          </Link>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">

      {/* Header */}
      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
            to="/vendors"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back to Vendors
          </Link>

          <div className="mt-6 flex flex-col md:flex-row gap-6">

            {/* Vendor Image */}
            <div className="w-full md:w-52 h-44 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
              <span className="text-6xl">
                🏪
              </span>
            </div>

            {/* Vendor Basic Info */}
            <div className="flex-1">

              <div className="flex flex-wrap items-start justify-between gap-4">

                <div>

                  <span className="text-sm font-medium text-blue-600">
                    {vendor.category}
                  </span>

                  <h1 className="mt-1 text-3xl font-bold text-gray-900">
                    {vendor.name}
                  </h1>

                </div>

                <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                  ★ {vendor.rating}
                </span>

              </div>

              <p className="mt-3 text-sm text-gray-500 max-w-2xl">
                {vendor.description}
              </p>

              <div className="flex flex-wrap gap-5 mt-4">

                <span className="text-sm text-gray-600">
                  📍 {vendor.location}
                </span>

                <span className="text-sm text-gray-600">
                  ⭐ {vendor.reviews} Reviews
                </span>

                <span className="text-sm text-green-600 font-medium">
                  ● {vendor.availability}
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Content */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                About Vendor
              </h2>

              <p className="mt-3 text-sm text-gray-600 leading-6">
                {vendor.description}
              </p>

            </section>

            {/* Services */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Services Offered
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                {vendor.services.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-md"
                  >

                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      ✓
                    </div>

                    <span className="text-sm font-medium text-gray-700">
                      {service}
                    </span>

                  </div>
                ))}

              </div>

            </section>

            {/* Reviews */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-semibold text-gray-800">
                    Ratings & Reviews
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    What customers say about this vendor
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-2xl font-bold text-gray-800">
                    {vendor.rating}
                  </p>

                  <p className="text-sm text-yellow-500">
                    ★★★★★
                  </p>

                </div>

              </div>

              <div className="mt-6 divide-y divide-gray-200">

                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="py-5 first:pt-0 last:pb-0"
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="text-sm font-semibold text-gray-800">
                        {review.name}
                      </h3>

                      <span className="text-sm text-yellow-500">
                        {"★".repeat(review.rating)}
                      </span>

                    </div>

                    <p className="mt-2 text-sm text-gray-600">
                      {review.comment}
                    </p>

                  </div>
                ))}

              </div>

            </section>

          </div>

          {/* Right Sidebar */}
          <aside>

            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:sticky lg:top-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Book This Service
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Get professional service from this verified vendor.
              </p>

              {/* Price */}
              <div className="mt-6 p-4 bg-gray-50 rounded-md">

                <p className="text-xs text-gray-500">
                  Estimated Price
                </p>

                <p className="mt-1 text-xl font-bold text-gray-800">
                  {vendor.price}
                </p>

              </div>

              {/* Availability */}
              <div className="mt-4 flex items-center justify-between">

                <span className="text-sm text-gray-500">
                  Availability
                </span>

                <span className="text-sm font-medium text-green-600">
                  {vendor.availability}
                </span>

              </div>

              {/* Contact */}
              <div className="mt-4 flex items-center justify-between">

                <span className="text-sm text-gray-500">
                  Contact
                </span>

                <span className="text-sm font-medium text-gray-700">
                  {vendor.phone}
                </span>

              </div>

              {/* Book Button */}
              <Link
                to={`/book/${vendor.id}`}
                className="mt-6 block w-full py-3 text-center bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
              >
                Book Service
              </Link>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default VendorDetails;