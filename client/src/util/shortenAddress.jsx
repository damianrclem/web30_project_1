export const shortenAddress = (connectedAccount) =>
    connectedAccount.substr(0, 5) +
    '...' +
    connectedAccount.substr(connectedAccount.length - 5, connectedAccount.length);
