import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

import { shortenAddress } from '../util/shortenAddress';
import transactions from '../util/transactions';

const TransactionCard = ({ addressTo, addressFrom, timestamp, amount, message, keyword, url }) => {
    return (
        <div
            className='flex flex-1 bg-[#181918] m-4 
            2xl:min-w-[450px] 
            2xlmax-w-[500px] 
            sm:min-w-[270px] 
            sm:max-w-[300px] 
            flex-col 
            p-3 rounded-md hover:shadow-2xl'
        >
            <div className='flex flex-col items-center w-full mt-3'>
                <div className='w-full mb-6 p-2'>
                    <a
                        href={`https://goerli.etherscan.io/${addressFrom}`}
                        target='_blank'
                        rel='nofollow noreferrer noopener'
                    >
                        <p className='text-white text-base'>{`Address From: ${shortenAddress(
                            addressFrom
                        )}`}</p>
                        <p className='text-white text-base'>{`Address To: ${shortenAddress(
                            addressTo
                        )}`}</p>
                        <p className='text-white text-base'>Amount: {amount} ETH</p>
                        {message && (
                            <>
                                <br />
                                <p className='text-white text-base'>Message: {message}</p>
                            </>
                        )}
                        <div className='bg-black rounded-3xl p-3 px-5 w-max -mt-5 shadow-2xl'>
                            <p className='text-[#37c7da] font-bold'>{timestamp}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};

const Transactions = () => {
    const { connectedAccount } = useContext(TransactionContext);

    return (
        <div className='flex w-full justify-center items-center 2x1:px-20 gradient-bg-transactions'>
            <div className='flex w-full flex-col md:p-12 py-12 px-4'>
                {connectedAccount ? (
                    <h3 className='text-white text-center my-2 text-3xl'>Latest Transactions</h3>
                ) : (
                    <h3 className='text-white text-center my-2 text-3xl'>
                        Connect your wallet to see latest transactions
                    </h3>
                )}
                <div className='flex flex-wrap justify-center items-center mt-10'>
                    {transactions.reverse().map((transaction, i) => (
                        <TransactionCard key={i} {...transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Transactions;
