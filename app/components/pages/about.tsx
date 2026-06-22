import Image from "next/image";

export default function About() {
  return (
   <div className="container mx-auto px-4 py-8 md:m-10 m-5">
    <h1 className="md:text-3xl text-xl font-bold  text-green-700">About iJobs</h1>
    <div className="grid md:grid-cols-2  mt-4">
        <p className="md:text-lg text-sm  flex text-justify">iJobs is a comprehensive recruitment platform designed to bridge the gap between job seekers and employers. Our mission is to simplify the hiring process by providing an easy-to-use platform where candidates can explore opportunities, apply for jobs, and monitor their application progress. Employers can post vacancies, manage applications, and identify qualified candidates efficiently.</p>
      <Image src="/images.jfif" alt="iJobs" width={500} height={300} />
       
    </div>


   </div>
  );
}