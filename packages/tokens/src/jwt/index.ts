import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

import { jwtConfig } from '@repo/config';

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/public.pub'));

/**
 * @description Sign a JWT token with the given data.
 * @param {unknown} [details=null] The data to encode in the token.
 * @returns {string|null} The signed token, or null if no data was given.
 */
const signJwt = (details: unknown = null): string | null => {

  if (!details) return null;

  const token = jwt.sign({
    data: details
  }, {
    key: PRIVATE_KEY, passphrase: jwtConfig.jwtSecret,
  }, {
    algorithm: 'RS256',
    expiresIn: jwtConfig.jwtExpiresIn
  });

  return token;
};

/**
 * @description Validates a given JWT token using the public key.
 * @param {string} [token=''] The JWT token to verify.
 * @returns {any} The decoded token if valid, otherwise throws an error.
 */
const validateJwt = (token: string = '' as string): any => {
  return jwt.verify(token, PUBLIC_KEY);
};

export default {
  signJwt,
  validateJwt,
};
