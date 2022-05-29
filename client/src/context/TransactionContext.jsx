import React, { useEffect, useState } from 'react';
import { ethers, providers } from 'ethers';

import { contractAbi, contractAddress } from '../util/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = new provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

    console.log({
        provider,
        signer,
        transactionContract,
    });
};

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');

    const isWalletConnected = async () => {
        if (!ethereum) return alert('Please install metamask');
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        if (accounts) {
            setConnectedAccount(accounts[0]);

            // getAllTransactions();
        } else {
            console.log('No accounts found');
        }
    };

    useEffect(() => {
        isWalletConnected();
    }, []);

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install metamask');
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0]);
        } catch (err) {
            console.error(err);
            throw new Error(`something happened with connecting wallet account ${err}`);
        }
    };

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount }}>
            {children}
        </TransactionContext.Provider>
    );
};
