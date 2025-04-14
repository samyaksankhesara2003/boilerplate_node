import { generateKeyPairSync } from 'crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { log } from '@repo/logger';
import { appConfig } from '@repo/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const keyDir = path.join(__dirname, '../keys');

if (!existsSync(keyDir)) {
  mkdirSync(keyDir, { recursive: true });
}

const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: appConfig.jwtSecret,
  },
});

writeFileSync(path.join(keyDir, 'private.key'), privateKey);
writeFileSync(path.join(keyDir, 'public.key'), publicKey);

log.info('✅ RSA keys generated successfully.');
