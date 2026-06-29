"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =useState("");

  const [password, setPassword] =useState("");

  const handleLogin = ( e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const user = users.find(
      (u: any) =>
        u.email === email &&
        u.password === password
    );

    if (!user) {
      alert("Invalid Credentials");
      return;
    }

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );
    

    if (user.email === "admin@gmail.com") {
      router.push(
        "/admin/dashboard"
      );
    } else {
      router.push(
        "/user/dashboard"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-linear-to-r from-green-800 to-green-400 rounded-lg p-5  text-white">
      <h1 className="text-2xl font-bold mb-5">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-white text-green-500 p-2 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}