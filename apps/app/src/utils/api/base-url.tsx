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
  return `https://6b7d-2a02-a31a-e083-2480-00-448.ngrok-free.app`;
};
