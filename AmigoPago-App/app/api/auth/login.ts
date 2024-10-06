import { NextRequest, NextResponse } from 'next/server';
import { PasskeyKit } from 'passkey-kit'; 

export async function POST(request: NextRequest) {
  try {
    const passkeyKit = new PasskeyKit({ /* Your Passkey Kit configuration */ });
    const { username, credential } = await request.json();

    // Retrieve the user's publicKey from your database based on the username

    const { response } = await passkeyKit.authenticate(username, credential, publicKey); 

    if (response.verified) {
      // Successful authentication
      // Set session cookies or JWT
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}