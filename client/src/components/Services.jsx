import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const ServiceCard = ({ color, title, subtitle, icon }) => (
    <div className='flex flex-row w-full justify-start items-center white-glassmorphism p-3 m-3 curser-pointer hover:shadow-lx'>
        <div className={`flex w-10 h-10 rounded-full justify-center items-center ${color}`}>
            {icon}
        </div>
        <div className='flex flex-col flex-1 ml-5'>
            <h1 className='text-white mt-2 text-lg'>{title}</h1>
            <p className='text-white mt-2 text-sm md:w-9/12'>{subtitle}</p>
        </div>
    </div>
);
const Services = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center gradient-bg-services'>
            <div className='flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4'>
                <div className='flex flex-1 flex-col justify-start items-start'>
                    <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>
                        Services that we <br /> continue to improve
                    </h1>
                </div>
            </div>
            <div className='flex flex-1 flex-col justify-start items-center md:p-20 py-12 px-4'>
                <ServiceCard
                    color='bg-[#2953E3]'
                    title='Security Guaranteed'
                    subtitle='Providing secure transactions.'
                    icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
                />
                <ServiceCard
                    color='bg-[#8945F8]'
                    title='Best Exchange Rates'
                    subtitle='Providing secure transactions.'
                    icon={<BiSearchAlt fontSize={21} className='text-white' />}
                />{' '}
                <ServiceCard
                    color='bg-[#F84450]'
                    title='Fast Transactions'
                    subtitle='Providing secure transactions.'
                    icon={<RiHeart2Fill fontSize={21} className='text-white' />}
                />
            </div>
        </div>
    );
};

export default Services;
