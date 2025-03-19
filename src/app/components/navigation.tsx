"use client";
import { SignInButton, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-center items-center p-4">
      <Link
        href="/"
        className={
          pathname === "/"
            ? "mr-4 font-bold hover:text-sky-700"
            : "text-blue-100 mr-4 hover:text-sky-700"
        }
      >
        Home
      </Link>
      <Link
        href="/about"
        className={
          pathname === "/about"
            ? "mr-4 font-bold hover:text-sky-700"
            : "text-blue-100 mr-4 hover:text-sky-700"
        }
      >
        About
      </Link>
      <Link
        href="/products/1"
        className={
          pathname.startsWith("/products/1")
            ? "mr-4 font-bold hover:text-sky-700"
            : "text-blue-100 mr-4 hover:text-sky-700"
        }
      >
        Product 1
      </Link>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </nav>
  );
};
