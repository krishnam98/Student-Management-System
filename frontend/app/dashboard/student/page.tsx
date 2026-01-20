"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/services/api";
import { User } from "@/types/user";
import { getToken } from "@/utils/auth";
import { decodeToken } from "@/utils/decodetoken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";

const studentPage = () => {
  const [student, setStudent] = useState<User | null>(null);
  const [updating, setUpdating] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [details, setDetails] = useState({
    name: "",
    email: "",
    department: "",
    dob: "",
  });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const router = useRouter();

  const getStudentprofile = async () => {
    const token = getToken();
    if (!token) {
      return router.push("/login");
    }

    const decoded = decodeToken(token);
    const res = await apiFetch(`/api/student/getStudent/${decoded.id}`, {
      method: "GET",
    });
    setStudent(res.student);
    setDetails({
      name: res.student?.name || "",
      email: res.student?.email || "",
      department: res.student?.department || "",
      dob: res.student?.dob || "",
    });
    console.log(res);
  };

  useEffect(() => {
    getStudentprofile();
    console.log(updating);
  }, []);

  const handleUpdate = () => {
    setUpdating(true);
    console.log("updating");
  };

  const handleChange = (key: string, value: string) => {
    setDetails({ ...details, [key]: value });
  };

  const handleSave = async () => {
    console.log(details);
    const res = await apiFetch(`/api/student/update/${student?._id}`, {
      method: "POST",
      body: JSON.stringify(details),
    });
    console.log(res);
    setUpdating(false);
    getStudentprofile;
    alert("Profile updated");
  };

  const handlePasswordChange = (key: string, value: string) => {
    setPasswords({ ...passwords, [key]: value });
  };

  const handlePasswordSave = async () => {
    setLoadingPassword(true);

    console.log("Old Password:", passwords.oldPassword);
    console.log("New Password:", passwords.newPassword);

    const body = {
      oldPassword: passwords.oldPassword,
      newPassword: passwords.newPassword,
    };
    const res = await apiFetch("/api/auth/changepassword", {
      method: "POST",
      body: JSON.stringify(body),
    });

    console.log(res);
    setChangePassword(false);
    setLoadingPassword(false);
    alert("Password changed successfully");
    setPasswords({ oldPassword: "", newPassword: "" });
  };

  return (
    <ProtectedRoute role="STUDENT">
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Student Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your profile information
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                Profile Information
              </h2>
              {!updating && (
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                {!updating ? (
                  <p className="text-gray-900">{student?.name}</p>
                ) : (
                  <input
                    type="text"
                    value={details.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Student ID
                </label>
                <p className="text-gray-900">{student?._id}</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900">{student?.email}</p>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Department
                </label>
                {!updating ? (
                  <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-50 text-blue-800">
                    {student?.department}
                  </span>
                ) : (
                  <input
                    type="text"
                    value={details.department}
                    onChange={(e) => handleChange("department", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Date of Birth
                </label>
                {!updating ? (
                  <p className="text-gray-900">
                    {student?.dob
                      ? new Date(student.dob).toLocaleDateString("en-GB")
                      : "-"}
                  </p>
                ) : (
                  <input
                    type="date"
                    value={details.dob}
                    onChange={(e) => handleChange("dob", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                )}
              </div>
            </div>

            {/* Save/Cancel Buttons */}
            {updating && (
              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="flex-0.5 px-4 bg-gray-600 text-white font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setUpdating(false);
                    setDetails({
                      name: student?.name || "",
                      email: student?.email || "",
                      department: student?.department || "",
                      dob: student?.dob || "",
                    });
                  }}
                  className="px-6 bg-white text-gray-700 font-medium py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Change Password Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Security
            </h2>

            {!changePassword ? (
              <button
                onClick={() => setChangePassword(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Change Password
              </button>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwords.oldPassword}
                    onChange={(e) =>
                      handlePasswordChange("oldPassword", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwords.newPassword}
                    onChange={(e) =>
                      handlePasswordChange("newPassword", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>

                <div className="flex gap-3 pt-2 ">
                  {loadingPassword ? (
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-600 border-r-transparent"></div>
                  ) : (
                    <button
                      onClick={handlePasswordSave}
                      className="w-70% px-4 bg-gray-600 text-white font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
                    >
                      Update Password
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setChangePassword(false);
                      setPasswords({ oldPassword: "", newPassword: "" });
                    }}
                    className="px-6 bg-white text-gray-700 font-medium py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default studentPage;
