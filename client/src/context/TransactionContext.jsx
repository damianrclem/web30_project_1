import React, { useEffect, useState } from 'react';
import { ethers, providers } from 'ethers';

import { contractAbi, contractAddress } from '../util/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractAbi, signer);

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    const [connectedAccount, setConnectedAccount] = useState('');
    const [formData, setFormData] = useState({
        addressTo: '',
        amount: '',
        keyword: '',
        message: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem('transactionCount')
    );

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert('Please install metamask');
            const transactionContract = getEthereumContract();
            const allTransactions = await transactionContract.getAllTransactions();
            console.log(allTransactions);
        } catch (error) {
            console.log(error);
        }
    };

    const isWalletConnected = async () => {
        try {
            if (!ethereum) return alert('Please install metamask');
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setConnectedAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log('No accounts found');
            }
        } catch (err) {
            console.error(err);
            throw new Error('No connected account');
        }
    };

    const checkIfTransactionExists = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransactionCount();
            window.localStorage.setItem('transactionCount', transactionCount);
        } catch (error) {
            console.error('transaction count error', error);
            throw new Error(`error getting transaction count ${error}`);
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert('Please install metamask wallet');
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [
                    {
                        from: connectedAccount,
                        to: addressTo,
                        gas: '0x5208', //21000 gwei
                        value: parsedAmount._hex,
                    },
                ],
            });

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyword
            );

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);

            await transactionHash.wait();

            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();
            console.log('transactionCount', transactionCount);

            setTransactionCount(transactionCount.toNumber());
        } catch (err) {
            console.error(err);
            throw new Error('Send transaction error');
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert('Please install metamask');
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            setConnectedAccount(accounts[0]);
        } catch (err) {
            console.error(err);
            throw new Error('something happened with connecting wallet account');
        }
    };

    useEffect(() => {
        isWalletConnected();
        checkIfTransactionExists();
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                connectedAccount,
                formData,
                handleChange,
                sendTransaction,
                isLoading,
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
