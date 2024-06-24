/**
 * Extend this function when going to production by
 * setting the baseUrl to your production API URL.
 */
export const getBaseUrl = () => {
  /*
   * This is the URL of the ngrok server. If you're using a different tunneling
   * service, you'll have to change this to the URL of your tunnel.
   * ngrok http 8787 -> cf worker dev server
   */
  return `https://097b-89-64-54-229.ngrok-free.app`;
};
