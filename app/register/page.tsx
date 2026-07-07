"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Simple one-way credential hash — not cryptographic, but hides plaintext passwords
function hashCredential(email: string, password: string): string {
  return btoa(unescape(encodeURIComponent(email.toLowerCase() + "::" + password)));
}

interface UserRecord {
  id: number;
  name: string;
  role: string;
  credentialHash: string; // hashed — never a plaintext password
}

type UserIndex = Record<string, UserRecord>;

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // One-time cleanup: remove old-format keys from previous implementations
  useEffect(() => {
    // Remove the old shared "users" array (exposed all users' plaintext passwords)
    localStorage.removeItem("users");

    // Remove any individual user_<id> keys written by the previous fix
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && /^user_\d+$/.test(key)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = form.email.toLowerCase();

    // Load the shared index — emails map to hashed records only (no plaintext passwords)
    const userIndex: UserIndex = JSON.parse(
      localStorage.getItem("userIndex") || "{}"
    );

    if (userIndex[normalizedEmail]) {
      alert("An account with this email already exists.");
      return;
    }

    const newUserId = Date.now();

    const newRecord: UserRecord = {
      id: newUserId,
      name: form.name,
      role: form.role,
      // Password is never stored in plaintext anywhere
      credentialHash: hashCredential(normalizedEmail, form.password),
    };

    userIndex[normalizedEmail] = newRecord;
    localStorage.setItem("userIndex", JSON.stringify(userIndex));

    // currentUser holds only session info — no password, no other users' data
    const sessionUser = {
      id: newUserId,
      name: form.name,
      email: normalizedEmail,
      role: form.role,
    };
    localStorage.setItem("currentUser", JSON.stringify(sessionUser));

    // Clean up any leftover data from the old implementation
    localStorage.removeItem("users");

    alert("Registration Successful");
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-linear-to-r from-green-800 to-green-400 rounded-lg p-5 text-white">
      <h1 className="text-2xl font-bold mb-5">Register</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          className="border p-2 w-full text-gray-700"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          className="border p-2 w-full text-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          className="border p-2 w-full text-gray-700"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="border p-2 w-full text-gray-700"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="bg-white text-green-500 p-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}