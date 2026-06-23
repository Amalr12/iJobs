import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-white  p-4 shadow-md relative z-50 md:m-10 m-5 rounded-lg">
      <Link href={"/"}>
        <div className="flex text-green-600 items-center justify-center cursor-pointer">

          <h1

            style={{
              fontWeight: 700,

              fontSize: "1.5rem",
              marginLeft: "0.5rem",
            }}
          >
            i-Jobs
          </h1>
            </div >

      </Link>
      <div className="flex items-center gap-4 font-bold text-sm justify-center cursor-pointer">
       <Link href="https://www.youtube.com">
          <h1>YouTube</h1>
        </Link>
        <Link href="https://www.linkedin.com">
          <h1>LinkedIn</h1>
        </Link>
        <Link href="https://www.twitter.com">
          <h1>Twitter</h1>
        </Link>
      </div>
      <div className={`md:flex justify-around gap-2 md:gap-6 text-center md:text-left mt-5 font-bold text-sm md:text-base`}>
                <div><h1 className="text-sm md:text-base">@2026 iJobs. All Rights Reserved.</h1></div>
                <div>   <h1 className="text-sm md:text-base">  Terms & Conditions</h1></div>

            </div>
    </div>
  
  );
}