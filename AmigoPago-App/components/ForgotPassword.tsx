import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordComponent() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Simulating an API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // For demonstration, we'll assume the request was successful
      setSubmitStatus('success')
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto border border-gray-500 rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Forgot Password</CardTitle>
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
          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Reset Password'}
          </Button>
        </form>

        {submitStatus === 'success' && (
          <Alert className="mt-4 bg-green-100 border-green-500">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              If an account exists for {email}, you will receive password reset instructions.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert className="mt-4 bg-red-100 border-red-500">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              An error occurred. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-4">
          <Link href="/login" className="text-orange-500 hover:underline flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}