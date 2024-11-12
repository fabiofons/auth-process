import { Validators } from "../../../config";


export class LoginUserDto {
  constructor(
    public email: string,
    public password: string
  ) { }

  static create(object: { [key: string]: string }): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ['Missing email'];
    if (!Validators.email.test(email)) return ['Email not valid'];
    if (!password) return ['Missing password'];
    if (!password.length) return ['Password too short'];

    return [undefined, new LoginUserDto(email, password)];
  }
}