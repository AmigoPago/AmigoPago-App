"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import app from '../config/firebaseConfig';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import signOut from Firebase
import Avatar from './Avatar';
import { useRouter } from 'next/navigation'
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";


export default function HeaderComponent() {

  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //  const [userId, setUserId] = useState<string | null>(null); // Add state for userId

  useEffect(() => {
    const auth = getAuth(app); // Initialize Firebase auth
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Update state based on user presence
      //      setUserId(user ? user.uid : null); // Set userId if user is logged in
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('User signed out');
      router.push('/');

    }).catch((error) => {
      console.error('Error signing out: ', error);
    });
  };

  return (
    <header className="w-full flex justify-between items-center :mx-8 mb-4 py-2 md:px-4 md:py-6 border border-gray-400 shadow-md rounded-lg bg-gradient-to-b from-[#f5f6f7] via-[#f5f6f7] to-[#c1c6d0]">

      {isLoggedIn && (
        <div className="md:hidden ml-2 flex items-center"> {/* Add flex and items-center for inline display */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="lg:hidden" size="icon" variant="outline">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-64" side="left">
              <nav className="grid gap-2 py-4">
                <Link
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/"
                >
                  Home
                </Link>
                <Link
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/send"
                >
                  Send
                </Link>
                <Link
                  className="flex w-full items-center gap-2 px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                  href="/deposit"
                >
                  Deposit
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="ml-2"> {/* Add margin-left for spacing */}
            <h1 className="text-gray-800 text-md font-bold">Amigo Pago</h1>
          </Link>
        </div>
      )}

      {!isLoggedIn && (
          <Link href="/" className="ml-4 md:hidden"> {/* Add margin-left for spacing */}
          <h1 className="text-gray-800 text-md font-bold">Amigo Pago</h1>
        </Link>

      )}

      <Link href="/" className="hidden md:block lg:ml-4">
        <h1 className="text-gray-800 text-2xl md:text-4xl font-bold">Amigo Pago</h1>
      </Link>

      {isLoggedIn && (
        <nav className="hidden md:flex">
          <Link className="text-gray-800 hover:text-black text-xl mx-4" href="/">
            Home
          </Link>
          <Link className="text-gray-800 hover:text-black text-xl mx-4" href="/send">
            Send
          </Link>
          <Link className="text-gray-800 hover:text-black text-xl mx-4" href="/deposit">
            Deposit
          </Link>
        </nav>
      )}

      <div>
        {!isLoggedIn && (
          <>
            <Link href="/login">
              <Button className="mr-2 md:mr-8  md:mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="mr-1 md:mr-8  md:mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded">
                SignUp
              </Button>
            </Link>
          </>
        )}

        {isLoggedIn && (
          <div className="flex items-center"> {/* Add flexbox container */}
            <Avatar />
            <Button
              className="m-2 md:mr-8 md:mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded"
              onClick={handleLogout} // Attach the logout handler
            >
              Logout
            </Button>
          </div>
        )}
      </div>

    </header>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
