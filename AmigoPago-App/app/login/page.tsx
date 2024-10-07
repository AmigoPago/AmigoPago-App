"use client";

import HeaderComponent from "../../components/Header";
import FooterSection from "../../components/Footer";
import LoginComponent from "../../components/Login";

export default function Login() {
  return (
    <div className="h-screen">
      <div className="space-y-20">
        <div className="flex flex-col items-center w-full space-y-4 bg-blue-600">
          <HeaderComponent />
          <LoginComponent /> 
          <FooterSection />
        </div>
      </div>
    </div>    
  );
}
