"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Total Jobs",
    href: "/user/jobs",
  },
  {
    title: "Applied Jobs",
    href: "/user/applied-jobs",
  },
  {
    title: "Profile",
    href: "/user/profile",
  },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r bg-white">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold">
          User Panel
        </h2>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block rounded-lg px-4 py-3 transition ${
              pathname === item.href
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {item.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}