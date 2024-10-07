"use client";

import HeaderComponent from "../../components/Header";
import FooterSection from "../../components/Footer";
import DepositComponent from "../../components/Deposit";

export default function Deposit() {
  return (
    <div className="">
    <div className="absolute -z-50 top-0 left-0 w-1/2 h-1/2 bg-orange-300/70 blur-[256px] opacity-45 rounded-full -z-1" />
      <div className="space-y-20">
        <div className="flex flex-col items-center w-full space-y-4">
          <HeaderComponent />
          <DepositComponent />
          <FooterSection />
        </div>
      </div>
    </div>    
  );
}
