"use client";

import SearchBar from "@/app/components/searchBar";
import { Bookmark, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
}

interface Application {
  id: number;
  jobId: number;
  userId: number;
  jobTitle: string;
  company: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface User {
  id: number;
  name: string;
  email: string;

}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (currentUser) {
      setUser(currentUser);

      const allApplications = JSON.parse(
        localStorage.getItem("applications") || "[]"
      );
//specific user application
      const userApplications = allApplications.filter(
        (app: Application) =>
          app.userId === currentUser.id
      );

      setApplications(userApplications);
    }
  }, []);

  const saveJob = (job: any) => {
    const key = user ? `savedJobs_user_${user.id}` : "savedJobs_guest";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");

    const alreadySaved = stored.find((item: any) => item.id === job.id);

    if (alreadySaved) {
      const updated = stored.filter((item: any) => item.id !== job.id);
      localStorage.setItem(key, JSON.stringify(updated));
      setSavedJobs(updated);
      return;
    }

    const updatedJobs = [...stored, job];
    localStorage.setItem(key, JSON.stringify(updatedJobs));
    setSavedJobs(updatedJobs);
  };

  const removeSavedJob = (id: number) => {
    const key = user ? `savedJobs_user_${user.id}` : "savedJobs_guest";
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    const updatedJobs = stored.filter((job: any) => job.id !== id);

    setSavedJobs(updatedJobs);
    localStorage.setItem(key, JSON.stringify(updatedJobs));
  };

  useEffect(() => {
    if (!user) return;
    const key = `savedJobs_user_${user.id}`;
    const jobs = JSON.parse(localStorage.getItem(key) || "[]");

    setSavedJobs(jobs);
  }, [user]);

  useEffect(() => {
    const storedJobs = JSON.parse(
      localStorage.getItem("jobs") || "[]"
    );

    setJobs(storedJobs);
  }, []);
  return (
    <div className=" md:m-10 m-5 ">
      <div><div className="md:flex flex-col items-center text-center p-5 justify-center h-60  bg-linear-to-r from-green-800 to-green-400 rounded-lg">
        <h1 className="md:text-4xl text-xl font-bold text-white">Find Your Dream Job Today</h1>
        <h1 className="md:text-lg text-sm text-white text-center">
          Explore thousands of opportunities from top companies and take the next step in your career with confidence.
        </h1>

      </div>


      </div>
      {/* Welcome Section */}
      <div className="mb-8 mt-10 flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-500">
          Track your jobs here.
        </p>
        <div className="flex ">

          <button
            onClick={() => setActiveTab("jobs")}
            className={`px-6 py-3
            ${activeTab === "jobs"
                ? "border-t-1 border-l-1 border-r-1 border-green-500 rounded-t-lg"
                : "border-b-1 border-green-500"
              }`}
          >
            Jobs
          </button>

          <button
            onClick={() =>
              setActiveTab("applications")
            }
            className={`px-6 py-3
            ${activeTab === "applications"
                ? "border-t-1 border-l-1 border-r-1 border-green-500 rounded-t-lg"
                : "border-b-1 border-green-500"
              }`}
          >
            Applications
          </button>
          <button
            onClick={() =>
              setActiveTab("saved jobs")
            }
            className={`px-6 py-3
            ${activeTab === "saved jobs"
                ? "border-t-1 border-l-1 border-r-1 border-green-500 rounded-t-lg"
                : "border-b-1 border-green-500"
              }`}
          >
            Saved Jobs
          </button>
          <button
            onClick={() =>
              setActiveTab("account")
            }
            className={`px-6 py-3
            ${activeTab === "account"
                ? "border-t-1 border-l-1 border-r-1 border-green-500 rounded-t-lg"
                : "border-b-1 border-green-500"
              }`}
          >
            Account
          </button>

        </div>
      </div>


      {/* Content */}
      <div className=" p-6 rounded-b-lg">

        {activeTab === "jobs" && (
          <div >
            <h2 className="text-xl font-bold mb-4">
              Available Jobs
            </h2>

            <div className="w-full max-w-4xl mx-auto mb-6">
              <SearchBar
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                onSearch={() => setSearchQuery(searchTerm)}
              />
            </div>

            {jobs.length === 0 ? (
              <p>No jobs available.</p>
            ) : (
              [...jobs]
                .filter((job) => {
                  const query = searchQuery.trim().toLowerCase();
                  if (!query) return true;
                  return (
                    job.title.toLowerCase().includes(query) ||
                    job.company.toLowerCase().includes(query)
                  );
                })
                .sort((a, b) => b.id - a.id)
                .map((job, index) => (
                  <div
                    key={job.id}
                    className="border p-4 rounded mb-4 relative flex justify-between items-center"
                  >
                    <div>
                      {index === 0 && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 text-xs rounded-[50%] font-semibold">
                          NEW
                        </span>
                      )}
                      <h3 className="font-semibold">
                        {job.title}
                      </h3>

                      <p>{job.company}</p>

                      <Link href={`/jobs/${job.id}`}>
                        <button className="bg-green-500 text-white px-4 py-2 rounded">
                          Apply Now
                        </button>
                      </Link>
                    </div>
                    <div>
                      {(() => {
                        const isSaved = savedJobs.some((s) => s.id === job.id);
                        return (
                          <button
                            onClick={() => saveJob(job)}
                            className={`text-2xl ${isSaved
                                ? " bg-green-500  rounded"
                                : "text-gray-500 hover:text-gray-700"
                              }`}
                          >
                            <Bookmark />
                          </button>
                        );
                      })()}
                    </div>

                  </div>
                ))
            )}
          </div>
        )}

        {activeTab === "applications" && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              My Applications
            </h2>

            {applications.length === 0 ? (
              <p>No applications yet.</p>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="border rounded p-4 mb-4"
                >
                  <h3 className="font-semibold">
                    {app.jobTitle}
                  </h3>
                  <p>{app.company}</p>
                  <p>Status: {app.status}</p>
                </div>
              ))
            )}
          </div>
        )}
        {activeTab === "saved jobs" && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Saved Jobs
            </h2>

            {savedJobs.length === 0 ? (
              <p>No saved jobs found.</p>
            ) : (
              savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="border p-4 rounded mb-4 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-semibold">
                      {job.title}
                    </h3>

                    <p>{job.company}</p>
                  </div>


                  <button
                    onClick={() => removeSavedJob(job.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "account" && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Profile
            </h2>

            <p>
              Name: Amal
            </p>

            <p>
              Email:
              amal@gmail.com
            </p>
          </div>
        )}
      </div>

    </div>

  );
}
