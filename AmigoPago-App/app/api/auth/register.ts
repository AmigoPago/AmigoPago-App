import { NextRequest, NextResponse } from 'next/server';
import { PasskeyKit } from 'passkey-kit'; 

export async function POST(request: NextRequest) {
  try {
    const passkeyKit = new PasskeyKit({ /* Your Passkey Kit configuration */ });
    const { username, ...options } = await request.json(); 
    const { publicKey, credential } = await passkeyKit.register(username, options);

    // Store publicKey securely (e.g., in your database) associated with the user

    return NextResponse.json({ publicKey, credential }); 
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}