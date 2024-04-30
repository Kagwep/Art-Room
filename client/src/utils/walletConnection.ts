import { type Chain } from 'wagmi';

// https://wagmi.sh/react/chains#build-your-own
export const bellecour = {
  id: 0xE705,
  name: 'Linea Sepolia test network',
  network: 'Linea Sepolia test network',
  nativeCurrency: {
    decimals: 18,
    name: 'LineaETH',
    symbol: 'LineaETH',
  },
  rpcUrls: {
    public: { http: [`https://linea-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`] },
    default: { http: [`https://linea-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`] },
  },
  blockExplorers: {
    etherscan: {
      name: 'Seplia LineaScan',
      url: 'https://sepolia.lineascan.build',
    },
    default: { name: 'Seplia LineaScan', url: 'https://sepolia.lineascan.build' },
  },
} as const satisfies Chain;
