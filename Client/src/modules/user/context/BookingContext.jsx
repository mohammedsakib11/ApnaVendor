import { createContext, use, useState,useEffect } from "react";
import { bookings as initialBookings } from "../data/bookings";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState(()=>{
    const savedBookings = localStorage.getItem("apnaVendorBookings");
    return savedBookings ? JSON.parse(savedBookings) : initialBookings;
  });
  const [reviews,setReviews] = useState([]);

  useEffect(() => {
  localStorage.setItem("apnaVendorBookings", JSON.stringify(bookings));
}, [bookings]);
  
  const addBooking = (newBooking) => {
  setBookings((previousBookings) => [
    newBooking,
    ...previousBookings,
  ]);
};

const cancelBooking = (bookingId) => {
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );
};

const markAsPaid = (bookingId, paymentMethod, paymentId, paymentDate) => {
  setBookings((previousBookings) =>
    previousBookings.map((booking) =>
      String(booking.id) === String(bookingId)
        ? {
            ...booking,
            paymentStatus: "Paid",
            paymentMethod: paymentMethod,
            paymentId: paymentId,
            paymentDate: paymentDate,
          }
        : booking
    )
  );
};

    const addReview = (review) => {
    setReviews((previousReviews) => [
        ...previousReviews,
        {
        id: Date.now(),
        ...review,
        },
    ]);
};


  return (
    <BookingContext.Provider
      value={{
        bookings,
        setBookings,
        cancelBooking,
        addBooking,
        reviews,
        markAsPaid,
        addReview,

      }}
    >
      {children}
    </BookingContext.Provider>
  );
};