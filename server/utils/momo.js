import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const MOMO_BASE_URL = process.env.MOMO_BASE_URL; // Ensure it's properly set
export const user = uuidv4();  // Ensure UUID is used correctly
// const apiUser = async () => {
//   try {
//     const response = await axios.post(
//       `${MOMO_BASE_URL}/v1_0/apiuser`,  // Correct endpoint
//       { providerCallbackHost: 'http://localhost:5173/' },
//       {
//         headers: {
//           'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY,  // Ensure valid key
//           'X-Reference-Id': user,  // Correct UUID for the user
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     console.log('API User Created:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating API user:', error.response?.data || error.message);
//     throw new Error('Failed to create API user.');
//   }
// };


let cachedApiUser = null; // In-memory cache for the API user

// Create API User
const apiUser = async () => {
  try {
    
    const response = await axios.post(
      `${MOMO_BASE_URL}/v1_0/apiuser`,
      { providerCallbackHost: 'http://localhost:5173' },// No body needed
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY,
          'X-Reference-Id': user, // Use the newly generated UUID
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('API User Created:', response.data);

    // Fetch API key immediately after creating the user
    const apiKeyResponse = await axios.post(
      `${MOMO_BASE_URL}/v1_0/apiuser/${user}/apikey`,
      {}, // No body needed
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY,
          'X-Reference-Id': user,
        },
      }
    );

    console.log('API Key Retrieved:', apiKeyResponse.data.apiKey);
    cachedApiUser = { user, apiKey: apiKeyResponse.data.apiKey }; // Cache the API user info with the key
    return cachedApiUser; // Return cached user and key
  } catch (error) {
    if (error.response?.data?.code === 'RESOURCE_ALREADY_EXIST') {
      console.error('Duplicated reference id. Trying again with a new UUID.');
      return await apiUser(); // Retry with a new UUID
    }
    console.error('Error creating API user:', error.response?.data || error.message);
    throw new Error('Failed to create API user.');
  }
};

// Fetch API key from cache or create a new API user
const getApi = async () => {
  if (cachedApiUser) {
    return cachedApiUser.apiKey; // Return cached API key if available
  }
  const apiUserData = await apiUser(); // Create a new API user and fetch API key
  return apiUserData.apiKey; // Return the newly fetched API key
};

// const getApi = async () => {
//   try {
//     await apiUser()
//     const response = await axios.post(
//       `${MOMO_BASE_URL}/v1_0/apiuser/${user}/apikey`,
//       {},
//       {
//         headers: {
//           'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY, // Ensure the correct key
//           'X-Reference-Id': user,  // Ensure you pass the correct user UUID
//         },
//       }
//     );
  
//     return response.data.apiKey;
//   } catch (error) {
//     console.error('Error fetching API key:', error.response?.data || error.message);
//     throw new Error('Failed to fetch MoMo API key.');
//   }
// };
const getMomoToken = async () => {
  try {
    const apiKey = await getApi();  // Get the API key first
    const auth = Buffer.from(`${user}:${apiKey}`).toString('base64');  // Encode user:apiKey
    const response = await axios.post(
      `${MOMO_BASE_URL}/collection/token/`,
      {}, 
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY,
          'Authorization': `Basic ${auth}`,  // Correct Authorization format
          'Content-Type': 'application/json',
        },
      }
    );
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching MoMo token:', error.response?.data || error.message);
    throw new Error('Failed to fetch MoMo API token.');
  }
};
export const initiateMomoPayment = async (amount, currency, externalId, payer, reason) => {
  try {
    const token = await getMomoToken();  // Fetch token first

    const requestBody = {
      amount: amount,
      currency: currency,
      externalId: externalId,
      payer: payer,
      payerMessage: reason,
      payeeNote: reason,
    };

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY,  // Correct subscription key
      'X-Reference-Id': uuidv4(),  // Generate new unique UUID for payment
      'Content-Type': 'application/json',
      'X-Target-Environment': 'sandbox', // Change to 'production' in live environment
    };

    const response = await axios.post(
      `${MOMO_BASE_URL}/collection/v1_0/requesttopay`,
      requestBody,
      { headers }
    );

    if (response.status === 202) { // 202 means accepted for processing
      return externalId.toString() 
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error('Error initiating MoMo payment:', error);
    throw new Error('MoMo payment initiation failed.');
  }
};
export const getMomoPaymentStatus = async (paymentId) =>  {
  try {
    paymentId=user
    const token = await getMomoToken();
      const response = await axios.get(`https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay/${paymentId}`, {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY,
              'X-target-Environment': 'sandbox',
              'X-Reference-Id':paymentId
                            
          }
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching MoMo payment status:', error);
      throw new Error('Failed to fetch MoMo payment status.');
  }
}

// // Function to check MoMo payment status
// export const getMomoPaymentStatus = async (paymentId) => {
//   try {
//     const token = await getMomoToken();
//     const headers = {
//       'Authorization': `Bearer ${token}`,  // Use the Primary Key here
//       'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY,
//       'X-target-Environment':'sandbox'
//     };

//     // Make the GET request to check the payment status
//     const response = await axios.get(
//       `${MOMO_BASE_URL}/collection/v1_0/requesttopay/${paymentId}`,
//       { headers }
//     );

//     return response.data;
//   } catch (error) {
//     console.error('Error fetching MoMo payment status:', error);
//     throw new Error('Failed to fetch MoMo payment status.');
//   }
// };
