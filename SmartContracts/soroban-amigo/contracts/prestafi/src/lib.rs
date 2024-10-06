#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, Duration};

#[contract]
pub struct TimelockContract;

#[contractimpl]
impl TimelockContract {
    pub fn initialize(env: Env, owner: Address, unlock_after: Duration) {
        let unlock_timestamp = env.ledger().timestamp() + unlock_after.as_secs();
        env.storage().instance().set(&Symbol::short("unlock_ts"), &unlock_timestamp);
        env.storage().instance().set(&Symbol::short("owner"), &owner);
        env.storage().instance().set(&Symbol::short("balance"), &0i128);
    }

    pub fn deposit(env: Env, amount: i128) {
        let owner: Address = env.storage().instance().get::<soroban_sdk::Symbol, Symbol>(&Symbol::short("owner")).unwrap().unwrap();
        owner.require_auth();

        let mut balance: i128 = env.storage().instance().get::<soroban_sdk::Symbol, Symbol>(&Symbol::short("balance")).unwrap().unwrap();
        balance += amount;
        env.storage().instance().set(&Symbol::short("balance"), &balance);
    }

    pub fn withdraw(env: Env) -> i128 {
        let owner: Address = env.storage().instance().get::<soroban_sdk::Symbol, Symbol>(&Symbol::short("owner")).unwrap().unwrap();
        owner.require_auth();

        let unlock_timestamp: u64 = env.storage().instance().get::<soroban_sdk::Symbol, Symbol>(&Symbol::short("owner")).unwrap().unwrap();
        let current_timestamp = env.ledger().timestamp();
        if current_timestamp < unlock_timestamp {
            panic!("Funds are still locked");
        }

        let balance: i128 = env.storage().instance().get::<soroban_sdk::Symbol, V>(&Symbol::short("balance")).unwrap().unwrap();
        env.storage().instance().set(&Symbol::short("balance"),q &0i128);

        balance
    }

    pub fn get_balance(env: Env) -> i128 {
        env.storage().instance().get::<soroban_sdk::Symbol, V>(&Symbol::short("balance")).unwrap().unwrap_or(0)
    }

    pub fn get_unlock_timestamp(env: Env) -> u64 {
        env.storage().instance().get::<soroban_sdk::Symbol, V>(&Symbol::short("unlock_ts")).unwrap().unwrap_or(0)
    }
}