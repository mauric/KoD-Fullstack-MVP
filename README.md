# Cannabis Derivate Products Traceability System MVP - Kings Of Devs 3.0 - 

This MVP have a frontend made with Next.js that works with a few contracts. Contracts are deployed with hardhat and the wallet connection is made with Wagmi. 



> You can use npm or pnpm 

## Create Hardhat project

```bash
$ mkdir contracts
$ cd contracts
$ pnpm init
$ pnpm add --save-dev hardhat
$ pnpm hardhat
  > Select typescript
  > Install dependencies
```

## Write Contract

Replace default Lock Contract with Storage contract

```bash
$ pnpm hardhat compile
```
Editar el script de deploy

Iniciar el nodo de hardhat en otra consola
```
$ pnpm hardhat node
```
Nos va a tirar unas llaves privadas. Guardamos una de estas y la importamos en Metamask para poder usar desde la app frontend.

Hacer el deployment en red local:
```
$ pnpm hardhat compile
$ pnpm hardhat run scripts/deploy.ts --network localhost
```
Copiar el address del contrato (Usando plugins como hardhat deploy se puede automatizar este paso)

## Create React Project

```bash
$ mkdir frontend
$ cd frontend
$ pnpm init
$ pnpm add --save-dev create-t3-app
$ pnpm  create-t3-app
  > select "." as project folder
  > Select Tailwind, to make the demo pretty
  > Select overwrite directory
```

## Generate code for interacting with smart contracts

```bash
$ pnpm add --save-dev @wagmi/cli
$ pnpm add wagmi ethers@^5
$ pnpx wagmi init
```

Add hardhat and react plugins

Run the generate command 
```
$ pnpm wagmi generate
```

This generates a file with an abi for the contract and hooks using the abi. You migth want to add this file to your .gitignore and ignore it on your linter.

## Building the frontend APP

In `src/pages/app.tsx` add chain config, client and wrap the app in a Wagmi Client as [the guide here shows](https://wagmi.sh/react/getting-started)

Go to `src/pages/index.tsx` and delete the page content.
Add the code to connect to the wallet

# How to use this as a template

- Clone this and name it as you want
- cd into contracts
  - run `pnpm install`
  - run `pnpm hardhat compile`
  - run `pnpm hardhat node` and leave it running
  - run `pnpm hardhat run scripts/deploy.ts --network localhost`
- cd into frontend
  - run `pnpm install`
  - run `pnpm wagmi generate`
  - run `pnpm dev`