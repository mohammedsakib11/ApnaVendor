export const bookings = [
  {
    id: "B-1001",
    vendor: "Jay Plumbing Service",
    vendorId: 1,
    service: "Pipe Repair",
    date: "27 May 2025",
    time: "10:00 AM",
    location: "Ahmedabad",
    address: "Bopal, Ahmedabad, Gujarat",
    amount: 500,
    status: "Pending",
    notes: "Please check the kitchen water pipe leakage.",
  },
  {
    id: "B-1002",
    vendor: "Perfect Painters",
    vendorId: 2,
    service: "Wall Painting",
    date: "24 May 2025",
    time: "02:00 PM",
    location: "Ahmedabad",
    address: "Satellite, Ahmedabad, Gujarat",
    amount: 4500,
    status: "Accepted",
    notes: "Interior painting for two bedrooms.",
  },
  {
    id: "B-1003",
    vendor: "AC Cool Services",
    vendorId: 3,
    service: "AC Repair",
    date: "20 May 2025",
    time: "11:30 AM",
    location: "Ahmedabad",
    address: "Navrangpura, Ahmedabad, Gujarat",
    amount: 800,
    status: "Completed",
    notes: "AC is not cooling properly.",
  },
  {
    id: "B-1004",
    vendor: "Home Care Cleaning",
    vendorId: 4,
    service: "Home Cleaning",
    date: "18 May 2025",
    time: "09:00 AM",
    location: "Ahmedabad",
    address: "Vastrapur, Ahmedabad, Gujarat",
    amount: 1000,
    status: "Cancelled",
    notes: "Deep cleaning service was required.",
  },
];

export const addBooking = (bookingData) => {
  const newBooking = {
    id: `B-${1000 + bookings.length + 1}`,
    ...bookingData,
  };

  bookings.unshift(newBooking);

  return newBooking;
};

export const cancelBooking = (bookingId) => {
  const booking = bookings.find(
    (item) => item.id === bookingId
  );

  if (booking) {
    booking.status = "Cancelled";
  }

  return booking;
};