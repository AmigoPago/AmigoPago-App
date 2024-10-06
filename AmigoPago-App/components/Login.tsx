import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export default function LoginComponent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Login attempted with:', { email, password })
    // Here you would typically handle the login logic
  }

  return (
    <div className="flex justify-center items-center my-auto">

<Card className="w-full max-w-md mx-auto border border-gray-500 rounded-xl h-auto my-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Welcome to AmigoPago!</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Login
          </Button>
        </form>
        <Button variant="outline" className="w-full mt-4 border-orange-500 text-orange-500 hover:bg-orange-50">
          Login with Google
        </Button>
        <div className="mt-4 text-center">
          <Link href="/forgot-password" className="text-orange-500 hover:underline">
            Forgot password?
          </Link>
        </div>
        <div className="mt-2 text-center">
          Don`apos;t have an account?{' '}
          <Link href="/signup" className="text-orange-500 hover:underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>


    </div>
  )
}