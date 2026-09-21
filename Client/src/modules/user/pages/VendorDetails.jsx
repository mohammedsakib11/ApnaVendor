  import { Link, useParams } from "react-router-dom";
  // import { vendors } from "../data/vendors";
  import { BookingContext } from "../context/BookingContext";
  import { useState,useEffect } from "react";
  

  const VendorDetails = () => {
    const { id } = useParams();
  
    const [vendor,setVendor] = useState(null);
    const [loading,setLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [vendorReviews,setVendorReviews] = useState([]);


    //vendor api caling
    useEffect(()=>{
      fetch(`http://127.0.0.1:8000/api/vendors/${id}/`)
      .then((response)=> response.json())
      .then((data)=> setVendor(data))
      .catch((error)=> console.error("Failed to fetch vendors:",error))
      .finally(()=> setLoading(false))
    },[id]);

    //services api calling
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/services/")
        .then((response) => response.json())
        .then((data) => {
          setServices(
        data.filter((service) => service.vendor === Number(id))
        );
      })
      .catch((error) => console.error("Failed to fetch services:", error));
    }, [id]);


    //reviews api calling
      useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/reviews/?vendor=${id}`)
          .then((response) => response.json())
          .then((data) => setVendorReviews(data))
          .catch((error) => console.error("Failed to fetch reviews:", error));
      }, [id]);

    if(loading){
      return <div className="min-h-full bg-gray-50" />;
    }
    
  
      const averageRating =
        vendorReviews.length > 0
          ? (
              vendorReviews.reduce((total, review) => total + review.rating, 0) /
              vendorReviews.length
            ).toFixed(1)
          : vendor?.rating;

         

    if (!vendor) {
      return (
        <div className="min-h-full bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-16 text-center">

            <div className="text-5xl">🔍</div>

            <h1 className="mt-4 text-2xl font-bold text-gray-800">
              Vendor Not Found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              The vendor you are looking for does not exist.
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

        {/* Header */}
        <section className="bg-white border-b border-gray-200">

          <div className="max-w-7xl mx-auto px-6 py-8">

            <Link
              to="/vendors"
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              ← Back to Vendors
            </Link>

            <div className="mt-6 flex flex-col md:flex-row gap-6">

              {/* Vendor Image */}
              <div className="w-full md:w-52 h-44 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-6xl">🏪</span>
              </div>

              {/* Vendor Basic Info */}
              <div className="flex-1">

                <div className="flex flex-wrap items-start justify-between gap-4">

                  <div>
                    <span className="text-sm font-medium text-blue-600">
                      {vendor.category}
                    </span>

                    <h1 className="mt-1 text-3xl font-bold text-gray-900">
                      {vendor.name}
                    </h1>
                  </div>

                  <span className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                    ★ {averageRating}
                  </span>

                </div>

                <p className="mt-3 text-sm text-gray-500 max-w-2xl">
                  {vendor.description}
                </p>

                <div className="flex flex-wrap gap-5 mt-4">

                  <span className="text-sm text-gray-600">
                    📍 {vendor.location}
                  </span>

                  <span className="text-sm text-gray-600">
                    ⭐ {vendorReviews.length || vendor.reviews} Reviews
                  </span>

                  <span className="text-sm text-gray-600">
                    🕒 {vendor.responseTime}
                  </span>

                  <span className="text-sm text-green-600 font-medium">
                    ● {vendor.availability}
                  </span>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">

              {/* About */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">

                <h2 className="text-xl font-semibold text-gray-800">
                  About Vendor
                </h2>

                <p className="mt-3 text-sm text-gray-600 leading-6">
                  {vendor.description}
                </p>

                <div className="mt-4 text-sm text-gray-500">
                  Experience:{" "}
                  <span className="font-medium text-gray-700">
                    {vendor.experience}
                  </span>
                </div>

              </section>

              {/* Services */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">

                <h2 className="text-xl font-semibold text-gray-800">
                  Services Offered
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-md"
                    >

                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                        ✓
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        {service.name}
                      </span>

                    </div>
                  ))}

                </div>

              </section>

              {/* Reviews */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Ratings & Reviews
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      What customers say about this vendor
                    </p>
                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-bold text-gray-800">
                      {vendor.rating}
                    </p>

                    <p className="text-sm text-yellow-500">
                      {"★".repeat(Math.round(Number(averageRating)))}
                    </p>

                  </div>

                </div>

                <div className="mt-6 divide-y divide-gray-200">

                  {vendorReviews.length === 0 && (
                    <p className="py-5 text-sm text-gray-500">
                      No customer reviews yet.
                    </p>
                  )}

                  {vendorReviews.map((review) => (
                    <div
                      key={review.id}
                      className="py-5 first:pt-0 last:pb-0"
                    >

                      <div className="flex items-center justify-between">

                        <h3 className="text-sm font-semibold text-gray-800">
                          Customer
                        </h3>

                        <span className="text-sm text-yellow-500">
                          {"★".repeat(review.rating)}
                        </span>

                      </div>

                      <p className="mt-2 text-sm text-gray-600">
                        {review.comment}
                      </p>

                    </div>
                  ))}

                </div>

              </section>

            </div>

            {/* Right Sidebar */}
            <aside>

              <div className="bg-white border border-gray-200 rounded-lg p-6 lg:sticky lg:top-6">

                <h2 className="text-xl font-semibold text-gray-800">
                  Book This Service
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Get professional service from this verified vendor.
                </p>

                {/* Price */}
                <div className="mt-6 p-4 bg-gray-50 rounded-md">

                  <p className="text-xs text-gray-500">
                    Estimated Price
                  </p>

                  <p className="mt-1 text-xl font-bold text-gray-800">
                    {vendor.priceRange}
                  </p>

                </div>

                {/* Availability */}
                <div className="mt-4 flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Availability
                  </span>

                  <span className="text-sm font-medium text-green-600">
                    {vendor.availability}
                  </span>

                </div>

                {/* Contact */}
                <div className="mt-4 flex items-center justify-between">

                  <span className="text-sm text-gray-500">
                    Contact
                  </span>

                  <span className="text-sm font-medium text-gray-700">
                    {vendor.phone}
                  </span>

                </div>

                {/* Book Button */}
                <Link
                  to={`/book/${vendor.id}`}
                  className="mt-6 block w-full py-3 text-center bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                >
                  Book Service
                </Link>

              </div>

            </aside>

          </div>

        </main>

      </div>
    );
  };

  export default VendorDetails;