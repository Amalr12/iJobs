"use client";

import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
}

interface Application {
  id: number;
  userId: number;
  userName: string;
  jobId: number;
  jobTitle: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("jobs");


  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [title, setTitle] = useState("");
  const [company, setCompany] =
    useState("");

  const newJob = {
    id: Date.now(),
    title,
    company,
  };

  const updatedJobs = [...jobs, newJob];
useEffect(() => {
  const storedJobs = JSON.parse(
    localStorage.getItem("jobs") || "[]"
  );

  setJobs(storedJobs);
}, []);
  useEffect(() => {
    const storedJobs = JSON.parse(
      localStorage.getItem("jobs") || "[]"
    );

    const storedApplications = JSON.parse(
      localStorage.getItem("applications") ||
      "[]"
    );

    setJobs(storedJobs);
    setApplications(storedApplications);
  }, []);

  // Add Job
  const addJob = () => {
    if (!title || !company) return;

    const newJob = {
      id: Date.now(),
      title,
      company,
    };

    const updatedJobs = [
      ...jobs,
      newJob,
    ];

    setJobs(updatedJobs);

    localStorage.setItem(
      "jobs",
      JSON.stringify(updatedJobs)
    );

    setTitle("");
    setCompany("");
  };

  // Delete Job
  const deleteJob = (id: number) => {
    const updatedJobs = jobs.filter(
      (job) => job.id !== id
    );

    setJobs(updatedJobs);

    localStorage.setItem(
      "jobs",
      JSON.stringify(updatedJobs)
    );
  };

  // Update Status
  const updateStatus = (
    id: number,
    status: "Approved" | "Rejected"
  ) => {
    const updatedApplications =
      applications.map((app) =>
        app.id === id
          ? { ...app, status }
          : app
      );

    setApplications(
      updatedApplications
    );

    localStorage.setItem(
      "applications",
      JSON.stringify(
        updatedApplications
      )
    );
  };

  return (
    <div className="p-6 md:m-10 m-5">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex">

        <button
          onClick={() =>
            setActiveTab("jobs")
          }
          className={`px-6 py-3
          ${activeTab === "jobs"
              ? "border-t border-l border-r border-green-500 rounded-t-lg"
              : "border-b border-green-500"
            }`}
        >
          Jobs
        </button>

        <button
          onClick={() =>
            setActiveTab(
              "applications"
            )
          }
          className={`px-6 py-3
          ${activeTab ===
              "applications"
              ? "border-t border-l border-r border-green-500 rounded-t-lg"
              : "border-b border-green-500"
            }`}
        >
          Applications
        </button>
      </div>

      <div className="border p-6 mt-5">

        {/* JOBS */}
        {activeTab === "jobs" && (
          <>
            <h2 className="text-xl font-bold mb-4">
              Manage Jobs
            </h2>

            <div className="flex gap-3 mb-6">
              <input
                value={title}
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                placeholder="Job Title"
                className="border p-2 rounded"
              />

              <input
                value={company}
                onChange={(e) =>
                  setCompany(
                    e.target.value
                  )
                }
                placeholder="Company"
                className="border p-2 rounded"
              />

              <button
                onClick={addJob}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Add Job
              </button>
            </div>

            {jobs.map((job) => (
              <div
                key={job.id}
                className="border rounded p-4 mb-3 flex justify-between mt-5"
              >
                <div>
                  <h3 className="font-semibold">
                    {job.title}
                  </h3>

                  <p>
                    {job.company}
                  </p>
                </div>

                <button
                  onClick={() =>
                    deleteJob(
                      job.id
                    )
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </>
        )}

        {/* APPLICATIONS */}
        {activeTab ===
          "applications" && (
            <>
              <h2 className="text-xl font-bold mb-4">
                Applications
              </h2>

              {applications.map(
                (app) => (
                  <div
                    key={app.id}
                    className="border rounded p-4 mb-4"
                  >
                    <h3>
                      {
                        app.userName
                      }
                    </h3>

                    <p>
                      {
                        app.jobTitle
                      }
                    </p>

                    <p>
                      Status:
                      {" "}
                      {
                        app.status
                      }
                    </p>

                    {app.status ===
                      "Pending" && (
                        <div className="flex gap-3 mt-3">
                          <button
                            onClick={() =>
                              updateStatus(
                                app.id,
                                "Approved"
                              )
                            }
                            className="bg-green-500 text-white px-4 py-2 rounded"
                          >
                            Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(
                                app.id,
                                "Rejected"
                              )
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                  </div>
                )
              )}
            </>
          )}
      </div>
    </div>
  );
}