import { expect } from 'chai';
import 'mocha';
import { Ethereum, Tron, isValidAddress } from '../src/index';

describe('validate altcoin address', () => {
  it('should return true for valid ethereum address', () => {
    const isValid = isValidAddress(
      'eth',
      '0x742d35cc6634c0532925a3b844bc454e4438f44e'
    );
    expect(isValid).to.be.equal(true);
  });

  it('should return true for valid tron address', () => {
    const isValid = isValidAddress('trx', 'TA9FnQrLGdgLW6cwBKue9DyqSBz1UNzUMR');
    expect(isValid).to.be.equal(true);
  });

  it('should throw error when the chain is not supported', () => {
    expect(() => {
      isValidAddress(
        // @ts-ignore
        'invalid-chain',
        'TA9FnQrLGdgLW6cwBKue9DyqSBz1UNzUMR'
      );
    }).to.throw();
  });
});

describe('validate ethereum address', () => {
  it('should return true for valid address', () => {
    const isValid = Ethereum.isValidAddress(
      '0x742d35cc6634c0532925a3b844bc454e4438f44e'
    );
    expect(isValid).to.be.equal(true);
  });

  it('should return false because basic requirements not met', () => {
    const isValid =
      Ethereum.isValidAddress('0x742d35cc6634c0532925a3b844bc454e4438f44') ||
      Ethereum.isValidAddress('0x742d35cc6634c0532925a3b844bc454e4438f44ee') ||
      Ethereum.isValidAddress('0x742d35cc6634c0532925a3b844bc454e4438f44g');
    expect(isValid).to.be.equal(false);
  });

  it('should return false because  checksum not met', () => {
    const isValid =
      Ethereum.isValidAddress('0x742d35cc6634c0532925a3b844bc454e4438f44') ||
      Ethereum.isValidAddress('0x742d35cc6634c0532925a3b844bc454e4438f44ee') ||
      Ethereum.isValidAddress('0x742d35cc6634c0532925a3b844bc454e4438f44g');
    expect(isValid).to.be.equal(false);
  });
});

describe('validate tron address', () => {
  it('should return true for valid address', () => {
    const isValid = Tron.isValidAddress('TA9FnQrLGdgLW6cwBKue9DyqSBz1UNzUMR');
    expect(isValid).to.be.equal(true);
  });

  it('should return false because basic requirements not met', () => {
    const isValid =
      Tron.isValidAddress('TA9FnQrLGdgLW6cwBKue9DyqSBz1UNzUM') ||
      Tron.isValidAddress('TA9FnQrLGdgLW6cwBKue9DyqSBz1UNzUMee') ||
      Tron.isValidAddress('TA9FnQrLGdgLW6cwBKue9DyqSBz1UNzUMg');
    expect(isValid).to.be.equal(false);
  });

  it('should return false because network not met', () => {
    const isValid = Tron.isValidAddress(
      'TA9FnQrLGdgLW6cwBKue9DyqSBz1UNzUMR',
      'testnet'
    );
    expect(isValid).to.be.equal(false);
  });
});
