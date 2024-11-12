import { JwtAdapter } from "../../../config";
import { AuthRepository, CustomError, RegisterUserDto } from "../..";

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>
}

interface UserToken {
  token: string,
  user: {
    id: string,
    name: string,
    email: string
  }
}

type SignToken = (payload: Object, duration?: string) => Promise<string | null>

export class RegisterUser implements RegisterUserUseCase {

  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) { }

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    //Crear Usuario
    const user = await this.authRepository.register(registerUserDto);
    //token
    const token = await this.signToken({ id: user.id }, '3h');

    if (!token) throw CustomError.internalServer('Error generating token');

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }
  }

}