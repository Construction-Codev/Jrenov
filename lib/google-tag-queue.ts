/** Google distinguishes gtag commands (Arguments) from dataLayer arrays. */
export const queueGoogleTagCommand: (...args: unknown[]) => void = function () {
  // Keep Google's documented command format; a rest-parameter array is not equivalent.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments);
};
