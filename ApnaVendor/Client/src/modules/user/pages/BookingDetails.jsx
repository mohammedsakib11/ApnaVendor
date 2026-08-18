import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const bookings = {
  "B-1001": {
    id: "B-1001",
    vendor: "Jay Plumbing Service",
    category: "Plumber",
    service: "Plumber Service",
    date: "27 May 2025",
    time: "10:00 AM",
    location: "Ahmedabad",
    address: "123, Satellite Road, Ahmedabad",
    pincode: "380015",
    amount: "₹500",
    paymentStatus: "Pending",
    status: "Pending",
    notes: "Please check the bathroom pipe leakage.",
  },

  "B-1002": {
    id: "B-1002",
    vendor: "Perfect Painters",
    category: "Painter",
    service: "Wall Painting",
    date: "24 May 2025",
    time: "02:00 PM",
    location: "Ahmedabad",
    address: "45, SG Highway, Ahmedabad",
    pincode: "380054",
    amount: "₹4,500",
    paymentStatus: "Paid",
    status: "Accepted",
    notes: "Interior wall painting required.",
  },

  "B-1003": {
    id: "B-1003",
    vendor: "AC Cool Services",
    category: "Electrician",
    service: "AC Repair",
    date: "20 May 2025",
    time: "11:30 AM",
    location: "Ahmedabad",
    address: "12, Navrangpura, Ahmedabad",
    pincode: "380009",
    amount: "₹800",
    paymentStatus: "Paid",
    status: "Completed",
    notes: "AC cooling issue.",
  },

  "B-1004": {
    id: "B-1004",
    vendor: "Home Care Cleaning",
    category: "Cleaning",
    service: "Home Cleaning",
    date: "18 May 2025",
    time: "09:00 AM",
    location: "Ahmedabad",
    address: "78, Vastrapur, Ahmedabad",
    pincode: "380015",
    amount: "₹1,000",
    paymentStatus: "Refunded",
    status: "Cancelled",
    notes: "Full home cleaning.",
  },
};

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const booking = bookings[id];

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  if (!booking) {
    return (
      <div className="min-h-full bg-gray-50">

        <div className="max-w-7xl mx-auto px-6 py-16 text-center">

          <div className="text-5xl">
            🔍
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Booking Not Found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The booking you are looking for does not exist.
          </p>

          <Link
            to="/bookings"
            className="inline-block mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
          >
            Back to My Bookings
          </Link>

        </div>

      </div>
    );
  }

  const currentStatus = cancelled
    ? "Cancelled"
    : booking.status;

  const handleCancel = () => {
    setCancelled(true);
    setShowCancelModal(false);
  };

  return (
    <div className="min-h-full bg-gray-50">

      {/* Header */}
      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
            to="/bookings"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back to My Bookings
          </Link>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <p className="text-sm text-gray-500">
                Booking ID
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                {booking.id}
              </h1>

            </div>

            <span
              className={`
                inline-block
                w-fit
                px-3
                py-1.5
                rounded-full
                text-sm
                font-medium
                ${
                  currentStatus === "Completed"
                    ? "bg-green-50 text-green-700"
                    : currentStatus === "Accepted"
                    ? "bg-blue-50 text-blue-700"
                    : currentStatus === "Cancelled"
                    ? "bg-red-50 text-red-700"
                    : "bg-yellow-50 text-yellow-700"
                }
              `}
            >
              {currentStatus}
            </span>

          </div>

        </div>

      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Vendor */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Vendor Information
              </h2>

              <div className="mt-5 flex items-center gap-4">

                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-3xl">
                  🏪
                </div>

                <div>

                  <h3 className="text-base font-semibold text-gray-800">
                    {booking.vendor}
                  </h3>

                  <p className="mt-1 text-sm text-blue-600">
                    {booking.category}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    📍 {booking.location}
                  </p>

                </div>

              </div>

            </section>

            {/* Service Details */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Service Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">

                <div>
                  <p className="text-xs text-gray-500">
                    Service
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {booking.service}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {booking.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Preferred Time
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {booking.time}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {booking.location}
                  </p>
                </div>

              </div>

            </section>

            {/* Address */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Service Address
              </h2>

              <div className="mt-4 p-4 bg-gray-50 rounded-md">

                <p className="text-sm text-gray-700">
                  {booking.address}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Pincode: {booking.pincode}
                </p>

              </div>

            </section>

            {/* Notes */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Additional Notes
              </h2>

              <p className="mt-3 text-sm text-gray-600 leading-6">
                {booking.notes}
              </p>

            </section>

            {/* Status Timeline */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Booking Status
              </h2>

              <div className="mt-6 space-y-5">

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Booking Created
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Your booking request has been created.
                    </p>
                  </div>

                </div>

                <div className="flex gap-4">

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      currentStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {currentStatus === "Pending" ? "2" : "✓"}
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-gray-800">
                      Vendor Response
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {currentStatus === "Pending"
                        ? "Waiting for vendor confirmation."
                        : "Vendor has responded to your booking."}
                    </p>

                  </div>

                </div>

                <div className="flex gap-4">

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      currentStatus === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {currentStatus === "Completed" ? "✓" : "3"}
                  </div>

                  <div>

                    <p className="text-sm font-semibold text-gray-800">
                      Service Completed
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Service completion will be updated by the vendor.
                    </p>

                  </div>

                </div>

              </div>

            </section>

          </div>

          {/* Right Sidebar */}
          <aside>

            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:sticky lg:top-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Payment Summary
              </h2>

              <div className="mt-5 space-y-4">

                <div className="flex justify-between">

                  <span className="text-sm text-gray-500">
                    Service Amount
                  </span>

                  <span className="text-sm text-gray-800">
                    {booking.amount}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-sm text-gray-500">
                    Platform Fee
                  </span>

                  <span className="text-sm text-gray-800">
                    ₹0
                  </span>

                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-between">

                  <span className="text-sm font-semibold text-gray-800">
                    Total
                  </span>

                  <span className="text-lg font-bold text-gray-800">
                    {booking.amount}
                  </span>

                </div>

              </div>

              <div className="mt-5 p-3 bg-gray-50 rounded-md flex justify-between">

                <span className="text-sm text-gray-500">
                  Payment Status
                </span>

                <span
                  className={`text-sm font-medium ${
                    booking.paymentStatus === "Paid"
                      ? "text-green-600"
                      : booking.paymentStatus === "Refunded"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {booking.paymentStatus}
                </span>

              </div>

              {/* Actions */}
              <div className="mt-6 space-y-3">

                {/* Invoice */}
                {currentStatus === "Completed" && (
                  <button
                    type="button"
                    className="w-full h-11 border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition"
                    onClick={() => alert("Invoice generation will be connected later.")}
                  >
                    Generate Invoice
                  </button>
                )}

                {/* Rating */}
                {currentStatus === "Completed" && (
                  <button
                    type="button"
                    className="w-full h-11 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition"
                    onClick={() => alert("Rating & Review will be connected later.")}
                  >
                    Rate & Review
                  </button>
                )}

                {/* Cancel */}
                {currentStatus === "Pending" && (
                  <button
                    type="button"
                    onClick={() => setShowCancelModal(true)}
                    className="w-full h-11 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 transition"
                  >
                    Cancel Booking
                  </button>
                )}

              </div>

            </div>

          </aside>

        </div>

      </main>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowCancelModal(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6">

            <h2 className="text-xl font-semibold text-gray-800">
              Cancel Booking?
            </h2>

            <p className="mt-3 text-sm text-gray-500 leading-5">
              Are you sure you want to cancel this booking? This action
              cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 h-10 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
              >
                Keep Booking
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 h-10 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Yes, Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default BookingDetails;