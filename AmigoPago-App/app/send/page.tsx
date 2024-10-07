"use client";

import HeaderComponent from "../../components/Header";
import FooterSection from "../../components/Footer";
import SendComponent from "../../components/Send";

export default function Send() {
  return (
    <div className="">
    <div className="absolute -z-50 top-0 left-0 w-1/2 h-1/2 bg-orange-300/70 blur-[256px] opacity-45 rounded-full -z-1" />
      <div className="space-y-20">
        <div className="flex flex-col items-center w-full space-y-4 bg-blue-600">
          <HeaderComponent />
          <SendComponent />
          <FooterSection />
        </div>
      </div>
    </div>    
  );
}
