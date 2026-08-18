import { Link } from "react-router-dom";

const VendorCard = ({ vendor }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">

      {/* Image Placeholder */}
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        <span className="text-4xl">🏪</span>
      </div>

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

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

        <p className="text-xs text-gray-500 mt-2">
          {vendor.reviews} Reviews
        </p>

        <p className="text-sm text-gray-600 mt-3">
          📍 {vendor.location}
        </p>

        <p className="text-sm text-gray-600 mt-1">
          {vendor.experience}
        </p>

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">

          <div>
            <p className="text-xs text-gray-500">
              Price Range
            </p>

            <p className="text-sm font-semibold text-gray-800">
              {vendor.priceRange}
            </p>
          </div>

          <Link
            to={`/vendors/${vendor.id}`}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            View Details
          </Link>

        </div>

      </div>
    </div>
  );
};

export default VendorCard;