import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../api/api";

const BookService = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    Promise.all([
      fetch(`http://127.0.0.1:8000/api/vendors/${vendorId}/`),
      fetch("http://127.0.0.1:8000/api/services/"),
    ])
      .then(async ([vendorResponse, servicesResponse]) => {
        const vendorData = await vendorResponse.json();
        const servicesData = await servicesResponse.json();

        setVendor(vendorData);

        setServices(
          servicesData.filter(
            (service) => service.vendor === Number(vendorId)
          )
        );
      })
      .catch((error) => {
        console.error("Failed to fetch booking data:", error);
      })
      .finally(() => setLoading(false));
  }, [vendorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
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

   

    apiFetch("/api/bookings/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        vendor: Number(vendorId),
        service: Number(formData.service),
        booking_date: formData.date,
        booking_time: formData.time,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        notes: formData.notes,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(JSON.stringify(data));
        }

        return data;
      })
      .then(() => {
        navigate("/bookings");
      })
      .catch((error) => {
        console.error("Failed to create booking:", error);
        setError(error.message);
      });
  };

  if (loading) {
    return <div className="min-h-full bg-gray-50" />;
  }

  if (!vendor) {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl">🔍</div>

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

  const selectedService = services.find(
    (service) => service.id === Number(formData.service)
  );

  return (
    <div className="min-h-full bg-gray-50">

      {/* Page Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link
            to={`/vendors/${vendor.id}`}
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

      {/* Main Content */}
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

              {/* Select Service */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Service{" "}
                  <span className="text-red-500">*</span>
                </label>

                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full h-11 px-3 border border-gray-300 rounded-md bg-white text-sm outline-none focus:border-blue-500"
                >
                  <option value="">Select a service</option>

                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date + Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Date{" "}
                    <span className="text-red-500">*</span>
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
                    Preferred Time{" "}
                    <span className="text-red-500">*</span>
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
                  Service Address{" "}
                  <span className="text-red-500">*</span>
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
                    City{" "}
                    <span className="text-red-500">*</span>
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
                    Pincode{" "}
                    <span className="text-red-500">*</span>
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

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">

                <button
                  type="submit"
                  className="flex-1 h-11 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Continue Booking
                </button>

                <Link
                  to={`/vendors/${vendor.id}`}
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

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">
                    Service
                  </span>

                  <span className="text-sm font-medium text-gray-800 text-right">
                    {selectedService?.name || "Not selected"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">
                    Date
                  </span>

                  <span className="text-sm font-medium text-gray-800">
                    {formData.date || "Not selected"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">
                    Time
                  </span>

                  <span className="text-sm font-medium text-gray-800">
                    {formData.time || "Not selected"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">
                    Estimated Price
                  </span>

                  <span className="text-sm font-semibold text-gray-800">
                    {selectedService
                      ? `₹${selectedService.price}`
                      : vendor.price_range || "Not selected"}
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