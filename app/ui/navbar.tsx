"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from 'lucide-react';

export default function Navbar() {
      const [open, setOpen] = useState(false);
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
                    <div
                        className={` hidden md:flex items-center gap-4 text-white`}
                    >
                        <Link href={"/register"}>
                            <button className="border border-green-700 text-green-700 bg-white rounded hover:text-black px-4 py-2 rounded cursor-pointer" onClick={() => setOpen(false)}>
                                Register
                            </button>
                        </Link>

                        <Link href={"/login"}>
                            <button className="border border-white text-white bg-linear-to-r from-green-800 to-green-400 rounded hover:text-black hover:bg-linear-to-r from-green-800 to-green-400 px-4 py-2 rounded cursor-pointer" onClick={() => setOpen(false)}>
                                Login
                            </button>
                        </Link>


                    </div>
                </div>


                {open && (
                    <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center gap-4 py-6 md:hidden rounded-lg shadow-lg">

                       

                        <Link href={"/register"}>
                            <button className="border border-green-700 text-green-700 bg-white rounded hover:text-black px-4 py-2 rounded cursor-pointer" onClick={() => setOpen(false)}>
                                Register
                            </button>
                        </Link>

                        <Link href={"/login"}>
                            <button className="border border-white text-white bg-linear-to-r from-green-800 to-green-400 rounded hover:text-black hover:bg-linear-to-r from-green-800 to-green-400 px-4 py-2 rounded cursor-pointer" onClick={() => setOpen(false)}>
                                Login
                            </button>
                        </Link>

                    </div>
                )}
            </nav>
        </div>
    );
}