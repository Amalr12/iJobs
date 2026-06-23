"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import JobForm from "@/app/components/jobForm";

interface Job {
  id: number;
  title: string;
  company: string;
}

export default function JobDetail() {
  const params = useParams();
  const jobId = Number(params.id);

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  useEffect(() => {
    const storedJobs = JSON.parse(
      localStorage.getItem("jobs") || "[]"
    );

    const foundJob = storedJobs.find(
      (j: Job) => j.id === jobId
    );

    setJob(foundJob || null);
    setLoading(false);
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">
          Job Not Found
        </h1>
        <Link href="/user/dashboard">
          <button className="bg-green-500 text-white px-6 py-2 rounded">
            Back to Dashboard
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="md:m-10 m-5">
      <Link href="/user/dashboard">
        <button className="mb-6 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400">
          ← Back
        </button>
      </Link>

      <div className="max-w-2xl mx-auto border rounded-lg p-6 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">
          {job.title}
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          {job.company}
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Job Description
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We are looking for a talented{" "}
              {job.title} to join our team at{" "}
              {job.company}. This is a great
              opportunity to work with a dynamic
              team and contribute to exciting
              projects.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Key Responsibilities:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Develop and maintain high-quality
                code
              </li>
              <li>
                Collaborate with team members
              </li>
              <li>
                Participate in code reviews
              </li>
              <li>
                Contribute to project planning
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Requirements:
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                Proficiency in relevant
                technologies
              </li>
              <li>
                Strong problem-solving skills
              </li>
              <li>
                Good communication abilities
              </li>
              <li>
                Team collaboration experience
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-8 py-3 rounded text-lg font-semibold hover:bg-green-600"
        >
          Apply Now
        </button>
      </div>

      <JobForm
        jobId={job.id}
        jobTitle={job.title}
        company={job.company}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
