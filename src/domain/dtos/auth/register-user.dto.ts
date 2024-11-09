import { Validators } from "../../../config";

export class RegisterUserDto {

  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) { }

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;
    if (!name) return ['Missing name', undefined];
    if (!email) return ['Missing email', undefined];
    if (!Validators.email.test(email)) return ['Email not valid'];
    if (!password) return ['Missing password', undefined];
    if (!password.length) return ['Password too short', undefined];

    return [undefined, new RegisterUserDto(name, email, password)];
  }

}