import React, { useContext } from 'react';

import { AiFillCiCircle } from 'react-icons/ai';
import { SiEthereum } from 'react-icons/si';
import { BsInfoCircle } from 'react-icons/bs';
import { shortenAddress } from '../util/shortenAddress';

import { TransactionContext } from '../context/TransactionContext';

import { Loader } from './';

const commonStyles =
    'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white';

const Input = ({ placeholder, type, name, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        value={value}
        name={name}
        step='0.0001'
        onChange={(e) => handleChange(e, name)}
        className='my-2 w-full m-1 p-3 bg-transparent rounded-md text-sm outline-none text-white border-none white-glassmorphism'
    />
);

const Welcome = () => {
    const { connectWallet, connectedAccount, formData, handleChange, sendTransaction, isLoading } =
        useContext(TransactionContext);

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;

        e.preventDefault();

        if ((!addressTo || !amount || !keyword, !message)) return;

        sendTransaction();
    };

    return (
        <div className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='flex md:flex-row md:items-first flex-col items-center flex-start justify-between md:20 py-20 px-4'>
                <div className='flex flex-col flex-1 justify-start w-full md:mr-10'>
                    <h1 className='text-3xl sm:text-5xl text-white text-gradient py-1'>
                        Send Crypto <br /> across the world
                    </h1>
                    <p className='text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base'>
                        Explore the crypto world. Buy and sell cryptocurrency easily on KryptoGIF
                    </p>

                    <div className='grid sm:grid-cols-3 grid-cols-2 w-full mt-10'>
                        <div className={`rounded-tl-2xl ${commonStyles}`}>Reliability</div>
                        <div className={commonStyles}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>Ethereum</div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>Web 3.0</div>
                        <div className={commonStyles}>Low Fees</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>Blockchain</div>
                    </div>
                </div>

                <div className='flex flex-col flex-1 items-center justify-start w-full md:mt-0 mt-10'>
                    <div className='p-3 justify-end items-start flex-col rounded-xl h-40 w-72 my-5 eth-card white-glassmorphism'>
                        <div className='flex justify-between flex-col w-full h-full'>
                            <div className='flex justify-between items-start'>
                                <div className='flex justify-center items-center w-10 h-10 rounded-full border-2 border-white'>
                                    <SiEthereum fontSize={21} color='#fff' />
                                </div>
                                <BsInfoCircle fontSize={17} color='#fff' />
                            </div>
                            <div>
                                <p className='text-white font-light text-sm'>
                                    {connectedAccount ? (
                                        shortenAddress(connectedAccount)
                                    ) : (
                                        <div>Connect Wallet</div>
                                    )}
                                </p>
                                <p className='text-white font-light text-lg mt-1'>Ethereum</p>
                            </div>
                        </div>
                    </div>

                    {connectedAccount ? (
                        <div className='p-5 sm:w-96 w-full flex flex-col justify-start rounded-2xl items-center blue-glassmorphism'>
                            <Input
                                placeholder='Address To'
                                type='input'
                                name='addressTo'
                                handleChange={handleChange}
                            />
                            <Input
                                placeholder='Amount (ETH)'
                                type='number'
                                name='amount'
                                handleChange={handleChange}
                            />{' '}
                            <Input
                                placeholder='Keyword (Gif)'
                                type='input'
                                name='keyword'
                                handleChange={handleChange}
                            />{' '}
                            <Input
                                placeholder='Enter Message'
                                type='input'
                                name='message'
                                handleChange={handleChange}
                            />
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <button
                                    type='submit'
                                    onClick={handleSubmit}
                                    className='flex w-full justify-center text-white border-[1px] border-[#2952e3] py-2 px-7 m-4 rounded-full curser-pointer hover:bg-[#2546bd]'
                                >
                                    Send Now
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className='text-white text-sm'>Demo only, use test account</div>
                            <button
                                type='button'
                                onClick={connectWallet}
                                className='flex flex-row w-full justify-center items-center my-5 p-3 bg-[#2952e3] rounded-full curser-pointer hover:bg-[#2546bd]'
                            >
                                <p className='text-white text-base text-semibold'>Connect Wallet</p>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Welcome;
