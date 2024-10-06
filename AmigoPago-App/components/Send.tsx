'use client';

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import incrementor from "../contracts/soroban_increment_contract";

import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  FreighterModule,
  FREIGHTER_ID,
  ISupportedWallet
} from '@creit.tech/stellar-wallets-kit';
import { isAllowed, setAllowed, getUserInfo, getPublicKey, signTransaction } from '@stellar/freighter-api';

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: [
    new FreighterModule(),
  ]
});

export default function SendComponent() {
  const [amount, setAmount] = useState('')
  const [recipient, setRecipient] = useState('')
  const [receivedAmount] = useState('97')
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const handleOpenModal = async () => {
    await kit.openModal({
      onWalletSelected: async (option: ISupportedWallet) => {
        kit.setWallet(option.id);
        const { address } = await kit.getAddress();
        setWalletAddress(address); // Set the wallet address
        console.log('address', address);
      }
    }); 
  }

  const handleTransfer = async () => {
    console.log('transfer', amount, recipient, walletAddress);
    const { address } = await kit.getAddress();

    console.log('address', address);
    console.log('networkPassphrase', WalletNetwork.PUBLIC);

    // Sign a message instead of a transaction
    const message = 'Approve to allow AmigoPago to process the transfer.';
    const { signedMessage } = await kit.signMessage(message, {
      address,
      networkPassphrase: WalletNetwork.PUBLIC
    });

    console.log('signedMessage');
    console.log(signedMessage.toString());

    if (await isAllowed()) {
      // Use the address obtained from kit.getAddress() as the public key
      const publicKey = address;
      if (publicKey) incrementor.options.publicKey = publicKey;
    }
    console.log('Saving Collateral');
    console.log(incrementor.options.publicKey);
    // const tx = await incrementor.increment();
    //const { result } = await tx.signAndSend({signTransaction});
    //console.log('result', result);
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">AmigoPago Send</CardTitle>
        <p className="text-gray-500">Send money to your recipient</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-center mb-4">
            {walletAddress ? (
              <p className="text-gray-700">
                Connected Wallet: {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-5)}` : ''}
              </p>
            ) : (
              <Button onClick={handleOpenModal} className="bg-orange-500 hover:bg-orange-600 text-white">
                Connect Wallet
              </Button>
            )}
          </div>
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

        <Button onClick={handleTransfer} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
          Transfer
        </Button>
      </CardContent>
    </Card>
  )
}