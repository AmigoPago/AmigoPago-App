#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::{Address as TestAddress, Ledger}, Address, Env, Duration};

#[test]
fn test_timelock_contract() {
    let env = Env::default();
    let owner = Address::random(&env);
    let unlock_duration = Duration::from_secs(60 * 60 * 24 * 60); // 2 meses

    // Inicializar el contrato
    TimelockContract::initialize(env.clone(), owner.clone(), unlock_duration);

    // Verificar el tiempo de desbloqueo
    let unlock_timestamp = TimelockContract::get_unlock_timestamp(env.clone());
    assert_eq!(unlock_timestamp, env.ledger().timestamp() + unlock_duration.as_secs());

    // Simular la cuenta de envío
    let amount = 1000;

    // Depositar fondos
    TimelockContract::deposit(env.clone(), amount);
    assert_eq!(TimelockContract::get_balance(env.clone()), amount);

    // Intentar retirar fondos antes de tiempo
    env.ledger().set_timestamp(env.ledger().timestamp() + 60 * 60 * 24 * 30); // 1 mes
    let result = std::panic::catch_unwind(|| TimelockContract::withdraw(env.clone()));
    assert!(result.is_err());

    // Intentar retirar fondos después del tiempo de desbloqueo
    env.ledger().set_timestamp(env.ledger().timestamp() + 60 * 60 * 24 * 30); // +1 mes (2 meses en total)
    let balance = TimelockContract::withdraw(env.clone());
    assert_eq!(balance, amount);
    assert_eq!(TimelockContract::get_balance(env.clone()), 0);
}