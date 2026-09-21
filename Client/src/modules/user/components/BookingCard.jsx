import { Link } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const statusStyle = {
    Pending: "bg-yellow-50 text-yellow-700",
    Accepted: "bg-blue-50 text-blue-700",
    Completed: "bg-green-50 text-green-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">

      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-xs text-gray-500">
            Booking ID
          </p>

          <h3 className="text-sm font-semibold text-gray-800 mt-1">
            {booking.id}
          </h3>

          <p className="text-sm text-gray-700 mt-3">
            {booking.vendor}
          </p>

          <p className="text-sm text-gray-500">
            {booking.service}
          </p>

          <p className="text-xs text-gray-500 mt-2">
            {booking.date} • {booking.time}
          </p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusStyle[booking.status] ||
            "bg-gray-50 text-gray-700"
          }`}
        >
          {booking.status}
        </span>

      </div>

      <Link
        to={`/bookings/${booking.id}`}
        className="inline-block mt-4 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        View Details →
      </Link>

    </div>
  );
};

export default BookingCard;