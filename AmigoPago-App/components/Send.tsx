import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import app from '../config/firebaseConfig';
import { getAuth } from 'firebase/auth';

export default function SendComponent() {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [receivedAmount, setReceivedAmount] = useState('97')

  async function handleRegister() {
    const auth = getAuth(app);
    const user = auth.currentUser;
    const email = user ? user.email : null;

    if (!email) {
      console.error('No user is logged in');
      return;
    }

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      // Use the returned 'publicKey' and 'credential' from the API to 
      // initiate passkey creation with `navigator.credentials.create()`
      const publicKey = data.publicKey; 
      const credential = data.credential;

      console.log('publicKey', publicKey);
      console.log('credential', credential);
      
      const newCredential = await navigator.credentials.create({
        publicKey: {
          // ... (configure publicKey options based on the 'publicKey' from the server)
          challenge: publicKey.challenge,
          pubKeyCredParams: publicKey.pubKeyCredParams,
          rp: publicKey.rp,
          user: publicKey.user,
        }
      });

      // Send the newCredential back to your API to complete registration
      console.log('newCredential', newCredential);
      
    } else {
      console.error('Registration failed:', data.error);
    }
  }  

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">AmigoPago Send</CardTitle>
        <p className="text-gray-500">Send money to your recipient</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Button onClick={handleRegister}>Register</Button>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount to be sent(Digital Dollars)
          </label>
          <div className="relative">
            <Input
              id="amount"
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pr-8"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUp className="h-4 w-4 text-gray-400" />
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
            Recipient
          </label>
          <Select value={recipient} onValueChange={setRecipient}>
            <SelectTrigger id="recipient">
              <SelectValue placeholder="Select recipient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maria">Maria, Mother, CO</SelectItem>
              <SelectItem value="john">John, Father, NY</SelectItem>
              <SelectItem value="sarah">Sarah, Sister, CA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="received" className="block text-sm font-medium text-gray-700 mb-1">
            Amount to be received(Digital Dollars)
          </label>
          <div className="relative">
            <Input
              id="received"
              type="text"
              value={`$${receivedAmount}`}
              readOnly
              className="pr-8"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUp className="h-4 w-4 text-gray-400" />
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Transaction Details</h3>
          <p className="text-sm text-gray-600">Estimated fee: $3.00</p>
          <p className="text-sm text-gray-600">Transaction duration: Seconds</p>
        </div>

        <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          Transfer
        </Button>
      </CardContent>
    </Card>
  )
}