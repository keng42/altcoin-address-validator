/**
 * Ethereum address validator
 *
 * Originally written by:
 * https://github.com/ognus/wallet-address-validator/blob/master/src/ethereum_validator.js
 *
 * created by keng42 @2020-07-21 17:06:04
 */

import { keccak256 } from 'js-sha3';

export class Ethereum {
  static isValidAddress(address: string): boolean {
    if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
      // Check if it has the basic requirements of an address
      return false;
    }

    if (/^0x[0-9a-f]{40}$/.test(address) || /^0x?[0-9A-F]{40}$/.test(address)) {
      // If it's all small caps or all all caps, return true
      return true;
    }

    // Otherwise check each case
    return this.verifyChecksum(address);
  }

  static verifyChecksum(address: string): boolean {
    // Check each case
    address = address.replace('0x', '');

    const addressHash = keccak256(address.toLowerCase());

    for (let i = 0; i < 40; i++) {
      // The nth letter should be uppercase if the nth digit of casemap is 1
      if (
        (parseInt(addressHash[i], 16) > 7 &&
          address[i].toUpperCase() !== address[i]) ||
        (parseInt(addressHash[i], 16) <= 7 &&
          address[i].toLowerCase() !== address[i])
      ) {
        return false;
      }
    }

    return true;
  }
}
