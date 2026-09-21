import { useState,useEffect } from "react";
import { Link } from "react-router-dom";



const VendorSearch = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState("");
  const [price, setPrice] = useState("");
  const [vendors,setVendors] = useState([]);


  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/vendors")
    .then((response)=> response.json())
    .then((data)=>setVendors(data))
    .catch((error)=>console.error("Failed to fetch vendors:",error))
  },[]);
  
  const filteredVendors = vendors.filter((vendor) => {
  const searchMatch =
    search === "" ||
    vendor.name.toLowerCase().includes(search.toLowerCase()) ||
    vendor.category.toLowerCase().includes(search.toLowerCase());

  const categoryMatch =
    category === "" || vendor.category === category;

  const locationMatch =
    location === "" ||
    vendor.location.toLowerCase().includes(location.toLowerCase());

  const ratingMatch =
    rating === "" || vendor.rating >= Number(rating);

  let priceMatch = true;

  if (price === "low") {
    priceMatch = vendor.minPrice <= 500;
  }

  if (price === "medium") {
    priceMatch =
      vendor.minPrice >= 500 &&
      vendor.minPrice <= 1000;
  }

  if (price === "high") {
    priceMatch = vendor.minPrice >= 1000;
  }

  return (
    searchMatch &&
    categoryMatch &&
    locationMatch &&
    ratingMatch &&
    priceMatch
  );
});

  const handleClearFilters = () => {
    setSearch("");
    setCategory("");
    setLocation("");
    setRating("");
    setPrice("");
  };

  return (
    <div className="bg-gray-50 min-h-full">

      {/* Page Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-3xl font-bold text-gray-900">
            Search Vendors
          </h1>

          <p className="mt-2 text-gray-600">
            Find trusted service providers near you
          </p>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Search */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">

          <div className="flex flex-col md:flex-row gap-3">

            <div className="flex-1 flex items-center border border-gray-300 rounded-md overflow-hidden">

              <span className="pl-4 text-gray-400">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search vendor or service"
                className="w-full px-4 py-3 text-sm outline-none"
              />

            </div>

            <button
              type="button"
              className="px-6 py-3 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Search
            </button>

          </div>

        </div>

        {/* Filters + Results */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Filters */}
          <aside className="bg-white border border-gray-200 rounded-lg p-5 h-fit">

            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Filters
              </h2>

              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear
              </button>
            </div>

            {/* Category */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Carpenter">Carpenter</option>
                <option value="Painter">Painter</option>
                <option value="Cleaning">Cleaning</option>
              </select>
            </div>

            {/* Location */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>

              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Price */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>

              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
              >
                <option value="">Any Price</option>
                <option value="low">₹0 - ₹500</option>
                <option value="medium">₹500 - ₹1000</option>
                <option value="high">₹1000+</option>
              </select>
            </div>

            {/* Rating */}
            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5 ⭐ & above</option>
                <option value="4">4 ⭐ & above</option>
                <option value="3">3 ⭐ & above</option>
              </select>
            </div>

          </aside>

          {/* Results */}
          <section className="lg:col-span-3">

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Available Vendors
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {filteredVendors.length} vendors found
                </p>
              </div>

            </div>

            {filteredVendors.length > 0 ? (
              <div className="space-y-5">

                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="bg-white border border-gray-200 rounded-lg p-5"
                  >

                    <div className="flex flex-col md:flex-row gap-5">

                      {/* Vendor Image */}
                      <div className="w-full md:w-36 h-32 bg-gray-100 rounded-md flex items-center justify-center shrink-0">
                        <span className="text-4xl">
                          🏪
                        </span>
                      </div>

                      {/* Vendor Information */}
                      <div className="flex-1">

                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">

                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {vendor.name}
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                              {vendor.category}
                            </p>
                          </div>

                          <span className="text-sm font-medium text-yellow-600">
                            ⭐ {vendor.rating}
                          </span>

                        </div>

                        <div className="mt-3 space-y-1">

                          <p className="text-sm text-gray-600">
                            📍 {vendor.location}
                          </p>

                          <p className="text-sm text-gray-600">
                            {vendor.experience}
                          </p>

                          <p className="text-sm text-gray-600">
                            💰 {vendor.priceRange}
                          </p>

                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">

                          <p className="text-xs text-gray-500">
                            {vendor.reviews} Reviews
                          </p>

                          <Link
                            to={`/vendors/${vendor.id}`}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                          >
                            View Details
                          </Link>

                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-10 text-center">

                <div className="text-4xl">
                  🔍
                </div>

                <h3 className="mt-3 text-lg font-semibold text-gray-800">
                  No vendors found
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </section>

        </div>
      </div>
    </div>
  );
};

export default VendorSearch;