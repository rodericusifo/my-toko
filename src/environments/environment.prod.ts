export const environment = {
  production: true,
  API_URL: 'https://my-toko-api.herokuapp.com/',
  AUTH_ROLES: {
    O: ['OWNER'],
    OI: ['OWNER', 'INVENTORY'],
    OF: ['OWNER', 'FINANCE'],
    OC: ['OWNER', 'CASHIER'],
  },
};
