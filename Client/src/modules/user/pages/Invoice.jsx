import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { BookingContext } from "../context/BookingContext";

const Invoice = () => {
  const { id } = useParams();
  const { bookings } = useContext(BookingContext);

  const booking = bookings.find(
    (item) => String(item.id) === String(id)
  );

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Invoice Not Found
          </h1>

          <Link
            to="/bookings"
            className="inline-block mt-4 px-5 py-2.5 bg-blue-600 text-white rounded-md"
          >
            Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">

      {/* Top Actions - Hidden while printing */}
      <div className="max-w-4xl mx-auto px-4 mb-5 print:hidden">

        <div className="flex items-center justify-between">

          <Link
            to={`/bookings/${booking.id}`}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            ← Back to Booking
          </Link>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
          >
            🖨 Print / Save PDF
          </button>

        </div>

      </div>

      {/* Invoice */}
      <div className="max-w-4xl mx-auto px-4">

        <div className="bg-white shadow-lg rounded-lg p-8 md:p-10 print:shadow-none print:rounded-none">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 border-b border-gray-200 pb-6">

            <div>

              <h1 className="text-3xl font-bold text-blue-600">
                ApnaVendor
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Smart Local Service Marketplace
              </p>

            </div>

            <div className="sm:text-right">

              <h2 className="text-2xl font-bold text-gray-800">
                INVOICE
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Invoice #{booking.id}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                Date: {booking.paymentDate || booking.date}
              </p>

            </div>

          </div>

          {/* Customer + Vendor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">

            <div>

              <p className="text-xs font-semibold uppercase text-gray-400">
                Billed To
              </p>

              <h3 className="mt-2 text-base font-semibold text-gray-800">
                Customer
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                {booking.address}
              </p>

              <p className="mt-1 text-sm text-gray-600">
                {booking.location}
              </p>

            </div>

            <div className="sm:text-right">

              <p className="text-xs font-semibold uppercase text-gray-400">
                Service Provider
              </p>

              <h3 className="mt-2 text-base font-semibold text-gray-800">
                {booking.vendor}
              </h3>

              <p className="mt-1 text-sm text-gray-600">
                Service Provider
              </p>

            </div>

          </div>

          {/* Service Table */}
          <div className="mt-10">

            <div className="border border-gray-200 rounded-lg overflow-hidden">

              <div className="grid grid-cols-12 bg-gray-50 px-4 py-3 text-xs font-semibold uppercase text-gray-500">

                <div className="col-span-6">
                  Service
                </div>

                <div className="col-span-2 text-center">
                  Date
                </div>

                <div className="col-span-2 text-center">
                  Time
                </div>

                <div className="col-span-2 text-right">
                  Amount
                </div>

              </div>

              <div className="grid grid-cols-12 px-4 py-5 text-sm text-gray-700">

                <div className="col-span-6 font-medium">
                  {booking.service}
                </div>

                <div className="col-span-2 text-center">
                  {booking.date}
                </div>

                <div className="col-span-2 text-center">
                  {booking.time}
                </div>

                <div className="col-span-2 text-right font-semibold">
                  {booking.amount}
                </div>

              </div>

            </div>

          </div>

          {/* Payment Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">

            <div>

              <h3 className="text-sm font-semibold text-gray-800">
                Payment Details
              </h3>

              <div className="mt-3 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Payment Status
                  </span>

                  <span className="font-semibold text-green-600">
                    {booking.paymentStatus || "Pending"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
                    Payment Method
                  </span>

                  <span className="font-medium text-gray-800">
                    {booking.paymentMethod || "—"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">
                    Payment ID
                  </span>

                  <span className="font-medium text-gray-800 text-xs break-all">
                    {booking.paymentId || "—"}
                  </span>
                </div>

              </div>

            </div>

            {/* Total */}
            <div className="md:text-right">

              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <p className="mt-1 text-3xl font-bold text-gray-900">
                {booking.amount}
              </p>

              <div className="mt-3 inline-flex px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                {booking.paymentStatus === "Paid"
                  ? "✓ Payment Completed"
                  : "Payment Pending"}
              </div>

            </div>

          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="mt-8 border-t border-gray-200 pt-6">

              <h3 className="text-sm font-semibold text-gray-800">
                Additional Notes
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {booking.notes}
              </p>

            </div>
          )}

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-gray-200 text-center">

            <p className="text-sm font-medium text-gray-700">
              Thank you for using ApnaVendor!
            </p>

            <p className="mt-1 text-xs text-gray-400">
              This is a computer-generated invoice.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Invoice;