export const BASE_API_URL = 'http://127.0.0.1:8000/api/'
export const endpoints = {
    base: `${BASE_API_URL}`,
    login: `${BASE_API_URL}auth/login`,
    register: `${BASE_API_URL}auth/register`,

    dashboard: `${BASE_API_URL}dashboard`,
    createWalletPage: `${BASE_API_URL}create-wallet`,
    storeUserWallet: `${BASE_API_URL}store-user-wallet`,

    createTransferPage: `${BASE_API_URL}transfer`,
    storeUserTransfer: `${BASE_API_URL}send-funds`
}