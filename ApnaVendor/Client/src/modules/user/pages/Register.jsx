import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Django registration API will be connected here later.
    navigate("/login");
  };

  return (
    <div className="min-h-full bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">

          <Link
            to="/"
            className="text-3xl font-bold text-blue-600"
          >
            ApnaVendor
          </Link>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Create Your Account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join ApnaVendor and book trusted local services.
          </p>

        </div>

        {/* Register Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

              <div>

                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

              </div>

              <div>

                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>

                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Email */}
            <div className="mb-5">

              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>

            {/* Phone */}
            <div className="mb-5">

              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>

              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                maxLength="10"
                className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>

            {/* Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">

              <div>

                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

              </div>

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />

              </div>

            </div>

            {/* Terms */}
            <div className="flex items-start mb-6">

              <input
                id="terms"
                type="checkbox"
                required
                className="mt-0.5 w-4 h-4 rounded border-gray-300 text-blue-600"
              />

              <label
                htmlFor="terms"
                className="ml-2 text-sm text-gray-600 leading-5"
              >
                I agree to the{" "}
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                  onClick={() =>
                    alert("Terms & Conditions will be added later.")
                  }
                >
                  Terms & Conditions
                </button>
                {" "}and Privacy Policy.
              </label>

            </div>

            {/* Register */}
            <button
              type="submit"
              className="w-full h-11 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
            >
              Create Account
            </button>

          </form>

          {/* Login */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">

            <p className="text-sm text-gray-500">
              Already have an account?{" "}

              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Login
              </Link>
            </p>

          </div>

        </div>

        {/* Back Home */}
        <div className="mt-5 text-center">

          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-blue-600"
          >
            ← Back to Home
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;