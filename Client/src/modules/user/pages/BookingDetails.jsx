import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiFetch } from "../../../api/api";

const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700",
  Accepted: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

const BookingDetails = () => {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);
  const [existingReview, setExistingReview] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Fetch Booking Details
  useEffect(() => {
    Promise.all([
      apiFetch(`/api/bookings/${id}/`),
      fetch("http://127.0.0.1:8000/api/vendors/"),
      fetch("http://127.0.0.1:8000/api/services/"),
    ])
      .then(async ([bookingResponse, vendorResponse, serviceResponse]) => {
        const bookingData = await bookingResponse.json();
        const vendorData = await vendorResponse.json();
        const serviceData = await serviceResponse.json();

        if (!bookingResponse.ok) {
          throw new Error(JSON.stringify(bookingData));
        }

        const vendor = vendorData.find(
          (item) => item.id === bookingData.vendor
        );

        const service = serviceData.find(
          (item) => item.id === bookingData.service
        );

        setBooking({
          ...bookingData,
          vendor: vendor?.name || "Unknown Vendor",
          vendorId: bookingData.vendor,
          service: service?.name || "Unknown Service",
          date: bookingData.booking_date,
          time: bookingData.booking_time
            ? bookingData.booking_time.slice(0, 5)
            : "",
          location: vendor?.location || bookingData.city,
          amount: bookingData.amount,
          paymentStatus: bookingData.payment_status,
          paymentId: bookingData.payment_id,
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch booking details:", error);
        setLoading(false);
      });
  }, [id]);

  // Fetch Existing Review
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/reviews/?booking=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setExistingReview(data[0] || null);
      })
      .catch((error) => {
        console.error("Failed to fetch review:", error);
      });
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl">⏳</div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Loading Booking...
          </h1>
        </div>
      </div>
    );
  }

  // Booking Not Found
  if (!booking) {
    return (
      <div className="min-h-full bg-gray-50">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">

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
            className="inline-block mt-6 px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Back to My Bookings
          </Link>

        </div>
      </div>
    );
  }

  // Submit Review
  const handleSubmitReview = async () => {
    if (rating === 0) {
      alert("Please select a rating.");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please write a review.");
      return;
    }

    try {
      const response = await apiFetch("/api/reviews/create/", {
        method: "POST",
        body: JSON.stringify({
          vendor: booking.vendorId,
          booking: booking.id,
          rating: rating,
          comment: reviewText.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.detail ||
            data.non_field_errors?.[0] ||
            "Failed to submit review."
        );
        return;
      }

      setExistingReview(data);
      setShowReviewForm(false);
      setRating(0);
      setReviewText("");

      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Review submission failed:", error);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="min-h-full bg-gray-50">

      {/* ================= PAGE HEADER ================= */}
      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <Link
            to="/bookings"
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back to My Bookings
          </Link>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

              <p className="text-sm text-gray-500">
                Booking ID: {booking.id}
              </p>

              <h1 className="mt-1 text-3xl font-bold text-gray-900">
                Booking Details
              </h1>

            </div>

            <span
              className={`inline-block w-fit px-3 py-1.5 rounded-full text-sm font-medium ${
                statusStyles[booking.status]
              }`}
            >
              {booking.status}
            </span>

          </div>

        </div>

      </section>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ================= LEFT CONTENT ================= */}
          <div className="lg:col-span-2 space-y-6">

            {/* Vendor Information */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Vendor Information
              </h2>

              <div className="mt-5 flex items-center gap-4">

                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-3xl">
                  🏪
                </div>

                <div>

                  <h3 className="text-base font-semibold text-gray-800">
                    {booking.vendor}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Service Provider
                  </p>

                </div>

              </div>

              <Link
                to={`/vendors/${booking.vendorId}`}
                className="inline-block mt-5 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View Vendor Details →
              </Link>

            </section>

            {/* Service Details */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Service Details
              </h2>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

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
                    Booking Status
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {booking.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Service Date
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

              </div>

            </section>

            {/* Service Address */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Service Address
              </h2>

              <div className="mt-4">

                <p className="text-sm text-gray-700">
                  📍 {booking.address}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {booking.location}
                </p>

              </div>

            </section>

            {/* Additional Notes */}
            <section className="bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Additional Notes
              </h2>

              <p className="mt-4 text-sm text-gray-600 leading-6">
                {booking.notes || "No additional notes provided."}
              </p>

            </section>

          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside>

            <div className="bg-white border border-gray-200 rounded-lg p-6 lg:sticky lg:top-6">

              {/* Amount */}
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Summary
              </h2>

              <div className="mt-5 p-4 bg-gray-50 rounded-lg">

                <div className="flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Total Amount
                  </span>

                  <span className="text-2xl font-bold text-gray-900">
                    ₹{booking.amount}
                  </span>

                </div>

              </div>

              {/* Payment Status */}
              {booking.paymentStatus === "Paid" ? (

                <div className="mt-5">

                  {/* Success Banner */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xl">
                        ✓
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-green-700">
                          Payment Successful
                        </p>

                        <p className="text-xs text-green-600 mt-1">
                          Your payment has been received successfully.
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Payment Details */}
                  <div className="mt-5 border border-gray-200 rounded-lg divide-y divide-gray-200">

                    <div className="p-4 flex items-center justify-between gap-4">

                      <span className="text-sm text-gray-500">
                        Payment Status
                      </span>

                      <span className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                        Paid
                      </span>

                    </div>

                    <div className="p-4 flex items-center justify-between gap-4">

                      <span className="text-sm text-gray-500">
                        Payment Method
                      </span>

                      <span className="text-sm font-medium text-gray-800">
                        {booking.paymentMethod || "Online Payment"}
                      </span>

                    </div>

                    <div className="p-4 flex items-center justify-between gap-4">

                      <span className="text-sm text-gray-500">
                        Payment ID
                      </span>

                      <span className="text-xs font-medium text-gray-700 break-all text-right">
                        {booking.paymentId || "N/A"}
                      </span>

                    </div>

                    <div className="p-4 flex items-center justify-between gap-4">

                      <span className="text-sm text-gray-500">
                        Payment Date
                      </span>

                      <span className="text-sm font-medium text-gray-800 text-right">
                        {booking.paymentDate || "N/A"}
                      </span>

                    </div>

                  </div>

                  {/* Receipt Button */}
                  <Link
                    to={`/invoice/${booking.id}`}
                    className="mt-4 block w-full py-3 text-center bg-gray-800 text-white rounded-md text-sm font-semibold hover:bg-gray-900 transition"
                  >
                    View Invoice
                  </Link>

                </div>

              ) : (

                <div className="mt-5 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 text-xl">
                      !
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-yellow-700">
                        Payment Pending
                      </p>

                      <p className="text-xs text-yellow-600 mt-1">
                        Complete the payment to confirm your booking.
                      </p>

                    </div>

                  </div>

                </div>

              )}

              {/* ================= PAYMENT INFO ================= */}
              {booking.paymentStatus !== "Paid" && (

                <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">

                  <p className="text-xs text-blue-700 leading-5">
                    Payment functionality will be connected with the backend
                    in the next development phase.
                  </p>

                </div>

              )}

              {/* ================= CANCEL BOOKING ================= */}
              {booking.status === "Pending" && (

                <button
                  type="button"
                  onClick={async () => {
                    const response = await apiFetch(
                      `/api/bookings/${booking.id}/cancel/`,
                      {
                        method: "PATCH",
                        body: JSON.stringify({
                          status: "Cancelled",
                        }),
                      }
                    );

                    if (response.ok) {
                      setBooking((previous) => ({
                        ...previous,
                        status: "Cancelled",
                      }));
                    } else {
                      const data = await response.json();
                      alert(
                        data.detail || "Failed to cancel booking."
                      );
                    }
                  }}
                  className="mt-6 w-full py-3 border border-red-300 text-red-600 rounded-md text-sm font-medium hover:bg-red-50 transition"
                >
                  Cancel Booking
                </button>

              )}

              {/* ================= WRITE REVIEW ================= */}
              {booking.status === "Completed" &&
                !existingReview &&
                !showReviewForm && (

                  <button
                    type="button"
                    onClick={() => setShowReviewForm(true)}
                    className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                  >
                    Write a Review
                  </button>

                )}

              {/* ================= REVIEW FORM ================= */}
              {showReviewForm &&
                booking.status === "Completed" &&
                !existingReview && (

                  <div className="mt-4 border-t border-gray-200 pt-5">

                    <h3 className="text-base font-semibold text-gray-800">
                      Rate Your Experience
                    </h3>

                    {/* Rating */}
                    <div className="mt-4">

                      <p className="text-sm text-gray-600 mb-2">
                        Select Rating
                      </p>

                      <div className="flex gap-2">

                        {[1, 2, 3, 4, 5].map((star) => (

                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className={`text-2xl ${
                              star <= rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </button>

                        ))}

                      </div>

                    </div>

                    {/* Review Text */}
                    <div className="mt-4">

                      <label className="block text-sm text-gray-600 mb-2">
                        Your Review
                      </label>

                      <textarea
                        value={reviewText}
                        onChange={(e) =>
                          setReviewText(e.target.value)
                        }
                        rows="4"
                        placeholder="Share your experience with this vendor..."
                        className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm outline-none resize-none focus:border-blue-500"
                      />

                    </div>

                    {/* Review Buttons */}
                    <div className="mt-4 flex gap-3">

                      <button
                        type="button"
                        onClick={handleSubmitReview}
                        className="flex-1 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                      >
                        Submit Review
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowReviewForm(false);
                          setRating(0);
                          setReviewText("");
                        }}
                        className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>

                    </div>

                  </div>

                )}

              {/* ================= EXISTING REVIEW ================= */}
              {existingReview && (

                <div className="mt-4 border-t border-gray-200 pt-5">

                  <h3 className="text-base font-semibold text-gray-800">
                    Your Review
                  </h3>

                  <p className="mt-1 text-xs text-green-600">
                    Review submitted successfully
                  </p>

                  <div className="mt-2 text-yellow-400">
                    {"★".repeat(existingReview.rating)}
                  </div>

                  <p className="mt-2 text-sm text-gray-600">
                    {existingReview.comment}
                  </p>

                </div>

              )}

            </div>

          </aside>

        </div>

      </main>

    </div>
  );
};

export default BookingDetails;