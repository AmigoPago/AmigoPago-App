# AmigoPago App

AmigoPago is a Stellar-powered non-custodial digital wallet designed to facilitate fast, low-cost payments for Latino immigrants in the U.S. This NextJS application serves as the frontend interface for the AmigoPago platform.

## About AmigoPago

AmigoPago aims to revolutionize cross-border payments and financial services for Latino immigrants in the United States. By leveraging blockchain technology and the Stellar network, we provide a secure, efficient, and cost-effective solution for remittances, local payments, and access to credit.

Our platform utilizes two main tokens:
- USDC: A stable coin used for transfers and payments
- AMI: Our native utility token that offers cashback rewards and serves as collateral for our credit system

## Key Benefits

- Low-cost remittances: Save on international transfer fees
- Instant settlements: Experience near-real-time transactions
- Cashback rewards: Earn AMI tokens on every transfer
- Access to credit: Use AMI tokens as collateral for USDC loans
- Local merchant payments: Seamless integration with participating businesses

## Features

- User registration and authentication
- Wallet management for USDC and AMI tokens
- Funds transfer and remittances
- AMI token cashback and rewards system
- USDC-backed credit system
- Merchant integration for local payments
- OnRamp and OffRamp services integration
- Transaction history and notifications
- Multi-language support (Spanish and English)

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Stellar SDK
- Soroban SDK

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/amigopago.git
   cd amigopago
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.example` to `.env` and fill in the necessary values.

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Usage

- **Register**: Create an account to start using the wallet.
- **Manage Wallet**: Add USDC and AMI tokens to your wallet.
- **Transfer Funds**: Send money to other users or merchants.
- **Earn Rewards**: Participate in cashback programs using AMI tokens.

## Smart Contract Integration

This frontend application interacts with Soroban smart contracts on the Stellar network. The main contracts include:

- Token Management Contract: Handles AMI token issuance, transfers, and burning
- Remittance Contract: Processes USDC transfers and triggers AMI token rewards
- Credit System Contract: Manages the USDC-backed credit system using AMI tokens as collateral
- Merchant Payment Contract: Facilitates payments to participating merchants using AMI tokens

For more details on smart contract integration, refer to the `src/contracts` directory.

## Security Measures

- Non-custodial wallet: Users have full control over their funds
- Multi-factor authentication: Enhanced account security
- Smart contract audits: Regular security checks on our blockchain interactions

## Regulatory Compliance

AmigoPago is committed to adhering to all relevant financial regulations and KYC/AML requirements in the jurisdictions we operate in.

## Contributing

We welcome contributions from the community. Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## Code of Conduct

Please adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all interactions.

## Acknowledgments

We would like to thank the Stellar Development Foundation and all contributors who have helped make this project possible.

## Support

For any queries or issues, please contact our support team at support@amigopago.xyz

## License

This project is licensed under the [MIT License](LICENSE).