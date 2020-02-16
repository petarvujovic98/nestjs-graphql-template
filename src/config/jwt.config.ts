import { readFileSync } from 'fs'

import { registerAs } from '@nestjs/config'

// * configuration object for the jwt module
export default registerAs('jwt', () => ({
  privateKey: {
    key: readFileSync(process.env.JWT_PRIVATE_KEY),
    passphrase: process.env.JWT_PRIVATE_PASSPHRASE,
  },
  signOptions: {
    algorithm: process.env.JWT_ALGORITHM,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    expiresIn: process.env.JWT_EXPIRATION,
  },
  publicKey: readFileSync(process.env.JWT_PUBLIC_KEY),
  verifyOptions: {
    algorithm: process.env.JWT_ALGORITHM,
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
    ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION,
    maxAge: process.env.JWT_MAX_AGE,
  },
}))
