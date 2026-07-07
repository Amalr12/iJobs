"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Must match the same hash function used during registration
function hashCredential(email: string, password: string): string {
  return btoa(unescape(encodeURIComponent(email.toLowerCase() + "::" + password)));
}

interface UserRecord {
  id: number;
  name: string;
  role: string;
  credentialHash: string;
}

type UserIndex = Record<string, UserRecord>;

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    const userIndex: UserIndex = JSON.parse(
      localStorage.getItem("userIndex") || "{}"
    );

    let record = userIndex[normalizedEmail];

    if (!record) {
      const legacyUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const legacyUser = legacyUsers.find(
        (user: any) => user.email?.toLowerCase() === normalizedEmail
      );

      if (legacyUser) {
        const legacyPassword = legacyUser.password;

        if (legacyPassword === password) {
          record = {
            id: legacyUser.id || Date.now(),
            name: legacyUser.name || normalizedEmail,
            role: legacyUser.role || "user",
            credentialHash: hashCredential(normalizedEmail, legacyPassword),
          };

          userIndex[normalizedEmail] = record;
          localStorage.setItem("userIndex", JSON.stringify(userIndex));
          localStorage.removeItem("users");
        }
      }
    }

    if (!record) {
      alert("Invalid Credentials");
      return;
    }

    const inputHash = hashCredential(normalizedEmail, password);
    if (inputHash !== record.credentialHash) {
      alert("Invalid Credentials");
      return;
    }

    const sessionUser = {
      id: record.id,
      name: record.name,
      email: normalizedEmail,
      role: record.role,
    };
    localStorage.setItem("currentUser", JSON.stringify(sessionUser));

    if (record.role === "admin" || normalizedEmail === "admin@gmail.com") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-linear-to-r from-green-800 to-green-400 rounded-lg p-5 text-white">
      <h1 className="text-2xl font-bold mb-5">Login</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full text-gray-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full text-gray-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" className="bg-white text-green-500 p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
}