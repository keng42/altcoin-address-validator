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

