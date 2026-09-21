import { Link, useParams, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import { apiFetch } from "../../../api/api";


const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);
  const [booking,setBooking] = useState(null);

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
          service: service?.name || "Unknown Service",
          date: bookingData.booking_date,
          time: bookingData.booking_time?.slice(0, 5) || "",
        });
      })
      .catch((error) => {
        console.error("Failed to fetch booking:", error);
      });
  }, [id]);
  
  if (!booking) {
    return <div className="p-6">Loading...</div>;
  }

  const handlePayment = async () => {
    try {
      setLoading(true);

      console.log("PAYMENT AMOUNT:", booking.amount);
      // 1. Create Razorpay Order from Django backend
      const response = await apiFetch(
        "/api/bookings/create-order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            booking_id: booking.id, 
          }),
        }
      );

      const responseText = await response.text();

      console.log("Create Order Status:", response.status);
      console.log("Create Order Response:", responseText);

      if (!response.ok) {
        throw new Error(responseText || "Unable to create order");
      }

      const order = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(order.error || "Unable to create order");
      }

      // 2. Razorpay Checkout options
      const options = {
        key: order.key_id,

        amount: order.amount,

        currency: order.currency,

        name: "ApnaVendor",

        description: `Payment for ${booking.service}`,

        order_id: order.order_id,

        handler: async function (paymentResponse) {
          try {
            const verifyResponse = await apiFetch(
              "/api/bookings/verify-payment/",
              {
                method: "PATCH",
                body: JSON.stringify({
                  booking_id: booking.id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                }),
              }
            );

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(verifyData.error || "Payment verification failed");
            }

            console.log("Payment Verified:", verifyData);
            alert("Payment successful!");
            navigate(`/bookings/${booking.id}`);
          } catch (error) {
            console.error("Payment Verification Error:", error);
            alert(error.message || "Payment verification failed.");
          }
        },

        prefill: {
          name: "ApnaVendor User",
          email: "user@example.com",
          contact: "9999999999",
        },

        notes: {
          booking_id: booking.id,
          payment_method: paymentMethod,
        },

        theme: {
          color: "#2563eb",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      // 3. Open Razorpay Checkout
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.log("Payment Failed:", response.error);

        alert(
          response.error.description || "Payment failed."
        );

        setLoading(false);
      });

      razorpay.open();

    } catch (error) {
      console.error("Payment Error:", error);

      alert(error.message || "Something went wrong.");

      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-bold text-gray-800">
        Complete Payment
      </h1>

      <div className="mt-6 border rounded-lg p-6 bg-white">

        <h2 className="text-lg font-semibold text-gray-800">
          Booking Summary
        </h2>

        <div className="mt-4 space-y-2 text-sm text-gray-600">

          <p>
            <strong>Vendor:</strong> {booking.vendor}
          </p>

          <p>
            <strong>Service:</strong> {booking.service}
          </p>

          <p>
            <strong>Date:</strong> {booking.date}
          </p>

          <p>
            <strong>Time:</strong> {booking.time}
          </p>

          <p>
            <strong>Amount:</strong> ₹{booking.amount}
          </p>

        </div>

        {/* Payment Method */}

        <div className="mt-6">

          <h3 className="text-sm font-semibold text-gray-800">
            Payment Method
          </h3>

          <div className="mt-3 space-y-2">

            {["UPI", "Card", "Cash"].map((method) => (

              <label
                key={method}
                className="flex items-center gap-3 border rounded-md p-3 cursor-pointer"
              >

                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                <span className="text-sm text-gray-700">
                  {method}
                </span>

              </label>

            ))}

          </div>

        </div>

        {/* Pay Button */}

        <button
          type="button"
          onClick={handlePayment}
          disabled={loading}
          className="mt-6 w-full py-3 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : `Pay ₹${booking.amount}`}
        </button>

        <Link
          to={`/bookings/${booking.id}`}
          className="block mt-3 text-center text-sm text-gray-500 hover:text-gray-700"
        >
          Back to Booking
        </Link>

      </div>

    </div>
  );
};

export default Payment;