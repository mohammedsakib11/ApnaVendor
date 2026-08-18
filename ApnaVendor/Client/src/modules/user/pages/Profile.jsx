import { useState } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Aamir",
    lastName: "Shaikh",
    email: "aamir@example.com",
    phone: "+91 98765 43210",
    address: "Ahmedabad, Gujarat",
    city: "Ahmedabad",
    pincode: "380001",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);

    // Backend API will be connected here later.
  };

  return (
    <div className="min-h-full bg-gray-50">

      {/* Header */}
      <section className="bg-white border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>

        </div>

      </section>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <section className="bg-white border border-gray-200 rounded-lg p-6">

            <div className="flex flex-col items-center text-center">

              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-3xl font-bold text-blue-600">
                {profile.firstName.charAt(0)}
                {profile.lastName.charAt(0)}
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {profile.firstName} {profile.lastName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customer
              </p>

            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 space-y-4">

              <div>

                <p className="text-xs text-gray-500">
                  Email
                </p>

                <p className="mt-1 text-sm text-gray-700 break-all">
                  {profile.email}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-500">
                  Phone
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {profile.phone}
                </p>

              </div>

              <div>

                <p className="text-xs text-gray-500">
                  Location
                </p>

                <p className="mt-1 text-sm text-gray-700">
                  {profile.city}
                </p>

              </div>

            </div>

            <Link
              to="/bookings"
              className="mt-6 block w-full py-2.5 text-center border border-blue-600 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-50 transition"
            >
              View My Bookings
            </Link>

          </section>

          {/* Personal Information */}
          <section className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h2 className="text-xl font-semibold text-gray-800">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your personal details.
                </p>

              </div>

              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                  Edit Profile
                </button>
              )}

            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* First Name */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full h-11 px-3 border rounded-md text-sm outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />

              </div>

              {/* Last Name */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full h-11 px-3 border rounded-md text-sm outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />

              </div>

              {/* Email */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full h-11 px-3 border rounded-md text-sm outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />

              </div>

              {/* Phone */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full h-11 px-3 border rounded-md text-sm outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />

              </div>

              {/* Address */}
              <div className="md:col-span-2">

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>

                <textarea
                  name="address"
                  value={profile.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  className={`w-full px-3 py-3 border rounded-md text-sm outline-none resize-none ${
                    isEditing
                      ? "border-gray-300 focus:border-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />

              </div>

              {/* City */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full h-11 px-3 border rounded-md text-sm outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />

              </div>

              {/* Pincode */}
              <div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={profile.pincode}
                  onChange={handleChange}
                  disabled={!isEditing}
                  maxLength="6"
                  className={`w-full h-11 px-3 border rounded-md text-sm outline-none ${
                    isEditing
                      ? "border-gray-300 focus:border-blue-500"
                      : "border-gray-200 bg-gray-50 text-gray-600"
                  }`}
                />

              </div>

            </div>

            {/* Edit Actions */}
            {isEditing && (
              <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Save Changes
                </button>

              </div>
            )}

          </section>

        </div>

      </main>

    </div>
  );
};

export default Profile;