"use client";
import { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { apiFetch } from "@/services/api";
import Header from "@/components/Header";
import Link from "next/link";

export default function AddStudentPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    dept: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    await apiFetch("/api/admin/addStudent", {
      method: "POST",
      body: JSON.stringify(form),
    });
    setLoading(false);
    setForm({
      name: "",
      email: "",
      password: "",
      dept: "",
      dob: "",
    });

    alert("Student added");
  };

  const fieldLabels: Record<string, string> = {
    name: "Full Name",
    email: "Email Address",
    password: "Password",
    dept: "Department",
    dob: "Date of Birth",
  };

  const fieldTypes: Record<string, string> = {
    name: "text",
    email: "email",
    password: "password",
    dept: "text",
    dob: "date",
  };

  return (
    <ProtectedRoute role="ADMIN">
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header with Back Link */}
          <div className="mb-8">
            <Link
              href="/dashboard/admin"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Add New Student
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Enter student information to create a new account
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-lg">
            <div className="space-y-5">
              {Object.keys(form).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {fieldLabels[key]}
                  </label>
                  <input
                    type={fieldTypes[key]}
                    value={form[key as keyof typeof form]}
                    placeholder={`Enter ${fieldLabels[key].toLowerCase()}`}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3 w-[50%]">
              {loading ? (
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-600 border-r-transparent"></div>
              ) : (
                <button
                  onClick={submit}
                  className="flex-1 bg-gray-600 text-white font-medium py-2.5 rounded-lg hover:bg-gray-700 transition-colors shadow-sm"
                >
                  Add Student
                </button>
              )}

              <Link
                href="/dashboard/admin"
                className="px-6 bg-white text-gray-700 font-medium py-2.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
