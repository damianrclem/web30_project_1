import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';

import logo from '../images/kryptogif.svg';

const NavItems = ({ title, classProps }) => {
    return <li className={`mx-4 curser-pointer ${classProps}`}>{title}</li>;
};

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt='logo' className='w-40 curser-pointer' />
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial'>
                {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
                    <NavItems key={item + index} title={item} />
                ))}
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full curser-pointer hover:bg-[#2546bd]'>
                    Login
                </li>
            </ul>
            <div className='flex relative'>
                <HiMenuAlt4
                    fontSize={28}
                    className='text-white md:hidden curser-pointer'
                    onClick={() => setToggleMenu(true)}
                />
                {toggleMenu && (
                    <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end blue-glassmorphism text-white'>
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setToggleMenu(false)} />
                            {['Market', 'Exchange', 'Tutorials', 'Wallets'].map((item, index) => (
                                <NavItems
                                    key={item + index}
                                    title={item}
                                    classProps='my-2 text-lg'
                                />
                            ))}
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
