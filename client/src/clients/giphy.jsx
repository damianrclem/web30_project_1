import { useState, useEffect } from 'react';

const API_KEY = import.meta.env.VITE_GIPHY_API;

const fetchGiphyImage = ({ keyword }) => {
    const [gifUrl, setGifUrl] = useState('');

    const getGifImage = async () => {
        try {
            const resp = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
                    .split(' ')
                    .join('')}&limit=1`
            );
            const { data } = await resp.json();
            setGifUrl(data[0]?.images?.downsized_medium?.url);
        } catch (error) {
            setGifUrl(
                'https://media4.popsugar-assets.com/files/2013/11/07/832/n/1922398/eb7a69a76543358d_28.gif'
            );
        }
    };

    useEffect(() => {
        if (keyword) getGifImage();
    }, [keyword]);

    return gifUrl;
};

export default fetchGiphyImage;
