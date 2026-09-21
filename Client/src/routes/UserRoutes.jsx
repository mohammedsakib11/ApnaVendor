import { Routes, Route } from "react-router-dom";

import UserLayout from "../layouts/UserLayout";

import Home from "../modules/user/pages/Home";
import Login from "../modules/user/pages/Login";
import Register from "../modules/user/pages/Register";
import VendorSearch from "../modules/user/pages/VendorSearch";
import CategoryVendors from "../modules/user/pages/CategoryVendors";
import VendorDetails from "../modules/user/pages/VendorDetails";
import BookService from "../modules/user/pages/BookService";
import MyBookings from "../modules/user/pages/MyBookings";
import BookingDetails from "../modules/user/pages/BookingDetails";
import Profile from "../modules/user/pages/Profile";
import Payment from "../modules/user/pages/Payment";
import Invoice from "../modules/user/pages/Invoice";
import ProtectedRoute from "./ProtectedRoute";

const UserRoutes = () => {
  return (
    <Routes>

    <Route element={<UserLayout />}>

      <Route path="/" element={<Home />} />

      <Route element={<ProtectedRoute />}>

        <Route path="/vendors" element={<VendorSearch />} />

        <Route
          path="/category/:id"
          element={<CategoryVendors />}
        />

        <Route
          path="/vendors/:id"
          element={<VendorDetails />}
        />

        <Route
          path="/book/:vendorId"
          element={<BookService />}
        />

        <Route
          path="/bookings"
          element={<MyBookings />}
        />

        <Route
          path="/bookings/:id"
          element={<BookingDetails />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Route>

    </Route>

    {/* Authentication pages */}
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* Protected payment/invoice */}
    <Route element={<ProtectedRoute />}>

      <Route
        path="/payment/:id"
        element={<Payment />}
      />

      <Route
        path="/invoice/:id"
        element={<Invoice />}
      />

    </Route>

  </Routes>


  );
};

export default UserRoutes;