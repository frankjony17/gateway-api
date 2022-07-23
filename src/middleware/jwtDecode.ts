import { compose, nth, split } from 'ramda';

const base64ToASCII = (string = '') =>
  Buffer.from(string, 'base64').toString('ascii');

const ONE = 1;

const parseJSON = string => JSON.parse(string || '{}');

export const decode = compose(parseJSON, base64ToASCII, nth(ONE), split('.'));
