import { registerAs } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

// * configuration object for the jwt module
export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    privateKey: {
      key: process.env.JWT_PRIVATE_KEY,
      passphrase: process.env.JWT_PRIVATE_PASSPHRASE,
    },
    signOptions: {
      algorithm: 'RS256',
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      expiresIn: process.env.JWT_EXPIRATION,
    },
    publicKey: process.env.JWT_PUBLIC_KEY,
    verifyOptions: {
      algorithms: ['RS256'],
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
      ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION === 'true',
      maxAge: process.env.JWT_MAX_AGE,
    },
  }),
)
