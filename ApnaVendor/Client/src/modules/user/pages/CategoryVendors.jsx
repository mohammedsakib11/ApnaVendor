import { Link, useParams } from "react-router-dom";

const categories = {
  1: "Plumber",
  2: "Electrician",
  3: "Carpenter",
  4: "Painter",
  5: "Cleaning",
};

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
      "Professional plumbing services for homes and offices.",
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
      "Reliable painting services with experienced professionals.",
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
      "AC installation, repair and electrical services.",
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
      "Professional home and office cleaning services.",
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
      "Furniture repair and customized carpentry services.",
  },
];

const CategoryVendors = () => {
  const { id } = useParams();

  const categoryName = categories[id];

  const categoryVendors = vendors.filter(
    (vendor) => vendor.category === categoryName
  );

  if (!categoryName) {
    return (
      <div className="min-h-full bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <div className="text-5xl">
            🔍
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Category Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The category you are looking for does not exist.
          </p>

          <Link
            to="/vendors"
            className="inline-block mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Browse All Vendors
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

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            {categoryName} Services
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Find trusted {categoryName.toLowerCase()} service providers
            near you.
          </p>

        </div>

      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-xl font-semibold text-gray-800">
              {categoryName} Vendors
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {categoryVendors.length} vendors available
            </p>

          </div>

          <Link
            to="/vendors"
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-white"
          >
            All Vendors
          </Link>

        </div>

        {categoryVendors.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {categoryVendors.map((vendor) => (

              <div
                key={vendor.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition"
              >

                {/* Vendor Image */}
                <div className="h-44 bg-gray-100 flex items-center justify-center">

                  <span className="text-5xl">
                    🏪
                  </span>

                </div>

                {/* Vendor Details */}
                <div className="p-5">

                  <div className="flex items-start justify-between gap-3">

                    <div>

                      <h3 className="text-base font-semibold text-gray-800">
                        {vendor.name}
                      </h3>

                      <p className="mt-1 text-xs text-blue-600 font-medium">
                        {vendor.category}
                      </p>

                    </div>

                    <span className="shrink-0 px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                      ★ {vendor.rating}
                    </span>

                  </div>

                  <p className="mt-3 text-sm text-gray-500 leading-5">
                    {vendor.description}
                  </p>

                  <div className="mt-4 space-y-2">

                    <p className="text-sm text-gray-600">
                      📍 {vendor.location}
                    </p>

                    <p className="text-sm text-gray-600">
                      ⭐ {vendor.reviews} Reviews
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {vendor.price}
                    </p>

                  </div>

                  <Link
                    to={`/vendors/${vendor.id}`}
                    className="mt-5 block w-full py-2.5 text-center bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="bg-white border border-gray-200 rounded-lg py-16 text-center">

            <div className="text-4xl">
              🔍
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              No Vendors Available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              There are currently no vendors in this category.
            </p>

            <Link
              to="/vendors"
              className="inline-block mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Browse Other Services
            </Link>

          </div>

        )}

      </main>

    </div>
  );
};

export default CategoryVendors;