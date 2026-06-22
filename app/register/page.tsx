"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const newUser = {
      id: Date.now(),
      ...form,
    };

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    alert("Registration Successful");

    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-linear-to-r from-green-800 to-green-400 rounded-lg p-5  text-white">
      <h1 className="text-2xl font-bold mb-5">
        Register
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

       

        <button
          type="submit"
          className="bg-white text-green-500 p-2 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
}