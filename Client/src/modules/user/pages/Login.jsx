import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      setError("Please enter email and password.");
      return;
    }

    fetch("http://127.0.0.1:8000/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username:formData.email,
        password:formData.password,
      }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (!response.ok) {
          throw new Error(JSON.stringify(data));
        }

        return data;
      })
      .then((data) => {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        window.dispatchEvent(new Event("authChange"));

        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        setError("Invalid email or password.");
      });
      };

  return (
    <div className="min-h-full bg-gray-50 flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md">

        {/* Logo / Heading */}
        <div className="text-center mb-8">

          <Link
            to="/"
            className="text-3xl font-bold text-blue-600"
          >
            ApnaVendor
          </Link>

          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Login to manage your bookings and services.
          </p>

        </div>

        {/* Login Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8">

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

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

            {/* Password */}
            <div className="mb-5">

              <div className="flex items-center justify-between mb-2">

                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  onClick={() =>
                    alert("Forgot password functionality will be connected later.")
                  }
                >
                  Forgot Password?
                </button>

              </div>

              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-11 px-3 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />

            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-6">

              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-blue-600"
              />

              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600"
              >
                Remember me
              </label>

            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full h-11 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

          </form>

          {/* Register */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">

            <p className="text-sm text-gray-500">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Create Account
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

export default Login;