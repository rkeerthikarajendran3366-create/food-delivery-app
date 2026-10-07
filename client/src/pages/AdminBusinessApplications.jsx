import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const BACKEND_URL =
  "https://foodexpress-backend-p9dv.onrender.com";

function AdminBusinessApplications() {
  const [applications, setApplications] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

  const loadApplications = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/business-applications`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Failed to load applications"
        );
        return;
      }

      setApplications(
        data.applications || []
      );
    } catch (error) {
      toast.error(
        "Could not connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const approve = async (id) => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/business-applications/${id}/approve`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Approval failed"
        );
        return;
      }

      toast.success(
        "Business approved successfully"
      );

      loadApplications();
    } catch (error) {
      toast.error(
        "Approval request failed"
      );
    }
  };

  const reject = async (id) => {
    const reason =
      window.prompt(
        "Enter rejection reason:"
      );

    if (reason === null) return;

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/business-applications/${id}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            reason:
              reason ||
              "Application rejected by admin",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        toast.error(
          data.message ||
            "Rejection failed"
        );
        return;
      }

      toast.success(
        "Application rejected"
      );

      loadApplications();
    } catch (error) {
      toast.error(
        "Rejection request failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">

        <Link
          to="/admin"
          className="inline-block mb-6 bg-orange-500 text-white px-5 py-2 rounded-lg"
        >
          ← Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          🏪 Business Applications
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Review restaurant owner registrations.
        </p>

        <div className="mt-8 space-y-5">
          {loading ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl">
              Loading...
            </div>
          ) : applications.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl text-center">
              No business applications found.
            </div>
          ) : (
            applications.map(
              (application) => (
                <div
                  key={application._id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {application.restaurantName}
                      </h2>

                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        Owner:{" "}
                        {application.ownerName}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300">
                        Business:{" "}
                        {application.businessName}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300">
                        Cuisine:{" "}
                        {application.cuisine}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300">
                        Email:{" "}
                        {application.email}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300">
                        Phone:{" "}
                        {application.phone}
                      </p>

                      <p className="text-gray-600 dark:text-gray-300">
                        Address:{" "}
                        {application.address},{" "}
                        {application.city}
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span
                        className={`px-4 py-2 rounded-full text-center font-semibold ${
                          application.status ===
                          "approved"
                            ? "bg-green-100 text-green-700"
                            : application.status ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {application.status}
                      </span>

                      {application.status ===
                        "pending" && (
                        <>
                          <button
                            onClick={() =>
                              approve(
                                application._id
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              reject(
                                application._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            )
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminBusinessApplications;