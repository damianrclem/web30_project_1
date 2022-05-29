// https://eth-goerli.alchemyapi.io/v2/_qp34fFHOCQ0zDJRQ9oUNy_mLk7CUgXz

require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: '0.8.0',
    networks: {
        goerli: {
            url: 'https://eth-goerli.alchemyapi.io/v2/_qp34fFHOCQ0zDJRQ9oUNy_mLk7CUgXz',
            accounts: ['8d5c5a6b845f576f5a69577771ad03a78137363ef0acfee24703639ab1db26cb'],
        },
    },
};
