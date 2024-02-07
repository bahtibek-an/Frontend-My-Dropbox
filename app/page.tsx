import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox
            <br /> <br />
            Storing everything for you and your business needs. All in one place
          </h1>
          <p className="pb-20">
            Enhance your personal experience with Dropbox, offering a simple and
            efficient way to upload, organize, and access files from anywhere.
            Securely store important documents and media, and experience the
            convenience of easy file management and sharing in one centralized
            solution
          </p>
          <Link
            href="/dashboard"
            className="flex cursor-pointer bg-blue-500 w-fit p-5"
          >
            Try it for free
            <ArrowRight className="ml-10" />
          </Link>
        </div>

        <div className="bg-[#1E1919] dark:bg-slate-800 h-full p-10">
          <Image
            src="https://aem.dropbox.com/cms/content/dam/dropbox/blog/files/2017/04/screenshot3_1300x760.png"
            alt="logo"
            height={1440}
            width={1440}
          />
        </div>
      </div>
      {/* Disclaimer section */}
      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
      <p className="text-center font-light p-2">
        This website is made only for information and educational purposes.
        I/Ramesh do not own or affiliate with Dropbox or/and any of its
        subsidiaries in any form. Copyright Disclaimer under section 107 of the
        copyright Act 1976, allowance is made for fair use of this website for
        eduction purposes.
      </p>
    </main>
  );
}
