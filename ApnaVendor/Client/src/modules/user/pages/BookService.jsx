import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const vendors = {
  1: {
    name: "Jay Plumbing Service",
    category: "Plumber",
    price: "₹400 - ₹700",
  },
  2: {
    name: "Perfect Painters",
    category: "Painter",
    price: "₹2,250 - ₹8,000",
  },
  3: {
    name: "AC Cool Services",
    category: "Electrician",
    price: "₹500 - ₹2,000",
  },
  4: {
    name: "Home Care Cleaning",
    category: "Cleaning",
    price: "₹500 - ₹1,500",
  },
  5: {
    name: "Expert Wood Works",
    category: "Carpenter",
    price: "₹800 - ₹3,000",
  },
};

const BookService = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const vendor = vendors[vendorId];

  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.service ||
      !formData.date ||
      !formData.time ||
      !formData.address ||
      !formData.city ||
      !formData.pincode
    ) {
      setError("Please fill all required fields.");
      return;
    }

    setError("");

    // UI-only for now.
    // Backend booking API will be connected later.
    navigate("/bookings");
  };

  if (!vendor) {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">

          <div className="text-5xl">
            🔍
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Vendor Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The vendor you are trying to book does not exist.
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

      {/* Page Header */}
      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
            to={`/vendors/${vendorId}`}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back to Vendor
          </Link>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            Book Service
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Schedule your service with the selected vendor.
          </p>

        </div>

      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Booking Form */}
          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">

            <div className="mb-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Service Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter the details required for your booking.
              </p>

            </div>

            {error && (
              <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Service */}
              <div className="mb-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service <span className="text-red-500">*</span>
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-sm outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select a service
                  </option>

                  <option value={vendor.category}>
                    {vendor.category} Service
                  </option>

                  <option value="Repair Service">
                    Repair Service
                  </option>

                  <option value="Maintenance Service">
                    Maintenance Service
                  </option>
                </select>

              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Date <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />

                </div>

              </div>

              {/* Address */}
              <div className="mb-5">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Address <span className="text-red-500">*</span>
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Enter complete service address"
                  className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm outline-none resize-none focus:border-blue-500"
                />

              </div>

              {/* City + Pincode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode <span className="text-red-500">*</span>
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="Enter pincode"
                    maxLength="6"
                    className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />

                </div>

              </div>

              {/* Additional Notes */}
              <div className="mb-6">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any additional information for the vendor..."
                  className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm outline-none resize-none focus:border-blue-500"
                />

              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3">

                <button
                  type="submit"
                  className="flex-1 h-11 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Continue Booking
                </button>

                <Link
                  to={`/vendors/${vendorId}`}
                  className="flex-1 h-11 flex items-center justify-center border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition"
                >
                  Cancel
                </Link>

              </div>

            </form>

          </section>

          {/* Booking Summary */}
          <aside>

            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:sticky lg:top-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Booking Summary
              </h2>

              {/* Vendor */}
              <div className="mt-5 flex items-center gap-4">

                <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
                  🏪
                </div>

                <div>

                  <h3 className="text-sm font-semibold text-gray-800">
                    {vendor.name}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {vendor.category}
                  </p>

                </div>

              </div>

              <div className="mt-6 pt-5 border-t border-gray-200 space-y-4">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Service
                  </span>

                  <span className="text-sm font-medium text-gray-800">
                    {formData.service || "Not selected"}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Date
                  </span>

                  <span className="text-sm font-medium text-gray-800">
                    {formData.date || "Not selected"}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Time
                  </span>

                  <span className="text-sm font-medium text-gray-800">
                    {formData.time || "Not selected"}
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Estimated Price
                  </span>

                  <span className="text-sm font-semibold text-gray-800">
                    {vendor.price}
                  </span>

                </div>

              </div>

              {/* Notice */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">

                <p className="text-xs text-blue-700 leading-5">
                  Final service charges may vary depending on the actual
                  service required. The vendor will confirm the booking
                  details.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default BookService;