"use client";

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import app from '../config/firebaseConfig'; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { Alert } from "@/components/ui/alert"; // Import the Shadcn alert component

const CreateAccountComponent = () => {

  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    location: ''
  });
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const auth = getAuth(app); // Pass the initialized app

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create user in Firebase
      await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Log the user in
      await signInWithEmailAndPassword(auth, formData.email, formData.password);

      console.log('User created and logged in');

      // Redirect to a different page or change the menu
      router.push('/'); // Change '/dashboard' to your desired route
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        console.error('Email already in use');
        setAlertMessage('This email is already in use. Please try logging in or use a different email.');
      } else {
        console.error('Error creating user:', error);
        setAlertMessage('An error occurred while creating the account. Please try again.');
      }
    }
  }

  useEffect(() => {
    if (isMounted) {
      // Perform any actions that require the router here
    }
  }, [isMounted]);

  return (
    <Card className="w-full max-w-md mx-auto border border-gray-500 rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Create an account</CardTitle>
        <p className="text-gray-500">Enter your details to sign up for our Digital Wallet</p>
      </CardHeader>
      <CardContent>
        {alertMessage && (
          <Alert className="mb-4 text-red-500" >
            {alertMessage}
          </Alert>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">City/State/Country</label>
            <Input
              id="location"
              name="location"
              type="text"
              required
              value={formData.location}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-500">
          OR CONTINUE WITH
        </div>
        <Button variant="outline" className="w-full mt-2 border-orange-500 text-orange-500 hover:bg-orange-50">
          Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Already have an account? 
          <Link href="/login" className="text-orange-500 hover:underline">
            Log in
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}


export default CreateAccountComponent;