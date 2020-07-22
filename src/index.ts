import { Ethereum } from './ethereum';
import { Tron } from './tron';

export * from './ethereum';
export * from './tron';

const chain2class = {
  ethereum: Ethereum,
  eth: Ethereum,
  tron: Tron,
  trx: Tron,
};

export function isValidAddress(
  chain: 'ethereum' | 'tron' | 'eth' | 'trx',
  address: string,
  network: 'main' | 'testnet' = 'main'
): boolean {
  if (!chain2class[chain]) {
    throw new Error('invalid chain');
  }
  return chain2class[chain].isValidAddress(address, network);
}
