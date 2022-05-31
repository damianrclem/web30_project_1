const Loader = () => {
    return (
        <div className='flex justify-center items-center py-3'>
            <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-red-700' />
            <span className='text-white pl-2 pulse'>Processing transaction...</span>
        </div>
    );
};

export default Loader;
