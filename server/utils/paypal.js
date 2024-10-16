import paypal from 'paypal-rest-sdk'

paypal.configure({
  mode: process.env.SANDBOX,
  client_id: process.env.CLIENT_ID,
  client_secret:process.env.CLIENT_SECRET,
});

export default  paypal
