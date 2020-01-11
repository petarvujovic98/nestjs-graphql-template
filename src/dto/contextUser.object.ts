export class ContextUser {
  constructor(
    public userId: string,
    public username: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public roles: string[],
  ) {}
}
