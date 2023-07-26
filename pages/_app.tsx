import "@/styles/globals.css";
import type { AppProps } from "next/app";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { darkTheme, midnightTheme } from "@rainbow-me/rainbowkit";
import { UserProvider } from "@/components/UserContext";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({
      apiKey: process.env.ALCHEMY_ID || "j4PnZPguzhgopfZ4RCaHUWw4yaRVNSbm",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "defu",
  projectId: "09c4266c7cc4440c3c5600bbae9b9469",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme({ fontStack: "system", accentColor: "#3396FF" })}
        >
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </UserProvider>
  );
}
