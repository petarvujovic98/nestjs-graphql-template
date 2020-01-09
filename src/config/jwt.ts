// * configuration object for the jwt strategy
export default {
  jwtFromRequest: (req: { cookies: { jwt: string } }) =>
    req && req.cookies ? req.cookies.jwt : null,
  ignoreExpiration: false,
  secretOrKey: process.env.JWT_SECRET,
}
