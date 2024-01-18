import React from "react";
import Link from "next/link";
import Image from "next/image";

import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";

import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  return (
    <header className="flex items-center justify-between pt-5 pb-5 sticky z-50 top-0 bg-white">
      <Link href="/" className="flex items-center space-x-2 px-5">
        <div className="bg-[#0160fe] w-fit rounded-lg">
          <Image
            src="https://www.shareicon.net/data/128x128/2015/11/08/668675_box_512x512.png"
            alt="logo"
            className="invert p-2"
            width={50}
            height={50}
          />
        </div>
        <h1 className="font-bold text-xl dark:text-black">Dropbox</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
