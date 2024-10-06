


## Configuring the CLI for Testnet:
```bash
soroban network add \
  --global testnet \
  --rpc-url https://soroban-testnet.stellar.org:443 \
  --network-passphrase "Test SDF Network ; September 2015"
```

## Configure an Identity
```bash
soroban keys generate --global amigo --network testnet
```


## Deploy the contact:
### Upload the contract bytes to the network
```bash
soroban contract install \
  --network testnet \
  --source amigo \
  --wasm target/wasm32-unknown-unknown/release/soroban_increment_contract.wasm
```

###  Hash of the Wasm bytes:

```bash
0b1452c7f942b0879bab79dc5ffd15077ccbd5909ff806371660a0c7b43d88ed
```

### Instantiate the contract.
```bash
soroban contract deploy \
  --wasm-hash 0b1452c7f942b0879bab79dc5ffd15077ccbd5909ff806371660a0c7b43d88ed \
  --source amigo \
  --network testnet
```

###  Contract id:

```bash
CCKD6JJDQ3IVPF4WAYJNYSR7YWKKCGV36ZPR26WMLCC5UADHU63FXJO6
```

### generate an NPM package for contract
```bash
soroban contract bindings typescript \
  --network testnet \
  --contract-id CCKD6JJDQ3IVPF4WAYJNYSR7YWKKCGV36ZPR26WMLCC5UADHU63FXJO6 \
  --output-dir packages/increment
```
