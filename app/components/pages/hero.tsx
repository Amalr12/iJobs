import Link from "next/link";

export default function Hero() {
  return (
   <div><div className="md:flex flex-col items-center text-center p-5 justify-center h-96 md:m-10 m-5 bg-linear-to-r from-green-800 to-green-400 rounded-lg">
    <h1 className="md:text-4xl text-xl font-bold text-white">Find Your Dream Job Today</h1>
    <h1 className="md:text-lg text-sm text-white text-center">
      Explore thousands of opportunities from top companies and take the next step in your career with confidence.
    </h1>
   <Link href="/register">
     <button className="mt-4 px-6 py-2 bg-white text-green-500 cursor-pointer font-bold rounded hover:bg-green-600 hover:text-white border hover:border-white transition duration-300">Register</button>
   </Link>
   <p className="text-white text-center mt-4">
     Already have an account? <Link href="/login" className="text-black hover:underline">Login here</Link>
   </p>
   </div>


   </div>
  );
}