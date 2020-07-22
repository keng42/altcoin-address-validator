/**
 * Tron address validator
 *
 * Originally written by:
 * https://github.com/christsim/multicoin-address-validator/blob/master/src/tron_validator.js
 *
 * created by keng42 @2020-07-21 17:06:04
 */

import jsSHA from 'jssha';
import { decodeBase58, byteArray2hexStr, hexStr2byteArray } from './utils';

export class Tron {
  static isValidAddress(
    address: string,
    network: 'main' | 'testnet' = 'main'
  ): boolean {
    const addressBytes = this.decodeBase58Address(address);

    if (!addressBytes) {
      return false;
    }

    if (addressBytes.length !== 21) {
      return false;
    }

    if (network === 'main') {
      return addressBytes[0] === 0x41;
    }
    return addressBytes[0] === 0xa0;
  }

  static decodeBase58Address(base58Address: string): number[] | null {
    if (base58Address.length <= 4) {
      return null;
    }

    let address: number[];
    try {
      address = decodeBase58(base58Address);
    } catch (e) {
      return null;
    }

    const len = address.length;
    const offset = len - 4;
    const checkSum = address.slice(offset);
    address = address.slice(0, offset);

    let shaObj = new jsSHA('SHA-256', 'HEX');
    shaObj.update(byteArray2hexStr(address));
    const hash0 = shaObj.getHash('HEX');

    shaObj = new jsSHA('SHA-256', 'HEX');
    shaObj.update(hash0);
    const hash1 = hexStr2byteArray(shaObj.getHash('HEX'));

    const checkSum1 = hash1.slice(0, 4);
    if (
      checkSum[0] === checkSum1[0] &&
      checkSum[1] === checkSum1[1] &&
      checkSum[2] === checkSum1[2] &&
      checkSum[3] === checkSum1[3]
    ) {
      return address;
    }

    return null;
  }
}
