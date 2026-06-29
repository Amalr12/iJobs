"use client";

import { useState } from "react";

interface JobFormProps {
  jobId: number;
  jobTitle: string;
  company: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function JobForm({
  jobId,
  jobTitle,
  company,
  isOpen,
  onClose,
}: JobFormProps) {
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResume = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setResume(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    if (!phone || !resume) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) {
      alert("Please login first");
      setLoading(false);
      return;
    }

    const applications = JSON.parse(
      localStorage.getItem("applications") || "[]"
    );

    const newApplication = {
      id: Date.now(),
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      jobId,
      jobTitle,
      company,
      phone,
      resumeUrl: resume,
      resumeViews: 0,
      status: "Pending",
      appliedAt: new Date().toLocaleDateString(),
    };

    const updatedApplications = [
      ...applications,
      newApplication,
    ];

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    alert("Application Submitted Successfully!");
    setPhone("");
    setResume("");
    setLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Apply for {jobTitle}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Company: <span className="font-semibold">{company}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Resume (PDF, DOC, DOCX)
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResume}
              className="w-full border p-3 rounded"
            />
            {resume && (
              <p className="text-sm text-green-600 mt-2">
                ✓ Resume uploaded
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}