import { useRouter } from 'next/router';

import { ethers } from "ethers";
import { type NextPage } from "next";
import Head from "next/head";
import { type FC, type ReactNode, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  usePrepareStorageStore,
  useStorageRead,
  useStorageWrite,
} from "../generated";

const NoSSR: FC<{ children: ReactNode }> = ({ children }) => {

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
};

const Home: NextPage = () => {

  const router = useRouter();
  
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const { data: storageData, refetch } = useStorageRead({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    functionName: "retrieve",
  });

  const [newNumber, setNewNumber] = useState("");

  const { config } = usePrepareStorageStore({
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    args: [ethers.BigNumber.from(newNumber || "0")],
    enabled: !!newNumber,
  });
  console.log(config);
  const { write, isLoading } = useStorageWrite({
    async onSuccess() {
      await refetch();
    },
    ...config,
  });

  const { address, isConnected } = useAccount();

  // Cuando el usuario se conecte correctamente
  if (isConnected) {
      router.push({
          pathname: '/home',
          query: { address },
      });
  }

  return (
    <div className='h-max'>
      <Head>
        <title>Canna Chain</title>
        <meta
          name="description"
          content="Fullstack Web3 Dapp built with hardhat, Next.js and wagmi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center max-w-4xl mx-auto h-96 mt-40 items-center align-center bg-primary">
        <h1 className="text-3xl font-bold text-white mb-7">CanaChain Web3 DApp</h1>
        <NoSSR>
          {isConnected ? (

            // Si está CONECTADO
            <div className="flex flex-col items-center justify-center gap-12">
              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-white">Connected to wallet</p>
                <p className="text-white">{address}</p>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
              
                {isLoading && <p>loading...</p>}
              </div>
            </div>
          )
          // Si está desconectado mostrar botón de conectar
          : (
            <button
              className="rounded-full bg-success px-4 py-2 font-bold text-white"
              onClick={() => connect()}
            >
              Conectar Wallet
            </button>
          )}
        </NoSSR>
      </main>
    </div>
  );
};

export default Home;
