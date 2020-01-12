import { registerAs } from '@nestjs/config'
import { ExtractJwt } from 'passport-jwt'
// * configuration object for the jwt strategy
export default registerAs('jwt', () => ({
  passport: {
    secretOrKey: process.env.JWT_PUBLIC_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    algorithms: [process.env.JWT_ALGORITHM],
    ignoreExpiration: process.env.JWT_IGNORE_EXPIRATION,
  },
}))
