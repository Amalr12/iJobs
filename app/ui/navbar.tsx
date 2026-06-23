"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, LogOut, User } from 'lucide-react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    const [currentUser, setCurrentUser] = useState<any>(null);

    useEffect(() => {
        const user = localStorage.getItem("currentUser");

        if (user) {
            setCurrentUser(JSON.parse(user));
        }
    }, []);
    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        setCurrentUser(null);

        window.location.href = "/";
    };
    return (
        <div>
            <nav className={`bg-white text-green-600 p-4 shadow-md relative z-50 md:m-10 m-5 rounded-lg`}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                        <Link href={"/"}>
                            <div className="flex items-center cursor-pointer">

                                <h1

                                    style={{
                                        fontWeight: 700,

                                        fontSize: "1.5rem",
                                        marginLeft: "0.5rem",
                                    }}
                                >
                                    i-Jobs
                                </h1>
                            </div>
                        </Link>

                        {/* Menu Icon */}
                        <Menu
                            onClick={() => setOpen(!open)}
                            className="h-7 w-7 md:hidden cursor-pointer text-green-700"
                        />
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-4">
                        {currentUser ? (
                            <>
                                <div className="flex items-center gap-2 text-green-700">
                                    <User size={22} />
                                    <span>{currentUser.name}</span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/register">
                                    <button className="border border-green-700 text-green-700 bg-white px-4 py-2 rounded">
                                        Register
                                    </button>
                                </Link>

                                <Link href="/login">
                                    <button className="bg-green-600 text-white px-4 py-2 rounded">
                                        Login
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>


                {open && (

                    currentUser ? (
                        <>
                            <div className="flex items-center gap-2">
                                <User size={22} />
                                <span>{currentUser.name}</span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/register">
                                <button
                                    className="border border-green-700 text-green-700 bg-white px-4 py-2 rounded"
                                    onClick={() => setOpen(false)}
                                >
                                    Register
                                </button>
                            </Link>

                            <Link href="/login">
                                <button
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                    onClick={() => setOpen(false)}
                                >
                                    Login
                                </button>
                            </Link>
                        </>
                    )
                )}
            </nav>
        </div>
    );
}