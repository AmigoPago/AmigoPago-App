"use client";

import HeaderComponent from "../../components/Header";
import FooterSection from "../../components/Footer";
import ForgotPasswordComponent from "@/components/ForgotPassword";

export default function Login() {
  return (
    <div className="px-10 py-10 h-screen">
      <div className="space-y-20">
        <div className="flex flex-col items-center w-full space-y-4">
          <HeaderComponent />
          <ForgotPasswordComponent />
          <FooterSection />
        </div>
      </div>
    </div>    
  );
}
