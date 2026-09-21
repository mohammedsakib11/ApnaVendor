import { Link } from "react-router-dom";
import { useEffect,useState } from "react";

const Navbar = () => {
  const [isLoggedIn,setIsLoggedIn] = useState(
    !! localStorage.getItem("access_token")
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", checkAuth);
    window.addEventListener("authChange", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("authChange", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            ApnaVendor
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">

            <Link
              to="/"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/vendors"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Search Vendors
            </Link>

            <Link
              to="/bookings"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              My Bookings
            </Link>

            <Link
              to="/profile"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              Profile
            </Link>

          </nav>

          {/* Authentication */}
          <div className="flex items-center gap-3">

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-5 py-2 rounded-md border border-blue-600 text-blue-600 text-sm font-medium hover:bg-blue-50 transition-colors"
                >
                  Register
                </Link>
              </>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;