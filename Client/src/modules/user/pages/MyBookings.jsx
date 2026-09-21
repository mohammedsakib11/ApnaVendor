import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../../../api/api";



const statusStyles = {
  Pending: "bg-yellow-50 text-yellow-700",
  Accepted: "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  Cancelled: "bg-red-50 text-red-700",
};

const MyBookings = () => {
  const [bookings,setBookings] = useState([]);

  useEffect(() => {
    Promise.all([
      apiFetch("/api/bookings/"),
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

        const mappedBookings = bookingData.map((booking) => {
          const vendor = vendorData.find(
            (vendor) => vendor.id === booking.vendor
          );

          const service = serviceData.find(
            (service) => service.id === booking.service
          );

          return {
            ...booking,
            vendor: vendor?.name || "Unknown Vendor",
            location: vendor?.location || booking.city,
            service: service?.name || "Unknown Service",
            date: booking.booking_date,
            time: booking.booking_time.slice(0, 5),
            amount: `₹${booking.amount}`,
            paymentStatus: booking.payment_status,
          };
        });

        setBookings(mappedBookings);
      })
      .catch((error) => {
        console.error("Failed to fetch bookings:", error);
      });
  }, []);
 
  

  return (
    <div className="min-h-full bg-gray-50">

      {/* Page Header */}
      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-3xl font-bold text-gray-900">
            My Bookings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View and manage all your service bookings.
          </p>

        </div>

      </section>

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-sm text-gray-500">
              Total Bookings
            </p>

            <p className="mt-2 text-2xl font-bold text-gray-800">
              {bookings.length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-sm text-gray-500">
              Pending
            </p>

            <p className="mt-2 text-2xl font-bold text-yellow-600">
              {bookings.filter(
                (booking) => booking.status === "Pending"
              ).length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-sm text-gray-500">
              Accepted
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              {bookings.filter(
                (booking) => booking.status === "Accepted"
              ).length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <p className="text-sm text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-2xl font-bold text-green-600">
              {bookings.filter(
                (booking) => booking.status === "Completed"
              ).length}
            </p>
          </div>

        </div>

        {/* Booking List */}
        <section className="bg-white border border-gray-200 rounded-lg">

          <div className="px-6 py-5 border-b border-gray-200">

            <h2 className="text-xl font-semibold text-gray-800">
              Booking History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Your recent and previous service bookings.
            </p>

          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-gray-50 border-b border-gray-200">

                <tr>

                  <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                    Booking ID
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                    Vendor
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                    Service
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                    Date & Time
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                    Amount
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b border-gray-100 last:border-b-0"
                  >

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {booking.id}
                    </td>

                    <td className="px-6 py-4">

                      <p className="text-sm font-medium text-gray-800">
                        {booking.vendor}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.location}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.service}
                    </td>

                    <td className="px-6 py-4">

                      <p className="text-sm text-gray-700">
                        {booking.date}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        {booking.time}
                      </p>

                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {booking.amount}
                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
                          statusStyles[booking.status]
                        }`}
                      >
                        {booking.status}
                      </span>

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex flex-col gap-2">

                        <Link
                          to={`/bookings/${booking.id}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        >
                          View Details
                        </Link>

                        {booking.paymentStatus !== "Paid" &&
                          booking.status !== "Cancelled" && (
                            <Link
                              to={`/payment/${booking.id}`}
                              className="text-sm font-medium text-green-600 hover:text-green-700"
                            >
                              Pay Now
                            </Link>
                          )}

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y divide-gray-200">

            {bookings.map((booking) => (

              <div
                key={booking.id}
                className="p-5"
              >

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <p className="text-xs text-gray-500">
                      {booking.id}
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-gray-800">
                      {booking.vendor}
                    </h3>

                  </div>

                  <span
                    className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium ${
                      statusStyles[booking.status]
                    }`}
                  >
                    {booking.status}
                  </span>

                </div>

                <div className="mt-4 space-y-2">

                  <p className="text-sm text-gray-600">
                    Service: {booking.service}
                  </p>

                  <p className="text-sm text-gray-600">
                    Date: {booking.date}
                  </p>

                  <p className="text-sm text-gray-600">
                    Time: {booking.time}
                  </p>

                  <p className="text-sm text-gray-600">
                    Location: {booking.location}
                  </p>

                  <p className="text-sm font-medium text-gray-800">
                    Amount: {booking.amount}
                  </p>

                </div>

                <div className="mt-4 flex flex-col gap-2">

                  <Link
                    to={`/bookings/${booking.id}`}
                    className="block w-full py-2.5 text-center border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50"
                  >
                    View Details
                  </Link>

                  {booking.paymentStatus !== "Paid" &&
                    booking.status !== "Cancelled" && (
                      <Link
                        to={`/payment/${booking.id}`}
                        className="block w-full py-2.5 text-center bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                      >
                        Pay Now
                      </Link>
                    )}

                </div>

              </div>

            ))}

          </div>

        </section>

      </main>

    </div>
  );
};

export default MyBookings;