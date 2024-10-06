import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import app from '../config/firebaseConfig'; 
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/navigation'

export default function LoginComponent() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const auth = getAuth(app)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      console.log('User signed in:', userCredential.user)
      setUser(userCredential.user); // Set the user in the context
      // Redirect or perform other actions after successful login

      console.log('User signed in:', userCredential.user);

      router.push('/');

    } catch (error) {
      console.error('Error signing in:', error)
      setError('Failed to sign in. Please check your credentials.')
    }
  }

  const handleGoogleLogin = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      console.log('User signed in with Google:', result.user)
      // Redirect or perform other actions after successful login
      router.push('/');

    } catch (error) {
      console.error('Error signing in with Google:', error)
      setError('Failed to sign in with Google. Please try again.')
    }
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Login
            </Button>
          </form>
          <Button 
            variant="outline" 
            className="w-full mt-4 border-orange-500 text-orange-500 hover:bg-orange-50"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-orange-500 hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mt-2 text-center">
            Don`t have an account?{' '}
            <Link href="/signup" className="text-orange-500 hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}