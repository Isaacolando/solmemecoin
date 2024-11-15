import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletModalProvider, WalletDisconnectButton } from "@solana/wallet-adapter-react-ui";

// Wallet connection functionality
document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.solana) {
        try {
            // Check if Phantom wallet is installed
            const wallet = window.solana;
            if (wallet.isPhantom) {
                const response = await wallet.connect();
                console.log('Connected to wallet:', response.publicKey.toString());
                alert('Wallet connected: ' + response.publicKey.toString());
            }
        } catch (error) {
            console.error('Error connecting to wallet', error);
        }
    } else {
        alert('Phantom Wallet not found. Please install it!');
        window.open('https://phantom.app/', '_blank');
    }
});

// Fetch user's KENYA token balance
async function fetchKenyaBalance(walletAddress, tokenMintAddress) {
    const tokenAddress = await getAssociatedTokenAddress(walletAddress, tokenMintAddress);
    const tokenAccount = await getAccount(connection, tokenAddress);
    return tokenAccount.amount;
}

const connection = new Connection("https://api.mainnet-beta.solana.com");

function WalletConnect() {
    const { publicKey, signTransaction, sendTransaction } = useWallet();

    return (
        <div>
            {publicKey ? (
                <>
                    <p>Connected Wallet: {publicKey.toString()}</p>
                    <WalletDisconnectButton />
                </>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </div>
    );
}

export default WalletConnect;

document.getElementById('connectWallet').addEventListener('click', async () => {
    if (window.solana && window.solana.isPhantom) {
        try {
            // Connect to Phantom wallet
            const response = await window.solana.connect();
            console.log('Connected to wallet:', response.publicKey.toString());
            alert('Wallet connected: ' + response.publicKey.toString());
        } catch (err) {
            console.error('Wallet connection failed:', err);
        }
    } else {
        // If Phantom wallet is not found, prompt user to install
        alert('Phantom Wallet not found. Please install it!');
        window.open('https://phantom.app/', '_blank');
    }
});


import {
    ConnectionProvider,
    WalletProvider
} from '@solana/wallet-adapter-react';
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter
} from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    // Add more wallets as needed
];

function App() {
    return (
        <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    <div>
                        <WalletMultiButton />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
}
