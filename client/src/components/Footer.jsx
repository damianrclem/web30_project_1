import logo from '../images/kryptogif.svg';

const Footer = () => {
    return (
        <div className='w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer'>
            <div className='flex w-full sm:flex-row flex-col justify-between items-center my-4'>
                <div className='flex flex-[0.5] justify-center items-center'>
                    <img src={logo} alt='KryptoGIF' className='w-32' />
                </div>
                <div className='flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'></div>
            </div>
        </div>
    );
};

export default Footer;
