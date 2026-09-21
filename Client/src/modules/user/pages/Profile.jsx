import {useEffect,useState} from "react"
import { apiFetch } from "../../../api/api"

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const [formData, setFormData] = useState(user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await apiFetch("/api/users/profile/");
        const data = await response.json();

        console.log("Profile Data:", data);

        if (!response.ok) {
          throw new Error(data.detail || "Failed to load profile");
        }

        const profileData = {
          name: `${data.first_name} ${data.last_name}`.trim(),
          email: data.email,
          phone: data.phone || "",
          city: data.city || "",
          address: data.address || "",
        };

        setUser(profileData);
        setFormData(profileData);
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

  loadProfile();
}, []);

  const handleSave = async () => {
    try {
      const nameParts = formData.name.trim().split(" ");

      const response = await apiFetch("/api/users/profile/", {
        method: "PATCH",
        body: JSON.stringify({
          first_name: nameParts[0] || "",
          last_name: nameParts.slice(1).join(" "),
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Failed to update profile");
      }

      setUser(formData);
      setIsEditing(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile Update Error:", error);
      alert(error.message || "Failed to update profile");
    }
  };


  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-full bg-gray-50">

      {/* Page Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View and manage your account information.
          </p>

        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Profile Card */}
          <aside className="lg:col-span-1">

            <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">

              {/* Avatar */}
              <div className="w-24 h-24 mx-auto rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold text-white">
                {user.name.charAt(0)}
              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-800">
                {user.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customer Account
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200 text-left">

                <div className="mb-4">
                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700 break-all">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-700">
                    {user.phone}
                  </p>
                </div>

              </div>

            </div>

          </aside>

          {/* Profile Information */}
          <section className="lg:col-span-2">

            <div className="bg-white border border-gray-200 rounded-lg">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">

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
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
                  >
                    Edit Profile
                  </button>
                )}

              </div>

              {/* Form */}
              <div className="p-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Full Name */}
                  <div>

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
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
                      value={formData.email}
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
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full h-11 px-3 border rounded-md text-sm outline-none ${
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
                      value={formData.city}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className={`w-full h-11 px-3 border rounded-md text-sm outline-none ${
                        isEditing
                          ? "border-gray-300 focus:border-blue-500"
                          : "border-gray-200 bg-gray-50 text-gray-600"
                      }`}
                    />

                  </div>

                </div>

                {/* Address */}
                <div className="mt-5">

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows="4"
                    className={`w-full px-3 py-3 border rounded-md text-sm outline-none resize-none ${
                      isEditing
                        ? "border-gray-300 focus:border-blue-500"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />

                </div>

                {/* Actions */}
                {isEditing && (

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">

                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex-1 h-11 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 h-11 border border-gray-300 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>

                  </div>

                )}

              </div>

            </div>

            {/* Account Information */}
            <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">

              <h2 className="text-xl font-semibold text-gray-800">
                Account Information
              </h2>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="p-4 bg-gray-50 rounded-lg">

                  <p className="text-xs text-gray-500">
                    Account Type
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-800">
                    Customer
                  </p>

                </div>

                <div className="p-4 bg-gray-50 rounded-lg">

                  <p className="text-xs text-gray-500">
                    Account Status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-green-600">
                    Active
                  </p>

                </div>

              </div>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};

export default Profile;