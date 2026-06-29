"use client";

import { useEffect, useState } from "react";

interface Job {
  id: number;
  title: string;
  company: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("jobs") || "[]");
    setJobs(stored);
  }, []);

  const addJob = () => {
    if (!title || !company) return;

    const newJob: Job = { id: Date.now(), title, company };
    const updated = [...jobs, newJob];

    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
    setTitle("");
    setCompany("");
  };

  const deleteJob = (id: number) => {
    const updated = jobs.filter((job) => job.id !== id);
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
  };

  return (
    <div className="p-6 md:m-10 m-5">
      <h1 className="text-3xl font-bold mb-8">Manage Jobs</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job Title"
          className="border p-2 rounded"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
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

      {jobs.length === 0 && (
        <p className="text-gray-500">No jobs posted yet.</p>
      )}

      {jobs.map((job) => (
        <div
          key={job.id}
          className="border rounded p-4 mb-3 flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
          <button
            onClick={() => deleteJob(job.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
