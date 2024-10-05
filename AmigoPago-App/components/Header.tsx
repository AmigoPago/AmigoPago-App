"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link"

// import { useContext } from 'react';
// import { GlobalContext } from '../contexts/GlobalContext';


export default function HeaderComponent() {


  // async function connectToStellar() {
  //   await kit.openModal({
  //     onWalletSelected: async (option: ISupportedWallet) => {
  //       kit.setWallet(option.id);
  //       const publicKey = await kit.getPublicKey();
  //       // Do something else
  //       setStellarWalletAddress(publicKey);
  //       console.log(publicKey);
  //     },
  //   });  
  // }

  // const disconnectWallet = async () => {
  //   try {
  //     // Your logic to disconnect the wallet
  //     setStellarWalletAddress("");
  //     console.log('Wallet disconnected successfully');
  //   } catch (error) {
  //     console.error('Failed to disconnect wallet:', error);
  //   }
  // };

  return (
    <header className="w-full flex justify-between items-center :mx-8 mb-4 py-2 md:px-4 md:py-6 border border-gray-400 shadow-md rounded-lg bg-gradient-to-b from-[#f5f6f7] via-[#f5f6f7] to-[#c1c6d0]">
          <Link href="/" className="ml-4 md:ml-8">
            <h1 className="text-gray-800 text-2xl md:text-4xl font-bold">Amigo Pago</h1>            
          </Link> 
          { false && (
          <nav className="hidden md:flex mt-6">
            <Link className="text-gray-300 hover:text-white text-xl mx-4" href="/">
              Home
            </Link>
            <Link className="text-gray-300 hover:text-white text-xl mx-4" href="/page1">
              Page 1
            </Link>
            <Link className="text-gray-300 hover:text-white text-xl mx-4" href="/page2">
              Page 2
            </Link>
          </nav>          
          )}

          { true && (
            <Button className="mr-2 md:mr-8  md:mt-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
              Login
            </Button>
          )}
    </header>
    );
}

